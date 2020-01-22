const recorderContainer = document.getElementById("recorderContainer");
const recordBtn = document.getElementById("recordStartButton");
const videoPreview = document.getElementById("videoPreview");

require("@babel/core").transform("code", {
  plugins: ["@babel/plugin-transform-runtime"]
});

async function startRecording() {
  //유저에게 녹화할껀지 물어보기
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    console.log(stream);
  } catch (error) {
    recordBtn.innerHTML = "Can't record";
    recordBtn.removeEventListener("click", startRecording);
  }
}

function init() {
  recordBtn.addEventListener("click", startRecording);
}

if (recorderContainer) {
  init();
}
