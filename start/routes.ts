/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router
      .group(() => {
        router
          .get('points-of-sale', [controllers.PointsOfSales, 'index'])
          .as('points_of_sale.index')
        router
          .get('points-of-sale/:id', [controllers.PointsOfSales, 'show'])
          .as('points_of_sale.show')
        router
          .post('points-of-sale', [controllers.PointsOfSales, 'store'])
          .as('points_of_sale.store')
        router
          .put('points-of-sale/:id', [controllers.PointsOfSales, 'update'])
          .as('points_of_sale.update')
        router
          .delete('points-of-sale/:id', [controllers.PointsOfSales, 'destroy'])
          .as('points_of_sale.destroy')
        router.get('users', [controllers.Users, 'index']).as('users.index')
        router.get('users/:id', [controllers.Users, 'show']).as('users.show')
        router.post('users', [controllers.Users, 'store']).as('users.store')
        router.put('users/:id', [controllers.Users, 'update']).as('users.update')
        router.delete('users/:id', [controllers.Users, 'destroy']).as('users.destroy')
        router.resource('purchases', controllers.Purchases).apiOnly()
        router.post('purchases/search', [controllers.Purchases, 'index']).as('purchases.search')
        router.get('expenses', [controllers.Expenses, 'index']).as('expenses.index')
        router.post('expenses/search', [controllers.Expenses, 'index']).as('expenses.search')
        router.post('expenses', [controllers.Expenses, 'store']).as('expenses.store')
        router.delete('expenses/:id', [controllers.Expenses, 'destroy']).as('expenses.destroy')
        router
          .get('general-expenses', [controllers.GeneralExpenses, 'index'])
          .as('general_expenses.index')
        router
          .post('general-expenses/search', [controllers.GeneralExpenses, 'index'])
          .as('general_expenses.search')
        router
          .post('general-expenses', [controllers.GeneralExpenses, 'store'])
          .as('general_expenses.store')
        router
          .delete('general-expenses/:id', [controllers.GeneralExpenses, 'destroy'])
          .as('general_expenses.destroy')
        router
          .get('depenses-generales', [controllers.GeneralExpenses, 'index'])
          .as('depenses_generales.index')
        router
          .post('depenses-generales/search', [controllers.GeneralExpenses, 'index'])
          .as('depenses_generales.search')
        router
          .post('depenses-generales', [controllers.GeneralExpenses, 'store'])
          .as('depenses_generales.store')
        router
          .delete('depenses-generales/:id', [controllers.GeneralExpenses, 'destroy'])
          .as('depenses_generales.destroy')
        router.get('sales', [controllers.Sales, 'index']).as('sales.index')
        router.post('sales/search', [controllers.Sales, 'index']).as('sales.search')
        router.get('sales/:id', [controllers.Sales, 'show']).as('sales.show')
        router.post('sales', [controllers.Sales, 'store']).as('sales.store')
        router.delete('sales/:id', [controllers.Sales, 'destroy']).as('sales.destroy')
        router.get('ventes', [controllers.Sales, 'index']).as('ventes.index')
        router.post('ventes/search', [controllers.Sales, 'index']).as('ventes.search')
        router.get('ventes/:id', [controllers.Sales, 'show']).as('ventes.show')
        router.post('ventes', [controllers.Sales, 'store']).as('ventes.store')
        router.delete('ventes/:id', [controllers.Sales, 'destroy']).as('ventes.destroy')

        router
          .group(() => {
            router
              .get('reports/overview', [controllers.Reports, 'overview'])
              .as('reports.overview.get')
            router
              .post('reports/overview', [controllers.Reports, 'overview'])
              .as('reports.overview.post')
            router
              .get('reports/monthly', [controllers.Reports, 'monthly'])
              .as('reports.monthly.get')
            router
              .post('reports/monthly', [controllers.Reports, 'monthly'])
              .as('reports.monthly.post')
          })
          .use(middleware.admin())
      })
      .use([middleware.auth(), middleware.forbidUserDelete()])
  })
  .prefix('/api/v1')
