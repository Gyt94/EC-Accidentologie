function a() {
    var b = d3.select("#tableau").style("visibility", "visible"),
        a = b.select("tbody").style("text-align", "right"),
        c = a.selectAll("tr").data(donnees.code_postal).enter().append("tr");
    c.append("td").html(function(d, e) {
        return donnees.recordid[e]
    });
    c.append("td").html(function(d) {
        return d
    })
};