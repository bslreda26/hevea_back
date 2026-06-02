/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    newAccount: {
      store: typeof routes['auth.new_account.store']
    }
    accessTokens: {
      store: typeof routes['auth.access_tokens.store']
    }
  }
  profile: {
    profile: {
      show: typeof routes['profile.profile.show']
    }
    accessTokens: {
      destroy: typeof routes['profile.access_tokens.destroy']
    }
  }
  pointsOfSale: {
    index: typeof routes['points_of_sale.index']
    show: typeof routes['points_of_sale.show']
    store: typeof routes['points_of_sale.store']
    update: typeof routes['points_of_sale.update']
    destroy: typeof routes['points_of_sale.destroy']
  }
  users: {
    index: typeof routes['users.index']
    show: typeof routes['users.show']
    store: typeof routes['users.store']
    update: typeof routes['users.update']
    destroy: typeof routes['users.destroy']
  }
  purchases: {
    index: typeof routes['purchases.index']
    store: typeof routes['purchases.store']
    show: typeof routes['purchases.show']
    update: typeof routes['purchases.update']
    destroy: typeof routes['purchases.destroy']
    search: typeof routes['purchases.search']
  }
  expenses: {
    index: typeof routes['expenses.index']
    search: typeof routes['expenses.search']
    store: typeof routes['expenses.store']
    destroy: typeof routes['expenses.destroy']
  }
  generalExpenses: {
    index: typeof routes['general_expenses.index']
    search: typeof routes['general_expenses.search']
    store: typeof routes['general_expenses.store']
    destroy: typeof routes['general_expenses.destroy']
  }
  depensesGenerales: {
    index: typeof routes['depenses_generales.index']
    search: typeof routes['depenses_generales.search']
    store: typeof routes['depenses_generales.store']
    destroy: typeof routes['depenses_generales.destroy']
  }
  sales: {
    index: typeof routes['sales.index']
    search: typeof routes['sales.search']
    show: typeof routes['sales.show']
    store: typeof routes['sales.store']
    destroy: typeof routes['sales.destroy']
  }
  ventes: {
    index: typeof routes['ventes.index']
    search: typeof routes['ventes.search']
    show: typeof routes['ventes.show']
    store: typeof routes['ventes.store']
    destroy: typeof routes['ventes.destroy']
  }
  reports: {
    overview: {
      get: typeof routes['reports.overview.get']
      post: typeof routes['reports.overview.post']
    }
    monthly: {
      get: typeof routes['reports.monthly.get']
      post: typeof routes['reports.monthly.post']
    }
  }
}
