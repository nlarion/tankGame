const STATE_INIT = 10,
  STATE_LOADING = 20,
  STATE_RESET = 30,
  STATE_PLAYING = 40,
  STATE_GAMEOVER = 50,
  STATE_WIN = 60,
  STATE_LOADING_LEVEL = 70;
  STATE_CREDITS_SCREEN = 80;

var Game = function(){
  this.firstRun = true;
  this.pointImage = new Image();
  this.appState = STATE_LOADING;
  this.isTheMouseBeingPressed = false;
  this.introCount = 0;
  this.$canvas = $('canvas');
  this.c = this.$canvas[0].getContext('2d');
  this.level = 1;
  this.currentLevel = new Level(1);
  this.currentPlayer = new Player();
  this.currentCharlee = new Charlee();

}

Game.prototype.gameManager = function(){
  switch (this.appState) {
  case STATE_INIT:
    this.initApp(); // intro screen
    break;
  case STATE_LOADING:
    //load assets
    this.audio = new SeamlessLoop();
    this.audio.addUri('sounds/breakoutLoop1.mp3',5350,"loop1");
    this.audio.addUri('sounds/breakoutLoop2.mp3',18700,"loop2");
    this.audio.addUri('sounds/breakoutLoop3.mp3',2720,"loop3");
    this.audio.addUri('sounds/breakoutLoop4.mp3',2700,"loop4");
    this.audio.addUri('sounds/breakoutLoop5.mp3',7990,"loop5");
    this.sounds = {gameOver: new Audio('sounds/breakoutGameOver.mp3'), normalHit: new Audio('sounds/SG280_BD_11.mp3'), lightHit: new Audio('sounds/SG280_Bongo_08.mp3'), powerUp: new Audio('sounds/SG280_Cym_01.mp3'), steady: new Audio('sounds/SG280_Tom_02.mp3'), mediumHit: new Audio('sounds/SG280_SD_02.mp3')};
    // this.audio = new Audio('sounds/breakoutLoop1.mp3');
    //tileSheet was here
    this.tileSheet = new Image();
    this.tileSheet.src = "images/charlee.png"; // load all assets now so
    var t = this;
    this.$canvas.mousemove(function(e){
      t.currentPlayer.x = e.offsetX-((t.currentLevel.bricks[0].w)/2);
      //console.log("x: "+e.offsetX+"y: "+e.offsetY);
    });
    console.log(this);
    this.$canvas.click(function() {
      t.isTheMouseBeingPressed = true;
    });
    $(window).keypress(function(e){
      t.getKeyPress = e;
      t.getOtherKeyPress = e;
    });
    this.appState = STATE_INIT;
    break;
  case STATE_RESET:
    resetApp(); //doesn't exist yet
    break;
  case STATE_GAMEOVER:
    this.gameOverScreen();
    break;
  // case STATE_CREDITS_SCREEN:
  //   this.creditsScreen();
  //   break;
  case STATE_PLAYING:
    this.gameLoop();
    break;
  case STATE_WIN:
    this.winnerScreen();
    break;
  case STATE_LOADING_LEVEL:
    this.loadingLevelScreen();
    break;

  }
};

