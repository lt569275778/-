<template>
    <div>
        <div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
              <el-table-column show-overflow-tooltip="true" prop="otherNum" label="对方手机号码" ></el-table-column>
              <el-table-column show-overflow-tooltip="true" prop="otherLocation" label="对方归属地" ></el-table-column>
              <el-table-column show-overflow-tooltip="true" prop="myLocation" label="本机通话地" ></el-table-column>
              <el-table-column show-overflow-tooltip="true" prop="time" label="通话起始时间" ></el-table-column>
              <el-table-column prop="duration" label="通话时长" ></el-table-column>
              <el-table-column prop="type" label="呼叫类型" ></el-table-column>
              <el-table-column prop="landType" label="通话类型" ></el-table-column>
              <el-table-column prop="fee" label="通话费用" ></el-table-column>
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
	        this.$axios.post(this.$api.operatorCallList, param).then(function(result){
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
