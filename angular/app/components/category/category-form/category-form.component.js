class CategoryFormController {
  constructor ($stateParams, $state, $timeout, API, toastr) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []
    this.API = API
    this.toastr = toastr

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
      let self = this
      $timeout(()=>{
          self.alerts = []
      },2000)
    }

    let categoryId = $stateParams.categoryId

    this.data = null

    API.one('category/detail',categoryId).get()
      .then((response) => {
        this.data = response.data
      })
  }

  save (isValid) {
    if (isValid) {
      let self = this
      self.API.service('category')
      .post(self.data)
      .then(() => {
          swal({
            title: 'Save!',
            text: 'Category has been saved.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            self.$state.go('app.categorylist')
          })
        }, (response) => {
          let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
          self.$state.go(self.$state.current, { alerts: alert})
        })
    } else {
      this.formSubmitted = true
    }
  }

  $onInit () {}
}

export const CategoryFormComponent = {
  templateUrl: './views/app/components/category/category-form/category-form.component.html',
  controller: CategoryFormController,
  controllerAs: 'vm',
  bindings: {}
}
