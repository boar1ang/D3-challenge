// D3-Challenge Homework 16
//Set up dimensions for the SVG container/canvas:
var svgWidth = 850;
var svgHeight = 585;

//Define chart's margins as an object:
var margin = { top: 30, bottom: 30, left: 25, right: 15 };

//Define dimensions of chart area:
var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//Create wrapper, select chart location, append SVG area to it, & set the dimensions:
var svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .attr("class", "chart");


//Append a chartGroup to the SVG area & offset it right & down using the transform attribute:
var chartGroup = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`)


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//Read in CSV file to fetch data:
d3.csv("assets/data/data.csv").then(function(stateData, err) 
{   if (err) throw err;      
    //Check that data logs to console:
    console.log(stateData); 
      
    //Assign smoker, obesity, poverty & state variables:
        stateData.forEach(function(data) {
            data.id = +data.id;
            data.stateAbbr = data.stateAbbr;
            data.smokes = +data.smokes;        
            data.income = +data.income;
            data.obesity = +data.obesity;
            data.poverty = +data.poverty;
            console.log(data);       
        });
        
    //Set ranges:
    var x = d3.scaleLinear()
        .range([0, width]);
    var y = d3.scaleLinear()
        .range([height, 0]);

    //Get xMin & xMax values:
    let xMax = d3.max(stateData, d => d.income);
        console.log(xMax);
    let xMin = d3.min(stateData, d => d.income);
        console.log(xMin);
    let yMax = d3.max(stateData, d => d.smokes);
        console.log(yMax);
    
    //Define scale functions:
    x.domain([xMin * 0.95, xMax * 1.1]);
    y.domain([0, yMax * 1.1]);
        
    //Set default values to display on initial load:
    let defaultXAxis = "income";
    let defaultYAxis = "smokes";
    
    // var valueline = d3.line()
    //     .x(function(d) { 
    //         return x(d.income);
    //         })
    //     .y(function(d) {
    //         return y(d.smokes);
    //     });
    
    //Create axis functions:
    let bottomAxis = d3.axisBottom(x);
    let leftAxis = d3.axisLeft(y)
        .ticks(7);

    //Append X & Y axes:
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform", `translate(0, ${height})`)
        .text("Median Income")
        .call(bottomAxis);  

    var yAxis = chartGroup.append("g")
        .classed("y-axis", true)
        .text("% Smokers")
        .call(leftAxis);

    
    //Create circles:    
    var circlesGroup = chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx", d => x(d[defaultXAxis]))
        .attr("cy", d => y(d[defaultYAxis]))
        .attr("r", 12)
        .attr("fill", "#B2D8E5")
        .attr("opacity", "0.75");

    var circTextGroup = chartGroup.selectAll("text")
        .data(stateData)
        .enter()
        .append("text")
        .attr("class", "stateText")
        .attr("stroke", "black")
        .text(d => (d.stateAbbr))
        .attr("x", d => x(d[defaultXAxis]))
        .attr("y", d => y(d[defaultYAxis]))
        .style("stroke", "black")
        .attr("class", "active:Hover")
        .style("text-anchor", "middle");
    
    chartGroup.append("text")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height /2))
        .attr("class", "stateText")
        .attr("text-anchor", "middle")
        .text("Income and Smoking by State")
        //.call(toolTip);       

    
    //Set alt values:
    var altXAxis = "poverty";
    var altYAxis = "obesity";
    
    var toolTip = d3.select("body")
        .append("div")
        .attr("class", "d3-tip");
    
    circlesGroup.on("mousover", function(d, i) {
        toolTip.style("display", "block");
        toolTip.html(`${d.stateAbbr}`);
    })
    
})
.catch(function(error) {
    console.log(error);
});
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
