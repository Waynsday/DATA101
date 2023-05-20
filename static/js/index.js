// CHART 1: GDP RATES (BUBBLES)
var w = 900;
var h = 900;
var padding = 50;
var font = "Raleway"

var gdp = d3.select("#gdpchart").append("svg0")
            .attr("width", w)
            .attr("height", h);

var url = "https://raw.githubusercontent.com/Waynsday/DATA101/main/GDP_ASEAN_2017.csv"

d3.csv(url,
      function(d) {
        return {
          country: d.Code,
          finlit: +d.finlit,
          gdp: +d.gdpc
          };
        }
      )
  .then(function(data) {
     console.log(data)
    var Countries = data.map(function(d) {return d.country; });;
    var maxGDP = d3.max(data, function(d) { return d.gdp; });

    var xScale = d3.scaleBand()
                     .domain(Countries)
                     .range([padding, w-padding])
                     .padding(0.1);

    var yScale = d3.scaleLinear()
                  .domain([-50, maxGDP])
                  .range([h-padding, padding]);

    var categories = [...new Set(data.map(function(d) { return d.country; }))];

    var colorScale = d3.scaleOrdinal()
                  .domain(categories)
                  .range(d3.schemePaired);

    var xAxis = d3.axisBottom(xScale)
    var yAxis = d3.axisLeft().scale(yScale);

    gdp.append("g")
      .attr("transform", "translate(0, " + (h-padding) + ")")
      .attr("class", "axis")
      .call(xAxis);

    gdp.append("g")
      .attr("transform", "translate(" + padding + ",0)")
      .attr("class", "axis")
      .call(yAxis);

    gdp.append("text")
      .attr("x", w/2)
      .attr("y", h-padding+40)
      .attr("text-anchor", "middle")
      .text("ASEAN Countries")

    gdp.append("text")
      .attr("x", -h/2)
      .attr("y", padding-40)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text("GDP per Capita");

    var circles = gdp.selectAll("circle")
      .data(data)
      .join(function(enter) {
        enter.append("circle")
          .attr("cx", function(d) { return xScale(d.country)+30; })
          .attr("cy", function(d) { return yScale(d.gdp); })
          .attr("r", function(d) {return d.finlit*100;})
          .style("fill", function(d) { return colorScale(d.country); })
          .style("opacity", 0.25)
          .on("mouseenter", function (event, d) {
            var circle = d3.select(this); // can't use arrow scoping
            circle.style("opacity", 0.8)
              .style("fill", "#363636");
            showData(d)
          })
          .on("mouseleave", function (event, d) {
            var circle = d3.select(this); // can't use arrow scoping
            circle.style("stroke", "none")
              .style("fill", function(d) { return colorScale(d.country); });
          })
      });

  });

// CHART 2: FINLIT (HBARS)

var url = 'https://raw.githubusercontent.com/Waynsday/DATA101/main/Finlit_ASEAN_2017.csv'

var w = 800;
var h = 400;
var padding_left = 50;
var padding = 50;

var lit = d3.select("#finlit").append("svg")
  .attr("width", w)
  .attr("height", h);

d3.csv(url,
  function(d) {
    return {
      finlit: +d.finlit,
      country: d.Code
    };
  }).then(function(data) {

      data.sort(function(b, a) {
        return a.finlit - b.finlit;
        });
      console.log(data)
      var maxRatio = d3.max(data, function(d) { return d.finlit*100; });
      var regions = data.map(function(d) {return d.country; });

      var xScale = d3.scaleLinear()
                  .domain([0, maxRatio])
                  .range([padding_left, w]);

      var yScale = d3.scaleBand()
                     .domain(regions)
                     .range([padding, h-padding])
                     .padding(0.1);

      var xAxis = d3.axisBottom().scale(xScale);
      var yAxis = d3.axisLeft(yScale)

      var colorScale = d3.scaleOrdinal()
                        .domain(regions)
                        .range(['#01441b', '#087232','#0d7634', '#137e3a', '#137e3a', '#1b8440', '#349c52', '#369e53', '#3aa156','#3ca358', '#3ca358', '#43a85c', '#47ab5e','#53b366', '#6cc073', '#76c57a']);

      lit.append("g")
        .attr("transform", "translate( "+ padding_left +", 0)")
        .call(yAxis)

      lit.append("g")
        .attr("transform", "translate(0, " + (h-padding) + ")")
        .attr("class", "axis")
        .call(xAxis);

      lit.append("text")
        .attr("x", w/2)
        .attr("y", h-padding+40)
        .attr("text-anchor", "middle")
        .text("Financial Literacy Percentage")

      lit.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", xScale(0))
        .attr("y", function(d) { return yScale(d.country); })
        .attr("width", function(d) { return xScale(d.finlit*100)-padding_left; })
        .attr("height", yScale.bandwidth())
        .style("fill", function(d){return colorScale(d.country);})

  });


// CHART 4: BARRIERS
var w = 350;
var h = 350;
var padding = 10;
var font = "Raleway"

var svg1 = d3.select("#barrier1").append("svg")
            .attr("width", w)
            .attr("height", h);

