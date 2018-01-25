<template>
    <div>
    	<p class="cons_p">这部分包含您最近5年内的欠税记录、民事判决记录、强制执行记录、行政处罚记录及电线欠费记录。金额数据均以人民币计算，精确到元。</p>
    	欠税记录信息
        <el-table :data="tableOwing" stripe="true" border style="width: 100%;"   >
	      <el-table-column prop="detailInfo" label="详情" ></el-table-column>
	    </el-table>
	        民事判决记录
	    <el-table :data="tableCivil" stripe="true" border style="width: 100%;"   >
	      <el-table-column prop="detailInfo" label="详情" ></el-table-column>
	    </el-table>
	        强制执行记录
	    <el-table :data="tableEnforce" stripe="true" border style="width: 100%;"   >
	      <el-table-column prop="detailInfo" label="详情" ></el-table-column>
	    </el-table>
	        行政处罚记录
	    <el-table :data="tablePunishment" stripe="true" border style="width: 100%;"   >
	      <el-table-column prop="detailInfo" label="详情" ></el-table-column>
	    </el-table>
	        电信欠费记录
	    <el-table :data="tableTelecom" stripe="true" border style="width: 100%;"   >
	      <el-table-column prop="detailInfo" label="详情" ></el-table-column>
	    </el-table>
    </div>
</template>

<script>
export default{
	 data() {
	 	return {
	 		tableOwing:[],
	 		tableCivil:[],
	 		tableEnforce:[],
	 		tablePunishment:[],
	 		tableTelecom:[]
	 	}
	 },
     props:['id'],
     mounted(){
     	this.loadData();
     },
     methods:{
     	loadData() {
	        this.$axios.post(this.$api.cbankOwing+"?bankId="+this.id).then(function(result){
	          this.tableOwing = result.data.tableList;
	        }.bind(this)).catch(function (error) {
	        }.bind(this));
	        this.$axios.post(this.$api.cbankCivil+"?bankId="+this.id).then(function(result){
	          this.tableCivil = result.data.tableList;
	        }.bind(this)).catch(function (error) {
	        }.bind(this));
	        this.$axios.post(this.$api.cbankEnforce+"?bankId="+this.id).then(function(result){
	          this.tableEnforce = result.data.tableList;
	        }.bind(this)).catch(function (error) {
	        }.bind(this));
	        this.$axios.post(this.$api.cbankPunishment+"?bankId="+this.id).then(function(result){
	          this.tablePunishment = result.data.tableList;
	        }.bind(this)).catch(function (error) {
	        }.bind(this));
	        this.$axios.post(this.$api.cbankTelecom+"?bankId="+this.id).then(function(result){
	          this.tableTelecom = result.data.tableList;
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
