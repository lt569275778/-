<template>
    <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="机构名称">
            <el-input v-model="formInline.jgname" placeholder="请输入机构名称" size="small" class="pcs-input" type="text"></el-input>
        </el-form-item>
        <el-form-item label="机构类型">
            <el-select v-model="formInline.jgtype" clearable placeholder="请选择">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </el-form-item>
        <slot name="extendCondition"></slot>
        <el-form-item>
            <el-button type="primary" size="medium" class="el-icon-search" @click="onSubmit">查询</el-button>
            <el-button type="primary" size="medium" class="el-icon-refresh" @click="reset">重置</el-button>
        </el-form-item>
        <div class="padd"></div>
        <div style="margin-top:10px;">
 <el-form-item>
            <el-button type="primary" size="medium" class="el-icon-add" @click="handleAdd">+ 添加机构</el-button>
            <!-- <el-button type="primary" size="medium" class="el-icon-delete" @click="batchRemove">删除</el-button> -->
        </el-form-item>

        </div>
         <!--添加用户 -->
    </el-form>
    <el-dialog title="添加机构" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :data="addForm" label-width="80px" ref="addForm">
        	<el-form-item label="机构名称" >
					<el-input v-model="addForm.name" auto-complete="off"  maxlength=50></el-input>
				</el-form-item>
				<el-form-item label="机构类型" >
					  <el-select v-model="value" placeholder="请选择"  style="width:100%" @change="select1">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
				</el-form-item>

				<el-form-item label="机构级别" >
				    <el-select v-model="value1" placeholder="请选择" :disabled="inputdisabled1" style="width:100%" >
    <el-option>
    </el-option>
  </el-select>
				</el-form-item>
			  	<el-form-item label="上级机构">
				  	 <el-select v-model="value2" placeholder="请选择" @change="selecttwo" :disabled="inputdisabled"  style="width:100% " >
    <el-option
      v-for="item in optionss"
      :key="item.id"
      :label="item.organizationName"
      :value="item.id">
    </el-option>
  </el-select>
				</el-form-item>
          <el-form-item label="机构编码" >
				  	<el-input v-model="addForm.id" auto-complete="off" maxlength=10 @blur="check"></el-input>
				</el-form-item>
          <el-form-item label="负责人" maxlength=15>
					  <el-input v-model="addForm.organizationLeader" auto-complete="off"></el-input>
				</el-form-item>
          <el-form-item label="电话" >
					  <el-input v-model="addForm.mobile" auto-complete="off" @blur="phoneVerification"></el-input>
				</el-form-item>
                <el-form-item label="邮箱" >
					  <el-input v-model="addForm.email" auto-complete="off"  @blur="checkemail"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="addForm.remark" :rows="5"></el-input>
				</el-form-item>
				<el-form-item label="状态">
        <el-switch v-model="value3" @change="test" on-value="1" off-value="0" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				</el-form-item>
      </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" type="primary" @click.native="addSubmit" :loading="editLoading" class="btnwidth">提交</el-button>
				<el-button size="medium" @click.native="resetjg" class="btnwidth">重置</el-button>
      </div>
		</el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      options: [
        {
          value: "集团",
          label: "集团"
        },
        {
          value: "公司",
          label: "公司"
        },
        {
          value: "一级部门",
          label: "一级部门"
        },
        {
          value: "二级部门",
          label: "二级部门"
        },
        {
          value: "组",
          label: "组"
        }
      ],
      value: "",
      btndisabled: false,
      options1: [
        {
          value: "集团",
          label: "集团"
        },
        {
          value: "公司",
          label: "公司"
        },
        {
          value: "一级部门",
          label: "一级部门"
        },
        {
          value: "二级部门",
          label: "二级部门"
        },
        {
          value: "组",
          label: "组"
        }
      ],
      jgvalue: "",
      optionss: [],
      value1: "",
      value2: "",
      inputdisabled: false,
      inputdisabled1: false,
      loading: false,
      clearable: true,
      addForm: [
        {
          id: "",
          name: "",
          email: "",
          organizationLeader: "",
          organizationType: "",
          addr: "",
          // flag:'',
          remark: ""
        }
      ],
      addFormVisible: false,
      listLoading: false,
      // value1: true,
      value3: false,
      flagvalue: "1"
      // btndisabled:false
    };
  },
  props: ["formInline"],
  methods: {
    check() {
      if (!/^[\u4e00-\u9fa5]+$/gi.test(this.addForm.id)) {
      } else {
        this.$notify.error({
          title: "错误",
          message: "请输入正确的机构编码,只能包括英文字母和数据"
        });
      }
    },
    phoneVerification() {
      if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.addForm.mobile)) {
        this.$notify.error({
          title: "错误",
          message: "请输入正确的手机号码"
        });
      } else {
      }
    },
    checkemail() {
      if (
        !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(
          this.addForm.email
        )
      ) {
        this.$notify.error({
          title: "错误",
          message: "请输入正确的邮箱格式"
        });
      } else {
      }
    },
    resetjg() {
      this.addForm = [];
      this.value = "";
      this.value2 = "";
      this.value1 = "";
    },
    onSubmit() {
      console.log(this.formInline.jgtype);
      this.$emit("childSubmit");
    },
    select1() {
      var arr = ["A", "B", "C", "D", "E"];
      if (this.value == "集团") {
        this.inputdisabled1 = true;
        this.value1 = arr[0];
      } else if (this.value == "公司") {
        this.inputdisabled1 = true;

        this.value1 = arr[1];
      } else if (this.value == "一级部门") {
        this.inputdisabled1 = true;

        this.value1 = arr[2];
      } else if (this.value == "二级部门") {
        this.inputdisabled1 = true;

        this.value1 = arr[3];
      } else {
        this.inputdisabled1 = true;

        this.value1 = arr[4];
      }
      this.$axios({
        method: "post",
        url: this.$api.selectmainjg,
        data: {
          organizationLevel: this.value1
        }
      }).then(res => {
        this.optionss = res.data.tableList;
      });
    },
    selecttwo(e) {
      // console.log(e)
      this.addForm.parentsId = e;
    },
    test(val) {
      this.flagvalue = val;
    },
    getSelectOptions() {
      this.loading = true;
      this.$axios({
        method: "post",
        url: this.$api.getChannelOption
      }).then(res => {
        if (res.data.returnCode == "200") {
          this.options = res.data.ChannelOptions;
          this.loading = false;
        } else {
          this.$message({
            message: res.data.returnMsg,
            type: "warning"
          });
        }
      });
    },
    handleAdd() {
      this.resetjg();
      let parm = {
        menuId: "CD2014",
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
    },
    reset() {
      this.formInline.jgname = "";
      this.formInline.jgtype = "";
    },
    addSubmit() {
      var param = {
        id: this.addForm.id,
        organizationName: this.addForm.name,
        organizationType: this.value,
        mobile: this.addForm.mobile,
        email: this.addForm.email,
        createUser: sessionStorage.getItem("useridd"),
        updateUser: sessionStorage.getItem("useridd"),
        parentsId: this.addForm.parentsId,
        organizationLevel: this.value1,
        organizationLeader: this.addForm.organizationLeader,
        flag: this.flagvalue,
        remark: this.addForm.remark
      };
      this.$axios({
        method: "post",
        url: this.$api.getaddjg,
        data: param
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
.alertX {
  display: none;
}
</style>

