var Tank = function () {
  this.dx = 5; //player horizonal speed
	this.dy = 5; //player vertical speed
  this.animationFrames = [0,1,2,3,4,5,6,7,8,9,10,11];
  this.frameIndex = 0;
  this.sourceX = 50;
  this.sourceY = 50;
  this.w = 50;
  this.h = 50;
  this.velx = 0;
  this.vely = 0;
  this.radius = 30;
  this.x = 500;
  this.y = 500;
};
