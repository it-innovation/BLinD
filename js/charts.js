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

function clearChart() {
    d3.select("#chart").selectAll("*").remove()
}

function makeBarChart(t, e) {
    clearChart();
    var n = {
            top: 15,
            right: 5,
            bottom: 30,
            left: 40
        },
        i = t.height - n.top - n.bottom,
        r = t.width - n.left - n.right,
        l = d3.scale.linear().domain([0, .25 * e.length, .6 * e.length, .9 * e.length]).range(["#F2D712", "#DD3889", "#4CA6E5", "#568F08"]),
        a = d3.scale.linear().domain([0, d3.max(e, function(t) {
            return t.amount
        })]).range([0, i]),
        o = d3.scale.ordinal().domain(d3.range(0, e.length)).rangeBands([0, r], .25, .25),
        s = d3.select("#chart").append("svg").attr("width", r + n.left + n.right).attr("height", i + n.top + n.bottom).style("background", "#333").append("g").attr("transform", "translate(" + n.left + ", " + n.top + ")").selectAll("rect").data(e).enter().append("rect").style("fill", function(t, e) {
            return l(e)
        }).attr("width", o.rangeBand()).attr("height", 0).attr("x", function(t, e) {
            return o(e)
        }).attr("y", i).on("mouseover", function(e) {
            t.tooltip.style("opacity", .9), t.tooltip.html(e.term.value).style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px"), d3.select(this).transition().duration(0).style("opacity", .5)
        }).on("mouseout", function() {
            t.tooltip.style("opacity", 0), d3.select(this).transition().duration(0).style("opacity", 1)
        });
    s.transition().duration(500).attr("height", function(t) {
        return a(t.amount)
    }).attr("y", function(t) {
        return i - a(t.amount)
    }).delay(function(t, e) {
        return 10 * e
    }).ease("elastic");
    var c = d3.scale.linear().domain([0, d3.max(e, function(t) {
            return t.amount
        })]).range([i, 0]),
        d = d3.svg.axis().scale(c).orient("left").ticks(10),
        u = d3.select("svg").append("g");
    d(u), u.attr("transform", "translate(" + n.left + ", " + n.top + ")"), u.selectAll("path").style({
        fill: "none",
        stroke: "#fff"
    }), u.selectAll("line").style({
        stroke: "#fff"
    }), u.selectAll("text").style({
        fill: "#fff"
    });
    var f = d3.svg.axis().scale(o).orient("bottom").tickValues(o.domain().filter(function(t, n) {
            return !(n % (e.length / 10))
        })),
        p = d3.select("svg").append("g");
    f(p), p.attr("transform", "translate(" + n.left + ", " + (i + n.top) + ")"), p.selectAll("path").style({
        fill: "none",
        stroke: "#fff"
    }), p.selectAll("line").style({
        stroke: "#fff"
    }), p.selectAll("text").style({
        fill: "#fff"
    })
}

function makePieChart(t, e) {
    clearChart();
    var n = 350,
        i = 100,
        r = 20,
        l = d3.scale.category20(),
        a = d3.layout.pie().value(function(t) {
            return t.amount
        }).startAngle(3 * Math.PI / 2).endAngle(Math.PI / 2),
        o = d3.svg.arc().outerRadius(n).innerRadius(i),
        s = d3.svg.arc().outerRadius(n + r).innerRadius(i + r),
        c = d3.select("#chart").append("svg").attr("width", t.width).attr("height", t.height).style("background", "#333").append("g").attr("transform", "translate(" + t.width / 2 + ", 0)").selectAll("path").data(a(e)).enter().append("g").attr("class", "slice");
    c.attr("transform", "translate(0,-" + n + ")").transition().duration(800).ease("bounce").attr("transform", "translate(0,0)").transition().duration(800).ease("bounce");
    d3.selectAll("g.slice").on("mouseover", function(e) {
        t.tooltip.style("opacity", .9), t.tooltip.html(e.data.term.value).style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px"), d3.select(this).select("path").style("opacity", .75).transition().ease("bounce").attr("d", s), d3.select(this).select("text").attr("transform", "translate(" + s.centroid(e) + ")rotate(" + ((e.startAngle + e.endAngle) / 2 / (Math.PI / 180) + 90) + ")").transition().ease("bounce")
    }).on("mouseout", function(e) {
        t.tooltip.style("opacity", 0), d3.select(this).select("path").style("opacity", 1).transition().ease("bounce").attr("d", o), d3.select(this).select("text").attr("transform", "translate(" + o.centroid(e) + ")rotate(" + ((e.startAngle + e.endAngle) / 2 / (Math.PI / 180) + 90) + ")").transition().ease("bounce")
    }).append("path").attr("fill", function(t, e) {
        return l(e)
    }).attr("d", o), d3.selectAll("g.slice").append("text").text(function(t) {
        var e = (t.startAngle - t.endAngle) / (Math.PI / 180);
        return e > 5 ? t.data.term.value : void 0
    }).attr("font-size", "12px").attr("text-anchor", "middle").attr("fill", "#fff").attr("transform", function(t) {
        return t.innerRadius = i, t.outerRadius = n, "translate(" + o.centroid(t) + ")rotate(" + ((t.startAngle + t.endAngle) / 2 / (Math.PI / 180) + 90) + ")"
    })
}

