<template>
    <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="所属公司">
            <el-input v-model="formInline.gsName" placeholder="请输入所属公司名称" size="small" class="pcs-input"></el-input>
        </el-form-item>
        <el-form-item label="部门">
            <el-input v-model="formInline.bmName" placeholder="请输入所属部门名称" size="small" class="pcs-input"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
            <el-input v-model="formInline.realName" placeholder="请输入用户姓名" size="small" class="pcs-input"></el-input>
        </el-form-item>
        <slot name="extendCondition"></slot>
        <el-form-item>
            <el-button type="primary" size="medium" class="el-icon-search" @click="onSubmit">查询</el-button>
            <el-button type="primary" size="medium" class="el-icon-refresh" @click="reset">重置</el-button>
        </el-form-item>
        <div class="padd"></div>
        <div style="margin-top:10px;">
 <el-form-item>
            <el-button type="primary" size="medium" class="el-icon-add" @click="handleAdd">+ 添加用户</el-button>
        </el-form-item>

        </div>
         <!--添加用户 -->
    </el-form>
    <el-dialog title="添加用户" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :data="addForm" label-width="80px" ref="addForm">
                <el-form-item label="所属公司">
                    <el-select style="width:100%" v-model="addForm.organizationId" clearable placeholder="请选择"  @visible-change="getOrganizationSelections">
                        <el-option v-for="item in orgOptions" :key="item.id" :label="item.organizationName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门" prop="addForm">
                    <el-select style="width:100%" v-model="addForm.departmentId" clearable placeholder="请选择"  @visible-change="getDepSelections">
                        <el-option v-for="item in depOptions" :key="item.id" :label="item.organizationName" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
				<el-form-item label="登录名">
				  	<el-input v-model="addForm.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="用户角色">
                    <el-checkbox-group v-model="checkboxuser">
                        <el-checkbox @change="idontknow" v-for="item in roles" :label="item.id" :key="item.id" >{{item.roleName}}</el-checkbox>
                    </el-checkbox-group>
				</el-form-item>
          <el-form-item label="姓名">
				  	<el-input v-model="addForm.realName" auto-complete="off"></el-input>
				</el-form-item>
          <el-form-item label="手机号码">
					  <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
				</el-form-item>
          <el-form-item label="邮箱">
					  <el-input v-model="addForm.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="addForm.remarks" :rows="5"></el-input>
				</el-form-item>
				<el-form-item label="状态">
                <el-switch on-value="1" off-value="0" v-model="getvalue3" @change="test" active-value="1" inactive-value="0" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				</el-form-item>

      </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" type="primary" @click.native="adduserSubmit" :loading="editLoading" class="btnwidth">提交</el-button>
				<el-button size="medium" @click.native="resetuser" class="btnwidth">重置</el-button>
      </div>
		</el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
const zscgvalue = [];
export default {
  data() {
    return {
      orgOptions: [],
      depOptions: [],
      roles: [],
      loading: false,
      clearable: true,
      checkboxuser: [],
      addForm: {
        organizationId: "",
        departmentId: "",
        username: "",
        roleIdList: [],
        realName: "",
        mobile: "",
        email: "",
        remarks: ""
      },
      getvalue3: 1,
      addFormVisible: false,
      listLoading: false,
      value1: true,
      value2: true
    };
  },
  props: ["formInline"],
  methods: {
    resetuser() {
      this.addForm = {};
      this.checkboxuser = [];
    },
    test(e) {
      this.getvalue3 = e;
    },
    onSubmit() {
      this.$emit("childSubmit");
    },
    getOrganizationSelections() {
      this.addForm.departmentId = "";
      let data = {};
      this.loading = true;
      this.$axios({
        method: "post",
        data: data,
        url: this.$api.selectmainjg
      }).then(res => {
        if (res.data.returnCode == "200") {
          this.orgOptions = res.data.tableList;
          this.loading = false;
        }
      });
    },
    getDepSelections() {
      let parentsId = this.addForm.organizationId;
      let data = {};
      data.parentsId = parentsId;
      if (parentsId == "") {
        return;
      }
      this.loading = true;
      this.$axios({
        method: "post",
        data: data,
        url: this.$api.selectmainjg
      }).then(res => {
        if (res.data.returnCode == "200") {
          this.depOptions = res.data.tableList;
          this.loading = false;
        }
      });
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
    },
    handleAdd() {
      this.resetuser();
      let parm = {
        menuId: "CD2013",
        userId: sessionStorage.getItem("useridd"),
        authorityFlag: "1"
      };
      this.$axios({
        method: "post",
        url: this.$api.hasRes,
        data: parm
      }).then(res => {
        if (res.data.returnCode == "10001") {
          this.addFormVisible = true;
        } else {
          this.$message({
            message: "您未拥有该权限",
            type: "warning"
          });
        }
      });
      this.$axios({
        method: "post",
        url: this.$api.selectRoleSelections
      }).then(res => {
        if (res.data.returnCode == "200") {
          this.roles = res.data.tableList;
        }
      });
    },
    reset() {
      this.formInline.realName = "";
      this.formInline.gsName = "";
      this.formInline.bmName = "";
      this.resetagin();
    },
    resetagin() {
      this.formInline = [];
    },
    adduserSubmit() {
      var parm = {
        organizationId: this.addForm.organizationId,
        departmentId: this.addForm.departmentId,
        username: this.addForm.username,
        roleIdList: zscgvalue,
        realName: this.addForm.realName,
        mobile: this.addForm.mobile,
        email: this.addForm.email,
        remarks: this.addForm.remarks,
        flag: this.getvalue3,
        createUser: sessionStorage.getItem("useridd")
      };
      console.log(parm);
      this.$axios({
        method: "post",
        url: this.$api.insertUser,
        data: parm
      }).then(res => {
        let isArray = res.data;
        if (!Array.isArray(isArray)) {
          if (isArray.returnCode == "200") {
            this.$message({
              message: "添加成功",
              type: "success"
            });
            this.addFormVisible = false;
            this.$emit("childSubmit");
          } else {
            this.$message({
              message: isArray.returnMsg,
              type: "warning"
            });
          }
        } else {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].returnCode == "200") {
              this.$message({
                message: "添加成功",
                type: "success"
              });
              this.addFormVisible = false;
              this.$emit("childSubmit");
            } else if (res.data[i].returnCode == "-200") {
              this.$message({
                message: res.data[i].returnMsg,
                type: "warning"
              });
            } else {
              this.$message({
                message: res.data[i].returnMsg,
                type: "warning"
              });
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.pcs-input {
  width: 150px;
}
.pcs-select {
  width: 150px;
}
.pcs-option {
  width: 150px;
}
.padd {
  border-bottom: 1px solid #f3f3f3;
  padding-bottom: 2px;
}
.dialog-footer {
  text-align: center;
}
.btnwidth {
  width: 120px;
}
</style>

