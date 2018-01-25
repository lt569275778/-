<template>
    <div>
    	<div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
              <el-table-column prop="originName" label="险种名称" ></el-table-column>
              <el-table-column prop="base" label="缴费基数" ></el-table-column>
              <el-table-column prop="insuredStatus" label="参保状态" ></el-table-column>
              <el-table-column prop="paymentStatus" label="缴费状态" ></el-table-column>
              <el-table-column prop="personRate" label="个人缴费比例" ></el-table-column>
              <el-table-column prop="companyRate" label="单位缴费比例" ></el-table-column>
              <el-table-column prop="company" label="参保单位" ></el-table-column>
              <el-table-column prop="currentInsuredMonth" label="本次参保年月" ></el-table-column>
              <el-table-column prop="firstInsuredMonth" label="首次参保年月" ></el-table-column>
              
              
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
		          requestId: sessionStorage.getItem('sbid')
		        };
		        this.$axios.post(this.$api.getpayRecord, param).then(res=>{
                    console.log(res.data)
		          this.tableData = res.data.tableList;
		          this.pageParam.total = res.data.total;
		          this.loading2 = false;
		        }).catch(function (error) {
		            this.loading2 = false;
		        }.bind(this));
	     	}
	     }
    }
</script>
