import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').notNullable()
      table
        .bigInteger('purchase_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('purchases')
        .onDelete('CASCADE')
      table.string('buyer', 255).nullable()
      table.decimal('quantity_kg', 10, 2).notNullable()
      table.decimal('sell_price_per_kg', 10, 2).notNullable()
      table.date('date').notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['purchase_id'])
      table.index(['date'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
