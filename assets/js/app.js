
//reading in data to plot
d3.csv("../HW_16_D3/assets/data/data.csv", healthData=> {

  // Format the data
  healthData.forEach(data=> {
    
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });

//creating arrays to hold x and y values separately
var xdata = [],ydata = [];
healthData.forEach(d=>{
  xdata.push(d.poverty);
  ydata.push(d.healthcare);
});



// size and margins for the chart
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

// x and y scales
// the scales translate data values to pixel values
//adding some padding on either end of the x range
var xrange = d3.extent(healthData, d => d.poverty);
xrange[0]=xrange[0]-(xrange[1]-xrange[0])*.1;
xrange[1]=xrange[1]+(xrange[1]-xrange[0])*.1;
console.log(xrange);
var x = d3.scaleLinear()
      .domain(xrange)
      .range([margin.left, width+margin.left]);        // the pixel range of the x-axis


var yrange = d3.extent(healthData, d => d.healthcare)
//adding some padding on either end of the y range
yrange[0]=yrange[0]-(yrange[1]-yrange[0])*.1;
yrange[1]=yrange[1]+(yrange[1]-yrange[0])*.1;
var y = d3.scaleLinear()
          .domain(yrange)
          .range([height+margin.top, margin.top]);

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

var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

// Add x-axis
main.append("g")
  .attr("transform", `translate(0, ${height+margin.top})`)
  .call(xAxis);

// Add y-axis
main.append("g")
.attr("transform", `translate(${margin.left}, 0)`)
.call(yAxis);

// draw the graph object
var g = main.append("svg:g"); 

//adding scatter dots
g.selectAll("scatter-dots")
  .data(healthData) // binding data to the scatter dots
  .enter().append("svg:circle")  // create a new circle for each value
      .attr("cy", function (d) { return y(+d.healthcare); } ) // translate y value to a pixel
      .attr("cx", function (d,i) { return x(+d.poverty); } ) // translate x value
      .attr("r", 10) // radius of circle
      .style("fill","skyblue")
      .style("opacity", 0.6); // opacity of circle.

//Adding state abbreviation to scatter dots
      g.selectAll("scatter-dots")
  .data(healthData).enter()
  .append("text")   //adding text tag for each circle
  .attr("y",function (d) { return y(+d.healthcare); } )
  .attr("x",function (d,i) { return x(+d.poverty); } )
  .attr("dx", "-.7em") //offsets to align
  .attr("dy", ".5em")   //offsets to align
  .attr("font-size","8px")  
  .text(function(d){return(d.abbr);}); //adding text to the text tag

//adding x axis label
g.append("text")
.attr("x",svgWidth*.5)
.attr("y",svgHeight-margin.bottom*.5)
.style("text-anchor", "middle")
.text("In Poverty (%)");

//adding y axis label
g.append("text")
.attr("transform", "rotate(-90)")
.attr("x",-svgHeight*.5)
.attr("y",margin.left*.5)
.style("text-anchor", "middle")
.text("Lacks Healthcare (%)");

});