var svg2 = d3.select("#barrier2").append("svg")
            .attr("width", w)
            .attr("height", h);

var svg3 = d3.select("#barrier3").append("svg")
            .attr("width", w)
            .attr("height", h);

var svg4 = d3.select("#barrier4").append("svg")
            .attr("width", w)
            .attr("height", h);

var svg5 = d3.select("#barrier5").append("svg")
            .attr("width", w)
            .attr("height", h);

var svg6 = d3.select("#barrier6").append("svg")
            .attr("width", w)
            .attr("height", h);

var svg7 = d3.select("#barrier7").append("svg")
            .attr("width", w)
            .attr("height", h);

var svg8 = d3.select("#barrier8").append("svg")
            .attr("width", w)
            .attr("height", h);

var url = "https://raw.githubusercontent.com/Waynsday/DATA101/main/Barriers_ASEAN_2017.csv"
var country = 0;
var gdp = d3.select("#gdpchart").append("svg")
            .attr("width", w)
            .attr("height", h);

d3.csv(url,
      function(data) {
        return data

        }
      )
  .then(function(data) {
    data.filter(function(d){ return d.country == "PHL";})
    console.log(data[country])
    var limit1 = 100 - data[country].barrier_1*100;
    var circles1 = svg1.selectAll("circle")
      .data(d3.range(100))
      .enter()
      .append("circle")
      .style("stroke", "#fff")
      .style("fill", function(d, i) {
          return i >= limit1 ? '#dc0f6e' : '#95a6b3';
      })
      .attr("cx", function(d, i) {
          return i % 10 * 6.2 + 20
      })
      .attr("cy", function(d, i) {
          return Math.floor(i / 10) % 10 * 6.2 + 20
      })
      .attr("r", '0.2em');

   svg1.append("text")
      .attr("x", 50)
      .attr("y", 91)
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .attr("font-family", font)
      .text(data[country].barrier_1*10*10 +"%")

   var limit2 = 100 - data[country].barrier_2*100;
    var circles2 = svg2.selectAll("circle")
      .data(d3.range(100))
      .enter()
      .append("circle")
      .style("stroke", "#fff")
      .style("fill", function(d, i) {
          return i >= limit2 ? '#dc0f6e' : '#95a6b3';
      })
      .attr("cx", function(d, i) {
          return i % 10 * 6.2 + 20
      })
      .attr("cy", function(d, i) {
          return Math.floor(i / 10) % 10 * 6.2 + 20
      })
      .attr("r", '0.2em');

   svg2.append("text")
      .attr("x", 50)
      .attr("y", 91)
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .attr("font-family", font)
      .text(data[country].barrier_2*100 +"%")

   var limit3 = 100 - data[country].barrier_3*100;
    var circles3 = svg3.selectAll("circle")
      .data(d3.range(100))
      .enter()
      .append("circle")
      .style("stroke", "#fff")
      .style("fill", function(d, i) {
          return i >= limit3 ? '#dc0f6e' : '#95a6b3';
      })
      .attr("cx", function(d, i) {
          return i % 10 * 6.2 + 20
      })
      .attr("cy", function(d, i) {
          return Math.floor(i / 10) % 10 * 6.2 + 20
      })
      .attr("r", '0.2em');

   svg3.append("text")
      .attr("x", 50)
      .attr("y", 91)
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .attr("font-family", font)
      .text(data[country].barrier_3*100 +"%")

   var limit4 = 100 - data[country].barrier_4*100;
    var circles4 = svg4.selectAll("circle")
      .data(d3.range(100))
      .enter()
      .append("circle")
      .style("stroke", "#fff")
      .style("fill", function(d, i) {
          return i >= limit4 ? '#dc0f6e' : '#95a6b3';
      })
      .attr("cx", function(d, i) {
          return i % 10 * 6.2 + 20
      })
      .attr("cy", function(d, i) {
          return Math.floor(i / 10) % 10 * 6.2 + 20
      })
      .attr("r", '0.2em');

   svg4.append("text")
      .attr("x", 50)
      .attr("y", 91)
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .attr("font-family", font)
      .text(data[country].barrier_4*100 +"%")

   var limit5 = 100 - data[country].barrier_5*100;
    var circles5 = svg5.selectAll("circle")
      .data(d3.range(100))
      .enter()
      .append("circle")
      .style("stroke", "#fff")
      .style("fill", function(d, i) {
          return i >= limit5 ? '#dc0f6e' : '#95a6b3';
      })
      .attr("cx", function(d, i) {
          return i % 10 * 6.2 + 20
      })
      .attr("cy", function(d, i) {
          return Math.floor(i / 10) % 10 * 6.2 + 20
      })
      .attr("r", '0.2em');

   svg5.append("text")
      .attr("x", 50)
      .attr("y", 91)
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .attr("font-family", font)
      .text(data[country].barrier_5*100 +"%")


   var limit6 = 100 - data[country].barrier_6*100;
    var circles6 = svg6.selectAll("circle")
      .data(d3.range(100))
      .enter()
      .append("circle")
      .style("stroke", "#fff")
      .style("fill", function(d, i) {
          return i >= limit6 ? '#dc0f6e' : '#95a6b3';
      })
      .attr("cx", function(d, i) {
          return i % 10 * 6.2 + 20
      })
      .attr("cy", function(d, i) {
          return Math.floor(i / 10) % 10 * 6.2 + 20
      })
      .attr("r", '0.2em');

   svg6.append("text")
      .attr("x", 50)
      .attr("y", 91)
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .attr("font-family", font)
      .text(data[country].barrier_6*100 +"%")

   var limit7 = 100 - data[country].barrier_7*100;
    var circles7 = svg7.selectAll("circle")
      .data(d3.range(100))
      .enter()
      .append("circle")
      .style("stroke", "#fff")
      .style("fill", function(d, i) {
          return i >= limit7 ? '#dc0f6e' : '#95a6b3';
      })
      .attr("cx", function(d, i) {
          return i % 10 * 6.2 + 20
      })
      .attr("cy", function(d, i) {
          return Math.floor(i / 10) % 10 * 6.2 + 20
      })
      .attr("r", '0.2em');

   svg7.append("text")
      .attr("x", 50)
      .attr("y", 91)
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .attr("font-family", font)
      .text(data[country].barrier_7*100 +"%")

   var limit8 = 100 - data[country].barrier_8*100;
    var circles8 = svg8.selectAll("circle")
      .data(d3.range(100))
      .enter()
      .append("circle")
      .style("stroke", "#fff")
      .style("fill", function(d, i) {
          return i >= limit8 ? '#dc0f6e' : '#95a6b3';
      })
      .attr("cx", function(d, i) {
          return i % 10 * 6.2 + 20
      })
      .attr("cy", function(d, i) {
          return Math.floor(i / 10) % 10 * 6.2 + 20
      })
      .attr("r", '0.2em');

   svg8.append("text")
      .attr("x", 50)
      .attr("y", 91)
      .attr("text-anchor", "middle")
      .attr("font-size", 15)
      .attr("font-family", font)
      .text(data[country].barrier_8*10*10 +"%");

  });

