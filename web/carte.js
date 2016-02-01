//limites de la carte
var limiteBasDroite = L.latLng(48.791776, 2.451451),
    limiteHautGauche = L.latLng(48.926351, 2.224334);
var first = 0;
var map = L.map('map', {
  center: [48.858, 2.335],
  zoom: 13,
  minZoom: 12,
  maxZoom: 14,
  maxBounds: L.latLngBounds(limiteBasDroite, limiteHautGauche)
})

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var svg = d3.select(map.getPanes().overlayPane).append("svg"),
g = svg.append("g").attr("class", "leaflet-zoom-hide");

var color = d3.scale.linear()
.range(["white", "red"]);

//charger les arrondissemnts
d3.json("paris.json", function(error, collection) {
  if (error) {
    alert('Erreur lors du chargement des arrondissements');
  }

  var transform = d3.geo.transform({point: projectPoint}), 
  arrdt = d3.geo.path().projection(transform);

  var feature = g.selectAll("path")
  .data(collection.features)
  .enter().append("path")
  .property("code_postal", function (d) { return d.properties.code; })
  .on('click', onMapClick);;

  map.on("viewreset", affichageDynamique);
  affichageDynamique();

  // fonction permettant d'afficher les arrdt dynamiquement
  function affichageDynamique() {
    var bounds = arrdt.bounds(collection),
    topLeft = bounds[0],
    bottomRight = bounds[1];

    svg .attr("width", bottomRight[0] - topLeft[0])
    .attr("height", bottomRight[1] - topLeft[1])
    .style("left", topLeft[0] + "px")
    .style("top", topLeft[1] + "px");

    g   .attr("transform", "translate(" + -topLeft[0] + "," + -topLeft[1] + ")");

    feature.attr("d", arrdt);
  }

  // Use Leaflet to implement a D3 geometric transformation.
  function projectPoint(x, y) {
    var point = map.latLngToLayerPoint(new L.LatLng(y, x));
    this.stream.point(point.x, point.y);
  }

  var popup = L.popup();

  function onMapClick(e) {
       var tooltip = d3.select("#tooltip"),
	   code = tooltip.select("#code"),
	   nbAccident = tooltip.select("#nba");
	   
	   code.html(e.properties.code);
	   nbAccident.html(cp_nb(e.properties.code,result));
	   if(tooltip.style.display == "initial"){
		   tooltip.style("display", none);
	   }else{
	   tooltip.style("display", "initial");
	   }
	   tooltip.style("top", d3.event.pageY - 125 + "px");
	   tooltip.style("left", d3.event.pageX + 10 + "px");
	var data=nb_categ(accByCP(result,e.properties.code));

	var width = "80%",
    barHeight = 20;


var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", barHeight * data.length);
	if(first==0){
var bar = chart.selectAll("g")
    .data(data)
  .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

bar.append("rect")
    .attr("width", function(d) { return d+"px"; })
    .attr("height", barHeight - 1);

bar.append("text")
    .attr("x", function(d) { return d+"px"; })
    .attr("y", barHeight / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d; });
	first++;
	}else{
		var bar = chart.selectAll("g")
			.data(data);
		bar.select("rect")
		.transition()
		.duration(750)
		.attr("width", function(d) {return d+"px";})
		bar.select("text")
		.transition()
		.duration(750)
		.attr("x", function(d) { return d+"px"; })
		.attr("y", barHeight / 2)
		.attr("dy", ".35em")
		.text(function(d) { return d; });
	}
	
	/*
	d3.data(function(error,data){
		var svg = d3.select(".chart").transition();
		svg.selectAll("div")
			.style("width", function(d) { return d  + "px"; })
			.text(function(d) { return d; });
	});
	*/
	  /* 
	  var e = d3.select(".chart")
      .selectAll("div")
        .data(data);
     	e.enter().append("div")
        .style("width", function(d) { return d  + "px"; })
        .text(function(d) { return d; });*/

  }

  //map.on('click', onMapClick);

});





