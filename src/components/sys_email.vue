<template>
  <div id="sysemail_div">
  </div>
</template>

<script>
  import * as d3 from 'd3v4'

  export default {
    data() {
      return {
        option:{},
        myChart:{},
        ifdetail:false,
        d:[],
        daydata:[]
      }
    },
    computed:{
    },
    methods:{
      change(day){
/*        this.CreatChart(this.getDa2());
        this.myChart.setOption(this.option)
        this.ifdetail=false;*/
        if( this.ifdetail==false){
          this.CreatChart(this.getDa1(day.split(":")[0]));

          if (day.split(":")[0]==16)
          {
            this.option.legend.selected["安全邮件崩溃"]=false;
            this.option.legend.selected["ALARM"]=false;
            this.option.legend.selected["RECOVER"]=false;
            this.option.legend.selected["互联网资产监控报警"]=false;
            this.option.legend.selected["数据库安全警报"]=true;
          }
          if (day.split(":")[0]==28)
          {
            this.option.dataZoom[0].end=15
            this.option.dataZoom[0].start=5
          }
          this.ifdetail=true;
          this.myChart.setOption(this.option)
        }
      },
      getDa2(){
        let that=this;
        let database =[];
        let R = [];
        let A = [];
        let net = []
        let anquan =[];
        let str = "2017/11/"
        let xaxis=[];

          for(let i = 0;i<30;i++){//一个月每天

            database[i]=[str+(i+1).toString(),0];
            anquan[i]=[str+(i+1).toString(),0];
            R[i]=[str+(i+1).toString(),0];
            A[i]=[str+(i+1).toString(),0];
            net[i]=[str+(i+1).toString(),0];
            xaxis[i]=str+(i+1).toString();
          }


          for(let i = 0;i<that.d.length;i++){
            let ds = (new Date(that.d[i].time)).getDate()-1
            if(that.d[i].subject=='安全邮件崩溃'){

              anquan[ds][1]++;

            }else if(that.d[i].subject=='互联网资产监控报警'){

              net[ds][1]++;
            }
            else if(that.d[i].subject=='EmergencyDataBaseFatalError!'){

              database[ds][1]++;
            }else if(that.d[i].subject.indexOf("ALARM") != -1 ){

              A[ds][1]++;
            }else{

              R[ds][1]++;
            }
          }
          let data2 =[]
          data2[0]=anquan;
          data2[1]=net;
          data2[2]=database;
          data2[3]=A;
          data2[4]=R;
          data2[5]=xaxis;
          return data2;
        },
        getDa1(day){
          let that=this;
          return that.daydata[day];
        },
        CreatChart(datass){
          let that=this;
          that.option =  {
            backgroundColor: '#303243',
            tooltip: {
              trigger: 'axis',
              confine:true
            },
            legend: {
              data:['安全邮件崩溃','ALARM','RECOVER','互联网资产监控报警','数据库安全警报'],
              textStyle: {
                color: '#fff'
              },
              bottom:0,
              selected: {  
                '安全邮件崩溃': true,  
                'ALARM': true,  
                'RECOVER': true,  
                '互联网资产监控报警': true,  
                '数据库安全警报': true,  
            }  
            },
            grid: {
              left: '1%',
              right: '1%',
              top: '3%',
              containLabel: true
            },

            yAxis: {
              type: 'value',
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'white'
                }
              }
            },
            dataZoom: [{
              show:false,
              type: 'inside',
              start: 0,
              end: 100
            }, {
              show:false,
              start: 0,
              end: 100,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '30%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            }],
            toolbox: {
              bottom:0,
              show: true,
              itemSize:20,
              feature:
              { mark:
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
                    that.CreatChart(that.getDa2());
                    that.ifdetail=false;
                    that.myChart.setOption(that.option)
                  }

                }
              }
            },
            xAxis: {
              type:'time',
              boundaryGap: false,
              data:datass[5],
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'white'
                }
              }
            },

            series: [
            {
              name:'安全邮件崩溃',
              type:'line',
                  // stack: '总量',
                  data:datass[0],
                  lineStyle:{
                    normal: {
                      color:'#BBFFFF',
                      width: 1,

                    }
                  }
                },
                {
                  name:'ALARM',
                  type:'line',
                  // stack: '总量',
                  data:datass[3],
                  lineStyle:{
                    normal: {
                      color:'#FF0000',
                      width: 1,

                    }
                  }

                },
                {
                  name:'RECOVER',
                  type:'line',
                  // stack: '总量',
                  data:datass[4],
                  lineStyle:{
                    normal: {
                      color:'#FFFF00',
                      width: 1,

                    }
                  }
                },
                {
                  name:'互联网资产监控报警',
                  type:'line',
                  // stack: '总量',
                  data:datass[1],
                  lineStyle:{
                    normal: {
                      color:'#20B2AA',
                      width: 1,

                    }
                  }
                },
                {
                  name:'数据库安全警报',
                  type:'line',
                  //stack: '总量',
                  data:datass[2],
                  lineStyle:{
                    normal: {
                      color:'#FFDEAD',
                      width: 1,
                    }
                  }
                }

                ]
              }
            }
          },
          mounted(){
            d3.json("../../static/filter/sys_email.json",function(da){
               that.daydata=da.data
             });

            let that=this;
            function Getdata()
            {
              let p=new Promise( (resolve, reject)=>{
               d3.csv("../../static/unusual/sys_email.csv",function(da){
                that.d=da;
                resolve();
             });
             })

              return p;
            }
            function draw()
            {
              let p=new Promise( (resolve, reject)=>{

                that.ifdetail = false;

                let dom = document.getElementById("sysemail_div");
                that.myChart = that.$echarts.init(dom);

                let app = {};

                that.CreatChart(that.getDa2())

                that.myChart.setOption(that.option)
                window.onresize =  that.myChart.resize;

                that.myChart.on('click', function (params) {
                  if( that.ifdetail==false){
                    that.CreatChart(that.getDa1(params.dataIndex+1));
                    that.ifdetail=true;
                    that.myChart.setOption(that.option)
                  }
                })
                resolve()
              })

              return p;
            }
            Getdata().then(draw)

          }
        }
      </script>


      <style scoped>
      #sysemail_div{
        width: 100%;
        height: 40%;
        border-bottom: 1px solid  #9A2EFE;
      }
    </style>
