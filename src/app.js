(function() {
	'use-strict';

	angular.module('app', ['ng-smart-grid', 'ng-indeterminate'])
	.controller('mainController', MainController);

	function MainController($scope) {
		var vm = this;
		vm.scope = $scope;

    var mockData = [
      {id: 1, name: 'Entity A', status: 'active', locked: true, age: 1, value:'just some value', address: 'somewhere out there', dummy: 'Some dummy data to make it really long', anotherDummy: 'Another dummy value'},
      {id: 2, name: 'Entity B', status: 'inactive', age: 5, value:'just some value', address: 'somewhere out there', dummy: 'Some dummy data to make it really long', anotherDummy: 'Another dummy value'},
      {id: 3, name: 'Entity C', status: 'paused', age: 9, value:'just some value', address: 'somewhere out there', dummy: 'Some dummy data to make it really long', anotherDummy: 'Another dummy value'},
      {id: 4, name: 'Entity D', status: 'paused', age: 9, value:'just some value', address: 'somewhere out there', dummy: 'Some dummy data to make it really long', anotherDummy: 'Another dummy value'}
    ];

		vm.baseGridConfig = {
      gridId: 'base',
      preferences: [
        {id: 'id', title: 'Id', locked: true},
        {id: 'status', title: 'Status', locked: false},
        {id: 'name', title: 'Name', locked: false},
        {id: 'age', title: 'Age', locked: false},
        {id: 'value', title: 'Value', locked: false},
        {id: 'address', title: 'Address', locked: false},
        {id: 'dummy', title: 'Dummy', locked: false},
        {id: 'anotherDummy', title: 'Another Dummy', locked: false},
      ],
      data:{
        data: mockData
      }
    }

    vm.fancyGridConfig = {
      gridId: 'fancy',
      preferences: [
        {id: 'id', title: 'Id', locked: true},
        {id: 'status', title: '<i class="fa fa-circle fa-fw" title="Status"></i>', displayFn: getStatusClass, locked: false},
        {id: 'name', title: 'Name', locked: false},
        {id: 'age', title: 'Age', locked: false},
        {id: 'value', title: 'Value', locked: false},
        {id: 'address', title: 'Address', locked: false},
        {id: 'dummy', title: 'Dummy', locked: false},
        {id: 'anotherDummy', title: 'Another Dummy', locked: false},
      ],
      data:{
        data: mockData
      }
    }

    function getStatusClass(dataItem) {
      if(!dataItem) {
        return '';
      }

      switch(dataItem) {
        case 'active':
          return '<i class=\"' + 'fa fa-circle-o green-enable' + ' fa-fw\">';
        case 'inactive':
          return '<i class=\"' + 'fa fa-circle-o' + ' fa-fw\">';
        case 'paused':
          return '<i class=\"' + 'fa fa-pause yellow-pause' + ' fa-fw\">';
          return '';
      }
    }
  }



	MainController.prototype = {

  }

})();
