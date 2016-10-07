//Opinionated style guide recommends wrapping in a function to avoid pollution of global namespace
(function () { 

    function config ($stateProvider,$locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true;
                requireBase: false;
        });
    
    $stateProvider
        .state('landing', {
            url: '/',
            templateURL: '/templates/landing.html'
    })
        .state('album', {
            url: '/album/',
            templateURL: '/templates/album.html'
    });
    
    }
//'blocJams' is the name of the module, [] is for dependancy injection.
    angular
        .module('blocJams', ['ui.router']);
        .config(config);
})();