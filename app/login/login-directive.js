'use strict';

// Register `login` directive, along with its associated controller and template
angular.module('login').directive('loginControl', ['$rootScope', function ($rootScope) {
    return {
        templateUrl: 'app/login/login-template.html',
        controller: 'loginController',
        link: function (scope, elem) {
            if (scope.isLoggedIn.value == false) {
                $rootScope.$emit('logOut');
            } else {
                $('.animate').hide();
            }


            $rootScope.$on('loggedIn', function (event, args) {
                $('.animate').addClass('hidden').hide();
                $('#accountLogo').show();
                $('#naviBar').show();
                $('#logOutIconDiv').show();

                var timeStamp = Date.now();
                localStorage.setItem('isLoggedIn', JSON.stringify({'value': true, timeStamp: timeStamp, userId: args.userId}));
            });

            $rootScope.$on('wrongLoginInput', function (event, args) {
                $('#loginButton').show();
                window.alert('Wrong Username or Password.');
            });
        }
    };
}]);