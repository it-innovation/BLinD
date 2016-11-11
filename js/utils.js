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

function loadConfig() {
    var e = {
        defaultVisualisation: "cloudAll",
        subject: "Bernie_Sanders",
        limit: 50,
        examples: ["North_Korea", "Vladimir_Putin", "Chuck_Norris", "Boris_Johnson", "Jedi", "Sadanun_Balenciaga", "Bernie_Sanders", "Flying_Spaghetti_Monster", "François_Hollande", "Nigel_Farage", "Alan_Rickman", "Kim_Dotcom", "Spock", "Ku_Klux_Klan", "Mondoweiss", "Barack_Obama", "UK_Independence_Party", "New_Zealand", "Christopher_Lee", "Der_Postillon", "Kiefer_Sutherland", "Hillary_Clinton", "Gandalf", "Terry_Pratchett", "Saarland", "Jesus", "Socrates", "Snopes.com", "Fox_Mulder", "Rama_Yade", "Greenpeace", "Julian_Assange"]
    };
    for (var t in e)("subject" != t || "subject" == t && void 0 === glob.subject) && (glob[t] = e[t])
}

function init() {
    if (window.onresize = function() {
            height = d3.select("#chart").node().clientHeight, width = d3.select("#chart").node().clientWidth, d3.select("#chart").select("svg").attr("width", width).attr("height", height)
        }, !glob.testing) {
        var e = window.location.search.replace("?", "");
        if (tmp = e.split("="), "search" === tmp[0]) {
            var t = decodeURIComponent(tmp[1]).split("+").join("_");
            "" != t && (glob.entity = "dbr:" + t, glob.subject = t)
        }
        "" == glob.entity && (glob.entity = "dbr:" + glob.subject)
    }
    glob.name = glob.subject.split("_").join(" ")
}

