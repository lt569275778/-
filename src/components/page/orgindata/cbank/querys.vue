<template>
    <div>
    	<p class="cons_p">这部分包含您的信用报告最近2年被查询记录。</p>
    	机构查询记录明细
        <el-table :data="tableData1" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
	      <el-table-column prop="date" label="查询日期" ></el-table-column>
	      <el-table-column prop="operator" label="查询操作员" ></el-table-column>
	      <el-table-column prop="reason" label="查询原因" ></el-table-column>
	    </el-table>
	       个人查询记录明细
        <el-table :data="tableData2" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
	      <el-table-column prop="date" label="查询日期" ></el-table-column>
	      <el-table-column prop="operator" label="查询操作员" ></el-table-column>
	      <el-table-column prop="reason" label="查询原因" ></el-table-column>
	    </el-table>
    </div>
</template>

<script>
export default{
	 data() {
	 	return {
	 		tableData1:[],
	 		tableData2:[]
	 	}
	 },
     props:['id'],
     mounted(){
     	this.loadData();
     },
     methods:{
     	loadData() {
	        this.$axios.post(this.$api.cbankQuiry+"?creditType=机构查询记录明细&bankId="+this.id).then(function(result){
	          this.tableData1 = result.data.tableList;
	        }.bind(this)).catch(function (error) {
	        }.bind(this));
	        this.$axios.post(this.$api.cbankQuiry+"?creditType=个人查询记录明细&bankId="+this.id).then(function(result){
	          this.tableData2 = result.data.tableList;
	        }.bind(this)).catch(function (error) {
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
  .cons_p{height:45px;line-height: 45px; border-bottom: 2px solid #20A0FF; padding:0 20px; font-size:16px; margin-bottom:15px;}
</style>
