//Opinionated style guide recommends wrapping in a function to avoid pollution of global namespace
(function () { 

//'blocJams' is the name of the module, [] is for dependancy injection.
angular
    .module('blocJams',[]);

})();