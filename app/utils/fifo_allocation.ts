import Purchase from '#models/purchase'
import SaleAllocation from '#models/sale_allocation'
import { toNumber } from '#utils/numbers'

export type FifoAllocationLine = {
  purchase_id: number
  quantity_kg: number
  buy_price_per_kg: number
}

export type PurchaseStock = {
  purchase: Purchase
  remaining_kg: number
}

/**
 * Remaining kg per purchase = bought − sum(allocations).
 */
export async function loadPurchasesWithStock(
  purchaseId?: number,
  pointOfSaleId?: number
): Promise<PurchaseStock[]> {
  const query = Purchase.query().orderBy('date', 'asc').orderBy('id', 'asc')

  if (purchaseId !== undefined) {
    query.where('id', purchaseId)
  }
  if (pointOfSaleId !== undefined) {
    query.where('pointOfSaleId', pointOfSaleId)
  }

  const purchases = await query

  if (purchases.length === 0) {
    return []
  }

  const purchaseIds = purchases.map((p) => Number(p.id))
  const allocationRows = await SaleAllocation.query()
    .whereIn('purchaseId', purchaseIds)
    .select('purchaseId')
    .sum('quantity_kg as total_allocated')
    .groupBy('purchaseId')

  const allocatedByPurchase = new Map<number, number>()
  for (const row of allocationRows) {
    allocatedByPurchase.set(
      Number(row.purchaseId),
      toNumber((row.$extras as { total_allocated: string }).total_allocated)
    )
  }

  return purchases
    .map((purchase) => {
      const quantityKg = toNumber(purchase.quantityKg)
      const allocated = allocatedByPurchase.get(Number(purchase.id)) ?? 0
      const remainingKg = quantityKg - allocated

      return { purchase, remaining_kg: remainingKg }
    })
    .filter((item) => item.remaining_kg > 0)
}

/**
 * FIFO across purchases (oldest date first, then id).
 */
export function allocateFifo(stock: PurchaseStock[], quantityKg: number): FifoAllocationLine[] {
  let remaining = quantityKg
  const lines: FifoAllocationLine[] = []

  for (const { purchase, remaining_kg: available } of stock) {
    if (remaining <= 0) {
      break
    }

    const take = Math.min(remaining, available)
    if (take <= 0) {
      continue
    }

    lines.push({
      purchase_id: Number(purchase.id),
      quantity_kg: take,
      buy_price_per_kg: toNumber(purchase.buyPricePerKg),
    })

    remaining -= take
  }

  if (remaining > 0.001) {
    return []
  }

  return lines
}
