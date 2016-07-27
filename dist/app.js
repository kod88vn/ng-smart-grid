(function() {
  'use-strict';

  angular.module('ng-smart-grid', [])
    .controller('SmartGridController', SmartGridController)
    .directive('smartGrid', SmartGridDirective);

  function SmartGridDirective() {
    return {
      restrict: 'E',
      scope: {
        config: '='
      },
      templateUrl: 'dist/templates/components/ngSmartGrid.html',
      controller: 'SmartGridController',
      controllerAs: 'sgc'
    }
  }

  function SmartGridController($scope, $timeout, $sce, $log) {
    var vm = this;
    vm.scope = $scope;
    vm.config = $scope.config;
    vm.onLockClick = toggleLock;
    vm.isAllChecked = true;

    $scope.$watchCollection(function() {
      return vm.config.preferences;
    }, function(preferences) {
      if(preferences) {
        vm.preferences = preferences;
      }

      if(vm.data) {
        updatePreferences(preferences);
      }
    });

    $scope.$watchCollection(function() {
      return vm.config.data;
    }, function(data) {
      if(data && data.data) {
        vm.data = data;
        updatePreferences(vm.preferences);
        updateData(data);
      }
      else {
        vm.sortedRows = [];
      }
    });

    function toggleLock(p) {
      p.locked = !p.locked;
      updateData(vm.data);
    }

    function updatePreferences(preferences) {
      if(!preferences) {
        return;
      }

      vm.sortedPreferences = preferences.sort(function(a, b) {
        return (a.order - b.order);
      });

      vm.sortedPreferences.forEach(function(p) {
        if(p.titleDisplayFn) {
          p.displayTitle = $sce.trustAsHtml(p.titleDisplayFn(p.title));
        }
        else {
          p.displayTitle = $sce.trustAsHtml(p.title.toString());
        }

        p.hidden = (p.hidden) ? p.hidden : false;
      });
    }

    function updateData(data) {
      var hidden = false;
      var row;

      vm.sortedRows = [];

      data.data.forEach(function(d) {
        var sorted = [];

        vm.sortedPreferences.forEach(function(p) {
          if(p.hidden === false) {
            var value = '';

            if(p.displayFn) {
              var displayValue = p.displayFn(d[p.id], p, d);
              if(displayValue === undefined) {
                $log.error('Display function failed at: ' + p.id);
              }

              sorted.push({
                value: $sce.trustAsHtml(displayValue.toString()),
                locked: p.locked,
                key: d.id
              });
            }
            else {
              if(d[p.id] !== null) {
                if(d[p.id] === undefined) {
                  $log.error('Cannot find this field inside data received: ' + p.id);
                }

                value = $sce.trustAsHtml(((d[p.id] === undefined) ? '' : d[p.id]).toString());

                if(typeof(d[p.id]) === 'object') {
                  if(d[p.id].defaultLabel !== undefined) {
                    value = $sce.trustAsHtml(d[p.id].defaultLabel.toString());
                  }

                  if(d[p.id].name !== undefined) {
                    value = $sce.trustAsHtml(d[p.id].name.toString());
                  }
                }
              }
              sorted.push({value: value, locked: p.locked, key: d.id,
                column: p.id});
            }
          }
        });

        row = {id: d.id, checked: vm.isAllChecked, values: sorted};
        vm.sortedRows.push(row);

        // if(vm.oppositeSelections[d.id]) {
        //   row = {id: d.id, checked: !vm.isAllChecked, values: sorted};
        //   vm.sortedRows.push(row);
        //   vm.isIndeterminate = true;
        // }
        // else {
        //   row = {id: d.id, checked: vm.isAllChecked, values: sorted};
        //   vm.sortedRows.push(row);
        // }
      });


    }

  }

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5nU21hcnRHcmlkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4gICd1c2Utc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnbmctc21hcnQtZ3JpZCcsIFtdKVxuICAgIC5jb250cm9sbGVyKCdTbWFydEdyaWRDb250cm9sbGVyJywgU21hcnRHcmlkQ29udHJvbGxlcilcbiAgICAuZGlyZWN0aXZlKCdzbWFydEdyaWQnLCBTbWFydEdyaWREaXJlY3RpdmUpO1xuXG4gIGZ1bmN0aW9uIFNtYXJ0R3JpZERpcmVjdGl2ZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGNvbmZpZzogJz0nXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVVcmw6ICdkaXN0L3RlbXBsYXRlcy9jb21wb25lbnRzL25nU21hcnRHcmlkLmh0bWwnLFxuICAgICAgY29udHJvbGxlcjogJ1NtYXJ0R3JpZENvbnRyb2xsZXInLFxuICAgICAgY29udHJvbGxlckFzOiAnc2djJ1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIFNtYXJ0R3JpZENvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJHNjZSwgJGxvZykge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgdm0uc2NvcGUgPSAkc2NvcGU7XG4gICAgdm0uY29uZmlnID0gJHNjb3BlLmNvbmZpZztcbiAgICB2bS5vbkxvY2tDbGljayA9IHRvZ2dsZUxvY2s7XG4gICAgdm0uaXNBbGxDaGVja2VkID0gdHJ1ZTtcblxuICAgICRzY29wZS4kd2F0Y2hDb2xsZWN0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHZtLmNvbmZpZy5wcmVmZXJlbmNlcztcbiAgICB9LCBmdW5jdGlvbihwcmVmZXJlbmNlcykge1xuICAgICAgaWYocHJlZmVyZW5jZXMpIHtcbiAgICAgICAgdm0ucHJlZmVyZW5jZXMgPSBwcmVmZXJlbmNlcztcbiAgICAgIH1cblxuICAgICAgaWYodm0uZGF0YSkge1xuICAgICAgICB1cGRhdGVQcmVmZXJlbmNlcyhwcmVmZXJlbmNlcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAkc2NvcGUuJHdhdGNoQ29sbGVjdGlvbihmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB2bS5jb25maWcuZGF0YTtcbiAgICB9LCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBpZihkYXRhICYmIGRhdGEuZGF0YSkge1xuICAgICAgICB2bS5kYXRhID0gZGF0YTtcbiAgICAgICAgdXBkYXRlUHJlZmVyZW5jZXModm0ucHJlZmVyZW5jZXMpO1xuICAgICAgICB1cGRhdGVEYXRhKGRhdGEpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZtLnNvcnRlZFJvd3MgPSBbXTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHRvZ2dsZUxvY2socCkge1xuICAgICAgcC5sb2NrZWQgPSAhcC5sb2NrZWQ7XG4gICAgICB1cGRhdGVEYXRhKHZtLmRhdGEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVByZWZlcmVuY2VzKHByZWZlcmVuY2VzKSB7XG4gICAgICBpZighcHJlZmVyZW5jZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB2bS5zb3J0ZWRQcmVmZXJlbmNlcyA9IHByZWZlcmVuY2VzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICByZXR1cm4gKGEub3JkZXIgLSBiLm9yZGVyKTtcbiAgICAgIH0pO1xuXG4gICAgICB2bS5zb3J0ZWRQcmVmZXJlbmNlcy5mb3JFYWNoKGZ1bmN0aW9uKHApIHtcbiAgICAgICAgaWYocC50aXRsZURpc3BsYXlGbikge1xuICAgICAgICAgIHAuZGlzcGxheVRpdGxlID0gJHNjZS50cnVzdEFzSHRtbChwLnRpdGxlRGlzcGxheUZuKHAudGl0bGUpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwLmRpc3BsYXlUaXRsZSA9ICRzY2UudHJ1c3RBc0h0bWwocC50aXRsZS50b1N0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHAuaGlkZGVuID0gKHAuaGlkZGVuKSA/IHAuaGlkZGVuIDogZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVEYXRhKGRhdGEpIHtcbiAgICAgIHZhciBoaWRkZW4gPSBmYWxzZTtcbiAgICAgIHZhciByb3c7XG5cbiAgICAgIHZtLnNvcnRlZFJvd3MgPSBbXTtcblxuICAgICAgZGF0YS5kYXRhLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgc29ydGVkID0gW107XG5cbiAgICAgICAgdm0uc29ydGVkUHJlZmVyZW5jZXMuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICAgICAgaWYocC5oaWRkZW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSAnJztcblxuICAgICAgICAgICAgaWYocC5kaXNwbGF5Rm4pIHtcbiAgICAgICAgICAgICAgdmFyIGRpc3BsYXlWYWx1ZSA9IHAuZGlzcGxheUZuKGRbcC5pZF0sIHAsIGQpO1xuICAgICAgICAgICAgICBpZihkaXNwbGF5VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICRsb2cuZXJyb3IoJ0Rpc3BsYXkgZnVuY3Rpb24gZmFpbGVkIGF0OiAnICsgcC5pZCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBzb3J0ZWQucHVzaCh7XG4gICAgICAgICAgICAgICAgdmFsdWU6ICRzY2UudHJ1c3RBc0h0bWwoZGlzcGxheVZhbHVlLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgICAgIGxvY2tlZDogcC5sb2NrZWQsXG4gICAgICAgICAgICAgICAga2V5OiBkLmlkXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmKGRbcC5pZF0gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZihkW3AuaWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICRsb2cuZXJyb3IoJ0Nhbm5vdCBmaW5kIHRoaXMgZmllbGQgaW5zaWRlIGRhdGEgcmVjZWl2ZWQ6ICcgKyBwLmlkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9ICRzY2UudHJ1c3RBc0h0bWwoKChkW3AuaWRdID09PSB1bmRlZmluZWQpID8gJycgOiBkW3AuaWRdKS50b1N0cmluZygpKTtcblxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZihkW3AuaWRdKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgIGlmKGRbcC5pZF0uZGVmYXVsdExhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAkc2NlLnRydXN0QXNIdG1sKGRbcC5pZF0uZGVmYXVsdExhYmVsLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBpZihkW3AuaWRdLm5hbWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICRzY2UudHJ1c3RBc0h0bWwoZFtwLmlkXS5uYW1lLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzb3J0ZWQucHVzaCh7dmFsdWU6IHZhbHVlLCBsb2NrZWQ6IHAubG9ja2VkLCBrZXk6IGQuaWQsXG4gICAgICAgICAgICAgICAgY29sdW1uOiBwLmlkfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByb3cgPSB7aWQ6IGQuaWQsIGNoZWNrZWQ6IHZtLmlzQWxsQ2hlY2tlZCwgdmFsdWVzOiBzb3J0ZWR9O1xuICAgICAgICB2bS5zb3J0ZWRSb3dzLnB1c2gocm93KTtcblxuICAgICAgICAvLyBpZih2bS5vcHBvc2l0ZVNlbGVjdGlvbnNbZC5pZF0pIHtcbiAgICAgICAgLy8gICByb3cgPSB7aWQ6IGQuaWQsIGNoZWNrZWQ6ICF2bS5pc0FsbENoZWNrZWQsIHZhbHVlczogc29ydGVkfTtcbiAgICAgICAgLy8gICB2bS5zb3J0ZWRSb3dzLnB1c2gocm93KTtcbiAgICAgICAgLy8gICB2bS5pc0luZGV0ZXJtaW5hdGUgPSB0cnVlO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2Uge1xuICAgICAgICAvLyAgIHJvdyA9IHtpZDogZC5pZCwgY2hlY2tlZDogdm0uaXNBbGxDaGVja2VkLCB2YWx1ZXM6IHNvcnRlZH07XG4gICAgICAgIC8vICAgdm0uc29ydGVkUm93cy5wdXNoKHJvdyk7XG4gICAgICAgIC8vIH1cbiAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgfVxuXG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
