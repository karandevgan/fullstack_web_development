'use strict';

angular.module('confusionApp')
    .constant("baseURL", "http://localhost:3002/")
    .factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        var menuFactory = {};

        menuFactory.getDishes = function () {
            return $resource(
                baseURL + "dishes/:id",
                null,
                {
                    'update': { method: 'PUT' }
                }
            );
        };

        // implement a function named getPromotion that returns a selected promotion.
        menuFactory.getPromotion = function () {
            return $resource(
                baseURL + "promotions/:id",
                null
            );
        };

        return menuFactory;
    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        var corpfac = {};

        // Implement two functions, one named getLeaders,
        // the other named getLeader(index)
        // Remember this is a factory not a service
        corpfac.getLeaders = function () {
            return $resource(
                baseURL + "leadership/:id",
                null
            );
        };

        return corpfac;
    }])
    ;