function makeList(t, e) {
    clearChart(), d3.select("#chart").style("background", "#333");
    var n = d3.select("#chart").append("p").style({
        padding: "20px",
        overflow: "auto",
        "max-height": t.height - 40 + "px"
    });
    for (li in e) l = e[li], n.append("a").text(l.affiliation.value.replace("http://dbpedia.org/resource/Category:", "").split("_").join(" ")).attr({
        href: l.affiliation.value,
        "class": "listLink"
    }).attr("target", "_blank")
}

function makeTagCloud(t, e) {
    function n(e) {
        d3.select("#chart").append("svg").attr("width", t.width).attr("height", t.height).style("background", "#333").append("g").attr("transform", "translate(" + (t.width / 2 - i) + "," + (t.height / 2 + i) + ")").selectAll("text").data(e).enter().append("a").attr("xlink:href", function(t) {
            return t.link
        }).attr("target", "_blank").append("text").transition().duration(1500).ease("elastic").style("font-size", function(t) {
            return t.size + "px"
        }).style("font-family", "Ubuntu").style("font-weight", "bold").style("fill", function(t, e) {
            return l(e)
        }).style("opacity", function(t) {
            return t.opacity
        }).attr("text-anchor", "middle").attr("transform", function(t) {
            return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
        }).text(function(t) {
            return t.text
        })
    }
    clearChart();
    var i = 10,
        r = 30,
        l = d3.scale.linear().domain([0, e.length]).range(["#FF7284", "#6CA7FF"]);
    d3.layout.cloud().size([t.width, t.height]).words(e.map(function(t) {
        return {
            text: t.term.value.length > r ? t.term.value.substring(0, r - 3) + "..." : t.term.value,
            size: 16 + 1.3 * t.amount * (.8 / Math.log(t.term.value.length)) * (Math.log(e.length) / 10),
            tooltip: void 0 !== t.term.tooltip ? t.term.tooltip : [],
            link: t.term.key,
            opacity: 1
        }
    })).rotate(function() {
        return 90 * ~~(2 * Math.random())
    }).font("Ubuntu").fontSize(function(t) {
        return t.size
    }).on("end", n).start(), d3.selectAll("text").on("mouseover", function(e) {
        d3.select(this).style("text-shadow", "0px 0px 1px rgba(255, 255, 255, 1)").style("opacity", "1").attr("transform", function(t) {
            return "translate(" + [t.x, t.y] + ")rotate(" + (t.rotate + 2) + ")"
        }), t.tooltip.style("opacity", .9).html(function() {
            return e.tooltip.join("<br />").split(e.text).join("<em>" + e.text + "</em>")
        }).style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px")
    }).on("mouseout", function() {
        d3.select(this).style("text-shadow", "none").style("opacity", function(t) {
            return t.opacity
        }).attr("transform", function(t) {
            return "translate(" + [t.x, t.y] + ")rotate(" + t.rotate + ")"
        }), t.tooltip.style("opacity", 0)
    })
}

