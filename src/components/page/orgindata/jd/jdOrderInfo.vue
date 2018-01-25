<template>
    <div>
        <div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中">
                <el-table-column prop="settleDate" label="订单时间"></el-table-column>
                <el-table-column prop="goodName" label="商品名"></el-table-column>
                <el-table-column prop="name" label="收货人"></el-table-column>
                <el-table-column prop="settleAmount" label="总价"></el-table-column>
                <el-table-column prop="status" label="交易状态"></el-table-column>
            </el-table>
        </div>
        <div>
            <page :formInline="pageParam" @pageSubmit="loadData"></page>
        </div>
    </div>
</template>

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
</style>

<script type="text/javascript">
    import Page from '../../../common/page'

    export default {
        data(){
            return {
                tableData: [],
                loading2:false,
                pageParam: {
                    currentPage:1,
                    total:0,
                    pageSize:10,
                    loading2:false
                }
            }
        },
        props:['id'],
        components: {
            Page
        },
        mounted() {
          this.loadData();
        },
        methods: {
            loadData() {
                var param = {
                  pageNo: this.pageParam.currentPage,
                  pageSize: this.pageParam.pageSize,
                  jdId: this.id
                };
                this.$axios.post(this.$api.jdOrderInfo, param).then(function(result){
                        if(result.data.returnCode == "200") {
                            this.tableData = result.data.tableList;
                            this.pageParam.total = result.data.total;
                        }else {
                            this.$message.error(result.data.returnMsg);
                        }
                        this.loading2 = false;
                    }.bind(this)).catch(function (error) {
                        console.log(error);
                        this.loading2 = false;
                    }.bind(this)
                )
            }
        }
    }
</script>
