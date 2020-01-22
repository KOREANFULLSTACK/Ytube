const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const screenBtn = document.getElementById("jsScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let time = 0;
function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    i = playBtn.querySelector("i");
    i.className = "fas fa-pause";
  } else {
    videoPlayer.pause();
    i = playBtn.querySelector("i");
    i.className = "fas fa-play";
    clearInterval(currentVideo);
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

function currentVideo() {
  if (time < videoPlayer.duration) {
    currentTime.innerHTML = time;
    time++;
  } else {
    time = videoPlayer.duration;
  }
}

function waitVideo() {
  totalTime.innerHTML = videoPlayer.duration;
  setInterval(currentVideo, 1000);
}
function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  screenBtn.addEventListener("click", handleScreen);
  videoPlayer.addEventListener("loadedmetadata", waitVideo);
}

if (videoContainer) {
  init();
}
