<template>
    <div>
        <div>
            <p style="margin-left: 50px;margin-bottom:20px;font-size:16px;">
                <!-- <img :src="headImg" v-if="headHidden" style="vertical-align: middle"> -->
              姓名：{{personInfo.realName}}
            </p>
            <table id="personinfo">
                <tr>
                <th>会员名</th>
               <th>淘宝名称</th>
               <th>是否认证</th>
               <th>注册时间</th>
               <th>用户绑定邮箱</th>
               <th>用户手机号码</th>
               <th>安全等级</th>
               <th>真实姓名</th>
                </tr>
                 <tr>
                   <td>{{personInfo.taobaoAccount}}</td>
                   <td>{{personInfo.nickName}}</td>
                   <td v-if="personInfo.isRealName=='true'">是</td>
                   <td v-else>否</td>
                   <td>{{personInfo.createTime}}</td>             
                   <td>{{personInfo.email}}</td>
                   <td>{{personInfo.mobile}}</td>
                   <td>安全</td>
                   <td>{{personInfo.realName}}</td> 
               </tr>
            </table>
        </div>
        <div style="margin-top:20px;">
            <el-tabs>
                <el-tab-pane label="地址信息">
                    <pay-record :id="id"></pay-record>
                </el-tab-pane>
                <el-tab-pane label="订单信息">
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
import loansRecord from "./loansRecord.vue";

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
    loansRecord
  },
  created() {
    // this.id = ;
    // console.log(this.id)
    this.loadData();
  },
  methods: {
    loadData() {
      let param = this.searchConditionParam;
      param.pageNo = this.pageParam.currentPage;
      param.pageSize = this.pageParam.pageSize;
      param.id = sessionStorage.getItem("taobaoid");
      this.$axios.post(this.$api.taobaoList, param).then(res => {
        this.personInfo = res.data.tableList[0];
      });
    }
  }
};
</script>
