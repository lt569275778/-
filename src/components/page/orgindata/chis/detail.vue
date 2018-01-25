<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                当前位置：学信数据查询/详情
            </el-breadcrumb>
        </div>
        <div class="cons">
            <p style="margin-left: 33px">
                <img :src="headImg" v-if="headHidden" style="vertical-align: middle">
                [ {{person.realName}} ]- <span class="cons_p_span">实名制</span>
            </p>
            <table class="autab">
                <tr>
                    <td class="autab_td1">性别</td>
                    <td class="autab_td2">{{person.sex}}</td>
                    <td class="autab_td1">出生日期</td>
                    <td class="autab_td2">{{person.birthday}}</td>
                    <td class="autab_td1">民族</td>
                    <td class="autab_td2">{{person.nation}}</td>
                    <td class="autab_td1">身份证号</td>
                    <td class="autab_td2">{{person.identificationNumber}}</td>
                </tr>
            </table>
        </div>

        <br/>

        <div>
            <div class="cons" v-for="item in tableData" :key="item.id">
                <p class="cons_p2">学历信息</p>
                <table class="edtab">
                    <tr>
                        <td class="edtab_td1">学校名称：</td>
                        <td class="edtab_td2">{{item.collegeName}}</td>
                        <td class="edtab_td1">学历类型：</td>
                        <td class="edtab_td2">{{item.eduType}}</td>
                        <td class="edtab_td3" rowspan="7">
                            <div class="edtab_td3_con"><img :src=item.photo /></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="edtab_td1">分院：</td>
                        <td class="edtab_td2">{{item.branchCollege}}</td>
                        <td class="edtab_td1">学制：</td>
                        <td class="edtab_td2">{{item.eduDuration}}</td>
                    </tr>
                    <tr>
                        <td class="edtab_td1">系(所,函授站):</td>
                        <td class="edtab_td2">{{item.department}}</td>
                        <td class="edtab_td1">层次：</td>
                        <td class="edtab_td2">{{item.eduLevel}}</td>
                    </tr>
                    <tr>
                        <td class="edtab_td1">专业：</td>
                        <td class="edtab_td2">{{item.majorName}}</td>
                        <td class="edtab_td1">学习形式：</td>
                        <td class="edtab_td2">{{item.studyMode}}</td>
                    </tr>
                    <tr>
                        <td class="edtab_td1">班级：</td>
                        <td class="edtab_td2">{{item.class}}</td>
                        <td class="edtab_td1">学籍状态：</td>
                        <td class="edtab_td2">{{item.rollStatus}}</td>
                    </tr>
                    <tr>
                        <td class="edtab_td1">学号：</td>
                        <td class="edtab_td2">{{item.stuNo}}</td>
                        <td class="edtab_td1">证书编号：</td>
                        <td class="edtab_td2">{{item.certificateNo}}</td>
                    </tr>
                    <tr>
                        <td class="edtab_td1">入学日期：</td>
                        <td class="edtab_td2">{{item.enrollDate}}</td>
                        <td class="edtab_td1">离校日期：</td>
                        <td class="edtab_td2">{{item.leaveDate}}</td>
                    </tr>
                </table>
            </div>
        </div>

    </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data(){
            return {
                person:{},
                tableData:[],
                id: '',
                headImg:'',
                headHidden:false
            }
        },
        props: [],
        mounted(){
            this.id = sessionStorage.getItem("chisId");
            this.loadData();
        },
        methods:{
            loadData(){
                this.$axios({
                    method:"post",
                    url:this.$api.chisEducationList,
                    data:{
                      id:this.id,
                    }
                }).then(res =>{
                    if(res.data.returnCode="200"){
                        this.tableData = res.data.tableList
                        this.person = res.data.tableList[0];
                        if("男" == res.data.tableList[0].sex){
                            this.headImg = "../../../../../static/img/men.png";
                            this.headHidden = true;
                        }
                        else if("女" == res.data.tableList[0].sex){
                            this.headImg = "../../../../../static/img/women.png";
                            this.headHidden = true;
                        }
                    }
                    else {
                        this.$message.error(res.data.returnMsg);
                    }
                }).catch(rej =>{
                    console.log(rej);
                })
            }
        },
    }
</script>

<style scoped>
    .cons_p_span{ font-size:13px; color:#FF5722;}
    .autab{width:94%; margin:0 auto; background:#f3f4f8; margin:15px auto; border-radius:5px; padding:10px 0;}
    .autab_td1{color:#a0a0a0; text-align:right; height:40px; line-height:40px; width:9%; padding-right:1%;}
    /**表格**/
    .cons{width:100%; border-radius:3px; background:#fff; overflow:hidden;}
    .cons_p2{height:40px;line-height: 40px; border-bottom: 2px solid #5CACEE; padding:0 20px; font-size:13px; margin-bottom:15px;}
    .edtab{width:94%; margin:15px auto; border-radius:5px; padding:10px 0; border-collapse:collapse;}
    .edtab_td1{width:16%; padding:0 2%; text-align:left; background:#fafafa; height:40px; line-height:40px; border:1px solid #dcdcdc;}
    .edtab_td2{width:16%; padding:0 2%;  text-align:left; border:1px solid #dcdcdc;}
    .edtab_td3{width:20%; text-align:center; border:1px solid #dcdcdc;}
    .edtab_td3_con{width:130px; height:150px; background:#fafafa; margin:0 auto; border:1px dashed #dbdbdb; line-height:150px; color:#999999; font-size:14px;}
</style>

