'use strict';

angular.module('calendarApp').config(['$routeProvider',
    function config($routeProvider) {
        $routeProvider.when('/calendar', {
            template: '<calendar-control></calendar-control>'
        }).when('/appointments', {
            template: '<appointments-control></appointments-control>'
        }).when('/polls', {
            template: '<polls-control></polls-control>'
        }).when('/', {
            template: '<login-control></login-control>'
        }).when('/login', {
            template: '<login-control></login-control>'
        }).otherwise({
           redirectTo: '/'
        });
    }
]);