Game.prototype.renderCharlee = function(){
  if(this.getOtherKeyPress){
    console.log(this.getOtherKeyPress);
    //console.log(this.currentCharlee);
    switch (this.getOtherKeyPress.keyCode) {

			case undefined:
      	//console.log(this.getOtherKeyPress);
 				 this.currentCharlee.frameIndex=0;
				 break;
			case 100:
  			//this.currentCharlee.sourceX=50;
				this.currentCharlee.sourceY=0;
				this.currentCharlee.x=this.currentCharlee.x+this.currentCharlee.dx;
				if (this.currentCharlee.frameIndex>=this.currentCharlee.animationFrames.length-1){
					this.currentCharlee.frameIndex=6;
				} else {
					this.currentCharlee.frameIndex++;
				}
 				break;
			case 'rightstop':
 				this.currentCharlee.frameIndex=3;
				GetKeyCodeVar=0;
 				break;
 			case 97:
 				//this.currentCharlee.sourceX=50;
				this.currentCharlee.sourceY=50;
				this.currentCharlee.x=this.currentCharlee.x-this.currentCharlee.dx; //horizonal
				if (this.currentCharlee.frameIndex>=this.currentCharlee.animationFrames.length-1){
					this.currentCharlee.frameIndex=7;
				} else {
					this.currentCharlee.frameIndex++;
				}
 			break;
 			case 'leftstop':
 				this.currentCharlee.frameIndex=3;
				GetKeyCodeVar=0;
 			break;
 			case 115:
 				//this.currentCharlee.sourceX=50;
				this.currentCharlee.sourceY=100;
				this.currentCharlee.y=this.currentCharlee.y+this.currentCharlee.dy; //vertical
				if (this.currentCharlee.frameIndex>=this.currentCharlee.animationFrames.length-3){
					this.currentCharlee.frameIndex=2;
				} else {
					this.currentCharlee.frameIndex++;
				}
 				break;
 			case 'downstop':
 				this.currentCharlee.frameIndex=3;
				GetKeyCodeVar=0;
 			break;
 			case 119:
 				//this.currentCharlee.sourceX=50;
				this.currentCharlee.sourceY=100;
				this.currentCharlee.y=this.currentCharlee.y-this.currentCharlee.dy; //vertical
				if (this.currentCharlee.frameIndex>=this.currentCharlee.animationFrames.length-3){
					this.currentCharlee.frameIndex=2;
				} else {
					this.currentCharlee.frameIndex++;
				}
 			break;
  			case 'upstop':
 				this.currentCharlee.frameIndex=3;
				GetKeyCodeVar=0;
 			break;

		}
    this.getOtherKeyPress = undefined;
  }
  this.currentCharlee.sourceX=Math.floor(this.currentCharlee.animationFrames[this.currentCharlee.frameIndex] % 12) *50;
  this.c.drawImage(this.tileSheet, this.currentCharlee.sourceX,this.currentCharlee.sourceY,50,50,this.currentCharlee.x,this.currentCharlee.y,100,100);
  //this.c.fillRect(this.currentCharlee.y,this.currentCharlee.x,100,100);

}


Game.prototype.loadingLevelScreen = function(){
  if (this.firstRun) {
    this.audio.start("loop2");
    this.firstRun = false;
  }
  this.c.fillStyle = '#000111';
  this.c.fillRect(0, 0, canvas.width, canvas.height);
  //Box
  this.c.strokeStyle = '#000000';
  this.c.font = " "+ canvas.width / 10 + "px serif";
  this.c.fillStyle = "#fff";
  this.c.fillText ("Well Done!",canvas.width / 4, canvas.height / 2);
  this.c.font = " "+ canvas.width / 30 + "px serif";
  this.c.fillText("Click to Advance to Next Level",canvas.width / 3.6, canvas.height / 1.5);
  if (this.isTheMouseBeingPressed == true) {
    this.firstRun = true;
    this.audio.stop();
    this.isTheMouseBeingPressed = false;
    levelConstructs.splice(0,1);
    this.currentLevel = new Level(1);
    this.appState = STATE_PLAYING;
  }
}

Game.prototype.changeStateAndRestartGame = function(){
  this.firstRun = true;
  this.isTheMouseBeingPressed = false;
  levelConstructs = new LevelConstruct();
  this.level = 1;
  this.currentLevel = new Level(1);
  this.currentPlayer = new Player();
  this.audio.stop();
  this.appState = STATE_INIT;
}

Game.prototype.gameLoop = function(){
  if (this.firstRun) {
    this.audio.start("loop1");
    this.firstRun = false;
  }
  if(this.getKeyPress){
    if(this.getKeyPress.which === 108){
      this.currentPlayer.lives++;
    }else if(this.getKeyPress.which === 110){
      this.handleLevelAdvance();
    }
    this.getKeyPress = undefined;
  }
  this.clearCanvasAndDisplayDetails();
  if(this.currentLevel.bricks[1].y === this.currentLevel.bricks[1].finalY) {
    this.collide();
    this.updatePosition();
    this.testWalls();
  }
  this.drawBricks();
  this.drawRenderBalls();
  this.renderCharlee();

};

  // this.currentCharlee.sourceX=Math.floor(this.currentCharlee.animationFrames[this.currentCharlee.frameIndex] % 12) *50;
