// create level object to hold brick and ball objects
var LevelConstruct = function(){
  return [
    [
      ['Player',200,550,250,65,15,'red',0],
      ['Inert',100,0,300,500,100,'white',10, ""],
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
  this.makeBall(394,538);

}

Level.prototype.makeBall = function(x,y){
  var ball = new Ball(x + 50,y + 50,12,12,20,0,"white");
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
