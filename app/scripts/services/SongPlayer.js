(function() {
    function SongPlayer() {
               
        /**
        * @desc SongPlayer constructor. Return for access to environment
        * @type {Object}
        */
        var SongPlayer = {},
            
        /**
        * @desc currentSong selected is stored here
        * @type {Object}
        */
        _currentSong = null,
            
        /**
        * @desc Buzz object audio file for use with the buzzMusic API
        * @type {Object}
        */
        _currentBuzzObject = null;
        
        /*
        * @function setSong (private)
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var _setSong = function(song){
            
            if (_currentBuzzObject) {
                _currentBuzzObject.stop();
                _currentSong.playing = null;
            }
 
            _currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            _currentSong = song;
        };
        
        /*
        * @function playSong (private)
        * @desc Starts song playing and updates song key of playing to value of true
        * @param {Object} song
        */
        var _playSong = function(song){
            _currentBuzzObject.play(song);
            song.playing = true;
        }
        
        /*
        * @method .play (public)
        * @desc Starts our _currentBuzzObject to play
        * @param {Object} song
        */        
        SongPlayer.play = function(song){
            
            if (_currentSong !== song) {    
                _setSong(song);
                _playSong(song);
                
                //currentBuzzObject.play();
                //song.playing = true;
            
            } else if(currentSong === song) {
            
                if (_currentBuzzObject.isPaused()) {
                    _playSong(song);
                    //currentBuzzObject.play();
                    
                }
            }              
                
        };
    
        /*
        * @method .pause (public)
        * @desc Pauses our _currentBuzzObject which is playing
        * @param {Object} song
        */  
        SongPlayer.pause = function (song){
            _currentBuzzObject.pause();
            song.playing = false;
        }
        
    return SongPlayer;
    
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();