function run() {
    loadConfig(), init(), glob.infobox = JSON.parse(queryLODSync(glob.endpoints.dbpedia, 'SELECT DISTINCT ?who ?str ?wikidata ?pic (REPLACE(STR(?nat), "^.*(#|/)", "") AS ?natstr) ?nationality (REPLACE(STR(?eth), "^.*(#|/)", "") AS ?ethstr) ?ethnicity ?ethrel (REPLACE(STR(?rar), "^.*(#|/)", "") AS ?rarstr) ?religion (REPLACE(STR(?rap), "^.*(#|/)", "") AS ?rapstr) ?politics WHERE { { SELECT DISTINCT ?who ?str ?pic WHERE { ' + glob.entity + " owl:sameAs* ?who . OPTIONAL { ?who foaf:depiction|dbo:thumbnail|dbp:thumbnail|dbp:imageCharacter ?pic . } OPTIONAL { ?who rdfs:comment ?c . FILTER (lang(?c) = 'en') BIND(STR(?c) as ?str) } FILTER(BOUND(?str)) } LIMIT 1 } OPTIONAL { ?who owl:sameAs ?wikidata . FILTER(STRSTARTS(STR(?wikidata),'http://www.wikidata.org/entity/')) } OPTIONAL { { ?who ?nat ?nationality . FILTER(?nat in (dbo:nationality,dbp:citizenship)) } UNION { ?who dbo:ethnicity ?ethnicity . OPTIONAL { ?ethnicity ?eth ?ethrel . FILTER(?eth in (dbp:religiousAffiliation,dbo:religion,dbp:religion,dbp:religions)) } } UNION { ?who ?rar ?religion . FILTER(?rar IN (dbo:religion,dbp:religion,dbp:religions,dbp:religiousAffiliation)) } UNION { ?who ?rap ?politics . FILTER(?rap IN (dbo:affiliation,dbp:affiliations,dbp:membership,dbp:industry,dbo:party,dbo:otherParty,dbp:purpose)) }}} LIMIT 1000")), glob.lists = JSON.parse(queryLODSync(glob.endpoints.dbpedia, "SELECT DISTINCT ?who ?affiliation ?category ?broader WHERE { " + glob.entity + " owl:sameAs* ?who . ?who dct:subject ?affiliation . ?affiliation skos:broader{2,7} ?broader . ?affiliation skos:broader ?category . FILTER(?broader IN (dbc:Religion, dbc:Politics)) . } LIMIT 1000")), queryLODAsyncAndGo(glob, glob.endpoints.dbpedia, "SELECT DISTINCT ?who ?relation ?object ?otype ?oplace (REPLACE(STR(?rap), '^.*(#|/)', \"\") AS ?rapstr) ?politics (REPLACE(STR(?rar), '^.*(#|/)', \"\") AS ?rarstr) ?religion WHERE { " + glob.entity + " owl:sameAs* ?who . FILTER(!BOUND(?politics) || ?politics != ?who). FILTER(!BOUND(?religion) || ?religion != ?who). FILTER(!BOUND(?object) || ?object != ?who). FILTER(?objecttype IN (dbo:Organisation,dbo:Company,<http://schema.org/Organization>,foaf:Person)) { ?object ?relation ?who . } UNION { ?who ?relation ?object . } FILTER(?relation NOT IN (rdfs:seeAlso,owl:sameAs,dbp:1namedata)) FILTER(?relation NOT IN (dbp:appointer,dbp:nominator,dbo:regionServed,dbp:regionServed)) FILTER(?relation NOT IN (dbp:successor,dbo:successor,dbp:succeeded,dbp:predecessor,dbo:predecessor,dbp:president,dbo:president,dbp:after,dbp:before,dbp:influenced,dbo:influenced,dbp:candidate,dbo:lieutenant,dbp:lieutenant,dbp:vicePresident,dbp:vicepresident,dbo:vicePresident,dbo:governor,dbp:governor,dbp:navy,dbp:treasury,dbp:justice,dbp:state,dbo:primeMinister,dbp:primeminister,dbp:deputy,dbo:deputy,dbo:opponent,dbp:opponent,dbp:deathPlace,dbo:deathPlace)) ?object rdf:type ?objecttype . OPTIONAL { ?object ?typeprop ?otype . ?otype rdf:type owl:Thing . FILTER(?typeprop IN (dbp:type)) } OPTIONAL { ?object ?placeprop ?oplace . ?oplace rdf:type geo:SpatialThing . FILTER(?placeprop IN (dbo:country,dbp:country,dbo:state,dbp:state,dbo:place,dbp:place)) } OPTIONAL { ?object ?rap ?politics . FILTER(?rap IN (dbo:party,dbo:otherParty,dbp:ideology,dbo:ideology,dbp:mainClassification,dbp:orientation,dbp:polity)) } OPTIONAL { ?object ?rar ?religion . FILTER(?rar IN (dbo:religion,dbp:religion,dbp:religions,dbp:religiousAffiliation)) }} LIMIT 2000"), makeSampleLinks(glob)
}

function getLODQueryUrl(e, t) {
    return e + encodeURIComponent(t)
}

function queryLODSync(e, t) {
    var o = {},
        i = new XMLHttpRequest;
    i.overrideMimeType("text/plain"), i.open("GET", getLODQueryUrl(e, t), !1), i.onreadystatechange = function() {
        4 === i.readyState && (o = i.responseText)
    };
    try {
        i.send(), "Virtuoso" == o.substr(0, 8) && (console.log("Invalid result received from dbpedia: " + o), o = '{ "head": { "link": [], "vars": [] }, "results": { "distinct": false, "ordered": true, "bindings": [] } }')
    } catch (n) {
        console.log("Could not query dbpedia"), console.log(n)
    }
    return o
}

function queryLODAsyncAndGo(e, t, o) {
    var i = getLODQueryUrl(t, o);
    $.ajax({
        url: i,
        type: "GET",
        dataType: "jsonp"
    }).done(function(t) {
        buildPage(e, t)
    }).fail(function() {
        console.log("Could not execute dbpedia query:\n" + o)
    }).always(function() {
        console.log("Finished retrieving data from dbpedia")
    })
}

