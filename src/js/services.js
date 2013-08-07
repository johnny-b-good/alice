angular.module('Alice.services', [])
    .service('MagazineData', function($http, $q){
        this.get = function(){
            var deferred = $q.defer();
            var url = 'data/magazine.json';
            $http.get(url).success(function(data, status) {
                deferred.resolve(data);
            }).error(function(data, status) {
                deferred.reject(data);
            });
            return deferred.promise;
        };
    });