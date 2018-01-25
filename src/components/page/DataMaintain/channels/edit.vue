<template>
    <div>
        <div align="center">
            <el-form :inline="true" :rules="rules" class="demo-form-inline" :model="channelData" :label-position="labelPosition">
                <el-form-item label="渠道ID" prop="id" :label-width="formLabelWidth">
                    <el-input v-model="channelData.id" auto-complete="off" :disabled="isDisabled"></el-input>
                </el-form-item>
                <el-form-item label="渠道名称" prop="channelName" :label-width="formLabelWidth">
                    <el-input v-model="channelData.channelName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="渠道URL" prop="url" :label-width="formLabelWidth">
                    <el-input v-model="channelData.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="公钥" :label-width="formLabelWidth">
                    <el-input v-model="channelData.publicKey" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="私钥" :label-width="formLabelWidth">
                    <el-input v-model="channelData.privateKey" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否有效" prop="isValid" :label-width="formLabelWidth">
                    <el-select v-model="channelData.isValid">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="saveChannelInfo">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<style>
</style>

<script type="text/javascript">
    export default {
        props:['channelData','addOrUpdate','isDisabled'],
        data() {
            return {
                formLabelWidth: '130px',
                labelPosition: 'right',
                rules: {
                    id: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    channelName: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    url: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    isValid: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            //保存渠道信息
            saveChannelInfo() {
                var param = this.channelData;
                this.$axios.post(this.$api.saveChannel+"?addOrUpdate="+this.addOrUpdate, param).then(
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
            //关闭Diaiog
            closeDialog() {
                this.$emit("closeDialog");
            }
        }
    }
</script>
