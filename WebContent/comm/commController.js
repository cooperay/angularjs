angular.module("commBase").controller("CommListController",['$scope',"NgTableParams","baseService",
                                                            function($scope,NgTableParams,baseService){
	$scope.tableParams = new NgTableParams({
		page:baseService.currentPage ,
		count : 10,
		sorting : {
			id : 'desc'
		}
	}, {
		getData : function($defer, params) {
			baseService.currentPage = params.page();
			baseService.getList().success(
					function(data, status) {
						var orderedData = params.sorting() ? $filter('orderBy')(data,params.orderBy()) : data;
						$defer.resolve(orderedData);
						baseService.popSuccess("获取列表成功");
						return orderedData;
					}).error(
					function(data, status) {
						baseService.popError("获取列表失败");
					});
		}
	});
	
	//重新加载表格数据 不刷新页面
	$scope.reload = function(){
		$scope.tableParams.reload();
	}
	
	$scope.remove = function(id){
		if(confirm("确认删除")){
			baseService.remove(id).success(function(data,status){
				baseService.popSuccess("删除成功");
				baseService.showList();
			}).error(function(data,status){
				baseService.popError("删除失败");
			});
		}
	}
	
}]).controller("CommAddController",['$scope','baseService',function($scope,baseService){
	
	//删除实体controller
	
	$scope.doAdd=function(){
		baseService.add($scope.entry).success(function(data,status){
			if(data.code == 1){
				baseService.showList();
				baseService.popSuccess("保存成功");
			}
		}).error(function(data,status){
			baseService.popError("保存失败");
		});
	}
}]).controller("CommUpdateController",['$scope','baseService',function($scope,baseService){
	
	//修改实体controller
	
	var id  = $routeParams.id;
	$scope.entry={};
	baseService.getById(id).success(function(data,sataus){
		$scope.entry = data;
		baseService.getDeptById($scope.entry.iddepartment).success(function(data,status){
			if(data){
				$scope.entry = data;
			}
		}).error(function(data,status){
			baseService.popError("获取部门失败")
		});
	}).error(function(data,status){
		
	});
	
	$scope.doUpdate=function(){
		baseService.update($scope.entry).success(function(data,status){
			baseService.showList();
			baseService.popSuccess("修改成功");
		}).error(function(data,status){
			baseService.popError("修改失败");
		});
	}
}])