function parseInfobox(e) {
    for (rowi in e.infobox.results.bindings) {
        if (row = e.infobox.results.bindings[rowi], void 0 !== row.nationality && void 0 !== row.natstr) {
            var t = row.natstr.value,
                o = row.nationality.value.replace("http://dbpedia.org/resource/", "").split("_").join(" "),
                i = "<p>(" + e.name + ")-[" + t + "]-(" + o + ")</p>",
                n = {
                    reltype: t,
                    object: {
                        value: row.who.value
                    },
                    oview: {
                        value: o
                    },
                    tooltip: i
                }; - 1 == e.ownviews.map(function(e) {
                return e.oview.value
            }).indexOf(o) && e.ownviews.push(n)
        }
        if (void 0 !== row.ethnicity && void 0 !== row.ethrel) {
            var r = "ethnicity",
                t = row.ethstr.value,
                a = row.ethnicity.value.replace("http://dbpedia.org/resource/", "").split("_").join(" "),
                l = row.ethrel.value.replace("http://dbpedia.org/resource/", "").split("_").join(" "),
                i = "<p>(" + e.name + ")-[" + r + "]-(" + a + ")-[" + t + "]-(" + l + ")</p>",
                n = {
                    relation: r,
                    reltype: t,
                    object: {
                        value: a
                    },
                    oview: {
                        value: l
                    },
                    tooltip: i
                }; - 1 == e.ownviews.map(function(e) {
                return e.oview.value
            }).indexOf(l) && e.ownviews.push(n)
        }
        if (void 0 !== row.religion && void 0 !== row.rarstr) {
            var t = row.rarstr.value,
                s = row.religion.value.replace("http://dbpedia.org/resource/", "").split("_").join(" "),
                i = "<p>(" + e.name + ")-[" + t + "]-(" + s + ")</p>",
                n = {
                    reltype: t,
                    object: {
                        value: row.who.value
                    },
                    oview: {
                        value: s
                    },
                    tooltip: i
                }; - 1 == e.ownviews.map(function(e) {
                return e.oview.value
            }).indexOf(s) && e.ownviews.push(n)
        }
        if (void 0 !== row.politics && void 0 !== row.rapstr) {
            var t = row.rapstr.value,
                d = row.politics.value.replace("http://dbpedia.org/resource/", "").split("_").join(" "),
                i = "<p>(" + e.name + ")-[" + t + "]-(" + d + ")</p>",
                n = {
                    reltype: t,
                    object: {
                        value: row.who.value
                    },
                    oview: {
                        value: d
                    },
                    tooltip: i
                }; - 1 == e.ownviews.map(function(e) {
                return e.oview.value
            }).indexOf(d) && e.ownviews.push(n)
        }
        void 0 !== row.wikidata && (e.wikidataEntity = "<" + row.wikidata.value + ">")
    }
    if (void 0 !== e.wikidataEntity && "" != e.wikidataEntity) {
        console.log("Getting wikidata info for " + e.wikidataEntity + " (" + e.entity + ")");
        var c = JSON.parse(queryLODSync(e.endpoints.wikidata, "SELECT ?twitter ?facebook ?instagram ?linkedin ?googleplus ?website WHERE { BIND (" + e.wikidataEntity + ' as ?e) . OPTIONAL { ?e wdt:P2002 ?twitter . } OPTIONAL { ?e wdt:P2013 ?facebook . } OPTIONAL { ?e wdt:P2003 ?instagram . } OPTIONAL { ?e wdt:P2035 ?linkedin . } OPTIONAL { ?e wdt:P2847 ?googleplus . } OPTIONAL { ?e wdt:P856 ?website . } SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }} LIMIT 1'));
        for (rowi in c.results.bindings) {
            if (row = c.results.bindings[rowi], void 0 !== row.twitter) {
                d3.select("#searchsubject").append("a").attr("href", "http://twitter.com/" + row.twitter.value).attr("target", "_blank").append("img").attr("alt", "@" + row.twitter.value).attr("src", "images/twitter.png")
            }
            if (void 0 !== row.facebook) {
                d3.select("#searchsubject").append("a").attr("href", "http://fb.com/" + row.facebook.value).attr("target", "_blank").append("img").attr("alt", row.facebook.value).attr("src", "images/facebook.png")
            }
            if (void 0 !== row.instagram) {
                d3.select("#searchsubject").append("a").attr("href", "http://instagram.com/" + row.instagram.value).attr("target", "_blank").append("img").attr("alt", row.instagram.value).attr("src", "images/instagram.png")
            }
            if (void 0 !== row.linkedin) {
                d3.select("#searchsubject").append("a").attr("href", row.linkedin.value).attr("target", "_blank").append("img").attr("alt", row.linkedin.value).attr("src", "images/linkedin.png")
            }
            if (void 0 !== row.googleplus) {
                d3.select("#searchsubject").append("a").attr("href", "https://plus.google.com/" + row.googleplus.value).attr("target", "_blank").append("img").attr("alt", row.googleplus.value).attr("src", "images/googleplus.png")
            }
            if (void 0 !== row.website) {
                d3.select("#searchsubject").append("a").attr("href", row.website.value).attr("target", "_blank").append("img").attr("alt", row.website.value).attr("src", "images/web.png")
            }
        }
    } else console.log("No wikidata entity found for " + e.entity);
    for (viewi in e.ownviews) view = e.ownviews[viewi], e.cloudWords.push({
        key: "http://dbpedia.org/resource/" + view.oview.value.split(" ").join("_"),
        value: view.oview.value,
        tooltip: [view.tooltip]
    })
}

