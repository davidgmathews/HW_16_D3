// // @TODO: YOUR CODE HERE!
// // Step 1: Set up our chart
// //= ================================
// var svgWidth = 960;
// var svgHeight = 500;

// var margin = {
//   top: 20,
//   right: 40,
//   bottom: 60,
//   left: 50
// };

// var width = svgWidth - margin.left - margin.right;
// var height = svgHeight - margin.top - margin.bottom;

// // Step 2: Create an SVG wrapper,
// // append an SVG group that will hold our chart,
// // and shift the latter by left and top margins.
// // =================================
// var svg = d3
//   .select("#scatter")
//   .append("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// var chartGroup = svg.append("g")
//   .attr("transform", `translate(${margin.left}, ${margin.top})`);

// // Step 3:
// // Import data from the donuts.csv file
// // =================================
// d3.csv("../HW_16_D3/assets/data/data.csv", healthData=> {
  

//   console.log(healthData);
  
//   // Format the data
//   healthData.forEach(data=> {
    
//     data.poverty = +data.poverty;
//     data.healthcare = +data.healthcare;
//   });

//   // Step 5: Create the scales for the chart
//   // =================================
//   var xLinearScale = d3.scaleLinear()
//     .domain(d3.extent(healthData, d => d.poverty))
//     .range([0, width]);

//   var yLinearScale = d3.scaleLinear().range([height, 0]);

//   // Step 6: Set up the y-axis domain
//   // ==============================================
//   // @NEW! determine the max y value
//   // find the max of the morning data
//   var yMax = d3.max(healthData, d => d.healthcare);
//   console.log(yMax);

//   // Use the yMax value to set the yLinearScale domain
//   yLinearScale.domain([0, yMax]);


//   // Step 7: Create the axes
//   // =================================
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // Step 8: Append the axes to the chartGroup
//   // ==============================================
//   // Add x-axis
//   chartGroup.append("g")
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // Add y-axis
//   chartGroup.append("g").call(leftAxis);

//   // Step 9: Set up two line generators and append two SVG paths
//   // ==============================================

//   // Line generator for data
//   var line1 = d3.line()
//     .x(d => xLinearScale(d.poverty))
//     .y(d => yLinearScale(d.healthcare));
//   console.log("showing line1");
//   console.log(line1);

//   // Append a path for line1
//   chartGroup
//     .append("scatter")
//     .attr("d", line1(healthData))
    
//     .classed("line green", true);
//   // var circles = svg.selectAll("circle");
//   // circles.data(healthData)
//   //   .enter()
//   //   .append("circle")
//   //   .attr("cx", d=>{return +d.poverty;})
//   //   .attr("cy", d=>{return +d.healthcare;})
//   //   .attr("r", 5)
//   //   .attr("stroke", "black")
//   //   .attr("stroke-width", "5")
//   //   .attr("fill", "red");

//   // console.log(circles);

// });

// data that you want to plot, I've used separate arrays for x and y values
d3.csv("../HW_16_D3/assets/data/data.csv", healthData=> {

  // Format the data
  healthData.forEach(data=> {
    
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });
  
var xdata = [],ydata = [];
healthData.forEach(d=>{
  xdata.push(d.poverty);
  ydata.push(d.healthcare);
});



// size and margins for the chart
// var margin = {top: 20, right: 15, bottom: 60, left: 60}
//   , width = 960 - margin.left - margin.right
//   , height = 500 - margin.top - margin.bottom;
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// x and y scales, I've used linear here but there are other options
// the scales translate data values to pixel values for you
var xrange = d3.extent(healthData, d => d.poverty);
xrange[0]=xrange[0]-(xrange[1]-xrange[0])*.1;
xrange[1]=xrange[1]+(xrange[1]-xrange[0])*.1;
var x = d3.scaleLinear()
      .domain(xrange)
      .range([0, width]);        // the pixel range of the x-axis

// var yMax = d3.max(healthData, d => d.healthcare);

var yrange = d3.extent(healthData, d => d.healthcare)
yrange[0]=yrange[0]-(yrange[1]-yrange[0])*.1;
yrange[1]=yrange[1]+(yrange[1]-yrange[0])*.1;
var y = d3.scaleLinear()
          // .domain([0, yMax])
          .domain(yrange)
          .range([height, 0]);

//   var yLinearScale = d3.scaleLinear().range([height, 0]);

//   // Step 6: Set up the y-axis domain
//   // ==============================================
//   // @NEW! determine the max y value
//   // find the max of the morning data


//   // Use the yMax value to set the yLinearScale domain
//   yLinearScale.domain([0, yMax]);


// the chart object, includes all margins
var chart = d3.select('#scatter')
.append('svg:svg')
.attr('width', width + margin.right + margin.left)
.attr('height', height + margin.top + margin.bottom)
.attr('class', 'chart')

// the main object where the chart and axis will be drawn
var main = chart.append('g')
.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
.attr('width', width)
.attr('height', height)
.attr('class', 'main')   

// // draw the x axis
// var xLinearScale = d3.scaleLinear()
//   .domain(d3.extent(healthData, d => d.poverty))
//   .range([0, width]);

var xAxis = d3.axisBottom(x);

// main.append('g')
// .attr('transform', 'translate(0,' + height + ')')
// .attr('class', 'main axis date')
// .call(xAxis);

// // draw the y axis
// var yLinearScale = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft(y);

// main.append('g')
// .attr('transform', 'translate(0,0)')
// .attr('class', 'main axis date')
// .call(yAxis);

// Step 8: Append the axes to the chartGroup
// ==============================================
// Add x-axis
main.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(xAxis);

// Add y-axis
main.append("g").call(yAxis);

// draw the graph object
var g = main.append("svg:g"); 

g.selectAll("scatter-dots")
  .data(ydata)  // using the values in the ydata array
  .enter().append("svg:circle")  // create a new circle for each value
      .attr("cy", function (d) { return y(d); } ) // translate y value to a pixel
      .attr("cx", function (d,i) { return x(xdata[i]); } ) // translate x value
      .attr("r", 10) // radius of circle
      .style("opacity", 0.6); // opacity of circle

});
