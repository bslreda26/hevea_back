import { monthLabel } from '#utils/month_label'
import { toNumber } from '#utils/numbers'
import { resolvePointOfSaleScope, shouldHideMargin } from '#utils/auth_helpers'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

type DateFilters = {
  start?: string
  end?: string
}

function readDateFilters(ctx: HttpContext): DateFilters {
  return {
    start:
      ctx.request.input('start_date') ??
      ctx.request.input('date_start') ??
      ctx.request.input('start'),
    end: ctx.request.input('end_date') ?? ctx.request.input('date_fin') ?? ctx.request.input('end'),
  }
}

function applyDateFilter<T extends ReturnType<typeof db.from>>(
  query: T,
  column: string,
  filters: DateFilters
) {
  if (filters.start) query.where(column, '>=', String(filters.start))
  if (filters.end) query.where(column, '<=', String(filters.end))
  return query
}

function applyYearOrDateFilter<T extends ReturnType<typeof db.from>>(
  query: T,
  column: string,
  year: number,
  filters: DateFilters
) {
  if (filters.start || filters.end) return applyDateFilter(query, column, filters)
  return query.whereRaw(`YEAR(${column}) = ?`, [year])
}

export default class ReportsController {
  async overview(ctx: HttpContext) {
    const { auth, request, response } = ctx
    const user = auth.getUserOrFail()
    const hideMargin = shouldHideMargin(user)
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const filters = readDateFilters(ctx)

    const [purchasesRow] = await applyDateFilter(
      db
        .from('purchases')
        .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
          q.where('point_of_sale_id', Number(pointOfSaleScope.pointOfSaleId))
        )
        .select(
          db.raw('COALESCE(SUM(quantity_kg), 0) as total_kg_bought'),
          db.raw('COALESCE(SUM(quantity_kg * buy_price_per_kg), 0) as total_buy_cost')
        ),
      'date',
      filters
    )

