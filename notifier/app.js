var myApp = angular.module("mainApp", []);

myApp.controller('mainCtrl', function($scope, $interval) {


    $scope.notificationStatus = '';
    $scope.date = new Date();
    $scope.intervalRunning = false;

    $scope.checkIconUrl = function () {

      if (!($scope.search === "" || $scope.search === undefined)) {
          $scope.icon = 'http://loremflickr.com/320/240/' + $scope.search + '/all';
      } else {
        $scope.icon = 'http://loremflickr.com/320/240/cat/all';
      }
    };

    $scope.notify = function (title, theBody, theIcon ) {

      $scope.checkIconUrl();

      $scope.options = {
        body: $scope.body || theBody,
        icon: $scope.icon || theIcon
      };

      if (!("Notification" in window)){
        alert("your browser doesn't support html5 notifications! please update your browser!");

      }else if(Notification.permission === 'granted'){

        $scope.notification =  new Notification($scope.title || title, $scope.options);
        $scope.notificationStatus = 'granted';

      }else if(Notification.permission !== 'denied'){
          Notification.requestPermission(function (permission) {
            if(permission === 'granted'){
              $scope.notification =  new Notification($scope.title || title, $scope.options);
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
      $scope.notificationInterval = $interval(function () {
        $scope.notify('Tring Tring!!', "Here's a random picture of " + $scope.search + " for you! with ❤️ from interval!", 'http://loremflickr.com/320/240/' + $scope.search + '/all');
      }, 10000, 50);

      $scope.intervalRunning = true;
    };

    $scope.cancelInterval = function () {
      $interval.cancel($scope.notificationInterval);
      console.log("interval is canceled!");
      alert("all automatic notifications have been aborted!!");
      $scope.intervalRunning = false;
    };

});
