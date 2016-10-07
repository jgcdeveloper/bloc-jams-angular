//Opinionated style guide recommends wrapping in a function to avoid pollution of global namespace
(function () { 

    function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
        });
    
    $stateProvider
        .state('landing', {
            url: '/',
            templateUrl: '/templates/landing.html'
    })
        .state('collection', {
            url: '/collection/',
            templateUrl: '/templates/collection.html'
    })
        .state('album', {
            url: '/album/',
            templateUrl: '/templates/album.html'
    });
    
    }
//'blocJams' is the name of the module, [] is for dependancy injection.
    angular
        .module('blocJams', ['ui.router'])
        .config(config);
})();