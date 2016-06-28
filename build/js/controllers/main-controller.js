app.controller("mainController", ['$scope', 'Login', '$window', function ($scope, Login, $window) {

	console.log("main mosrando");
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