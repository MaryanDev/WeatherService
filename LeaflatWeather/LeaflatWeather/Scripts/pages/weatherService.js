(function (angular) {
    angular.module("weatherModule")
        .factory("weatherService", weatherService);

    weatherService.$inject = ["$http"];

    function weatherService($http) {
        var service = {
            getCurrentLocation: getCurrentLocationAjax,
            getDataForLocation: getDataForLocationAjax
        };

        return service;

        function getCurrentLocationAjax() {
            var promise = $http.get('http://ip-api.com/json');
            return promise;
        };

        function getDataForLocationAjax(lat, lng) {
            var promise = $http({
                method: "GET",
                url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=5b4bead23d3a1701edbbd31047338e68"
            });
            return promise;
        }
    };
})(angular);