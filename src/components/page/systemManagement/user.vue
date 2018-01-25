<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                当前位置：系统管理/用户管理
            </el-breadcrumb>
        </div>
        <div>
            <Seach-newuser :formInline="searchConditionParam" @childSubmit="loadData"></Seach-newuser>
        </div>
        <div>
            <el-table :data="tableData" @selection-change="selsChange" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
            <el-table-column prop="organizationName" label="所属公司"></el-table-column>
            <el-table-column prop="departmentName" label="部门"></el-table-column>
            <el-table-column prop="username" label="登录名"></el-table-column>
            <el-table-column prop="realName" label="姓名"></el-table-column>
            <el-table-column prop="roles" label="用户角色"></el-table-column>
            <el-table-column prop="mobile" label="手机号"></el-table-column>
            <el-table-column fixed="right" label="操作" >
                <template scope="scope">
                        <el-button type="text" size="small" @click="setStore({id: scope.row.id})">查看</el-button>
                        <el-button type="text" size="small" @click="handleEdit({id:scope.row.id})">编辑</el-button>
                        <el-button type="text" size="small" @click="handleDel({id:scope.row.id})">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        </div>
        <!-- 新增编辑 -->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :data="editForm" label-width="80px" ref="addForm">
                <el-form-item label="所属公司">
                    <el-select style="width:100%" disabled="true" @change="selectgs" v-model="editForm.organizationName" clearable placeholder="请选择"  @visible-change="getOrganizationSelections">
                        <el-option v-for="item in orgOptions" :key="item.id" :label="item.organizationName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门">
                    <el-select style="width:100%" disabled="true" @change="selectbm" v-model="editForm.departmentName" clearable placeholder="请选择"  @visible-change="getDepSelections">
                        <el-option v-for="item in depOptions" :key="item.id" :label="item.organizationName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="登录名">
				  	<el-input v-model="editForm.username" disabled="true" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户角色">
           <el-checkbox-group v-model="checkboxuser">
                        <el-checkbox @change="idontknow" v-for="item in roles" :label="item.id" :key="item.id" >{{item.roleName}}</el-checkbox>
           </el-checkbox-group>
				</el-form-item>
          <el-form-item label="姓名">
				  	<el-input v-model="editForm.realName" disabled="true" auto-complete="off"></el-input>
				</el-form-item>
          <el-form-item label="手机号码">
					  <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
				</el-form-item>
          <el-form-item label="邮箱">
					  <el-input v-model="editForm.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="editForm.remarks" :rows="5"></el-input>
				</el-form-item>
				<el-form-item label="状态">
                <el-switch on-value="1" off-value="0" v-model="getflag3" @change="test" active-value="1" inactive-value="0" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				</el-form-item>
      </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" type="primary" @click.native="edituserSubmit" :loading="editLoading" class="btnwidth1">提交</el-button>
				<el-button size="medium" @click.native="resetuser" class="btnwidth2">重置</el-button>
      </div>
		</el-dialog>
    <!-- 这是查看页面 -->
<el-dialog title="用户详情" :visible.sync="centerDialogVisible" center=true>
  <p style="border-bottom:1px solid #f3f3f3"></p>
  <div style="paddting-top:50px;"></div>
  <span class="lleft">所属公司：{{personinfo.organizationName}}</span>
  <span class="rright" id="infouser">用户角色：{{personinfo.roles}}</span>
  <span class="lleft">所属部门：{{personinfo.departmentName}}</span>
  <span class="rright">手机号码：{{personinfo.mobile}}</span>
  <span class="lleft">姓名：{{personinfo.realName}}</span>
  <span class="rright">邮箱：{{personinfo.email}}</span>
  <span class="lleft">登录名：{{personinfo.username}}</span>
  <span class="rright" v-if="personinfo.flag==1">状态：启用</span>
  <span class="rright" v-else>状态：未启用</span>

  <span class="remarks">备注：{{personinfo.remarks}}</span>
  <p class="bor"></p>
   <p class="time">创建时间：{{personinfo.createTime}}   创建人：{{personinfo.createUser}}    更新时间：{{personinfo.updateTime}}   更新人：{{personinfo.updateUser}}</p>
</el-dialog>
        <page :formInline="pageParam" @pageSubmit="loadData"></page>
    </div>
