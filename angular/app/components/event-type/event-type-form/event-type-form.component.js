class EventTypeFormController {
  constructor ($stateParams, $state, API) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []
    this.API = API

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }

    let eventTypeId = $stateParams.eventTypeId

    this.data = null

    API.one('eventtype/detail',eventTypeId).get()
      .then((response) => {
        this.data = response.data
      })
  }

  save (isValid) {
    if (isValid) {
      let self = this
      self.API.service('eventtype')
      .post(self.data)
      .then(() => {
          swal({
            title: 'Save!',
            text: 'Event has been saved.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            self.$state.go('app.eventtypelist')
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

export const EventTypeFormComponent = {
  templateUrl: './views/app/components/event-type/event-type-form/event-type-form.component.html',
  controller: EventTypeFormController,
  controllerAs: 'vm',
  bindings: {}
}
