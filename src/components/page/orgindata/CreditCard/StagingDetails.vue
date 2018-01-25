<template>
    <div>
    	<div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
              <el-table-column prop="cardTailNumber" label="卡尾号" ></el-table-column>
              <el-table-column prop="installmentType" label="交易类型" ></el-table-column>
              <el-table-column prop="installmentDate" label="交易日期" ></el-table-column>
              <el-table-column prop="installmentTotalAmount" label="分期总额" ></el-table-column>
              <el-table-column prop="installmentTotalStage" label="分期总期数" ></el-table-column>
              <el-table-column prop="installmentRemainStage" label="分期剩余期数" ></el-table-column>
              <el-table-column prop="installmentCurrentPayment" label="分期当前金额" ></el-table-column>
              <el-table-column prop="installmentCurrentStage" label="分期当前期数" ></el-table-column>
              <el-table-column prop="installmentCurrentFee" label="分期当前手续费" ></el-table-column>
              <el-table-column prop="installmentBalance" label="分期当前剩余金额" ></el-table-column>
              
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
        .post(this.$api.creditInstallmentInfo, param)
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
