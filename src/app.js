(function() {
	'use-strict';

	angular.module('app', ['ng-smart-grid'])
	.controller('mainController', MainController);

	function MainController($scope) {
		var vm = this;
		vm.scope = $scope;

		vm.smartGridConfig = {

    }
  }

	MainController.prototype = {

  }

})();
