var myApp = angular.module("mainApp", []);

myApp.controller('mainCtrl', function($scope, $interval) {


    $scope.notificationStatus = '';

    $scope.notify = function (title, theBody, theIcon ) {

      $scope.options = {
        body: theBody || $scope.body,
        icon: theIcon || $scope.icon
      };

      if (!("Notification" in window)){
        alert("your browser doesn't support html5 notifications! please update your browser!");

      }else if(Notification.permission === 'granted'){

        $scope.notification = new Notification(title || $scope.title, $scope.options);
        $scope.notificationStatus = 'granted';

      }else if(Notification.permission !== 'denied'){
          Notification.requestPermission(function (permission) {
            if(permission === 'granted'){
              $scope.notification = new Notification( title || $scope.title, $scope.options);
              $scope.notificationStatus = 'granted';

            }
          });
      }else if (Notification.permission === 'denied') {
        $scope.notificationStatus = 'denied';
      }

      $scope.notification.onclick = function () {
        window.open( theIcon || $scope.icon , 'notification_image');
      };

    };

    $scope.runInterval = function () {

      alert("you'll get notifications with random images! stay tuned!");
      $interval(function () {
        $scope.notify('Tring Tring!!', "Here's a random picture for you! with ❤️ from interval!", 'http://loremflickr.com/320/240/dog');
      }, 10000, 50);
      
    };

});
