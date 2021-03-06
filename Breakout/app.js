window.onload = function(){
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var x = canvas.width / 1.9;
  var y = canvas.height / 2;
  var dx = -2;
  var dy = -2;
  var ballRadius = 10;
  var paddleHeight = 10;
  var paddleWidth = 75;
  var paddleX = (canvas.width - paddleWidth) / 2;
  var paddleY = (canvas.height - paddleHeight)
  var rightPressed = false;
  var leftPressed = false;
  var brickRowCount = 3;
  var brickColumnCount = 5;
  var brickWidth = 75;
  var brickHeight = 20;
  var brickPadding = 10;
  var brickOffsetTop = 30;
  var brickOffsetLeft = 30;
  var bricks = [];
  var score = 0;
  var lives = 3;

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("mousemove", mouseMoveHandler, false);

  for(var a = 0; a < brickColumnCount; a++){
    bricks[a] = [];
    for(var b = 0; b < brickRowCount; b++){
        bricks[a][b] = {x : 0, y : 0, status : 1}
    }
  }


  function random(){
    return Math.floor(Math.random * 10);
  }

  function randomizer(){
    if(dx > 0){
      dx = random();
    }
    else{
      dx = - random();
    }
    if(dy > 0){
      dy = random();
    }
    else{
      dy = - random();
    }
  }

  function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "black"
    ctx.fillText("Score: " + score, 8, 20)
  }

  function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "black"
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20)
  }

  function keyDownHandler(e){
    if(e.keyCode == 39){
      rightPressed = true;
    }
    else if(e.keyCode == 37){
      leftPressed = true;
    }
  }

  function keyUpHandler(e){
    if(e.keyCode == 39){
      rightPressed = false;
    }
    else if(e.keyCode == 37){
      leftPressed = false;
    }
  }

  function mouseMoveHandler(e){
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
      paddleX = relativeX - (paddleWidth / 2)
    }
  }

  function collisionDetection(){
    for(var a = 0; a < brickColumnCount; a++){
      for(var b = 0; b < brickRowCount; b++){
        var z = bricks[a][b];
        if(z.status == 1){
          if(x + ballRadius > z.x && x - ballRadius < z.x + brickWidth && y + ballRadius  > z.y && y - ballRadius < z.y + brickHeight){
            dy = -dy;
            z.status = 0;
            score++;
            if(score == brickColumnCount * brickRowCount){
              alert("You win");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
  }

  function drawBrick(){
    for(var a = 0; a < brickColumnCount; a++){
      for(var b = 0; b < brickRowCount; b++){
        if(bricks[a][b].status == 1){
          var brickX = (a * (brickPadding + brickWidth)) + brickOffsetLeft;
          var brickY = (b * (brickPadding + brickHeight)) + brickOffsetTop;
          bricks[a][b].x = brickX;
          bricks[a][b].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = "green";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function move(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBrick()
    collisionDetection();
    drawScore();
    drawLives();

    if(x + dx > canvas.width - ballRadius || x < ballRadius){
      dx = -dx;
    }
    if(y + dy < ballRadius){
      dy = -dy;
    }
    else if(y + dy > canvas.height - ballRadius - paddleHeight){
      if(x > paddleX && x < paddleX + paddleWidth){
        dy = -dy;
      }
      else if(y + dy > canvas.height){
        lives--;
        if(!lives){
          alert("You lose");
          document.location.reload();
        }
        else{
          x = canvas.width / 2;
          y = canvas.height / 2;
          dx = 2;
          dx = 2;
          paddleX = (canvas.width-paddleWidth)/2;
        }
      }
    }

    if(rightPressed && paddleX < canvas.width - paddleWidth){
      paddleX += 5;
    }
    else if(leftPressed && paddleX > 0){
      paddleX -= 5;
    }

    randomizer();
    x += dx;
    y += dy;
  }

  window.setInterval(move, 10);
};