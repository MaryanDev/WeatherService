/// <reference path="../../angular.js" />
(function (angular) {
    angular.module("weatherModule")
        .factory("locationsService", locationsService);

    locationsService.$inject = ["$http"];

    function locationsService($http) {
        var service = {
            getAllLocations: getAllLocationsAjax
        }

        return service;

        function getAllLocationsAjax(page) {
            var promise = $http({
                method: "GET",
                url: "GetLocations",
                params: {
                    currentPage: page
                }
            });

            return promise;
        }
    }
})(angular);