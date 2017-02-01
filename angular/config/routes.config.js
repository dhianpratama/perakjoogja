export function RoutesConfig($stateProvider, $urlRouterProvider) {
  'ngInject'

  var getView = (viewName) => {
    return `./views/app/pages/${viewName}/${viewName}.page.html`
  }

  var getLayout = (layout) => {
    return `./views/app/pages/layout/${layout}.page.html`
  }

  $urlRouterProvider.otherwise('/')

  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        'layout': {
          templateUrl: getLayout('layout')
        },
        'header@app': {
          templateUrl: getView('header')
        },
        'footer@app': {
          templateUrl: getView('footer')
        },
        main: {}
      },
      data: {
        bodyClass: 'hold-transition skin-blue sidebar-mini'
      }
    })
    .state('app.landing', {
      url: '/',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<order-form></order-form>'
        }
      }
    })
    .state('app.tablessimple', {
      url: '/tables-simple',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<tables-simple></tables-simple>'
        }
      }
    })
    .state('app.uiicons', {
      url: '/ui-icons',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-icons></ui-icons>'
        }
      }
    })
    .state('app.uimodal', {
      url: '/ui-modal',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-modal></ui-modal>'
        }
      }
    })
    .state('app.uitimeline', {
      url: '/ui-timeline',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-timeline></ui-timeline>'
        }
      }
    })
    .state('app.uibuttons', {
      url: '/ui-buttons',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-buttons></ui-buttons>'
        }
      }
    })
    .state('app.uigeneral', {
      url: '/ui-general',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<ui-general></ui-general>'
        }
      }
    })
    .state('app.formsgeneral', {
      url: '/forms-general',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<forms-general></forms-general>'
        }
      }
    })
    .state('app.chartjs', {
      url: '/charts-chartjs',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<charts-chartjs></charts-chartjs>'
        }
      }
    })
    .state('app.comingsoon', {
      url: '/comingsoon',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<coming-soon></coming-soon>'
        }
      }
    })
    .state('app.profile', {
      url: '/profile',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-profile></user-profile>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userlist', {
      url: '/user-lists',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-lists></user-lists>'
        }
      }
    })
    .state('app.useredit', {
      url: '/user-edit/:userId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-edit></user-edit>'
        }
      },
      params: {
        alerts: null,
        userId: null
      }
    })
    .state('app.userroles', {
      url: '/user-roles',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles></user-roles>'
        }
      }
    })
    .state('app.userpermissions', {
      url: '/user-permissions',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions></user-permissions>'
        }
      }
    })
    .state('app.userpermissionsadd', {
      url: '/user-permissions-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-add></user-permissions-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userpermissionsedit', {
      url: '/user-permissions-edit/:permissionId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-permissions-edit></user-permissions-edit>'
        }
      },
      params: {
        alerts: null,
        permissionId: null
      }
    })
    .state('app.userrolesadd', {
      url: '/user-roles-add',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-add></user-roles-add>'
        }
      },
      params: {
        alerts: null
      }
    })
    .state('app.userrolesedit', {
      url: '/user-roles-edit/:roleId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<user-roles-edit></user-roles-edit>'
        }
      },
      params: {
        alerts: null,
        roleId: null
      }
    })
    .state('app.widgets', {
      url: '/widgets',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<widgets></widgets>'
        }
      }
    })
    .state('login', {
      url: '/login',
      views: {
        'layout': {
          templateUrl: getView('login')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        registerSuccess: null,
        successMsg: null
      }
    })
    .state('loginloader', {
      url: '/login-loader',
      views: {
        'layout': {
          templateUrl: getView('login-loader')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('register', {
      url: '/register',
      views: {
        'layout': {
          templateUrl: getView('register')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition register-page'
      }
    })
    .state('userverification', {
      url: '/userverification/:status',
      views: {
        'layout': {
          templateUrl: getView('user-verification')
        }
      },
      data: {
        bodyClass: 'hold-transition login-page'
      },
      params: {
        status: null
      }
    })
    .state('forgot_password', {
      url: '/forgot-password',
      views: {
        'layout': {
          templateUrl: getView('forgot-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('reset_password', {
      url: '/reset-password/:email/:token',
      views: {
        'layout': {
          templateUrl: getView('reset-password')
        },
        'header@app': {},
        'footer@app': {}
      },
      data: {
        bodyClass: 'hold-transition login-page'
      }
    })
    .state('app.logout', {
      url: '/logout',
      views: {
        'main@app': {
          controller: function ($rootScope, $scope, $auth, $state, AclService) {
            $auth.logout().then(function () {
              delete $rootScope.me
              AclService.flushRoles()
              AclService.setAbilities({})
              $state.go('login')
            })
          }
        }
      }
    })
    .state('app.eventtypelist', {
      url: '/event-type-list',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<event-type-list></event-type-list>'
        }
      }
    })
    .state('app.eventtypeform', {
      url: '/event-type-form/:eventTypeId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<event-type-form></event-type-form>'
        }
      },
      params: {
        alerts: null,
        eventTypeId: null
      }
    })
    .state('app.eventlist', {
      url: '/event-list',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<event-list></event-list>'
        }
      }
    })
    .state('app.eventform', {
      url: '/event-form/:eventId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<event-form></event-form>'
        }
      },
      params: {
        alerts: null,
        eventId: null
      }
    })
    .state('app.categorylist', {
      url: '/category-list',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<category-list></category-list>'
        }
      }
    })
    .state('app.categoryform', {
      url: '/category-form/:categoryId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<category-form></category-form>'
        }
      },
      params: {
        alerts: null,
        eventId: null
      }
    })
    .state('app.organizerlist', {
      url: '/organizer-list',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<organizer-list></organizer-list>'
        }
      }
    })
    .state('app.organizerform', {
      url: '/organizer-form/:organizerId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<organizer-form></organizer-form>'
        }
      },
      params: {
        alerts: null,
        eventId: null
      }
    })
    .state('app.vacancylist', {
      url: '/vacancy-list',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<vacancy-list></vacancy-list>'
        }
      }
    })
    .state('app.vacancyform', {
      url: '/vacancy-form/:vacancyId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<vacancy-form></vacancy-form>'
        }
      },
      params: {
        alerts: null,
        eventId: null
      }
    })
    .state('app.vacancytypelist', {
      url: '/vacancy-type-list',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<vacancy-type-list></vacancy-type-list>'
        }
      }
    })
    .state('app.vacancytypeform', {
      url: '/vacancy-type-form/:vacancyTypeId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<vacancy-type-form></vacancy-type-form>'
        }
      },
      params: {
        alerts: null,
        eventId: null
      }
    })

    .state('app.scholarshiplist', {
      url: '/scholarship-list',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<scholarship-list></scholarship-list>'
        }
      }
    })
    .state('app.scholarshipform', {
      url: '/scholarship-form/:scholarshipId',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<scholarship-form></scholarship-form>'
        }
      },
      params: {
        alerts: null,
        eventId: null
      }
    })

    /*
     * PERAK JOOGJA ROUTES
     *
    */
    .state('app.master-product', {
      url: '/master-product',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<product-list></product-list>'
        }
      }
    })
    .state('app.master-product-form', {
      url: '/master-product-form',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<product-form></product-form>'
        }
      },
      params: {
        alerts: null,
        productId: null
      }
    })

    .state('app.order-form', {
      url: '/order-form',
      data: {
        auth: true
      },
      views: {
        'main@app': {
          template: '<order-form></order-form>'
        }
      }
    })
}
