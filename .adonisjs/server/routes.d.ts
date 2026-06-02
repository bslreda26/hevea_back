import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'points_of_sale.index': { paramsTuple?: []; params?: {} }
    'points_of_sale.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'points_of_sale.store': { paramsTuple?: []; params?: {} }
    'points_of_sale.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'points_of_sale.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.store': { paramsTuple?: []; params?: {} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchases.index': { paramsTuple?: []; params?: {} }
    'purchases.store': { paramsTuple?: []; params?: {} }
    'purchases.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchases.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchases.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchases.search': { paramsTuple?: []; params?: {} }
    'expenses.index': { paramsTuple?: []; params?: {} }
    'expenses.search': { paramsTuple?: []; params?: {} }
    'expenses.store': { paramsTuple?: []; params?: {} }
    'expenses.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'general_expenses.index': { paramsTuple?: []; params?: {} }
    'general_expenses.search': { paramsTuple?: []; params?: {} }
    'general_expenses.store': { paramsTuple?: []; params?: {} }
    'general_expenses.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'depenses_generales.index': { paramsTuple?: []; params?: {} }
    'depenses_generales.search': { paramsTuple?: []; params?: {} }
    'depenses_generales.store': { paramsTuple?: []; params?: {} }
    'depenses_generales.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.index': { paramsTuple?: []; params?: {} }
    'sales.search': { paramsTuple?: []; params?: {} }
    'sales.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.store': { paramsTuple?: []; params?: {} }
    'sales.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventes.index': { paramsTuple?: []; params?: {} }
    'ventes.search': { paramsTuple?: []; params?: {} }
    'ventes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventes.store': { paramsTuple?: []; params?: {} }
    'ventes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reports.overview.get': { paramsTuple?: []; params?: {} }
    'reports.overview.post': { paramsTuple?: []; params?: {} }
    'reports.monthly.get': { paramsTuple?: []; params?: {} }
    'reports.monthly.post': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'points_of_sale.index': { paramsTuple?: []; params?: {} }
    'points_of_sale.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchases.index': { paramsTuple?: []; params?: {} }
    'purchases.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expenses.index': { paramsTuple?: []; params?: {} }
    'general_expenses.index': { paramsTuple?: []; params?: {} }
    'depenses_generales.index': { paramsTuple?: []; params?: {} }
    'sales.index': { paramsTuple?: []; params?: {} }
    'sales.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventes.index': { paramsTuple?: []; params?: {} }
    'ventes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reports.overview.get': { paramsTuple?: []; params?: {} }
    'reports.monthly.get': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'profile.profile.show': { paramsTuple?: []; params?: {} }
    'points_of_sale.index': { paramsTuple?: []; params?: {} }
    'points_of_sale.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.index': { paramsTuple?: []; params?: {} }
    'users.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchases.index': { paramsTuple?: []; params?: {} }
    'purchases.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expenses.index': { paramsTuple?: []; params?: {} }
    'general_expenses.index': { paramsTuple?: []; params?: {} }
    'depenses_generales.index': { paramsTuple?: []; params?: {} }
    'sales.index': { paramsTuple?: []; params?: {} }
    'sales.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventes.index': { paramsTuple?: []; params?: {} }
    'ventes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'reports.overview.get': { paramsTuple?: []; params?: {} }
    'reports.monthly.get': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'auth.new_account.store': { paramsTuple?: []; params?: {} }
    'auth.access_tokens.store': { paramsTuple?: []; params?: {} }
    'profile.access_tokens.destroy': { paramsTuple?: []; params?: {} }
    'points_of_sale.store': { paramsTuple?: []; params?: {} }
    'users.store': { paramsTuple?: []; params?: {} }
    'purchases.store': { paramsTuple?: []; params?: {} }
    'purchases.search': { paramsTuple?: []; params?: {} }
    'expenses.search': { paramsTuple?: []; params?: {} }
    'expenses.store': { paramsTuple?: []; params?: {} }
    'general_expenses.search': { paramsTuple?: []; params?: {} }
    'general_expenses.store': { paramsTuple?: []; params?: {} }
    'depenses_generales.search': { paramsTuple?: []; params?: {} }
    'depenses_generales.store': { paramsTuple?: []; params?: {} }
    'sales.search': { paramsTuple?: []; params?: {} }
    'sales.store': { paramsTuple?: []; params?: {} }
    'ventes.search': { paramsTuple?: []; params?: {} }
    'ventes.store': { paramsTuple?: []; params?: {} }
    'reports.overview.post': { paramsTuple?: []; params?: {} }
    'reports.monthly.post': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'points_of_sale.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchases.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'points_of_sale.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'purchases.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'expenses.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'general_expenses.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'depenses_generales.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'sales.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'ventes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PATCH: {
    'purchases.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}