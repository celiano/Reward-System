var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'vistas/inicial.html',
        controller: 'mainController'
      }).
      when('/cuentas', {
        templateUrl: 'vistas/cuentas.html',
        controller: 'mainController'
      }).
      when('/documentos', {
        templateUrl: 'vistas/documentos.html',
        controller: 'mainController'
      }).
      otherwise({
        redirectTo: '/home'
      });
}]);

app.directive('modalLogin', function($window, $templateCache, $compile, $http) {
  console.log("direc");
  return {
    restrict: 'EA',
    controller: 'loginController',
    scope: {
      show: '=',
      modalUser: '=',
      saveUser: '&',
      templateUser: '@'
    },
    replace: true, // Replace with the template below
    //transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {

      $http.get(scope.templateUser, {cache: $templateCache}).success(function(tplContent){
                element.replaceWith($compile(tplContent)(scope));                
              });
              
      scope.dialogStyle = {};
      if (attrs.width) {
        scope.dialogStyle.width = attrs.width + '%';
        scope.dialogStyle.left = ( ( 100 - attrs.width ) / 2 ) + '%';
      }
      if (attrs.height) {
        scope.dialogStyle.height = attrs.height + '%';
        scope.dialogStyle.top = ( ( 100 - attrs.height ) / 2 ) + '%';
      }
        
      scope.hideModal = function() {
        scope.show = false;
      };

      scope.clone = function(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        var temp = obj.constructor(); // give temp the original obj's constructor
        for (var key in obj) {
            temp[key] = scope.clone(obj[key]);
        }
        return temp;
      };

      var tempUser = scope.clone(scope.modalUser);
      
      scope.save = function() {
        scope.saveUser(scope.modalUser);
        scope.show = false;
      };
      
      scope.cancel = function() {
        scope.modalUser = scope.clone(tempUser);
        scope.show = false;
      };
    }
  };
  
});



app.controller("mainController", ['$scope', 'Login', '$window', function ($scope, Login, $window) {
	console.log("main");
	$scope.message = "AngularJs Tutorial Si";



	$scope.open = function() {
	  $scope.showModal = true;
	};

	$scope.ok = function() {
	  $scope.showModal = false;
	};

	$scope.cancel = function() {
	  $scope.showModal = false;
	};

	$scope.modalShown = true;
	$scope.user = {name:"Mara", surname:"Sanchez", shortKey:"1111"};
	$scope.userMod = {};
	$scope.toggleModal = function() {
		console.log('toggleModal');
		console.log($scope.modalShown);
		$scope.modalShown = !$scope.modalShown;
	};

	$scope.saveUser = function(usr) {
		$scope.userMod = usr;
		$window.alert('Desde metodo SALVAR del controller fuera de la ventana: ' + $scope.userMod.shortKey);
	}	

}]);

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
      console.log(data.succeded);
      if (data.succeded == true && data.data != null) {
        $scope.show = false;
      }       
    })
  }

}])

app.factory('Login', ['$http', function ($http) {
	
		var login = {};
		var baseUrl = "http://localhost:45513";
		var apiName = "/api/Login";

		login.logear = function (data) {
			console.log(baseUrl + apiName + "?usuario=" + data.usuario + "&clave=" + data.password);
			return $http.get(baseUrl + apiName + "?usuario=" + data.usuario + "&clave=" + data.password);
		}
		return login;
	}
])