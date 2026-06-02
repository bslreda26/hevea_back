/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.new_account.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_tokens.store': {
    methods: ["POST"]
    pattern: '/api/v1/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profile.profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'profile.access_tokens.destroy': {
    methods: ["POST"]
    pattern: '/api/v1/account/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_tokens_controller').default['destroy']>>>
    }
  }
  'points_of_sale.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/points-of-sale'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/points_of_sales_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/points_of_sales_controller').default['index']>>>
    }
  }
  'points_of_sale.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/points-of-sale/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/points_of_sales_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/points_of_sales_controller').default['show']>>>
    }
  }
  'points_of_sale.store': {
    methods: ["POST"]
    pattern: '/api/v1/points-of-sale'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/point_of_sale').createPointOfSaleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/point_of_sale').createPointOfSaleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/points_of_sales_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/points_of_sales_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'points_of_sale.update': {
    methods: ["PUT"]
    pattern: '/api/v1/points-of-sale/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/point_of_sale').updatePointOfSaleValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/point_of_sale').updatePointOfSaleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/points_of_sales_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/points_of_sales_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'points_of_sale.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/points-of-sale/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/points_of_sales_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/points_of_sales_controller').default['destroy']>>>
    }
  }
  'users.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['index']>>>
    }
  }
  'users.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['show']>>>
    }
  }
  'users.store': {
    methods: ["POST"]
    pattern: '/api/v1/users'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').createUserValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').createUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.update': {
    methods: ["PUT"]
    pattern: '/api/v1/users/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').updateUserValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user').updateUserValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'users.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/users/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/users_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/users_controller').default['destroy']>>>
    }
  }
  'purchases.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/purchases'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['index']>>>
    }
  }
  'purchases.store': {
    methods: ["POST"]
    pattern: '/api/v1/purchases'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/purchase').createPurchaseValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/purchase').createPurchaseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'purchases.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/purchases/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['show']>>>
    }
  }
  'purchases.update': {
    methods: ["PUT","PATCH"]
    pattern: '/api/v1/purchases/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/purchase').updatePurchaseValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/purchase').updatePurchaseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'purchases.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/purchases/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['destroy']>>>
    }
  }
  'purchases.search': {
    methods: ["POST"]
    pattern: '/api/v1/purchases/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/purchases_controller').default['index']>>>
    }
  }
  'expenses.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/expenses'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/expenses_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/expenses_controller').default['index']>>>
    }
  }
  'expenses.search': {
    methods: ["POST"]
    pattern: '/api/v1/expenses/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/expenses_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/expenses_controller').default['index']>>>
    }
  }
  'expenses.store': {
    methods: ["POST"]
    pattern: '/api/v1/expenses'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/expense').createExpenseValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/expense').createExpenseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/expenses_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/expenses_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'expenses.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/expenses/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/expenses_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/expenses_controller').default['destroy']>>>
    }
  }
  'general_expenses.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/general-expenses'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['index']>>>
    }
  }
  'general_expenses.search': {
    methods: ["POST"]
    pattern: '/api/v1/general-expenses/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['index']>>>
    }
  }
  'general_expenses.store': {
    methods: ["POST"]
    pattern: '/api/v1/general-expenses'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/general_expense').createGeneralExpenseValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/general_expense').createGeneralExpenseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'general_expenses.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/general-expenses/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['destroy']>>>
    }
  }
  'depenses_generales.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/depenses-generales'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['index']>>>
    }
  }
  'depenses_generales.search': {
    methods: ["POST"]
    pattern: '/api/v1/depenses-generales/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['index']>>>
    }
  }
  'depenses_generales.store': {
    methods: ["POST"]
    pattern: '/api/v1/depenses-generales'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/general_expense').createGeneralExpenseValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/general_expense').createGeneralExpenseValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'depenses_generales.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/depenses-generales/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/general_expenses_controller').default['destroy']>>>
    }
  }
  'sales.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/sales'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['index']>>>
    }
  }
  'sales.search': {
    methods: ["POST"]
    pattern: '/api/v1/sales/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['index']>>>
    }
  }
  'sales.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/sales/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['show']>>>
    }
  }
  'sales.store': {
    methods: ["POST"]
    pattern: '/api/v1/sales'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sale').createSaleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/sale').createSaleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'sales.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/sales/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['destroy']>>>
    }
  }
  'ventes.index': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/ventes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['index']>>>
    }
  }
  'ventes.search': {
    methods: ["POST"]
    pattern: '/api/v1/ventes/search'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['index']>>>
    }
  }
  'ventes.show': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/ventes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['show']>>>
    }
  }
  'ventes.store': {
    methods: ["POST"]
    pattern: '/api/v1/ventes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sale').createSaleValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/sale').createSaleValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'ventes.destroy': {
    methods: ["DELETE"]
    pattern: '/api/v1/ventes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sales_controller').default['destroy']>>>
    }
  }
  'reports.overview.get': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/reports/overview'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reports_controller').default['overview']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reports_controller').default['overview']>>>
    }
  }
  'reports.overview.post': {
    methods: ["POST"]
    pattern: '/api/v1/reports/overview'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reports_controller').default['overview']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reports_controller').default['overview']>>>
    }
  }
  'reports.monthly.get': {
    methods: ["GET","HEAD"]
    pattern: '/api/v1/reports/monthly'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reports_controller').default['monthly']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reports_controller').default['monthly']>>>
    }
  }
  'reports.monthly.post': {
    methods: ["POST"]
    pattern: '/api/v1/reports/monthly'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reports_controller').default['monthly']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reports_controller').default['monthly']>>>
    }
  }
}
