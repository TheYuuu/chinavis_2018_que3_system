<template>
  <div id="data_div">

  </div>
</template>

<script>
    import * as d3 from 'd3v4'
  export default {
    data() {
      return {
        option:{},
        myChart:{},
        d:[],
      }
    },
    computed:{

    },
    methods:{
      choose1(dataday1){
        this.$emit('nodeselect',dataday1);
      },
      getData(){

        let that=this;
          let axis={"x":["2017/11/1","2017/11/2","2017/11/3","2017/11/4","2017/11/5","2017/11/6","2017/11/7","2017/11/8","2017/11/9","2017/11/10","2017/11/11","2017/11/12","2017/11/13","2017/11/14","2017/11/15","2017/11/16","2017/11/17","2017/11/18","2017/11/19","2017/11/20","2017/11/21","2017/11/22","2017/11/23","2017/11/24","2017/11/25","2017/11/26","2017/11/27","2017/11/28","2017/11/29","2017/11/30"],"y":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]}

          let xaxis=[];
          let yaxis=[];

          for (let i=0;i<axis.x.length;i++)
            xaxis[axis.x[i]]=i+1;
          for (let i=0;i<axis.y.length;i++)
            yaxis[axis.y[i]]=i;

          let updata=[];
          let downdata=[];
          for (let i=0;i<that.d.length;i++)
          {
            let up=Number(that.d[i].downlink_length)/1024/1024;
            let down=Number(that.d[i].uplink_length)/1024/1024;
            updata.push([ xaxis[that.d[i].day], yaxis[that.d[i].hour], up])
            downdata.push([ xaxis[that.d[i].day], yaxis[that.d[i].hour], down])
          }
          let dataS = [];
          dataS[0]= xaxis;
            dataS[1]=yaxis;
              dataS[2]= updata;
                dataS[3]=downdata;
                return dataS;
        },
      CreatChart(dataS){
        let that=this;
        var hours = dataS[0].x;
        var days = dataS[1].y;
        that.option = {
          legend: {
            selectedMode:'single',
            data:['数据库上传流量','数据库下载流量'],
            textStyle: {
              color: '#fff'
            },
            bottom:0,
            selected: {
              '数据库上传流量': true,
              '数据库下载流量': false,
            }
          },
          grid:{
            top:"1%",
            bottom:"12%",
            left:"6%",
            right:"1%"
          },
          tooltip: {
            show:true,
            position: 'top',
            formatter: function (params, ticket, callback) {
              return "Day: "+params.value[0]+"<br/>"+"Hour: "+params.value[1]+"<br/>"+"流量: "+Number(params.value[2]).toFixed(2)+"MB"
            }
          },
          animation: true,
          xAxis: {
            type: 'category',
            data: hours,
            axisLine:{
              lineStyle:{
                color:"white"
              }
            },
            splitArea: {
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: days,
            axisLine:{
              lineStyle:{
                color:"white"
              }
            },
            splitArea: {
              show: true
            }
          },
          visualMap: {
            show:false,
            min: 0,
            max: 40000,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
          },
          series: [{
            id:"databaseup",
            name: '数据库上传流量',
            type: 'heatmap',
            data:dataS[2],
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
            {
              id:"databasedown",
              name: '数据库下载流量',
              type: 'heatmap',
              data: dataS[3],
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }]
        };
      }

    },
    mounted(){
      let that=this;
      function Getdata()
      {
        let p=new Promise( (resolve, reject)=>{
          d3.csv("../../static/oridata/database_day.csv",function(database_day){
            that.d=database_day;

            resolve();
          });
        })

        return p;
      }
      function draw()
      {
        let p=new Promise( (resolve, reject)=>{



          let dom = document.getElementById("data_div");
          that.myChart = that.$echarts.init(dom);

          let app = {};

          that.CreatChart(that.getData())

          that.myChart.setOption(that.option)
          window.onresize =  that.myChart.resize;

          that.myChart.on('click', function (params) {
             /* var days = "2017-11-"+params.data[0].toString()
            var hours= params.data[1]
           that.choose1(days,hours)*/

            that.choose1(params)
          })
          resolve()
        })

        return p;
      }
      Getdata().then(draw)
    /*  var that=this;
      d3.csv("../../static/oridata/database_day.csv",function(database_day){
        var axis={"x":["2017/11/1","2017/11/2","2017/11/3","2017/11/4","2017/11/5","2017/11/6","2017/11/7","2017/11/8","2017/11/9","2017/11/10","2017/11/11","2017/11/12","2017/11/13","2017/11/14","2017/11/15","2017/11/16","2017/11/17","2017/11/18","2017/11/19","2017/11/20","2017/11/21","2017/11/22","2017/11/23","2017/11/24","2017/11/25","2017/11/26","2017/11/27","2017/11/28","2017/11/29","2017/11/30"],"y":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]}

        var xaxis=[];
        var yaxis=[];

        for (let i=0;i<axis.x.length;i++)
          xaxis[axis.x[i]]=i;
        for (let i=0;i<axis.y.length;i++)
          yaxis[axis.y[i]]=i;

        var updata=[];
        var downdata=[];
        for (let i=0;i<database_day.length;i++)
        {
          let up=Number(database_day[i].downlink_length)/1024/1024;
          let down=Number(database_day[i].uplink_length)/1024/1024;
          updata.push([ xaxis[database_day[i].day], yaxis[database_day[i].hour], up])
          downdata.push([ xaxis[database_day[i].day], yaxis[database_day[i].hour], down])
        }

      var dom = document.getElementById("data_div");
      that.myChart = that.$echarts.init(dom);
      var app = {};
      that.option = null;
      app.title = '笛卡尔坐标系上的热力图';

      var hours = axis.x;
      var days = axis.y;

      that.option = {
        legend: {
          selectedMode:'single',
          data:['数据库上传流量','数据库下载流量'],
          textStyle: {
            color: '#fff'
          },
          bottom:0,
          selected: {
            '数据库上传流量': true,
            '数据库下载流量': false,
        }
        },
        grid:{
          top:"1%",
          bottom:"12%",
          left:"6%",
          right:"1%"
        },
        tooltip: {
              show:true,
              position: 'top',
              formatter: function (params, ticket, callback) {
                return "Day: "+params.value[0]+"<br/>"+"Hour: "+params.value[1]+"<br/>"+"流量: "+Number(params.value[2]).toFixed(2)+"MB"
              }
          },
          animation: true,
          xAxis: {
              type: 'category',
              data: hours,
              axisLine:{
                  lineStyle:{
                      color:"white"
                  }
              },
              splitArea: {
                  show: true
              }
          },
          yAxis: {
              type: 'category',
              data: days,
              axisLine:{
              lineStyle:{
              color:"white"
              }
              },
              splitArea: {
                  show: true
              }
          },
          visualMap: {
            show:false,
              min: 0,
              max: 40000,
              calculable: true,
              orient: 'horizontal',
              left: 'center',
              bottom: '15%'
          },
          series: [{
              name: '数据库上传流量',
              type: 'heatmap',
              data: updata,
              label: {
                  normal: {
                      show: false
                  }
              },
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          },
          {
              name: '数据库下载流量',
              type: 'heatmap',
              data: downdata,
              label: {
                  normal: {
                      show: false
                  }
              },
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }]
      };
if (that.option && typeof that.option === "object") {
    that.myChart.setOption(that.option, true);
}

      })*/

    }
  }
</script>


<style scoped>
#data_div{
  width: 100%;
  height: 60%;
}
</style>
