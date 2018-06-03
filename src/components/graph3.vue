<template>
  <div id="graph">
    <p style="color:#ccc;font-size:18px;font-family: sans-serif;font-weight: bolder;">TCP流量关系</p>
    <svg style="width: 100%;height:100%"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3v4'
  export default {
    data() {
      return {
        myChart:{},
        option:{},
        choosed:{}
      }
    },
    computed:{
    },
    methods:{
      choose(params){
          this.$emit('grahpselect',params);
      },
      go_back(){
              d3.json("../../static/oridata/depart_server.json",function(graph){
       var re = [];
       for(var i = 0;i<graph.links.length;i++){
           if(re[graph.links[i].source]==undefined){
               re[graph.links[i].source]=[]
           }
           if(re[graph.links[i].source][graph.links[i].target]==undefined){
             re[graph.links[i].source][graph.links[i].target]=0
         }
         re[graph.links[i].source][graph.links[i].target]+=Number(graph.links[i].value);
       }
        var datas=[]
        var k =0;
        for (let k1 in re){
           for (let k2 in re[k1]){
              datas.push({source:k1,target:k2,value:Number(re[k1][k2])})
           }
        }

        var units = "Widgets";
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 10, bottom: 10, left: 10},
          width = document.getElementById("graph").offsetWidth*0.95,
          height = document.getElementById("graph").offsetHeight*0.85
        // format variables
        var formatNumber = d3.format(",.0f"),    // zero decimal places
          format = function(d) { return formatNumber(d) + " " + units; },
          color = d3.scaleOrdinal(d3.schemeCategory20);
        // append the svg object to the body of the page

        d3.select("#graph").select("svg").select("g").remove();
        var svg = d3.select("#graph").select("svg")
          .append("g")
        /*            .attr("transform",
         "translate(" + margin.left + "," + margin.top + ")");*/

        var sankey = d3.sankey()
          .nodeWidth(20)
          .nodePadding(2)
          .size([width, height]);

        var path = sankey.link();
        // load the data
        sankey
          .nodes(graph.nodes)
          .links(datas)
          .layout(10);

        // add in the links
        var link = svg.append("g").selectAll(".link")
          .data(datas)
          .enter().append("path")
          .attr("class", "link")
          .attr("d", path)
          .style("stroke-width", function(d) {return Math.max(1, d.dy); })

          .sort(function(a, b) { return b.dy - a.dy; });
        // add the link titles
        link.append("title")
          .text(function(d) {
            return d.source.name + " → " +
              d.target.name + "\n" + format(d.value); });
        // add in the nodes
        var node = svg.append("g").selectAll(".node")
          .data(graph.nodes)
          .enter().append("g")
          .attr("class", "node")
          .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")"; })
          .call(d3.drag()
            .subject(function(d) {
              return d;
            })
            .on("start", function() {
              this.parentNode.appendChild(this);
            })
            .on("drag", dragmove));
        // add the rectangles for the nodes
        node.append("rect")
          .attr("height", function(d) {return d.dy; })
          .attr("width", sankey.nodeWidth())
          .on("mousedown",function(d){
            that.choose({day:that.choosed.value[0],ip:d.name})
          })
          .style("fill", function(d) {
            return d.color = color(d.name.replace(/ .*/, "")); })
          .style("stroke", function(d) {
            return d3.rgb(d.color).darker(2); })
          .append("title")
          .text(function(d) {
            if (d.targetLinks.length==0)
            {
              var show="Ip: "+d.name+"\n"+"T0: ";
              d.sourceLinks.forEach(function(item){
                show+=item.target.name+"\n";
              })
            }
            else{
              var show="Ip: "+d.name+"\n"+"From: ";
              d.sourceLinks.forEach(function(item){
                show+=item.source.name+"\n";
              })
            }

            return show;

          })


        // add in the title for the nodes
        node.append("text")
          .style("opacity",function(d){
            return d.value>1?1:0;
          })
          .attr("x", -6)
          .attr("y", function(d) { return d.dy / 2; })
          .attr("dy", ".35em")
          .attr("text-anchor", "end")
          .attr("transform", null)
          .text(function(d) { return d.name; })
          .filter(function(d) { return d.x < width / 2; })
          .attr("x", 6 + sankey.nodeWidth())
          .attr("text-anchor", "start")

        // the function for moving the nodes
        function dragmove(d) {
          d3.select(this)
            .attr("transform",
              "translate("
              + d.x + ","
              + (d.y = Math.max(
                  0, Math.min(height - d.dy, d3.event.y))
              ) + ")");
          sankey.relayout();
          link.attr("d", path);
        }
      })
      },
      change(node){
      //  d3.json("../../static/oridata/depart_server.json",function(data){

         // let graph=data;
         let all=0;
       this.choosed=node
        var that=this;
        let x=this.$store.getters[node.seriesId];
        let t=[];

        for (let i=0;i<x.length;i++)
        {
          if (new Date(x[i].stime.split(" ")[0]).format("yyyy-MM-dd")==new Date(node.value[0]).format("yyyy-MM-dd"))
              t.push(x[i])

        }


        let graph={};
        graph.nodes=[];
        graph.links=[];

        let re=[];
        let nodeid=[];
        for (let i=0;i<t.length;i++)
        {

          var t1=t[i].sip;
          var t2=t[i].dip;
          var t3=t[i].proto;

          if (re[t1]==undefined)
            re[t1]=[];
          if (re[t1][t3]==undefined)
            re[t1][t3]=[];
          if (re[t1][t3][t2]==undefined)
            re[t1][t3][t2]=0;

           re[t1][t3][t2]+=Number(t[i].downlink_length)/1024/1024/1024+Number(t[i].uplink_length)/1024/1024;
           all+=Number(t[i].downlink_length)/1024/1024+Number(t[i].uplink_length)/1024/1024;
           nodeid.push(t[i].sip)
           nodeid.push(t[i].dip)
           nodeid.push(t[i].proto)
        }

        nodeid=Array.from(new Set(nodeid));

        var color = d3.scaleOrdinal(d3.schemeCategory20c);
        let nodex=[];
        for (let i=0;i<nodeid.length;i++)
          {
            graph.nodes.push({node:i,name:nodeid[i]});
            nodex[nodeid[i]]=i;
          }

      for (let k1 in re){
        for (let k2 in re[k1]){
          for (let k3 in re[k1][k2]){
            graph.links.push({source:nodex[k1],target:nodex[k2],value:re[k1][k2][k3]})
            graph.links.push({source:nodex[k2],target:nodex[k3],value:re[k1][k2][k3]})
          }
        }
      }

        var units = "Widgets";
        // set the dimensions and margins of the graph
        var margin = {top: 10, right: 10, bottom: 10, left: 10},
            width = document.getElementById("graph").offsetWidth*0.95,
            height = document.getElementById("graph").offsetHeight*0.85
        // format variables
        var formatNumber = d3.format(",.0f"),    // zero decimal places
            format = function(d) { return formatNumber(d) + " " + units; },
            color = d3.scaleOrdinal(d3.schemeCategory20);
        // append the svg object to the body of the page

        d3.select("#graph").select("svg").select("g").remove();
        var svg = d3.select("#graph").select("svg")
          .append("g")
/*            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");*/

          var sankey = d3.sankey()
            .nodeWidth(20)
            .nodePadding(2)
            .size([width, height]);

        var path = sankey.link();
        // load the data
        sankey
              .nodes(graph.nodes)
              .links(graph.links)
              .layout(10);
        // add in the links
          var link = svg.append("g").selectAll(".link")
              .data(graph.links)
            .enter().append("path")
              .attr("class", "link")
              .attr("d", path)
              .style("stroke-width", function(d) { return Math.max(1, d.dy); })

              .sort(function(a, b) { return b.dy - a.dy; });
        // add the link titles
          link.append("title")
                .text(function(d) {
                return d.source.name + " → " +
                        d.target.name + "\n" + format(d.value); });
        // add in the nodes
          var node = svg.append("g").selectAll(".node")
              .data(graph.nodes)
            .enter().append("g")
              .attr("class", "node")
              .attr("transform", function(d) {
              return "translate(" + d.x + "," + d.y + ")"; })
              .call(d3.drag()
                .subject(function(d) {
                  return d;
                })
                .on("start", function() {
                  this.parentNode.appendChild(this);
                })
                .on("drag", dragmove));
        // add the rectangles for the nodes
          node.append("rect")
              .attr("height", function(d) {return d.dy; })
              .attr("width", sankey.nodeWidth())
              .on("mousedown",function(d){
                that.choose({day:that.choosed.value[0],ip:d.name})
              })
              .style("fill", function(d) {
              return d.color = color(d.name.replace(/ .*/, "")); })
              .style("stroke", function(d) {
              return d3.rgb(d.color).darker(2); })
            .append("title")
              .text(function(d) {
                if (d.targetLinks.length==0)
                {
                   var show="Ip: "+d.name+"\n"+"T0: ";
                  d.sourceLinks.forEach(function(item){
                    show+=item.target.name+"\n";
                  })
                }
                else{
                  var show="Ip: "+d.name+"\n"+"From: ";
                  d.sourceLinks.forEach(function(item){
                    show+=item.source.name+"\n";
                  })
                }

              return show;

            })


        // add in the title for the nodes
          node.append("text")
                .style("opacity",function(d){
                  return d.value/all>0.00001?1:0;
              })
              .attr("x", -6)
              .attr("y", function(d) { return d.dy / 2; })
              .attr("dy", ".35em")
              .attr("text-anchor", "end")
              .attr("transform", null)
              .text(function(d) { return d.name; })
             .filter(function(d) { return d.x < width / 2; })
              .attr("x", 6 + sankey.nodeWidth())
              .attr("text-anchor", "start")

        // the function for moving the nodes
          function dragmove(d) {
            d3.select(this)
              .attr("transform",
                    "translate("
                       + d.x + ","
                       + (d.y = Math.max(
                          0, Math.min(height - d.dy, d3.event.y))
                         ) + ")");
            sankey.relayout();
            link.attr("d", path);
          }

        //})
    }
    },
    mounted(){
      this.go_back();

      //-----------------------------------------------------------------------------------------------------------------------

      d3.sankey = function() {
  var sankey = {},
      nodeWidth = 24,
      nodePadding = 8,
      size = [1, 1],
      nodes = [],
      links = [];

  sankey.nodeWidth = function(_) {
    if (!arguments.length) return nodeWidth;
    nodeWidth = +_;
    return sankey;
  };

  sankey.nodePadding = function(_) {
    if (!arguments.length) return nodePadding;
    nodePadding = +_;
    return sankey;
  };

  sankey.nodes = function(_) {
    if (!arguments.length) return nodes;
    nodes = _;
    return sankey;
  };

  sankey.links = function(_) {
    if (!arguments.length) return links;
    links = _;
    return sankey;
  };

  sankey.size = function(_) {
    if (!arguments.length) return size;
    size = _;
    return sankey;
  };

  sankey.layout = function(iterations) {
    computeNodeLinks();
    computeNodeValues();
    computeNodeBreadths();
    computeNodeDepths(iterations);
    computeLinkDepths();
    return sankey;
  };

  sankey.relayout = function() {
    computeLinkDepths();
    return sankey;
  };

  sankey.link = function() {
    var curvature = .5;

    function link(d) {
      var x0 = d.source.x + d.source.dx,
          x1 = d.target.x,
          xi = d3.interpolateNumber(x0, x1),
          x2 = xi(curvature),
          x3 = xi(1 - curvature),
          y0 = d.source.y + d.sy + d.dy / 2,
          y1 = d.target.y + d.ty + d.dy / 2;
      return "M" + x0 + "," + y0
           + "C" + x2 + "," + y0
           + " " + x3 + "," + y1
           + " " + x1 + "," + y1;
    }

    link.curvature = function(_) {
      if (!arguments.length) return curvature;
      curvature = +_;
      return link;
    };

    return link;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks() {
    nodes.forEach(function(node) {
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    links.forEach(function(link) {
      var source = link.source,
          target = link.target;

/*      if (typeof source === "number") {*/
        source = nodes[link.source];
        link.source = nodes[link.source];
/*      }*/
/*      if (typeof target === "number") {*/
        target = nodes[link.target];
        link.target = nodes[link.target];
/*      }*/
        source.sourceLinks.push(link);
        target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues() {
    nodes.forEach(function(node) {
      node.value = Math.max(
        d3.sum(node.sourceLinks, value),
        d3.sum(node.targetLinks, value)
      );
    });
  }

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths() {
    var remainingNodes = nodes,
        nextNodes,
        x = 0;

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function(node) {
        node.x = x;
        node.dx = nodeWidth;
        node.sourceLinks.forEach(function(link) {
          if (nextNodes.indexOf(link.target) < 0) {
            nextNodes.push(link.target);
          }
        });
      });
      remainingNodes = nextNodes;
      ++x;
    }

    //
    moveSinksRight(x);
    scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
  }

  function moveSourcesRight() {
    nodes.forEach(function(node) {
      if (!node.targetLinks.length) {
        node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
      }
    });
  }

  function moveSinksRight(x) {
    nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(kx) {
    nodes.forEach(function(node) {
      node.x *= kx;
    });
  }

  function computeNodeDepths(iterations) {
    var nodesByBreadth = d3.nest()
        .key(function(d) { return d.x; })
        .sortKeys(d3.ascending)
        .entries(nodes)
        .map(function(d) { return d.values; });

    //
    initializeNodeDepth();
    resolveCollisions();
    for (var alpha = 1; iterations > 0; --iterations) {
      relaxRightToLeft(alpha *= .99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth() {
      var ky = d3.min(nodesByBreadth, function(nodes) {
        return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
      });

      nodesByBreadth.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y = i;
          node.dy = node.value * ky;
        });
      });

      links.forEach(function(link) {
        link.dy = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      nodesByBreadth.forEach(function(nodes, breadth) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedSource(link) {
        return center(link.source) * link.value;
      }
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth.slice().reverse().forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.sourceLinks.length) {
            var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
            node.y += (y - center(node)) * alpha;
          }
        });
      });

      function weightedTarget(link) {
        return center(link.target) * link.value;
      }
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(function(nodes) {
        var node,
            dy,
            y0 = 0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y0 - node.y;
          if (dy > 0) node.y += dy;
          y0 = node.y + node.dy + nodePadding;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y0 - nodePadding - size[1];
        if (dy > 0) {
          y0 = node.y -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + nodePadding - y0;
            if (dy > 0) node.y -= dy;
            y0 = node.y;
          }
        }
      });
    }

    function ascendingDepth(a, b) {
      return a.y - b.y;
    }
  }

  function computeLinkDepths() {
    nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
    });
    nodes.forEach(function(node) {
      var sy = 0, ty = 0;
      node.sourceLinks.forEach(function(link) {
        link.sy = sy;
        sy += link.dy;
      });
      node.targetLinks.forEach(function(link) {
        link.ty = ty;
        ty += link.dy;
      });
    });

    function ascendingSourceDepth(a, b) {
      return a.source.y - b.source.y;
    }

    function ascendingTargetDepth(a, b) {
      return a.target.y - b.target.y;
    }
  }

  function center(node) {
    return node.y + node.dy / 2;
  }

  function value(link) {
    return link.value;
  }

  return sankey;
};
    }
  }
</script>


<style scoped>
#graph{
  float:right;
  width: 25%;
  height: 100%;
  padding: 5px;
}
</style>
