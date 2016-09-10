(function (angular) {
    angular.module("weatherModule")
        .factory("weatherService", weatherService);

    weatherService.$inject = ["$http", "$q", "$window"];

    function weatherService($http, $q, $window) {
        var service = {
            getCurrentLocation: getCurrentLocationAjax,
            getDataForLocation: getDataForLocationAjax,
            sendWeatherData: sendWeatherDataAjax,
            getSightsPoints: getSightsPointsAjax
        };

        return service;

        function getCurrentLocationAjax() {
            //var promise = $http.get('http://ip-api.com/json');
            //return promise;
            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(function (position) {
                        deferred.resolve(position);
                    },function (err) {
                        deferred.reject(err);
                    });
            }

            return deferred.promise;
        };

        function getDataForLocationAjax(lat, lng) {
            var promise = $http({
                method: "GET",
                url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=5b4bead23d3a1701edbbd31047338e68"
            });
            return promise;
        }

        function sendWeatherDataAjax(weatherData) {
            var promise = $http.post("Home/SaveWeatherData", weatherData);
            return promise;
        }

        function getSightsPointsAjax(lat, lng) {
            var promise = $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=' + lat + '%7C' + lng + '&gslimit=30&format=json&callback=JSON_CALLBACK');

            return promise;
        }
    };
})(angular);