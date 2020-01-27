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

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  setInterval(getCurrentTime, 1000);
}

function waitVideo() {
  totalTime.innerHTML = videoPlayer.duration;
  setInterval(currentVideo, 1000);
}
function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  screenBtn.addEventListener("click", handleScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
}

if (videoContainer) {
  init();
}
