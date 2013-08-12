angular.module('Alice.controllers', [])
    .controller('Magazine', function($scope, $http, $routeParams, $location, $route, MagazineData) {

        // Размеры страниц
        $scope.PAGE_HEIGHT = 1200;
        $scope.PAGE_WIDTH = 1813;

        // Размеры окна просмотра
        $scope.VIEW_WIDTH = 960;
        $scope.VIEW_HEIGHT = 635;

        // Выражения для проверки параметров из роутера - должны быть целые положительные числа
        var paramRegexp = /^[\d]+$/;
        // Модель страниц
        $scope.pages = [];
        // Текущая страница
        $scope.current = 0;
        // Имя текущей строницы
        $scope.current.name = '';
        // Имя запрошенной страницы
        $scope.requestedPage = 0;
        // Состояние полноэкранного режима
        $scope.fullscreenStatus = false;
        // Поддержка полноэкранного режима
        $scope.fullscreenSupport = false;
        // Увеличение в полноэкранном режиме
        $scope.fsRatio = 1;


        function initialRendering(magazineData){
            $scope.pages = magazineData.pages;
            // Если запрошена страница с номером больше общего числа - показать последнюю
            if ($scope.requestedPage > $scope.pages.length - 1) {
                $scope.current = $scope.pages.length - 1;
            }
            else {
                $scope.current = $scope.requestedPage;
            }
            // Подгрузить изображения
            $scope.updateImages();
        }

        // Загрузить текущее, предыдущее и следующее изображения
        // Если они уже установлены - ничего не происходит
        $scope.updateImages = function(){
            var cur = $scope.current;
            var pages = $scope.pages;

            if (typeof pages[cur] !== 'undefined') {
                pages[cur].src = pages[cur].img;
                $scope.currentName = $scope.pages[$scope.current].name;
            }
            if (typeof pages[cur-1] !== 'undefined') {
                pages[cur-1].src = pages[cur-1].img;
            }
            if (typeof pages[cur+1] !== 'undefined') {
                pages[cur+1].src = pages[cur+1].img;
            }
        };

        // Определение и валидация запрошенной страницы по параметрам
        if (paramRegexp.test($routeParams.page)){
            $scope.requestedPage = parseInt($routeParams.page, 10);
        }
        else {
            $scope.requestedPage = 0;
        }

        //Первоначальная отрисовка        
        if (typeof(MAGAZINE_DATA) !=='undefined'){
            initialRendering(MAGAZINE_DATA);
        }
        else{
            // Загрузка данных о страницах
            var promise = MagazineData.get();
            promise.then(
                initialRendering,
                function(reason){alert('Failed: ' + reason);}
            );
        }





        // Определить положение страницы относительно текущей - устанавливает классы для анимаций в шаблоне
        $scope.pageStatus = function(index) {
            if (index === $scope.current){
                return 'curr';
            }
            else if (index < $scope.current){
                return 'prev';
            }
            else if (index > $scope.current){
                return 'next';
            }
        };


        // Перейти на предыдущую страницу
        $scope.prev = function(){
            if ($scope.current > 0){
                $scope.current--;
                $location.search('page', $scope.current);
                $scope.updateImages();
            }
        };


        // Перейти на следующую страницу
        $scope.next = function(){
            if ($scope.current < $scope.pages.length-1){
                $scope.current++;
                $location.search('page', $scope.current);
                $scope.updateImages();
            }
        };


        // Перейти в полноэкранный режим - запрос к директиве al-fullscreen
        $scope.goFullscreen = function(){
            $scope.$broadcast('goFullscreen');
        };


        // Выйти из полноэкранного режима - запрос к директиве al-fullscreen
        $scope.exitFullscreen = function(){
            $scope.$broadcast('exitFullscreen');
        };


        // Перейти к содержанию
        $scope.gotoContents = function(){
            $location.path('/contents');
        };


        // Перейти к превью
        $scope.gotoThumbs = function(){
            $location.path('/thumbs');
        };


        // Установка класса CSS для полноэкранного режима
        $scope.$watch('fullscreenStatus', function(){
            if ($scope.fullscreenStatus) {
                $scope.fullscreenClass = 'fullscreen';
            }
            else {
                $scope.fullscreenClass = '';
            }
        });


        $scope.spotSize = function(spot){
            return {
                'left': spot.x * $scope.fsRatio + 'px',
                'top': spot.y * $scope.fsRatio + 'px',
                'width': spot.width * $scope.fsRatio + 'px',
                'height': spot.height * $scope.fsRatio + 'px'
            };
        };

    })

    .controller('Thumbs', function($scope, $location, $http, MagazineData) {
        $location.search('page', null);
        $scope.THUMB_WIDTH = 295;

        if (typeof(MAGAZINE_DATA) !=='undefined'){
            $scope.pages = MAGAZINE_DATA.pages;
            $scope.sprite = MAGAZINE_DATA.sprite;
        }
        else{
            var promise = MagazineData.get();
            promise.then(
                function(data){
                    $scope.pages = data.pages;
                    $scope.sprite = data.sprite;
                },
                function(reason){alert('Failed: ' + reason);}
            );
        }

        $scope.bg = function(index){
            return {'left': '-' + index * $scope.THUMB_WIDTH + 'px'};
        };

        $scope.gotoContents = function(){
            $location.path('/contents');
        };
    });