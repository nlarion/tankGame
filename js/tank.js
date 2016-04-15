var Tank = function (player,x,y, image) {
  this.dx = 5; //player horizonal speed
	this.dy = 5; //player vertical speed
  this.animationFrames = [0,1,2,3,4,5,6,7];
  this.frameIndex = 0;
  this.sourceX = 0;
  this.sourceY = 96;
  this.w = 50;
  this.h = 50;
  this.x = x;
  this.y = y;
  this.orientation = 0;
  this.tankLives = 3;
  this.isHit = false;
  this.velx = 0;
  this.vely = 0;
  this.radius = 30;
  if(player === 1) {
    this.rotation = 0;
  } else {
    this.rotation = 180;
  }
  this.isFiring = false;
  this.rotationVel = 10;
  this.facingX = 0;
  this.facingY = 0;
  this.player = player;
  this.image = image;
};
