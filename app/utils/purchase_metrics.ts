import type Purchase from '#models/purchase'
import type Sale from '#models/sale'
import type SaleAllocation from '#models/sale_allocation'
import { toNumber } from '#utils/numbers'

export type PurchaseStatus = 'sold' | 'partial' | 'in_stock'

export type PurchaseMetrics = {
  total_buy_cost: number
  total_sold_kg: number
  remaining_kg: number
  total_revenue: number
  status: PurchaseStatus
}

function soldKgFromAllocations(allocations: SaleAllocation[] = []): number {
  return allocations.reduce((sum, row) => sum + toNumber(row.quantityKg), 0)
}

function salesFromAllocations(allocations: SaleAllocation[]): Sale[] {
  const byId = new Map<number, Sale>()
  for (const row of allocations) {
    if (row.sale) {
      byId.set(Number(row.sale.id), row.sale)
    }
  }
  return [...byId.values()]
}

function revenueFromSales(sales: Sale[] = []): number {
  return sales.reduce(
    (sum, sale) => sum + toNumber(sale.quantityKg) * toNumber(sale.sellPricePerKg),
    0
  )
}

export function computePurchaseMetrics(
  purchase: Purchase,
  options: {
    allocations?: SaleAllocation[]
    sales?: Sale[]
  } = {}
): PurchaseMetrics {
  const quantityKg = toNumber(purchase.quantityKg)
  const buyPricePerKg = toNumber(purchase.buyPricePerKg)
  const totalBuyCost = quantityKg * buyPricePerKg

  const allocations = options.allocations ?? purchase.saleAllocations ?? []
  const sales =
    options.sales ??
    (purchase.sales && purchase.sales.length > 0
      ? purchase.sales
      : salesFromAllocations(allocations))

  const totalSoldKg =
    allocations.length > 0
      ? soldKgFromAllocations(allocations)
      : sales.reduce((sum, sale) => sum + toNumber(sale.quantityKg), 0)

  const remainingKg = quantityKg - totalSoldKg
  const totalRevenue = revenueFromSales(sales)

  let status: PurchaseStatus = 'in_stock'
  if (remainingKg <= 0) {
    status = 'sold'
  } else if (totalSoldKg > 0) {
    status = 'partial'
  }

  return {
    total_buy_cost: totalBuyCost,
    total_sold_kg: totalSoldKg,
    remaining_kg: remainingKg,
    total_revenue: totalRevenue,
    status,
  }
}
