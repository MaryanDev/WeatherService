﻿(function (angular) {
    angular.module("weatherModule")
        .controller("weatherController", wheatherController);

    wheatherController.$inject = ["$scope", "weatherService", "$http"];

    function wheatherController($scope, weatherService, $http) {

        $scope.weatherInfo = {};

        angular.extend($scope, {
            center: {
            },
            defaults: {
                scrollWheelZoom: true
            },
            markers: {

            }
        });

        var getCoords = function () {
            weatherService.getCurrentLocation()
            .success(function (coordinates) {
                $scope.center.lat = coordinates.lat;
                $scope.center.lng = coordinates.lon;
                $scope.center.zoom = 16;

                weatherService.getDataForLocation(coordinates.lat, coordinates.lon)
                .then(function (response) {
                    $scope.weatherInfo = response.data;
                });

                $scope.getSightsPoints(coordinates.lat, coordinates.lon).success(function (data) {
                    $scope.markerHelper(coordinates, data);
                })
            });

        };

        function activate() {
            getCoords();
        };
        activate();

        $scope.$on('leafletDirectiveMap.contextmenu', function (event, wrap) {
            weatherService.getDataForLocation(wrap.leafletEvent.latlng.lat, wrap.leafletEvent.latlng.lng)
                .then(function (response) {
                    $scope.weatherInfo = response.data;
                });
            $scope.markers = {};
            $scope.markers.newMarker = {
                lat: wrap.leafletEvent.latlng.lat,
                lng: wrap.leafletEvent.latlng.lng,
                focus: true,
                draggable: false
            };

            $scope.successMessage = "";
            $scope.errorMessage = "";

            $scope.getSightsPoints(wrap.leafletEvent.latlng.lat, wrap.leafletEvent.latlng.lng).success(function (data) {
                $scope.markerHelper(wrap.leafletEvent.latlng, data);
            })
        });
        $scope.$on('leafletDirectiveMap.dragend', function (event) {
            angular.element(document.querySelector("#regionInfoPopUp")).css("display", "none");
            $scope.markers = {};
        });

        $scope.$on('leafletDirectiveMap.zoomstart', function (event) {
            angular.element(document.querySelector("#regionInfoPopUp")).css("display", "none");
            $scope.markers = {};
        });

        $scope.getSightsPoints = function (lat, lng) {
            var promise = $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=' + lat + '%7C' + lng + '&gslimit=30&format=json&callback=JSON_CALLBACK')
            //.success(function (data) {
            //    return data;
            //})
            return promise;
        };

        $scope.markerHelper = function (coordinates, data) {
            $scope.geodata = data;
            var currentPositionPoint = {
                lat: coordinates.lat,
                lng: coordinates.lng,
                city: coordinates.city,
                focus: true,
                //message: 'Your approximate location in ' + coordinates.city + ' is lat: ' + coordinates.lat + ' and lon: ' + coordinates.lng + '. You can also see some of the sights within a radius of 10 kilometers.',
                icon: {
                    type: 'awesomeMarker',
                    icon: 'user',
                    markerColor: 'blue',
                    iconColor: 'white'
                }
            }
            $scope.mapMarkers = geodataToMarkers($scope.geodata);
            $scope.mapMarkers.push(currentPositionPoint);
        }

        $scope.$on('leafletDirectiveMarker.click', function (e, args) {
            console.log(e);
            console.log(args);
            //$http({
            //    method: "JSONP",
            //    url: 'https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gscoord=' + args.leafletEvent.latlng.lat + '%7C' + args.leafletEvent.latlng.lng + '&gslimit=30&format=json&callback=JSON_CALLBACK'
            //}).then(function (response) {
            //    console.log(response.data);
            //});
        });

        $scope.sendData = function () {
            var weatherData = {
                Country: $scope.weatherInfo.sys.country,
                Longitude: $scope.weatherInfo.coord.lon,
                Lattitude: $scope.weatherInfo.coord.lat,
                Description: $scope.weatherInfo.weather[0].description,
                Humidity: $scope.weatherInfo.main.humidity,
                Pressure: $scope.weatherInfo.main.pressure,
                Temperature: $scope.weatherInfo.main.temp - 272,
                WindSpeed: $scope.weatherInfo.wind.speed
            };
            console.log(JSON.stringify(weatherData));
            weatherService.sendWeatherData(weatherData)
                .then(function (response) {
                    $scope.successMessage = "Data was succesfully sended";
                    console.log(response);
                }, function errorCallback(response) {
                    $scope.errorMessage = "Some error has been occured";
                    console.log(response);
                });
        }
    };
})(angular);