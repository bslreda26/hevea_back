import Purchase from '#models/purchase'
import Sale from '#models/sale'
import { ExpenseSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Expense extends ExpenseSchema {
  @belongsTo(() => Sale)
  declare sale: BelongsTo<typeof Sale>

  @belongsTo(() => Purchase)
  declare purchase: BelongsTo<typeof Purchase>
}
