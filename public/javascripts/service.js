
var app = angular.module('Test', ['SimplePagination']);

app.controller('ItemController', ['$scope', 'Pagination',   
function($scope, Pagination) {
    $("#news").mouseup( function (e) { 
        //alert("You selected: "+window.getSelection());
        
        var src_str = $("#news").html();
        var term = new String(window.getSelection());
        
        // term = term.replace(/(\s+)/,"(<[^>]+>)*$1(<[^>]+>)*");
 //        var pattern = new RegExp("("+term+")", "i");
 // 
 //        src_str = src_str.replace(pattern, "<mark>$1</mark>");
 //        src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");
         
         if ($('#news:contains('+term+')'))
         {
             $('#news:contains('+term+')').html().replace(term , '<span class="highlight">'+term+'</span>');
             alert('<span class="highlight">'+term+'</span>');
    
         }         
        //$("#news").html(src_str);
        
    });
}]);

app.controller('max', ['$scope', 'Pagination',   
function($scope, Pagination) {
    $scope.txt="HI";
    $scope.$watch('txt', function () {
        console.log("seeee"); 
        app.txt = $scope.txt;
    });    
}]);




app.controller('Main', ['$http','$scope', 'Pagination',   
function($http,$scope, Pagination) {
  $scope.pagination = Pagination.getNew(5);
  
  
  $scope.$watch('userlist', function () {
      console.log($scope.userlist); 
      $scope.pagination.numPages = Math.ceil($scope.userlist.length/$scope.pagination.perPage);
  });
  $scope.$watch('opened.comments', function () {
  });  
  
  $scope.open = function(item){
      if ($scope.isOpen(item)){
          $scope.opened = undefined;
      } else {
          $scope.opened = item;
      }        
      $("#out").hide();
  };
  
  $scope.isOpen = function(item){
      return $scope.opened === item;
  };
  
  $scope.anyItemOpen = function() {
      return $scope.opened !== undefined;
  };
  
  $scope.close = function() {
      $("#out").show();
      $scope.opened = undefined;
  };
  
  $scope.loadData = function () {
      console.log("here")
       $http.get('/getUser').success(function(data) {
         $scope.userlist = data;
       });
    };
  
  
  $scope.addcomment = function(id,txt) { 
      $scope.opened._id;
      $http.get('/del/' + $scope.opened._id+'/'+txt).success(function(data) {
          
              $scope.loadData();
      });  
      $scope.opened.comments.unshift({
			"content" : app.txt
		});
  };

}]);

app.directive('jqmCollapsibleRepeat', function () {
  return function (scope, element, attrs) {
    if (scope.$last) {
        console.log($(element).parent())
        $(element).parent().listview('refresh');
    }
  };
});

app.directive('jqmCollapsibleRepeat', function () {
  return function (scope, element, attrs) {
    if (scope.$last) {
        $(element).parent().listview('refresh');
    }
  };
});

