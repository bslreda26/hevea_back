const MARGIN_KEYS = new Set([
  'profit',
  'real_margin',
  'profit_on_sales',
  'global_cost_per_kg',
  'total_cogs',
  'avg_buy_price_per_kg',
  'avg_sell_price_per_kg',
  'total_revenue',
  'total_buy_cost',
  'vente_expenses',
  'exploitation_expenses',
  'investissement_total',
  'investissement_expenses',
  'buy_cost',
])

export function stripMarginFields<T>(value: T): T {
  if (value === null || value === undefined) {
    return value
  }

  if (Array.isArray(value)) {
    return value.map((item) => stripMarginFields(item)) as T
  }

  if (typeof value === 'object') {
    const result: Record<string, unknown> = {}
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      if (MARGIN_KEYS.has(key)) {
        continue
      }
      result[key] = stripMarginFields(nested)
    }
    return result as T
  }

  return value
}
