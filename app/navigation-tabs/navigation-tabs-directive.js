'use strict';

// Register `naviBar` directive, along with its associated controller and template
angular.module('navigationTabs').directive('naviBar', ['$rootScope', '$location', function($rootScope, $location) {
    return {
      templateUrl: 'app/navigation-tabs/navigation-tabs-template.html',
      controller: 'navigationTabsController',
      link: function(scope, elem) {
          $('#naviButtons a').click(function () {
              $('#naviButtons li').removeClass('clicked');
              $(this).parent().addClass('clicked');
          });

          $('#logOutIcon').click(function() {
              scope.logOut();
          });

          $rootScope.$on('logOut', function () {
              logOut();
          });

          function logOut() {
              $('#currentTabText').text('Project Calendar');
              $('#saveIcon').hide();
              $('#reloadIcon').hide();
              $('#globalIcon').hide();
              $('#accountLogo').hide();
              $('#naviBar').hide();
              $('#logOutIconDiv').hide();
              $('.animate').removeClass('hidden').show();
              $('#loginButton').show();
              $('#userName').remove();

              window.localStorage.setItem('isLoggedIn', JSON.stringify({'value': false}));

              $('#loginButton').click(function () {
                  var uname = $('#uname')[0].value;
                  var psw = $('#psw')[0].value;
                  if (uname && psw) {
                      $rootScope.$emit('logIn', { userName: uname, password: psw});
                      $('#loginButton').hide();
                  }
              });
          };
      }
    };
}]);
