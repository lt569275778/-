<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                当前位置：用户日志信息查询
            </el-breadcrumb>
        </div>
        <div>
            <seach-ssi :formInline="searchConditionParam" @childSubmit="loadData"></seach-ssi>
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
            <el-table-column prop="identityCode" label="客户身份证号" show-overflow-tooltip=true></el-table-column>
            <el-table-column prop="realName" label="姓名"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column prop="mobile" label="最后浏览时间"></el-table-column>
            <el-table-column prop="mobile" label="浏览产品"></el-table-column>
            <el-table-column prop="mobile" label="浏览次数"></el-table-column>
            <el-table-column prop="mobile" label="最终认证状态"></el-table-column>
            <el-table-column prop="createTime" label="渠道" show-overflow-tooltip=true ></el-table-column>
        </el-table>
        </div>
        <page :formInline="pageParam" @pageSubmit="loadData"></page>
    </div>
</template>

<script type="text/ecmascript-6">
    import SeachSsi from '../../../common/SeachSsi'
    import Page from "../../../common/page"
    export default {
        data(){
            return{
                tableData:[],
                searchConditionParam:{},
                pageParam:{
                    currentPage: 1,
                    total: 0,
                    pageSize: 10,
                },
                loading2: false
            }
        },
        mounted(){
            this.loadData();
        },
        methods:{
          loadData () {
              this.loading2 = true;
              let param = this.searchConditionParam;
              param.pageNo = this.pageParam.currentPage;
              param.pageSize = this.pageParam.pageSize;
            //   param.realName=this.searchConditionParam.realNamea;

              this.$axios({
                  method:"post",
                  url:this.$api.taobaoList,
                  data:param,
              }).then(res =>{
                  if(res.data.returnCode == "200"){
                      console.log(res.data)
                      this.tableData = res.data.tableList;
                      this.pageParam.total = res.data.total;
                  }
                  else {
                      this.$message.error(res.data.returnMsg);
                  }
                  this.loading2 = false;
              }).catch(rej =>{
                //   console.log(rej);
                  this.loading2 = false;
              })
          },
            setStore(obj) {
                sessionStorage.setItem("taobaoid", obj.id);
            }
        },
        components:{
            Page,
            SeachSsi 
        }
    }
</script>

<style scoped>
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
    }
</style>

