/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_tokens.store']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'profile.access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['profile.access_tokens.destroy']['types'],
  },
  'points_of_sale.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/points-of-sale',
    tokens: [{"old":"/api/v1/points-of-sale","type":0,"val":"api","end":""},{"old":"/api/v1/points-of-sale","type":0,"val":"v1","end":""},{"old":"/api/v1/points-of-sale","type":0,"val":"points-of-sale","end":""}],
    types: placeholder as Registry['points_of_sale.index']['types'],
  },
  'points_of_sale.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/points-of-sale/:id',
    tokens: [{"old":"/api/v1/points-of-sale/:id","type":0,"val":"api","end":""},{"old":"/api/v1/points-of-sale/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/points-of-sale/:id","type":0,"val":"points-of-sale","end":""},{"old":"/api/v1/points-of-sale/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['points_of_sale.show']['types'],
  },
  'points_of_sale.store': {
    methods: ["POST"],
    pattern: '/api/v1/points-of-sale',
    tokens: [{"old":"/api/v1/points-of-sale","type":0,"val":"api","end":""},{"old":"/api/v1/points-of-sale","type":0,"val":"v1","end":""},{"old":"/api/v1/points-of-sale","type":0,"val":"points-of-sale","end":""}],
    types: placeholder as Registry['points_of_sale.store']['types'],
  },
  'points_of_sale.update': {
    methods: ["PUT"],
    pattern: '/api/v1/points-of-sale/:id',
    tokens: [{"old":"/api/v1/points-of-sale/:id","type":0,"val":"api","end":""},{"old":"/api/v1/points-of-sale/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/points-of-sale/:id","type":0,"val":"points-of-sale","end":""},{"old":"/api/v1/points-of-sale/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['points_of_sale.update']['types'],
  },
  'points_of_sale.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/points-of-sale/:id',
    tokens: [{"old":"/api/v1/points-of-sale/:id","type":0,"val":"api","end":""},{"old":"/api/v1/points-of-sale/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/points-of-sale/:id","type":0,"val":"points-of-sale","end":""},{"old":"/api/v1/points-of-sale/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['points_of_sale.destroy']['types'],
  },
  'users.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.index']['types'],
  },
  'users.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.show']['types'],
  },
  'users.store': {
    methods: ["POST"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.store']['types'],
  },
  'users.update': {
    methods: ["PUT"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.update']['types'],
  },
  'users.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.destroy']['types'],
  },
  'purchases.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/purchases',
    tokens: [{"old":"/api/v1/purchases","type":0,"val":"api","end":""},{"old":"/api/v1/purchases","type":0,"val":"v1","end":""},{"old":"/api/v1/purchases","type":0,"val":"purchases","end":""}],
    types: placeholder as Registry['purchases.index']['types'],
  },
  'purchases.store': {
    methods: ["POST"],
    pattern: '/api/v1/purchases',
    tokens: [{"old":"/api/v1/purchases","type":0,"val":"api","end":""},{"old":"/api/v1/purchases","type":0,"val":"v1","end":""},{"old":"/api/v1/purchases","type":0,"val":"purchases","end":""}],
    types: placeholder as Registry['purchases.store']['types'],
  },
  'purchases.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/purchases/:id',
    tokens: [{"old":"/api/v1/purchases/:id","type":0,"val":"api","end":""},{"old":"/api/v1/purchases/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/purchases/:id","type":0,"val":"purchases","end":""},{"old":"/api/v1/purchases/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['purchases.show']['types'],
  },
  'purchases.update': {
    methods: ["PUT","PATCH"],
    pattern: '/api/v1/purchases/:id',
    tokens: [{"old":"/api/v1/purchases/:id","type":0,"val":"api","end":""},{"old":"/api/v1/purchases/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/purchases/:id","type":0,"val":"purchases","end":""},{"old":"/api/v1/purchases/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['purchases.update']['types'],
  },
  'purchases.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/purchases/:id',
    tokens: [{"old":"/api/v1/purchases/:id","type":0,"val":"api","end":""},{"old":"/api/v1/purchases/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/purchases/:id","type":0,"val":"purchases","end":""},{"old":"/api/v1/purchases/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['purchases.destroy']['types'],
  },
  'purchases.search': {
    methods: ["POST"],
    pattern: '/api/v1/purchases/search',
    tokens: [{"old":"/api/v1/purchases/search","type":0,"val":"api","end":""},{"old":"/api/v1/purchases/search","type":0,"val":"v1","end":""},{"old":"/api/v1/purchases/search","type":0,"val":"purchases","end":""},{"old":"/api/v1/purchases/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['purchases.search']['types'],
  },
  'expenses.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/expenses',
    tokens: [{"old":"/api/v1/expenses","type":0,"val":"api","end":""},{"old":"/api/v1/expenses","type":0,"val":"v1","end":""},{"old":"/api/v1/expenses","type":0,"val":"expenses","end":""}],
    types: placeholder as Registry['expenses.index']['types'],
  },
  'expenses.search': {
    methods: ["POST"],
    pattern: '/api/v1/expenses/search',
    tokens: [{"old":"/api/v1/expenses/search","type":0,"val":"api","end":""},{"old":"/api/v1/expenses/search","type":0,"val":"v1","end":""},{"old":"/api/v1/expenses/search","type":0,"val":"expenses","end":""},{"old":"/api/v1/expenses/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['expenses.search']['types'],
  },
  'expenses.store': {
    methods: ["POST"],
    pattern: '/api/v1/expenses',
    tokens: [{"old":"/api/v1/expenses","type":0,"val":"api","end":""},{"old":"/api/v1/expenses","type":0,"val":"v1","end":""},{"old":"/api/v1/expenses","type":0,"val":"expenses","end":""}],
    types: placeholder as Registry['expenses.store']['types'],
  },
  'expenses.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/expenses/:id',
    tokens: [{"old":"/api/v1/expenses/:id","type":0,"val":"api","end":""},{"old":"/api/v1/expenses/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/expenses/:id","type":0,"val":"expenses","end":""},{"old":"/api/v1/expenses/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['expenses.destroy']['types'],
  },
  'general_expenses.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/general-expenses',
    tokens: [{"old":"/api/v1/general-expenses","type":0,"val":"api","end":""},{"old":"/api/v1/general-expenses","type":0,"val":"v1","end":""},{"old":"/api/v1/general-expenses","type":0,"val":"general-expenses","end":""}],
    types: placeholder as Registry['general_expenses.index']['types'],
  },
  'general_expenses.search': {
    methods: ["POST"],
    pattern: '/api/v1/general-expenses/search',
    tokens: [{"old":"/api/v1/general-expenses/search","type":0,"val":"api","end":""},{"old":"/api/v1/general-expenses/search","type":0,"val":"v1","end":""},{"old":"/api/v1/general-expenses/search","type":0,"val":"general-expenses","end":""},{"old":"/api/v1/general-expenses/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['general_expenses.search']['types'],
  },
  'general_expenses.store': {
    methods: ["POST"],
    pattern: '/api/v1/general-expenses',
    tokens: [{"old":"/api/v1/general-expenses","type":0,"val":"api","end":""},{"old":"/api/v1/general-expenses","type":0,"val":"v1","end":""},{"old":"/api/v1/general-expenses","type":0,"val":"general-expenses","end":""}],
    types: placeholder as Registry['general_expenses.store']['types'],
  },
  'general_expenses.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/general-expenses/:id',
    tokens: [{"old":"/api/v1/general-expenses/:id","type":0,"val":"api","end":""},{"old":"/api/v1/general-expenses/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/general-expenses/:id","type":0,"val":"general-expenses","end":""},{"old":"/api/v1/general-expenses/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['general_expenses.destroy']['types'],
  },
  'depenses_generales.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/depenses-generales',
    tokens: [{"old":"/api/v1/depenses-generales","type":0,"val":"api","end":""},{"old":"/api/v1/depenses-generales","type":0,"val":"v1","end":""},{"old":"/api/v1/depenses-generales","type":0,"val":"depenses-generales","end":""}],
    types: placeholder as Registry['depenses_generales.index']['types'],
  },
  'depenses_generales.search': {
    methods: ["POST"],
    pattern: '/api/v1/depenses-generales/search',
    tokens: [{"old":"/api/v1/depenses-generales/search","type":0,"val":"api","end":""},{"old":"/api/v1/depenses-generales/search","type":0,"val":"v1","end":""},{"old":"/api/v1/depenses-generales/search","type":0,"val":"depenses-generales","end":""},{"old":"/api/v1/depenses-generales/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['depenses_generales.search']['types'],
  },
  'depenses_generales.store': {
    methods: ["POST"],
    pattern: '/api/v1/depenses-generales',
    tokens: [{"old":"/api/v1/depenses-generales","type":0,"val":"api","end":""},{"old":"/api/v1/depenses-generales","type":0,"val":"v1","end":""},{"old":"/api/v1/depenses-generales","type":0,"val":"depenses-generales","end":""}],
    types: placeholder as Registry['depenses_generales.store']['types'],
  },
  'depenses_generales.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/depenses-generales/:id',
    tokens: [{"old":"/api/v1/depenses-generales/:id","type":0,"val":"api","end":""},{"old":"/api/v1/depenses-generales/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/depenses-generales/:id","type":0,"val":"depenses-generales","end":""},{"old":"/api/v1/depenses-generales/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['depenses_generales.destroy']['types'],
  },
  'sales.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/sales',
    tokens: [{"old":"/api/v1/sales","type":0,"val":"api","end":""},{"old":"/api/v1/sales","type":0,"val":"v1","end":""},{"old":"/api/v1/sales","type":0,"val":"sales","end":""}],
    types: placeholder as Registry['sales.index']['types'],
  },
  'sales.search': {
    methods: ["POST"],
    pattern: '/api/v1/sales/search',
    tokens: [{"old":"/api/v1/sales/search","type":0,"val":"api","end":""},{"old":"/api/v1/sales/search","type":0,"val":"v1","end":""},{"old":"/api/v1/sales/search","type":0,"val":"sales","end":""},{"old":"/api/v1/sales/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['sales.search']['types'],
  },
  'sales.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/sales/:id',
    tokens: [{"old":"/api/v1/sales/:id","type":0,"val":"api","end":""},{"old":"/api/v1/sales/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/sales/:id","type":0,"val":"sales","end":""},{"old":"/api/v1/sales/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sales.show']['types'],
  },
  'sales.store': {
    methods: ["POST"],
    pattern: '/api/v1/sales',
    tokens: [{"old":"/api/v1/sales","type":0,"val":"api","end":""},{"old":"/api/v1/sales","type":0,"val":"v1","end":""},{"old":"/api/v1/sales","type":0,"val":"sales","end":""}],
    types: placeholder as Registry['sales.store']['types'],
  },
  'sales.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/sales/:id',
    tokens: [{"old":"/api/v1/sales/:id","type":0,"val":"api","end":""},{"old":"/api/v1/sales/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/sales/:id","type":0,"val":"sales","end":""},{"old":"/api/v1/sales/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['sales.destroy']['types'],
  },
  'ventes.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/ventes',
    tokens: [{"old":"/api/v1/ventes","type":0,"val":"api","end":""},{"old":"/api/v1/ventes","type":0,"val":"v1","end":""},{"old":"/api/v1/ventes","type":0,"val":"ventes","end":""}],
    types: placeholder as Registry['ventes.index']['types'],
  },
  'ventes.search': {
    methods: ["POST"],
    pattern: '/api/v1/ventes/search',
    tokens: [{"old":"/api/v1/ventes/search","type":0,"val":"api","end":""},{"old":"/api/v1/ventes/search","type":0,"val":"v1","end":""},{"old":"/api/v1/ventes/search","type":0,"val":"ventes","end":""},{"old":"/api/v1/ventes/search","type":0,"val":"search","end":""}],
    types: placeholder as Registry['ventes.search']['types'],
  },
  'ventes.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/ventes/:id',
    tokens: [{"old":"/api/v1/ventes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/ventes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/ventes/:id","type":0,"val":"ventes","end":""},{"old":"/api/v1/ventes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['ventes.show']['types'],
  },
  'ventes.store': {
    methods: ["POST"],
    pattern: '/api/v1/ventes',
    tokens: [{"old":"/api/v1/ventes","type":0,"val":"api","end":""},{"old":"/api/v1/ventes","type":0,"val":"v1","end":""},{"old":"/api/v1/ventes","type":0,"val":"ventes","end":""}],
    types: placeholder as Registry['ventes.store']['types'],
  },
  'ventes.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/ventes/:id',
    tokens: [{"old":"/api/v1/ventes/:id","type":0,"val":"api","end":""},{"old":"/api/v1/ventes/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/ventes/:id","type":0,"val":"ventes","end":""},{"old":"/api/v1/ventes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['ventes.destroy']['types'],
  },
  'reports.overview.get': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/reports/overview',
    tokens: [{"old":"/api/v1/reports/overview","type":0,"val":"api","end":""},{"old":"/api/v1/reports/overview","type":0,"val":"v1","end":""},{"old":"/api/v1/reports/overview","type":0,"val":"reports","end":""},{"old":"/api/v1/reports/overview","type":0,"val":"overview","end":""}],
    types: placeholder as Registry['reports.overview.get']['types'],
  },
  'reports.overview.post': {
    methods: ["POST"],
    pattern: '/api/v1/reports/overview',
    tokens: [{"old":"/api/v1/reports/overview","type":0,"val":"api","end":""},{"old":"/api/v1/reports/overview","type":0,"val":"v1","end":""},{"old":"/api/v1/reports/overview","type":0,"val":"reports","end":""},{"old":"/api/v1/reports/overview","type":0,"val":"overview","end":""}],
    types: placeholder as Registry['reports.overview.post']['types'],
  },
  'reports.monthly.get': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/reports/monthly',
    tokens: [{"old":"/api/v1/reports/monthly","type":0,"val":"api","end":""},{"old":"/api/v1/reports/monthly","type":0,"val":"v1","end":""},{"old":"/api/v1/reports/monthly","type":0,"val":"reports","end":""},{"old":"/api/v1/reports/monthly","type":0,"val":"monthly","end":""}],
    types: placeholder as Registry['reports.monthly.get']['types'],
  },
  'reports.monthly.post': {
    methods: ["POST"],
    pattern: '/api/v1/reports/monthly',
    tokens: [{"old":"/api/v1/reports/monthly","type":0,"val":"api","end":""},{"old":"/api/v1/reports/monthly","type":0,"val":"v1","end":""},{"old":"/api/v1/reports/monthly","type":0,"val":"reports","end":""},{"old":"/api/v1/reports/monthly","type":0,"val":"monthly","end":""}],
    types: placeholder as Registry['reports.monthly.post']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
