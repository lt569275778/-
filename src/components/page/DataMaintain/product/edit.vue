<template>
    <div>
        <div align="center">
            <el-form :inline="true" :rules="rules" class="demo-form-inline" :model="productData">
                <el-form-item label="产品ID" prop="productId" :label-width="formLabelWidth">
                    <el-input v-model="productData.productId" auto-complete="off" :disabled="isDisabled"></el-input>
                </el-form-item>
                <el-form-item label="产品名称" prop="productName" :label-width="formLabelWidth">
                    <el-input v-model="productData.productName" auto-complere="off"></el-input>
                </el-form-item>
                <el-form-item label="来源" prop="supplier" :label-width="formLabelWidth">
                    <el-input v-model="productData.supplier" auto-complere="off"></el-input>
                </el-form-item>
                <el-form-item label="URL" prop="productUrl" :label-width="formLabelWidth">
                    <el-input v-model="productData.productUrl" auto-complere="off"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="img" :label-width="formLabelWidth">
                    <el-input v-model="productData.img" auto-complere="off"></el-input>
                </el-form-item>
                <el-form-item label="间隔时间" prop="intervalTime" :label-width="formLabelWidth">
                    <el-input v-model="productData.intervalTime" auto-complere="off"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort" :label-width="formLabelWidth">
                    <el-input v-model="productData.sort" auto-complere="off"></el-input>
                </el-form-item>
                <el-form-item label="是否有效" prop="isValid" :label-width="formLabelWidth">
                    <el-select v-model="productData.isValid">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div>
                <el-button @click="closeDialog()">取 消</el-button>
                <el-button type="primary" @click="saveProduct">确 定</el-button>
            </div>
        </div>
    </div>
</template>

<style>

</style>

<script type="text/javascript">
    export default {
        props: ['addOrUpdate','productData','isDisabled'],
        data() {
            return {
                formLabelWidth: '120px',
                certificationForm: [],
                rules: {
                    intervalTime: [{
                        required: true,
                        message: '只能为数字',
                        trigger: 'blur'
                    }],
                    sort: [{
                        required: true,
                        message: '只能为数字',
                        trigger: 'blur'
                    }],
                    productName: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    supplier: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    isValid: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    img: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    productUrl: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }],
                    productId: [{
                        required: true,
                        message: '不能为空',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            //保存产品信息
            saveProduct() {
                var param = this.productData;
                this.$axios.post(this.$api.saveProduct+"?addOrUpdate="+this.addOrUpdate, param).then(
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
