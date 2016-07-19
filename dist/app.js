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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuICAndXNlLXN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ25nLXNtYXJ0LWdyaWQnLCBbXSlcbiAgICAuY29udHJvbGxlcignU21hcnRHcmlkQ29udHJvbGxlcicsIFNtYXJ0R3JpZENvbnRyb2xsZXIpXG4gICAgLmRpcmVjdGl2ZSgnc21hcnRJbnB1dCcsIFNtYXJ0R3JpZERpcmVjdGl2ZSk7XG5cbiAgZnVuY3Rpb24gU21hcnRHcmlkRGlyZWN0aXZlKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY29uZmlnOiAnPSdcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZVVybDogJ25nU21hcnRHcmlkLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1NtYXJ0R3JpZENvbnRyb2xsZXInLFxuICAgICAgY29udHJvbGxlckFzOiAnc2djJ1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIFNtYXJ0R3JpZENvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgdm0uc2NvcGUgPSAkc2NvcGU7XG4gICAgdm0uY29uZmlnID0gJHNjb3BlLmNvbmZpZztcblxuXG4gIH1cblxuICBTbWFydEdyaWRDb250cm9sbGVyLnByb3RvdHlwZSA9IHtcblxuICB9XG5cbn0pKCk7XG4iXSwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
