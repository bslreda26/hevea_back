import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'expenses'

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
      table.string('label', 255).notNullable()
      table.decimal('amount', 12, 2).notNullable()
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
