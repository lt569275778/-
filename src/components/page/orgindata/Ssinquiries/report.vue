<template>
   <table id="tablebar">
                <tr>
                    <td class="atb">最近缴纳时间</td>
                    <td class="atb1">{{personInfo.period}}</td>
                    <td class="atb">历史连续缴纳最大月数</td>
                    <td class="atb1">{{personInfo.continuousPaymentMaxMonths}}</td>
                    <td class="atb">历史连续缴纳最大基数</td>
                    <td class="atb1">{{personInfo.maxBase}}</td>
                    <td class="atb">平均缴纳基数</td>
                    <td class="atb1">{{personInfo.averageBase}}</td>
                </tr>
                <tr>
                    <td class="atb">最近缴纳基数</td>
                    <td class="atb1">{{personInfo.currentBase}}</td>
                    <td class="atb">最近单位缴纳月数</td>
                    <td class="atb1">{{personInfo.currentPaymentMonths}}</td>
                    <td class="atb">预计月收入</td>
                    <td class="atb1">{{personInfo.yjMonthIncome}}</td>
                    <td class="atb">联系电话</td>
                    <td class="atb1">{{personInfo.phone}}</td>
                </tr>
                <tr>
                    <td class="atb">通讯地址</td>
                    <td class="atb1">{{personInfo.address}}</td>
                </tr>
            </table>
</template>
<style scoped>
.atb {
  font-size: 14px;
  padding: 3px 7px 2px 7px;
  text-align: center;
  border: 1px solid #f3f3f3;
  text-align: center;
  color: #666;
  text-align: center;
  height: 40px;
  line-height: 40px;
  width: 12%;
  padding-right: 1%;
}
.atb1 {
  font-size: 14px;
  padding: 3px 7px 2px 7px;
  text-align: center;
  border: 1px solid #f3f3f3;
  text-align: center;
  height: 40px;
  line-height: 40px;
  width: 12%;
  color: #333
}
</style>
<script>
export default {
  data() {
    return {
      personInfo: []
    };
  },
  mounted() {
    this.id = sessionStorage.getItem("sbid");
    this.loadData();
  },
  methods: {
    loadData() {
      this.$axios
        .post(this.$api.getsbreport, { requestId: this.id })
        .then(res => {
          this.personInfo = res.data.report;
        });
    }
  }
};
</script>