// CHART 5: ASEAN HOVER MAP
// Size
var width = 900
var height = 560

// The svg
var svg9 = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

// Map and projection
var projection = d3.geoMercator()
    .center([840, 10])                // GPS of location to zoom on
    .scale(780)                       // This is like the zoom
    .translate([ width/2, height/2 ])

// Create data for circles:
var markers = [
  {long: 121.904296875, lat: 13.624633438236152, name: "Philippines", description: "Mobile money account (% age 15+): 5%"}, // Philippines
  {long: 115.09277343749999, lat: -1.4500404973607948, name: "Indonesia", description: "Mobile money account (% age 15+): 3%"}, // Indonesia
  {long: 104.853515625, lat: 12.983147716796578, name: "Cambodia", description: "Mobile money account (% age 15+): 6%"}, // Cambodia
  {long: 102.3046875, lat: 20.385825381874263, name: "Lao PDR", description: "Mobile money account (% age 15+): 0%"}, //Lao PDR
  {long: 95.6689453125, lat: 22.105998799750566, name: "Myanmar", description: "Mobile money account (% age 15+): 1%"}, // Myanmar
  {long: 102.3486328125, lat: 5.04717073691972, name: "Malaysia", description: "Mobile money account (% age 15+): 11%"}, // Malaysia
  {long: 103.3669921875, lat: 1.53763466641712, name: "Singapore", description: "Mobile money account (% age 15+): 10%"}, // Singapore
  {long: 101.25, lat: 15.834535741221565, name: "Thailand", description: "Mobile money account (% age 15+): 8%"}, // Thailand
  {long: 108.544921875, lat: 14.774882506516272, name: "Vietnam", description: "Mobile money account (% age 15+): 3%"}, // Vietnam
];

// Load external data and boot
d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson", function(data){


    // Draw the map
    svg9.append("g")
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
          .attr("fill", "#2b5aa0")
          .attr("d", d3.geoPath()
              .projection(projection)
          )
        .style("stroke", "#e6f0f5")
        .style("opacity", .8)

    // create a tooltip
    var Tooltip = d3.select("#my_dataviz")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 1)
      .style("background-color", "#e6f0f5")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "4px")
      .style("padding", "6px")

    // Three functions that change the tooltip when user hover / move / leave a cell
    var mouseover = function(d) {
      Tooltip.style("opacity", 1)
    }
    var mousemove = function(d) {
      Tooltip
        .html(d.name + "<br>" + d.description)
        .style("left", (d3.mouse(this)[0]+10) + "px")
        .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function(d) {
      Tooltip.style("opacity", 0)
    }

    // Add circles:
      .selectAll("myCircles")
      .data(markers)
      .enter()
      .append("circle")
        .attr("cx", function(d){ return projection([d.long, d.lat])[0] })
        .attr("cy", function(d){ return projection([d.long, d.lat])[1] })
        .attr("r", 18)
        .attr("class", "circle")
        .style("fill", "#3e4142")
        .attr("stroke", "#3e4142")
        .attr("stroke-width", .5)
        .attr("fill-opacity", .9)
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave)

})