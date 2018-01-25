<template>
    <div>
    	<div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
              <el-table-column prop="receiverName" label="收货人姓名" ></el-table-column>
              <el-table-column prop="receiverMobile" label="手机号码" ></el-table-column>
              <el-table-column prop="receiverArea" label="所在地区" ></el-table-column>
              <el-table-column prop="receiverLocationDetail" label="详细地址" ></el-table-column>
              <el-table-column prop="istrue" label="是否默认地址" ></el-table-column>
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
      tableData: [],
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
      param.id = sessionStorage.getItem("taobaoid");
      console.log(param);
      this.$axios
        .post(this.$api.addressesInfo, param)
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
