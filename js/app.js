var lazyloadapp = angular.module('lazyloadapp', ['ui.router']);

(function(app){

    /**
     * Application confgurations
     */
    app.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', function($stateProvider, $urlRouterProvider, $controllerProvider){

        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: 'pages/home.html'
            })
            .state('profile', {
                url: "/profile",
                templateUrl: 'pages/profile.html'
            });

        /*
         * Beside of controller registration you can also register other services and direcives
         *
         * module.config(
         *    function (
         *        $controllerProvider,
         *        $compileProvider,
         *        $filterProvider,
         *        $provide
         *    ) {
         *        module.controller = $controllerProvider.register;
         *        module.directive = $compileProvider.directive;
         *        module.filter = $filterProvider.register;
         *        module.factory = $provide.factory;
         *        module.service = $provide.service;
         *    });
         *
         * @link http://slides.com/gruizdevilla/late-registering-and-lazy-load-in-angularjs-en#/8
         */
        app.lazyRegisterController = $controllerProvider.register;

        $urlRouterProvider.otherwise("/");

    }]);

    /**
     * LoadJS factory
     */
    var loadJSFactory = function($q) {

        var loadJSFactory= {};

        /**
         * Load JS
         * @param url
         * @returns {*}
         */
        loadJSFactory.load = function( url ) {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            var deferred = $q.defer();
            script.type = 'text/javascript';
            script.src = url;

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            //script.onreadystatechange = callback;
            script.onload = function(){
                deferred.resolve();
            };

            // Fire the loading
            head.appendChild(script);

            return deferred.promise;
        };

        return loadJSFactory;
    };

    app.factory('loadJSFactory', ['$q', loadJSFactory]);

})(lazyloadapp);

