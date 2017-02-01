class EventListController {
  constructor ($scope, $state, $compile, $log, DTOptionsBuilder, DTColumnBuilder, API, moment) {
    'ngInject'
    this.API = API
    this.$state = $state
    this.$log = $log
    this.moment = moment

    let Users = this.API.service('event')

    Users.getList()
      .then((response) => {
        let dataSet = response.plain()

        if(dataSet != null) {
            angular.forEach(dataSet, (v)=> {
                v.start_date_display = (v.start_date!=null) ? this.moment(v.start_date).format('DD MMMM YYYY') : '';
                v.end_date_display = (v.end_date!=null) ? this.moment(v.end_date).format('DD MMMM YYYY') : '';
                v.start_time_display = (v.start_time!=null) ? this.moment(v.start_time).format('HH:mm') : '';
                v.end_time_display = (v.end_time!=null) ? this.moment(v.end_time).format('HH:mm') : '';
            })
        }

        this.dtOptions = DTOptionsBuilder.newOptions()
          .withOption('data', dataSet)
          .withOption('createdRow', createdRow)
          .withOption('responsive', true)
          .withBootstrap()

        this.dtColumns = [
          DTColumnBuilder.newColumn(null).withTitle('Actions')
            .withOption('width', '10%')
            .notSortable()
            .renderWith(actionsHtml),
          DTColumnBuilder.newColumn('title').withTitle('Title'),
          DTColumnBuilder.newColumn('start_date_display').withTitle('Start Date'),
          DTColumnBuilder.newColumn('end_date_display').withTitle('End Date'),
          DTColumnBuilder.newColumn('event_venue').withTitle('Venue'),
          DTColumnBuilder.newColumn('city').withTitle('City'),
          DTColumnBuilder.newColumn('published').withTitle('Is Published?')
        ]

        this.displayTable = true
      })

    let createdRow = (row) => {
      $compile(angular.element(row).contents())($scope)
    }

    let actionsHtml = (data) => {
      return `
                <a class="btn btn-xs btn-warning" ui-sref="app.eventform({eventId: '${data.id}'})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete('${data.id}')">
                    <i class="fa fa-trash-o"></i>
                </button>`
    }

  }

  delete (id) {
    let API = this.API
    let $state = this.$state

    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: false,
      showLoaderOnConfirm: true,
      html: false
    }, function () {
      API.one('event/detail', id).remove()
        .then(() => {
          swal({
            title: 'Deleted!',
            text: 'Event has been deleted.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            $state.reload()
          })
        })
    })
  }

  $onInit () {}
}

export const EventListComponent = {
  templateUrl: './views/app/components/event/event-list/event-list.component.html',
  controller: EventListController,
  controllerAs: 'vm',
  bindings: {}
}
