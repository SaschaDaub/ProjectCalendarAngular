'use strict';

// Define the `calendarApp` module
var mainApp = angular.module('calendarApp', [
    'ngRoute',
    'navigationTabs',
    'calendar',
    'appointments',
    'polls',
    'login'
]);

mainApp.run(function ($rootScope) {
    var appTimeStamp = Date.now();
    var loggedIn = window.localStorage.getItem('isLoggedIn');
    var isLoggedIn = JSON.parse(loggedIn);
    $rootScope.events_array = [];

    if(isLoggedIn) {
        var difference = appTimeStamp - isLoggedIn.timeStamp;
        var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24;
        if (daysDifference > 30) {
            $rootScope.isLoggedIn = false;
        } else {
            $rootScope.isLoggedIn = isLoggedIn.value;
            $rootScope.userId = isLoggedIn.userId;
        }
    } else {
        $rootScope.isLoggedIn = false;
    }
});
