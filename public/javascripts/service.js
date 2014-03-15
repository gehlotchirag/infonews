
var app = angular.module('Test', ['SimplePagination']);

app.controller('ItemController', ['$compile','$http','$scope', 'Pagination',   
function($compile,$http,$scope, Pagination) {
    $("#news").mouseup( function (e) { 
        //alert("You selected: "+window.getSelection());
        
        var src_str = $("#news").html();
        var term = new String(window.getSelection());
        
         // if ($('#news:contains('+term+')'))
 //         {
 //            // $('#news').html().replace(term , '<span class="highlight">'+term+'</span>');
 //             alert('<span class="highlight">'+term+'</span>');
 //    
 //         }        
         var str = $("#news").html();
         var newstr = '<span class="highlight" ng-mouseover="loadcmt($event)" ng-mouseout="unloadcmt($event)" >'+term+'</span>'
         var res = str.replace(term,newstr);
       $("#news").html(res)
       var appPane = $('#news');//JQuery request for the app pane element.
      // appPane.html(data);//The dynamically loaded data
       $compile(appPane.contents())($scope);//Tells Angular to recompile the contents of the app pane.
        
       $http.get('/high/' + $scope.opened._id+'/'+term).success(function(data) {
           console.log("done")
       });          
    });
    
    $( "#news" ).ready(function() {

      });
      
    $scope.loadcmt = function($event) {
        $("#tooltip").css("visibility","visible")    
        $("#tooltip").css("top", ($event.y) + "px").css("left", ($event.y) + "px");
    };
    $scope.unloadcmt = function($event) {
        
        $("#tooltip").css("visibility","hidden")    
    };
    
    $scope.$watch('opened.description', function () {
        function showpanel() {  
            for (i in $scope.opened.highlight)
            {
            var term = ($scope.opened.highlight[i].text)
            console.log(term)
            var str = $("#news").html();
            var newstr = '<span class="highlight">'+term+'</span>';
            var res = str.replace(term,newstr);
              $("#news").html(res)
          }
           
       }

       // use setTimeout() to execute
       setTimeout(showpanel, 200)

        
       /*    
        $('mydiv').bind("DOMSubtreeModified",function(){
          alert('changed');
        });
        
        $('#news').bind('DOMNodeInserted DOMNodeRemoved', function(event) {
            if (event.type == 'DOMNodeInserted') {
                alert('Content added! Current content:' + '\n\n' + this.innerHTML);
            } else {
                alert('Content removed! Current content:' + '\n\n' + this.innerHTML);
            }
        });
        
        $('#divId').bind('DOMNodeInserted', function(event) {
                     alert('inserted ' + event.target.nodeName + // new node
                   ' in ' + event.relatedNode.nodeName); // parent
               });
    */
        
        /*
         for (i in $scope.opened.highlight)
         {
         var text = $scope.opened.highlight[i].text;
         console.log(text,$scope.opened.highlight[i])
         term = text;
         var str = $scope.opened.description;
         var newstr = '<span class="highlight">'+term+'</span>';
         var res = str.replace(term,newstr);
           $scope.opened.description = res;
    }
        */
        
    });
    
    
}]);

app.controller('max', ['$scope', 'Pagination',   
function($scope, Pagination) {
    $scope.$watch('txt', function () {
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
      
      var term;
      for (i in $scope.opened.highlight)
      term = ($scope.opened.highlight[i].text)
      var str = $("#news").html();
      var newstr = '<span class="highlight">'+term+'</span>';
      var res = str.replace(term,newstr);
        $("#news").html(res)
  };
  
  $scope.isOpen = function(item){
      return $scope.opened === item;
  };
  
  $scope.anyItemOpen = function() {
      return $scope.opened !== undefined;
  };
  
  $scope.close = function() {
      $('body').addClass('ui-loading');
      $http.get('/getUser').success(function(data) {
        $('body').removeClass('ui-loading');
        $scope.opened = undefined;
        $scope.userlist = data;
        $("#out").show();
      
      });
      
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

app.directive('bindHtmlUnsafe', function( $compile ) {
    return function( $scope, $element, $attrs ) {

        var compile = function( newHTML ) { // Create re-useable compile function
            newHTML = $.parseHTML((newHTML).trim());
            newHTML = $compile(newHTML)($scope); // Compile html
            $element.html('').append(newHTML); // Clear and append it
        };

        var htmlName = $attrs.bindHtmlUnsafe; // Get the name of the variable 
                                              // Where the HTML is stored

        $scope.$watch(htmlName, function( newHTML ) { // Watch for changes to 
                                                      // the HTML
            if(!newHTML) return;
            compile(newHTML);   // Compile it
        });

    };
});


app.directive('jqmCollapsibleRepeat', function () {
  return function (scope, element, attrs) {
    if (scope.$last) {
        $(element).parent().listview('refresh');
    }
  };
});

