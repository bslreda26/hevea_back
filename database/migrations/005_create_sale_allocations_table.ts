import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sale_allocations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigIncrements('id').notNullable()
      table
        .bigInteger('sale_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('sales')
        .onDelete('CASCADE')
      table
        .bigInteger('purchase_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('purchases')
        .onDelete('CASCADE')
      table.decimal('quantity_kg', 10, 2).notNullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['sale_id'])
      table.index(['purchase_id'])
    })

    this.defer(async (db) => {
      await db.rawQuery(`
        INSERT INTO sale_allocations (sale_id, purchase_id, quantity_kg, created_at, updated_at)
        SELECT id, purchase_id, quantity_kg, created_at, updated_at
        FROM sales
      `)
    })

    this.schema.alterTable('sales', (table) => {
      table.bigInteger('purchase_id').unsigned().nullable().alter()
    })
  }

  async down() {
    await this.db.rawQuery(`
      UPDATE sales s
      INNER JOIN (
        SELECT sale_id, MIN(purchase_id) AS purchase_id
        FROM sale_allocations
        GROUP BY sale_id
      ) a ON a.sale_id = s.id
      SET s.purchase_id = a.purchase_id
      WHERE s.purchase_id IS NULL
    `)

    this.schema.alterTable('sales', (table) => {
      table.bigInteger('purchase_id').unsigned().notNullable().alter()
    })

    this.schema.dropTable(this.tableName)
  }
}
