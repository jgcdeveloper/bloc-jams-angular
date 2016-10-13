(function() {
    function SongPlayer($rootScope, Fixtures) {
               
        /**
        * @desc SongPlayer constructor. Return for access to environment
        * @type {Object}
        */
        var SongPlayer = {};
            
        
        /**
        * @desc gets the current album stored in fixtures and stores it to a local variable
        * @type {Object}
        */
        var _currentAlbum = Fixtures.getAlbum();
        
            
        /**
        * @desc Buzz object audio file for use with the buzzMusic API
        * @type {Object}
        */
        var _currentBuzzObject = null;
        
        /*
        * @function _setSong (private)
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var _setSong = function(song){
            
            if (_currentBuzzObject) {
                _currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
 
            _currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
 
            _currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = _currentBuzzObject.getTime();
                });
            });
            
            
            SongPlayer.currentSong = song;
        };
               
        /*
        * @function _playSong (private)
        * @desc Starts song playing and updates song key of playing to value of true
        * @param {Object} song
        */
        var _playSong = function(song){
            _currentBuzzObject.play(song);
            song.playing = true;
        };
        
        /*
        * @function _stopSong (private)
        * @desc Stops song and sets song.playing to null
        * @param {Object} song
        */
        var _stopSong = function(song){
            _currentBuzzObject.stop();
            song.playing = null;
        };
        
        
        /*
        * @function _getSongIndex (private)
        * @desc Starts song playing and updates song key of playing to value of true
        * @param {Object} song
        * @return The index of the current song that is playing
        */
        var _getSongIndex = function(song){
            return _currentAlbum.songs.indexOf(song);
        };
        
        
        /**
        * @desc currentSong is stored here in public object SongPlayer. Initialized as null.
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        
        /**
        * @desc currentArtist is stored here in public object SongPlayer.
        * @type "string"
        */
        SongPlayer.currentArtist = _currentAlbum.artist;
        
        
        /*
        * @method .play (public)
        * @desc Starts our _currentBuzzObject to play. 
        * @param {Object} song
        */        
        SongPlayer.play = function(song){
            
            song = song || SongPlayer.currentSong;
            
            if (SongPlayer.currentSong !== song) {    
                _setSong(song);
                _playSong(song);
                            
            } else if(SongPlayer.currentSong === song) {
            
                if (_currentBuzzObject.isPaused()) {
                    _playSong(song);
                   
                }
            }          
        };
    
        /*
        * @method .pause (public)
        * @desc Pauses our _currentBuzzObject which is playing
        * @param {Object} song
        */  
        SongPlayer.pause = function (song){
            
            song = song || SongPlayer.currentSong;
            _currentBuzzObject.pause();
            song.playing = null;
        }
        
        /*
        * @method .previous (public)
        * @desc Decrements our song index by 1. Sets the new song to play. Checks for end.
        * @param {Object} song
        */  
        SongPlayer.previous = function() {
            var currentSongIndex = _getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
        
            if(currentSongIndex < 0) {
                var song = _currentAlbum.songs[currentSongIndex+1];
                _stopSong(song);
                
            } else {
                var song = _currentAlbum.songs[currentSongIndex];
                _setSong(song);
                _playSong(song);
            }
        
        };

                /*
        * @method .previous (public)
        * @desc Increments our song index by 1. Sets the new song to play. Checks for end.
        * @param {Object} song
        */  
        SongPlayer.next = function() {
            var currentSongIndex = _getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
        
            if(currentSongIndex >= _currentAlbum.songs.length) {
                var song = _currentAlbum.songs[currentSongIndex-1];
                _stopSong(song);
            } else {
                var song = _currentAlbum.songs[currentSongIndex];
                _setSong(song);
                _playSong(song);
            }
        
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (_currentBuzzObject) {
                _currentBuzzObject.setTime(time);
            }
        };
        
        
    return SongPlayer;
    
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();