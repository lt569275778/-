<template>
    <div>
        <div v-for="item in tableData">
            <table>
                <tr>
                    <td class="edtab_td1">公积金账号：</td>
                    <td class="edtab_td2">{{item.customerId}}</td>
                    <td class="edtab_td1">机构类型：</td>
                    <td class="edtab_td2">{{item.organizationType}}</td>
                    <td class="edtab_td1">最近一次缴存时间：</td>
                    <td class="edtab_td2">{{item.lastRecordDate}}</td>
                    <td class="edtab_td1">最长连续缴存月份：</td>
                    <td class="edtab_td2">{{item.continuousDepositMonth}}</td>
                    <td class="edtab_td1">最近连续缴存月份：</td>
                    <td class="edtab_td2">{{item.lastDepositMonth}}</td>
                </tr>
                <tr>
                    <td class="edtab_td1">公积金贷款笔数：</td>
                    <td class="edtab_td2">{{item.loanCount}}</td>
                    <td class="edtab_td1">公积金贷款月还款金额：</td>
                    <td class="edtab_td2">{{item.loanRepayAmount}}</td>
                    <td class="edtab_td1">月收入(推断)：</td>
                    <td class="edtab_td2">{{item.monthlyIncome}}</td>
                    <td class="edtab_td1">当前公司连续缴存月份：</td>
                    <td class="edtab_td2">{{item.currentCorpContinsDpMonth}}</td>
                    <td class="edtab_td1">缴存单位性质：</td>
                    <td class="edtab_td2">{{item.corpType}}</td>
                </tr>
                <tr>
                    <td class="edtab_td1">缴存单位规模：</td>
                    <td class="edtab_td2">{{item.corpScale}}</td>
                    <td class="edtab_td1">用户填写姓名：</td>
                    <td class="edtab_td2">{{item.userName}}</td>
                    <td class="edtab_td1">用户填写身份证：</td>
                    <td class="edtab_td2">{{item.userIdcard}}</td>
                    <td class="edtab_td1">用户填写手机号：</td>
                    <td class="edtab_td2">{{item.userPhone}}</td>
                    <td class="edtab_td1">姓名是否一致：</td>
                    <td class="edtab_td2">{{item.nameMatch}}</td>
                </tr>
                <tr>
                    <td class="edtab_td1">身份证号是否一致：</td>
                    <td class="edtab_td2">{{item.idcardMatch}}</td>
                </tr>
            </table>
        </div>
        <div>
            <page :formInline="pageParam" @pageSubmit="loadData"></page>
        </div>
    </div>
</template>

<script>
    import Page from '../../../common/page'

    export default {
        components: {
            Page
        },
        data() {
            return {
                tableData: [],
                pageParam: {
                    currentPage:1,
                    total:0,
                    pageSize:10,
                    loading2:false
                }

            }
        },
        mounted() {
           this.loadData();
        },
        methods: {
          loadData() {
            this.$axios.post(this.$api.fundReportInfo+"?requestId="+sessionStorage.getItem('fundId')).then(
               function(result) {
                 this.tableData = result.data.tableList;
                 this.pageParam.total = result.data.total;
                 this.loading=true;
               }.bind(this));
          }
        }
    }
</script>

<style scoped>
    .edtab_td1{width: 11%;background:#fafafa;border:1px solid #dcdcdc; height:40px;line-height:20px;text-align:left;padding:0.2%;font-size: 12px;}
    .edtab_td2{width: 9%;text-align:left; border:1px solid #dcdcdc;padding:0.2%;font-size: 12px;}
</style>
