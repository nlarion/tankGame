// create level object to hold brick and ball objects
var LevelConstruct = function(){
  return [
    [ ['Player',200,550,250,65,15,'red',0],
    ['Inert',50,0,50,98,23,'#ff00ff',100, "extraLife"],
    ['Inert',150,0,50,98,23,'white',10, ""],
    ['Inert',250,0,50,98,23,'white',10, ""],
    ['Inert',350,0,50,98,23,'white',10, ""],
    ['Inert',450,0,50,98,23,'white',10, ""],
    ['Inert',550,0,50,98,23,'white',10, ""],
    ['Inert',650,0,50,98,23,'#ff00ff',100, "extraLife"],
    ['Inert',50,0,75,98,23,'white',10, ""],
    ['Inert',150,0,75,98,23,'white',10, ""],
    ['Inert',250,0,75,98,23,'white',10, ""],
    ['Inert',350,0,75,98,23,'white',10, ""],
    ['Inert',450,0,75,98,23,'white',10, ""],
    ['Inert',550,0,75,98,23,'white',10, ""],
    ['Inert',650,0,75,98,23,'white',10, ""],
    ['Inert',50,0,100,98,23,'white',10, ""],
    ['Inert',150,0,100,98,23,'white',10, ""],
    ['Inert',250,0,100,98,23,'red',50, "paddleWidth"],
    ['Inert',350,0,100,98,23,'white',10, ""],
    ['Inert',450,0,100,98,23,'blue',50, "newBall"],
    ['Inert',550,0,100,98,23,'white',10, ""],
    ['Inert',650,0,100,98,23,'white',10, ""],
    ['Steady',800,0,0,5,600,'yellow',0, ""],
    ['Steady',-10,0,0,10,600,'yellow',0, ""],
    ['Steady',0,0,-10,800,10,'yellow',0, ""],],

   [['Player',200,550,250,65,15,'red',0],
   ['Durable',50,0,100,100,25,'orange',30, ""],
   ['Durable',200,0,75,100,25,'orange',30, ""],
   ['Inert',200,0,125,100,25,'#ff00ff',100, "extraLife"],
   ['Inert',350,0,50,100,25,'red',50, "paddleWidth"],
   ['Durable',350,0,150,100,25,'orange',30, ""],
   ['Durable',500,0,75,100,25,'orange',30, ""],
   ['Inert',500,0,125,100,25,'#009933',50, "machineGun"],
   ['Durable',650,0,100,100,25,'orange',30, ""],
   ['Inert',1,0,350,99,25,'white',10, ""],
   ['Inert',100,0,350,100,25,'white',10, ""],
   ['Inert',200,0,350,100,25,'white',10, ""],
   ['Inert',500,0,350,100,25,'white',10, ""],
   ['Inert',600,0,350,100,25,'white',10, ""],
   ['Inert',700,0,350,99,25,'white',10, ""],
   ['Inert',50,0,325,100,25,'white',10, ""],
   ['Inert',150,0,325,100,25,'white',10, ""],
   ['Inert',250,0,325,100,25,'white',10, ""],
   ['Inert',450,0,325,100,25,'white',10, ""],
   ['Inert',550,0,325,100,25,'white',10, ""],
   ['Inert',650,0,325,100,25,'white',10, ""],
   ['Steady',800,0,0,5,600,'yellow',0, ""],
   ['Steady',-10,0,0,10,600,'yellow',0, ""],
   ['Steady',0,0,-10,800,10,'yellow',0, ""],],

    [ ['Player',200,550,250,65,15,'red',0],
    ['Inert',50,0,50,98,23,'white',10, ""],
    ['Inert',150,0,50,98,23,'white',10, ""],
    ['Inert',250,0,50,98,23,'white',10, ""],
    ['Inert',350,0,50,98,23, '#ff00ff',100, "extraLife"],
    ['Inert',450,0,50,98,23,'white',10, ""],
    ['Inert',550,0,50,98,23,'white',10, ""],
    ['Inert',650,0,50,98,23,'white',10, ""],
    ['Inert',50,0,75,98,23,'white',10, ""],
    ['Inert',150,0,75,98,23,'white',10, ""],
    ['Inert',250,0,75,98,23,'white',10, ""],
    ['Inert',350,0,75,98,23,'white',10, ""],
    ['Inert',450,0,75,98,23,'white',10, ""],
    ['Inert',550,0,75,98,23,'white',10, ""],
    ['Inert',650,0,75,98,23,'white',10, ""],
    ['Speedy',50,0,100,98,23,'#99ff99',30, ""],
    ['Speedy',150,0,100,98,23,'#99ff99',30, ""],
    ['Speedy',250,0,100,98,23,'#99ff99',30, ""],
    ['Speedy',450,0,100,98,23,'#99ff99',30, ""],
    ['Speedy',550,0,100,98,23,'#99ff99',30, ""],
    ['Speedy',650,0,100,98,23,'#99ff99',30, ""],
    ['Speedy',350,0,100,98,23,'#99ff99',30, ""],
    ['Inert',350,0,200,98,23,'red',50, "paddleWidth"],
    ['Steady',800,0,0,5,600,'yellow',0, ""],
    ['Steady',-10,0,0,10,600,'yellow',0, ""],
    ['Steady',0,0,-10,800,10,'yellow',0, ""],],

    [['Player',200,550,250,65,15,'red',0],
    ['Steady',0,0,450,100,25,'yellow',0, ""],
    ['Steady',25,0,425,100,25,'yellow',0, ""],
    ['Steady',50,0,400,100,25,'yellow',0, ""],
    ['Steady',75,0,375,100,25,'yellow',0, ""],
    ['Steady',100,0,350,100,25,'yellow',0, ""],
    ['Steady',125,0,325,100,25,'yellow',0, ""],
    ['Steady',150,0,300,100,25,'yellow',0, ""],
    ['Steady',175,0,275,100,25,'yellow',0, ""],
    ['Steady',200,0,250,100,25,'yellow',0, ""],
    ['Steady',225,0,225,100,25,'yellow',0, ""],
    ['Steady',250,0,200,100,25,'yellow',0, ""],
    ['Steady',275,0,175,100,25,'yellow',0, ""],
    ['Steady',300,0,150,100,25,'yellow',0, ""],
    ['Steady',700,0,450,100,25,'yellow',0, ""],
    ['Steady',675,0,425,100,25,'yellow',0, ""],
    ['Steady',650,0,400,100,25,'yellow',0, ""],
    ['Steady',625,0,375,100,25,'yellow',0, ""],
    ['Steady',600,0,350,100,25,'yellow',0, ""],
    ['Steady',575,0,325,100,25,'yellow',0, ""],
    ['Steady',550,0,300,100,25,'yellow',0, ""],
    ['Steady',525,0,275,100,25,'yellow',0, ""],
    ['Steady',500,0,250,100,25,'yellow',0, ""],
    ['Steady',475,0,225,100,25,'yellow',0, ""],
    ['Steady',450,0,200,100,25,'yellow',0, ""],
    ['Steady',425,0,175,100,25,'yellow',0, ""],
    ['Steady',400,0,150,100,25,'yellow',0, ""],
    ['Steady',350,0,125,100,25,'yellow',0, ""],
    ['Durable',350,0,250,100,25,'orange',30, ""],
    ['Inert',250,0,300,100,25,'white',10, ""],
    ['Inert',350,0,300,100,25,'white',10, ""],
    ['Inert',450,0,300,100,25,'white',10, ""],
    ['Inert',350,0,375,100,25,'pink',50, "slowDown"],
    ['Steady',800,0,0,5,600,'yellow',0, ""],
    ['Steady',-10,0,0,10,600,'yellow',0, ""],
    ['Steady',0,0,-10,800,10,'yellow',0, ""],],

    [['Player',200,550,250,65,15,'red',0],
    ['Durable',150,0,460,100,25,'orange',30, ""],
    ['Durable',250,0,460,100,25,'orange',30, ""],
    ['Durable',350,0,460,100,25,'orange',30, ""],
    ['Durable',450,0,460,100,25,'orange',30, ""],
    ['Durable',550,0,460,100,25,'orange',30, ""],
    ['Durable',150,0,435,100,25,'orange',30, ""],
    ['Durable',250,0,435,100,25,'orange',30, ""],
    ['Durable',350,0,435,100,25,'orange',30, ""],
    ['Durable',450,0,435,100,25,'orange',30, ""],
    ['Durable',550,0,435,100,25,'orange',30, ""],
    ['Durable',150,0,410,100,25,'orange',30, ""],
    ['Durable',150,0,385,100,25,'orange',30, ""],
    ['Durable',150,0,360,100,25,'orange',30, ""],
    ['Durable',150,0,335,100,25,'orange',30, ""],
    ['Durable',150,0,310,100,25,'orange',30, ""],
    ['Durable',150,0,285,100,25,'orange',30, ""],
    ['Durable',150,0,260,100,25,'orange',30, ""],
    ['Durable',150,0,235,100,25,'orange',30, ""],
    ['Durable',150,0,210,100,25,'orange',30, ""],
    ['Durable',150,0,185,100,25,'orange',30, ""],
    ['Durable',175,0,160,100,25,'orange',30, ""],
    ['Durable',200,0,135,100,25,'orange',30, ""],
    ['Durable',200,0,110,100,25,'orange',30, ""],
    ['Durable',175,0,85,100,25,'orange',30, ""],
    ['Durable',550,0,410,100,25,'orange',30, ""],
    ['Durable',550,0,385,100,25,'orange',30, ""],
    ['Durable',550,0,360,100,25,'orange',30, ""],
    ['Durable',550,0,335,100,25,'orange',30, ""],
    ['Durable',550,0,310,100,25,'orange',30, ""],
    ['Durable',550,0,285,100,25,'orange',30, ""],
    ['Durable',550,0,260,100,25,'orange',30, ""],
    ['Durable',550,0,235,100,25,'orange',30, ""],
    ['Durable',550,0,210,100,25,'orange',30, ""],
    ['Durable',550,0,185,100,25,'orange',30, ""],
    ['Durable',525,0,160,100,25,'orange',30, ""],
    ['Durable',500,0,135,100,25,'orange',30, ""],
    ['Durable',500,0,110,100,25,'orange',30, ""],
    ['Durable',525,0,85,100,25,'orange',30, ""],
    ['Inert',300,0,200,100,25,'blue',50, "newBall"],
    ['Inert',275,0,280,100,25,'red',50, "paddleWidth"],
    ['Inert',410,0,260,100,25,'blue',50, "newBall"],
    ['Inert',280,0,390,100,25,'#ff00ff',100, "extraLife"],
    ['Inert',350,0,330,100,25,'blue',50, "newBall"],
    ['Inert',420,0,385,100,25,'#009933',50, "machineGun"],
    ['Steady',800,0,0,5,600,'yellow',0, ""],
    ['Steady',-10,0,0,10,600,'yellow',0, ""],
    ['Steady',0,0,-10,800,10,'yellow',0, ""],],

    [ ['Player',200,550,250,65,15,'red',0],
    ['Speedy',775,0,400,25,100,'red',50, "paddleWidth"],
    ['Steady',0,0,0,25,494,'yellow',0, ""],
    ['Steady',675,0,100,25,394,'yellow',0, ""],
    ['Durable',100,0,50,100,25,'orange',30, ""],
    ['Inert',100,0,180,100,25,'pink',50, "slowDown"],
    ['Durable',300,0,120,100,25,'orange',30, ""],
    ['Inert',500,0,180,100,25,'blue',30, "newBall"],
    ['Inert',300,0,250,100,25,'#ff00ff',100, "extraLife"],
    ['Durable',500,0,50,100,25,'orange',30, ""],
    ['Steady',100,0,375,100,120,'yellow',0, ""],
    ['Speedy',200,0,460,100,25,'#99ff99',30, ""],
    ['Steady',500,0,375,100,120,'yellow',30, ""],
    ['Speedy',400,0,460,100,25,'#99ff99',30, ""],
    ['Steady',800,0,0,5,600,'yellow',0, ""],
    ['Steady',-10,0,0,10,600,'yellow',0, ""],
    ['Steady',0,0,-10,800,10,'yellow',0, ""],],

    [ ['Player',200,550,250,65,15,'red',0],
    ['Durable',0,0,300,100,25,'orange',30, ""],
    ['Durable',100,0,300,100,25,'orange',30, ""],
    ['Durable',200,0,300,100,25,'orange',30, ""],
    ['Durable',300,0,300,100,25,'orange',30, ""],
    ['Durable',400,0,300,100,25,'orange',30, ""],
    ['Durable',500,0,300,100,25,'orange',30, ""],
    ['Durable',600,0,300,100,25,'orange',30, ""],
    ['Durable',700,0,300,100,25,'orange',30, ""],
    ['Inert',0,0,585,100,25,'white',10, ""],
    ['Inert',100,0,585,100,25,'white',10, ""],
    ['Inert',200,0,585,100,25,'white',10, ""],
    ['Inert',300,0,585,100,25,'white',10, ""],
    ['Inert',400,0,585,100,25,'white',10, ""],
    ['Inert',500,0,585,100,25,'white',10, ""],
    ['Inert',600,0,585,100,25,'white',10, ""],
    ['Inert',700,0,585,100,25,'white',10, ""],
    ['Steady',800,0,0,5,600,'yellow',0, ""],
    ['Steady',-10,0,0,10,600,'yellow',0, ""],
    ['Steady',0,0,-10,800,10,'yellow',0, ""],],

    [ ['Player',200,550,250,65,15,'red',0],
    ['Inert',37,0,150,25,50,'#ff00ff',100, "extraLife"],
    ['Inert',37,0,200,25,50,'#ff00ff',100, "extraLife"],
    ['Inert',37,0,250,25,50,'#ff00ff',100, "extraLife"],
    ['Inert',62,0,150,50,25,'#ff00ff',100, "extraLife"],
    ['Inert',62,0,215,50,25,'#ff00ff',100, "extraLife"],
    ['Inert',62,0,275,50,25,'#ff00ff',100, "extraLife"],
    ['Inert',137,0,150,25,50,'pink',50, "slowDown"],
    ['Inert',137,0,200,25,50,'pink',50, "slowDown"],
    ['Inert',137,0,250,25,50,'pink',50, "slowDown"],
    ['Inert',162,0,150,50,25,'pink',50, "slowDown"],
    ['Inert',162,0,225,50,25,'pink',50, "slowDown"],
    ['Inert',187,0,175,25,50,'pink',50, "slowDown"],
    ['Inert',237,0,150,25,50,'red',50, "paddleWidth"],
    ['Inert',237,0,200,25,50,'red',50, "paddleWidth"],
    ['Inert',237,0,250,25,50,'red',50, "paddleWidth"],
    ['Durable',287,0,150,25,50,'orange',30, ""],
    ['Durable',287,0,200,25,50,'orange',30, ""],
    ['Durable',287,0,250,25,50,'orange',30, ""],
    ['Durable',312,0,150,50,25,'orange',30, ""],
    ['Durable',312,0,275,50,25,'orange',30, ""],
    ['Steady',387,0,150,25,50,'yellow',0, ""],
    ['Steady',387,0,200,25,50,'yellow',0, ""],
    ['Steady',387,0,250,25,50,'yellow',0, ""],
    ['Steady',412,0,150,25,25,'yellow',0, ""],
    ['Steady',412,0,275,25,25,'yellow',0, ""],
    ['Steady',437,0,150,25,50,'yellow',0, ""],
    ['Steady',437,0,200,25,50,'yellow',0, ""],
    ['Steady',437,0,250,25,50,'yellow',0, ""],
    ['Speedy',487,0,175,25,50,'#99ff99',30, ""],
    ['Speedy',487,0,225,25,50,'#99ff99',30, ""],
    ['Speedy',487,0,150,50,25,'#99ff99',30, ""],
    ['Speedy',487,0,275,50,25,'#99ff99',30, ""],
    ['Speedy',537,0,175,25,50,'#99ff99',30, ""],
    ['Speedy',537,0,225,25,50,'#99ff99',30, ""],
    ['Inert',587,0,150,25,50,'#009933',50, "machineGun"],
    ['Inert',587,0,200,25,50,'#009933',50, "machineGun"],
    ['Inert',587,0,250,25,50,'#009933',50, "machineGun"],
    ['Inert',612,0,275,25,25,'#009933',50, "machineGun"],
    ['Inert',637,0,150,25,50,'#009933',50, "machineGun"],
    ['Inert',637,0,200,25,50,'#009933',50, "machineGun"],
    ['Inert',637,0,250,25,50,'#009933',50, "machineGun"],
    ['Inert',687,0,275,50,25,'blue',50, "newBall"],
    ['Inert',687,0,215,75,25,'blue',50, "newBall"],
    ['Inert',712,0,150,50,25,'blue',50, "newBall"],
    ['Inert',687,0,150,25,65,'blue',50, "newBall"],
    ['Inert',737,0,240,25,60,'blue',50, "newBall"],
    ['Steady',800,0,0,5,600,'yellow',0, ""],
    ['Steady',-10,0,0,10,600,'yellow',0, ""],
    ['Steady',0,0,-10,800,10,'yellow',0, ""],],
  ];
}

