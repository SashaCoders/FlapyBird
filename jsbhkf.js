let bestSkore = localStorage.getItem('best_skore');

let score = 0;
let best_score = bestSkore;


let score_text = document.getElementById("score");
let best_score_text = document.getElementById("best_score");

let bird = new Image();
bird.src = "img/bird.png";

let back = new Image();
back.src = "img/back.png";
// let back2 = new Image();
// back2.src = "img/back2.png";

let pipeBottom = new Image();
pipeBottom.src = "img/pipeBottom.png";

let pipeUp = new Image();
pipeUp.src = "img/pipeUp.png";

let road = new Image();
road.src = "img/road.png";

// let road2 = new Image();
// road2.src = "img/road2.png";

let fly_audio = new Audio();
fly_audio.src = "audio/fly.mp3";

let yyxy_audio = new Audio();
yyxy_audio.src = "audio/yyxy.mp3";

let score_audio = new Audio();
score_audio.src = "audio/score.mp3";

let xPos = 10;
let yPos = 150;

let velY = 0;
let gravity = 0.2;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d")

canvas.width = 288;
canvas.height = 512;

let pipe = [];
pipe[0] = {
       x: canvas.width,
       y: 0
}
let gap = 170;

let pause = false;






function draw() {
       if (!pause) {
              context.drawImage(back, 0, 0);
              // context.drawImage(back2, 0, 0);
              context.drawImage(bird, xPos, yPos);

              if (yPos >= canvas.height - road.height) {
              // if (yPos >= canvas.height - road2.height) {
                     reload();
              }




              velY = velY + gravity;
              yPos += velY;


              document.onkeypress = function (e) {
                     console.log(e.keyCode);
                     console.log(e);
                     if (e.keyCode == 119 || e.keyCode == 1094) {
                            velY = -4;
                            fly_audio.play();
                     }

                     if (e.keyCode == 32) {
                            // velY = 4;
                              velY = velY + 2;
                            fly_audio.play();
                     }
                     if (e.keyCode == 100 || e.keyCode == 1074) {
                            pause = !pause;
                     }


              }

              canvas.addEventListener("mousedown", function moveup() {
                     velY = -4;
                     fly_audio.play();
              })



              for (let i = 0; i < pipe.length; i++) {

                     if (pipe[i].x < -pipeUp.width) {
                            pipe.shift();
                     } else {

                            context.drawImage(pipeUp, pipe[i].x, pipe[i].y);
                            context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
                            pipe[i].x -= 2;

                            if (pipe[i].x == 80) {
                                   pipe.push({
                                          x: canvas.width,
                                          y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                                   });
                            }
                     }

                     if (xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap)) {
                            reload();
                     }




                     if (pipe[i].x == 0) {
                            score_audio.play();
                            score += 1;
                            pipe.passed = true;

                            if (score == 10) {
                                   gap = gap - 10;
                                   yyxy_audio.play();
                            }
                            if (score == 20) {
                                   gap = gap - 10;
                                   yyxy_audio.play();
                            }
                            if (score == 30) {
                                   gap = gap - 10;
                                   yyxy_audio.play();
                            }
                            if (score == 40) {
                                   gap = gap - 10;
                                   yyxy_audio.play();
                            }
                            if (score == 50) {
                                   gap = gap - 10;
                                   yyxy_audio.play();
                            }
                            if (score == 60) {
                                   gap = gap - 10;
                                   yyxy_audio.play();
                            }
                            if (score == 70) {
                                   gap = gap - 10;
                                   yyxy_audio.play();
                            }
                            if (score == 80) {
                                   gap = gap - 5;
                                   yyxy_audio.play();
                            }
                            if (score == 90) {
                                   gap = gap - 5;
                                   yyxy_audio.play();
                            }

                            if (score == 101) { alert(score + " балів  кінець "); }

                     }

              }

              context.drawImage(road, 0, canvas.height - road.height + 20);
              // context.drawImage(road2, 0, canvas.height - road2.height + 20);
              score_text.innerHTML = "SCORE: " + score + " ⭐";
              best_score_text.innerHTML = "Best SCORE: " + best_score + " ⭐";
       }
}

setInterval(draw, 20);


function reload() {
       xPos = 10;
       yPos = 150;
       velY = 0;
       pipe = [];
       pipe[0] = {
              x: canvas.width,
              y: 0
       }
       if (score > best_score) {
              best_score = score;
                  localStorage.setItem('best_skore', best_score);
       } score = 0;
}
