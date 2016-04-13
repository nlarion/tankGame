var Tank = function () {
  this.dx = 5; //player horizonal speed
	this.dy = 5; //player vertical speed
  this.animationFrames = [0,1,2,3,4,5,6,7,8,9,10,11];
  this.frameIndex = 0;
  this.sourceX = 0;
  this.sourceY = 32;
  this.w = 50;
  this.h = 50;
  this.x = 50;
  this.y = 50;
  this.orientation = 0;
  this.tankLives = 3;
  this.isHit = false;

};