var levelConstructs = new LevelConstruct();

var Level = function(currentLevel) {
  this.currentLevel = currentLevel;
  this.bricks = [];
  this.balls = [];
  this.powerUp = [];
  this.projectiles = [];
  this.winCriteria = 0;
  this.getCurrentLevelprops();
  this.makeBall(394,538);

}

Level.prototype.makeBall = function(x,y){
  var ball = new Ball(x,y,12,12,5,-5,"white");
  ball.launched = false;
  this.balls.push(ball);
};

Level.prototype.getCurrentLevelprops = function() {
  for (var i = 0; i < levelConstructs[this.currentLevel-1].length; i++) {
    var pushtype = levelConstructs[this.currentLevel-1][i][0];
    var pushx = levelConstructs[this.currentLevel-1][i][1];
    var pushy = levelConstructs[this.currentLevel-1][i][2];
    var pushFinalY = levelConstructs[this.currentLevel-1][i][3];
    var width = levelConstructs[this.currentLevel-1][i][4];
    var height = levelConstructs[this.currentLevel-1][i][5];
    var pushcolor = levelConstructs[this.currentLevel-1][i][6];
    var pushScore = levelConstructs[this.currentLevel-1][i][7];
    var pushPowerUp = levelConstructs[this.currentLevel-1][i][8];

    var newBrick = new Brick(pushtype,pushx,pushy,pushFinalY,width,height,pushcolor,pushScore,pushPowerUp);
    //console.log(newBrick);
    if(pushtype === 'Player') {
      newBrick.player = true;
      newBrick.life = 1;
      this.winCriteria++;
    } else if (pushtype === 'Inert' || pushtype === "Speedy") {
      newBrick.life = 1;
    } else if (pushtype === 'Durable') {
      newBrick.life = 2;
    } else if (pushtype === 'Steady') {
      this.winCriteria++;
      newBrick.life = 1;
    }
    this.bricks.push(newBrick);
  }
};
