import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'general_expenses'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table
        .enum('category', ['investissement', 'exploitation'])
        .notNullable()
        .defaultTo('exploitation')
        .after('label')

      table.index(['category'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex(['category'])
      table.dropColumn('category')
    })
  }
}
