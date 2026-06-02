import { UserRole } from '#constants/roles'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class ForbidUserDeleteMiddleware {
  async handle({ auth, request, response }: HttpContext, next: NextFn) {
    const user = auth.getUserOrFail()

    if (user.role === UserRole.User && request.method() === 'DELETE') {
      return response.forbidden({ error: 'Vous ne pouvez pas supprimer des enregistrements' })
    }

    return next()
  }
}
