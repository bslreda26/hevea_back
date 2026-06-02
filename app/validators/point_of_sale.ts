import vine from '@vinejs/vine'

export const createPointOfSaleValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(150).unique({
    table: 'points_of_sale',
    column: 'name',
  }),
})

export const updatePointOfSaleValidator = vine.create({
  name: vine.string().trim().minLength(2).maxLength(150),
})
