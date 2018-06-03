<template>
  <div id="main_div">
  </div>
</template>

<script>
    import * as d3 from 'd3v4'
    export default {
      name: 'main_div',
      data () {
        return {
            email_list:[]
        }
    },
    methods:{
        choose(nodetype){
            this.$emit('nodeselect',nodetype);
        }
    },
    beforeCreate(){
    },
    created(){
    },
    beforeMount(){
    },
    mounted(){
        var that=this;

        function getdata1(){
            var s=0;
            let p=new Promise( (resolve, reject)=>{
             d3.json("../../static/unusual/email_threat.json",function(email_threat){
              that.$store.dispatch('email_threatAction',email_threat);
              s++;
              if (s==7)
                 resolve();
          })
             d3.json("../../static/unusual/web_threat.json",function(web_threat){
                 that.$store.dispatch('web_threat_personAction',web_threat);
                 s++;
                if (s==7)
                 resolve();
             })
             d3.csv("../../static/unusual/sys_email.csv",function(sysemail){
                 that.$store.dispatch('sysemail_Action',sysemail);
                 s++;
                if (s==7)
                 resolve();
             })
             d3.csv("../../static/unusual/login_num_threat.csv",function(login_num){
                 that.$store.dispatch('login_num_Action',login_num);
                 s++;
                if (s==7)
                 resolve();
             })   
             d3.csv("../../static/unusual/tcp_threat.csv",function(tcp_threat){
                 that.$store.dispatch('tcp_threat_Action',tcp_threat);
                 s++;
                if (s==7)
                 resolve();
             })   
            d3.csv("../../static/unusual/tcpLog_threat_holiday.csv",function(tcp_threat_holiday){
                   that.$store.dispatch('tcp_threat_holiday_Action',tcp_threat_holiday);
                   s++;
                if (s==7)
                 resolve();
              })
             d3.csv("../../static/unusual/quit_email.csv",function(quit_email){
                 that.$store.dispatch('quit_email_Action',quit_email);
                 s++;
                if (s==7)
                 resolve();
             }) 
         })
            return p;
        }


function draw(){
    let p=new Promise( (resolve, reject)=>{

        function emailweight(num){
            let max=20;
            let min=0;

            return ((max-min)/(26-1)*(num-1)+min).toFixed(0);
        }
        function webweight(num){
            let max=10;
            let min=0;

            return ((max-min)/(87-1)*(num-1)+min).toFixed(0);
        }

        function quitweight(num){
            let max=30;
            let min=20;

            return ((max-min)/(9-3)*(num-3)+min).toFixed(0);
        }

        function login_numweight(num){
            let max=50;
            let min=30;

            return ((max-min)/(27-5)*(num-5)+min).toFixed(0);
        }

        function tcpweight(num){
            let max=120;
            let min=30;

            return ((max-min)/(3178-0)*(num-0)+min).toFixed(0);
        }

        let email_threat=that.$store.getters.getemail_threat;
        let web_threat=that.$store.getters.getweb_threat;
        let login_num=that.$store.getters.getlogin_num;
        let tcp_threat=that.$store.getters.gettcp_threat;
        let tcp_threat_holiday=that.$store.getters.gettcp_threat_holiday;
        let quit_email=that.$store.getters.getquit_email;

        let threat_data=[];
        threat_data["email"]=[];
        threat_data["web"]=[];
        threat_data["sysemail"]=[];
        threat_data["sysemail"].push(["2017-11-28 10:00",100])
        threat_data["sysemail"].push(["2017-11-16 20:00",80])

        //???????????????????????????????????????????????????????
        threat_data["login_num"]=[];
        threat_data["tcp_threat"]=[];
        threat_data["tcp_threat_holiday"]=[];
        threat_data["quit_email"]=[];
//--------------------------------------------------------
for (let key in email_threat) {
    threat_data["email"].push([key,emailweight(email_threat[key].length)])
}

for (let key in web_threat) {
    threat_data["web"].push([key,webweight(web_threat[key].length)])
}

var re=[];
login_num.forEach(function(item){
    let t=new Date(item.day).format("yyyy-MM-dd")
    if (re[t]==undefined)
        re[t]=0;
    re[t]+=Number(item.num);
})
for (let key in re)
    threat_data["login_num"].push([key,login_numweight(re[key])])


re=[];
tcp_threat.forEach(function(item){
    let t=new Date(item.stime).format("yyyy-MM-dd")
    if (re[t]==undefined)
        re[t]=0;
    re[t]+=(Number(item.uplink_length)/1024/1024+Number(item.downlink_length)/1024/1024);
})

for (let key in re)
    threat_data["tcp_threat"].push([key,tcpweight(re[key])])



re=[];
tcp_threat_holiday.forEach(function(item){
    let t=new Date(item.stime).format("yyyy-MM-dd")
    if (re[t]==undefined)
        re[t]=0;
    re[t]+=(Number(item.uplink_length)/1024/1024+Number(item.downlink_length)/1024/1024);
})

for (let key in re)
    threat_data["tcp_threat_holiday"].push([key,tcpweight(re[key])])


re=[];
quit_email.forEach(function(item){
    let t=new Date(item.time).format("yyyy-MM-dd")
    if (re[t]==undefined)
        re[t]=0;
    re[t]++;
})

for (let key in re)
    threat_data["quit_email"].push([key,quitweight(re[key])])
//--------------------------------------------------------

var dom = document.getElementById("main_div");
var myChart = that.$echarts.init(dom);
var app = {};
var option = null;

/*            var data = [["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]];*/

option = {
    legend:{
        data:['人员流量异常','数据库流量异常','数据库登陆异常','系统警报邮件','离职主题邮件','招聘主题邮件','招聘主题网站'],
        bottom:0,
        align:"left",
        textStyle:{
            color:"white"
        }
    },
    textStyle:{
        color:"white"
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    xAxis: {
        position:{
            bottom:200
        },
        type: 'time',
        axisLine:{
            lineStyle:{
                color:"grey"
            }
        },
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        splitNumber: 10
    },
    yAxis: {
        position:{
            left:0
        },
        type: 'value',
        axisLine:{
            lineStyle:{
                color:"grey"
            }
        },
        splitLine: {
            lineStyle: {
                type: 'dashed'
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
        handleSize: '80%',
        handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
        },
        dataBackground:{  
            lineStyle:{
                color:"white"
            },
            areaStyle:{
                color:"white"
            }
        }
    }],
    series: [
    {
        id:"gettcp_threat_holiday",
        name:"人员流量异常",
        type: 'effectScatter',
        symbol:'path://m500,96.9c-274,0 -494.7,9.4 -489.9,20.8c27.6,65 477,785.5 489.9,785.5c12.9,0 462.3,-720.4 489.9,-785.5c4.8,-11.5 -215.9,-20.8 -489.9,-20.8l0,0z',
        symbolSize: 10,
        color:"red",
        markPoint:{
            symbol:'pin',
        },
        data: threat_data["tcp_threat_holiday"]
    },
    {
        id:"gettcp_threat",
        name:"数据库流量异常",
        type: 'effectScatter',
        symbol:'path://m990,500c0,270.6 -219.4,490 -490,490c-270.6,0 -490,-219.4 -490,-490s219.4,-490 490,-490c270.6,0 490,219.4 490,490z',
        symbolSize: 10,
        color:"orange",
        markPoint:{
            symbol:'pin',
        },
        data: threat_data["tcp_threat"]
    },
    {
        id:"getlogin_num",
        name:"数据库登陆异常",
        type: 'effectScatter',
        symbol:'path://m920,10l-840,0c-38.6,0 -70,31.4 -70,70l0,840c0,38.6 31.4,70 70,70l840,0c38.7,0 70,-31.3 70,-70l0,-840c0,-38.6 -31.3,-70 -70,-70z',
        symbolSize: 10,
        color:"yellow",
        markPoint:{
            symbol:'pin',
        },
        data: threat_data["login_num"]
    },
    {
        id:"getsysemail",
        name:"系统警报邮件",
        type: 'effectScatter',
        symbol:'path://m2931.5,-637.7c-1853.5,-2237.5 -2032.7,-2462.7 -1966.2,-2544.7c41,-46.1 957.5,-1146.9 2037.8,-2442.4c1075.3,-1295.3 1976.4,-2355.2 1996.9,-2355.2c20.5,0 921.6,1059.9 1996.9,2355.3c1080.3,1295.4 1996.9,2396.3 2037.8,2442.4c66.6,81.9 -112.7,307.2 -1966.2,2544.7c-1126.4,1351.6 -2053.1,2457.6 -2068.5,2457.6c-15.3,0 -942.1,-1106 -2068.5,-2457.7z',
        symbolSize: 10,
        color:"green",
        markPoint:{
            symbol:'pin',
        },
        data: threat_data["sysemail"]
    },
    {
        id:"getquit_email",
        name:"离职主题邮件",
        type: 'effectScatter',
        symbol:'path://m918.5,850.5c-23.8,-69.3 -64.7,-121 -64.7,-121c-83.9,-112.1 -196.5,-142.7 -196.5,-142.7c0,0 0,0 0,0c91.9,-53.7 153.6,-153.3 153.6,-267.4c0,-170.8 -138.5,-309.4 -309.5,-309.4c-170.9,0 -309.4,138.6 -309.4,309.5c0,110.6 58,207.6 145.2,262.3c0,0 0,0 0,0c-89.3,28.9 -150.7,89.8 -150.7,89.8c-67,62.1 -94.3,127.8 -94.3,127.8c-41.9,88.1 -36.9,162.9 -36.9,162.9c15.3,23.9 34,23.9 34,23.9c114.2,6.8 822,2.3 822,2.3c21.7,-2 33.6,-27.5 33.6,-27.5c-5.3,-54.8 -26.4,-110.5 -26.4,-110.5z',
        symbolSize: 10,
        color:"blue",
        markPoint:{
            symbol:'pin',
        },
        data: threat_data["quit_email"]
    },
    {
        id:"getweb_threat",
        name:"招聘主题网站",
        type: 'scatter',
        symbol:'path://m918.5,850.5c-23.8,-69.3 -64.7,-121 -64.7,-121c-83.9,-112.1 -196.5,-142.7 -196.5,-142.7c0,0 0,0 0,0c91.9,-53.7 153.6,-153.3 153.6,-267.4c0,-170.8 -138.5,-309.4 -309.5,-309.4c-170.9,0 -309.4,138.6 -309.4,309.5c0,110.6 58,207.6 145.2,262.3c0,0 0,0 0,0c-89.3,28.9 -150.7,89.8 -150.7,89.8c-67,62.1 -94.3,127.8 -94.3,127.8c-41.9,88.1 -36.9,162.9 -36.9,162.9c15.3,23.9 34,23.9 34,23.9c114.2,6.8 822,2.3 822,2.3c21.7,-2 33.6,-27.5 33.6,-27.5c-5.3,-54.8 -26.4,-110.5 -26.4,-110.5z',
        symbolSize: 10,
        color:"#76F5D1",
        markPoint:{
            symbol:'pin',
        },
        data: threat_data["web"]
    },
        {
        id:"getemail_threat",
        name:"招聘主题邮件",
        type: 'scatter',
        symbol:'path://m918.5,850.5c-23.8,-69.3 -64.7,-121 -64.7,-121c-83.9,-112.1 -196.5,-142.7 -196.5,-142.7c0,0 0,0 0,0c91.9,-53.7 153.6,-153.3 153.6,-267.4c0,-170.8 -138.5,-309.4 -309.5,-309.4c-170.9,0 -309.4,138.6 -309.4,309.5c0,110.6 58,207.6 145.2,262.3c0,0 0,0 0,0c-89.3,28.9 -150.7,89.8 -150.7,89.8c-67,62.1 -94.3,127.8 -94.3,127.8c-41.9,88.1 -36.9,162.9 -36.9,162.9c15.3,23.9 34,23.9 34,23.9c114.2,6.8 822,2.3 822,2.3c21.7,-2 33.6,-27.5 33.6,-27.5c-5.3,-54.8 -26.4,-110.5 -26.4,-110.5z',
        symbolSize: 10,
        color:"#76E4F5",
        markPoint:{
            symbol:'pin',
        },
        data: threat_data["email"]
    }/*, {
                    name: 'line',
                    type: 'line',
                    showSymbol: false,
                    smooth: true,
                    data: data,
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'left',
                                formatter: data,
                                textStyle: {
                                    color: '#333',
                                    fontSize: 14
                                }
                            }
                        },
                        data: [{
                            coord: data
                        }]
                    },
                }*/],
                grid:{
                  top:"1%",
                  bottom:"10%",
                  left:"5%",
                  right:"1%"    
                }
            };
            ;
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

            myChart.on('click', function (params) {
               that.choose(params)
           });

        })
return p;
}
getdata1()
/*.then(getdata2)
.then(getdata3)
.then(getdata4)
.then(getdata5)
.then(getdata6)*/
.then(draw);

}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#main_div{
    height: 100%;
    width: 100%;
}
</style>
