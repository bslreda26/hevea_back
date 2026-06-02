import { UserRole } from '#constants/roles'
import PointOfSale from '#models/point_of_sale'
import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class NewAccountController {
  async store({ auth, request, response, serialize }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)
    const userCount = await User.query().count('* as total')
    const isFirstUser = Number(userCount[0].$extras.total) === 0

    if (!isFirstUser) {
      const currentUser = auth.user
      if (!currentUser?.isAdmin) {
        return response.forbidden({
          error: 'Seul un administrateur peut créer des comptes',
        })
      }
    }

    const role = isFirstUser ? UserRole.Admin : (payload.role ?? UserRole.User)

    let pointOfSaleId = payload.point_of_sale_id
    if (isFirstUser) {
      const defaultPointOfSale = await PointOfSale.firstOrCreate(
        { name: 'Point de vente principal' },
        { name: 'Point de vente principal' }
      )
      pointOfSaleId = Number(defaultPointOfSale.id)
    }

    if (!pointOfSaleId) {
      return response.unprocessableEntity({
        error: 'point_of_sale_id est requis',
      })
    }

    const pointOfSale = await PointOfSale.find(pointOfSaleId)
    if (!pointOfSale) {
      return response.unprocessableEntity({
        error: 'Point de vente introuvable',
      })
    }

    const user = await User.create({
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
      role,
      pointOfSaleId: Number(pointOfSale.id),
    })

    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }
}
