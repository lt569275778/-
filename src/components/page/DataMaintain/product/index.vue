<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                当前位置：产品信息维护
            </el-breadcrumb>
        </div>
        <div>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="产品名称">
                    <el-select v-model="productId" @visible-change="getProductOptions" clearable placeholder="请选择">
                        <el-option v-for="item in productOptions" :key="item.productName" :label="item.productName" :value="item.productId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否有效">
                    <el-select v-model="isValid" clearable placeholder="请选择">
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <el-button type="info" size="small" class="el-icon-circle-plus-outline" @click="addProduct()">添加</el-button>
        </div>
        <div>
            <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中">
                <el-table-column prop="productId" label="产品id" width="100"></el-table-column>
                <el-table-column prop="productName" class="tableColumn" label="产品名称" width="100"></el-table-column>
                <el-table-column prop="supplier" label="来源"></el-table-column>
                <el-table-column show-overflow-tooltip="true" prop="productUrl" label="URL"></el-table-column>
                <el-table-column prop="img" show-overflow-tooltip="true" label="图标"></el-table-column>
                <el-table-column prop="intervalTime" label="间隔时间" width="100"></el-table-column>
                <el-table-column prop="sort" label="排序"></el-table-column>
                <el-table-column prop="isValid" label="是否有效" width="100"></el-table-column>
                <el-table-column show-overflow-tooltip="true" prop="createTime" label="创建时间" width="100"></el-table-column>
                <el-table-column prop="createUser" label="创建者"></el-table-column>
                <el-table-column show-overflow-tooltip="true" prop="updateTime" label="更新时间" width="100"></el-table-column>
                <el-table-column prop="updateUser" label="更新者"></el-table-column>
                <el-table-column fixed="right" width="100" label="操作">
                    <template scope="scope">
                        <el-button type="info" size="small" @click="editProduct({productId: scope.row.productId})">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div>
            <page :formInline="pageParam" @pageSubmit="loadData"></page>
        </div>
        <div>
            <el-dialog title="修改产品信息" :visible.sync="dialogFormVisible" @close="refresh">
                <edit :addOrUpdate="addOrUpdate" :productData="productData" :isDisabled="isDisabled" @closeDialog="closeDialog"></edit>
            </el-dialog>
        </div>
    </div>
</template>

<style scoped>
    .tableColumn {
        width:100px;
    }
</style>

<script type="text/javascript">
    import Page from '../../../common/page'
    import edit from './edit'

    export default{
        data() {
            return {
                loading2: false,
                tableData: [],
                pageParam: {
                    currentPage:1,
                    total:0,
                    pageSize:10
                },
                dialogFormVisible: false,
                loading2:false,
                productData: [],
                isValid: '',
                productId: '',
                productOptions: []
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
                var param = {
                    pageNo: this.pageParam.currentPage,
                    pageSize: this.pageParam.pageSize,
                    isValid: this.isValid,
                    productId: this.productId
                };
                this.$axios.post(this.$api.ProductList, param).then(
                    function(result) {
                        if(result.data.returnCode == '200'){
                            this.tableData = result.data.tableList;
                            this.pageParam.total = result.data.total;
                        }else {
                            this.$message.error(result.data.returnMsg);
                        }
                    }.bind(this)
                );
                this.loading2 = false;
            },
            //修改产品信息
            editProduct(obj) {
                this.dialogFormVisible = true;
                this.addOrUpdate = 'update';
                this.isDisabled = true;
                if(obj.productId != null && obj.productId != "") {
                    this.$axios.post(this.$api.getProduct+"?pId="+obj.productId).then(
                        function(result) {
                            if(result.data.returnCode == '200') {
                                this.productData = result.data.certification;
                            }else{
                                this.$message.error(result.data.returnMsg);
                            }
                        }.bind(this)
                    );
                }
            },
            addProduct() {
                this.addOrUpdate = 'add';
                this.isDisabled = false;
                this.productData = {
                    productId: '',
                    productName: '',
                    supplier: '',
                    productUrl: '',
                    img: '',
                    intervalTime: '',
                    sort: '' ,
                    isValid: ''
                };
                this.dialogFormVisible = true;
            },
            onSubmit() {
                this.loadData();
            },
            closeDialog() {
                this.$emit('close');
                this.dialogFormVisible = false;
            },
            //刷新页面
            refresh() {
                this.loadData();
            },
            getProductOptions() {
                this.$axios.post(this.$api.getProductOptions).then(
                    function(result) {
                        this.productOptions =  result.data.tableList;
                    }.bind(this)
                );
            },
            reset() {
                this.isValid = '';
                this.productId =  '';
            }
        }
    }

</script>
