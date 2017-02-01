class OrderFormController {
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

    let orderId = $stateParams.orderId;

    this.data = null;
    this.selectedProduct = null;

    this.types = ["Cincin", "Gelang", "Liontin", "Lainnya"];

    this.ringTypes = ["Single Pria", "Single Wanita", "Couple"];
    this.materials = ["Perak", "Perak Lapis Emas", "Emas", "Emas Putih", "Paladium"];

    this.getAllProducts();
  }

  getAllProducts(){
    let ProductService = this.API.service('product')

    ProductService.getList()
      .then((response) => {
        this.products = response.plain()
      });
  }

  save(isValid) {
    if (isValid) {
      let self = this
      self.API.service('order')
        .post(self.data)
        .then(() => {
          swal({
            title: 'Save!',
            text: 'Order has been saved.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            
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

export const OrderFormComponent = {
  templateUrl: './views/app/components/order-form/order-form.component.html',
  controller: OrderFormController,
  controllerAs: 'vm',
  bindings: {}
}
