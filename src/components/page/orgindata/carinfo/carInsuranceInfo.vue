<template>
    <div>
        <div>
          <table id="carbf" v-for="item in tableData">
            <tr>
                <td class="atb">保额总计</td>
                <td class="atb1">{{item.totalCoverage}}</td>
                <td class="atb">保费总计</td>
                <td class="atb1">{{item.totalPremium}}</td>
                <td class="atb">已交保费金额</td>
                <td class="atb1">{{item.paidPremium}}</td>
                <td class="atb">欠费保费金额</td>
                <td class="atb1">{{item.unpaidPremium}}</td>
            </tr>
              <tr>
                  <td class="atb">缴费日期</td>
                  <td class="atb1">{{item.paymentDate}}</td>
                  <td class="atb">浮动系数总计</td>
                  <td class="atb1">{{item.totalCoefficient}}</td>
              </tr>
          </table>
            <el-table :data="InsuranceDetail" style="width: 100%;margin-top:30px;">
                  <el-table-column prop="insuranceType" label="险种名称" width="180"></el-table-column>
                  <el-table-column prop="insuranceCoverage" label="保险保额" width="180"></el-table-column>
                  <el-table-column prop="standardPremium" label="标准保费"></el-table-column>
                  <el-table-column prop="actualPremium" label="实缴保费"></el-table-column>
                  <el-table-column prop="premiumCoefficient" label="浮动系数"></el-table-column>
                  <el-table-column prop="floatingReason" label="浮动原因"></el-table-column>
            </el-table>
        </div>
        <div>
            <page :formInline="pageParam" @pageSubmit="loadData"></page>
        </div>
    </div>
</template>

<script>
    import Page from '../../../common/page'

    export default {
        data() {
            return {
                tableData: [],
                InsuranceDetail: [],
                pageParam: {
                    currentPage:1,
                    total:0,
                    pageSize:10,
                    loading2:false
                }

            }
        },
        mounted() {
          this.loadData();
        },
        methods: {
            loadData() {
                var param = {
                    id: sessionStorage.getItem('tdId'),
                    pageNo: this.pageParam.currentPage,
                    pageSize: this.pageParam.pageSize
                };

                this.$axios.post(this.$api.getCarInsuranceInfo+"?id="+sessionStorage.getItem('tdId')).then(
                    function(result) {
                        this.tableData = result.data.tableList;
                    }.bind(this));
                this.$axios.post(this.$api.getCarInsuranceDetail, param).then(
                    function(result) {
                        this.InsuranceDetail = result.data.tableList;
                        this.pageParam.total = result.data.total;
                    }.bind(this));
            }
        },
        components: {
            Page
        }
    }
</script>

<style scoped>
    #carbf{
  width:100%;
  border-collapse:collapse;
  border-color: #f4f4f4;
}
.atb {
  font-size: 14px;
  padding: 3px 7px 2px 7px;
  text-align: center;
  border: 1px solid #f4f4f4;
  text-align: center;
  height:60px;
  padding-right: 1%;
  color: #333;
}
.atb1 {
  font-size: 14px;
  padding: 3px 7px 2px 7px;
  text-align: center;
  border: 1px solid #f4f4f4;

  text-align: center;
  color: #999;
  /* height:50px; */
  /* line-height: 50px; */
  width: 10%;
}
</style>
