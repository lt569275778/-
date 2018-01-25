<template>
    <div>
        <p style="margin-left: 33px">
            <img :src="headImg" v-if="headHidden" style="vertical-align: middle">
            [ {{personInfo.name}} ]- <span class="cons_p_span">实名制</span>
        </p>
        <table class="autab">
            <tr>
                <td class="autab_td1">身份证号</td>
                <td class="autab_td2">{{personInfo.idcard}}</td>
                <td class="autab_td1">账号余额</td>
                <td class="autab_td2">{{personInfo.balance}}</td>
                <td class="autab_td1">最近缴存日期</td>
                <td class="autab_td2">{{personInfo.lastRecordDate}}</td>
            </tr>
            <tr>
                <td class="autab_td1">账户状态</td>
                <td class="autab_td2">{{personInfo.status}}</td>
                <td class="autab_td1">月缴存金额</td>
                <td class="autab_td2">{{personInfo.depositAmount / 100}}</td>
                <td class="autab_td1">月缴存基数</td>
                <td class="autab_td2">{{personInfo.depositBase / 100}}</td>
            </tr>
            <tr>
                <td class="autab_td1">公司缴存比例</td>
                <td class="autab_td2">{{personInfo.companyRate}}%</td>
                <td class="autab_td1">个人缴存比例</td>
                <td class="autab_td2">{{personInfo.personRate}}%</td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                personInfo: []
            }
        },
        mounted() {
            this.loadData();
        },
        methods: {
           loadData() {
               this.$axios.post(this.$api.fundPersonInfo+"?requestId="+sessionStorage.getItem('fundId')).then(
                   function(result) {
                       this.personInfo = result.data.personInfo;
                   }.bind(this));
           }
        }
    }
</script>
