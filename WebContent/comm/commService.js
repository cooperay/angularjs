angular.module("commBase").service('baseService', ['$http','$location', function($http,$location){
	this.init={
		baseUrl:""
	}
	var baseUrl = this.init.baseUrl;
	
	var doInit = function(init){
		this.init = init;
	}

	var doGetCount = function(cname) {
		return $http({
			method : 'GET',
			url : baseUrl+'getCount.do',
			params:{
				"cname":cname
			}
		});
	};

	var doGetPageN = function(pageNum, pageCount,allCount,cname) {
		return $http({
			method : "GET",
			url : baseUrl+'getPage.do',
			params : {
				"rows" : pageCount,
				"pageNO" : pageNum,
				"allCount":allCount,
				"cname":cname
			}
		});
	};

	var doGetById = function(id) {
		return $http({
			method : "GET",
			url : baseUrl+'get.do',
			params : {
				"id" : id
			}
		});
	};

	var doAdd = function(entry) {
		return $http({
			method : "POST",
			url : baseUrl+'addJson.do',
			data : entry
		});
	};

	var doUpdate = function(entry) {
		return $http({
			method : "POST",
			url : baseUrl+'updateJson.do',
			data : entry
		});
	}
	
	var doDelete = function(id){
		return $http({
			method : "GET",
			url : baseUrl+'del.do',
			params : {
				"id" : id
			}
		});
	}
	

	service = {
		showList:function(){
			$location.path("/list/");
		},
		showUpdate:function(id){
			$location.path("/update/" + id);
		},
		showAdd:function(){
			$location.path("/add/");
		},
		popSuccess :function(msg){
			toaster.pop("success","成功",msg);
		},
		popError :function(msg){
			toaster.pop("error","失败",msg);
		},
		popInfo:function(msg){
			toaster.pop("info","信息",msg);
		},
		popResult:function(data,message){
			var msg = message[data.code];
			if(data.code==0){
				toaster.pop("error","失败",msg ? msg : "操作失败");
			}else if(data.code==1){
				toaster.pop("success","成功",msg ? msg :"操作成功");
			}else{
				toaster.pop("info","信息",msg);
			}
		},
		init:function(init){
			doInit(init);
		},
		del:function(id){
			return doDelete(id);
		},
		
		getById : function(id) {
			return doGetById(id);
		},
		getCount : function(cname) {
			return doGetCount(cname);
		},
		getPage : function(pageCount, pageNum,allCount,cname) {
			return doGetPageN(pageCount, pageNum,allCount,cname);
		},
		add : function(entry) {
			return doAdd(entry);
		},
		update : function(entry) {
			return doUpdate(entry);
		},
	}
	return service;
}]).directive('commModel', ["baseService",function (service) {
	return {
		restrict: 'A',
		link:function(scope,element,attrs){
			scope.showAdd = function(){
				baseService.showAdd();
			}
			
			scope.showUpdate = function(id) {
				baseService.showUpdate(id);
			}
			
			scope.goBack = function() {
				baseService.showList();
			}
		}
	}

}]);