<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                当前位置：用户日志信息查询
            </el-breadcrumb>
        </div>

        <div>
            <search-condition :formInline="searchConditionParam" @childSubmit="loadData">
            </search-condition>
        </div>

        <el-table :data="tableData" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
            <el-table-column prop="identificationNumber" label="客户身份证号" show-overflow-tooltip=true></el-table-column>
            <el-table-column prop="realName" label="姓名" width="80" show-overflow-tooltip=true></el-table-column>
            <el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
            <el-table-column prop="lastTime" label="最后一次浏览时间" show-overflow-tooltip=true></el-table-column>
            <el-table-column prop="productName" label="浏览产品" width="120"show-overflow-tooltip=true></el-table-column>
            <el-table-column prop="browseCount" label="浏览次数" width="120"show-overflow-tooltip=true></el-table-column>
            <el-table-column prop="channelName" label="渠道"  width="120"show-overflow-tooltip=true></el-table-column>
        </el-table>

        <page :formInline="pageParam" @pageSubmit="loadData"></page>
    </div>
</template>

<script type="text/ecmascript-6">
    import SearchCondition from '../../common/SearchCondition'
    import page from '../../common/page'
    export default {
        data(){
            return {
                tableData:[],
                searchConditionParam: {
                },
                pageParam:{
                    currentPage: 1,
                    total: 0,
                    pageSize: 10,
                },
                loading2: false
            }
        },
        components:{
            SearchCondition:SearchCondition,
            Page:page
        },
        mounted(){
            this.loadData();
        },
        methods:{
            loadData(){
                this.loading2 = true;
                let param = this.searchConditionParam;
                param.pageNo = this.pageParam.currentPage;
                param.pageSize = this.pageParam.pageSize;

                this.$axios({
                    method:"post",
                    url:this.$api.getBrowselogs,
                    data:param,
                }).then(res =>{
                    if(res.data.returnCode == "200"){
                        console.log(res)
                        this.tableData = res.data.tableList;
                        this.pageParam.total = res.data.total;
                    }
                    else {
                        this.$message.error(res.data.returnMsg);
                    }
                    this.loading2 = false;
                }).catch(rej =>{
                    console.log(rej);
                    this.loading2 = false;
                })
            }
        }
    }
</script>

<style scoped>

</style>

