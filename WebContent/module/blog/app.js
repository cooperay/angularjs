angular.module("commBase",['ngRoute',"ngTable"]).config(["$routeProvider", function($routeProvider) {
		$routeProvider.when("/list",{
			templateUrl:"./blog/list.html",
			controller:"CommListController"
		}).when("/add",{
			templateUrl:"./blog/add.html",
			controller:"CommAddController"
		}).when("/update/:id",{
			templateUrl:"./blog/update.html",
			controller:"CommUpdateController"
		}).otherwise({
			redirectTo : '/list'
	    });
}])
