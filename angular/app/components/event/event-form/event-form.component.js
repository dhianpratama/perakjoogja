class EventFormController {
  constructor($scope, $stateParams, $state, $timeout, $http, API, moment, $linq, Upload) {
    'ngInject'

    this.$state = $state
    this.formSubmitted = false
    this.alerts = []
    this.API = API
    this.moment = moment
    this.$linq = $linq
    this.$scope = $scope
    this.Upload = Upload
    this.$timeout = $timeout
    this.$http = $http

    this.eventTypes = []
    this.categories = []
    this.organizers = []
    this.provinces = []
    this.cities = []
    this.filteredCities = []

    this.sd_datepicker = {
      opened: false
    };

    this.ed_datepicker = {
      opened: false
    };


    if ($stateParams.alerts) {
      this.alerts.push($stateParams.alerts)
    }

    let eventId = $stateParams.eventId

    this.data = null

    API.one('event/detail', eventId).get()
      .then((response) => {
        this.data = response.data
        this.getCategories()
      })

    this.getEventTypes()
    this.getOrganizers()
    this.getCategories()
    this.getProvinces()
    this.getCities()
  }

  save(isValid) {
    if (isValid) {
      let self = this

      self.data.category_ids = self.$linq.Enumerable()
        .From(self.categories)
        .Where((e) => { return e.is_selected })
        .Select((e) => { return e.id })
        .ToArray();

      self.API.service('event')
        .post(self.data)
        .then(() => {
          swal({
            title: 'Save!',
            text: 'Event has been saved.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            self.$state.go('app.eventlist')
          })

        }, (response) => {
          let alert = { type: 'error', 'title': 'Error!', msg: response.data.message }
          //self.$state.go(self.$state.current, { alerts: alert})
          self.alerts = []
          self.alerts.push(alert)
        })
    } else {
      this.formSubmitted = true
    }
  }

  $onInit() { }

  getEventTypes() {
    let that = this
    that.API.service('eventtype')
      .getList()
      .then((response) => {
        that.eventTypes = response.plain()
      });
  }

  getOrganizers() {
    let that = this
    that.API.service('organizer')
      .getList()
      .then((response) => {
        that.organizers = response.plain()
      });
  }

  getCategories() {
    let that = this
    that.API.service('category')
      .getList()
      .then((response) => {
        that.categories = response.plain()

        if (that.data.categories != null) {
          angular.forEach(that.data.categories, (cat) => {
            angular.forEach(that.categories, (mcat) => {
              if (mcat.id == cat.id)
                mcat.is_selected = true
            })
          })
        }
      });
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

  onClearDate() {
    this.data.start_date = null;
    this.data.end_date = null;
  }

  uploadFile(file, errFiles) {
    let that = this;
    that.$scope.f = file;
    that.$scope.errFile = errFiles && errFiles[0];
    if (file) {

      let endPoint = 'https://yctbucket.s3-ap-southeast-1.amazonaws.com/';
      let keyFile = 'uploaded_files/' + file.type + '/' + file.name;
      file.upload = that.Upload.upload({
        url: endPoint, //S3 upload url including bucket name
        method: 'POST',
        data: {
          key: keyFile, // the key to store the file on S3, could be file name or customized
          AWSAccessKeyId: 'AKIAJVVTNLAS7YNEIRBQ',
          acl: 'public-read', // sets the access to the uploaded file in the bucket: private, public-read, ...
          policy: 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogInljdGJ1Y2tldCJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIka2V5IiwgInVwbG9hZGVkX2ZpbGVzIl0sCiAgICB7ImFjbCI6ICJwdWJsaWMtcmVhZCJ9LAogICAgWyJzdGFydHMtd2l0aCIsICIkQ29udGVudC1UeXBlIiwgIiJdCiAgXQp9',
          signature: 'e3GcECBhh3BKn+/Bhat8FwAu7Zs=', // base64-encoded signature based on policy string (see article below)
          "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
          //filename: file.name, // this is needed for Flash polyfill IE8-9
          file: file
        },
        headers: {
          'Authorization': undefined
        }
      });

      file.upload.then(function (response) {
        that.$timeout(function () {
          file.result = response.data;
          that.data.picture_url = endPoint + keyFile;
        });
      }, function (response) {
        if (response.status > 0)
          that.$scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 *
          evt.loaded / evt.total));
      });

      // we restore the auth Token in the $http headers

    }
  }
}

export const EventFormComponent = {
  templateUrl: './views/app/components/event/event-form/event-form.component.html',
  controller: EventFormController,
  controllerAs: 'vm',
  bindings: {}
}
