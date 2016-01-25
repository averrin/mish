var app = angular.module('mish', ['mongolabResource'])
    .directive('onFinishRender', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit(attr.onFinishRender);
                    });
                }
            }
        }
    })
//    .config(function($routeProvider) {
//    $routeProvider.
//      when('/', {controller:AppController, templateUrl:'list.html'}).
//      when('/edit/:projectId', {controller:EditCtrl, templateUrl:'detail.html'}).
//      when('/new', {controller:CreateCtrl, templateUrl:'detail.html'}).
//      otherwise({redirectTo:'/'});
//  });

app.constant('API_KEY', 'EXqnV43PiAMnMHCuLkGbfeT22PbGhYXa');
app.constant('DB_NAME', 'mish');

app.factory('Links', function ($mongolabResource) {
  return $mongolabResource('links');
});
app.controller('AppController', function ($scope, Links) {
    $scope.links = Links.query();
    $scope.$on('favicons', function(ngRepeatFinishedEvent) {
        jQuery('.link').not(":has(img)").favicons({insert: 'insertBefore'});
        $(".lw").on("click", function(){
            window.open($(this).children("a").attr("href"), "_blank");
        })
        $(".del").on("click", function(){
            var id = $(this).attr("data-id");
            console.log($scope.links);
            console.log($scope.links[id])
            $scope.links[id].remove(function(){location.reload()});

            })

        
        $("#addurl").on("click", function(){
            var t = $("#urlTitle").val();
            var u = $("#urlLink").val();
            console.dir(Links)
            if(t != "" & u != ""){
                Links.save({title: t, url:u}, function(){location.reload()})
            }
        })
        
        
    });
});

