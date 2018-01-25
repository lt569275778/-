<template>
    <div>
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
        <div>
            <el-tabs>
                <el-tab-pane label="缴存记录">
                    <pay-record :id="id"></pay-record>
                </el-tab-pane>
                <el-tab-pane label="贷款记录">
                    <loans-record :id="id"></loans-record>
                </el-tab-pane>
                <el-tab-pane label="报告信息">
                    <report-info :id="id"></report-info>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style>
    .autab{width:94%; margin:0 auto; background:#f3f4f8; margin:15px auto; border-radius:5px; padding:10px 0;}
    .autab_td1{color:#a0a0a0; text-align:right; height:40px; line-height:40px; width:12%; padding-right:1%;}
</style>

<script>

    import payRecord from './payRecord.vue'
    import loansRecord from './loansRecord.vue'
    import reportInfo from './reportInfo.vue'

    export default {
        data() {
            return {
                personInfo: []
            }
        },
        components: {
            payRecord,
            loansRecord,
            reportInfo
        },
        created() {
            this.id = sessionStorage.getItem("fundId");
            this.loadData();
        },
        methods: {
            loadData() {
                this.$axios.post(this.$api.fundPersonInfo+"?requestId="+this.id).then(
                    function(result) {
                        this.personInfo = result.data.personInfo;
                    }.bind(this));
            }
        }
    }

</script>
