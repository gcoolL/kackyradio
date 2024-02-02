let songplaying = document.getElementById("songplaying")
let videotitle = ""
let reloaded = false
let firstTime = true
let done = false
var songs = 0

function viddings() {
  if (player) {
    if (videotitle !== "" & videotitle !== player.videoTitle & reloaded == false) {
      reloaded = true
      videotitle = ""
      if (player.getPlaylist()) {
        player.loadPlaylist({'listType': 'playlist', 'list': 'PLnvUrpVRP3rVpgekABeSXD_jixTwGB_ts','index': Math.floor(Math.random()*(player.getPlaylist().length)),'startSeconds': '0','suggestedQuality': 'hd720'});
        videotitle = player.videoTitle
        reloaded = false
      }
    }
    
    if (videotitle == "") {
      videotitle = player.videoTitle
      if (player.videoTitle == "") {
        document.title = "kackyradio - gcoolL (none playing)"
        songplaying.innerHTML = "No songs playing; please wait..."
      } else {
        document.title = videotitle
        songplaying.innerHTML = "Song playing: "+videotitle
        if (firstTime == true) {
          player.nextVideo()
          firstTime = false
          videotitle = ""
          songplaying.innerHTML = ""
          document.title = videotitle
        }
      }
    }
  }
}

//onPlayerReady = player.loadPlaylist({'listType': 'playlist', 'list': 'PLnvUrpVRP3rVpgekABeSXD_jixTwGB_ts','index': Math.floor(Math.random()*(player.getPlaylist().length-1)),'startSeconds': '0','suggestedQuality': 'hd720'});

setInterval(function() {
  if (player) {
    if (player.getDuration() && player.getCurrentTime()) {
      let timerem = player.getDuration() - player.getCurrentTime()
      if (timerem < 0.5) {
        if (done == false) {
          done = true
          if (player.getPlaylistIndex() === player.getPlaylist().length-1) {
            player.previousVideo()
          } else {
            player.nextVideo()
          }
        }
      } else {
        done = false
      }
    }
  }
}, 1)
