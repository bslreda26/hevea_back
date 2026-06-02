import GeneralExpense from '#models/general_expense'
import { createGeneralExpenseValidator } from '#validators/general_expense'
import { serializeGeneralExpense } from '#utils/serializers'
import { resolvePointOfSaleScope } from '#utils/auth_helpers'
import type { HttpContext } from '@adonisjs/core/http'

export default class GeneralExpensesController {
  async index({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const year = request.input('year')
    const month = request.input('month')
    const category = request.input('category')
    const start = request.input('start_date') ?? request.input('start')
    const end = request.input('end_date') ?? request.input('end')
    const allowedCategories = new Set([
      'investissement',
      'salaire',
      'loyer',
      'electricity',
      'wifi',
      'other',
    ])

    const query = GeneralExpense.query()
      .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
        q.where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      )
      .orderBy('date', 'desc')

    if (month) {
      const [y, m] = String(month).split('-')
      query.whereRaw('YEAR(date) = ? AND MONTH(date) = ?', [Number(y), Number(m)])
    } else if (year) {
      query.whereRaw('YEAR(date) = ?', [Number(year)])
    }

    if (start && end) {
      query.whereBetween('date', [String(start), String(end)])
    } else if (start) {
      query.where('date', '>=', String(start))
    } else if (end) {
      query.where('date', '<=', String(end))
    }

    if (allowedCategories.has(String(category))) {
      query.where('category', category)
    }

    const expenses = await query

    return response.json(expenses.map(serializeGeneralExpense))
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (!pointOfSaleScope.pointOfSaleId) {
      return response.unprocessableEntity({
        error: 'point_of_sale_id est requis pour cette operation',
      })
    }
    const payload = await request.validateUsing(createGeneralExpenseValidator)

    const expense = await GeneralExpense.create({
      label: payload.label,
      category: payload.category,
      amount: String(payload.amount),
      date: payload.date,
      notes: payload.notes ?? null,
      pointOfSaleId: Number(pointOfSaleScope.pointOfSaleId),
    })

    return response.created(serializeGeneralExpense(expense))
  }

  async destroy({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const pointOfSaleScope = await resolvePointOfSaleScope(user, request.input('point_of_sale_id'))
    if (pointOfSaleScope.error) {
      return response.unprocessableEntity({ error: pointOfSaleScope.error })
    }
    const expense = await GeneralExpense.query()
      .where('id', params.id)
      .if(Boolean(pointOfSaleScope.pointOfSaleId), (q) =>
        q.where('pointOfSaleId', Number(pointOfSaleScope.pointOfSaleId))
      )
      .firstOrFail()
    await expense.delete()

    return response.json({ message: 'Deleted' })
  }
}
