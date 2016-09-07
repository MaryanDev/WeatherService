(function (angular) {
    angular.module("weatherModule")
        .controller("weatherController", wheatherController);

    wheatherController.$inject = ["$scope", "weatherService"];

    function wheatherController($scope, weatherService) {

        //angular.extend($scope, {
        //    defaults: {
        //        scrollWheelZoom: true
        //    }
        //});

        $scope.weatherInfo = {};
        angular.extend($scope, {
            center: {
            },
            defaults: {
                scrollWheelZoom: false
            }
        });

        var getCoords = function () {
            weatherService.getCurrentLocation()
            .success(function (coordinates) {
                $scope.center.lat = coordinates.lat;
                $scope.center.lng = coordinates.lon;
                $scope.center.zoom = 10;

                weatherService.getDataForLocation(coordinates.lat, coordinates.lon)
                .then(function (response) {
                    $scope.weatherInfo = response.data;
                });
            });

        };

        function activate() {
            getCoords();
            
        };
        activate();

        $scope.$on('leafletDirectiveMap.click', function (event, wrap) {
            weatherService.getDataForLocation(wrap.leafletEvent.latlng.lat, wrap.leafletEvent.latlng.lng)
                .then(function (response) {
                        $scope.weatherInfo = response.data;
                    });
        });
    };
})(angular);