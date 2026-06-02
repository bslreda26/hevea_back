const MONTHS_FR = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

export function monthLabel(monthKey: string): string {
  const [year, month] = monthKey.split('-')
  const monthIndex = Number.parseInt(month, 10) - 1
  return `${MONTHS_FR[monthIndex] ?? month} ${year}`
}
