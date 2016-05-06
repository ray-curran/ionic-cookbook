// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

app.controller('VideoCtrl', function($scope, $cordovaCapture) {
  $scope.data = {
    videoPath: ""
  };

  $scope.captureVideo = function() {
    var options = { limit: 3, duration: 15 };

    $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here
      $scope.data.videoPath = "file:/" + videoData[0].fullPath;
    }, function(err) {
      // An error occurred. Show a message to the user
      console.log(err);
    });
  }
})

app.directive("cordovaVideo", function () {
  return {
    restrict: 'AEC',
    scope: {src: '='},
link: function(scope, element, attrs) {
      scope.$watch('src', function(newVal, oldVal) {
        if (scope.src != "") {
          // Create a div object
          var div = document.createElement('div');
          div.innerHTML = "<video id=\"myCordovaVideo\" controls>"+
                          "<source src=\"" + scope.src + "\" type=\"video/quicktime\">"+
                          "</video>";

          // Delete previous video if exists
          var previousDiv = document.getElementById('myCordovaVideo');
          if (previousDiv)
            previousDiv.remove();

          // Append new <video> tag into the DOM
          element.append(div);
        }

      });
    }
  }
});


