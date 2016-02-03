function a() {
	var nresult = byDate(result,"2012-12-11");
	var tcp = cp(result);
    var b = d3.select("#tableau").style("visibility", "visible"),
        a = b.select("tbody").style("text-align", "right"),
        c = a.selectAll("tr").data(tcp).enter().append("tr");
    c.append("td").html(function(d) {
        return d
    });
    c.append("td").html(function(d) {
        return cp_nb(d,result)
    })
	c.append("td").html(function(d) {
        return nb_categ(accByCP(result,d))[0]
    })
	c.append("td").html(function(d) {
        return nb_categ(accByCP(result,d))[1]
    })
	c.append("td").html(function(d) {
        return nb_categ(accByCP(result,d))[2]
    })
	c.append("td").html(function(d) {
        return nb_categ(accByCP(result,d))[3]
    })

};

//Return : le nombre d'accidents du CP en parametre
function cp_nb(cp,nresult) {
	var cpt=0;
    for(var acc1 of nresult) {
		if(acc1.fields.code_postal==cp){
			cpt++;
		}

	}
	return cpt
}

//Return : les code postaux des données d'accidents
function cp(accidents){
	var ret=[accidents[0].fields.code_postal];
	for(var acc1 of accidents) {
		//for(var acc2 of ret){
			if(ret.indexOf(acc1.fields.code_postal) <= -1){
				ret.push(acc1.fields.code_postal)
			}
		//}
	}
	ret.sort(function(a, b) {
    return a - b;
	});
	return ret
}

//Return : les accidents de la date en parametre
function byDate(res,date){
	var ret=new Array();
	for(acc of res){
		if(acc.fields.date==date){
			ret.push(acc);
		}
	}
	return ret
}

//Return : les accidents du CP en parametre
function accByCP(data,cp){
	var ret = new Array();
	for(acc of data){
		if(acc.fields.code_postal==cp){
			ret.push(acc);
		}
	}
	return ret
}

//Return : le nombre d'accident par categorie (Vl,VU,Moto,Pieton)
function nb_categ(data){
	var nb_vl=0,nb_vu=0,nb_pieton=0,nb_moto=0;
	for(var acc of data){
		if(acc.fields.vehicule_1_cadmin != null && acc.fields.vehicule_1_cadmin.match(/VL/) ){
			nb_vl++;
		}
		if(acc.fields.vehicule_2_cadmin != null && acc.fields.vehicule_2_cadmin.match(/VL/) ){
			nb_vl++;
		}
		if(acc.fields.vehicule_1_cadmin != null && acc.fields.vehicule_1_cadmin.match(/VU/) ){
			nb_vu++;
		}
		if(acc.fields.vehicule_2_cadmin != null && acc.fields.vehicule_2_cadmin.match(/VU/) ){
			nb_vu++;
		}
		if(acc.fields.vehicule_1_cadmin != null && acc.fields.vehicule_1_cadmin.match(/Moto/) ){
			nb_moto++;
		}
		if(acc.fields.vehicule_2_cadmin != null && acc.fields.vehicule_2_cadmin.match(/Moto/) ){
			nb_moto++;
		}
		if(acc.fields.usager_2_catu != null && acc.fields.usager_2_catu.match(/Piéto/) ){
			nb_pieton++;
		}
		if(acc.fields.usager_1_catu != null && acc.fields.usager_1_catu.match(/Piéto/) ){
			nb_pieton++;
		}
	}
	var ret = [nb_vl,nb_vu,nb_moto,nb_pieton];
	return ret
}

//Return : le nombre d'accidents par CP sur toutes les donnees
function nbAccByCP(data){
	var tcp = cp(data);
	var ret=new Array();
	for(var ncp of tcp){
		ret.push(cp_nb(ncp,data));
	}

	return ret
}

function b(){
	 var data=nbAccByCP(result);
d3.select(".chart2")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return d  + "px"; })
    .text(function(d) { return d; });
}