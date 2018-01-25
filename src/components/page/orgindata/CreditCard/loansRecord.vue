<template>
    <div>
    	<div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
              <el-table-column prop="transDate" label="交易日" ></el-table-column>
              <el-table-column prop="postDate" label="记账日" ></el-table-column>
              <el-table-column prop="cardTailNumber" label="卡号后四位" ></el-table-column>
              <el-table-column prop="buName" label="交易描述" ></el-table-column>
              <el-table-column prop="RMB" label="交易地点" ></el-table-column>
              <el-table-column prop="transCurrencyAmount" label="交易金额" ></el-table-column>
              <el-table-column prop="RMB" label="交易币种" ></el-table-column>
              <el-table-column prop="recordCurrencyAmount" label="记账金额" ></el-table-column>
              <el-table-column prop="RMB" label="记账币种"></el-table-column>   
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
        .post(this.$api.creditTransInfoList, param)
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
