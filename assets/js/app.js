// D3-Challenge Homework 16

//Set up scatter plot
var svgWidth = 850;
var svgHeight = 500;

var margin = { top: 10, bottom: 5, left: 10, right: 10 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3
    .select("body")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.select("#scatter")
      .attr("classed", "tooltip")
      .style("opacity", 0.5);

/* id,state,abbr,poverty,povertyMoe,age,ageMoe,income,incomeMoe,healthcare,healthcareLow,healthcareHigh,
obesity,obesityLow,obesityHigh,smokes,smokesLow,smokesHigh,-0.385218228 */

//Read in CSV file to fetch data:
d3.csv("../assets/data/data.csv").then(function(stateHealthData) {
    
    console.log(stateHealthData); 
    
    //Smokers vs. Obesity 
    stateHealthData.forEach(function(data) {
        data.smokes = +data.smokes;
        var smokers = data.smokes;
        data.obesity = +data.obesity;
        var obese = data.obesity;
        var state = data.state;         
    });

    //Define scales, axes, max values:
    var xScale = d3.scaleLinear().range([0, width]);
    var yScale = d3.scaleLinear().range([height, 0]);

    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    var xMax = d3.max(stateHealthData, d => d.smokes);
    var yMax = d3.max(stateHealthData, d => d.obesity);

    //Create tooltip




/*.catch(function(error) {
        console.log(error);
}) */

});




