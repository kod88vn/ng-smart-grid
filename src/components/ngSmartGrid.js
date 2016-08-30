(function() {
  'use-strict';

  angular
    .module('ng-smart-grid', [])
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
    vm.toggleSelectAll = toggleSelectAll;
    vm.onVisibleClick = onVisibleClick;
    vm.onCheckClick = onCheckClick;
    vm.isAllChecked = true;
    vm.isIndeterminate = false;
    vm.oppositeSelections = {};

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

    function onVisibleClick(p) {
      p.hidden = !p.hidden;
      updateData(vm.data);
    }

    function onCheckClick(row) {
      var key = row.id;

      row.checked = !row.checked;
      if(vm.oppositeSelections[key]) {
        delete vm.oppositeSelections[key];
      }
      else {
        vm.oppositeSelections[key] = row;
      }
      checkIndetermination();
    }

    function toggleSelectAll() {
      vm.isAllChecked = !vm.isAllChecked;

      for(var key in vm.oppositeSelections) {
        delete vm.oppositeSelections[key];
      }

      vm.sortedRows.forEach(function(d) {
        d.checked = vm.isAllChecked;
      });

      checkIndetermination();
    }

    function checkIndetermination() {
      $timeout(function() {
        if($.isEmptyObject(vm.oppositeSelections)) {
          vm.isIndeterminate = false;
        }
        else {
          vm.isIndeterminate = true;
        }
      });
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
