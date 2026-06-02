import Purchase from '#models/purchase'
import { createPurchaseValidator, updatePurchaseValidator } from '#validators/purchase'
import { resolvePointOfSaleScope, shouldHideMargin } from '#utils/auth_helpers'
import {
  serializePurchaseDetail,
  serializePurchaseListItem,
  serializePurchaseRecord,
} from '#utils/serializers'
import type { HttpContext } from '@adonisjs/core/http'

export default class PurchasesController {
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const hideMargin = shouldHideMargin(user)
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const start = request.input('start_date') ?? request.input('start')
    const end = request.input('end_date') ?? request.input('end')
    const purchases = await Purchase.query()
      .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
        q.where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      )
      .preload('saleAllocations', (allocationQuery) => {
        allocationQuery.preload('sale', (saleQuery) => saleQuery.preload('expenses'))
      })
      .if(Boolean(start), (q) => q.where('date', '>=', String(start)))
      .if(Boolean(end), (q) => q.where('date', '<=', String(end)))
      .orderBy('date', 'desc')

    return response.json(purchases.map((p) => serializePurchaseListItem(p, hideMargin)))
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (!pointOfSaleScope.pointOfSaleId) {
      return response.unprocessableEntity({
        error: 'point_of_sale_id est requis pour cette operation',
      })
    }
    const payload = await request.validateUsing(createPurchaseValidator)

    const purchase = await Purchase.create({
      date: payload.date,
      supplier: payload.supplier ?? null,
      quantityKg: String(payload.quantity_kg),
      buyPricePerKg: String(payload.buy_price_per_kg),
      notes: payload.notes ?? null,
      pointOfSaleId: Number(pointOfSaleScope.pointOfSaleId),
    })

    return response.created(serializePurchaseRecord(purchase))
  }

  async show({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const hideMargin = shouldHideMargin(user)
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const purchase = await Purchase.query()
      .where('id', params.id)
      .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
        q.where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      )
      .preload('saleAllocations', (allocationQuery) => {
        allocationQuery.preload('sale', (saleQuery) => {
          saleQuery.preload('allocations', (nested) => nested.preload('purchase'))
          saleQuery.preload('expenses', (expensesQuery) => expensesQuery.orderBy('date', 'desc'))
        })
      })
      .preload('sales', (query) => {
        query.preload('allocations', (allocationQuery) => allocationQuery.preload('purchase'))
        query.preload('expenses', (expensesQuery) => expensesQuery.orderBy('date', 'desc'))
        query.orderBy('date', 'desc')
      })
      .firstOrFail()

    return response.json(serializePurchaseDetail(purchase, hideMargin))
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const purchase = await Purchase.query()
      .where('id', params.id)
      .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
        q.where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      )
      .firstOrFail()
    const payload = await request.validateUsing(updatePurchaseValidator)

    purchase.merge({
      ...(payload.date !== undefined ? { date: payload.date } : {}),
      ...(payload.supplier !== undefined ? { supplier: payload.supplier } : {}),
      ...(payload.quantity_kg !== undefined ? { quantityKg: String(payload.quantity_kg) } : {}),
      ...(payload.buy_price_per_kg !== undefined
        ? { buyPricePerKg: String(payload.buy_price_per_kg) }
        : {}),
      ...(payload.notes !== undefined ? { notes: payload.notes } : {}),
    })
    await purchase.save()

    return response.json(serializePurchaseRecord(purchase))
  }

  async destroy({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const purchase = await Purchase.query()
      .where('id', params.id)
      .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
        q.where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      )
      .firstOrFail()
    await purchase.delete()

    return response.json({ message: 'Deleted' })
  }
}
