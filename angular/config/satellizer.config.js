export function SatellizerConfig ($authProvider) {
  'ngInject'

  $authProvider.httpInterceptor = function () {
    return false
  }

  $authProvider.loginUrl = '/api/auth/login'
  $authProvider.signupUrl = '/api/auth/register'
  $authProvider.tokenRoot = 'data' // compensates success response macro
}
