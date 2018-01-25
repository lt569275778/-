<template>
    <div>
        <div>
            <el-table :data="flows" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中">
                <el-table-column prop="createTime" label="订单时间"></el-table-column>
                <el-table-column prop="orderNo" label="订单号"></el-table-column>
                <el-table-column prop="goodsName" label="订单商品名称"></el-table-column>
                <el-table-column prop="name" label="订单收货人"></el-table-column>
                <el-table-column prop="status" label="订单状态"></el-table-column>
                <el-table-column prop="orderFee" label="订单总价"></el-table-column>
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
                    id : sessionStorage.getItem('taobaoid'),
                    pageNo: this.pageParam.currentPage,
                    pageSize: this.pageParam.pageSize
                };
                this.$axios.post(this.$api.ordersInfo, param).then(res=>{
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