function parseLists(e) {
    for (row in e.lists.results.bindings) {
        var t = e.lists.results.bindings[row];
        if (void 0 !== t.affiliation) {
            var o = t.affiliation.value.split("http://dbpedia.org/page/Category:").join("").split("http://dbpedia.org/resource/Category:").join("").split("_");
            e.cloudPhrases.push({
                key: t.affiliation.value,
                value: o.join(" "),
                tooltip: [o.join(" ")]
            });
            for (word in o) e.cloudWords.push({
                key: "http://dbpedia.org/resource/" + o[word].split(" ").join("_"),
                value: o[word].replace(",", "").replace(":", "").replace("(", "").replace(")", "").replace(".", "").replace(";", "").replace("_", "").replace(" ", "")
            })
        }
    }
    boringWords = ["the", "our", "of", "from", "to", "out", "in", "at", "and", "or", "people", "for", "with", "by", "a", "as", "descent", "party", "parties", "living", "place", "places", "members", "member", "recipient", "recipients", "et", "des", "constituencies", "performance", "area", "designated", "era", "countries", "territories"];
    for (var i = e.cloudWords.length - 1; i >= 0; i--) word = e.cloudWords[i].value.toLowerCase(), boringWords.indexOf(word) > -1 && e.cloudWords.splice(i, 1);
    for (word in e.cloudWords)
        for (phrase in e.cloudPhrases) e.cloudPhrases[phrase].value.indexOf(e.cloudWords[word].value) > -1 && (void 0 === e.cloudWords[word].tooltip && (e.cloudWords[word].tooltip = []), e.cloudWords[word].tooltip.indexOf(e.cloudPhrases[phrase].value) < 0 && e.cloudWords[word].tooltip.push(e.cloudPhrases[phrase].value));
    foundLists = [];
    for (di in e.lists.results.bindings) {
        d = e.lists.results.bindings[di];
        var n = !1;
        for (fi in foundLists) f = foundLists[fi], d.affiliation.value == f.affiliation.value && (n = !0);
        n || foundLists.push(d)
    }
    foundLists = foundLists.sort(function(e, t) {
        var o = e.affiliation.value.toUpperCase(),
            i = t.affiliation.value.toUpperCase();
        return i > o ? -1 : o > i ? 1 : 0
    }), e.lists = foundLists
}