Game.prototype.clearCanvasAndDisplayDetails = function(){
  this.c.fillStyle = "gray";
  this.c.fillRect(0,0,canvas.width,canvas.height);
  this.c.font = "12px serif";
  this.c.fillStyle = "white";
  this.c.fillText ("Level: "+this.level, 20, 20);
  this.c.fillText ("Score: " + this.currentPlayer.score, canvas.width-65, 20);
  this.c.fillText ("Lives: ", 20, canvas.height - 20);
  this.c.fillText ("sourceX: "+this.currentCharlee.sourceX+" FrameIndex: "+ this.currentCharlee.frameIndex, canvas.width-170,canvas.height -20);
  this.c.fillText ("MathFloor: "+Math.floor(this.currentCharlee.animationFrames[this.currentCharlee.frameIndex] % 12)+" animation frame: "+ this.currentCharlee.animationFrames[this.currentCharlee.frameIndex], canvas.width-170,canvas.height -50);
  for (var i = 0; i < this.currentPlayer.lives-1; i++) {
    this.c.fillStyle = "blue";
    this.c.beginPath();
    this.c.arc((i*20)+60,canvas.height-25,this.currentLevel.balls[0].w/2,0,Math.PI*2,true);
    this.c.closePath();
    this.c.fill();
    // this.c.fillRect((i*20)+60,canvas.height -30,10,10);
  }
}

Game.prototype.initApp = function(){
  if (this.firstRun) {
    this.audio.start("loop5");
    this.firstRun = false;
  }
  fadeIn = this.introCount + 30;
  colorModifier = fadeIn.toString(16);
  this.c.fillStyle = '#0001' + colorModifier;
  this.c.fillRect(0, 0, canvas.width, canvas.height);
  //Box
  this.c.strokeStyle = '#000000';
  this.c.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);
  this.c.font = " "+ canvas.width / 10 + "px serif";
  this.c.fillStyle = "#" + this.introCount + "";
  this.c.fillText ("Breakout",canvas.width / 3, canvas.height / 2);
  if(this.introCount<150){
    this.introCount++;
  }else{
    this.c.strokeStyle = '#000000';
    this.c.font = " "+ canvas.width / 30 + "px serif";
    this.c.fillStyle = "white";
    this.c.fillText("Click to Start a New Game",canvas.width / 3, canvas.height / 1.5);
  }
  if (this.isTheMouseBeingPressed == true) {
    this.isTheMouseBeingPressed = false;
    this.firstRun = true;
    this.audio.stop();
    this.appState = STATE_PLAYING;
  }
}

Game.prototype.drawBricks = function(){
  this.c.fillStyle ="red";
  for (var i = 0; i < this.currentLevel.bricks.length; i++) {
    this.currentLevel.bricks[i].player ? false : this.currentLevel.bricks[i].y +=(200-this.currentLevel.bricks[i].y)*.1; //simple easing.
    if(this.currentLevel.bricks[i].player){
      this.currentLevel.bricks[i].velx = (this.currentPlayer.x-this.currentLevel.bricks[i].x)*.4;
      if(this.currentLevel.bricks[i].paddleTime > 0) {
        this.currentLevel.bricks[i].w += (this.currentLevel.bricks[i].finalw - this.currentLevel.bricks[i].w)*.1;
        this.currentLevel.bricks[i].paddleTime--;
      } else {
        this.currentLevel.bricks[i].w -= (this.currentLevel.bricks[i].w - 65)*.1;
      }
      if(this.currentLevel.bricks[i].machineGunTime > 0) {
        if(this.currentLevel.bricks[i].machineGunTime%16 === 0) {
          var newProjectile1 = new Projectile(this.currentLevel.bricks[i].x,(this.currentLevel.bricks[i].y-this.currentLevel.bricks[i].h));
          this.currentLevel.projectiles.push(newProjectile1);
          this.currentLevel.bricks[i].playerFlashTimer = 2;
        } else if(this.currentLevel.bricks[i].machineGunTime%8 === 0) {
          var newProjectile2 = new Projectile((this.currentLevel.bricks[i].x+this.currentLevel.bricks[i].w),(this.currentLevel.bricks[i].y-this.currentLevel.bricks[i].h));
          this.currentLevel.projectiles.push(newProjectile2);
          this.currentLevel.bricks[i].playerFlashTimer = 2;
        }
        this.currentLevel.bricks[i].machineGunTime--;
      }
    } else {
      this.currentLevel.bricks[i].y = easeOutBack(this.currentLevel.bricks[i].timer,0,this.currentLevel.bricks[i].finalY,50);
    }
    this.currentLevel.bricks[i].y += this.currentLevel.bricks[i].vely;
    this.currentLevel.bricks[i].x += this.currentLevel.bricks[i].velx;
    if(i===0) {
      if(this.currentLevel.bricks[1].y === this.currentLevel.bricks[1].finalY) {
        if(this.currentLevel.bricks[i].playerFlashTimer > 0) {
          this.playerFlash(i);
        } else {
          this.c.strokeStyle = this.currentLevel.bricks[i].color;
          this.c.lineWidth = 2;
          this.c.fillRect(this.currentLevel.bricks[i].x,this.currentLevel.bricks[i].y,this.currentLevel.bricks[i].w,this.currentLevel.bricks[i].h);
        }
      }
    } else {
      this.c.strokeStyle = this.currentLevel.bricks[i].color;
      this.c.lineWidth = 2;
      this.c.fillRect(this.currentLevel.bricks[i].x,this.currentLevel.bricks[i].y,this.currentLevel.bricks[i].w,this.currentLevel.bricks[i].h);
    }
    if(this.currentLevel.bricks[i].type==="Durable" && this.currentLevel.bricks[i].life>1){
      this.c.strokeStyle = "rgba(0,0,0,.5)";
      this.c.lineWidth = 2;
      this.c.fillRect(this.currentLevel.bricks[i].x,this.currentLevel.bricks[i].y,this.currentLevel.bricks[i].w,this.currentLevel.bricks[i].h);
    }
    this.currentLevel.bricks[i].timer<50 ? this.currentLevel.bricks[i].timer++: false;
  }

};

