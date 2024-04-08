let musicFile1;
let musicFile2;
let leftWristX = 0;
let leftWristY = 0;
let rightWristX = 0;
let rightWristY = 0;

function preload() {
  musicFile1 = loadSound('music.mp3');
  musicFile2 = loadSound('music2.mp3');
}

function setup() {
  createCanvas(640, 480);
  let capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses)
}

function draw() {
  image(capture, 0, 0, windowWidth, windowHeight);
}

function modelLoaded()
{
  console.log('PoseNet Model is ready');
}

let leftWristScore = 0;

let song1Status = "";

function gotPoses() {

  leftWristScore = poses.leftWrist.score;
}

function draw() {
  fill(255, 204, 0); 
  stroke(255); 
  song1Status = song1.isPlaying();

  if (leftWristScore > 0.2) {
    ellipse(leftWristX, leftWristY, 50); 

    song2.stop();
    if (!song1Status) {
      song1.play();
      document.getElementById("song").textContent = "Song 1";
    }
  }
}
