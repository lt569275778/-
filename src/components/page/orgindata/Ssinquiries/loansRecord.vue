<template>
    <div>
        <br/>
        <div>
            <el-table :data="flows" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中">
                <el-table-column prop="originName" width="80" label="险种名称"></el-table-column>
                <el-table-column prop="startPaymentMonth" label="开始缴费年月"></el-table-column>
                <el-table-column prop="endPaymentMonth" label="终止缴费年月"></el-table-column>
                <el-table-column prop="paymentType" label="缴费类别"></el-table-column>
                <el-table-column prop="paymentBase" label="缴费基数"></el-table-column>
                <el-table-column prop="personAmount" label="个人缴费金额"></el-table-column>
                <el-table-column prop="companyAmount" label="单位缴费金额"></el-table-column>
                <el-table-column prop="company" label="缴费单位名称"></el-table-column>
                <el-table-column prop="accountFlag" label="到账标志"></el-table-column>
                <el-table-column prop="accountMonth" label="到账时间"></el-table-column>
                <el-table-column prop="amonut" label="应缴总额"></el-table-column>
                <el-table-column prop="period" label="所属期"></el-table-column>
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
                    total:1,
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
                    requestId: sessionStorage.getItem('sbid'),
                    pageNo: this.pageParam.currentPage,
                    pageSize: this.pageParam.pageSize
                };
                this.$axios.post(this.$api.getloansRecord, param).then(res=>{
                    console.log(res.data)
                        this.flows = res.data.tableList;
                        		          this.pageParam.total = res.data.total;

                    })
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
