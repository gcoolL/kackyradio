let songplaying = document.getElementById("songplaying")
const webhook = "https://discord.com/api/webhooks/1149371006935375882/LXJHo2uLbSuHJ7nwFolKplR7pwC-rZhK_MHasmb7ZAtPiHyLmOSFn_L9c3R3a0K_gsZ-"
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
        songplaying.innerHTML = "No songs playing. (If Javascript is enabled, please wait...)"
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

function playlistupdated() {
  fetch(webhook, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: '<@&1149373179911995505> The playlist updated! https://kackyradio.gcooll.repl.co'
  })
});

}

//onPlayerReady = player.loadPlaylist({'listType': 'playlist', 'list': 'PLnvUrpVRP3rVpgekABeSXD_jixTwGB_ts','index': Math.floor(Math.random()*(player.getPlaylist().length-1)),'startSeconds': '0','suggestedQuality': 'hd720'});

setInterval(function() {
  if (player && player.getPlaylist()) {
    if (player.getDuration() && player.getCurrentTime()) {
      let timerem = player.getDuration() - player.getCurrentTime()
      if (timerem < 1) {
        if (done == false) {
          done = true
          console.log(timerem)
          if (player.getPlaylistIndex() === player.getPlaylist().length-1) {
            console.log("previousVideo")
            player.previousVideo()
          } else {
            console.log("nextVideo")
            player.nextVideo()
          }
        }
      } else {
        done = false
      }
    }
  }
}, 1)
