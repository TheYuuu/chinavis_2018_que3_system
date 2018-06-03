<template>
  <div id="logandquit">
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
      change(node){

        let data={};
        data.nodes=[];
        data.links=[];
        var that=this;
        let t=this.$store.getters[node.seriesId];
        var re=[];
        for (let i=0;i<t.length;i++)
        {
          if (node.seriesId=="getlogin_num" && t[i].day==node.value[0])
            {
              if (re[t[i].user]!=1)
                {
                  re[t[i].user]=1
                  data.nodes.push({name:t[i].user})
                }
              if (re[t[i].dip]!=1)
                {
                  re[t[i].dip]=1
                  data.nodes.push({name:t[i].dip})
                }

              data.links.push({
                source: t[i].user,
                target: t[i].dip,
                symbolSize: [5, 20],
                label: {
                    normal: {
                        show: true
                    }
                },
                lineStyle: {
                    normal: {
                        width: 5,
                        curveness: 0.2
                    }
                }
            })
            }
          else if(node.seriesId=="getquit_email" && new Date(t[i].time.split(" ")[0]).format("yyyy-MM-dd")==new Date(node.value[0]).format("yyyy-MM-dd"))
            {
              if (re[t[i].from]!=1)
                {
                  re[t[i].from]=1
                  data.nodes.push({name:t[i].from})
                }
              if (re[t[i].to]!=1)
                {
                  re[t[i].to]=1
                  data.nodes.push({name:t[i].to})
                }

              data.links.push({
                source: t[i].from,
                target: t[i].to,
                symbolSize: [5, 20],
                lineStyle: {
                    normal: {
                        width: 5,
                        curveness: 0.2
                    }
                }
            })

            }
        }
        data.nodes=Array.from(new Set(data.nodes));
      that.option = {
          title: {
              text: '相关联系',
              left:"2%",
              top: 0,
              textStyle: {
                  color: '#ccc'
              }
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
              {
                  type: 'graph',
                  layout: 'force',
                  force: {
                      // initLayout: 'circular'
                      // gravity: 0
                      repulsion: 1000,
                      edgeLength: 250
                  },
                  symbolSize: 50,
                  roam: true,
                  label: {
                      normal: {
                          show: true
                      }
                  },
                  edgeSymbol: ['circle', 'arrow'],
                  edgeSymbolSize: [4, 10],
                  edgeLabel: {
                      normal: {
                          textStyle: {
                              fontSize: 20
                          }
                      }
                  },
                  data: data.nodes,
                  // links: [],
                  links: data.links,
                  lineStyle: {
                      normal: {
                          opacity: 0.9,
                          width: 2,
                          curveness: 0
                      }
                  }
              }
          ]
      };

        that.myChart.setOption(that.option, true);
    }
    },
    mounted(){
      let that=this;
      let dom = document.getElementById("logandquit");
      that.myChart = that.$echarts.init(dom);

      that.option = {
          title: {
              text: '相关联系',
              left:"2%",
              top: 0,
              textStyle: {
                  color: '#ccc'
              }
          },
          tooltip: {},
          animationDurationUpdate: 1500,
          animationEasingUpdate: 'quinticInOut',
          series : [
              {
                  type: 'graph',
                  layout: 'force',
                  force: {
                      // initLayout: 'circular'
                      // gravity: 0
                      repulsion: 1000,
                      edgeLength: 250
                  },
                  symbolSize: 50,
                  roam: true,
                  label: {
                      normal: {
                          show: true
                      }
                  },
                  edgeSymbol: ['circle', 'arrow'],
                  edgeSymbolSize: [4, 10],
                  edgeLabel: {
                      normal: {
                          textStyle: {
                              fontSize: 20
                          }
                      }
                  },
                  data: [],
                  // links: [],
                  links: [],
                  lineStyle: {
                      normal: {
                          opacity: 0.9,
                          width: 2,
                          curveness: 0
                      }
                  }
              }
          ]
      };
        that.option.series.data=[];
        that.option.series.links=[];
      if (that.option && typeof that.option === "object") {
          that.myChart.setOption(that.option, true);
      }


    that.myChart.on('click', function (params) {
         that.choose({day:that.choosed.value[0],ip:params.name})
     });
    }
  }
</script>


<style scoped>
#logandquit{
  float: right;
  width: 50%;
  height: 100%;
  border: 1px solid  #9A2EFE;
  border-left: none;
}
</style>