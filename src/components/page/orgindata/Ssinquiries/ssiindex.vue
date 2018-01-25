<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                当前位置：社保原始数据查询
            </el-breadcrumb>
        </div>
        <div>
            <seach-ssi :formInline="searchConditionParam" @childSubmit="loadData"></seach-ssi>
        </div>
        <div>
            <el-table :data="tableData" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
            <el-table-column prop="identificationNumber" label="客户身份证号" show-overflow-tooltip=true></el-table-column>
            <el-table-column prop="realName" label="姓名"></el-table-column>
            <el-table-column prop="username" label="手机号"></el-table-column>
            <el-table-column prop="createTime" label="生成时间" show-overflow-tooltip=true ></el-table-column>
            <!-- <el-table-column prop="分期购" label="渠道"></el-table-column> -->
            <el-table-column prop="channelName" label="渠道"></el-table-column>
            <el-table-column fixed="right" label="操作" >
                <template scope="scope">
                    <router-link :to="{name: 'ssiDetail'}" tag="span">
                        <el-button type="info" size="small" @click="setStore({id: scope.row.id})">查看</el-button>
                    </router-link>
                </template>
            </el-table-column>
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
              this.$axios({
                  method:"post",
                  url:this.$api.getSB,
                  data:param,
              }).then(res =>{
                  if(res.data.returnCode == "200"){
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
                sessionStorage.setItem("sbid", obj.id);
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

