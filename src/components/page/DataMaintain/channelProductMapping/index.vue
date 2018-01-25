<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                当前位置：渠道产品映射关系
            </el-breadcrumb>
        </div>
        <div>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="渠道名称">
                    <el-select v-model="channelName" @visible-change="getSelectOptions" clearable placeholder="请选择">
                        <el-option v-for="item in channelOptions" :key="item.channelName" :label="item.channelName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否有效">
                    <el-select v-model="isValid" clearable placeholder="请选择">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="el-icon-search" @click="onSubmit">查询</el-button>
                    <el-button type="primary" class="el-icon-refresh" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-button type="info" size="small" class="el-icon-circle-plus-outline" @click="addChannelProduct">添加</el-button>
        </div>
        <div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;"  v-loading="loading2" element-loading-text="拼命加载中">
                <el-table-column prop="channelId" label="渠道ID"></el-table-column>
                <el-table-column prop="certificationId" label="产品ID"></el-table-column>
                <el-table-column prop="isValid" label="是否有效"></el-table-column>
                <el-table-column  show-overflow-tooltip="true" prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="createUser" label="创建者"></el-table-column>
                <el-table-column  show-overflow-tooltip="true" prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column prop="updateUser" label="更新者"></el-table-column>
                <el-table-column fixed="right" width="100" label="操作">
                    <template scope="scope">
                        <el-button type="info" size="small" @click="editChannelProduct({id: scope.row.id})">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <page :formInline="pageParam" @pageSubmit="loadData"></page>
        </div>
        <div>
            <el-dialog title="修改渠道信息" :visible.sync="dialogFormVisible" @close="refresh">
                <edit :addOrUpdate="addOrUpdate" :channelProductData="channelProductData"  :isDisabled="isDisabled" @closeDialog="closeDialog"></edit>
            </el-dialog>
        </div>
    </div>
</template>

<style>

</style>

<script>
    import Page from '../../../common/page'
    import edit from './edit'

    export default {
        data() {
            return {
                loading2: false,
                tableData: [],
                dialogFormVisible: false,
                pageParam: {
                    currentPage:1,
                    total:0,
                    pageSize:10,
                },
                channelOptions: [],
                isValid: '',
                channelProductData: []
            }
        },
        components: {
            Page,
            edit
        },
        mounted() {
            this.loadData();
        },
        methods: {
            loadData() {
                this.loading2 = true;
                var param =  {
                    pageNo: this.pageParam.currentPage,
                    pageSize: this.pageParam.pageSize,
                    isValid: this.isValid,
                    channelId: this.channelName
                };
                this.$axios.post(this.$api.channelProductList, param).then(
                   function(result) {
                       this.tableData = result.data.tableList;
                       this.pageParam.total = result.data.total;
                   }.bind(this)
                );
                this.loading2 = false;
            },
            getSelectOptions() {
                this.$axios.post(this.$api.getChannelOption).then(
                    function(result){
                        this.channelOptions = result.data.ChannelOptions;
                    }.bind(this)
                )
            },
            //修改
            editChannelProduct(obj){
                this.addOrUpdate = 'update';
                this.cpid = obj.id;
                this.isDisabled = true;
                this.dialogFormVisible = true;
                this.$axios.post(this.$api.getChannelProductMapping+"?id="+this.cpid).then(
                    function(result) {
                        this.channelProductData = result.data.channelCertificationMapping;
                    }.bind(this)
                );
            },
            addChannelProduct() {
                this.addOrUpdate = 'add';
                this.isDisabled = false;
                this.channelProductData = {
                    channelId: '',
                    certificationId: '',
                    isValid: ''
                };
                this.dialogFormVisible = true;
            },
            closeDialog(){
                this.$emit('close');
                this.dialogFormVisible = false;
            },
            //刷新页面
            refresh() {
                this.loadData();
            },
            onSubmit() {
                this.loadData();
            },
            reset() {
                this.isValid = '';
                this.channelName = ''
            }
        }
    }
</script>
