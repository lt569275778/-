<template>
    <div>
       <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="applicantName" label="投保人姓名" width="120"></el-table-column>
      <el-table-column prop="applicantId" show-overflow-tooltip="true" label="投保人证件号码" width="150"></el-table-column>
      <el-table-column prop="applicantBirthday" label="投保人生日" width="120"></el-table-column>
      <el-table-column prop="applicantMobile" label="投保人手机号码" width="140"></el-table-column>
      <el-table-column prop="applicantEmail" label="投保人邮箱" width="120"></el-table-column>
      <el-table-column prop="insurantName" label="被投保人姓名" width="120"></el-table-column>
      <el-table-column prop="insurantId" show-overflow-tooltip="true" label="被投保人证件号码" width="150"></el-table-column>
      <el-table-column prop="insurantBirthday" label="被投保人生日" width="120"></el-table-column>
    </el-table>
    </div>
</template>

<script>
    import Page from '../../../common/page'

    export default {
        components: {
            Page
        },
        data() {
            return {
                tableData: []
            }
        },
        mounted() {
           this.loadData();
        },
        methods: {
          loadData() {
            this.$axios.post(this.$api.getCarApplicantInsurantInfo+"?id="+sessionStorage.getItem('tdId')).then(
               function(result) {
                 this.tableData = result.data.tableList;
                 this.loading=true;
               }.bind(this));
          }
        }
    }
</script>

<style scoped>
    .edtab_td1{width: 11%;background:#fafafa;border:1px solid #dcdcdc; height:40px;line-height:20px;text-align:left;padding:0.2%;font-size: 12px;}
    .edtab_td2{width: 9%;text-align:left; border:1px solid #dcdcdc;padding:0.2%;font-size: 12px;}
</style>
