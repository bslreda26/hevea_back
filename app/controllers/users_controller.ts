import { isAdminRole } from '#constants/roles'
import PointOfSale from '#models/point_of_sale'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { createUserValidator, updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async index({ auth, response, serialize }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    if (!isAdminRole(currentUser.role)) {
      return response.forbidden({ error: 'Seul un administrateur peut lister les utilisateurs' })
    }

    const users = await User.query().orderBy('created_at', 'desc')
    return serialize(users.map((user) => UserTransformer.transform(user)))
  }

  async show({ auth, params, response, serialize }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    if (!isAdminRole(currentUser.role)) {
      return response.forbidden({ error: 'Seul un administrateur peut consulter un utilisateur' })
    }

    const user = await User.findOrFail(params.id)
    return serialize(UserTransformer.transform(user))
  }

  async store({ auth, request, response, serialize }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    if (!isAdminRole(currentUser.role)) {
      return response.forbidden({ error: 'Seul un administrateur peut creer des utilisateurs' })
    }

    const payload = await request.validateUsing(createUserValidator)
    const pointOfSale = await PointOfSale.find(payload.point_of_sale_id)
    if (!pointOfSale) {
      return response.unprocessableEntity({ error: 'Point de vente introuvable' })
    }

    const existingEmail = await User.findBy('email', payload.email)
    if (existingEmail) {
      return response.unprocessableEntity({ error: 'Cet email existe deja' })
    }

    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      role: payload.role,
      pointOfSaleId: payload.point_of_sale_id,
    })

    return response.created(serialize(UserTransformer.transform(user)))
  }

  async update({ auth, params, request, response, serialize }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    if (!isAdminRole(currentUser.role)) {
      return response.forbidden({ error: 'Seul un administrateur peut modifier des utilisateurs' })
    }

    const user = await User.findOrFail(params.id)
    const payload = await request.validateUsing(updateUserValidator)

    if (payload.email) {
      const duplicate = await User.query()
        .where('email', payload.email)
        .whereNot('id', user.id)
        .first()
      if (duplicate) {
        return response.unprocessableEntity({ error: 'Cet email existe deja' })
      }
    }

    if (payload.point_of_sale_id !== undefined) {
      const pointOfSale = await PointOfSale.find(payload.point_of_sale_id)
      if (!pointOfSale) {
        return response.unprocessableEntity({ error: 'Point de vente introuvable' })
      }
    }

    user.merge({
      ...(payload.fullName !== undefined ? { fullName: payload.fullName } : {}),
      ...(payload.email !== undefined ? { email: payload.email } : {}),
      ...(payload.password !== undefined ? { password: payload.password } : {}),
      ...(payload.role !== undefined ? { role: payload.role } : {}),
      ...(payload.point_of_sale_id !== undefined
        ? { pointOfSaleId: payload.point_of_sale_id }
        : {}),
    })

    await user.save()
    return serialize(UserTransformer.transform(user))
  }

  async destroy({ auth, params, response }: HttpContext) {
    const currentUser = auth.getUserOrFail()
    if (!isAdminRole(currentUser.role)) {
      return response.forbidden({ error: 'Seul un administrateur peut supprimer des utilisateurs' })
    }

    const user = await User.findOrFail(params.id)
    if (Number(user.id) === Number(currentUser.id)) {
      return response.unprocessableEntity({
        error: 'Vous ne pouvez pas supprimer votre propre compte',
      })
    }

    await user.delete()
    return response.json({ message: 'Deleted' })
  }
}
