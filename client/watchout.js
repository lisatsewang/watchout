// start slingin' some d3 here.

var gameOptions = {
  width: 800,
  height: 800,
  numEnemies: 40,
  radius: 20
};

var gameBoard = d3.select(".board")
                  .append("svg")
                  .attr("width", gameOptions.width)
                  .attr("height", gameOptions.height)
                  .append("g")

var player = gameBoard.append("circle")
              .attr({
                id: "player",
                cx: gameOptions.width/2 - gameOptions.radius,
                cy: gameOptions.height/2 - gameOptions.radius,
                r: gameOptions.radius,
                fill: "white"
              });

//-------------enemy----------------


var enemyData = [];

var createEnemies = function(n) {
  for(var i = 0 ; i < n; i++) {
    enemyData.push({
      class: "enemy",
      x: function() { return Math.random() * 700 - gameOptions.radius; },
      y: function() { return Math.random() * 700 - gameOptions.radius; },
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
          fill: "grey"
       });

var moveEnemies = function() {
  enemies.transition()
    .attr({
      cx: function(d) { return d.x(); },
      cy: function(d) { return d.y(); }, 
  });
};

setInterval(moveEnemies, 1000);




// var createEnemies = function(gameOptions.numEnemies) { 


// gameBoard.selectAll("circle")
//           .data(enemyData) //function(e) {return e.id;})
//           .enter()
//           .append("circle")
//           // .attr('class', 'enemy')
//           .style("stroke", "red")
//           .style("stroke-width", 2)
//           .style("fill", "black")
//           .attr("cx", )
//           .attr("cy", function() {return Math.random() * gameOptions.height; })
//           .attr("r", 10);
// }

// createEnemies(gameOptions.numEnemies);




//   enemies = gameBoard.selectAll('enemy').data(enemyData, function(e){return e.id;});

//   enemies.enter().append('svg:circle').attr('class','enemy')
//                   .attr('cx',function(e){return e.x;})
//                   .attr('cy',function(e){return e.y;})
//                   .attr('r',10);

// };








// d3.select('body').selectAll('div').data([8, 3, 7])
//     .enter().append('div').style('opacity', 0)
//     .text('creating divs!')
//     .transition().duration(3000)
//     .style('opacity', 1)

// d3.select('body').selectAll('div').data([])
//     .exit().transition().duration(3000)
//     .text(function(d){return 'deleting divs '+d})
//     .style('opacity', 0)
//     .remove()

// d3.select('body').selectAll('div').data([8, 3, 7, 5])
//     .text(function(d){return 'existing divs '+d})
//     .enter().append('div').style('opacity', 0)
//     .text('creating divs!')
//     .transition().duration(3000).style('opacity', 1)

// ----------- how to draw circle ----------------------
// <svg width="50" height="50">
// 2  <circle cx="25" cy="25" r="25" fill="purple" />
// 3</svg>


// /Make an SVG Container
//  2var svgContainer = d3.select("body").append("svg")
//  3                                    .attr("width", 200)
//  4                                    .attr("height", 200);
//  5
//  6//Draw the Ellipse
//  7var circle = svgContainer.append("circle")
//  8                         .attr("cx", 50)
//  9                         .attr("cy", 50)
// 10                         .attr("rx", 50)
// 11                         .attr("ry", 50);