var Alice = angular.module('Alice', ['Alice.controllers', 'Alice.directives', 'Alice.services'])
    .config(['$routeProvider', '$interpolateProvider', function($routeProvider, $interpolateProvider) {
        $routeProvider
            .when('/', {templateUrl: 'templates/magazine.html', controller: 'Magazine', reloadOnSearch: false})
            .when('/thumbs', {templateUrl: 'templates/thumbs.html', controller: 'Thumbs'})
            .otherwise({redirectTo: '/'});
        
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    }]);