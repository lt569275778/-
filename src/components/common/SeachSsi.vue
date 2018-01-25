<template>
    <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="客户姓名">
            <el-input v-model="formInline.realName" placeholder="客户姓名" size="small" class="pcs-input"></el-input>
        </el-form-item>

        <el-form-item label="渠道">
            <el-select :loading="loading" @change="selectchange" @visible-change="getSelectOptions" v-model="formInline.channelId" clearable="true" class="pcs-select">
                <el-option  clearable v-for="item in options"  :key="item.channelName" :label="item.channelName" :value="item.id" class="pcs-option">
                </el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="时间">
            <el-date-picker v-model="formInline.startTime" value-format="yyyy-MM-dd hh:mm:ss" :editable="false" type="datetime" placeholder="请输入起始时间" :picker-options="pickerOptionsStart">
            </el-date-picker>&nbsp;至&nbsp;
            <el-date-picker v-model="formInline.endTime"  value-format="yyyy-MM-dd hh:mm:ss" :editable="false" type="datetime" placeholder="请输入截止时间" :picker-options="pickerOptionsEnd">
            </el-date-picker>
        </el-form-item>

        <slot name="extendCondition"></slot>

        <el-form-item>
            <el-button type="primary" class="el-icon-search" @click="onSubmit">查询</el-button>
            <el-button type="primary" class="el-icon-refresh" @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      options: [],
      channelId: "",
      loading: false,
      clearable: true,
      pickerOptionsStart: {
        disabledDate: time => {
          if (this.formInline.endTime) {
            return time.getTime() > new Date(this.formInline.endTime).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          if (this.formInline.startTime) {
            return (
              time.getTime() < new Date(this.formInline.startTime).getTime()
            );
          }
        }
      }
    };
  },
  props: ["formInline"],
  methods: {
    onSubmit() {
      this.$emit("childSubmit");
    },
    reset() {
      this.formInline.realName = "";
      this.formInline.startTime = "";
      this.formInline.endTime = "";
      this.formInline.channelId = "";
    },
    selectchange(e){
      console.log(e)
    },
    getSelectOptions(){
        this.loading = true;
        this.$axios({
            method:"post",
            url:this.$api.getChannelOption
        }).then(res =>{
            if(res.data.returnCode=="200"){
                this.options = res.data.ChannelOptions;
                this.loading = false;
            }
        })
    }
  }
};
</script>

<style scoped>
.pcs-input {
  width: 150px;
}
.pcs-select {
  width: 150px;
}
.pcs-option {
  width: 150px;
}
</style>

