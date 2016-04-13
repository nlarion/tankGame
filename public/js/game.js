//causes problems - not sure why.
// var collide = function(){
//   for (var i = 0, max = balls.length; i < max ; i = i + 1) {
//     for (var j = 0 , max2 = this.currentLevel.bricks.length; j < max2; j = j + 1) {

var fps = {
  startTime : 0,
  frameNumber : 0,
  getFPS : function(){
    this.frameNumber++;
    var d = new Date().getTime(),
      currentTime = ( d - this.startTime ) / 1000,
      result = Math.floor( ( this.frameNumber / currentTime ) );
    if(currentTime > 1){
      this.startTime = new Date().getTime();
      this.frameNumber = 0;
    }
    return result;
  }
};


// //event handeler for non jquery if we go that way
// function addEventHandler(oNode, evt, oFunc, bCaptures) {
//   if (document.addEventListener) {
//     // Safari, Chrome, Fx, etc
//     oNode.addEventListener(evt, oFunc, bCaptures);
//   } else if (document.attachEvent) {
//     // IE
//     oNode.attachEvent('on' + evt, oFunc);
//   } else {
//     // If all else fails
//     oNode['on' + evt] = oFunc;
//   }
// }
