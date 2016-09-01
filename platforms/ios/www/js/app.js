
// Ionic EventApp App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'EventApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'EventApp.controllers' is found in controllers.js
angular.module('EventAppFilter',[])
.filter('isAfter', function() {
  return function(items, dateAfter) {
    // Using ES6 filter method
    console.log(items)
    return items.filter(function(item){
      return moment(item.date).isAfter(dateAfter);
    })
  }
});

var EventApp = angular.module('EventApp', ['ionic','EventApp.controllers','angular-svg-round-progress','firebase','EventAppFilter'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  
})


.config(function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })

  .state('otp', {
    url: '/otp',
    templateUrl: 'templates/otp.html',
    controller: 'SignupCtrl'
  })

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  })

  .state('app.upcoming', {
      url: '/upcoming',
      views: {
        'menuContent': {
          templateUrl: 'templates/upcoming.html',
          controller:'UpcomingEventsCtrl'
        }
      }
    })
    .state('app.addevents', {
      url: '/addevents',
      views: {
        'menuContent': {
          templateUrl: 'templates/addevents.html',
          controller: 'AddEventCtrl'
        }
      }
    })
    .state('app.password', {
      url: '/password',
      views: {
        'menuContent': {
          templateUrl: 'templates/password.html',
          controller: 'PasswordCtrl'
        }
      }
    })

  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('signup');
});


EventApp.directive('textarea', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attr){
        var update = function(){
            element.css("height", "auto");
            var height = element[0].scrollHeight; 
            element.css("height", element[0].scrollHeight + "px");
        };
        scope.$watch(attr.ngModel, function(){
            update();
        });
    }
  };
});

EventApp.service('Api',function($http,$rootScope,$ionicLoading,$firebaseArray){
    this.getEvent = function(){
      var events         = new Firebase("https://gootoplay-84108.firebaseio.com/event");
      $rootScope.events_obj    = $firebaseArray(events);
      //events_obj  = events_obj;
        $ionicLoading.show();

        $rootScope.events_obj.$loaded(function(x) {
          x === $rootScope.events_obj; // true
          
          $ionicLoading.hide();

        }, function(error) { 
          $ionicLoading.hide();
        });

    };

 return this;
});

