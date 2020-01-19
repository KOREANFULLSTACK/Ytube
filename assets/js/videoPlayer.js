const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const screenBtn = document.getElementById("jsScreen");

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    i = playBtn.querySelector("i");
    i.className = "fas fa-pause";
  } else {
    videoPlayer.pause();
    i = playBtn.querySelector("i");
    i.className = "fas fa-play";
  }
}
function handleVolumeClick() {
  const i = volumeBtn.querySelector("i");

  if (videoPlayer.volume === 0) {
    videoPlayer.volume = 0.5;
    i.className = "fas fa-volume-up";
  } else {
    videoPlayer.volume = 0;
    i.className = "fas fa-volume-mute";
  }
}

function handleScreen() {
  const i = screenBtn.querySelector("i");
  videoPlayer.requestFullscreen();
  /* 
  if (fullScreen) {
    i.className = "fas fa-compress-alt";
    fullScreen = 1;
  } else {
    i.className = "fas fa-expand";
    fullScreen = 0;
  } */
}

function init() {
  videoPlayer.onloadedmetadata = function() {
    const span = document.querySelector("#jsDuration");
    if (videoPlayer) {
      span.innerText = videoPlayer.duration;
    } else {
      span.innerText = "No Video";
    }
  };

  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  screenBtn.addEventListener("click", handleScreen);
}

if (videoContainer) {
  init();
}
