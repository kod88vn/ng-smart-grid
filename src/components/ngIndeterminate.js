(function() {
  'use strict';

  angular
    .module('ng-indeterminate', [])
    .directive('ngIndeterminate', ngIndeterminate)
    ;

  /* @ngInject */
  function ngIndeterminate() {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        scope.$watch(attributes['ngIndeterminate'], function(value) {
          element.prop('indeterminate', !!value);
        });
      }
    };
  }
})();
