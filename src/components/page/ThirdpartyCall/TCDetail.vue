<template>
    <div class="div_overflow">
        <component v-bind:is="whichToShow"></component>
    </div>
</template>

<style>
    .div_overflow {position:absolute; width:100%;height:100%; overflow:auto;}
</style>

<script>
    export default {
        data(){
            return {
                whichToShow:''
            }
        },
        components: {
            fsfundDetail: resolve => {require(['../orgindata/fsfund/detail.vue'], resolve)},
            ssiDetail: resolve => {require(['../orgindata/Ssinquiries/ssiDetail.vue'], resolve)},
            carDetail: resolve => {require(['../orgindata/carinfo/carinfoDetail.vue'], resolve)},
            cbankDetail: resolve => {require(['../orgindata/cbank/detail.vue'], resolve)},
            chisDetail: resolve => {require(['../orgindata/chis/detail.vue'], resolve)},
            jdDetail: resolve => {require(['../orgindata/jd/jdDetail.vue'], resolve)},
            operatorDetail: resolve => {require(['../orgindata/operator/detail.vue'], resolve)}
        },
        created() {
        	var productId=this.$route.query.productId;
        	if(productId=='FS_FUND'){
        		this.whichToShow='fsfundDetail';
        	}else if(productId=='FS_SOCIALSECURITY'){
        		this.whichToShow='ssiDetail';
        	}else if(productId=='TD_CXBD'){
        		this.whichToShow='carDetail';
        	}else if(productId=='RENHANG'){
        		this.whichToShow='cbankDetail';
        	}else if(productId=='XUEXIN'){
        		this.whichToShow='chisDetail';
        	}else if(productId=='JD'){
        		this.whichToShow='jdDetail';
        	}else if(productId=='YYS'){
        		this.whichToShow='operatorDetail';
        	}
        }
    }

</script>
