<template>
    <div id="jdPersonal">
        <div>
            <p style="margin-left: 33px">
                <img :src="headImg" v-if="headHidden" style="vertical-align: middle">
                [ {{person.realName}} ]- <span class="cons_p_span">实名制</span>
            </p>
            <table class="autab">
                <tr>
                    <td class="autab_td1">用户名</td>
                    <td class="autab_td2">{{person.account}}</td>
                    <td class="autab_td1">出生日期</td>
                    <td class="autab_td2">{{person.birthday}}</td>
                    <td class="autab_td1">邮箱</td>
                    <td class="autab_td2">{{person.email}}</td>
                </tr>
                <tr>
                    <td class="autab_td1">身份证号</td>
                    <td class="autab_td2">{{person.identificationNumber}}</td>
                    <td class="autab_td1">真实姓名</td>
                    <td class="autab_td2">{{person.realName}}</td>
                </tr>
            </table>
        </div>
        <el-tabs>
            <el-tab-pane label="地址信息">
                <div>
                    <jdAddressInfo :id="id"></jdAddressInfo>
                </div>
            </el-tab-pane>
            <el-tab-pane label="订单信息" name="second">
                <div>
                     <jdOrderInfo :id="id"></jdOrderInfo>
                 </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<style scoped="scoped">
    .cons{width:100%; border-radius:3px; background:#fff; overflow:hidden;font-size:12px;}

    .cons_p_span{ font-size:13px; color:#FF5722;}
    .autab{width:94%; margin:0 auto; background:#f3f4f8; margin:15px auto; border-radius:5px; padding:10px 0;}
    .autab_td1{color:#a0a0a0; text-align:right; height:40px; line-height:40px; width:10%; padding-right:1%;}
</style>

<script type="text/javascript">
    export default{
        components: {
            jdAddressInfo: require('./jdAddressInfo.vue'),
            jdOrderInfo: require('./jdOrderInfo.vue')
        },
        data() {
            return {
                activeName:'first',
                person: [],
                headImg:'',
                headHidden:false
            }
        },
        created(){
          this.id = sessionStorage.getItem("jdId");
          this.loadData();
        },
        methods: {
            loadData() {
                this.$axios.post(this.$api.jdPerson+'?jdId='+this.id).then(function(result){
                    if(result.data.returnCode == "200") {
                        this.person = result.data.jdInfo;
                        let jdInfo = result.data.jdInfo;
                        if("男" == jdInfo.sex){
                            this.headImg = "../../../../../static/img/men.png";
                            this.headHidden = true;
                        }else if("女" == jdInfo.sex){
                            this.headImg = "../../../../../static/img/women.png";
                            this.headHidden = true;
                        }
                    }else {
                        this.$message.error(result.data.returnMsg);
                    }
                }.bind(this));
            }
        }
    }
</script>
