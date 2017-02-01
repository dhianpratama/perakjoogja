function neutralTimezone() {
  return {
    restrict: 'A',
    priority: 1,
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      ctrl.$formatters.push(function (value) {
        var date = new Date(Date.parse(value));
        // var offset = date.getTimezoneOffset();
        // date = new Date(date.getTime() + (60000 * offset));

        var newDate = new Date(date.getFullYear(),date.getMonth(), date.getDate());
        return newDate;
      });

      ctrl.$parsers.push(function (value) {
        var offset = value.getTimezoneOffset();
        var date = new Date(value.getTime() - (60000 * offset));   
        var newDate = new Date(date.getFullYear(),date.getMonth(), date.getDate());     
        return newDate;
      });
    }
  };
}

export const NeutralTimezoneComponent = neutralTimezone