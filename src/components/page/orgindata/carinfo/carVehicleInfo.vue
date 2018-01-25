<template>
    <div>
    	<div>
          <table id="carVehicleInfo" border="1" v-for="item in tableData">
              <tr >
                  <td class="atb">车牌号码</td>
                  <td class="atb1">{{item.plateNumber}}</td>
                  <td class="atb">品牌型号</td>
                  <td class="atb1">{{item.brandModel}}</td>
                  <td class="atb">发动机型号</td>
                  <td class="atb1">{{item.engineNumber}}</td>
                  <td class="atb">车架号码</td>
                  <td class="atb1">{{item.frameNumber}}</td>
              </tr>
                <tr>
                  <td class="atb">注册日期</td>
                  <td class="atb1">{{item.registerDate}}</td>
                  <td class="atb">车辆类型</td>
                  <td class="atb1">{{item.vehicleType}}</td>
                  <td class="atb">核定载重重量</td>
                  <td class="atb1">{{item.approvedLoad}}</td>
                  <td class="atb">核定载重数量</td>
                  <td class="atb1">{{item.approvedCapacity}}</td>
              </tr>
              <tr>
                  <td class="atb">使用性质</td>
                  <td class="atb1">{{item.vehicleUsage}}</td>
                  <td class="atb">车主姓名</td>
                  <td class="atb1">{{item.ownerName}}</td>
                  <td class="atb">车主证件号</td>
                  <td class="atb1">{{item.ownerId}}</td>
                  <td class="atb">车主生日</td>
                  <td class="atb1">{{item.ownerBirthday}}</td>
              </tr>
          </table>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                pageParam: {
                    currentPage:1,
                    total:0,
                    pageSize:10,
                    loading2:false
                },
                tableData: []
            }
        },
	    mounted(){
	     	this.loadData();
	    },
        methods:{
	     	loadData() {
		        this.$axios.post(this.$api.getCarVehicleInfo+"?id="+sessionStorage.getItem('tdId')).then(function(result){
		          this.tableData = result.data.tableList;
		          this.loading2 = false;
		        }.bind(this)).catch(function (error) {
		            this.loading2 = false;
		        }.bind(this));
	     	}
	     }
    }
</script>
<style scoped>
#carVehicleInfo{
    border: 1px solid #f3f3f3;
      border-collapse:collapse;

}
    .atb {
        font-size: 14px;
        padding: 3px 7px 2px 7px;
        text-align: center;
        border: 1px solid #f3f3f3;
        text-align: center;
        color: #222;
        text-align: center;
        height: 40px;
        line-height: 40px;
        width: 12%;
        padding-right: 1%;
    }
    .atb1 {
        padding: 3px 7px 2px 7px;
        text-align: center;
        border: 1px solid #f3f3f3;
        text-align: center;
        height: 40px;
        line-height: 40px;
        width: 12%;
        font-size: 14px;
        color: #999;
    }
</style>

