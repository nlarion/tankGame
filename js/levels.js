// create level object to hold brick and ball objects
var LevelConstruct = function(){
  return [
    [
      ['Inert',475,0,375,50,75,'white',10, ""],
      ['Inert',475,0,150,50,75,'white',10, ""],
      ['Inert',275,0,275,100,50,'white',10, ""],
      ['Inert',625,0,275,100,50,'white',10, ""],
      ['Inert',0,0,150,50,300,'white',10, ""],
      ['Inert',950,0,150,50,300,'white',10, ""],
      ['Inert',325,0,0,375,50,'white',10, ""],
      ['Inert',325,0,550,375,50,'white',10, ""],
    ]
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
  this.makeBall(0,0);
}

Level.prototype.makeBall = function(x,y,rotation){
  var radians = rotation * Math.PI / 180;
  var ballXvel = 5*Math.cos(Math.PI*(rotation)/180);
  console.log(ballXvel);
	var ballYvel = 5*Math.sin(Math.PI*(rotation)/180);
	var ballX	= (x +22) + 39*Math.cos(radians);
	var ballY = (y+17) + 39*Math.sin(radians);

  var ball = new Ball(ballX,ballY,12,12,ballXvel,ballYvel,"white");
  ball.launched = true;
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
