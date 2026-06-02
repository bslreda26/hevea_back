import Purchase from '#models/purchase'
import Sale from '#models/sale'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'

export default class SaleAllocation extends BaseModel {
  static table = 'sale_allocations'

  @column({ isPrimary: true })
  declare id: bigint | number

  @column()
  declare saleId: bigint | number

  @column()
  declare purchaseId: bigint | number

  @column()
  declare quantityKg: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Sale)
  declare sale: BelongsTo<typeof Sale>

  @belongsTo(() => Purchase)
  declare purchase: BelongsTo<typeof Purchase>
}
