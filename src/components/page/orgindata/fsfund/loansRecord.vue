<template>
    <div>
        <div v-for="item in tableData">
            <table>
                <tr>
                    <td class="edtab_td1">合同号：</td>
                    <td class="edtab_td2">{{item.contractNo}}</td>
                    <td class="edtab_td1">姓名：</td>
                    <td class="edtab_td2">{{item.name}}</td>
                    <td class="edtab_td1">身份证号：</td>
                    <td class="edtab_td2">{{item.idcard}}</td>
                    <td class="edtab_td1">手机号：</td>
                    <td class="edtab_td2">{{item.phone}}</td>
                    <td class="edtab_td1">地址：</td>
                    <td class="edtab_td2">{{item.address}}</td>
                </tr>
                <tr>
                    <td class="edtab_td1">贷款银行名称：</td>
                    <td class="edtab_td2">{{item.bank}}</td>
                    <td class="edtab_td1">贷款状态：</td>
                    <td class="edtab_td2">{{item.status}}</td>
                    <td class="edtab_td1">贷款额度：</td>
                    <td class="edtab_td2">{{item.limit}}</td>
                    <td class="edtab_td1">贷款余额：</td>
                    <td class="edtab_td2">{{item.balance}}</td>
                    <td class="edtab_td1">贷款期限：</td>
                    <td class="edtab_td2">{{item.period}}</td>
                </tr>
                <tr>
                    <td class="edtab_td1">贷款发放日：</td>
                    <td class="edtab_td2">{{item.beginDate}}</td>
                    <td class="edtab_td1">贷款到期日：</td>
                    <td class="edtab_td2">{{item.endDate}}</td>
                    <td class="edtab_td1">贷款利率：</td>
                    <td class="edtab_td2">{{item.loanRate}}</td>
                    <td class="edtab_td1">贷款罚息利率：</td>
                    <td class="edtab_td2">{{item.penaltyRate}}</td>
                    <td class="edtab_td1">还款方式：</td>
                    <td class="edtab_td2">{{item.refund}}</td>
                </tr>
            </table>
        </div>
        <br/>
        <div>
            <el-table :data="flows" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中">
                <el-table-column prop="contractNo" width="80" label="合同号"></el-table-column>
                <el-table-column prop="recordDate" label="记录日期"></el-table-column>
                <el-table-column prop="type" label="流水类型"></el-table-column>
                <el-table-column prop="recordMonth" label="所属月份"></el-table-column>
                <el-table-column prop="repayPrinciple" label="还本金额"></el-table-column>
                <el-table-column prop="repayInterest" label="还息金额"></el-table-column>
                <el-table-column prop="repayAmount" label="还款总金额"></el-table-column>
                <el-table-column prop="principleBalance" label="本金余额"></el-table-column>
                <el-table-column prop="deductDate" label="银行扣款日期"></el-table-column>
            </el-table>
        </div>
        <div>
            <page :formInline="pageParam" @pageSubmit="loadData"></page>
        </div>
    </div>
</template>

<script>
    import Page from '../../../common/page'

    export default {
        data() {
            return {
                tableData: [],
                flows: [],
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
                var param = {
                    requestId: sessionStorage.getItem('fundId'),
                    pageNo: this.pageParam.currentPage,
                    pageSize: this.pageParam.pageSize
                };

                this.$axios.post(this.$api.loansRecord, param).then(
                    function(result) {
                        this.tableData = result.data.tableList;
                    }.bind(this));
                this.$axios.post(this.$api.loansFlows, param).then(
                    function(result) {
                        this.flows = result.data.tableList;
                        this.pageParam.total = result.data.total;
                    }.bind(this));
            }
        },
        components: {
            Page
        }
    }
</script>

<style scoped>
    .edtab_td1{width: 11%;background:#fafafa;border:1px solid #dcdcdc; height:40px;line-height:20px;text-align:left;padding:0.2%;font-size: 12px;}
    .edtab_td2{width: 9%;text-align:left; border:1px solid #dcdcdc;padding:0.2%;font-size: 12px;}
</style>
