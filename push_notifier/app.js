var myApp = angular.module("mainApp", []);

myApp.controller('mainCtrl', function($scope) {


    $scope.notificationStatus = '';

    $scope.notify = function () {

      $scope.options = {
        body: $scope.body,
        icon: $scope.icon
      };

      if (!("Notification" in window)){
        alert("your browser doesn't support html5 notifications! please update your browser!");

      }else if(Notification.permission === 'granted'){

        $scope.notification = new Notification($scope.title, $scope.options);
        $scope.notificationStatus = 'granted';

      }else if(Notification.permission !== 'denied'){
          Notification.requestPermission(function (permission) {
            if(permission === 'granted'){
              $scope.notification = new Notification($scope.title, $scope.options);
              $scope.notificationStatus = 'granted';

            }
          });
      }else if (Notification.permission === 'denied') {
        $scope.notificationStatus = 'denied';
      }

    };
 
});
