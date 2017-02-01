class VacancyTypeFormController {
  constructor ($stateParams, $state, $timeout, API) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []
    this.API = API

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
      let self = this
      $timeout(()=>{
          self.alerts = []
      },2000)
    }

    let vacancyTypeId = $stateParams.vacancyTypeId

    this.data = null

    API.one('vacancytype/detail',vacancyTypeId).get()
      .then((response) => {
        this.data = response.data
      })
  }

  save (isValid) {
    if (isValid) {
      let self = this
      self.API.service('vacancytype')
      .post(self.data)
      .then(() => {
          swal({
            title: 'Save!',
            text: 'Vacancy type has been saved.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            self.$state.go('app.vacancytypelist')
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

export const VacancyTypeFormComponent = {
  templateUrl: './views/app/components/vacancy-type/vacancy-type-form/vacancy-type-form.component.html',
  controller: VacancyTypeFormController,
  controllerAs: 'vm',
  bindings: {}
}
