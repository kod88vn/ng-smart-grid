(function() {
  'use-strict';

  angular.module('ng-smart-grid', [])
    .controller('SmartGridController', SmartGridController)
    .directive('smartInput', SmartGridDirective);

  function SmartGridDirective() {
    return {
      restrict: 'E',
      scope: {
        config: '='
      },
      templateUrl: 'ngSmartGrid.html',
      controller: 'SmartGridController',
      controllerAs: 'sgc'
    }
  }

  function SmartGridController($scope, $timeout) {
    var vm = this;
    vm.scope = $scope;
    vm.config = $scope.config;


  }

  SmartGridController.prototype = {

  }

})();
