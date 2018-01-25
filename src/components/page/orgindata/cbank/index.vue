<template>
  <div id="users">
  	<div class="crumbs">
        <el-breadcrumb separator="/">
                     当前位置：征信数据查询
        </el-breadcrumb>
    </div>
      <div>
          <search-condition :formInline="searchConditionParam" @childSubmit="loadData"></search-condition>
      </div>
    <el-table :data="tableData" stripe="true" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
      <el-table-column show-overflow-tooltip="true" prop="identificationNumber" label="客户身份证号" ></el-table-column>
      <el-table-column prop="realName" label="姓名" ></el-table-column>
      <el-table-column prop="mobile" label="手机号" ></el-table-column>
      <el-table-column show-overflow-tooltip="true" prop="createTime" label="生成时间" ></el-table-column>
      <el-table-column prop="channelName" label="渠道" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template scope="scope">
          <router-link :to="{name: 'cbankDetail'}" tag="span">
              <el-button type="info" size="small" @click="setStore({id: scope.row.id})">查看</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
      <div>
          <page :formInline="pageParam" @pageSubmit="loadData"></page>
      </div>
  </div>
</template>
<style type="text/css" scoped>
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
<script type="text/javascript">
    import Page from '../../../common/page'
    import SearchCondition from "../../../common/SearchCondition"

  export default {
    data() {
      return {
        tableData: [],
        searchConditionParam: {
        },
        pageParam: {
            currentPage:1,
            total:0,
            pageSize:10
        },
        loading2:false,
      }
    },
    mounted() {
      this.loadData();
    },
     components: {
          Page,
          searchCondition:SearchCondition
     },
    methods: {
      //加载数据
      loadData() {
        this.loading2 = true;
        let param = this.searchConditionParam;
        param.pageNo = this.pageParam.currentPage;
        param.pageSize = this.pageParam.pageSize;
        this.$axios.post(this.$api.cbankList, param).then(function(result){
          this.tableData = result.data.tableList;
          this.pageParam.total = result.data.total;
          this.loading2 = false;
        }.bind(this)).catch(function (error) {
            this.loading2 = false;
        }.bind(this));
      },
      setStore(obj) {
          sessionStorage.setItem("bankId", obj.id);
      }
    }
  }
</script>
