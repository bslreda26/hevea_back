import Expense from '#models/expense'
import Sale from '#models/sale'
import { createExpenseValidator } from '#validators/expense'
import { serializeExpense } from '#utils/serializers'
import { resolvePointOfSaleScope } from '#utils/auth_helpers'
import type { HttpContext } from '@adonisjs/core/http'

export default class ExpensesController {
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const saleId = request.input('sale_id')
    const start = request.input('start_date') ?? request.input('start')
    const end = request.input('end_date') ?? request.input('end')

    const query = Expense.query()
      .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
        q.where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      )
      .if(Boolean(saleId), (q) => q.where('saleId', saleId))
      .if(Boolean(start), (q) => q.where('date', '>=', String(start)))
      .if(Boolean(end), (q) => q.where('date', '<=', String(end)))
      .orderBy('date', 'desc')
    const expenses = await query

    return response.json(expenses.map(serializeExpense))
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (!pointOfSaleScope.pointOfSaleId) {
      return response.unprocessableEntity({
        error: 'point_of_sale_id est requis pour cette operation',
      })
    }
    const payload = await request.validateUsing(createExpenseValidator)
    const sale = await Sale.query()
      .where('id', payload.sale_id)
      .where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      .preload('allocations')
      .firstOrFail()

    let purchaseId: number | null = null

    if (payload.purchase_id) {
      const linked = sale.allocations.some((row) => Number(row.purchaseId) === payload.purchase_id)
      if (!linked) {
        return response.unprocessableEntity({
          error: 'purchase_id ne fait pas partie de cette vente',
        })
      }
      purchaseId = payload.purchase_id
    } else if (sale.allocations.length === 1) {
      purchaseId = Number(sale.allocations[0].purchaseId)
    }

    const expense = await Expense.create({
      saleId: payload.sale_id,
      type: 'lot',
      purchaseId,
      label: payload.label,
      amount: String(payload.amount),
      date: payload.date,
      pointOfSaleId: Number(pointOfSaleScope.pointOfSaleId),
    })

    return response.created(serializeExpense(expense))
  }

  async destroy({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const expense = await Expense.query()
      .where('id', params.id)
      .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
        q.where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      )
      .firstOrFail()
    await expense.delete()

    return response.json({ message: 'Deleted' })
  }
}