function parseNetwork(e, t) {
    for (row in t.results.bindings) {
        var o = t.results.bindings[row];
        if (void 0 !== o.relation) {
            var n = o.relation.value.substr(o.relation.value.lastIndexOf("/") + 1).split("_").join(" "),
                r = "<p>(" + e.name + ")-[" + n + "]-(" + o.object.value.replace("http://dbpedia.org/resource/", "").split("_").join(" ") + ")-[",
                a = "]-(",
                l = ")</p>";
            void 0 !== o.rapstr && void 0 !== o.politics && e.politics.push({
                relation: n,
                reltype: o.rapstr,
                object: o.object,
                otype: o.otype,
                oplace: o.oplace,
                oview: o.politics,
                tooltip: r + o.rapstr.value + a + o.politics.value.replace("http://dbpedia.org/resource/", "").split("_").join(" ") + l
            }), void 0 !== o.rarstr && void 0 !== o.religion && e.religion.push({
                relation: n,
                reltype: o.rarstr,
                object: o.object,
                otype: o.otype,
                oplace: o.oplace,
                oview: o.religion,
                tooltip: r + o.rarstr.value + a + o.religion.value.replace("http://dbpedia.org/resource/", "").split("_").join(" ") + l
            })
        }
    }
    e.religionPolitics = e.religion.concat(e.politics);
    for (i in e.religionPolitics) {
        var s = e.religionPolitics[i].oview;
        s = void 0 !== s.type && "literal" == s.type ? "http://dbpedia.org/resource/" + s.value : s.value, e.cloudNetwork.push({
            key: s,
            value: s.replace("http://dbpedia.org/resource/", "").split("_").join(" "),
            tooltip: [e.religionPolitics[i].tooltip]
        }), e.allData.push({
            key: s,
            value: s.replace("http://dbpedia.org/resource/", "").split("_").join(" "),
            tooltip: [e.religionPolitics[i].tooltip]
        });
        var o = e.religionPolitics[i].object.value; - 1 == e.network.indexOf(o) && e.network.push(o)
    }
}

function processData(e, t) {
    parseInfobox(e), parseLists(e), parseNetwork(e, t), e.allData = e.allData.concat(e.cloudWords).concat(e.cloudPhrases), e.cloudWords = reorderData(e.cloudWords), e.cloudNetwork = reorderData(e.cloudNetwork), e.allData = reorderData(e.allData), e.cloudWords = normaliseData(e.cloudWords), e.cloudNetwork = normaliseData(e.cloudNetwork), e.allData = normaliseData(e.allData)
}

function reorderData(e) {
    var t = 0;
    for (e = e.reduce(function(e, t) {
            for (var o = -1, i = e[0].length - 1; i > -1; i--) e[0][i].value === t.value && (e[1][i] += 1, o = i);
            return -1 == o && (e[0].push(t), e[1].push(1)), e
        }, [
            [],
            []
        ]).reduce(function(e, o, i, n) {
            var r = [];
            return e.forEach(function(e, o) {
                r.push({
                    term: n[0][o],
                    amount: n[1][o]
                }), n[1][o] > t && (t = n[1][o])
            }), r
        }), e.sort(function(e, t) {
            return t.amount - e.amount
        }); e.length > glob.limit;) e.pop();
    return {
        data: e,
        max: t
    }
}

function normaliseData(e) {
    for (var t = e.max / 100, o = e.data.length, i = 0; o > i; i++) e.data[i].amount = Math.round(e.data[i].amount / t);
    return e.data
}

function buildInfobox(e) {
    d3.select("#searchsubject").append("a").text(e.name).attr("href", "http://dbpedia.org/resource/" + e.subject).attr("target", "_blank"), void 0 !== e.infobox.results.bindings[0].pic ? d3.select("#infobox").append("img").attr("src", e.infobox.results.bindings[0].pic.value).attr("alt", e.name) : d3.select("#infobox").append("p").text("(No image available)"), d3.select("#infobox").append("p").text(void 0 !== e.infobox.results.bindings[0].str ? e.infobox.results.bindings[0].str.value : "(No information available)")
}

