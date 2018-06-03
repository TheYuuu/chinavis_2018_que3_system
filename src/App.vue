 <template>
  <div id="app">
    <div id="Inf_view1">
      <div id="sys_email">
        <mysysemail ref="mysysemail"></mysysemail>  
        <mydatabase ref="mydatabase"  @nodeselect="nodeselect"></mydatabase>
      </div>
    </div>
    <div id="main_view">
      <maindiv @nodeselect="nodeselect"></maindiv>
    </div>

    <div id="Inf_view2">
      <check ref="check"></check>
      <div class="Double_view">
          <mydetails ref="mydetails"></mydetails>
          <logandquit ref="logandquit"></logandquit>
      </div>
      
      <mytextdetails ref="mytextdetails"></mytextdetails>
    </div>

    <div id="Inf_view3">
      <radar ref="radar"></radar>
      <liuliang ref="liuliang"></liuliang>
      <graph ref="graph" @grahpselect="grahpselect"></graph>
    </div>

  </div>
</template>

<script>
  import * as d3 from 'd3v4'
  import maindiv from './components/main'
  import mydatabase from './components/database'
  import mydetails from './components/details'
  import mytextdetails from './components/text_detail'
  import mysysemail from './components/sys_email'

  import radar from './components/radar'
  import liuliang from './components/liuliang'
  import graph from './components/graph3'
  import check from './components/check'
  import logandquit from './components/logandquit'

  export default {
    name: 'App',
    data(){
      return {
      }
    },
    components:{
      maindiv,
      mydetails,
      mysysemail,
      mytextdetails,
      mydatabase,
      radar,
      liuliang,
      graph,
      check,
      logandquit
    },
    methods:{
      Inf_select(node){
        console.log(node);
      },
      nodeselect(node){
        this.$refs.mytextdetails.Inf_change(node) 
        if (node.seriesId=="getweb_threat" || node.seriesId=="getemail_threat")
            this.$refs.mydetails.Inf_change(node)  
        else if (node.seriesId=="getsysemail")
          this.$refs.mysysemail.change(new Date(node.value[0]).format("dd:hh")) 
        else if (node.seriesId=="gettcp_threat")
          this.$refs.graph.change(node) 
        else if (node.seriesId=="gettcp_threat_holiday")
          {
            this.$refs.graph.change(node) 
            this.$refs.check.change(node)
          }
        else if (node.seriesId=="getlogin_num" || node.seriesId=="getquit_email")
           this.$refs.logandquit.change(node) 
        else if(node.seriesId=="databaseup" || node.seriesId=="databasedown")
        {
           this.$refs.radar.change(node)
        }

      },
      grahpselect(params){
        this.$refs.liuliang.change(params)
      }
    },
    beforeCreate(){
    },
    created(){
    },
    beforeMount(){
      var that=this;
     
    },
    mounted(){
    }
  }
</script>

<style>
html{
  height:100%;
  width: 100%;
}
body{
  background-color: #303243;
  height:100%;
  width: 100%;
}
*{
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
#app{
  width: 100%;
  height:100%;
}
#main_view{
  width: 50%;
  height: 70%;
  border: 1px solid  #9A2EFE;
  float:left;
}
#Inf_view2{
  width: 25%;
  height: 70%;
  border: 1px solid  #9A2EFE;
  float:right;
}

#Inf_view1{
  width: 25%;
  height: 70%;
  border: 1px solid  #9A2EFE;
  float:left;
}

#Inf_view3{
  clear:both;
  width: 100%;
  height: 30%;
  border: 1px solid  #9A2EFE;
}

#sys_email{
  width: 100%;
  height: 100%;
}

.Double_view{
  width: 100%;
  height: 40%;
  border: 1px solid  #9A2EFE;
  border-left: none;
}
</style>