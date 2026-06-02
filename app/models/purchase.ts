import Sale from '#models/sale'
import SaleAllocation from '#models/sale_allocation'
import { PurchaseSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Purchase extends PurchaseSchema {
  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>

  @hasMany(() => SaleAllocation)
  declare saleAllocations: HasMany<typeof SaleAllocation>
}
