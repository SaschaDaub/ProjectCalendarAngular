'use strict';

// Register `topBar` directive, along with its associated controller and template
angular.
module('navigationTabs').directive('topBar', [ function() {
    return {
        link: function(scope, elem) {
            console.log("hello world");
        }
    };
}]);