<template>
    <div>
        <div>
            <p style="margin-left: 50px;margin-bottom:20px;font-size:16px;">
                <img :src="headImg" v-if="headHidden" style="vertical-align: middle">
              姓名：{{personInfo.name}}
            </p>
            <table id="personinfo">
                <tr>
                <th>出生日期</th>
               <th>身份证号</th>
               <th>民族</th>
               <th>开始参保时间</th>
               <th>账户状态</th>
               <th>参保人员类别</th>
               <th>参保状态</th>
               <th>终止年月</th>
               <th>文化程度</th>
                </tr>
                 <tr>
                   <td>{{personInfo.birth}}</td>
                   <td>{{personInfo.idcard}}</td>
                   <td>{{personInfo.nation}}</td>
                   <td>{{personInfo.insuredBeginDate}}</td>
                   <td>正常</td>               
                   <td>{{personInfo.insuredPersonType}}</td>
                   <td>{{personInfo.insuredStatus}}</td>
                   <td>{{personInfo.endDate}}</td>
                   <td>{{personInfo.education}}</td>
               </tr>
               <tr>
               <th>单位名称</th>
               <th>社保机构名称</th>
               <th>医疗账户余额</th>
               <th>累计缴纳月数</th>
               <th>养老账户余额</th>
               <th>缴费人员类别</th>
               <th>申报月收入</th>
               <th>户口性质</th>
               <th>户口所在地</th>
               </tr>
               <tr>
                   <td>{{personInfo.company}}</td>
                   <td>{{personInfo.socialSecurityName}}</td>
                   <td>{{personInfo.medicareBalance}}</td>
                   <td>{{personInfo.paymentMonths}}</td>
                   <td>{{personInfo.pensionBalance}}</td>
                   <td>{{personInfo.paymentPersonType}}</td>
                   <td>{{personInfo.monthlyIncome}}</td>
                   <td>{{personInfo.accountProperty}}</td>
                   <td>{{personInfo.domicilePlace}}</td>
               </tr>               
            </table>
        </div>
        <div style="margin-top:20px;">
            <el-tabs>
                <el-tab-pane label="险种信息">
                    <pay-record :id="id"></pay-record>
                </el-tab-pane>
                <el-tab-pane label="缴存流水">
                    <loans-record :id="id"></loans-record>
                </el-tab-pane>
                <el-tab-pane label="消费明细">
                    <report-info :id="id"></report-info>
                </el-tab-pane>
                 <el-tab-pane label="报告信息">
                    <re-port  :id="id"></re-port>
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
import loansRecord from "./loansRecord.vue";
import reportInfo from "./reportInfo.vue";
import rePort from "./report.vue";

export default {
  data() {
    return {
      personInfo: [],
      name: "",
      id: ""
    };
  },
  components: {
    payRecord,
    loansRecord,
    reportInfo,
    rePort
  },
  created() {
    this.id = sessionStorage.getItem("sbid");
    this.loadData();
  },
  methods: {
    loadData() {
      this.$axios
        .post(this.$api.getsbinfo, { requestId: this.id })
        .then(res => {
          console.log(res.data);
          this.personInfo = res.data.accountInfo;
        });
    }
  }
};
</script>
