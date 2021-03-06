'use strict';

/* eslint-disable no-var, prefer-arrow-callback */
var HttpBackend = require('httpbackend');

var CustomWorld = (function () {
    var chai = require('chai');
    var chaiAsPromised = require('chai-as-promised');
    var CustomWorld = function CustomWorld () {
        global.By = global.protractor.By;
        chai.use(chaiAsPromised);
        global.expect = chai.expect;
        global.Promise = require('bluebird');
    };

    return CustomWorld;
})();

module.exports = function () {
    this.World = function (callback) {
        var w = new CustomWorld();
        return callback(w);
    };

    // TODO: Get rid of `singleFeature` here. It works ok,
    // but I’d rather see if there’s a way to get the number of
    // specs from within the `StepResult` hook…
    var singleFeature = false;
    /* eslint-disable new-cap */
    this.Before(function (scenario, callback) {
    /* eslint-enable new-cap */
        global.httpBackend = new HttpBackend(global.browser);
        global.browser.getProcessedConfig()
        .then(function (value) {
            if (value.specs.length === 1) {
                singleFeature = true;
            }
            callback();
        });
    });

    /* eslint-disable new-cap */
    this.StepResult(function (event, callback) {
        var stepResult;
        if (singleFeature) {
            stepResult = event.getPayloadItem('stepResult');
            if (stepResult.isFailed()) {
                global.browser.pause();
            }
        }
        callback();
    });

    /* eslint-disable new-cap */
    this.After(function (scenario, callback) {
    /* eslint-enable new-cap */
        global.httpBackend.clear();
        global.browser.manage().deleteAllCookies();
        global.browser.executeScript('window.sessionStorage.clear();');
        global.browser.executeScript('window.localStorage.clear();');

        if (scenario.isFailed()) {
            Promise.all([takeScreenshot(scenario), printBrowserLog()])
            .then(function () {
                callback();
            })
            .catch(function (err) {
                callback(err)
            });
        } else {
            callback();
        }

        function takeScreenshot (scenario) {
            return global.browser.takeScreenshot()
            .then(function (base64png) {
                var decodedImage = new Buffer(base64png, 'base64').toString('binary');
                scenario.attach(decodedImage, 'image/png');
            });
        }

        function printBrowserLog () {
            return global.browser.manage().logs().get('browser')
            .then(function (browserLog) {
                var severeErrors = browserLog.filter(function (log) {
                    return log.level.name === 'SEVERE';
                })
                .map(function (log) {
                    return log.message.substring(log.message.indexOf('Error'), log.message.indexOf('\n'));
                });

                var uniqueErrors = {};
                if (severeErrors) {
                    severeErrors.forEach(function (message) {
                        uniqueErrors[message] = true;
                    });
                    Object.keys(uniqueErrors).map(function (message) {
                        console.error(message);
                    });
                }
            });
        }
    });

    return this.World;
};
