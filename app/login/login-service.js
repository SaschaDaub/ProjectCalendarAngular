'use strict';

// Register `login` service
angular.module('login').factory('loginService', ['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {
    var isLoggedIn = {};
    var appTimeStamp = Date.now();

    var loggedIn = window.localStorage.getItem('isLoggedIn');
    isLoggedIn = JSON.parse(loggedIn);

    if(isLoggedIn) {
        var difference = appTimeStamp - isLoggedIn.timeStamp;
        var diffInDays = difference / (1000 * 3600 * 24);
        if (diffInDays > 30) {
            isLoggedIn = {
                'value': false
            };
            $rootScope.isLoggedIn = false;
        } else {
            $rootScope.isLoggedIn = isLoggedIn.value;
            $rootScope.userId = isLoggedIn.userId;
        }
    } else {
        isLoggedIn = {
            'value': false
        };
        $rootScope.isLoggedIn = false;
    }

    function getIsLoggedIn() {
        return isLoggedIn;
    }

    function setIsLoggedIn(value) {
        isLoggedIn.value = value;
    }

    function logIn(uname, psw) {
        $http.post('/log_in', { userName: uname, password: psw })
            .then(function(response) {
                console.log(response);
                if (response.data.isRegistered == true) {
                    $rootScope.$emit('loggedIn', {userId: response.data.userId});
                    $rootScope.isLoggedIn = true;
                    $rootScope.userId = response.data.userId;
                    $location.path('/calendar');
                } else {
                    $rootScope.$emit('wrongLoginInput');
                    $rootScope.isLoggedIn = false;
                }
            });
    }

    return {
        getIsLoggedIn: getIsLoggedIn,
        setIsLoggedIn: setIsLoggedIn,
        logIn: logIn
    };
}]);