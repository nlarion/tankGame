

// t: current time, b: begInnIng value, c: change In value, d: duration
//var somevar = easeOutBack(0,0,100,100)//start
//var somevar = easeOutBack(100,0,100,100) //end
var easeOutBack = function (t, b, c, d, s) {
  if (s == undefined) s = 1.70158;
  return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
};

var Brick = function(type,x,y,finalY,w,h,color,score,powerUp){
  this.x = x;
  this.y = y;
  this.finalY = finalY;
  this.w = w;
  this.h = h;
  this.velx = 0;
  this.vely = 0;
  this.color = color;
  this.nextx = 0;
  this.nexty = 0;
  this.player = false;
  this.type = type;
  this.timer = 0;
  this.score = score;
  this.powerUp = powerUp;
};

//function Ball(x,y,r,velx,vely,color){
var Ball = function(x,y,w,h,velx,vely,color){
  this.x = x;
  this.y = y;
  // this.r = r;
  this.w = w;
  this.h = h;
  this.velx = velx;
  this.vely = vely;
  this.color = color;
  this.nextx = x;
  this.nexty = y;
  this.launched = false;
};
