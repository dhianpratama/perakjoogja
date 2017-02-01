class ProductFormController {
  constructor($stateParams, $state, $timeout, API, toastr) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []
    this.API = API
    this.toastr = toastr

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
      let self = this
      $timeout(() => {
        self.alerts = []
      }, 2000)
    }

    let productId = $stateParams.productId;

    this.data = null;

    this.types = ["Cincin", "Gelang", "Liontin", "Lainnya"];

    API.one('product/detail', productId).get()
      .then((response) => {
        this.data = response.data
      })
  }

  save(isValid) {
    if (isValid) {
      let self = this
      self.API.service('product')
        .post(self.data)
        .then(() => {
          swal({
            title: 'Save!',
            text: 'Product has been saved.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            self.$state.go('app.master-product')
          })
        }, (response) => {
          let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
          self.$state.go(self.$state.current, { alerts: alert })
        })
    } else {
      this.formSubmitted = true
    }
  }

  $onInit() { }
}

export const ProductFormComponent = {
  templateUrl: './views/app/components/product/product-form/product-form.component.html',
  controller: ProductFormController,
  controllerAs: 'vm',
  bindings: {}
}
