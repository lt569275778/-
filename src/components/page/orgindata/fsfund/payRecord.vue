<template>
    <div>
    	<div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
              <el-table-column prop="type" label="操作类型" ></el-table-column>
              <el-table-column prop="recordMonth" label="缴纳日期" ></el-table-column>
              <el-table-column prop="amount" label="发生金额" ></el-table-column>
              <el-table-column prop="balance" label="余额" ></el-table-column>
              <el-table-column prop="fundType" label="存缴类型" ></el-table-column>
              <el-table-column prop="company" label="缴存公司" ></el-table-column>
            </el-table>
        </div>
        <div>
            <page :formInline="pageParam" @pageSubmit="loadData"></page>
        </div>
    </div>
</template>

<script>
    import Page from '../../../common/page'

    export default {
        data() {
            return {
                pageParam: {
                    currentPage:1,
                    total:0,
                    pageSize:10,
                    loading2:false
                },
                tableData: []
            }
        },
	    mounted(){
	     	this.loadData();
	    },
        components: {
            Page
        },
        methods:{
	     	loadData() {
	     		var param = {
		          pageNo: this.pageParam.currentPage,
		          pageSize: this.pageParam.pageSize,
		          id: sessionStorage.getItem('fundId')
		        };
		        this.$axios.post(this.$api.fundPayRecord, param).then(function(result){
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

</style>