function makeSampleLinks(e) {
    var t = d3.select("#examples").append("p");
    for (i in e.examples) t.append("a").attr("href", "?search=" + e.examples[i]).text(e.examples[i].split("_").join(" "))
}

function buildPage(glob, data) {
    function cloudAll() {
        makeTagCloud(glob, glob.allData)
    }

    function cloudSelf() {
        makeGraph(glob, glob.ownviews)
    }

    function barList() {
        makeBarChart(glob, glob.cloudWords)
    }

    function pieList() {
        makePieChart(glob, glob.cloudWords)
    }

    function listList() {
        makeList(glob, glob.lists)
    }

    function cloudList() {
        makeTagCloud(glob, glob.cloudWords)
    }

    function pieNetwork() {
        makePieChart(glob, glob.cloudNetwork)
    }

    function cloudNetwork() {
        makeTagCloud(glob, glob.cloudNetwork)
    }

    function graphNetwork() {
        makeGraph(glob, glob.religionPolitics)
    }
    console.log("Starting to build page"), document.title = "BLinD Bias Dashboard: " + glob.name, buildInfobox(glob), processData(glob, data);
    var ul = d3.selectAll("#tabs ul"),
        header = ul.select("li.header");
    header.append("span").attr("class", "amountLabel").text(function() {
        var e = this.parentNode.parentNode.className;
        switch (e) {
            case "rainbow":
                return;
            case "self":
                return glob.ownviews.length;
            case "lists":
                return glob.lists.length;
            case "network":
                return glob.cloudNetwork.length + "/" + glob.network.length;
            default:
                return void console.log("Unknown category found: " + e)
        }
    }), header.attr("title", function() {
        var e = this.parentNode.className;
        switch (e) {
            case "rainbow":
                return;
            case "self":
                var t = 1 == glob.ownviews.length ? "view is" : "views are";
                return glob.ownviews.length + " " + t + " connected to " + glob.name;
            case "lists":
                var t = 1 == glob.lists.length ? "list" : "lists";
                return glob.name + " appears in " + glob.lists.length + " " + t;
            case "network":
                var o = 1 == glob.network.length ? "entity is" : "entities are",
                    i = 1 == glob.cloudNetwork.length ? "view" : "different views";
                return glob.network.length + " " + o + " connected to " + glob.name + " representing " + glob.cloudNetwork.length + " " + i;
            default:
                return void console.log("Unknown category found: " + e)
        }
    });
    var visualisations = ["cloudAll", "cloudSelf", "barList", "pieList", "listList", "cloudList", "pieNetwork", "cloudNetwork", "graphNetwork"];
    (void 0 === glob.defaultVisualisation || visualisations.indexOf(glob.defaultVisualisation) < 0) && (glob.defaultVisualisation = visualisations[0]), console.log("Using default visualisation " + glob.defaultVisualisation), eval(glob.defaultVisualisation + "()"), d3.select("#cloudAll").on("click", function() {
        cloudAll()
    }), d3.select("#cloudSelf").on("click", function() {
        cloudSelf()
    }), d3.select("#barList").on("click", function() {
        barList()
    }), d3.select("#pieList").on("click", function() {
        pieList()
    }), d3.select("#listList").on("click", function() {
        listList()
    }), d3.select("#cloudList").on("click", function() {
        cloudList()
    }), d3.select("#pieNetwork").on("click", function() {
        pieNetwork()
    }), d3.select("#cloudNetwork").on("click", function() {
        cloudNetwork()
    }), d3.select("#graphNetwork").on("click", function() {
        graphNetwork()
    }), console.log("Finished building page"), WebFont.load({
        google: {
            families: ["Ubuntu:500"]
        }
    })
}
