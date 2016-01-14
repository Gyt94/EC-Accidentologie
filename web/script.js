function a() {
	var nresult = byDate(result,"2012-12-11");
	var tcp = cp(nresult);
    var b = d3.select("#tableau").style("visibility", "visible"),
        a = b.select("tbody").style("text-align", "right"),
        c = a.selectAll("tr").data(tcp).enter().append("tr");
    c.append("td").html(function(d) {
        return d
    });
    c.append("td").html(function(d) {
        return cp_nb(d,nresult)
    })
};
function cp_nb(cp,nresult) {
	var cpt=0;
    for(var acc1 of nresult) {
		if(acc1.fields.code_postal==cp){
			cpt++;
		}

	}
	return cpt
}

function cp(accidents){
	var ret=[accidents[0].fields.code_postal];
	for(var acc1 of accidents) {
		//for(var acc2 of ret){
			if(ret.indexOf(acc1.fields.code_postal) <= -1){
				ret.push(acc1.fields.code_postal)
			}
		//}
	}
	return ret
}
function byDate(res,date){
	var ret=new Array();
	for(acc of res){
		if(acc.fields.date==date){
			ret.push(acc);
		}
	}
	return ret
}