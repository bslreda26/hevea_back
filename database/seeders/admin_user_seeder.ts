import { UserRole } from '#constants/roles'
import PointOfSale from '#models/point_of_sale'
import User from '#models/user'
import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const email = env.get('ADMIN_EMAIL', 'admin@hevea.local')
    const password = env.get('ADMIN_PASSWORD', 'HeveaAdmin2024!')
    const fullName = env.get('ADMIN_NAME', 'Administrateur')
    const pointOfSale = await PointOfSale.firstOrCreate(
      { name: 'Point de vente principal' },
      { name: 'Point de vente principal' }
    )

    const existing = await User.findBy('email', email)
    if (existing) {
      existing.pointOfSaleId = Number(existing.pointOfSaleId || pointOfSale.id)
      if (existing.role !== UserRole.Admin) {
        existing.role = UserRole.Admin
      }
      await existing.save()
      return
    }

    await User.create({
      email,
      password,
      fullName,
      role: UserRole.Admin,
      pointOfSaleId: Number(pointOfSale.id),
    })
  }
}
