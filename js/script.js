/////////////////////////////////////////////////////////////////////////
//
// (c) University of Southampton IT Innovation Centre, 2016
//
// Copyright in this software belongs to University of Southampton
// IT Innovation Centre of Gamma House, Enterprise Road,
// Chilworth Science Park, Southampton, SO16 7NS, UK.
//
// This software may not be used, sold, licensed, transferred, copied
// or reproduced in whole or in part in any manner or form or in or
// on any media by any person other than in accordance with the terms
// of the Licence Agreement supplied with the software, or otherwise
// without the prior written consent of the copyright owners.
//
// This software is distributed WITHOUT ANY WARRANTY, without even the
// implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
// PURPOSE, except where stated in the Licence Agreement supplied with
// the software.
//
//      Created By :            Stefanie Wiegand
//      Created Date :          2016-05-23
//      Created for Project :   REVEAL
//
/////////////////////////////////////////////////////////////////////////

var glob = {
    name: "",
    entity: "",
    wikidataEntity: "",
    height: d3.select("#chart").node().clientHeight,
    width: d3.select("#chart").node().clientWidth,
    tooltip: d3.select("body").append("div").attr("class", "tooltip").style("position", "absolute").style("padding", "0 10px").style("background", "#fff").style("opacity", 0),
    endpoints: {
        dbpedia: "http://dbpedia.org/sparql?format=json&query=",
        dbpediaAlt: "http://dbpedia-live.openlinksw.com/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=",
        dbpediaWikidata: "http://wikidata.dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fwikidata.dbpedia.org&format=application%2Fsparql-results%2Bjson&query=",
        wikidata: "https://query.wikidata.org/sparql?format=json&query=",
        yago: "https://linkeddata1.calcul.u-psud.fr/sparql?format=application%2Fsparql-results%2Bjson&qtxt=",
        yagoAlt: "http://lod.openlinksw.com/sparql/?query=",
        viaf: ""
    },
    lists: [],
    infobox: [],
    ownviews: [],
    religion: [],
    politics: [],
    network: [],
    religionPolitics: [],
    cloudWords: [],
    cloudPhrases: [],
    cloudNetwork: [],
    allData: []
};
run();
