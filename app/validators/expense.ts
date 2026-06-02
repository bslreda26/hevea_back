import vine from '@vinejs/vine'

const decimalAmount = () => vine.number().positive().decimal([0, 2])

/** Dépense liée à une vente : transport, chargement, déchargement */
export const createExpenseValidator = vine.create({
  sale_id: vine.number().withoutDecimals().positive(),
  label: vine.string().trim().minLength(1).maxLength(255),
  amount: decimalAmount(),
  date: vine.date({ formats: ['YYYY-MM-DD', 'iso8601'] }),
  purchase_id: vine.number().withoutDecimals().positive().optional(),
})
