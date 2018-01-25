<template>
  <div>
	  <div class="cons">
        <p style="margin-left: 33px">[ {{customer.realName}}]- <span class="cons_p_span">实名制</span></p>
            <table class="autab">
                <tr>
                    <td class="autab_td1">查询时间</td>
                    <td class="autab_td2">{{customer.queryDate}}</td>
                    <td class="autab_td1">身份证号</td>
                    <td class="autab_td2">{{customer.identificationNumber}}</td>
                    <td class="autab_td1">报告时间</td>
                    <td class="autab_td2">{{customer.reportTime}}</td>
                </tr>
            </table>
    </div>
    <el-tabs v-model="activeName">
        <el-tab-pane label="信贷记录" name="first">
        	<div>
        		<loan :id="id"></loan>
        	</div>
        </el-tab-pane>
        <el-tab-pane label="公共记录" name="second">
        	 <div>
            <publics :id="id"></publics>
           </div>
        </el-tab-pane>
        <el-tab-pane label="查询记录" name="three">
           <div>
           	 <querys :id="id"></querys>
           </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
    components: {
      loan:require('./loan.vue'),
      publics:require('./publics.vue'),
      querys:require('./querys.vue')
    },
    data(){
    	return {
    		activeName:'first',
    		customer:{}
    	}
    },
    created() {
        this.id = sessionStorage.getItem("bankId");
        var self = this;
        VueEvent.$on('handleOnCancel', function() {
            self.activeName = 'first';
        });
    },
    mounted(){
     	this.loadData();
    },
    methods: {
       loadData(){
       	  this.$axios.post(this.$api.cbankDetail+"?bankId="+this.id).then(function(result){
	          this.customer = result.data.bankPersonalInfo;
	        }.bind(this));
       }
    }
}

</script>

<style scoped="scoped">
.cons{width:100%; border-radius:3px; background:#fff; overflow:hidden;font-size:12px;}
.cons_p_span{ font-size:13px; color:#FF5722;}
.autab{width:94%; margin:0 auto; background:#f3f4f8; margin:15px auto; border-radius:5px; padding:10px 0;}
.autab_td1{color:#a0a0a0; text-align:right; height:40px; line-height:40px; width:10%; padding-right:1%;}
</style>
