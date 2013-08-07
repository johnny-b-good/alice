var Alice = angular.module('Alice', ['Alice.controllers', 'Alice.directives', 'Alice.services'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'templates/magazine.html', controller: 'Magazine', reloadOnSearch: false})
            .when('/thumbs', {templateUrl: 'templates/thumbs.html', controller: 'Thumbs'})
            .otherwise({redirectTo: '/'});
    }]);