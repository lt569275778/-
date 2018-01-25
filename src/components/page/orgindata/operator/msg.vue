<template>
    <div>
        <div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
              <el-table-column prop="otherNum" label="对方手机号码" ></el-table-column>
              <el-table-column prop="time" label="通信起始时间" ></el-table-column>
              <el-table-column prop="type" label="发送／接收" ></el-table-column>
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
        Page:Page,
    },
     methods:{
     	loadData() {
     		var param = {
	          pageNo: this.pageParam.currentPage,
	          pageSize: this.pageParam.pageSize,
	          id: this.id
	        };
	        this.$axios.post(this.$api.operatorMsgList, param).then(function(result){
	          this.tableData = result.data.tableList;
	          this.pageParam.total = result.data.total;
	          this.loading2 = false;
	        }.bind(this)).catch(function (error) {
	            this.loading2 = false;
	            console.log(error);
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
