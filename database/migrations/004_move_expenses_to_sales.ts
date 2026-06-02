import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'expenses'

  async up() {
    await this.db.from('expenses').delete()

    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['purchase_id'])
      table.dropColumn('purchase_id')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table
        .bigInteger('sale_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('sales')
        .onDelete('CASCADE')
      table.enum('type', ['lot', 'global']).notNullable()
      table
        .bigInteger('purchase_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('purchases')
        .onDelete('CASCADE')

      table.index(['sale_id'])
      table.index(['purchase_id'])
      table.index(['type'])
    })
  }

  async down() {
    await this.db.from('expenses').delete()

    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['sale_id'])
      table.dropForeign(['purchase_id'])
      table.dropColumn('sale_id')
      table.dropColumn('type')
      table.dropColumn('purchase_id')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table
        .bigInteger('purchase_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('purchases')
        .onDelete('CASCADE')
    })
  }
}
