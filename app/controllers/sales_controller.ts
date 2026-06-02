import Sale from '#models/sale'
import SaleAllocation from '#models/sale_allocation'
import { createSaleValidator } from '#validators/sale'
import { resolvePointOfSaleScope, shouldHideMargin } from '#utils/auth_helpers'
import { allocateFifo, loadPurchasesWithStock } from '#utils/fifo_allocation'
import { serializeSale } from '#utils/serializers'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class SalesController {
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const hideMargin = shouldHideMargin(user)
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const purchaseId = request.input('purchase_id')
    const start = request.input('start_date') ?? request.input('start')
    const end = request.input('end_date') ?? request.input('end')

    const query = Sale.query()
      .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
        q.where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      )
      .preload('allocations', (allocationQuery) => {
        allocationQuery.preload('purchase')
      })
      .preload('expenses', (expenseQuery) => expenseQuery.orderBy('date', 'desc'))
      .if(Boolean(start), (q) => q.where('date', '>=', String(start)))
      .if(Boolean(end), (q) => q.where('date', '<=', String(end)))
      .orderBy('date', 'desc')

    if (purchaseId) {
      query.whereHas('allocations', (allocationQuery) => {
        allocationQuery.where('purchaseId', purchaseId)
      })
    }

    const sales = await query

    return response.json(
      sales.map((sale) => serializeSale(sale, { includeExpenses: true, hideMargin }))
    )
  }

  async show({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const hideMargin = shouldHideMargin(user)
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const sale = await Sale.query()
      .where('id', params.id)
      .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
        q.where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      )
      .preload('allocations', (allocationQuery) => {
        allocationQuery.preload('purchase')
      })
      .preload('expenses', (expenseQuery) => expenseQuery.orderBy('date', 'desc'))
      .firstOrFail()

    return response.json(serializeSale(sale, { includeExpenses: true, hideMargin }))
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const hideMargin = shouldHideMargin(user)
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (!pointOfSaleScope.pointOfSaleId) {
      return response.unprocessableEntity({
        error: 'point_of_sale_id est requis pour cette operation',
      })
    }
    const payload = await request.validateUsing(createSaleValidator)

    const stock = await loadPurchasesWithStock(payload.purchase_id, pointOfSaleScope.pointOfSaleId)
    const lines = allocateFifo(stock, payload.quantity_kg)

    if (lines.length === 0) {
      return response.unprocessableEntity({
        error: 'Quantité vendue dépasse le stock disponible',
        available_kg: stock.reduce((sum, item) => sum + item.remaining_kg, 0),
      })
    }

    const trx = await db.transaction()

    try {
      const sale = await Sale.create(
        {
          purchaseId: lines.length === 1 ? lines[0].purchase_id : null,
          buyer: payload.buyer ?? null,
          quantityKg: String(payload.quantity_kg),
          sellPricePerKg: String(payload.sell_price_per_kg),
          date: payload.date,
          pointOfSaleId: Number(pointOfSaleScope.pointOfSaleId),
        },
        { client: trx }
      )

      for (const line of lines) {
        await SaleAllocation.create(
          {
            saleId: sale.id,
            purchaseId: line.purchase_id,
            quantityKg: String(line.quantity_kg),
          },
          { client: trx }
        )
      }

      await trx.commit()

      await sale.load('allocations', (allocationQuery) => {
        allocationQuery.preload('purchase')
      })

      return response.created(serializeSale(sale, { includeExpenses: true, hideMargin }))
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  async destroy({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const sale = await Sale.query()
      .where('id', params.id)
      .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
        q.where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      )
      .firstOrFail()
    await sale.delete()

    return response.json({ message: 'Deleted' })
  }
}
