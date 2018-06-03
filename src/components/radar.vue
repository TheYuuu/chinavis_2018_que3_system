<template>
  <div id="radar">
  </div>
</template>

<script>
  import * as d3 from 'd3v4'
  export default {
    data() {
      return {
        myChart:{},
        option:{},
        d:[],
      }
    },
    computed:{
    },
    methods:{
      change(data1){
          var day = data1.data[0]
        var hours = data1.data[1]
          if(day>=10&&hours>=10){
            var strS ="2017-11-"+data1.data[0].toString()+"_"+data1.data[1].toString()+".csv";
          } else if(day>=10&&hours<10){
              var strS ="2017-11-"+data1.data[0].toString()+"_0"+data1.data[1].toString()+".csv";
          }else if(day<10&&hours<10){
            var strS ="2017-11-0"+data1.data[0].toString()+"_0"+data1.data[1].toString()+".csv";
          }else if(day<10&&hours>=10){
            var strS ="2017-11-0"+data1.data[0].toString()+"_"+data1.data[1].toString()+".csv";
          }
        this.Getdata(strS);

      },

      goback(){
        let danwei="GB"
        let that=this;
        let app = {};
        that.option = {
        textStyle:{
          color: '#ccc'
        },
        title: {
          text: '协议种类:流量'+"/"+danwei,
          left:"2%",
          textStyle:{
            color:"white"
          }
        },
        tooltip: {
          textStyle:{
            color:"white"
          }
        },
        legend: {
          left:"2%",
          top:"10%",
          orient:"vertical",
          data: ['下载流量', '上传流量'],
          textStyle:{
            color:"white"
          }
        },
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
                      that.goback()
                      that.myChart.setOption(that.option)
                    }

                  }
              }
          },
        radar: {
          center:['60%','50%'],
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
          { name: 'MYSQL',max:3560},
          { name: 'POSTGRESQL',max:3560},
          { name: 'MONGODB',max:3560},
          { name: 'TDS',max:3560},
          { name: 'SMTP',max:3560},
          { name: 'HTTP',max:3560},
          { name: 'SSH',max:3560},
          { name: 'ftp',max:3560},
          { name: 'SFTP',max:3560},

          ]
        },
        series: [{
          name: '下载流量',
          type: 'radar',
            // areaStyle: {normal: {}},
            data : [
            {
              value : [872.15, 836.22, 876.49, 879.25, 1,1408,3560.39,844.86,858.02],
              name : '下载流量'
            }
            ]
          },
          {
          name: '上传流量',
          type: 'radar',
            // areaStyle: {normal: {}},
            data : [
            {
              value : [868.95, 852.88, 866.66, 874.68, 1,14.06,3569.38,856.71,872.08],
              name : '上传流量'
            }
            ]
          }]
        };
        if (that.option && typeof that.option === "object") {
          that.myChart.setOption(that.option, true);
        }

      }
    },
    mounted(){
      let that=this;
      this.Getdata=function(strS){


          d3.csv("../../static/oridata/tcp_hour/"+strS,function(database){
            that.d=database;

            var data1=[];
            var data2=[];
            for(var i = 0;i<database.length;i++){
              data1[i]=0;
              data2[i]=0;
            }
            for(var i = 0;i<database.length;i++){

              if(database[i].proto=='mysql'){
                data1[0]=(database[i].uplink_length/1024/1024).toFixed(2)
                data2[0]=(database[i].downlink_length/1024/1024).toFixed(2)
              }
              else if(database[i].proto=='postgresql'){
                data1[1]=(database[i].uplink_length/1024/1024).toFixed(2)
                data2[1]=(database[i].downlink_length/1024/1024).toFixed(2)
              }
              else if(database[i].proto=='mongodb'){
                data1[2]=(database[i].uplink_length/1024/1024).toFixed(2)
                data2[2]=(database[i].downlink_length/1024/1024).toFixed(2)
              }
              else if(database[i].proto=='tds'){
                data1[3]=(database[i].uplink_length/1024/1024).toFixed(2)
                data2[3]=(database[i].downlink_length/1024/1024).toFixed(2)
              }
              else if(database[i].proto=='smtp'){
                data1[4]=(database[i].uplink_length/1024/1024).toFixed(2)
                data2[4]=(database[i].downlink_length/1024/1024).toFixed(2)
              }
              else if(database[i].proto=='http'){
                data1[5]=(database[i].uplink_length/1024/1024).toFixed(2)
                data2[5]=(database[i].downlink_length/1024/1024).toFixed(2)
              }
              else if(database[i].proto=='ssh'){
                data1[6]=(database[i].uplink_length/1024/1024).toFixed(2)
                data2[6]=(database[i].downlink_length/1024/1024).toFixed(2)
              }
              else if(database[i].proto=='ftp'){
                data1[7]=(database[i].uplink_length/1024/1024).toFixed(2)
                data2[7]=(database[i].downlink_length/1024/1024).toFixed(2)
              }
              else if(database[i].proto=='sftp'){
                data1[8]=(database[i].uplink_length/1024/1024).toFixed(2)
                data2[8]=(database[i].downlink_length/1024/1024).toFixed(2)
              }
            }

            var maxdata1 = parseInt(Math.max.apply(null, data1))+1
            var maxdata2 = parseInt(Math.max.apply(null, data2))+1
            if(maxdata1< maxdata2){
              maxdata1 = maxdata2;
            }

            for(var i = 0;i<9;i++){
              that.option.radar.indicator[i].max= maxdata1;
            }
            that.option.title.text='协议种类:流量'+"/"+"MB"
           that.option.series[0].data[0].value=data2
            that.option.series[1].data[0].value=data1
            that.myChart.setOption(that.option)


          });



      }







      let dom = document.getElementById("radar");
      that.myChart = that.$echarts.init(dom);

     that.goback();
      }
    }
  </script>


  <style scoped>
  #radar{
    float:left;
    width: 25%;
    height: 100%;
    border-right:1px solid  #9A2EFE;
  }
</style>
