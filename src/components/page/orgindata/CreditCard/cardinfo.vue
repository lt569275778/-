<template>
    <div>
        <div>
            <p style="margin-left: 50px;margin-bottom:20px;font-size:16px;">
                <!-- <img :src="headImg" v-if="headHidden" style="vertical-align: middle"> -->
              姓名：{{personInfo.realName}}
            </p>
            <table id="personinfo">
                <tr>
               <th>出生日期</th>
               <th>邮箱</th>
               <th>身份证号</th>
               <th>信用卡数</th>   
                </tr>
                 <tr>
                   <td></td>
                   <td>{{personInfo.email}}</td> 
                   <td>{{personInfo.identityCode}}</td> 
                   <td></td> 
                   
               </tr>
            </table>
        </div>
        <div style="margin-top:20px;">
            <el-tabs>
                <el-tab-pane label="账单信息">
                    <pay-record :id="id"></pay-record>
                </el-tab-pane>
                   <el-tab-pane label="分期详情">
                    <Staging-details :id="id"></Staging-details>
                </el-tab-pane>
              <el-tab-pane label="交易详情">
                    <loans-record :id="id"></loans-record>
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
import payRecord from "./payRecord.vue";
import loansRecord from "./loansRecord.vue"
import StagingDetails from "./StagingDetails"
export default {
  data() {
    return {
      personInfo: [],
      name: "",
      id: "",
      searchConditionParam: {},
      pageParam: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      }
    };
  },
  components: {
    payRecord,
    StagingDetails,
    loansRecord
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      let param = this.searchConditionParam;
      param.pageNo = this.pageParam.currentPage;
      param.pageSize = this.pageParam.pageSize;
      param.id = sessionStorage.getItem("Cardid");
      this.$axios.post(this.$api.creditBillingCheckList, param).then(res => {
        this.personInfo = res.data.tableList[0];
      });
    }
  }
};
</script>
