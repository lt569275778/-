<template>
  <div>
	  <div class="cons">
          <p style="margin-left: 33px">
              <img :src="headImg" v-if="headHidden" style="vertical-align: middle">
              [ {{customer.realName}} ]- <span class="cons_p_span">实名制</span>
          </p>
            <table class="autab">
                <tr>
                    <td class="autab_td1">身份证号</td>
                    <td class="autab_td2">{{customer.identificationNumber}}</td>
                    <td class="autab_td1">身份证地址</td>
                    <td class="autab_td2" colspan="5">{{customer.idAddress}}</td>
                </tr>
                <tr>
                    <td class="autab_td1">电话号码</td>
                    <td class="autab_td2">{{customer.username}}</td>
                    <td class="autab_td1">手机归属地</td>
                    <td class="autab_td2">{{customer.province}}{{customer.city}}</td>
                    <td class="autab_td1">注册时间</td>
                    <td class="autab_td2">{{customer.registrationTime}}</td>
                    <td class="autab_td1">更新时间</td>
                    <td class="autab_td2">{{customer.createTime}}</td>
                </tr>
                <tr>
                    <td class="autab_td1">在网时长</td>
                    <td class="autab_td2">{{customer.inNetsDuration}}</td>
                    <td class="autab_td1">运营商品牌</td>
                    <td class="autab_td2">{{customer.brand}}</td>
                    <td class="autab_td1">余额</td>
                    <td class="autab_td2" colspan="3">{{customer.balance}}</td>
                </tr>
            </table>
    </div>
    <el-tabs v-model="activeName">
        <el-tab-pane label="最近6个月帐单" name="first">
        	<div>
        		<bill :id="id"></bill>
        	</div>
        </el-tab-pane>
        <el-tab-pane label="通话详单" name="second">
        	 <div>
            <call :id="id"></call>
           </div>
        </el-tab-pane>
        <el-tab-pane label="短信详单" name="three">
           <div>
           	<msg :id="id"></msg>
           </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
    components: {
        bill:require('./bill.vue'),
        call:require('./call.vue'),
        msg:require('./msg.vue')
    },
    data(){
    	return {
    		activeName:'first',
    		id: '',
    		customer:{},
            headImg:'',
            headHidden:false
    	}
    },
    created() {
        var self = this;
        VueEvent.$on('handleOnCancel', function() {
            self.activeName = 'first';
        });
    },
    mounted(){
        this.id = sessionStorage.getItem("operatorId");
     	this.loadData();
    },
    methods: {
       loadData(){
       	  this.$axios.post(this.$api.operatorDetail+"?id="+this.id).then(function(result){
	          this.customer = result.data.operator;
              let operator = result.data.operator;

              if("1" == operator.sex){
                  this.headImg = "../../../../../static/img/men.png";
                  this.headHidden = true;
              }else if("0" == operator.sex){
                  this.headImg = "../../../../../static/img/women.png";
                  this.headHidden = true;
              }else {

              }
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
