<template>
    <div>
        <div>
            <div>
                <p style="margin-left: 50px;margin-bottom:20px;font-size:16px;">
                    <!-- <img :src="headImg" v-if="headHidden" style="vertical-align: middle"> -->
                   姓名：{{personInfo.realName}}
                </p>
                <table id="personinfo">
                     <tr>
                <th>身份证号</th>
               <th>手机号</th>
               <th>保单号</th>
               <th>险种名称</th>
               <th>起始日期</th>
               <th>终止日期</th>
               <th>保费</th>
               <th>保单状态</th>
                </tr>
                    <tr>
                        <td>{{personInfo.identityCode}}</td>
                        <td>{{personInfo.userMobile}}</td>             
                        <td>{{personInfo.policyNumber}}</td>
                        <td>{{personInfo.insuranceName}}</td>              
                        <td>{{personInfo.startDate}}</td>    
                        <td>{{personInfo.endDate}}</td>                                  
                        <td>{{personInfo.insurancePremium}}</td>    
                        <td>{{personInfo.policyStatus}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div style="margin-top:20px;">
            <el-tabs>
                <el-tab-pane label="车辆信息">
                    <carVehicleInfo :id="id"></carVehicleInfo>
                </el-tab-pane>
                <el-tab-pane label="保费信息">
                    <carInsuranceInfo :id="id"></carInsuranceInfo>
                </el-tab-pane>
                <el-tab-pane label="投保人和被保险人">
                    <carApplicantInsurantInfo :id="id"></carApplicantInsurantInfo>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style scoped>
   #personinfo {
  font-size: 12px;
  font-family: "微软雅黑";
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #f3f3f3;
  box-shadow: -2px 0px 0px #f3f3f3, 0px -2px 0px #f3f3f3, 0px 2px 0px #f3f3f3,
    2px 0px 0px #f3f3f3;
}
#personinfo th {
  font-family: "微软雅黑";
  padding: 5px 0px;
  height: 50px;
  width: auto;
  font-weight: normal;
  color: #666;
  background-color: #f3f4f8;
}
#personinfo td {
  font-family: "微软雅黑";
  height: 40px;
  padding: 5px 0px;
  text-align: center;
  font-size: 1em;
  color: #333;
}

</style>

<script>
import carVehicleInfo from "./carVehicleInfo.vue";
import carInsuranceInfo from "./carInsuranceInfo.vue";
import carApplicantInsurantInfo from "./carApplicantInsurantInfo.vue";

export default {
  data() {
    return {
        personInfo:{}
    };
  },
  components: {
      carVehicleInfo,
      carInsuranceInfo,
      carApplicantInsurantInfo

  },
  created() {
    this.id = sessionStorage.getItem("tdId");
    this.loadData();
  },
  methods: {
    loadData() {
      this.$axios.post(this.$api.carPersonInfo + "?id=" + this.id).then(
        function(result) {
          this.personInfo = result.data.CXBDBaseInfo[0];
          console.log(this.personInfo)
        //   console.log(result.data)
        }.bind(this)
      );
    }
  }
};
</script>
