class VacancyFormController {
  constructor($stateParams, $state, $timeout, $linq, API) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []
    this.API = API
    this.organizers = []
    this.vacancy_types = []
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

    let vacancyId = $stateParams.vacancyId

    this.data = null

    API.one('vacancy/detail', vacancyId).get()
      .then((response) => {
        this.data = response.data

        this.getProvinces()
        this.getCities()
      })

    this.getOrganizers()
    this.getTypes()

  }

  getOrganizers() {
    let that = this
    that.API.service('organizer')
      .getList()
      .then((response) => {
        that.organizers = response.plain()
      });
  }

  getTypes() {
    let that = this
    that.API.service('vacancytype')
      .getList()
      .then((response) => {
        that.vacancy_types = response.plain()
      });
  }

  save(isValid) {
    if (isValid) {
      let self = this
      self.API.service('vacancy')
        .post(self.data)
        .then(() => {
          swal({
            title: 'Save!',
            text: 'Vacancy has been saved.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            self.$state.go('app.vacancylist')
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

        that.data.province_id = that.provinces[0].province_id;

      });
  }

  getCities() {
    let that = this
    that.API.service('public/cities')
      .getList()
      .then((response) => {
        that.cities = response.plain()

        if (that.data.city_id != null && that.data.city_id > 0) {
          let city = this.$linq.Enumerable()
            .From(this.cities)
            .Where((e) => { return e.city_id === that.data.city_id })
            .FirstOrDefault();

          that.onProvinceChange(city.province_id);
        } else {
          that.onProvinceChange(that.data.province_id);
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

export const VacancyFormComponent = {
  templateUrl: './views/app/components/vacancy/vacancy-form/vacancy-form.component.html',
  controller: VacancyFormController,
  controllerAs: 'vm',
  bindings: {}
}
