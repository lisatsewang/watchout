// start slingin' some d3 here.

var gameOptions = {
  width: 500,
  height: 500,
  numEnemies: 40,
  radius: 10,
  score: 0,
  high: 0,
  numCollisions: 0
};

//-------------create player-----------------

var gameBoard = d3.select(".board")
  .append("svg")
  .attr("width", gameOptions.width)
  .attr("height", gameOptions.height)
  .append("g");

var player = gameBoard.append("circle")
  .attr({
    id: "player",
    cx: gameOptions.width/2 - gameOptions.radius,
    cy: gameOptions.height/2 - gameOptions.radius,
    r: gameOptions.radius,
    fill: "red"
  });

// modified from http://bl.ocks.org/mbostock/1557377
var drag = d3.behavior.drag()
  .on("drag", dragmove)
  .on("dragstart", function(){
            player.style('opacity', .5);
          })
  .on("dragend", function(){
            player.style('opacity', 1);
          });

function dragmove(d) {
  d3.select(this)
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y);
}

function dragmove(d) {
  d3.select(this)
    .attr("cx", d3.event.x)
    .attr("cy", d3.event.y)
}

player.call(drag);

//----------------create enemy----------------

var enemyData = [];

var createEnemies = function(n) {
  for(var i = 0 ; i < n; i++) {
    enemyData.push({
      class: "enemy",
      x: function() { return Math.random() * gameOptions.width; },
      y: function() { return Math.random() * gameOptions.height; },
    });
  }
};

createEnemies(gameOptions.numEnemies);

var enemies = gameBoard.selectAll(".enemies")
  .data(enemyData);

  enemies.enter()
  .append("circle")
  .attr({
    class: function(d) { return d.class; },
    cx: function(d) { return d.x(); },
    cy: function(d) { return d.y(); },
    r: gameOptions.radius,
    fill: "white"
});

var moveEnemies = function() {
  enemies.transition().duration(2000)
    .attr({
      cx: function(d) { return d.x(); },
      cy: function(d) { return d.y(); }, 
  });
};

setInterval(moveEnemies, 2000);
   

//-------------collision----------------


var hasCollision = function() {
  var collision = false;

  enemies.each( function(d){
    var pX = player.attr("cx");
    var pY = player.attr("cy");

    var enemyX = d3.select(this).attr("cx");
    var enemyY = d3.select(this).attr("cy");
    
    var xDiff = enemyX - pX;
    var yDiff = enemyY - pY;

    var distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);

    if (distance <= (gameOptions.radius) * 2) {
      collision = true;
    }
    previousCollision = collision;
  });

  return collision;
};


var update = function() {

  var previousCollision = false;

  // update current score
  if (hasCollision()) {
    gameOptions.score = 0;
    d3.select(".current > span").text(gameOptions.score);
  } else {
    gameOptions.score++;
    d3.select(".current > span").text(gameOptions.score);
  }

  // update high score
  if(gameOptions.high < gameOptions.score) {
    gameOptions.high = gameOptions.score;
    d3.select(".high > span").text(gameOptions.high);
  }

  // update collision
  if (hasCollision()) {
    gameOptions.numCollisions++;
    d3.select(".collisions > span").text(gameOptions.numCollisions);
  }
}; 

// setInterval(update, 50);
d3.timer(update);