Game.prototype.collide = function(){
  for (var i = 0; i < this.currentLevel.balls.length; i++) {
    for (var j = 0; j < this.currentLevel.bricks.length; j++) {
      if ( this.checkCollision(this.currentLevel.balls[i],this.currentLevel.bricks[j]) ) { //left and right of ball
        if ( (this.currentLevel.balls[i].y + this.currentLevel.balls[i].h > this.currentLevel.bricks[j].y) &&
          (this.currentLevel.balls[i].y < this.currentLevel.bricks[j].y + this.currentLevel.bricks[j].h) &&
          ((this.currentLevel.balls[i].x + this.currentLevel.balls[i].w > this.currentLevel.bricks[j].x) &&
          (this.currentLevel.balls[i].x > this.currentLevel.bricks[j].x ) || (this.currentLevel.balls[i].x + this.currentLevel.balls[i].w < this.currentLevel.bricks[j].x) &&
          (this.currentLevel.balls[i].x < this.currentLevel.bricks[j].x)) ) {
          this.currentLevel.balls[i].velx *= -(1 + .05);
          this.currentLevel.balls[i].vely += .05;//+0.5 increases the ball speed every time it hits something.
          //try and make the ball do something here.
        } else {
          console.log("test");
          if(j===0) { // player brick
            this.currentLevel.balls[i].velx += this.currentLevel.bricks[j].velx*0.3;
          }
          this.currentLevel.balls[i].vely *= -(1 + .05);
          this.currentLevel.balls[i].velx += .05;//+0.5 increases the ball speed every time it hits something.
        }
        //this.doCollide(i,j);
      }
    }
  }
  for(var k = 0; k < this.currentLevel.powerUp.length; k++){
    if(this.checkCollision(this.currentLevel.powerUp[k],this.currentLevel.bricks[0])){
      this.runPowerUpCollisions(k);
    }
  }
  for(var l = 0; l < this.currentLevel.projectiles.length; l++) {
    for(var m = 0; m < this.currentLevel.bricks.length; m++) {
      if(this.checkCollision(this.currentLevel.projectiles[l],this.currentLevel.bricks[m]) && this.currentLevel.bricks[m].type !== 'Steady') {
        this.currentLevel.bricks[m].life -= 0.2;
        if(this.currentLevel.bricks[m].life <= 0) {
          this.currentLevel.bricks.splice(m,1);
          if(this.currentLevel.bricks.length === this.currentLevel.winCriteria && this.currentPlayer.lives>0){
            this.handleLevelAdvance();
          }
        }
        this.currentLevel.projectiles.splice(l,1);
        break;
      }
    }
  }
};

