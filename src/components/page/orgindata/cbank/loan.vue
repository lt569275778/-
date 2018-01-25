<template>
    <div>
    	<p class="cons_p">这部分包含您的信用卡，贷款和其他信贷记录。金额类数据均以人名币计算，精确到元。</p>
        <p>信息概要</p>
       <el-table :data="tableMainData" stripe="true" border style="width: 100%;"    >
           <el-table-column prop="creditType" label="信贷类型" width="100"></el-table-column>
	       <el-table-column prop="accountNumber" label="账户数" width="100"></el-table-column>
	       <el-table-column prop="activeNumber" label="未结清/未销户账户数"></el-table-column>
	       <el-table-column prop="overdueNumber" label="发生过逾期的账户数"></el-table-column>
	       <el-table-column prop="overdue90daysNumber" label="发生过90天以上逾期的账户数"></el-table-column>
	       <el-table-column prop="guaranteeNumber" label="为他人担保笔数" width="150"></el-table-column>
	    </el-table><br />
        <p>信用卡信息</p>
	    <el-table :data="tableCentral" stripe="true" border style="width: 100%;"   >
	      <el-table-column prop="issuingDate" label="发卡日期" ></el-table-column>
	      <el-table-column prop="issuer" label="发卡机构" ></el-table-column>
	      <el-table-column prop="cardType" label="卡片类型" ></el-table-column>
	      <el-table-column prop="accountType" label="账户类型" ></el-table-column>
	      <el-table-column prop="endDate" label="截止时间" ></el-table-column>
	      <el-table-column prop="status" label="账户状态" ></el-table-column>
	      <el-table-column prop="creditLimit" label="授信额度" ></el-table-column>
	      <el-table-column prop="creditUsed" label="已使用额度" ></el-table-column>
	      <el-table-column prop="overdueBehavior" label="逾期行为" ></el-table-column>
	    </el-table>
        <p>贷款信息</p>
	    <el-table :data="tableLoanDetailsInfoHome" stripe="true" border style="width: 100%;"   >
          <el-table-column prop="loanType" label="贷款类型" ></el-table-column>
	      <el-table-column prop="issuingDate" label="发放时间" ></el-table-column>
	      <el-table-column prop="issuer" label="发放机构" ></el-table-column>
	      <el-table-column prop="loanAmount" label="发放金额" ></el-table-column>
	      <el-table-column prop="loanType" label="贷款性质 " ></el-table-column>
	      <el-table-column prop="maturityDate" label="到期时间" ></el-table-column>
	      <el-table-column prop="endDate" label="截止时间" ></el-table-column>
	      <el-table-column prop="status" label="账户状态 " ></el-table-column>
	      <el-table-column prop="balance" label="本金余额 " ></el-table-column>
	      <el-table-column prop="overdueBehavior" label="逾期行为" ></el-table-column>
	    </el-table>
        <p>为他人担保信息</p>
	    <el-table :data="tableGuaranteeInfo" stripe="true" border style="width: 100%;"   >
	      <el-table-column prop="detailInfo" label="详情" ></el-table-column>
	    </el-table>
        <p>代偿保证人信息</p>
	    <el-table :data="tableCompensatory" stripe="true" border style="width: 100%;"   >
	      <el-table-column prop="detailInfo" label="详情" ></el-table-column>
	    </el-table>
    </div>
</template>

<script>
export default{
	 data() {
	 	return {
	 		tableMainData:[],
	 		tableCentral:[],
	 		tableLoanDetailsInfoHome:[],
	 		tableGuaranteeInfo:[],
	 		tableCompensatory:[]
	 	}
	 },
     props:['id'],
     mounted(){
     	this.loadData();
     },
     methods:{
     	loadData() {
	        this.$axios.post(this.$api.cbankLoanMain+"?bankId="+this.id).then(function(result){
	          this.tableMainData = result.data.tableList;
	        }.bind(this)).catch(function (error) {
	        }.bind(this));//概要数据
	        this.$axios.post(this.$api.cbankCentral+"?bankId="+this.id).then(function(result){
	          this.tableCentral = result.data.tableList;
	        }.bind(this)).catch(function (error) {
	        }.bind(this));//信用卡详情
	        this.$axios.post(this.$api.cbankLoanDetailsInfo+"?bankId="+this.id).then(function(result){
	          this.tableLoanDetailsInfoHome = result.data.tableList;
	        }.bind(this)).catch(function (error) {
	        }.bind(this));//住房贷款详情
	        this.$axios.post(this.$api.cbankGuaranteeInfo+"?bankId="+this.id).then(function(result){
	          this.tableGuaranteeInfo = result.data.tableList;
	        }.bind(this)).catch(function (error) {
	        }.bind(this));//为他人担保详情
	        this.$axios.post(this.$api.cbankCompensatory+"?bankId="+this.id).then(function(result){
	          this.tableCompensatory = result.data.tableList;
	        }.bind(this)).catch(function (error) {
	        }.bind(this));//代偿人详情
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
  .edtab_td1{width:16%; padding:0 2%; text-align:left; background:#fafafa; height:40px; line-height:40px; border:1px solid #dcdcdc;}
  .edtab_td2{width:16%; padding:0 2%;  text-align:left; border:1px solid #dcdcdc;}
  .edtab_td3{width:20%; text-align:center; border:1px solid #dcdcdc;}
  .edtab_td3_con{width:130px; height:150px; background:#fafafa; margin:0 auto; border:1px dashed #dbdbdb; line-height:150px; color:#999999; font-size:14px;}
</style>
</style>
