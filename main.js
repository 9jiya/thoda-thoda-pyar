song = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload(){
    song = loadSound('t.mp3');
}
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
function setup(){
    canvas = createCanvas(600,500);
    canvas.position(400,350);
    video = createCapture(VIDEO);
    video.hide();
    x = ml5.poseNet(video,modelLoaded);
    x.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("Posenet is initialized");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Score of right Wrist x - "+rightWristX+"Score of Right wrist y - "+rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Score of left Wrist x - "+leftWristX+"Score of left wrist y - "+leftWristY);
    }
}
function draw(){
    image(video,0,0,600,500);
     fill('#acfaed');
    stroke('#010814');
    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        x = Number(leftWristY);
        y = floor(x);
        z = y/500;
        song.setVolume(z);
        document.getElementById("vol_label").innerHTML = "Volume : "+z;
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.setRate(1);
}