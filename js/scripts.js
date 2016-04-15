const STATE_INIT = 10,
  STATE_LOADING = 20,
  STATE_RESET = 30,
  STATE_PLAYING = 40,
  STATE_GAMEOVER = 50,
  STATE_WIN = 60,
  STATE_LOADING_LEVEL = 70,
  STATE_CREDITS_SCREEN = 80;

var Game = function(){
  this.firstRun = true;
  this.firstFrame = true;
  this.tempX = null;
  this.tempY = null;
  this.tempRotation = null;
  this.pointImage = new Image();
  this.appState = STATE_LOADING;
  this.isTheMouseBeingPressed = false;
  this.introMenu = {finalX: 475, startX: 1100, textFade: 0, xMod: 270, yMod: 285, playerOneSelect: false, playerTwoSelect: false, localPlayerSelect: false};
  this.$canvas = $('canvas');
  this.c = this.$canvas[0].getContext('2d');
  this.level = 1;
  this.currentLevel = new Level(1);
  this.localPlayer;
  this.remotePlayer;
  this.explosion = new Explosion();
  //this.firebase = new Firebase('https://epicodus-tank.firebaseio.com/');
  this.firebase = new Firebase('https://local-tank.firebaseio.com/');
}

Game.prototype.gameManager = function(){
  switch (this.appState) {
  case STATE_INIT:
    this.initApp(); // intro screen
    break;
  case STATE_LOADING:
    this.firebase.set({game: 'game'});
    //load assets
    this.audio = new SeamlessLoop();
    this.audio.addUri('sounds/tankIntro.mp3',33000,"loop2");
    this.audio.addUri('sounds/tankLoop.mp3',38000, "loop6");
    this.sounds = {death: new Audio('sounds/deathExplosion.mp3'), death2: new Audio('sounds/howieScream.mp3')};
    // this.audio = new Audio('sounds/breakoutLoop1.mp3');
    //playerOne was here
    this.playerOne = new Image();
    this.playerTwo = new Image();
    this.disabledTank = new Image();
    this.explosionImg = new Image();
    this.logo = new Image();
    this.heart = new Image();
    this.playerOne.src = "images/redtank.png"; // load all assets now so
    this.playerTwo.src = "images/bluetank.png"; // load all assets now so
    this.disabledTank.src = "images/disabledtank.png"; // load all assets now so

    this.logo.src = "images/logo.png";
    this.explosionImg.src = "images/explosion.png";
    this.heart.src = "images/heartSprite.png";
    var t = this;
    this.$canvas.mousemove(function(e){
      //maybe you need mouse?
      //TODO: maybe delete this
    });
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

Game.prototype.renderLocalPlayer = function(){
  //reset some things
  this.localPlayer.isFiring = false;
  if(this.getOtherKeyPress && this.localPlayer.tankLives > 0){
    switch (this.getOtherKeyPress.keyCode) {
			case undefined:
 				 this.localPlayer.frameIndex=0;
         this.explosion.frameIndex=0;
				 break;
			case 100:
  			this.localPlayer.sourceX=0;
				this.localPlayer.sourceY=96;
				this.localPlayer.rotation += this.localPlayer.rotationVel;
        // this.localPlayer.y=this.localPlayer.y-this.localPlayer.dy;
				if (this.localPlayer.frameIndex>=this.localPlayer.animationFrames.length-1){
					this.localPlayer.frameIndex=0;
				} else {
					this.localPlayer.frameIndex++;
				}
 				break;
 			case 97:
 				this.localPlayer.sourceX=0;
				this.localPlayer.sourceY=96;
        this.localPlayer.rotation -= this.localPlayer.rotationVel;
				// this.localPlayer.x=this.localPlayer.x-this.localPlayer.dx; //horizonal
				if (this.localPlayer.frameIndex>=this.localPlayer.animationFrames.length-1){
					this.localPlayer.frameIndex=0;
				} else {
					this.localPlayer.frameIndex++;
				}
 			break;
 			case 115:
 				this.localPlayer.sourceX=0;
				this.localPlayer.sourceY=96;
        var angleInRadians = this.localPlayer.rotation * Math.PI / 180;
        this.localPlayer.facingX=Math.cos(angleInRadians);
        this.localPlayer.facingY=Math.sin(angleInRadians);
        this.localPlayer.x=this.localPlayer.x-(this.localPlayer.dx*this.localPlayer.facingX);
        this.localPlayer.y=this.localPlayer.y-(this.localPlayer.dy*this.localPlayer.facingY);
				if (this.localPlayer.frameIndex>=this.localPlayer.animationFrames.length-1){
					this.localPlayer.frameIndex=0;
				} else {
					this.localPlayer.frameIndex++;
				}
 				break;
 			case 119:
        var angleInRadians = this.localPlayer.rotation * Math.PI / 180;
        this.localPlayer.facingX=Math.cos(angleInRadians);
        this.localPlayer.facingY=Math.sin(angleInRadians);
        this.localPlayer.x=this.localPlayer.x+(this.localPlayer.dx*this.localPlayer.facingX);
        this.localPlayer.y=this.localPlayer.y+(this.localPlayer.dy*this.localPlayer.facingY);
  				if (this.localPlayer.frameIndex>=this.localPlayer.animationFrames.length-1){
  					this.localPlayer.frameIndex=0;
  				} else {
  					this.localPlayer.frameIndex++;
  				}
   			break;
      case 32:
        this.localPlayer.isFiring = true;
        var angleInRadians = this.localPlayer.rotation * Math.PI / 180;
        this.localPlayer.facingX=Math.cos(angleInRadians);
        this.localPlayer.facingY=Math.sin(angleInRadians);
  			this.currentLevel.makeBall(this.localPlayer.x, this.localPlayer.y,this.localPlayer.rotation);
 			break;
			case 'fire':
				GetKeyCodeVar=0;
 			break;
		}
    this.getOtherKeyPress = undefined;
  }
  this.localPlayer.sourceX=Math.floor(this.localPlayer.animationFrames[this.localPlayer.frameIndex] % 7) *32;

  var angleInRadians = this.localPlayer.rotation * Math.PI / 180;
  //Set the origin to the center of the image
  this.c.save();
  this.c.translate(this.localPlayer.x+25, this.localPlayer.y+25);
  //Rotate the canvas around the origin
  this.c.rotate(angleInRadians);
  //draw the image
  if (this.localPlayer.tankLives <= 0) {
    if(this.localPlayer.tankLives === 0) {
      var deathSound = Math.floor(Math.random() * (10 - 1)) + 1;
      if(deathSound >= 8){
        this.sounds.death2.play()
      }
      if (deathSound <=7) {
        this.sounds.death.play();
      }
      this.localPlayer.tankLives -= 1;
    }
    this.c.drawImage(this.explosionImg, this.explosion.sourceX,this.explosion.sourceY,100,100,-25,-25,this.explosion.w,this.explosion.h);
    if(this.explosion.sourceX === 800) {
      this.explosion.sourceX = 0;
      this.explosion.sourceY += 100;
    } else if (this.explosion.sourceX === 300 && this.explosion.sourceY === 900) {
      this.explosion.sourceX = 0;
      this.explosion.sourceY = 0;
      this.explosion.finished = true;
    } else {
      this.explosion.sourceX += 100;
    }
  } else {
    this.c.drawImage(this.localPlayer.image, this.localPlayer.sourceX,this.localPlayer.sourceY,32,32,-25,-25,this.localPlayer.w,this.localPlayer.h);
  }
  //reset the canvas
  this.c.restore();
}

Game.prototype.renderRemotePlayer = function(){
  if (this.localPlayer.player === "p1"){
    var t = this;
    this.firebase.on("child_added", function(snapshot){
      var data = snapshot.val();
      t.remotePlayer.x = data.p2.x;
      t.remotePlayer.y = data.p2.y;
      t.remotePlayer.rotation = data.p2.rotation;
      t.remotePlayer.isFiring = data.p2.isFiring;
    });
  } else if (this.localPlayer.player === "p2"){
    var t = this;
    this.firebase.on("child_added", function(snapshot){
      var data = snapshot.val();
      t.remotePlayer.x = data.p1.x;
      t.remotePlayer.y = data.p1.y;
      t.remotePlayer.rotation = data.p1.rotation;
      t.remotePlayer.isFiring = data.p1.isFiring;
    });
  }

  if(this.firstFrame === true) {
    this.tempX = this.remotePlayer.x;
    this.tempY = this.remotePlayer.y;
    this.tempRotation = this.remotePlayer.rotation;

    this.firstFrame = false;
  }

  if (this.remotePlayer.y !== this.tempY || this.remotePlayer.x !== this.tempX || this.remotePlayer.rotation !== this.tempRotation) {
    if (this.remotePlayer.frameIndex>=this.remotePlayer.animationFrames.length-1){
      this.remotePlayer.frameIndex=0;
      console.log("trest",this.remotePlayer.frameIndex);
    } else {
      this.remotePlayer.frameIndex++;
      console.log("new test", this.remotePlayer.frameIndex);
    }
  }

  this.tempX = this.remotePlayer.x;
  this.tempY = this.remotePlayer.y;
  this.tempRotation = this.remotePlayer.rotation;

  if (this.remotePlayer.isFiring === true){
    var angleInRadians = this.remotePlayer.rotation * Math.PI / 180;
    this.remotePlayer.facingX=Math.cos(angleInRadians);
    this.remotePlayer.facingY=Math.sin(angleInRadians);
    this.currentLevel.makeBall(this.remotePlayer.x, this.remotePlayer.y,this.remotePlayer.rotation);
  }

  this.remotePlayer.sourceX=Math.floor(this.remotePlayer.animationFrames[this.remotePlayer.frameIndex] % 7) *32;
  var angleInRadians = this.remotePlayer.rotation * Math.PI / 180;
  //Set the origin to the center of the image
  this.c.save();
  this.c.translate(this.remotePlayer.x+25, this.remotePlayer.y+25);
  //Rotate the canvas around the origin
  this.c.rotate(angleInRadians);
  //draw the image
  if (this.remotePlayer.tankLives <= 0) {
    if(this.remotePlayer.tankLives === 0) {
      var deathSound = Math.floor(Math.random() * (10 - 1)) + 1;
      if(deathSound >= 8){
        this.sounds.death2.play()
      }
      if (deathSound <=7) {
        this.sounds.death.play();
      }
      this.remotePlayer.tankLives -= 1;
    }
    this.c.drawImage(this.explosionImg, this.explosion.sourceX,this.explosion.sourceY,100,100,-25,-25,this.explosion.w,this.explosion.h);
    if(this.explosion.sourceX === 800) {
      this.explosion.sourceX = 0;
      this.explosion.sourceY += 100;
    } else if (this.explosion.sourceX === 300 && this.explosion.sourceY === 900) {
      this.explosion.sourceX = 0;
      this.explosion.sourceY = 0;
      this.explosion.finished = true;
    } else {
      this.explosion.sourceX += 100;
    }
  } else {
    this.c.drawImage(this.remotePlayer.image, this.remotePlayer.sourceX,this.remotePlayer.sourceY,32,32,-25,-25,this.remotePlayer.w,this.remotePlayer.h);
  }
  //reset the canvas
  this.c.restore();
}

Game.prototype.checkState = function(){
  if(this.explosion.finished) {
    this.explosion.finished = false;
    this.isTheMouseBeingPressed = false;
    this.appState=STATE_GAMEOVER;
  }
}

Game.prototype.loadingLevelScreen = function(){
  if (this.firstRun) {
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
  //this.currentLevel = new Level(1);
  //TODO:reset localPlayer?
  this.audio.stop();
  this.localPlayer = undefined;
  this.remotePlayer = undefined;
  this.appState = STATE_LOADING;
}

Game.prototype.gameLoop = function(){
  this.firebase.on("child_added", function(snapshot){
    var data = snapshot.val();
  });
  if (this.firstRun) {
    this.audio.start("loop6");
    this.firstRun = false;
  }
  this.checkState();
  console.log("game");
  this.clearCanvasAndDisplayDetails();
  if(this.currentLevel.bricks[1].y === this.currentLevel.bricks[1].finalY) {
    this.collide();
    //this.updatePosition();
    this.testWalls();
  }
  this.updateFirebase();
  this.ballCollide();
  this.drawBricks();
  this.drawRenderBalls();
  this.renderRemotePlayer();
  this.renderLocalPlayer();

};


Game.prototype.updateFirebase = function(){
  this.firebase.child('game').child(this.localPlayer.player).update({
    x: this.localPlayer.x,
    y: this.localPlayer.y,
    rotation: this.localPlayer.rotation,
    isFiring: this.localPlayer.isFiring
  });
}

Game.prototype.clearCanvasAndDisplayDetails = function(){
  this.c.fillStyle = "#54717A";
  this.c.fillRect(0,0,canvas.width,canvas.height);
  this.c.font = "12px serif";
  this.c.fillStyle = "white";
  this.c.fillText ("Health: ", 20, canvas.height - 20);
  for (var i = 0; i < this.localPlayer.tankLives; i++) {
    this.c.drawImage(this.heart, 0,0,64,64,60 + (i * 24),568,20,20);

    // this.c.fillStyle = "blue";
    // this.c.beginPath();
    // this.c.arc((i*20)+70,canvas.height-25,this.currentLevel.balls[0].w/2,0,Math.PI*2,true);
    // this.c.closePath();
    // this.c.fill();
    // this.c.fillRect((i*20)+60,canvas.height -30,10,10);
  }
}

Game.prototype.initApp = function(){
  if (this.firstRun) {
    this.audio.start("loop2");
    this.firstRun = false;
  }

  //Draws canvas
  this.c.fillStyle = '#000';
  this.c.fillRect(0, 0, canvas.width, canvas.height);
  this.c.fillStyle = "#fff";
  this.c.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

//Draws tank image depending on player select
  if(this.introMenu.playerOneSelect){
    this.c.drawImage(this.disabledTank, 0,96,32,32,this.introMenu.startX-75,330,50,50);
  } else {
    this.c.drawImage(this.playerOne, 0,96,32,32,this.introMenu.startX-75,330,50,50);
  }

  if(this.introMenu.playerTwoSelect){
    this.c.drawImage(this.disabledTank, 0,96,32,32,this.introMenu.startX-75,400,50,50);
  } else {
    this.c.drawImage(this.playerTwo, 0,96,32,32,this.introMenu.startX-75,400,50,50);
  }

//Loads intro menu
  if(this.introMenu.finalX<this.introMenu.startX){
    this.introMenu.startX-=40;
  }
  if(this.introMenu.startX <= this.introMenu.finalX){
    if(this.introMenu.textFade <= 1){
      var fadeCount = parseFloat(this.introMenu.textFade);
      fadeCount += .03;
    this.introMenu.textFade = fadeCount.toFixed(2);
    }

    this.c.font = "30px monospace";
    this.c.fillStyle = "rgba(255, 255, 255, " + this.introMenu.textFade + ")";
    this.c.drawImage(this.logo, 290, 70, 430, 180);
    this.c.fillText("Player 1",this.introMenu.startX, 365);
    this.c.fillText("Player 2",this.introMenu.startX, 435);

    this.c.font = "25px monospace";
    this.c.fillStyle = "rgba(255, 255, 255, " + this.introMenu.textFade + ")";
    if(this.introMenu.localPlayerSelect){
      this.c.fillText("Waiting for other player", 319, 310);
    } else {
      this.c.fillText("Select a tank", 386, 310);

      if(this.introMenu.playerOneSelect){
        this.introMenu.yMod = 355;
      } else if (this.introMenu.playerTwoSelect){
        this.introMenu.yMod = 285;
      }

    //Draws select triangle
      this.c.beginPath();
      this.c.moveTo(70+this.introMenu.xMod,60+this.introMenu.yMod);
      this.c.lineTo(80+this.introMenu.xMod, 70+this.introMenu.yMod);
      this.c.lineTo(70+this.introMenu.xMod, 80+this.introMenu.yMod);
      this.c.fill();

    //Listens for player select
      if(this.getOtherKeyPress){
      //Moves select triangle
        if(this.getOtherKeyPress.keyCode === 115){
          this.introMenu.yMod = 355;
        } else if (this.getOtherKeyPress.keyCode === 119){
          this.introMenu.yMod = 285;
        }
          //Listens for P2 select
        if(this.getOtherKeyPress.keyCode === 13 && this.introMenu.yMod === 355){
          this.firebase.child('game').update({playerTwo: true});
          this.introMenu.localPlayerSelect = true;
          this.localPlayer = new Tank("p2", 850, 500, this.playerTwo);
          this.remotePlayer = new Tank("p1", 50, 50, this.playerOne);
          //Listens for P1 select
        } else if (this.getOtherKeyPress.keyCode === 13 && this.introMenu.yMod === 285){
          this.firebase.child('game').update({playerOne: true});
          this.introMenu.localPlayerSelect = true;
          this.localPlayer = new Tank("p1", 50, 50, this.playerOne);
          this.remotePlayer = new Tank("p2", 850, 500, this.playerTwo);
        }
        this.getOtherKeyPress = undefined;
      }
    }
  }

  //Updates local model based on firebase
  var t = this;
  this.firebase.on("child_added", function(snapshot){
    var data = snapshot.val();
    if(data.playerOne){
      t.introMenu.playerOneSelect = true;
    } else {
      t.introMenu.playerOneSelect = false;
    }
    if (data.playerTwo){
      t.introMenu.playerTwoSelect = true;
    } else {
      t.introMenu.playerTwoSelect = false;
    }
    if (!data.playerOne && !data.playerTwo){
      t.introMenu.localPlayerSelect = false;
    }
  });

  if (this.introMenu.playerOneSelect === true && this.introMenu.playerTwoSelect === true ) {
    this.firstRun = true;
    this.audio.stop();
    this.appState = STATE_PLAYING;
  }
}

Game.prototype.drawBricks = function(){
  this.c.fillStyle ="#144252";
  for (var i = 0; i < this.currentLevel.bricks.length; i++) {
    this.currentLevel.bricks[i].player ? false : this.currentLevel.bricks[i].y +=(200-this.currentLevel.bricks[i].y)*.1; //simple easing.

    this.currentLevel.bricks[i].y = easeOutBack(this.currentLevel.bricks[i].timer,0,this.currentLevel.bricks[i].finalY,50);

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
  for(var i=0; i < this.currentLevel.bricks.length; i++){
    if(this.checkCollision(this.localPlayer, this.currentLevel.bricks[i])){
      var tankY = this.localPlayer.y;
      var tankX = this.localPlayer.x;
      var tankW = this.localPlayer.w;
      var tankH = this.localPlayer.h;

      var brickY = this.currentLevel.bricks[i].y;
      var brickX = this.currentLevel.bricks[i].x;
      var brickW = this.currentLevel.bricks[i].w;
      var brickH = this.currentLevel.bricks[i].h;
      var bringIn = 5;

      if (
        ( ((tankX >= brickX) && (tankX < ((brickX + brickW)-bringIn))) || ( ((tankX + tankW) > brickX) && ((tankX + tankW) < ((brickX + brickW)-bringIn)) ) )
        && ( (tankY < (brickY + brickH)) && (tankY > (brickY + (brickH / 2))) )
        ){
        //top
        this.localPlayer.y = this.localPlayer.y+5;
      }
      else if (
        ( ((tankX >= brickX) && (tankX < ((brickX + brickW)-bringIn))) || ( ((tankX + tankW) > brickX) && ((tankX + tankW) < ((brickX + brickW)-bringIn)) ) )
        && ( ((tankY+tankH) > brickY) && ((tankY+tankH) < (brickY + (brickH / 2))) )
      ){
        //bottom
        this.localPlayer.y = this.localPlayer.y-5;
      }
      else if (
        ( ((tankX >= (brickX + (brickW / 2)) ) && (tankX < (brickX + brickW))) )
        && ( ( (tankY < (brickY + brickH)) && (tankY >= (brickY)) ) || ( ((tankY+tankH) < (brickY + brickH)) && ((tankY+tankH) > (brickY)) ) )
      ) {
        //right
        this.localPlayer.x = this.localPlayer.x+5;
      }
      else if (
        ( (( (tankX + tankW) > (brickX)) ) && ((tankX + tankW) < (brickX + (brickW/2))) )
        && ( ( (tankY < (brickY + brickH)) && (tankY >= (brickY)) ) || ( ((tankY+tankH) < (brickY + brickH)) && ((tankY+tankH) > (brickY)) ) )
      ) {
        //left
        this.localPlayer.x = this.localPlayer.x-5;
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
      //this.isTheMouseBeingPressed = false;
      this.currentLevel.balls.splice(i,1);
      if (this.currentLevel.balls.length > 0) {
        console.log('it works');
      }else {
        this.firstRun = true;
        this.audio.stop();
        this.appState = STATE_GAMEOVER;
      }
      break;
    }
  }
  //Test tank walls
  if(this.localPlayer.x > canvas.width-this.localPlayer.w){
    this.localPlayer.x = canvas.width-this.localPlayer.w;
  }
  if(this.localPlayer.x < 0){
    this.localPlayer.x = 0;
  }
  if(this.localPlayer.y > canvas.height-this.localPlayer.h){
    this.localPlayer.y = canvas.height-this.localPlayer.h;
  }
  if(this.localPlayer.y < 0){
    this.localPlayer.y = 0;
  }
};

Game.prototype.drawRenderBalls = function(){
  if(this.currentLevel.bricks[1].y === this.currentLevel.bricks[1].finalY) {
    for (var i = 0; i < this.currentLevel.balls.length; i++) {
      if(!this.currentLevel.balls[i].launched) {
        this.currentLevel.balls[i].x = (this.currentLevel.bricks[0].x+((this.currentLevel.bricks[0].w/2)-(this.currentLevel.balls[i].w)/2));
        this.c.fillStyle = "#D9D9D9";
        this.c.beginPath();
        this.c.arc(this.currentLevel.balls[i].x+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].y+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].w/2,0,Math.PI*2,true);
        this.c.closePath();
        this.c.fill();
      } else {
        this.currentLevel.balls[i].x += this.currentLevel.balls[i].velx;
        this.currentLevel.balls[i].y += this.currentLevel.balls[i].vely;
        this.c.fillStyle = "#D9D9D9";
        this.c.beginPath();
        this.c.arc(this.currentLevel.balls[i].x+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].y+(this.currentLevel.balls[i].w/2),this.currentLevel.balls[i].w/2,0,Math.PI*2,true);
        this.c.closePath();
        this.c.fill();
        if(this.currentLevel.balls[i].flashTimer > 0){
          this.ballFlash(i);
        }
      }
    }
  }
};

Game.prototype.ballCollide = function(){
  for (var i = 0; i < this.currentLevel.balls.length; i++) {
    if ( this.checkCollision(this.currentLevel.balls[i],this.localPlayer) ) {
      //TODO:probably dont need this if || the one below. TODO: Deal with undefined balls

      if ( (this.currentLevel.balls[i].y + this.currentLevel.balls[i].h > this.localPlayer.y) &&
        (this.currentLevel.balls[i].y < this.localPlayer.y + this.localPlayer.h) &&
        ((this.currentLevel.balls[i].x + this.currentLevel.balls[i].w > this.localPlayer.x) &&
        (this.currentLevel.balls[i].x > this.localPlayer.x ) || (this.currentLevel.balls[i].x + this.currentLevel.balls[i].w < this.localPlayer.x) &&
        (this.currentLevel.balls[i].x < this.localPlayer.x)) ) {
        this.currentLevel.balls.splice(i, 1);
        this.localPlayer.tankLives -= 1;
      }
    }
    if ( this.checkCollision(this.currentLevel.balls[i],this.remotePlayer) ) {
      if ( (this.currentLevel.balls[i].y + this.currentLevel.balls[i].h > this.remotePlayer.y) &&
        (this.currentLevel.balls[i].y < this.remotePlayer.y + this.remotePlayer.h) &&
        ((this.currentLevel.balls[i].x + this.currentLevel.balls[i].w > this.remotePlayer.x) &&
        (this.currentLevel.balls[i].x > this.remotePlayer.x ) || (this.currentLevel.balls[i].x + this.currentLevel.balls[i].w < this.remotePlayer.x) &&
        (this.currentLevel.balls[i].x < this.remotePlayer.x)) ) {
        this.currentLevel.balls.splice(i, 1);
        this.remotePlayer.tankLives -= 1;
      }
    }
  }
};

Game.prototype.gameOverScreen = function(){
  if (this.firstRun) {
    this.sounds.gameOver.play();
    this.firstRun = false;
  }
  this.c.fillStyle = '#000111';
  this.c.fillRect(0, 0, canvas.width, canvas.height);
  //Box
  this.c.strokeStyle = '#000000';
  this.c.font = " "+ canvas.width / 10 + "px monospace";
  this.c.fillStyle = "#fff";

  if((this.localPlayer.tankLives <= 0 && this.localPlayer.player==="p1") || (this.remotePlayer.tankLives <= 0 && this.remotePlayer.player==="p1")) {
    this.c.fillText ("Blue won!",260, canvas.height / 2);
  } else if((this.localPlayer.tankLives <= 0 && this.localPlayer.player==="p2") || (this.remotePlayer.tankLives <= 0 && this.remotePlayer.player==="p2")) {
    this.c.fillText ("Red won!",260, canvas.height / 2);
  }

  this.c.font = " "+ canvas.width / 30 + "px monospace";
  this.c.fillText("Click to Return To The Start Menu",190, canvas.height / 1.5);
  if (this.isTheMouseBeingPressed == true) {
    this.changeStateAndRestartGame();
  }
}

Game.prototype.runTheGame = function(){
  var t = this;
  setInterval(function(){t.gameManager();}, 30);
};


$(function(){
  var game = new Game();
  game.runTheGame();
  // game.currentLevel.levelConstruct = levels[game.currentLevel.currentLevel-1];
});
