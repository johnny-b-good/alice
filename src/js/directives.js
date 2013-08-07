angular.module('Alice.directives', [])
    .directive('alHotkeys', function($document){
        //TODO: Ловить сообщения от документа
        return function(scope, element, attrs){
            $document.bind('keydown', function(e){
                switch (e.keyCode) {
                    case 37:
                        scope.$apply(function(){
                            scope.prev();
                        });
                        break;
                    case 39:
                        scope.$apply(function(){
                            scope.next();
                        });
                        break;
                }
            });
        };
    })
    .directive('alImageLoader', function(){
        return function(scope, element, attrs){
            element.bind('load', function(){
                scope.$apply(function(){
                    scope.loaded = true;
                });
            });
        };
    })
    .directive('alFullscreen', function($document){
        return function(scope, element, attrs){

            // Определение поддержки полноэкранного режима
            if (typeof element[0].requestFullScreen !== 'undefined'){
                scope.fullscreenSupport = 'standard';
            }
            else if (typeof element[0].webkitRequestFullScreen  !== 'undefined') {
                scope.fullscreenSupport = 'webkit';
            }
            else if (typeof element[0].mozRequestFullScreen  !== 'undefined') {
                scope.fullscreenSupport = 'mozilla';
            }
            else {
                scope.fullscreenSupport = false;
            }


            // Запись состояния полноэкранного режима при переключении
            $document.bind('mozfullscreenchange webkitfullscreenchange fullscreenchange', function(){
                if (
                    (document.mozFullScreenElement !== null) && (typeof document.mozFullScreenElement !== 'undefined') ||
                        (document.webkitFullscreenElement !== null) && (typeof document.webkitFullscreenElement !== 'undefined') ||
                        (document.fullScreenElement !== null) && (typeof document.fullScreenElement !== 'undefined')
                    )
                    scope.$apply(function(){
                        // Изменить размер для полноэкранного режима
                        // Подгоняется по высоте
                        var height = screen.height;
                        var width = screen.height / scope.PAGE_HEIGHT * scope.PAGE_WIDTH;
                        scope.fullscreenDimensions = 'height: ' + height + 'px; width:' + width + 'px;';
                        scope.fullscreenStatus = true;

                    });
                else
                    scope.$apply(function(){
                        scope.fullscreenStatus = false;
                        scope.fullscreenDimensions = '';
                    });
            });


            // Активировать полноэкранный режим
            scope.$on('goFullscreen', function(event, args){
                switch (scope.fullscreenSupport) {
                    case 'standard': element[0].requestFullScreen(); break;
                    case 'webkit': element[0].webkitRequestFullScreen(); break;
                    case 'mozilla': element[0].mozRequestFullScreen();  break;
                    default: break;
                }
                scope.fullscreenStatus = true;
            });


            // Отключить полноэкранный режим
            scope.$on('exitFullscreen', function(event, args){
                switch (scope.fullscreenSupport) {
                    case 'standard': document.cancelFullScreen(); break;
                    case 'webkit': document.webkitCancelFullScreen(); break;
                    case 'mozilla': document.mozCancelFullScreen(); break;
                    default: break;
                }
                scope.fullscreenStatus = false;
            });

        };
    });