Game.prototype.checkCollision = function(thing1,thing2) {
  if((((thing1.y+thing1.vely) + thing1.h) > (thing2.y)) && ((thing1.y+thing1.vely) < (thing2.y + thing2.h)) && (((thing1.x+thing1.velx) + thing1.w) > thing2.x) && ((thing1.x+thing1.velx) < (thing2.x + thing2.w))){
    return true;
  } else {
    return false;
  }
}

Game.prototype.testWalls = function(){
  for (var i = 0, max = this.currentLevel.balls.length; i < max; i = i + 1) {
    if(this.currentLevel.balls[i].y+this.currentLevel.balls[i].h>canvas.height){
      // this.currentLevel.balls[i].vely *= -1;
      this.isTheMouseBeingPressed = false;
      this.currentLevel.balls.splice(i,1);
      if(this.currentLevel.balls.length === 0 && this.currentPlayer.lives > 1){
        this.currentPlayer.lives--;
        this.currentLevel.makeBall(this.currentLevel.bricks[0].x+32,538);
      } else if (this.currentLevel.balls.length > 0) {
        console.log('it works');
      }else {
        this.firstRun = true;
        this.audio.stop();
        this.appState = STATE_GAMEOVER;
      }
      break;
    }
  }
  if(this.currentPlayer.x+(this.currentLevel.bricks[0].w)>=canvas.width) {
    this.currentPlayer.x = canvas.width-(this.currentLevel.bricks[0].w);
  } else if(this.currentPlayer.x<=0) {
    this.currentPlayer.x = 0;
  }
};

Game.prototype.drawRenderBalls = function(){
  if(this.currentLevel.bricks[1].y === this.currentLevel.bricks[1].finalY) {
    for (var i = 0; i < this.currentLevel.balls.length; i++) {
      if(!this.currentLevel.balls[i].launched) {
        this.currentLevel.balls[i].x = (this.currentLevel.bricks[0].x+((this.currentLevel.bricks[0].w/2)-(this.currentLevel.balls[i].w)/2));
        this.c.fillStyle = "blue";
        this.c.beginPath();
        this.c.arc(this.currentLevel.balls[i].x+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].y+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].w/2,0,Math.PI*2,true);
        this.c.closePath();
        this.c.fill();
      } else {
        this.currentLevel.balls[i].x += this.currentLevel.balls[i].velx;
        this.currentLevel.balls[i].y += this.currentLevel.balls[i].vely;
        this.c.fillStyle = "blue";
        this.c.beginPath();
        this.c.arc(this.currentLevel.balls[i].x+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].y+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].w/2,0,Math.PI*2,true);
        this.c.closePath();
        this.c.fill();
        //console.log(this.currentLevel.balls[i].flashTimer);
        if(this.currentLevel.balls[i].flashTimer > 0){
          this.ballFlash(i);
        }
      }
    }
  }
};

Game.prototype.updatePosition = function(){
  for (var i = 0; i < this.currentLevel.balls.length; i++) {
    if(this.isTheMouseBeingPressed) {
      this.currentLevel.balls[i].launched = true;
    }
    if(this.currentLevel.balls[i].launched === true) {
      if(this.currentLevel.balls[i].velx > 15){
        this.currentLevel.balls[i].velx = 15;
      } else if(this.currentLevel.balls[i].velx < -15){
        this.currentLevel.balls[i].velx = -15;
      } else if(this.currentLevel.balls[i].vely > 15){
        this.currentLevel.balls[i].vely = 15;
      } else if(this.currentLevel.balls[i].vely < -15){
        this.currentLevel.balls[i].vely = -15;
      }

    }
  }
  if(this.currentLevel.powerUp.length > 0){
    this.updatePowerUp();
    this.drawPowerUp();
  }
  if(this.currentLevel.projectiles.length > 0){
    this.updateProjectile();
    this.drawProjectiles();
  }
};

Game.prototype.runTheGame = function(){
  var t = this;
  setInterval(function(){t.gameManager();}, 30);
};

$(function(){
  var game = new Game();
  game.runTheGame();
  // game.currentLevel.levelConstruct = levels[game.currentLevel.currentLevel-1];
});
