<template>
    <div>
    	<div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
              <el-table-column prop="bank" label="银行名称" ></el-table-column>
              <el-table-column prop="statementCycle" label="账单日" ></el-table-column>
              <el-table-column prop="accountNumber" label="卡号" ></el-table-column>
              <el-table-column prop="creditlimit" label="信用额度" ></el-table-column>
              <el-table-column prop="cashTakeLimit" label="取现额度" ></el-table-column>
              <el-table-column prop="paymentDueDate" label="到期还款日" ></el-table-column>
              <el-table-column prop="statementBalance" label="本期应还款额" ></el-table-column>
              <el-table-column prop="minPaymentRmb" label="最低还款额" ></el-table-column>
              <el-table-column prop="" label="币种默认(RMB)" ></el-table-column>
            </el-table>
        </div>
        <div>
            <page :formInline="pageParam" @pageSubmit="loadData"></page>
        </div>
    </div>
</template>

<script>
import Page from "../../../common/page";

export default {
  data() {
    return {
      pageParam: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        loading2: false
      },
      tableData: [
        
      ],
      searchConditionParam: {}
    };
  },
  mounted() {
    this.loadData();
  },
  components: {
    Page
  },
  methods: {
    loadData() {
      let param = this.searchConditionParam;
      param.pageNo = this.pageParam.currentPage;
      param.pageSize = this.pageParam.pageSize;
      param.id = sessionStorage.getItem("Cardid");
    //   console.log(param);
      this.$axios
        .post(this.$api.creditBillingInfoList, param)
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.tableList;
          this.pageParam.total = res.data.total;
          this.loading2 = false;
        })
        .catch(
          function(error) {
            this.loading2 = false;
          }.bind(this)
        );
    }
  }
};
</script>
