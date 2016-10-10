(function() {
    function LandingCtrl() {
        this.heroTitle = "Turn the Music Up!";
    }
    // for our cotroller, we have 2 variables, first is the name of the controller, second is the callback function, or an array of dependancies with the callback as the last value. Here we inject NO dependancies. 
    
    angular
        .module('blocJams')
        .controller('LandingCtrl', LandingCtrl);
})();