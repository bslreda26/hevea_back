import { PointsOfSaleSchema } from '#database/schema'

export default class PointOfSale extends PointsOfSaleSchema {
  static table = 'points_of_sale'
}
