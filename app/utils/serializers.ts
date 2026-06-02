import type Expense from '#models/expense'
import type GeneralExpense from '#models/general_expense'
import type Purchase from '#models/purchase'
import type Sale from '#models/sale'
import type SaleAllocation from '#models/sale_allocation'
import { stripMarginFields } from '#utils/margin_fields'
import { computePurchaseMetrics, type PurchaseMetrics } from '#utils/purchase_metrics'
import { computeSaleMetrics } from '#utils/sale_metrics'
import { serializeAllocation } from '#utils/sale_allocation_metrics'
import { toNumber } from '#utils/numbers'

type SerializeOptions = {
  includeExpenses?: boolean
  hideMargin?: boolean
}

function applyPolicy<T>(data: T, hideMargin?: boolean): T {
  return hideMargin ? stripMarginFields(data) : data
}

type ListMetrics = Pick<PurchaseMetrics, 'total_sold_kg' | 'remaining_kg' | 'status'>

export function serializeExpense(expense: Expense) {
  return {
    id: expense.id,
    sale_id: expense.saleId,
    purchase_id: expense.purchaseId,
    type: expense.type,
    label: expense.label,
    amount: toNumber(expense.amount),
    date: expense.date.toISODate(),
    created_at: expense.createdAt?.toISO() ?? null,
    updated_at: expense.updatedAt?.toISO() ?? null,
  }
}

export function serializeGeneralExpense(expense: GeneralExpense) {
  return {
    id: expense.id,
    label: expense.label,
    category: expense.category,
    amount: toNumber(expense.amount),
    date: expense.date.toISODate(),
    notes: expense.notes,
    created_at: expense.createdAt?.toISO() ?? null,
    updated_at: expense.updatedAt?.toISO() ?? null,
  }
}

export function serializeSale(sale: Sale, options: SerializeOptions = {}) {
  const allocations = sale.allocations ?? []
  const base = {
    id: sale.id,
    purchase_id: sale.purchaseId,
    buyer: sale.buyer,
    quantity_kg: toNumber(sale.quantityKg),
    sell_price_per_kg: toNumber(sale.sellPricePerKg),
    date: sale.date.toISODate(),
    created_at: sale.createdAt?.toISO() ?? null,
    updated_at: sale.updatedAt?.toISO() ?? null,
    allocations: allocations.map((row) => serializeAllocation(row)),
  }

  if (!options.includeExpenses) {
    return applyPolicy(base, options.hideMargin)
  }

  const metrics = computeSaleMetrics(sale, allocations)

  return applyPolicy(
    {
      ...base,
      ...metrics,
      expenses: (sale.expenses ?? []).map(serializeExpense),
    },
    options.hideMargin
  )
}

export function serializePurchaseBase(purchase: Purchase) {
  return {
    id: purchase.id,
    date: purchase.date.toISODate(),
    supplier: purchase.supplier,
    quantity_kg: toNumber(purchase.quantityKg),
    buy_price_per_kg: toNumber(purchase.buyPricePerKg),
    notes: purchase.notes,
    created_at: purchase.createdAt?.toISO() ?? null,
    updated_at: purchase.updatedAt?.toISO() ?? null,
  }
}

export function serializePurchaseListItem(purchase: Purchase, hideMargin = false) {
  const metrics = computePurchaseMetrics(purchase)
  const listMetrics: ListMetrics = {
    total_sold_kg: metrics.total_sold_kg,
    remaining_kg: metrics.remaining_kg,
    status: metrics.status,
  }

  return applyPolicy(
    {
      ...serializePurchaseBase(purchase),
      ...listMetrics,
    },
    hideMargin
  )
}

function uniqueSalesFromAllocations(allocations: SaleAllocation[]): Sale[] {
  const byId = new Map<number, Sale>()
  for (const row of allocations) {
    if (row.sale) {
      byId.set(Number(row.sale.id), row.sale)
    }
  }
  return [...byId.values()]
}

function mergeSales(...groups: Sale[][]): Sale[] {
  const byId = new Map<number, Sale>()
  for (const group of groups) {
    for (const sale of group) {
      byId.set(Number(sale.id), sale)
    }
  }
  return [...byId.values()].sort(
    (a, b) => b.date.toMillis() - a.date.toMillis()
  )
}

export function serializePurchaseDetail(purchase: Purchase, hideMargin = false) {
  const allocations = purchase.saleAllocations ?? []
  const sales = mergeSales(purchase.sales ?? [], uniqueSalesFromAllocations(allocations))

  const metrics = computePurchaseMetrics(purchase, { allocations, sales })

  return applyPolicy(
    {
      ...serializePurchaseBase(purchase),
      ...metrics,
      sales: sales.map((sale) =>
        serializeSale(sale, { includeExpenses: true, hideMargin })
      ),
    },
    hideMargin
  )
}

export function serializePurchaseRecord(purchase: Purchase) {
  return serializePurchaseBase(purchase)
}
