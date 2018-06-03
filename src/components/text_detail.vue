<template>
  <div class="Inf_div">
    <el-table
    :data="tabledata"
    height="100%"
    border
    style="width: 100%"
    row-class-name="row_item"
    @row-click="select">

  <template v-for="item in list">
    <el-table-column
      :prop="item.prop"
      :label="item.label"
      max-height="10px">
    </el-table-column>
<!--     <el-table-column
      prop="time"
      label="日期"
      width="90%"
      max-height="10px">
    </el-table-column>

    <el-table-column
      prop="id"
      label="工号"
      width="50%">
    </el-table-column>

    <el-table-column
      prop="position"
      label="职位">
    </el-table-column>

    <el-table-column
      prop="host"
      label="访问网站">
    </el-table-column> -->
  </template>

  </el-table>
  </div>
</template>

<script>
    import * as d3 from 'd3v4'
  export default {
    data() {
      return {
        tableData:[],
        listname:[]
      }
    },
    computed:{
      tabledata(){
        return this.tableData;
      },
      list(){
        return this.listname;
      }
    },
    methods:{
      select(row){
       this.$emit('Inf_select',row);
      },
      Inf_change(node){
        this.listname=[];
        this.tableData=[];
        let that=this;
        if (node.seriesId=="getweb_threat")
        {
          let t=this.$store.getters[node.seriesId][node.value[0]]
          t.sort(com)
          this.listname.push({prop:"time",label:"日期"});
          this.listname.push({prop:"id",label:"工号"});
          this.listname.push({prop:"position",label:"职位"});
          this.listname.push({prop:"host",label:"访问域名"});

          this.tableData=t;
        }
        else if (node.seriesId=="getemail_threat")
        {
          let t=this.$store.getters[node.seriesId][node.value[0]]
          t.sort(com)
          this.listname.push({prop:"time",label:"日期"});
          this.listname.push({prop:"id",label:"工号"});
          this.listname.push({prop:"subject",label:"主题"});
          this.listname.push({prop:"position",label:"职位"});

          this.tableData=t;
        }
        else if (node.seriesId=="getquit_email")
        {
          let t=this.$store.getters[node.seriesId]
          let re=[];
          for (let i=0;i<t.length;i++)
          {
            if (new Date(t[i].time.split(" ")[0]).format("yyyy-MM-dd")==new Date(node.value[0]).format("yyyy-MM-dd"))
                re.push({from:t[i].from,to:t[i].to,time:t[i].time,subject:t[i].subject})

          }
          this.listname.push({prop:"time",label:"日期"});
          this.listname.push({prop:"from",label:"发件人"});
          this.listname.push({prop:"to",label:"收件人"});
          this.listname.push({prop:"subject",label:"主题"});
          this.tableData=re;
        }
        else if (node.seriesId=="getsysemail")
        {
          d3.csv("../../static/unusual/abnormal_sys_email_threat.csv",function(data){
              let re=[];
              for (let i=0;i<data.length;i++)
              {
                if (new Date(data[i].time.split(" ")[0]).format("yyyy-MM-dd")==new Date(node.value[0]).format("yyyy-MM-dd"))
                    re.push({from:data[i].from,time:data[i].time,counts:data[i].num});
              }
              that.listname.push({prop:"time",label:"日期"});
              that.listname.push({prop:"from",label:"发件人"});
              that.listname.push({prop:"counts",label:"次数"});
              that.tableData=re;
          })
        }
        else if (node.seriesId=="getlogin_num")
        {
          d3.csv("../../static/log_error_details.csv",function(t){
            let re=[];
              for (let i=0;i<t.length;i++)
              {
                if (new Date(t[i].stime.split(" ")[0]).format("yyyy-MM-dd")==new Date(node.value[0]).format("yyyy-MM-dd"))
                    re.push({sip:t[i].sip,dip:t[i].dip,time:t[i].stime,proto:t[i].proto,state:"error"})
              }
              that.listname.push({prop:"time",label:"日期"});
              that.listname.push({prop:"sip",label:"源IP"});
              that.listname.push({prop:"dip",label:"目的IP"});
              that.listname.push({prop:"proto",label:"协议"});
              that.listname.push({prop:"state",label:"状态"});
              that.tableData=re;
          })
        }
        else if (node.seriesId=="gettcp_threat" || node.seriesId=="gettcp_threat_holiday")
        {
          let re=[];
          let t=this.$store.getters[node.seriesId];
          for (let i=0;i<t.length;i++)
          {
            if (new Date(t[i].stime.split(" ")[0]).format("yyyy-MM-dd")==new Date(node.value[0]).format("yyyy-MM-dd"))
              re.push({time:t[i].stime,dip:t[i].dip,sip:t[i].sip,downlink_length:(Number(t[i].downlink_length)/1024/1024).toFixed(2),
                uplink_length:(Number(t[i].uplink_length)/1024/1024).toFixed(2),proto:t[i].proto})
          }
          this.listname.push({prop:"time",label:"日期"});
          this.listname.push({prop:"sip",label:"源IP"});
          this.listname.push({prop:"dip",label:"目标IP"});
          this.listname.push({prop:"proto",label:"协议"});
          this.listname.push({prop:"downlink_length",label:"下载流量/MB"});
          this.listname.push({prop:"uplink_length",label:"上传流量/MB"});

          re.sort(com2);
          this.tableData=re;

        }


        function com(ob1,ob2)
        {
          if (ob1.position>ob2.position)
            return -1;
          else if(ob1.position<ob2.position)
            return 1;
          else
            return 0;
        }
        function com2(ob1,ob2)
        {
          if (ob1.downlink_length>ob2.downlink_length)
            return -1;
          else if(ob1.downlink_length<ob2.downlink_length)
            return 1;
          else
            return 0;
        }
    }
    }
  }
</script>


<style type="text/css">
.Inf_div{
  width: 100%;
  height: 30%;
}

.row_item{
  font-size: 5px;
}

.el-table td, .el-table th{
  padding:0;
  background-color: #303243;
  color:grey;
}
.el-table__body-wrapper{
    background-color: #303243;
}
</style>