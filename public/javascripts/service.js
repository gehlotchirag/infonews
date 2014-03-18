
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
 
 $http.post('/high/' + $scope.opened._id+'/'+term).success(function(data) {
     app.highid = data;
     //alert(app.highid)
     $scope.loadData();
     var str = $("#news").html();
     var newstr = '<span id='+app.highid+' class="highlight" ng-mouseover="loadcmt($event)" ng-mouseout="unloadcmt($event)" >'+term+'</span>'
     var res = str.replace(term,newstr);
     // console.log("----->>>",term)
     // console.log("?????",newstr)
     console.log($scope.opened.highlight)
       $("#news").html(res)
       
       
       
       
   var appPane = $('#news');//JQuery request for the app pane element.
  // appPane.html(data);//The dynamically loaded data
   $compile(appPane.contents())($scope);//Tells Angular to recompile the contents of the app pane.
     
 });  
     
     
        
               
    });
    
    $( "#news" ).ready(function() {

      });
      
    $scope.loadcmt = function() {
        app.high_id = event.srcElement.id;
        $( "#tooltip #commented" ).html( "<p>"+"<img scr=lib/images/ajax-loader.gif>loading.."+"</p>" );
        $("#tooltip").css("visibility","visible") 
        $("#tooltip").css({top: (event.pageY), left: (event.pageX), position:'absolute'});  
        
        $http.get('/gethigh/'+app.objid).success(function(data) {
            console.log($scope.opened.highlight)
            
            $scope.opened.highlight = data[0].highlight;
            console.log($scope.opened.highlight)
        
        for (i in $scope.opened.highlight) { 
            // console.log($scope.opened.highlight);
            // console.log($scope.opened.highlight[i].number);
            // console.log(app.high_id);
            var sn = $scope.opened.highlight[i].number.valueOf();
            var apid =  app.high_id.valueOf();
            //console.log(sn === apid)

            if(sn === apid)
            {
            $scope.currentcom = $scope.opened.highlight[i].comment;
                if($scope.currentcom===undefined)
                {$scope.currentcom = "No Comments Yet!"}
            
            }
           
         }
         //alert($scope.currentcom)
         $( "#tooltip #commented" ).html( "<p>"+$scope.currentcom+"</p>" );
        // $("#tooltip").css("visibility","visible") 
        // $("#tooltip").css({top: (event.pageY), left: (event.pageX), position:'absolute'});  
      //  $("#tooltip").css("top", ($event.y) + "px").css("left", ($event.x) + "px");
  });
    };
    
    $scope.loadData = function () {
       // console.log("here")
         $http.get('/getUser').success(function(data) {
            // console.log("*******************",data)
//             console.log("*******************",$scope.opened)
           $scope.userlist = data;
         });
      };


      $scope.gethigh = function (id) {
          console.log("getting..")
           $http.get('/gethigh/'+id).success(function(data) {
               //console.log("*******************",data)
               console.log("*******************",data[0].highlight)
             // console.log("*******************",$scope.opened)
             $scope.userlist = data;
           });
        };
    
    
    $scope.unloadcmt = function(event) {
        if(event.toElement.id !== "tooltip")
        $("#tooltip").css("visibility","hidden")
    };
    
   
    $scope.$watch('currentcom', function () {
    });
    
    $scope.$watch('opened.description', function () {
        function showpanel() {  
            app.objid = $scope.opened._id;
            for (i in $scope.opened.highlight)
            {
                var str = $("#news").html();
                
            var term = $.trim(($scope.opened.highlight[i].text));
            var id = $scope.opened.highlight[i].number;
            var newstr = '<span id='+id+' class="highlight" ng-mouseover="loadcmt()" ng-mouseout="unloadcmt($event)">'+term+'</span>';
            var res = str.replace(term,newstr);
          //  console.log("???????????????",newstr)
        //    console.log("*********************",res)
            
              $("#news").html(res)
              var appPane = $('#news');//JQuery request for the app pane element.
             // appPane.html(data);//The dynamically loaded data
              $compile(appPane.contents())($scope);//Tells Angular to recompile the contents of the app pane.
              
          }    
      }

       // use setTimeout() to execute
       setTimeout(showpanel, 200)

      
     
        
        
        
    });
    
    
}]);

app.controller('max', ['$scope', 'Pagination',   
function($scope, Pagination) {
    $scope.$watch('txt', function () {
        app.txt = $scope.txt;
    });    
}]);



app.controller('Main', ['$compile','$http','$scope', 'Pagination',   
function($compile,$http,$scope, Pagination) {
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
      $("#button").hide();
      
      var term;
      for (i in $scope.opened.highlight)
      {
      term = $.trim(($scope.opened.highlight[i].text))
      var str = $("#news").html();
      var id = $scope.opened.highlight[i].number;
       $scope.hid = $scope.opened.highlight[i]._id;
      var newstr = '<span id='+id+' class="highlight" ng-mouseover="loadcmt()" ng-mouseout="unloadcmt($event)">'+term+'</span>';
      var res = str.replace(term,newstr);
        $("#news").html(res)
        var appPane = $('#news');//JQuery request for the app pane element.
       // appPane.html(data);//The dynamically loaded data
        $compile(appPane.contents())($scope);//Tells Angular to recompile the contents of the app pane.
 
    }
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
        $("#button").show();
        
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

  $scope.addcom = function(id,txt) { 
      console.log("hi")
      console.log(app.high_id)
      $scope.opened.hid = app.high_id
      console.log($scope.opened.highlight)
      $scope.opened._id;
      $( "#tooltip #commented" ).html( "<p>"+$scope.currentcom+"</p>" );
      
      $http.get('/adcom/' + $scope.opened._id+'/'+$scope.opened.hid+'/'+txt).success(function(data) {
          console.log("***********",data)
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

