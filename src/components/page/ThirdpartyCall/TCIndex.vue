<template>
    <div>
    </div>
</template>

<script>
    export default {
        beforeCreate() {
            var param = {
                channelId: this.$route.query.channelId,
                productId: this.$route.query.productId,
                identificationNumber: this.$route.query.identificationNumber
            };
            this.$axios.post(this.$api.getRequestId, param).then(function(result) {
                if(result.data.requestId) {
                	if(this.$route.query.productId=='FS_FUND'){
                		sessionStorage.setItem('fundId', result.data.requestId);
                	}else if(this.$route.query.productId=='FS_SOCIALSECURITY'){
                		sessionStorage.setItem('sbid', result.data.requestId);
                	}else if(this.$route.query.productId=='JD'){
                		sessionStorage.setItem('jdId', result.data.requestId);
                	}else if(this.$route.query.productId=='RENHANG'){
                		sessionStorage.setItem('bankId', result.data.requestId);
                	}else if(this.$route.query.productId=='XUEXIN'){
                		sessionStorage.setItem('chisId', result.data.requestId);
                	}else if(this.$route.query.productId=='YYS'){
                		sessionStorage.setItem('operatorId', result.data.requestId);
                	}else if(this.$route.query.productId=='TD_CXBD'){
                		sessionStorage.setItem('tdId', result.data.requestId);
                	}
                    this.$router.push({path: "fundDetail",query:{productId:this.$route.query.productId}});
                }else{
                    this.$message.error("未查询到该客户报告信息");
                }
            }.bind(this));
        }
    }

</script>
