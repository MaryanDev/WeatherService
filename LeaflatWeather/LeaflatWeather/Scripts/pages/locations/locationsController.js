/// <reference path="../../angular.js" />
(function (angular) {
    angular.module("weatherModule")
        .controller("locationsController", locationsController);

    locationsController.$inject = ["$scope", "locationsService"];

    function locationsController($scope, locationsService) {
        $scope.allLocations = [];
        $scope.countries = [];
        $scope.currentPage = 1;
        $scope.currentCountry = "All";
        angular.extend($scope, {
            mapCenter: {},
            defaults: {
                scrollWheelZoom: true
            },
            markers: []
        });
        $scope.isMapVisible = false;

        function activate() {
            locationsService.getAllLocations()
                .then(function (response) {
                    console.log(response.data);
                    $scope.allPages = response.data.allPages;
                    $scope.allLocations = response.data.locations;
                    $scope.currentPage = response.data.currentPage;
                },
                function errorCallback(error) {
                    console.log(error.status);
                });

            locationsService.getCountries()
                .then(function (response) {
                    $scope.countries = response.data;
                    console.log(response.data);
                },
                function errorCalback(error) {
                    console.log(error.status)
                });
        };

        activate();

        $scope.getPage = function (page, country) {
            locationsService.getAllLocations(page, country)
                            .then(function (response) {
                                $scope.allPages = response.data.allPages;
                                $scope.allLocations = response.data.locations;
                            }, function myError(response) {
                                console.log(response.statusText);
                            });
        };

        $scope.getMap = function (lat, lng) {
            localStorage.setItem("lat", lat);
            localStorage.setItem("lng", lng);
            location.assign("/Home/Index");
        };

        $scope.showMap = function ($event, location) {
            //console.log($event);
            //console.log(angular.element(document.querySelector("#locationContainer .row div span")));
            var options = angular.element(document.querySelector("#locationContainer .row div span"));
            angular.element(document.querySelector("#mapPopOver")).css({ "left": $event.pageX + "px", "top": $event.pageY + "px", "opacity": "0.5" });
            $scope.mapCenter.lat = location.Lattitude;
            $scope.mapCenter.lng = location.Longitude;
            $scope.mapCenter.zoom = 16;
            $scope.markers.push({
                lat: location.Lattitude,
                lng: location.Longitude,
                focus: true,

                icon: {
                    type: 'awesomeMarker',
                    icon: 'user',
                    markerColor: 'blue',
                    iconColor: 'white'
                }
            });
            $scope.isMapVisible = $scope.isMapVisible === false ? true : false;
        };

        $scope.hideMap = function () {
            
        };

        $scope.zoomInMap = function () {
            angular.element(document.querySelector("#mapPopOver")).css({ "width": "400px", "height": "400px", "opacity": "1" });
            angular.element(document.querySelector("leaflet")).css({ "width": "400px", "height": "400px" });
        };

        $scope.zoomOffMap = function () {
            angular.element(document.querySelector("#mapPopOver")).css({ "width": "270px", "height": "270px", "opacity": "0.5" });
            angular.element(document.querySelector("leaflet")).css({ "width": "270px", "height": "270px" });
        };
    }
})(angular);