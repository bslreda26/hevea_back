import Expense from '#models/expense'
import Purchase from '#models/purchase'
import SaleAllocation from '#models/sale_allocation'
import { SaleSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Sale extends SaleSchema {
  @belongsTo(() => Purchase)
  declare purchase: BelongsTo<typeof Purchase>

  @hasMany(() => Expense)
  declare expenses: HasMany<typeof Expense>

  @hasMany(() => SaleAllocation)
  declare allocations: HasMany<typeof SaleAllocation>
}
