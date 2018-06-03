<template>
  <div id="Inf_div">

  </div>
</template>

<script>
    import * as d3 from 'd3v4'
  export default {
    data() {
      return {
        option:{},
        myChart:{}
      }
    },
    computed:{
    },
    methods:{
      goback(){
        var that=this;
       d3.json("../../static/unusual/email_threat.json",function(t){
        let re=[];
        let namelist=[];
        for (let key in t)
        {
          for (let i=0;i<t[key].length;i++){
              let po=t[key][i].id;
              if (namelist[po]==undefined)
                namelist[po]=[];
              namelist[po].push(t[key][i].id)

              if (re[po]==undefined)
                re[po]=0;
              re[po]++;
          }
        }
        let data=[];
        var color = d3.scaleOrdinal(d3.schemeCategory20c);
          for (let key in re)
          {
            data.push({name:key,value:re[key],itemStyle:{color:color(key)}})
          }


          that.option = {
          title: {
              text: "招聘邮件统计",
              left:"2%",
              top: 0,
              textStyle: {
                  color: '#ccc'
              }
          },
          grid:{
            top:"5%",
            bottom:"2%",
            left:"2%",
            tight:"2%",
          },
          tooltip : {
              trigger: 'item',
              formatter: function (params, ticket, callback) {
                let them=Array.from(new Set(namelist[params.name]));
                let show=params.name+":  "+params.value+" "+params.percent+"%"+"<br/>";
                them.forEach(function(item){
                  show+=String(item)+"<br/>"
                })

                return show
              }
          },
          series : [
              {
                  name:"招聘邮件统计",
                  type:'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:data.sort(function (a, b) { return a.value - b.value; }),
                  roseType: 'radius',
                  label: {
                      confine:true,
                      position:"inner",
                      normal: {
                          textStyle: {
                              color: 'white'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          lineStyle: {
                              color: 'rgba(255, 255, 255, 0.3)'
                          },
                          smooth: 0.2,
                          length: 2,
                          length2: 5
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: '#c23531',
                          shadowBlur: 200,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  },

                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                      return Math.random() * 200;
                  }
              }
          ]
      };

          that.myChart.setOption(that.option, true)
      })
      },
        Inf_change(node){
          var that=this;
           this.myChart.hideLoading();
          let data=[];
          let t=this.$store.getters[node.seriesId][node.value[0]]
          let re=[];
          let namelist=[];
          for (let i=0;i<t.length;i++){
            let po=t[i].position.split("_")[0]+"_"+t[i].position.split("_")[1];
            if (namelist[po]==undefined)
              namelist[po]=[];
            namelist[po].push(t[i].id)

            if (re[po]==undefined)
              re[po]=0;
            re[po]++;
          }

          var color = d3.scaleOrdinal(d3.schemeCategory20c);
          for (let key in re)
          {
            let c=key.split(" ")[0]
            data.push({name:key,value:re[key],itemStyle:{color:color(c)}})
          }

          this.option = {
          title: {
              text: node.seriesName,
              left:"2%",
              top: 0,
              textStyle: {
                  color: '#ccc'
              }
          },
          grid:{
            top:"5%",
            bottom:"2%",
            left:"2%",
            tight:"2%",
          },
          tooltip : {
              trigger: 'item',
              formatter: function (params, ticket, callback) {
                let them=Array.from(new Set(namelist[params.name]));
                let show=params.name+":  "+params.value+" "+params.percent+"%"+"<br/>";
                them.forEach(function(item){
                  show+=String(item)+"<br/>"
                })

                return show
              }
          },
          series : [
              {
                  name:node.seriesName,
                  type:'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:data.sort(function (a, b) { return a.value - b.value; }),
                  roseType: 'radius',
                  label: {
                      confine:true,
                      position:"inner",
                      normal: {
                          textStyle: {
                              color: 'white'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          lineStyle: {
                              color: 'rgba(255, 255, 255, 0.3)'
                          },
                          smooth: 0.2,
                          length: 2,
                          length2: 5
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: '#c23531',
                          shadowBlur: 200,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  },

                  animationType: 'scale',
                  animationEasing: 'elasticOut',
                  animationDelay: function (idx) {
                      return Math.random() * 200;
                  }
              }
          ],
          toolbox: {
              bottom:5,
              show: true,
              itemSize:20,
              feature:
              { 
                mark:
                {
                  show: true
                },
                magicType:
                {
                  show: true
                },
                myTool1:
                {
                  show: true,
                  icon: 'path://m817,306.8l-155.2,0c-72.6,0 -25.3,-112.8 -25.3,-112.8l-0.2,0.2c21.7,-50.6 12,-111.4 -29.3,-152.7c-54.1,-54.1 -141.9,-54.1 -196,0l-360.4,360.5c-26,26 -40.6,61.2 -40.6,98c0,36.8 14.6,72 40.6,98l360.5,360.5c27.1,27 62.6,40.6 98,40.6c35.4,0 71,-13.5 98,-40.6c41.3,-41.3 51,-102 29.3,-152.5l0.1,0.1c0,0 -47.4,-112.8 25.3,-112.8l-1.2,-0.1l156.4,0c95.5,0 173,-77.4 173,-172.9l0,-40.5c0,-95.6 -77.4,-173 -173,-173z',
                  onclick: function() {
                      that.goback();
                  }
                }
              }
            }
      }
          this.myChart.setOption(this.option, true)

      }
    },
    mounted(){
      var that=this;
      var dom = document.getElementById("Inf_div");
      that.myChart = that.$echarts.init(dom);

      that.goback();
    }
  }
</script>


<style scoped>
#Inf_div{
  float: right;
  width: 50%;
  height: 100%;
  border: 1px solid  #9A2EFE;
  border-left: none;
}
</style>