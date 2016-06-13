(function(window, angular, undefined) {
    'use strict';
	angular.module("angularjs.tree",[]).directive('tree', ["$document", function($document) {
	   return {
		   restrict: 'A',
		   scope: {
				callback: '&treeCallback'
		   },
		   link: function(scope, elem) {
				angular.forEach(angular.element(elem).children(), function(value, key){

					var btn = angular.element(value)[0].querySelector("a");
					var menu = angular.element(value)[0].querySelector(".treeview-menu");
					var isActive = angular.element(value).hasClass('active');

					//initialize already active menus
					if (isActive)
					{
						angular.element(menu).css('display', 'block');
					}
					else
					{
						angular.element(menu).css('display', 'none');
					}

					if (menu != null)
					{
						//open or close the sub menu on link click
						angular.element(btn).bind("click", function(e){
							e.preventDefault();
							if (isActive) {
								//close sub menu
								angular.element(menu).css('display', 'none');
								isActive = false;
								angular.element(btn).parent("li").removeClass("active");
							} else {
								//open sub menu
								angular.element(menu).css('display', 'block');
								isActive = true;
								angular.element(btn).parent("li").addClass("active");
							}
							scope.callback({event: e});
						});
					}
				});
		   }
	   }
	}]);
})(window, window.angular);
