//limites de la carte
var limiteBasDroite = L.latLng(48.791776, 2.451451),
    limiteHautGauche = L.latLng(48.926351, 2.224334);

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
  .enter().append("path");

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
      popup
          .setLatLng(e.latlng)
          .setContent("Nombre d'accidents ")
          .openOn(map);
  }

  map.on('click', onMapClick);

});





