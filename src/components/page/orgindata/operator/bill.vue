<template>
    <div>
        <div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
              <el-table-column prop="dateDetail" label="账单月" ></el-table-column>
              <el-table-column prop="tariffPackage" label="套餐及固定费用" ></el-table-column>
              <el-table-column prop="allFee" label="总费用（元）" ></el-table-column>
              <el-table-column prop="payMoney" label="实际缴纳金额（元）" ></el-table-column>
            </el-table>
        </div>
        <div>
             <page :formInline="pageParam" @pageSubmit="loadData"></page>
        </div>
    </div>
</template>

<script>
    import Page from "../../../common/page"
export default{
	 data() {
	 	return {
	 		tableData:[],
            pageParam:{
                currentPage: 1,
                total: 0,
                pageSize: 10,
            },
	        loading2:false
	 	}
	 },
     props:['id'],
     mounted(){
     	this.loadData();
     },
    components:{
        Page
    },
     methods:{
     	loadData() {
     		var param = {
	          pageNo: this.pageParam.currentPage,
	          pageSize: this.pageParam.pageSize,
	          id: this.id
	        };
	        this.$axios.post(this.$api.operatorBillList, param).then(function(result){
	          this.tableData = result.data.tableList;
	          this.pageParam.total = result.data.total;
	          this.loading2 = false;
	        }.bind(this)).catch(function (error) {
	            this.loading2 = false;
	        }.bind(this));
     	}
     }
}
</script>

<style scoped="scoped">
  .block {
    margin-top: 20px;
    width: 100%;
  }
  .block .r_btn {
    float: left;
    width: 90px;
  }
  .block .r_page {
     float: right;
  }
</style>
