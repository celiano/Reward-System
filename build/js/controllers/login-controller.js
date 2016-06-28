app.controller('loginController', ['$scope', 'Login', function($scope, Login) {

  $scope.show = true;

  $scope.loginData = {
    usuario: 'celiano',
    password: 'MiContraseña',
    country: 'CO'
  };

  $scope.logear = function (data) {
    var newDate = new Date();
    var logearRequest = Login.logear(data);

    logearRequest.success(function (data, status, header, config) {
      console.log("data.succeded");
      if (data.succeded == true && data.data != null) {
        $scope.show = false;
      }       
    })
  }

}])