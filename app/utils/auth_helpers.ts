import { isAdminRole } from '#constants/roles'
import PointOfSale from '#models/point_of_sale'
import type User from '#models/user'

export function shouldHideMargin(user: User): boolean {
  return !isAdminRole(user.role)
}

export async function resolvePointOfSaleScope(
  user: User,
  rawPointOfSaleId: unknown
): Promise<{ pointOfSaleId?: number; error?: string }> {
  if (!isAdminRole(user.role)) {
    if (!user.pointOfSaleId) {
      return { error: 'Utilisateur non attribue a un point de vente' }
    }
    return { pointOfSaleId: Number(user.pointOfSaleId) }
  }

  if (rawPointOfSaleId === undefined || rawPointOfSaleId === null || rawPointOfSaleId === '') {
    return {}
  }

  const parsed = Number(rawPointOfSaleId)
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return { error: 'point_of_sale_id invalide' }
  }

  const pointOfSale = await PointOfSale.find(parsed)
  if (!pointOfSale) {
    return { error: 'Point de vente introuvable' }
  }

  return { pointOfSaleId: parsed }
}
