<template>
    <div>
        <div align="center">
            <el-form  :inline="true" :rules="rules" class="demo-form-inline" :model="channelProductData" :label-position="labelPosition">
                <el-form-item label="渠道ID" prop="channelId" :label-width="formLabelWidth">
                    <el-select v-model="channelProductData.channelId" @visible-change="getSelectOptions" clearable placeholder="请选择" :disabled="isDisabled">
                        <el-option v-for="item in channelOptions" :key="item.id" :label="item.id" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品ID" prop="certificationId" :label-width="formLabelWidth">
                    <el-select v-model="channelProductData.certificationId" @visible-change="getProductOptions" clearable placeholder="请选择">
                        <el-option v-for="item in productOptions" :key="item.productName" :label="item.productId" :value="item.productId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否有效" prop="isValid" :label-width="formLabelWidth">
                    <el-select v-model="channelProductData.isValid">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div>
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="saveChannelProduct">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script>

    export default {
        data() {
            return {
                formLabelWidth: '120px',
                labelPosition: 'right',
                channelOptions: [],
                productOptions: [],
                rules: {
                    channelId: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    certificationId: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    isValid: [{
                        required: true
                    }]
                }
            }
        },
        props:['addOrUpdate','channelProductData','isDisabled'],
        methods: {
            //保存
            saveChannelProduct() {
                var param = this.channelProductData;
                if(this.channelProductData.channelId == '') {
                    this.$message.error("渠道ID不能为空！");
                    return;
                };
                if(this.channelProductData.certificationId == '') {
                    this.$message.error("产品ID不能为空！");certificationId
                    return;
                };
                this.$axios.post(this.$api.saveChannelProductMapping+"?addOrUpdate="+this.addOrUpdate, param).then(
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
                this.closeDialog();
            },
            //关闭dialog
            closeDialog(){
                this.$emit("closeDialog");
            },
            getSelectOptions() {
                this.$axios.post(this.$api.getChannelOption).then(
                    function(result){
                        this.channelOptions = result.data.ChannelOptions;
                    }.bind(this)
                )
            },
            getProductOptions() {
                this.$axios.post(this.$api.getProductOptions).then(
                  function(result) {
                      this.productOptions =  result.data.tableList;
                  }.bind(this)
                );
            }

        }
    }
</script>
