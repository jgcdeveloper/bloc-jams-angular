(function() {
    function SongPlayer(Fixtures) {
               
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
            song.playing = false;
        }
        
        /*
        * @method .previous (public)
        * @desc Decrements our song index by 1
        * @param {Object} song
        */  
        SongPlayer.previous = function() {
            var currentSongIndex = _getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
        
            if(currentSongIndex < 0) {
                _currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = _currentAlbum.songs[currentSongIndex];
                _setSong(song);
                _playSong(song);
            }
        
        };
        
        
    return SongPlayer;
    
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();