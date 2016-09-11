/// <reference path="../../angular.js" />
(function (angular) {
    angular.module("weatherModule")
        .factory("locationsService", locationsService);

    locationsService.$inject = ["$http"];

    function locationsService($http) {
        var service = {
            getAllLocations: getAllLocationsAjax,
            getCountries: getCountriesAjax
        }

        return service;

        function getAllLocationsAjax(page, country) {
            var promise = $http({
                method: "GET",
                url: "GetLocations",
                params: {
                    currentPage: page,
                    country: country
                }
            });

            return promise;
        }

        function getCountriesAjax() {
            var promise = $http({
                method: "GET",
                url: "GetCountries"
            });

            return promise;
        }
    }
})(angular);