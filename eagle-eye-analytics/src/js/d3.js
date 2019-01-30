
var svg_width = 500,
    svg_height = 250,
    margin = {left:50, right: 20, top:30, bottom:30},
    g_width = svg_width - margin.left - margin.right,
    g_height = svg_height - margin.top - margin.bottom

var data = teetime

var scale_x = d3.scale.linear().domain([0, data.length-1]).range([0, g_width]),
    scale_y = d3.scale.linear().domain([0, d3.max(data)]).range([g_height, 0])

var svg = d3.select("#container")
.append("svg:svg")
.attr("width", svg_width)
.attr("height", svg_height)

var g = svg.append("svg:g")
.attr("width", g_width)
.attr("height", g_height)
.attr("transform", "translate(" + margin.left + "," + margin.top + ")") //transform = "translate(50, 30)"

var area = d3.svg.area()
.x(function(d,i) { return scale_x(i); })
.y0(g_height)
.y1(function(d) { return scale_y(d); })
.interpolate("cardinal")

g.append("svg:path")
.attr("d", area(data)) //d path data, line_generator- string, "M0,1L1,2L3,4"
.style("fill", "steelblue");

var x_axis = d3.svg.axis().scale(scale_x).ticks(5)
var y_axis = d3.svg.axis().scale(scale_y).orient("left").ticks(5)


g.append("svg:g")
.call(x_axis)
.attr("transform", "translate(0," + g_height + ")")

g.append("svg:g")
.call(y_axis)
.append("text")
.text("Price($)")
.attr("transform", "rotate(-90)")
.attr("text-anchor", "end")
.attr("dy", "1em")