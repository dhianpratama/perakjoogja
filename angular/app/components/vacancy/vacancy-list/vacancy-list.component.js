class VacancyListController {
  constructor($scope, $state, $compile, $log, DTOptionsBuilder, DTColumnBuilder, API) {
    'ngInject'
    this.API = API
    this.$state = $state
    this.$log = $log

    let Users = this.API.service('vacancy')

    Users.getList()
      .then((response) => {
        let dataSet = response.plain()

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
          DTColumnBuilder.newColumn('title').withTitle('Job Title'),
          DTColumnBuilder.newColumn('company_name').withTitle('Company'),
          DTColumnBuilder.newColumn('due_date').withTitle('Application Deadline'),
        ]

        this.displayTable = true
      })

    let createdRow = (row) => {
      $compile(angular.element(row).contents())($scope)
    }

    let actionsHtml = (data) => {
      return `
                <a class="btn btn-xs btn-warning" ui-sref="app.vacancyform({vacancyId: '${data.id}'})">
                    <i class="fa fa-edit"></i>
                </a>
                &nbsp
                <button class="btn btn-xs btn-danger" ng-click="vm.delete('${data.id}')">
                    <i class="fa fa-trash-o"></i>
                </button>`
    }

  }

  delete(id) {
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
      API.one('vacancy/detail', id).remove()
        .then(() => {
          swal({
            title: 'Deleted!',
            text: 'Vacancy has been deleted.',
            type: 'success',
            confirmButtonText: 'OK',
            closeOnConfirm: true
          }, function () {
            $state.reload()
          })
        })
    })
  }

  $onInit() { }
}

export const VacancyListComponent = {
  templateUrl: './views/app/components/vacancy/vacancy-list/vacancy-list.component.html',
  controller: VacancyListController,
  controllerAs: 'vm',
  bindings: {}
}
