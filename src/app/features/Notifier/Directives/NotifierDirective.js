'use strict';

// Utilities:
var fs = require('fs');

// Module:
var Notifier = require('../Notifier');

// Dependencies:
require('../Services/NotifierService');

var NotifierDirective = function (NotifierService) {
    return {
        restrict: 'E',

        /* eslint-disable no-path-concat */
        template: fs.readFileSync(__dirname + '/Notifier.html', 'utf8'),
        /* eslint-enable no-path-concat */

        link: function ($scope) {
            $scope.notifications = NotifierService.notifications;
            $scope.dismiss = NotifierService.dismiss;
        }
    };
};

Notifier.directive('tractorNotifier', NotifierDirective);
