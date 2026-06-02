import vine from '@vinejs/vine'

const decimalKg = () => vine.number().positive().decimal([0, 2])
const decimalPrice = () => vine.number().positive().decimal([0, 2])

export const createSaleValidator = vine.create({
  /** When set, sell only from this achat. Otherwise FIFO across all stock. */
  purchase_id: vine.number().withoutDecimals().positive().optional(),
  buyer: vine.string().trim().maxLength(255).optional(),
  quantity_kg: decimalKg(),
  sell_price_per_kg: decimalPrice(),
  date: vine.date({ formats: ['YYYY-MM-DD', 'iso8601'] }),
})
