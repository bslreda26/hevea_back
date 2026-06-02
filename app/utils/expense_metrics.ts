import type Expense from '#models/expense'
import { toNumber } from '#utils/numbers'

/** Dépenses sur une vente (transport, chargement, déchargement…) */
export function sumVenteExpenses(expenses: Expense[] = []): number {
  return expenses.reduce((sum, expense) => sum + toNumber(expense.amount), 0)
}
