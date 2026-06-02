import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    const hasPointsOfSaleTable = await this.schema.hasTable('points_of_sale')
    if (!hasPointsOfSaleTable) {
      this.schema.createTable('points_of_sale', (table) => {
        table.increments('id').notNullable()
        table.string('name', 150).notNullable().unique()
        table.timestamp('created_at').notNullable().defaultTo(this.now())
        table.timestamp('updated_at').nullable()
      })
    }

    await this.defer(async (db) => {
      const existingDefault = await db
        .from('points_of_sale')
        .where('name', 'Point de vente principal')
        .first()

      if (!existingDefault) {
        await db.table('points_of_sale').insert({
          name: 'Point de vente principal',
          created_at: db.raw('CURRENT_TIMESTAMP'),
        })
      }
    })

    const hasUsersPosColumn = await this.schema.hasColumn('users', 'point_of_sale_id')
    if (!hasUsersPosColumn) {
      this.schema.alterTable('users', (table) => {
        table
          .integer('point_of_sale_id')
          .unsigned()
          .references('id')
          .inTable('points_of_sale')
          .nullable()
      })
    }

    const hasPurchasesPosColumn = await this.schema.hasColumn('purchases', 'point_of_sale_id')
    if (!hasPurchasesPosColumn) {
      this.schema.alterTable('purchases', (table) => {
        table
          .integer('point_of_sale_id')
          .unsigned()
          .references('id')
          .inTable('points_of_sale')
          .nullable()
        table.index(['point_of_sale_id'])
      })
    }

    const hasSalesPosColumn = await this.schema.hasColumn('sales', 'point_of_sale_id')
    if (!hasSalesPosColumn) {
      this.schema.alterTable('sales', (table) => {
        table
          .integer('point_of_sale_id')
          .unsigned()
          .references('id')
          .inTable('points_of_sale')
          .nullable()
        table.index(['point_of_sale_id'])
      })
    }

    const hasExpensesPosColumn = await this.schema.hasColumn('expenses', 'point_of_sale_id')
    if (!hasExpensesPosColumn) {
      this.schema.alterTable('expenses', (table) => {
        table
          .integer('point_of_sale_id')
          .unsigned()
          .references('id')
          .inTable('points_of_sale')
          .nullable()
        table.index(['point_of_sale_id'])
      })
    }

    const hasGeneralExpensesPosColumn = await this.schema.hasColumn(
      'general_expenses',
      'point_of_sale_id'
    )
    if (!hasGeneralExpensesPosColumn) {
      this.schema.alterTable('general_expenses', (table) => {
        table
          .integer('point_of_sale_id')
          .unsigned()
          .references('id')
          .inTable('points_of_sale')
          .nullable()
        table.index(['point_of_sale_id'])
      })
    }

    await this.defer(async (db) => {
      const [defaultPos] = await db
        .from('points_of_sale')
        .select('id')
        .orderBy('id', 'asc')
        .limit(1)
      const defaultPosId = Number(defaultPos.id)

      await db
        .from('users')
        .whereNull('point_of_sale_id')
        .update({ point_of_sale_id: defaultPosId })
      await db
        .from('purchases')
        .whereNull('point_of_sale_id')
        .update({ point_of_sale_id: defaultPosId })
      await db
        .from('sales')
        .whereNull('point_of_sale_id')
        .update({ point_of_sale_id: defaultPosId })
      await db
        .from('expenses')
        .whereNull('point_of_sale_id')
        .update({ point_of_sale_id: defaultPosId })
      await db
        .from('general_expenses')
        .whereNull('point_of_sale_id')
        .update({ point_of_sale_id: defaultPosId })
    })

    this.schema.alterTable('users', (table) => {
      table.integer('point_of_sale_id').unsigned().notNullable().alter()
      table.index(['point_of_sale_id'])
    })
  }

  async down() {
    this.schema.alterTable('general_expenses', (table) => {
      table.dropIndex(['point_of_sale_id'])
      table.dropColumn('point_of_sale_id')
    })

    this.schema.alterTable('expenses', (table) => {
      table.dropIndex(['point_of_sale_id'])
      table.dropColumn('point_of_sale_id')
    })

    this.schema.alterTable('sales', (table) => {
      table.dropIndex(['point_of_sale_id'])
      table.dropColumn('point_of_sale_id')
    })

    this.schema.alterTable('purchases', (table) => {
      table.dropIndex(['point_of_sale_id'])
      table.dropColumn('point_of_sale_id')
    })

    this.schema.alterTable('users', (table) => {
      table.dropIndex(['point_of_sale_id'])
      table.dropColumn('point_of_sale_id')
    })

    this.schema.dropTable('points_of_sale')
  }
}
