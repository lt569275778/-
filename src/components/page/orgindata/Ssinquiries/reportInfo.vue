<template>
    <div>
        <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="tradeTime"
        label="时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tradeType"
        label="类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tradePlace"
        label="医院名称">
      </el-table-column>
       <el-table-column
        prop="tradeAmount"
        label="总费用">
      </el-table-column> <el-table-column
        prop="personOut"
        label="个人账户支出">
      </el-table-column>
       <el-table-column
        prop="poolOut"
        label="统筹账户支出">
      </el-table-column>
       <el-table-column
        prop="medicareOut"
        label="医保支出">
      </el-table-column>
       <el-table-column
        prop="ownExpense"
        label="自费">
      </el-table-column>
       <el-table-column
        prop="payCash"
        label="现金支付">
      </el-table-column>
       <el-table-column
        prop="payBig"
        label="大额支付">
      </el-table-column>
    <el-table-column
        prop="claimsAmount"
        label="报销金额">
      </el-table-column>
    </el-table>
        <div>
            <page :formInline="pageParam" @pageSubmit="loadData"></page>
        </div>
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
                tableData: [],
                pageParam: {
                    currentPage:1,
                    total:0,
                    pageSize:10,
                    loading2:false
                },
                id:''

            }
        },
        mounted() {
          this.id= sessionStorage.getItem('sbid')
              this.loadData();
        },
        methods: {
          loadData() {
             var  param ={
              pageNo:this.pageParam.currentPage,
              pageSize: this.pageParam.pageSize,   
              requestId:this.id  
                 };
            this.$axios.post(this.$api.getreprotinfo,param).then(res=>{
                 this.tableData = res.data.tableList;    
                //  console.log(res.data)
                 this.pageParam.total = res.data.total;
                 this.loading=true;
               });
          }
        }
    }
</script>

<style scoped>
    .edtab_td1{width: 11%;background:#fafafa;border:1px solid #dcdcdc; height:40px;line-height:20px;text-align:left;padding:0.2%;font-size: 12px;}
    .edtab_td2{width: 9%;text-align:left; border:1px solid #dcdcdc;padding:0.2%;font-size: 12px;}
</style>
