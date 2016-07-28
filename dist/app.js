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

    var gridId = vm.config.gridId +'-grid';

    $(window).on('resize', function() {
      adjustFreeWidth();
    });

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

    function adjustFreeWidth() {
      $('#' + gridId + ' .free-table').css('max-width',
        $(window).width() - $('#' + gridId + ' .locked-table').width() - 30 + 'px');
    }

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

      $timeout(function() {
        adjustFreeWidth();
      });
    }

  }

})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5nU21hcnRHcmlkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgJ3VzZS1zdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCduZy1zbWFydC1ncmlkJywgW10pXG4gICAgLmNvbnRyb2xsZXIoJ1NtYXJ0R3JpZENvbnRyb2xsZXInLCBTbWFydEdyaWRDb250cm9sbGVyKVxuICAgIC5kaXJlY3RpdmUoJ3NtYXJ0R3JpZCcsIFNtYXJ0R3JpZERpcmVjdGl2ZSk7XG5cbiAgZnVuY3Rpb24gU21hcnRHcmlkRGlyZWN0aXZlKCkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY29uZmlnOiAnPSdcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZVVybDogJ2Rpc3QvdGVtcGxhdGVzL2NvbXBvbmVudHMvbmdTbWFydEdyaWQuaHRtbCcsXG4gICAgICBjb250cm9sbGVyOiAnU21hcnRHcmlkQ29udHJvbGxlcicsXG4gICAgICBjb250cm9sbGVyQXM6ICdzZ2MnXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gU21hcnRHcmlkQ29udHJvbGxlcigkc2NvcGUsICR0aW1lb3V0LCAkc2NlLCAkbG9nKSB7XG4gICAgdmFyIHZtID0gdGhpcztcbiAgICB2bS5zY29wZSA9ICRzY29wZTtcbiAgICB2bS5jb25maWcgPSAkc2NvcGUuY29uZmlnO1xuICAgIHZtLm9uTG9ja0NsaWNrID0gdG9nZ2xlTG9jaztcbiAgICB2bS5pc0FsbENoZWNrZWQgPSB0cnVlO1xuXG4gICAgdmFyIGdyaWRJZCA9IHZtLmNvbmZpZy5ncmlkSWQgKyctZ3JpZCc7XG5cbiAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgYWRqdXN0RnJlZVdpZHRoKCk7XG4gICAgfSk7XG5cbiAgICAkc2NvcGUuJHdhdGNoQ29sbGVjdGlvbihmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB2bS5jb25maWcucHJlZmVyZW5jZXM7XG4gICAgfSwgZnVuY3Rpb24ocHJlZmVyZW5jZXMpIHtcbiAgICAgIGlmKHByZWZlcmVuY2VzKSB7XG4gICAgICAgIHZtLnByZWZlcmVuY2VzID0gcHJlZmVyZW5jZXM7XG4gICAgICB9XG5cbiAgICAgIGlmKHZtLmRhdGEpIHtcbiAgICAgICAgdXBkYXRlUHJlZmVyZW5jZXMocHJlZmVyZW5jZXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgJHNjb3BlLiR3YXRjaENvbGxlY3Rpb24oZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdm0uY29uZmlnLmRhdGE7XG4gICAgfSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgaWYoZGF0YSAmJiBkYXRhLmRhdGEpIHtcbiAgICAgICAgdm0uZGF0YSA9IGRhdGE7XG4gICAgICAgIHVwZGF0ZVByZWZlcmVuY2VzKHZtLnByZWZlcmVuY2VzKTtcbiAgICAgICAgdXBkYXRlRGF0YShkYXRhKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2bS5zb3J0ZWRSb3dzID0gW107XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBhZGp1c3RGcmVlV2lkdGgoKSB7XG4gICAgICAkKCcjJyArIGdyaWRJZCArICcgLmZyZWUtdGFibGUnKS5jc3MoJ21heC13aWR0aCcsXG4gICAgICAgICQod2luZG93KS53aWR0aCgpIC0gJCgnIycgKyBncmlkSWQgKyAnIC5sb2NrZWQtdGFibGUnKS53aWR0aCgpIC0gMzAgKyAncHgnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVMb2NrKHApIHtcbiAgICAgIHAubG9ja2VkID0gIXAubG9ja2VkO1xuICAgICAgdXBkYXRlRGF0YSh2bS5kYXRhKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVQcmVmZXJlbmNlcyhwcmVmZXJlbmNlcykge1xuICAgICAgaWYoIXByZWZlcmVuY2VzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdm0uc29ydGVkUHJlZmVyZW5jZXMgPSBwcmVmZXJlbmNlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIChhLm9yZGVyIC0gYi5vcmRlcik7XG4gICAgICB9KTtcblxuICAgICAgdm0uc29ydGVkUHJlZmVyZW5jZXMuZm9yRWFjaChmdW5jdGlvbihwKSB7XG4gICAgICAgIGlmKHAudGl0bGVEaXNwbGF5Rm4pIHtcbiAgICAgICAgICBwLmRpc3BsYXlUaXRsZSA9ICRzY2UudHJ1c3RBc0h0bWwocC50aXRsZURpc3BsYXlGbihwLnRpdGxlKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcC5kaXNwbGF5VGl0bGUgPSAkc2NlLnRydXN0QXNIdG1sKHAudGl0bGUudG9TdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBwLmhpZGRlbiA9IChwLmhpZGRlbikgPyBwLmhpZGRlbiA6IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlRGF0YShkYXRhKSB7XG4gICAgICB2YXIgaGlkZGVuID0gZmFsc2U7XG4gICAgICB2YXIgcm93O1xuXG4gICAgICB2bS5zb3J0ZWRSb3dzID0gW107XG5cbiAgICAgIGRhdGEuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHNvcnRlZCA9IFtdO1xuXG4gICAgICAgIHZtLnNvcnRlZFByZWZlcmVuY2VzLmZvckVhY2goZnVuY3Rpb24ocCkge1xuICAgICAgICAgIGlmKHAuaGlkZGVuID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gJyc7XG5cbiAgICAgICAgICAgIGlmKHAuZGlzcGxheUZuKSB7XG4gICAgICAgICAgICAgIHZhciBkaXNwbGF5VmFsdWUgPSBwLmRpc3BsYXlGbihkW3AuaWRdLCBwLCBkKTtcbiAgICAgICAgICAgICAgaWYoZGlzcGxheVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAkbG9nLmVycm9yKCdEaXNwbGF5IGZ1bmN0aW9uIGZhaWxlZCBhdDogJyArIHAuaWQpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgc29ydGVkLnB1c2goe1xuICAgICAgICAgICAgICAgIHZhbHVlOiAkc2NlLnRydXN0QXNIdG1sKGRpc3BsYXlWYWx1ZS50b1N0cmluZygpKSxcbiAgICAgICAgICAgICAgICBsb2NrZWQ6IHAubG9ja2VkLFxuICAgICAgICAgICAgICAgIGtleTogZC5pZFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpZihkW3AuaWRdICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYoZFtwLmlkXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAkbG9nLmVycm9yKCdDYW5ub3QgZmluZCB0aGlzIGZpZWxkIGluc2lkZSBkYXRhIHJlY2VpdmVkOiAnICsgcC5pZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSAkc2NlLnRydXN0QXNIdG1sKCgoZFtwLmlkXSA9PT0gdW5kZWZpbmVkKSA/ICcnIDogZFtwLmlkXSkudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICAgICAgICBpZih0eXBlb2YoZFtwLmlkXSkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICBpZihkW3AuaWRdLmRlZmF1bHRMYWJlbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gJHNjZS50cnVzdEFzSHRtbChkW3AuaWRdLmRlZmF1bHRMYWJlbC50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYoZFtwLmlkXS5uYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAkc2NlLnRydXN0QXNIdG1sKGRbcC5pZF0ubmFtZS50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc29ydGVkLnB1c2goe3ZhbHVlOiB2YWx1ZSwgbG9ja2VkOiBwLmxvY2tlZCwga2V5OiBkLmlkLFxuICAgICAgICAgICAgICAgIGNvbHVtbjogcC5pZH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcm93ID0ge2lkOiBkLmlkLCBjaGVja2VkOiB2bS5pc0FsbENoZWNrZWQsIHZhbHVlczogc29ydGVkfTtcbiAgICAgICAgdm0uc29ydGVkUm93cy5wdXNoKHJvdyk7XG5cbiAgICAgICAgLy8gaWYodm0ub3Bwb3NpdGVTZWxlY3Rpb25zW2QuaWRdKSB7XG4gICAgICAgIC8vICAgcm93ID0ge2lkOiBkLmlkLCBjaGVja2VkOiAhdm0uaXNBbGxDaGVja2VkLCB2YWx1ZXM6IHNvcnRlZH07XG4gICAgICAgIC8vICAgdm0uc29ydGVkUm93cy5wdXNoKHJvdyk7XG4gICAgICAgIC8vICAgdm0uaXNJbmRldGVybWluYXRlID0gdHJ1ZTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNlIHtcbiAgICAgICAgLy8gICByb3cgPSB7aWQ6IGQuaWQsIGNoZWNrZWQ6IHZtLmlzQWxsQ2hlY2tlZCwgdmFsdWVzOiBzb3J0ZWR9O1xuICAgICAgICAvLyAgIHZtLnNvcnRlZFJvd3MucHVzaChyb3cpO1xuICAgICAgICAvLyB9XG4gICAgICB9KTtcblxuICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGFkanVzdEZyZWVXaWR0aCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIH1cblxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
