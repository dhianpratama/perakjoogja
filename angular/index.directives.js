import { RouteBodyClassComponent } from './directives/route-bodyclass/route-bodyclass.component'
import { PasswordVerifyClassComponent } from './directives/password-verify/password-verify.component'
import { NeutralTimezoneComponent } from './directives/neutral-timezone/neutral-timezone.component'

angular.module('app.components')
  .directive('routeBodyclass', RouteBodyClassComponent)
  .directive('passwordVerify', PasswordVerifyClassComponent)
  .directive('neutralTimezone', NeutralTimezoneComponent)