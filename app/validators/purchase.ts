import vine from '@vinejs/vine'

const decimal = () => vine.number().positive().decimal([0, 2])
const optionalNotes = () => vine.string().trim().optional()

export const createPurchaseValidator = vine.create({
  date: vine.date({ formats: ['YYYY-MM-DD', 'iso8601'] }),
  supplier: vine.string().trim().maxLength(255).optional(),
  quantity_kg: decimal(),
  buy_price_per_kg: decimal(),
  notes: optionalNotes(),
})

export const updatePurchaseValidator = vine.create({
  date: vine.date({ formats: ['YYYY-MM-DD', 'iso8601'] }).optional(),
  supplier: vine.string().trim().maxLength(255).nullable().optional(),
  quantity_kg: decimal().optional(),
  buy_price_per_kg: decimal().optional(),
  notes: vine.string().trim().nullable().optional(),
})
