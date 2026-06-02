import { isAdminRole } from '#constants/roles'
import PointOfSale from '#models/point_of_sale'
import { createPointOfSaleValidator, updatePointOfSaleValidator } from '#validators/point_of_sale'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class PointsOfSalesController {
  async index({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()

    if (isAdminRole(user.role)) {
      const points = await PointOfSale.query().orderBy('name', 'asc')
      return response.json(points)
    }

    const point = await PointOfSale.findOrFail(user.pointOfSaleId)
    return response.json([point])
  }

  async store({ auth, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    if (!isAdminRole(user.role)) {
      return response.forbidden({ error: 'Seul un administrateur peut creer un point de vente' })
    }

    const payload = await request.validateUsing(createPointOfSaleValidator)
    const point = await PointOfSale.create({ name: payload.name })

    return response.created(point)
  }

  async show({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    const requestedId = Number(params.id)
    if (!Number.isInteger(requestedId) || requestedId <= 0) {
      return response.badRequest({ error: 'ID invalide' })
    }

    if (isAdminRole(user.role)) {
      const point = await PointOfSale.findOrFail(requestedId)
      return response.json(point)
    }

    if (Number(user.pointOfSaleId) !== requestedId) {
      return response.forbidden({ error: 'Acces refuse a ce point de vente' })
    }

    const point = await PointOfSale.findOrFail(requestedId)
    return response.json(point)
  }

  async update({ auth, params, request, response }: HttpContext) {
    const user = auth.getUserOrFail()
    if (!isAdminRole(user.role)) {
      return response.forbidden({ error: 'Seul un administrateur peut modifier un point de vente' })
    }

    const requestedId = Number(params.id)
    if (!Number.isInteger(requestedId) || requestedId <= 0) {
      return response.badRequest({ error: 'ID invalide' })
    }

    const point = await PointOfSale.findOrFail(requestedId)
    const payload = await request.validateUsing(updatePointOfSaleValidator)
    const normalizedName = payload.name.trim()

    const duplicate = await PointOfSale.query()
      .where('name', normalizedName)
      .whereNot('id', requestedId)
      .first()

    if (duplicate) {
      return response.unprocessableEntity({ error: 'Ce nom de point de vente existe deja' })
    }

    point.name = normalizedName
    await point.save()

    return response.json(point)
  }

  async destroy({ auth, params, response }: HttpContext) {
    const user = auth.getUserOrFail()
    if (!isAdminRole(user.role)) {
      return response.forbidden({
        error: 'Seul un administrateur peut supprimer un point de vente',
      })
    }

    const requestedId = Number(params.id)
    if (!Number.isInteger(requestedId) || requestedId <= 0) {
      return response.badRequest({ error: 'ID invalide' })
    }

    const point = await PointOfSale.findOrFail(requestedId)

    const [usageRow] = await db
      .from('users')
      .where('point_of_sale_id', requestedId)
      .count('* as usersCount')
    const [purchaseRow] = await db
      .from('purchases')
      .where('point_of_sale_id', requestedId)
      .count('* as purchasesCount')
    const [saleRow] = await db
      .from('sales')
      .where('point_of_sale_id', requestedId)
      .count('* as salesCount')
    const [expenseRow] = await db
      .from('expenses')
      .where('point_of_sale_id', requestedId)
      .count('* as expensesCount')
    const [generalExpenseRow] = await db
      .from('general_expenses')
      .where('point_of_sale_id', requestedId)
      .count('* as generalExpensesCount')

    const hasLinkedData =
      Number((usageRow as { usersCount: string | number }).usersCount) > 0 ||
      Number((purchaseRow as { purchasesCount: string | number }).purchasesCount) > 0 ||
      Number((saleRow as { salesCount: string | number }).salesCount) > 0 ||
      Number((expenseRow as { expensesCount: string | number }).expensesCount) > 0 ||
      Number(
        (generalExpenseRow as { generalExpensesCount: string | number }).generalExpensesCount
      ) > 0

    if (hasLinkedData) {
      return response.unprocessableEntity({
        error:
          'Suppression impossible: ce point de vente est deja utilise par des utilisateurs ou des donnees',
      })
    }

    await point.delete()
    return response.json({ message: 'Deleted' })
  }
}
