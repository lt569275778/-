<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                当前位置：渠道信息维护
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
                        <el-option label="是" :value="1" selected></el-option>
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
            <el-button type="info" size="small" class="el-icon-circle-plus-outline" @click="addChannel()">添加</el-button>
        </div>
        <div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;"  v-loading="loading2" element-loading-text="拼命加载中">
                <el-table-column prop="id" label="渠道ID" width="80"></el-table-column>
                <el-table-column prop="channelName" label="渠道名称" width="100"></el-table-column>
                <el-table-column show-overflow-tooltip="true" prop="url" label="渠道URL"></el-table-column>
                <el-table-column show-overflow-tooltip="true" prop="publicKey" label="公钥" width="70"></el-table-column>
                <el-table-column show-overflow-tooltip="true" prop="privateKey" label="私钥" width="70"></el-table-column>
                <el-table-column prop="isValid" label="是否有效" width="100"></el-table-column>
                <el-table-column show-overflow-tooltip="true" prop="createTime" label="创建时间" width="100"></el-table-column>
                <el-table-column prop="createUser" label="创建者" width="80"></el-table-column>
                <el-table-column show-overflow-tooltip="true" prop="updateTime" label="更新时间" width="100"></el-table-column>
                <el-table-column prop="updateUser" label="更新者" width="80"></el-table-column>
                <el-table-column  width="140" label="操作">
                    <template scope="scope">
                        <el-button type="info" size="small" @click="getChannelInfo({id: scope.row.id})">修改</el-button>
                        <!--<el-button type="danger" size="small" @click="del({id: scope.row.id})">删除</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <page :formInline="pageParam" @pageSubmit="loadData"></page>
        </div>
        <div>
            <el-dialog title="修改渠道信息" :visible.sync="dialogFormVisible" @close="refresh">
                <edit :addOrUpdate="addOrUpdate" :channelData="channelData" :isDisabled="isDisabled" @closeDialog="closeDialog"></edit>
            </el-dialog>
        </div>
    </div>
</template>

<style>
</style>

<script type="text/javascript">
    import Page from '../../../common/page'
    import edit from './edit'

    export default {
        data() {
            return {
                loading2: false,
                tableData: [],
                channelName: '',
                isValid: '',
                pageParam: {
                    currentPage:1,
                    total:0,
                    pageSize:10,
                },
                channelOptions: [],
                dialogFormVisible: false,
                loading2:false,
                channelData: []
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
                    channelName: this.channelName
                    };
                this.$axios.post(this.$api.channelList, param).then(
                    function(result) {
                        this.tableData = result.data.tableList;
                        this.pageParam.total = result.data.total;
                     }.bind(this)
                   );
                this.loading2 = false;
            },
            onSubmit() {
              this.loadData();
            },
            reset() {
                this.isValid = '';
                this.channelName = '';
            },
            getSelectOptions() {
                this.$axios.post(this.$api.getChannelOption).then(
                    function(result){
                        this.channelOptions = result.data.ChannelOptions;
                    }.bind(this)
                )
            },
            //根据渠道id获取渠道信息
            getChannelInfo(obj) {
                this.addOrUpdate = 'update';
                this.isDisabled = true;
                this.channelId = obj.id;
                this.dialogFormVisible = true;
                if(this.channelId != null && this.channelId != "") {
                    this.$axios.post(this.$api.getChannelInfo+"?channelId="+this.channelId).then(
                        function(result) {
                            if(result.data.returnCode == '200') {
                                this.channelData = result.data.channel;
                            } else {
                                this.$message.error(result.data.returnMsg);
                            }
                        }.bind(this)
                    );
                }
            },
            addChannel() {
                this.addOrUpdate = 'add';
                this.isDisabled = false;
                this.channelData = {
                    id: '',
                    channelName: '',
                    url: '',
                    publicKey: '',
                    privateKey: '',
                    isValid: ''
                };
                this.dialogFormVisible = true;

            },
            closeDialog() {
                this.$emit('close');
                this.dialogFormVisible = false;
            },
            //刷新页面
            refresh() {
                this.loadData();
            },
            del(obj) {
                this.$axios.post(this.$api.deleteChannel+"?channelId="+obj.id).then(
                    function(result) {
                        if(result.data.code == '200'){
                            this.$message({
                                message: result.data.message,
                                type: 'success'
                            });
                        }else {
                            this.$message.error(result.data.message);
                        }
                    }.bind(this)
                );
            }
        }
    }
</script>
