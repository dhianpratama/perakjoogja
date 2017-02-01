class ScholarshipFormController {
  constructor($stateParams, $state, $timeout, $linq, API) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []
    this.API = API
    this.organizers = []
    this.scholarship_types = []
    this.$linq = $linq;

    this.datepicker = {
      opened: false
    };

    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
      let self = this
      $timeout(() => {
        self.alerts = []
      }, 2000)
    }

    let scholarshipId = $stateParams.scholarshipId

    this.data = null

    API.one('scholarship/detail', scholarshipId).get()
      .then((response) => {
        this.data = response.data

        this.getProvinces()
        this.getCities()
      })

    this.getOrganizers()
    this.getProvinces()
    this.getCities()

  }

  getOrganizers() {
    let that = this
    that.API.service('organizer')
      .getList()
      .then((response) => {
        that.organizers = response.plain()
      });
  }

  save(isValid) {
    if (isValid) {
      let self = this
      self.API.service('scholarship')
        .post(self.data)
        .then(() => {
          swal({
            title: 'Save!',
            text: 'Scholarship has been saved.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            self.$state.go('app.scholarshiplist')
          })
        }, (response) => {
          let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
          self.$state.go(self.$state.current, { alerts: alert })
        })
    } else {
      this.formSubmitted = true
    }
  }

  onClearDate() {
    this.data.due_date = null;
  }

  getProvinces() {
    let that = this
    that.API.service('public/provinces')
      .getList()
      .then((response) => {
        that.provinces = response.plain()
        if (that.data) {
          that.data.province_id = that.provinces[0].province_id;
        }
      });
  }

  getCities() {
    let that = this
    that.API.service('public/cities')
      .getList()
      .then((response) => {
        that.cities = response.plain()
        if (that.data) {
          if (that.data.city_id != null && that.data.city_id > 0) {
            let city = this.$linq.Enumerable()
              .From(this.cities)
              .Where((e) => { return e.city_id === that.data.city_id })
              .FirstOrDefault();

            that.onProvinceChange(city.province_id);
          } else {
            that.onProvinceChange(that.data.province_id);
          }
        }
      });
  }

  onProvinceChange(id) {
    let newCities = this.$linq.Enumerable()
      .From(this.cities)
      .Where((e) => { return e.province_id === id })
      .ToArray();

    this.filteredCities = newCities;
  }

  $onInit() { }
}

export const ScholarshipFormComponent = {
  templateUrl: './views/app/components/scholarship/scholarship-form/scholarship-form.component.html',
  controller: ScholarshipFormController,
  controllerAs: 'vm',
  bindings: {}
}
