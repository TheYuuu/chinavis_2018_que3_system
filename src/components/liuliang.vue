<template>
  <div id="liuliang">
  </div>
</template>

<script>
  import * as d3 from 'd3v4'
  export default {
    data() {
      return {
        myChart:{},
        option:{}
      }
    },
    computed:{
    },
    methods:{
      change(params)
      {
        var that=this;
        d3.csv("../../static/filter/liuliang/"+params.ip+"/"+params.day+".csv",function(error,data){
         if (data.length==0 || data[0]["<!DOCTYPE html>"]!=undefined) {
          that.$notify({
            title: 'Record not found !!!',
            type: 'error'
          });
          return ;
        }
        else{
          that.myChart.showLoading();
          data.sort(com);

          that.option.series[0].data=data.map(function(item){
            let t=item.stime;
            let s=(Number(item.downlink_length)/1024/1024).toFixed(2);
            return [t,s]
          })

          that.option.series[1].data=data.map(function(item){
            let t=item.stime;
            let s=(Number(item.uplink_length)/1024/1024).toFixed(2);
            return [t,s]
          })

          that.option.title.text=params.ip+"-"+params.day+"  TCP流量/MB"

          that.myChart.setOption(that.option, true);

          that.myChart.hideLoading();

        function com(ob1,ob2){
          if (new Date(ob1.stime)>new Date(ob2.stime))
            return 1;
          else if (new Date(ob1.stime)<new Date(ob2.stime))
            return -1;
          else return 0;
        }
      }
      })
      },
      goback(){

        var that=this;
        d3.csv("../../static/oridata/tcp_day.csv",function(data){
          that.myChart.hideLoading();
          var app = {};
          that.option = {
            title: {
              text: 'TCP流量记录/GB',
              top:"2%",
              left:"center",
              textStyle: {
                color: '#ccc'
              },
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                animation: false
              }
            },
            toolbox: {
              bottom:0,
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
                },
                myTool2:
                {
                  ifshow:false,
                  show: true,
                  icon: 'path://m500,295.8c-112.7,0 -204.2,91.4 -204.2,204.2c0,112.7 91.4,204.2 204.2,204.2s204.2,-91.4 204.2,-204.2c0,-112.8 -91.5,-204.2 -204.2,-204.2l0,0zm0,-204.2c-248.1,0 -429.3,182.5 -490,408.4c60.4,224.2 241.9,408.4 490,408.4c248.1,0 429,-182.8 490,-408.4c-60,-224.9 -241.9,-408.4 -490,-408.4l0,0zm0,735.1c-203,0 -358.9,-147.3 -408.4,-326.7c49.7,-180.7 205.4,-326.7 408.4,-326.7c203,0 359.3,146.7 408.4,326.7c-49.9,180.4 -205.4,326.7 -408.4,326.7l0,0z',
                  onclick: function() {
                     that.option.toolbox.feature.myTool2.icon=that.option.toolbox.feature.myTool2.ifshow==true?
                     'path://m837.2,689.4l-130.2,-130.1c10.2,-25.4 16,-52.6 16,-81.6c0,-123 -99.9,-222.8 -222.9,-222.8c-29,0 -56.1,5.8 -81.5,16l-96.3,-96.3c55.3,-20 115,-31.2 177.4,-31.2c222.8,0 413.1,138.5 490.2,334.2c-32.4,83 -85.4,155.7 -152.7,211.8zm-336.5,-344.9c74,0 133.7,59.7 133.7,133.7l-0.9,7.1l-140.4,-140.4l7.6,-0.4zm344,578.9l-130.6,-130.2l-18.7,-18.7c-60.2,24.1 -126.1,37.5 -195.2,37.5c-222.8,0 -413.1,-138.6 -490.2,-334.3c34.7,-88.3 92.7,-164.9 166.7,-222.4l-20.6,-20.5l-101.5,-101.6l56.6,-56.6l790.2,790.1l-56.7,56.7zm-315.5,-315.6c-9.4,2.3 -19.1,3.6 -29,3.6c-73.9,0 -133.7,-59.7 -133.7,-133.7c0,-9.9 1.3,-19.6 3.6,-29l-69.1,-69.1c-14.7,29.9 -23.6,62.9 -23.6,98.1c0,123 99.8,222.8 222.8,222.8c35.2,0 68.2,-8.9 98.1,-23.6l-69.1,-69.1z':
                     'path://m500,295.8c-112.7,0 -204.2,91.4 -204.2,204.2c0,112.7 91.4,204.2 204.2,204.2s204.2,-91.4 204.2,-204.2c0,-112.8 -91.5,-204.2 -204.2,-204.2l0,0zm0,-204.2c-248.1,0 -429.3,182.5 -490,408.4c60.4,224.2 241.9,408.4 490,408.4c248.1,0 429,-182.8 490,-408.4c-60,-224.9 -241.9,-408.4 -490,-408.4l0,0zm0,735.1c-203,0 -358.9,-147.3 -408.4,-326.7c49.7,-180.7 205.4,-326.7 408.4,-326.7c203,0 359.3,146.7 408.4,326.7c-49.9,180.4 -205.4,326.7 -408.4,326.7l0,0z';

                     if (that.option.toolbox.feature.myTool2.ifshow==true)
                     {
                      that.option.series[0].symbol="none";
                      that.option.series[1].symbol="none";
                     }
                     else{
                      that.option.series[0].symbol="emptyCircle";
                      that.option.series[1].symbol="emptyCircle";
                     }

                    that.option.toolbox.feature.myTool2.ifshow=!that.option.toolbox.feature.myTool2.ifshow

                    that.myChart.setOption(that.option, true);

                  }
                }
              }
            },
            axisPointer: {
              link: {xAxisIndex: 'all'}
            },
            grid: [{
              top:"10%",
              left: 50,
              right: 50,
              height: '40%'
            }, 
            {
              left: 50,
              right: 50,
              top: '50%',
              height: '40%'
            }],
            xAxis : [
            {
              splitLine:{
                show:false
              },
              type : 'time',
              boundaryGap : false,
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'white'
                }
              }
            },
            {
              show:false,
              gridIndex: 1,
              type : 'time',
              boundaryGap : false,
              axisLine: {onZero: true},
              position: 'top',
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'white'
                }
              }
            }
            ],
            yAxis : [
            {
              splitLine:{
                show:false
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'white'
                }
              },
              name : '下载流量',
              type : 'value',
            },
            {
              gridIndex: 1,
              name : '上传流量',
              type : 'value',
              inverse: true,
              splitLine:{
                show:false
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'white'
                }
              }
            }
            ],
            series : [
            {
              smooth: true,
              symbol:"none",
              name:'上传流量',
              type:'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              symbolSize: 8,
              hoverAnimation: false,
              lineStyle:{
                color:"#F54B2A"
              },
              data:data.map(function(item){
                let t=item.stime;
                let s=(Number(item.uplink_length)/1024/1024/1024).toFixed(2);
                return [t,s]
              })
            },
            {
              smooth: true,
              symbol:"none",
              symbolSize:1,
              name:'下载流量',
              type:'line',
              symbolSize: 8,
              hoverAnimation: false,
              lineStyle:{
                color:"#78D6FF"
              },
              data:data.map(function(item){
                let t=item.stime;
                let s=(Number(item.downlink_length)/1024/1024/1024).toFixed(2);
                return [t,s]
              })
            },

            ]
          };
          if (that.option && typeof that.option === "object") {
            that.myChart.setOption(that.option, true);
          }
        })
      }
    },
    mounted(){
      var dom = document.getElementById("liuliang");
      this.myChart = this.$echarts.init(dom);
      this.goback();
    }
  }
</script>


<style scoped>
#liuliang{
  float:left;
  width: 50%;
  height: 100%;
  border-right:1px solid  #9A2EFE;
}
</style>