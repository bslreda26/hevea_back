import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'general_expenses'

  async up() {
    this.defer(async (db) => {
      await db.rawQuery(
        `
        ALTER TABLE ${this.tableName}
        MODIFY COLUMN category ENUM(
          'investissement',
          'salaire',
          'loyer',
          'electricity',
          'wifi',
          'other'
        ) NOT NULL DEFAULT 'other'
        `
      )
    })
  }

  async down() {
    this.defer(async (db) => {
      await db.rawQuery(
        `
        ALTER TABLE ${this.tableName}
        MODIFY COLUMN category ENUM(
          'investissement',
          'exploitation'
        ) NOT NULL DEFAULT 'exploitation'
        `
      )
    })
  }
}
