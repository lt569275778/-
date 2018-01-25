<template>
    <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <slot name="extendCondition"></slot>
        <div class="padd"></div>
        <div style="margin-top:10px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="请输入菜单名称">
            <el-input v-model="formInline.menuname" placeholder="请输入菜单名称" size="small" class="pcs-input"></el-input>
        </el-form-item>
 <el-form-item label="状态">
        <el-select v-model="formInline.searvalue" clearable placeholder="请选择" @change="flagchage">
    <el-option
      v-for="item in flagoptions"
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
            </el-form>

 <el-form-item>
            <el-button type="primary" size="medium" class="el-icon-add" @click="handleAdd">+ 添加菜单</el-button>
        </el-form-item>
        </div>
         <!--添加用户 -->
    </el-form>
    <el-dialog title="新增菜单" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :data="addForm" label-width="80px" ref="addForm">
        	<el-form-item label="菜单名称">
					<el-input v-model="addForm.menuName" auto-complete="off" maxlength=20></el-input>
				</el-form-item>
				<el-form-item label="链接">
					<el-input v-model="addForm.route" auto-complete="off" maxlength=100></el-input>
				</el-form-item>
				<el-form-item label="权限标识">
				  			  <el-select v-model="addForm.authorityFlag" clearable placeholder="请选择" style="width:100%" @change="select2">
    <el-option
      v-for="item in menuoptionss"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
				</el-form-item>
				<el-form-item label="备注">
				  	<el-input  type="textarea" :rows="5" v-model="addForm.remarks" maxlength=100></el-input>
				</el-form-item>
        <el-form-item label="菜单级别">
				  <el-select v-model="jbvalue" clearable  placeholder="请选择" style="width:100%" @change="select1">
    <el-option
      v-for="item in menuoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
				</el-form-item>
				<el-form-item label="上级菜单" prop="">
          <el-input
  placeholder="输入关键字进行过滤"
  v-model="filterText">
</el-input>
		           	<el-tree
 :data="data2"
@check-change="getCheckedNodes"
 show-checkbox
  node-key="id"
  :props="defaultProps"
   highlight-current
   :check-strictly="true"
  :filter-node-method="filterNode" ref="tree2">
</el-tree>
				</el-form-item>
				 <el-form-item label="图标" > 
           <i class="el-icon-document"></i>
				</el-form-item>
				<el-form-item label="状态">
        <el-switch v-model="value2" @change="test" on-value="1" off-value="0" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				</el-form-item>
      </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" type="primary" @click="addSubmit" :loading="editLoading" class="btnwidth">提交</el-button>
				<el-button size="medium" @click.native="resetmenu" class="btnwidth">重置</el-button>
      </div>
		</el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  data() {
    return {
      options: [],
      loading: false,
      clearable: true,
      addForm: [
        {
          menuName: "",
          route: "",
          authorityFlag: "",
          remarks: "",
          menuLevel: "",
          icon: "el-icon-document",
          createUser: sessionStorage.getItem("useridd")
          // icon:el-icon-menu
        }
      ],
      addFormVisible: false,
      listLoading: false,
      value1: true,
      value2: true,
      flagoptions: [
        {
          value: "1",
          label: "启用"
        },
        {
          value: "0",
          label: "未启用"
        }
      ],
      searvalue: "",
      menuoptions: [
        {
          value: "1",
          label: "一级菜单"
        },
        {
          value: "2",
          label: "二级菜单"
        },
        {
          value: "3",
          label: "三级菜单"
        },
        {
          value: "4",
          label: "四级菜单"
        }
      ],
      menuoptionss: [
        {
          value: "1",
          label: "增加"
        },
        {
          value: "2",
          label: "删除"
        },
        {
          value: "3",
          label: "编辑"
        },
        {
          value: "4",
          label: "查看"
        }
      ],
      bossmenu: [],
      jbvalue: "",
      jbnum: "",
      filterText: "",
      flagvalue: 1,
      data2: [],
      //   层级数据
      defaultProps: {
        label: "label",
        children: "children"
      }
    };
  },
  props: ["formInline"],
  methods: {
    select2(e) {
      this.addForm.authorityFlag = e;
    },
    reset() {
      this.formInline.menuname = "";
      this.formInline.searvalue = "";
    },
    resetmenu() {
      (this.addForm = []),
        (this.jbvalue = ""),
        (this.bossmenu = []),
        this.$refs.tree2.setCheckedKeys([]);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    getCheckedNodes() {
      let arr = this.$refs.tree2.getCheckedNodes();
      this.bossmenu = [];
      for (var i = 0; i < arr.length; i++) {
        this.bossmenu.push(arr[i].id);
        this.fff = true;
        if (this.bossmenu.length > 1) {
          this.$message({
            message: "只能选择一个",
            type: "warning"
          });
          this.$refs.tree2.setCheckedKeys([]);
        }
      }
      this.bossmenu = Array.from(new Set(this.bossmenu)).toString();
      console.log(this.bossmenu);
    },
    //   -----------华丽分割线
    onSubmit() {
      this.$emit("childSubmit");
    },
    flagchage(e) {
      console.log(e);
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
        }
      });
    },
    handleAdd() {
      this.addForm = [];
      this.jbvalue = "";
      this.bossmenu = [];
      let parm = {
        menuId: "CD2016",
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
        url: this.$api.inserttree
      }).then(res => {
        this.data2 = res.data.menu;
        this.data2 = JSON.parse("[" + JSON.stringify(this.data2) + "]");
      });
    },
    select1(e) {
      this.jbnum = e;
    },
    test(val) {
      this.flagvalue = val;
    },
    addSubmit() {
      var parm = {
        menuName: this.addForm.menuName,
        route: this.addForm.route,
        authorityFlag: this.addForm.authorityFlag,
        remarks: this.addForm.remarks,
        menuLevel: this.jbnum,
        parentsId: this.bossmenu,
        icon: "el-icon-document",
        flag: this.flagvalue,
        createUser: sessionStorage.getItem("useridd")
      };
      console.log(parm);
      this.$axios({
        method: "post",
        url: this.$api.insertMenu,
        data: parm
      })
        .then(res => {
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
            console.log(res.data);
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].returnCode == "200") {
                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                this.$emit("childSubmit");
                this.addFormVisible = false;
              } else if (res.data[i].returnCode == "-200") {
                this.$message({
                  message: res.data[i].returnMsg,
                  type: "warning"
                });
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
        })
        .catch(error => {
          this.$message({
            message: "请填写菜单数据",
            type: "error"
          });
          this.addFormVisible = false;
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
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>

