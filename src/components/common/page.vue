<template>
    <div class="block">
        <div class="r_page">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="formInline.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="formInline.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="formInline.total">
            </el-pagination>
        </div>
    </div>
</template>

<style type="text/css" scoped>
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
        /*position:absolute; right:0px; bottom:0px; height:35px;*/
    }
</style>

<script type="text/javascript">
    export default {
        props: ['formInline'],
        methods: {
            //改变分页大小
            handleSizeChange(val) {
                this.formInline.pageSize = val;
                this.$emit("pageSubmit");
            },
            //跳转页数
            handleCurrentChange(val) {
                this.formInline.currentPage = val;
                this.$emit("pageSubmit");
            }
        }
    }
</script>