    const [salesRow] = await applyDateFilter(
      db
        .from('sales')
        .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
          q.where('point_of_sale_id', Number(pointOfSaleScope.pointOfSaleId))
        )
        .select(
          db.raw('COALESCE(SUM(quantity_kg), 0) as total_kg_sold'),
          db.raw('COALESCE(SUM(quantity_kg * sell_price_per_kg), 0) as total_revenue')
        ),
      'date',
      filters
    )

    const [cogsRow] = await applyDateFilter(
      db
        .from('sale_allocations as sa')
        .join('sales as s', 's.id', 'sa.sale_id')
        .join('purchases as p', 'p.id', 'sa.purchase_id')
        .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
          q.where('s.point_of_sale_id', Number(pointOfSaleScope.pointOfSaleId))
        )
        .select(db.raw('COALESCE(SUM(sa.quantity_kg * p.buy_price_per_kg), 0) as total_cogs')),
      's.date',
      filters
    )

    const [venteExpensesRow] = await applyDateFilter(
      db
        .from('expenses')
        .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
          q.where('point_of_sale_id', Number(pointOfSaleScope.pointOfSaleId))
        )
        .select(db.raw('COALESCE(SUM(amount), 0) as total_vente_expenses')),
      'date',
      filters
    )

    const [generalRow] = await applyDateFilter(
      db
        .from('general_expenses')
        .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
          q.where('point_of_sale_id', Number(pointOfSaleScope.pointOfSaleId))
        )
        .select(
          db.raw(
            "COALESCE(SUM(CASE WHEN category = 'investissement' THEN amount ELSE 0 END), 0) as investissement_total"
          ),
          db.raw('COALESCE(SUM(amount), 0) as general_expenses_total')
        ),
      'date',
      filters
    )

    const totalKgBought = toNumber(purchasesRow.total_kg_bought)
    const totalBuyCost = toNumber(purchasesRow.total_buy_cost)
    const totalKgSold = toNumber(salesRow.total_kg_sold)
    const totalRevenue = toNumber(salesRow.total_revenue)
    const totalCogs = toNumber(cogsRow.total_cogs)
    const venteExpenses = toNumber(venteExpensesRow.total_vente_expenses)
    const investissementTotal = toNumber(generalRow.investissement_total)
    const generalExpensesTotal = toNumber(generalRow.general_expenses_total)
    const exploitationExpenses = Math.max(generalExpensesTotal - investissementTotal, 0)
    const depenses = venteExpenses + (hideMargin ? exploitationExpenses : generalExpensesTotal)

    const profitOnSales = totalRevenue - totalCogs - venteExpenses
    const globalCostPerKg = totalKgSold > 0 ? depenses / totalKgSold : 0
    const realMargin = totalRevenue - totalCogs - depenses

    return response.json({
      total_kg_bought: totalKgBought,
      total_kg_sold: totalKgSold,
      total_kg_remaining: totalKgBought - totalKgSold,
      total_revenue: totalRevenue,
      total_buy_cost: totalBuyCost,
      total_cogs: totalCogs,
      vente_expenses: venteExpenses,
      depenses,
      general_expenses: generalExpensesTotal,
      profit_on_sales: profitOnSales,
      exploitation_expenses: exploitationExpenses,
      global_cost_per_kg: globalCostPerKg,
      real_margin: realMargin,
      investissement_total: investissementTotal,
    })
  }

  async monthly(ctx: HttpContext) {
    const { auth, request, response } = ctx
    const user = auth.getUserOrFail()
    const hideMargin = shouldHideMargin(user)
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const year = Number(request.input('year', new Date().getFullYear()))
    const filters = readDateFilters(ctx)

    const purchaseRows = await applyYearOrDateFilter(
      db
        .from('purchases')
        .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
          q.where('point_of_sale_id', Number(pointOfSaleScope.pointOfSaleId))
        )
        .select(db.raw("DATE_FORMAT(date, '%Y-%m') as month"))
        .select(db.raw('SUM(quantity_kg) as kg_bought'))
        .groupByRaw("DATE_FORMAT(date, '%Y-%m')"),
      'date',
      year,
      filters
    )

    const saleRows = await applyYearOrDateFilter(
      db
        .from('sales')
        .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
          q.where('point_of_sale_id', Number(pointOfSaleScope.pointOfSaleId))
        )
        .select(db.raw("DATE_FORMAT(date, '%Y-%m') as month"))
        .select(db.raw('SUM(quantity_kg) as kg_sold'))
        .select(db.raw('SUM(quantity_kg * sell_price_per_kg) as total_revenue'))
        .groupByRaw("DATE_FORMAT(date, '%Y-%m')"),
      'date',
      year,
      filters
    )

    const venteExpenseRows = await applyYearOrDateFilter(
      db
        .from('expenses')
        .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
          q.where('point_of_sale_id', Number(pointOfSaleScope.pointOfSaleId))
        )
        .select(db.raw("DATE_FORMAT(date, '%Y-%m') as month"))
        .select(db.raw('SUM(amount) as vente_expenses'))
        .groupByRaw("DATE_FORMAT(date, '%Y-%m')"),
      'date',
      year,
      filters
    )

    const generalExpenseRows = await applyYearOrDateFilter(
      db
        .from('general_expenses')
        .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
          q.where('point_of_sale_id', Number(pointOfSaleScope.pointOfSaleId))
        )
        .select(db.raw("DATE_FORMAT(date, '%Y-%m') as month"))
        .select(db.raw('SUM(amount) as general_expenses'))
        .groupByRaw("DATE_FORMAT(date, '%Y-%m')"),
      'date',
      year,
      filters
    )

    const investissementRows = await applyYearOrDateFilter(
      db
        .from('general_expenses')
        .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
          q.where('point_of_sale_id', Number(pointOfSaleScope.pointOfSaleId))
        )
        .where('category', 'investissement')
        .select(db.raw("DATE_FORMAT(date, '%Y-%m') as month"))
        .select(db.raw('SUM(amount) as investissement_expenses'))
        .groupByRaw("DATE_FORMAT(date, '%Y-%m')"),
      'date',
      year,
      filters
    )

    const cogsRows = await applyYearOrDateFilter(
      db
        .from('sale_allocations as sa')
        .join('sales as s', 's.id', 'sa.sale_id')
        .join('purchases as p', 'p.id', 'sa.purchase_id')
        .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
          q.where('s.point_of_sale_id', Number(pointOfSaleScope.pointOfSaleId))
        )
        .select(db.raw("DATE_FORMAT(s.date, '%Y-%m') as month"))
        .select(db.raw('SUM(sa.quantity_kg * p.buy_price_per_kg) as total_cogs'))
        .groupByRaw("DATE_FORMAT(s.date, '%Y-%m')"),
      's.date',
      year,
      filters
    )

    const byMonth = new Map<string, Record<string, number | string>>()
    const touchMonth = (month: string) => {
      if (!byMonth.has(month)) {
        byMonth.set(month, {
          month,
          kg_bought: 0,
          kg_sold: 0,
          total_revenue: 0,
          total_cogs: 0,
          vente_expenses: 0,
          general_expenses: 0,
          investissement_expenses: 0,
        })
      }
      return byMonth.get(month)!
    }

    purchaseRows.forEach((row) => {
      const month = String((row as Record<string, unknown>).month)
      const item = touchMonth(month)
      item.kg_bought = toNumber((row as Record<string, unknown>).kg_bought as string | number)
    })
    saleRows.forEach((row) => {
      const month = String((row as Record<string, unknown>).month)
      const item = touchMonth(month)
      item.kg_sold = toNumber((row as Record<string, unknown>).kg_sold as string | number)
      item.total_revenue = toNumber(
        (row as Record<string, unknown>).total_revenue as string | number
      )
    })
    venteExpenseRows.forEach((row) => {
      const month = String((row as Record<string, unknown>).month)
      const item = touchMonth(month)
      item.vente_expenses = toNumber(
        (row as Record<string, unknown>).vente_expenses as string | number
      )
    })
    generalExpenseRows.forEach((row) => {
      const month = String((row as Record<string, unknown>).month)
      const item = touchMonth(month)
      item.general_expenses = toNumber(
        (row as Record<string, unknown>).general_expenses as string | number
      )
    })
    investissementRows.forEach((row) => {
      const month = String((row as Record<string, unknown>).month)
      const item = touchMonth(month)
      item.investissement_expenses = toNumber(
        (row as Record<string, unknown>).investissement_expenses as string | number
      )
    })
    cogsRows.forEach((row) => {
      const month = String((row as Record<string, unknown>).month)
      const item = touchMonth(month)
      item.total_cogs = toNumber((row as Record<string, unknown>).total_cogs as string | number)
    })

    const result = Array.from(byMonth.values())
      .sort((a, b) => String(a.month).localeCompare(String(b.month)))
      .map((row) => {
        const month = String(row.month)
        const kgSold = toNumber(row.kg_sold as number)
        const totalRevenue = toNumber(row.total_revenue as number)
        const totalCogs = toNumber(row.total_cogs as number)
        const venteExpenses = toNumber(row.vente_expenses as number)
        const generalExpenses = toNumber(row.general_expenses as number)
        const investissementExpenses = toNumber(row.investissement_expenses as number)
        const exploitationExpenses = Math.max(generalExpenses - investissementExpenses, 0)
        const depenses = venteExpenses + (hideMargin ? exploitationExpenses : generalExpenses)
        const profitOnSales = totalRevenue - totalCogs - venteExpenses
        const realMargin = totalRevenue - totalCogs - depenses
        const globalCostPerKg = kgSold > 0 ? depenses / kgSold : 0

        return {
          month,
          label: monthLabel(month),
          kg_bought: toNumber(row.kg_bought as number),
          kg_sold: kgSold,
          total_revenue: totalRevenue,
          total_cogs: totalCogs,
          vente_expenses: venteExpenses,
          general_expenses: generalExpenses,
          depenses,
          profit_on_sales: profitOnSales,
          exploitation_expenses: exploitationExpenses,
          global_cost_per_kg: globalCostPerKg,
          real_margin: realMargin,
          investissement_expenses: investissementExpenses,
        }
      })

    return response.json(result)
  }
}
