import type Sale from '#models/sale'
import type SaleAllocation from '#models/sale_allocation'
import { sumVenteExpenses } from '#utils/expense_metrics'
import { computeAllocationTotals } from '#utils/sale_allocation_metrics'
import { toNumber } from '#utils/numbers'

export type SaleMetrics = {
  total_revenue: number
  avg_buy_price_per_kg: number
  avg_sell_price_per_kg: number
  total_cogs: number
  vente_expenses: number
  /** Bénéfice vente seule (sans dépenses globales : salaire, loyer, etc.) */
  profit: number
}

export function computeSaleMetrics(
  sale: Sale,
  allocations: SaleAllocation[] = sale.allocations ?? []
): SaleMetrics {
  const quantityKg = toNumber(sale.quantityKg)
  const sellPricePerKg = toNumber(sale.sellPricePerKg)
  const totalRevenue = quantityKg * sellPricePerKg
  const venteExpenses = sumVenteExpenses(sale.expenses ?? [])

  const { total_cogs: totalCogs, avg_buy_price_per_kg: avgBuyPricePerKg } =
    computeAllocationTotals(allocations)

  const profit = totalRevenue - totalCogs - venteExpenses

  return {
    total_revenue: totalRevenue,
    avg_buy_price_per_kg: avgBuyPricePerKg,
    avg_sell_price_per_kg: sellPricePerKg,
    total_cogs: totalCogs,
    vente_expenses: venteExpenses,
    profit,
  }
}
