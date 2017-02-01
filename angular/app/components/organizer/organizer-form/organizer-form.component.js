class OrganizerFormController {
  constructor ($stateParams, $state, API) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []
    this.API = API

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }

    let organizerId = $stateParams.organizerId

    this.data = null

    API.one('organizer/detail',organizerId).get()
      .then((response) => {
        this.data = response.data
      })
  }

  save (isValid) {
    if (isValid) {
      let self = this
      self.API.service('organizer')
      .post(self.data)
      .then(() => {
          swal({
            title: 'Save!',
            text: 'Organizer has been saved.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            self.$state.go('app.organizerlist')
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

export const OrganizerFormComponent = {
  templateUrl: './views/app/components/organizer/organizer-form/organizer-form.component.html',
  controller: OrganizerFormController,
  controllerAs: 'vm',
  bindings: {}
}
