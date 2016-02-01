/**
 * Created by DamDam on 08/01/2016.
 */
 var data=nbAccByCP(result);
d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d  + "px"; })
    .text(function(d) { return d; });