</template>

<script type="text/ecmascript-6">
var zscgvalue = [];
import SeachNewuser from "../../common/SeachNewuser";
import Page from "../../common/page";
export default {
  data() {
    return {
      tableData: [],
      personinfo: {},
      searchConditionParam: {},
      pageParam: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      loading2: false,
      editFormVisible: false,
      editLoading: false,
      // dialogTableVisible:false,
      centerDialogVisible: false,
      getflag3: 1,
      editForm: [
        {
          organizationId: "",
          departmentId: "",
          username: "",
          roleIdList: [],
          realName: "",
          mobile: "",
          email: "",
          remarks: "",
          flag: "1"
        }
      ],
      checkboxuser: [],
      orgOptions: [],
      depOptions: [],
      roles: []
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    resetuser() {
      this.editForm.roleIdList = [];
      this.editForm.mobile = "";
      this.editForm.email = "";
      this.editForm.remarks = "";
      this.checkboxuser = [];
    },
    selectgs(e) {
      this.editForm.organizationId = e;
    },
    isInArray: function(arr, value) {
      for (var i = 0; i < arr.length; i++) {
        if (value === arr[i]) {
          return true;
        }
      }
      return false;
    },
    removeByValue: function(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    idontknow(e) {
      let isChecked = e.target.checked;
      let mValue = e.target.value;
      if (isChecked) {
        var isContain = this.isInArray(zscgvalue, mValue);
        if (!isContain) {
          zscgvalue.push(mValue);
        }
      } else {
        this.removeByValue(zscgvalue, mValue);
      }
      console.log(zscgvalue);
    },
    test(e) {
      this.getflag3 = e;
    },
    selsChange(e) {
      var ids = [];
      for (let i = 0; i < e.length; i++) {
        ids.push(e[i].id);
        sessionStorage.setItem("idss", ids);
      }
    },
    handleDel: function(obj) {
      let parm = {
        menuId: "CD2013",
        userId: sessionStorage.getItem("useridd"),
        authorityFlag: "2"
      };
      this.$axios({
        method: "post",
        url: this.$api.hasRes,
        data: parm
      }).then(res => {
        if (res.data.returnCode == "10001") {
          this.$confirm("确认删除该记录吗?", "提示", {
            type: "warning"
          })
            .then(() => {
              this.listLoading = true;
              let para = { id: obj.id };
              this.$axios.post(this.$api.stopUser, para).then(res => {
                this.listLoading = false;
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.loadData();
              });
            })
            .catch(() => {});
        } else {
          this.$message({
            message: "您未拥有该权限",
            type: "warning"
          });
        }
      });
    },
    handleEdit(obj) {
      let parm = {
        menuId: "CD2013",
        userId: sessionStorage.getItem("useridd"),
        authorityFlag: "3"
      };
      this.$axios({
        method: "post",
        url: this.$api.hasRes,
        data: parm
      }).then(res => {
        if (res.data.returnCode == "10001") {
          this.editFormVisible = true;
        } else {
          this.$message({
            message: "您未拥有该权限",
            type: "warning"
          });
        }
      });
      sessionStorage.setItem("ggg", obj.id);
      this.$axios({
        method: "post",
        url: this.$api.selectRoleSelections
      }).then(res => {
        console.log(res.data);
        if (res.data.returnCode == "200") {
          this.roles = res.data.tableList;
        }
      });
      // ---
      this.$axios({
        method: "post",
        url: this.$api.selectUserid,
        data: {
          id: obj.id
        }
      }).then(res => {
        console.log(res.data);
        this.editForm = res.data.user;
        let arrnew = res.data.user.roles;
        this.checkboxuser = [];
        //  this.checkedCities = [];
        for (let i = 0; i < arrnew.length; i++) {
          let arr = arrnew[i].id;
          this.checkboxuser.push(arr);
        }
        zscgvalue = this.checkboxuser;
      });
    },
    edituserSubmit() {
      var parm = {
        id: sessionStorage.getItem("ggg"),
        organizationId: this.editForm.organizationId,
        departmentId: this.editForm.departmentId,
        username: this.editForm.username,
        roleIdList: zscgvalue,
        realName: this.editForm.realName,
        mobile: this.editForm.mobile,
        email: this.editForm.email,
        remarks: this.editForm.remarks,
        flag: this.getflag3,
        createUser: sessionStorage.getItem("useridd"),
        updateUser: sessionStorage.getItem("useridd")
      };
      console.log(parm);
      this.$axios({
        method: "post",
        url: this.$api.updatauser,
        data: parm
      }).then(res => {
        let isArray = res.data;
        if (!Array.isArray(isArray)) {
          if (isArray.returnCode == "200") {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.editFormVisible = false;
            this.loadData();
          } else {
            this.$message({
              message: isArray.returnMsg,
              type: "warning"
            });
          }
        } else {
          this.editFormVisible = false;
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].returnCode == "200") {
              this.$message({
                message: res.data[i].returnMsg,
                type: "success"
              });
              this.editFormVisible = false;
              this.loadData();
            } else if (res.data[i].returnCode == "10000") {
              this.$message({
                message: res.data[i].returnMsg,
                type: "warning"
              });
            }else{
              this.$message({
                message: res.data[i].returnMsg,
                type: "warning"
              });
            }
          }
        }
      });
    },
    loadData() {
      this.loading2 = true;
      let param = this.searchConditionParam;
      param.pageNo = this.pageParam.currentPage;
      param.pageSize = this.pageParam.pageSize;
      param.organizationName = this.searchConditionParam.gsName;
      param.departmentName = this.searchConditionParam.bmName;
      this.$axios({
        method: "post",
        url: this.$api.selectUserList,
        data: param
      })
        .then(res => {
          console.log(res.data);
          if (res.data.returnCode == "200") {
            // this.tableData = res.data.tableList;
            let oridata = res.data.tableList;
           for(let i=0;i<oridata.length;i++){
               let role = oridata[i].roles
               let roles = "";
               for(let j=0;j<role.length;j++){
                   roles = roles + role[j].role_Name +" "
               }
               oridata[i].roles = roles;
           }
           this.tableData = oridata
            this.pageParam.total = res.data.total;
          } else {
            this.$message.error(res.data.returnMsg);
          }
          this.loading2 = false;
        })
        .catch(rej => {
          console.log(rej);
          this.loading2 = false;
        });
    },
    setStore(obj) {
      let parm = {
        menuId: "CD2013",
        userId: sessionStorage.getItem("useridd"),
        authorityFlag: "4"
      };
      this.$axios({
        method: "post",
        url: this.$api.hasRes,
        data: parm
      }).then(res => {
        if (res.data.returnCode == "10001") {
          this.centerDialogVisible = true;
        } else {
          this.$message({
            message: "您未拥有该权限",
            type: "warning"
          });
        }
      });

      this.$axios({
        method: "post",
        url: this.$api.selectUserid,
        data: {
          id: obj.id
        }
      }).then(res => {
        console.log(res.data);
        let arr = res.data.user.roles;
        let starrole = [];
        for (let i = 0; i < arr.length; i++) {
          starrole.push(arr[i].role_Name);
        }
        this.personinfo = res.data.user;
        this.personinfo.roles = starrole;
      });
    }
  },
  components: {
    Page,
    SeachNewuser
  }
};
</script>

<style scoped>
.remarks {
  width: 100%;
  padding-left: 60px;
  box-sizing: border-box;
  margin-top: 5px;
  float: left;
  height: 50px;  
}
#infouser{
  height: 45px;
  overflow: auto;
}
.time {
  margin-top: 20px;
  padding-left: 50px;
}
.bor {
  padding-top: 200px;
  box-sizing: border-box;
  border-bottom: 1px solid #f3f3f3;
}
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
.el-button {
  padding: 7px 0px;
  float: left;
}
.dialog-footer {
  float: right;
}
.lleft {
  display: block;
  width: 50%;
  float: left;
  line-height: 40px;
  padding-left: 60px;
  box-sizing: border-box;
}
.rright {
  display: block;
  float: right;
  width: 50%;
  line-height: 40px;
  padding-left: 80px;
  box-sizing: border-box;
}
.dialog-footer {
  position: relative;
}
.btnwidth1 {
  width: 120px;
  position: absolute;
  top: -40px;
  left: -440px;
  height: 40px;
}
.btnwidth2 {
  width: 120px;
  height: 40px;
  position: absolute;
  top: -40px;
  left: -310px;
}
</style>

