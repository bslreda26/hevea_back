import type Purchase from '#models/purchase'
import type SaleAllocation from '#models/sale_allocation'
import { toNumber } from '#utils/numbers'

export type SerializedAllocation = {
  id: number
  purchase_id: number
  quantity_kg: number
  buy_price_per_kg: number
  buy_cost: number
  purchase_date: string
  supplier: string | null
}

export function serializeAllocation(
  allocation: SaleAllocation,
  purchase?: Purchase
): SerializedAllocation {
  const purchaseRecord = purchase ?? allocation.purchase
  const quantityKg = toNumber(allocation.quantityKg)
  const buyPricePerKg = purchaseRecord
    ? toNumber(purchaseRecord.buyPricePerKg)
    : 0

  return {
    id: Number(allocation.id),
    purchase_id: Number(allocation.purchaseId),
    quantity_kg: quantityKg,
    buy_price_per_kg: buyPricePerKg,
    buy_cost: quantityKg * buyPricePerKg,
    purchase_date: purchaseRecord?.date.toISODate() ?? '',
    supplier: purchaseRecord?.supplier ?? null,
  }
}

export function computeAllocationTotals(allocations: SaleAllocation[]) {
  let totalKg = 0
  let totalCogs = 0

  for (const allocation of allocations) {
    const qty = toNumber(allocation.quantityKg)
    const buyPrice = allocation.purchase
      ? toNumber(allocation.purchase.buyPricePerKg)
      : 0

    totalKg += qty
    totalCogs += qty * buyPrice
  }

  const avgBuyPricePerKg = totalKg > 0 ? totalCogs / totalKg : 0

  return {
    total_kg: totalKg,
    total_cogs: totalCogs,
    avg_buy_price_per_kg: avgBuyPricePerKg,
  }
}
