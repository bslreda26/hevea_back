import vine from '@vinejs/vine'

const decimalAmount = () => vine.number().positive().decimal([0, 2])

export const createGeneralExpenseValidator = vine.create({
  label: vine.string().trim().minLength(1).maxLength(255),
  category: vine.enum([
    'investissement',
    'salaire',
    'loyer',
    'electricity',
    'wifi',
    'other',
  ]),
  amount: decimalAmount(),
  date: vine.date({ formats: ['YYYY-MM-DD', 'iso8601'] }),
  notes: vine.string().trim().maxLength(2000).optional(),
})