function makeGraph(t, e) {
    function i() {
        p.nodes.push({
            index: 0,
            name: t.name,
            group: 0,
            link: t.entity.replace("dbr:", "http://dbpedia.org/resource/"),
            tooltip: {
                relations: [t.name],
                views: []
            },
            children: null,
            fixed: !0,
            x: t.width / 2,
            y: t.height / 2
        }), e.forEach(function(e, n) {
            var i = {},
                r = -1;
            if (p.nodes.forEach(function(t) {
                    return t.name == e.oview.value.replace("http://dbpedia.org/resource/", "").split("_").join(" ") ? void(r = t.index) : void 0
                }), -1 == r) {
                r = n + 1;
                var l = e.oview.value.replace("http://dbpedia.org/resource/", "").split("_").join(" ");
                i = {
                    index: r,
                    name: l,
                    group: r,
                    link: "http://dbpedia.org/resource/" + e.oview.value.replace("http://dbpedia.org/resource/", "").split(" ").join("_"),
                    tooltip: {
                        relations: [l],
                        views: []
                    },
                    children: []
                }, p.nodes.push(i)
            } else p.nodes.forEach(function(t) {
                t.index == r && (i = t)
            });
            null == p.nodes[0].children && (p.nodes[0].children = []), -1 == p.nodes[0].children.indexOf(i) && p.nodes[0].children.push(i);
            var a = -1;
            p.nodes.forEach(function(t, e) {
                t.index == i.index && (a = e)
            }), s(p.nodes[0], p.nodes[a]);
            var o = {},
                c = -1,
                d = -1;
            p.nodes.forEach(function(t, n) {
                t.link == e.object.value && (c = t.index, d = n)
            });
            var u = -1;
            if (-1 == c) o = {
                name: e.object.value.replace("http://dbpedia.org/resource/", "").split("_").join(" "),
                group: a,
                link: e.object.value,
                children: null,
                tooltip: {
                    relations: ['<p class="mainTT">(' + e.object.value.substr(e.object.value.lastIndexOf("/") + 1).split("_").join(" ") + ")-[" + e.relation + "]-(" + t.name + ")</p>"],
                    views: ['<p class="sideTT">' + e.reltype.value + ": " + e.oview.value.substr(e.oview.value.lastIndexOf("/") + 1).split("_").join(" ").trim() + "</p>"]
                }
            }, p.nodes.push(o), u = p.nodes.length - 1, s(p.nodes[a], p.nodes[p.nodes.length - 1]);
            else if (o = p.nodes[d], u = d, d > 0) {
                s(p.nodes[a], p.nodes[d]);
                var f = '<p class="sideTT">' + e.reltype.value + ": " + e.oview.value.substr(e.oview.value.lastIndexOf("/") + 1).split("_").join(" ").trim() + "</p>"; - 1 == p.nodes[d].tooltip.views.indexOf(f) && p.nodes[d].tooltip.views.push(f)
            }
            null == p.nodes[a].children && (p.nodes[a].children = []);
            var h = -1;
            if (p.nodes[a].children.forEach(function(t, e) {
                    t.link == o.link && (h = e)
                }), h > -1) {
                var g = p.nodes[a].children[h],
                    x = g.tooltip;
                for (reli in o.tooltip.relations) rel = o.tooltip.relations[reli], -1 == x.relations.indexOf(rel) && x.relations.push(rel);
                for (vi in o.tooltip.views) v = o.tooltip.views[vi], -1 == x.views.indexOf(v) && x.views.push(v);
                g.tooltip = x
            } else p.nodes[a].children.push(o)
        })
    }

    function r(t) {
        ["expand", "collapse", "toggle"].indexOf(t) < 0 && (t = "toggle");
        for (ni in p.nodes.slice()) {
            n = p.nodes.slice()[ni];
            var e = !1;
            for (n2i in p.nodes.slice()) n2 = p.nodes.slice()[n2i], n2.children && n2.children.indexOf(p.nodes[0]) > -1 && (p.nodes[0].link == n.link, e = !0);
            e || 0 != n.index && p.nodes[0].children.indexOf(n) > -1 && (null != n._children && "expand" == t || null != n.children && "collapse" == t || "toggle" == t) && u(n)
        }
        m = !m, d3.select("#chart").select("div").select("a").text(function() {
            return m ? "Expand all" : "Collapse all"
        })
    }

    function a(e, i) {
        g.nodes(e).links(i).start(), x = x.data(i, function(t) {
            return t.source.index + "-" + t.target.index
        }), x.exit().remove(), x.enter().insert("line", ".node").attr("class", "link").attr("x1", function(t) {
            return t.source.x
        }).attr("y1", function(t) {
            return t.source.y
        }).attr("x2", function(t) {
            return t.target.x
        }).attr("y2", function(t) {
            return t.target.y
        }), y = y.data(e, function(t) {
            return t.index
        }), y.select("a").remove(), y.exit().remove(), y.enter().append("g").attr("class", "node").on("contextmenu", d).call(g.drag), y.append("a").attr("xlink:href", function(t) {
            return t.link
        }).attr("target", "_blank").append("circle").attr("r", function(t) {
            return 0 == t.index ? 15 : 10
        }).style("fill", function(t) {
            var e = 0;
            return e = 0 == t.index ? 0 : t.group % f.length == 0 ? 1 : t.group % f.length, "" + d3.rgb(f[e])
        }).style("stroke", function(t) {
            return t._children ? "#3182bd" : t.children ? "#c6dbef" : "none"
        }).style("stroke-width", "3px"), y.select("a").append("text").attr("dx", function(t) {
            return 0 == t.index ? 25 : 15
        }).attr("dy", ".35em").attr("fill", function(t) {
            var e = 0;
            return e = 0 == t.index ? 0 : t.group % f.length == 0 ? 1 : t.group % f.length, "" + d3.rgb(f[e]).brighter()
        }).text(function(t) {
            return t.name
        }), y.select("a").append("text").style({
            fill: "#333",
            "font-family": '"Courier New", Courier, monospace',
            "font-size": "20px",
            "font-weight": "bold"
        }).attr("dx", "-6px").attr("dy", "6px").text(function(t) {
            if (0 == t.index) return "";
            var e = !1;
            for (ni in p.nodes.slice(1)) n = p.nodes.slice(1)[ni], (null != t._children && t._children.indexOf(n) > -1 || null != t.children && t.children.indexOf(n) > -1) && (e = !0);
            return e ? t._children ? "+" : t.children ? "-" : "" : ""
        }), d3.select("#chart").selectAll("a").on("mouseover", function(e) {
            t.tooltip.style("opacity", .9).html(function() {
                return void 0 !== e && void 0 !== e.tooltip ? e.tooltip.relations.join("") + e.tooltip.views.join("") : ""
            }).style("left", d3.event.pageX + "px").style("top", d3.event.pageY + "px")
        }).on("mouseout", function() {
            t.tooltip.style("opacity", 0)
        }), g.alpha(.03)
    }

    function o(t, e, n) {
        for (var i = 0; i < t.length; i++)
            if (t[i].source.link == e.link && t[i].target.link == n.link) return !0;
        return !1
    }

    function s(t, e) {
        o(p.links, t, e) || p.links.push({
            source: t,
            target: e
        })
    }

    function d(t) {
        if (d3.event.preventDefault(), d3.event.defaultPrevented) {
            if (0 == t.index) return;
            var e = !1;
            for (ni in p.nodes.slice(1)) n = p.nodes.slice(1)[ni], (null != t._children && t._children.indexOf(n) > -1 || null != t.children && t.children.indexOf(n) > -1) && (e = !0);
            e && u(t)
        }
    }

    function u(e) {
        var i = p.nodes.slice(),
            r = p.links.slice(),
            o = !1;
        if (0 != e.index && e.children && null == e._children) {
            e._children = e.children, e.children = null, o = !0;
            var s = [],
                d = [];
            if (0 == e.index) r = [], i = [i[0]];
            else {
                for (ni in i)
                    if (n = i[ni], null == n.children && void 0 !== n._children)
                        for (ci in n._children) {
                            c = n._children[ci];
                            var u = !1;
                            for (n2i in i) {
                                if (n2 = i[n2i], null != n2.children)
                                    for (c2i in n2.children)
                                        if (c2 = n2.children[c2i], c2 == c) {
                                            u = !0;
                                            break
                                        }
                                if (u) break
                            }
                            if (u)
                                for (li in r) l = r[li], l.source == n && l.target == c && d.push(l);
                            else -1 == s.indexOf(c) && s.push(c)
                        }
                    for (ni in s) {
                        n = s[ni], i.splice(i.indexOf(n), 1);
                        for (li in r) l = r[li], l.target == n && d.push(l)
                    }
                for (li in d) l = d[li], r.splice(r.indexOf(l), 1)
            }
        } else if (0 != e.index && e._children) {
            e.children = e._children, e._children = null, o = !0;
            var f = [];
            f.push(i[0]);
            for (ni in i) {
                n = i[ni];
                for (n2i in i.slice()) n2 = i.slice()[n2i], null != n2.children && n2.children.indexOf(n) > -1 && f.push(n)
            }
            i = f;
            var h = [];
            for (li in r) l = r[li], f.indexOf(l.source) > -1 && f.indexOf(l.target) > -1 && null != l.source.children && h.push(l);
            r = h
        }
        o && (t.tooltip.style("opacity", 0), a(i, r))
    }
    clearChart();
    var f = ["#fff", "#ffff77", "#559cd6", "#5dd86b", "#ff8cbf", "#84ffec", "#a191ff", "#ffc775", "#affc67", "#ff7577", "#ecbaff", "#a38e70", "#aaa"],
        p = {
            nodes: [],
            links: []
        },
        h = d3.select("#chart").style("background", "#333").append("svg").attr("width", t.width).attr("height", t.height),
        g = d3.layout.force().linkDistance(80).charge(-500).friction(.6).size([t.width, t.height]).on("tick", function() {
            x.attr("x1", function(t) {
                return t.source.x
            }).attr("y1", function(t) {
                return t.source.y
            }).attr("x2", function(t) {
                return t.target.x
            }).attr("y2", function(t) {
                return t.target.y
            }), y.attr("transform", function(t) {
                return "translate(" + t.x + "," + t.y + ")"
            })
        }),
        x = h.selectAll(".link"),
        y = h.selectAll(".node");
    i(), a(p.nodes, p.links);
    var m = !1;
    r("collapse"), p.nodes.length > 1 && d3.select("#chart").append("div").style({
        left: "5px",
        top: "-25px",
        position: "relative"
    }).append("a").style({
        color: "#ccc",
        "font-size": "14px",
        "font-weight": "bold",
        corsor: "pointer"
    }).text(function() {
        return m ? "Expand all" : "Collapse all"
    }).on("click", function() {
        r(m ? "expand" : "collapse")
    })
}
