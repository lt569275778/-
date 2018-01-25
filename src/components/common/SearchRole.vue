<template>
    <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="角色名称">
            <el-input v-model="formInline.roleNameaa" placeholder="请输入角色名称" size="small" class="pcs-input"></el-input>
        </el-form-item>
        <slot name="extendCondition"></slot>
        <el-form-item>
            <el-button type="primary" size="medium" class="el-icon-search" @click="onSubmit">查询</el-button>
            <el-button type="primary" size="medium" class="el-icon-refresh" @click="reset">重置</el-button>
        </el-form-item>
        <div class="padd"></div>
        <div style="margin-top:10px;">
 <el-form-item>
            <el-button type="primary" size="medium" class="el-icon-add" @click="handleAdd">+ 添加角色</el-button>
        </el-form-item>
        </div>
         <!--添加用户 -->
    </el-form>
    <el-dialog title="添加角色" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :data="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="角色名称">
					<el-input v-model="addForm.roleName" auto-complete="off" maxlength=20></el-input>
				</el-form-item>
				<el-form-item label="角色码">
				  	<el-input v-model="addForm.id" auto-complete="off" maxlength=8></el-input>
				</el-form-item>
				<el-form-item label="所属机构">
				  	 <el-select v-model="jgvalue" clearable placeholder="请选择" style="width:100%" @click.native="selectjg" @change="selectjg">
    <el-option
      v-for="item in jgoptions"
      :key="item.id"
      :label="item.organizationName"
      :value="item.id">
    </el-option>
  </el-select>
				</el-form-item>
          <el-form-item label="所属渠道">
				    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" >全选</el-checkbox>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city.id" >{{city.name}}</el-checkbox>
              </el-checkbox-group>
				    </el-form-item>
          <el-form-item label="菜单授权">
  <el-checkbox-group v-model="checkedCities1">
    <el-checkbox v-for="city in adgc" :label="city.value" :key="city.value" @change="twohandleCheckedCitiesChange">{{city.label}}</el-checkbox>
  </el-checkbox-group>
					  <el-tree
 :data="data2"
@check-change="getCheckedNodes"
 show-checkbox
  node-key="id"
  :props="defaultProps"
   highlight-current
  :filter-node-method="filterNode" ref="tree2" v-model="trees">
</el-tree>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" :rows="5" v-model="addForm.remarks" maxlength=50></el-input>
				</el-form-item> 
			</el-form>
			<div slot="footer" id="dialog-footer">
				<el-button size="medium" type="primary" @click.native="addSubmit" :loading="addLoading" class="btnwidth">提交</el-button>  
				<el-button size="medium" @click.native="resetrole" class="btnwidth">重置</el-button>
			</div>
		</el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
const zscgvalue = [];
const zzz = [
  {
    name: "蜂巢",
    id: "FC"
  },
  {
    name: "车贷",
    id: "CAR"
  },
  {
    name: "分期购",
    id: "TEST"
  }
];
export default {
  data() {
    return {
      options: [],
      jgoptions: [],
      loading: false,
      clearable: true,
      addForm: [
        {
          roleName: "",
          id: "",
          jg: "",
          trees: "[]"
        }
      ],
      bossmenu: "",
      addFormVisible: false,
      listLoading: false,
      value1: true,
      value2: true,
      isIndeterminate: true,
      //   层级数据
      data2: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      jgvalue: "",
      checkAll: false,
      checkedCities: [],
      cities: zzz,
      isIndeterminate: true,
      adgc: [
        {
          label: "增加",
          value: 1
        },
        {
          label: "删除",
          value: 2
        },
        {
          label: "修改",
          value: 3
        },
        {
          label: "查看",
          value: 4
        }
      ],
      adgcvalue: [],
      checkedCities1: ["增加", "删除", "修改", "查看"],
      data2: [],
      bossmenu: [],
      checkedCitiesid: []
    };
  },
  props: ["formInline"],
  methods: {
    resetrole() {
      this.addForm = [];
      this.checkedCities = [];
      this.checkAll = false;
      this.checkedCities1 = [];
      this.jgvalue = "";
      this.bossmenu = [];
      this.$refs.tree2.setCheckedKeys([]);
    },
    getCheckedNodes() {
      let arr = this.$refs.tree2.getCheckedNodes();
      this.bossmenu = [];
      for (var i = 0; i < arr.length; i++) {
        this.bossmenu.push(arr[i].id);
        this.bossmenu.push(arr[i].parentsId);
        var narr = "CD0000";
        this.bossmenu.push(narr);
      }
      this.bossmenu = Array.from(new Set(this.bossmenu));
      // this.bossmenu=this.addForm.trees
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
    selectjg(e) {
      this.addForm.organizationId = e;
    },
    handleCheckAllChange(val) {
      this.checkedCities = this.checkAll ? zzz : [];
      this.isIndeterminate = false;
      this.checkedCitiesid = [];
      if (this.checkAll) {
        //quan xuanzhong
        for (let i = 0; i < this.checkedCities.length; i++) {
          this.checkedCities = zzz;
          this.checkedCitiesid.push(this.checkedCities[i].id);
        }
      } else {
        this.checkedCitiesid = [];
      }
      console.log(this.checkedCitiesid);
    },
    handleCheckedCitiesChange(value) {
      let flag = false;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      var tepArry = [];
      for (let i = 0; i < value.length; i++) {
        tepArry.push(value[i].id);
      }
      this.checkedCitiesid = tepArry;
      console.log(this.checkedCitiesid);
    },
    twohandleCheckedCitiesChange(e) {
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
    //   -----------华丽分割线
    onSubmit() {
      this.$emit("childSubmit");
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
    reset() {
      this.formInline.roleNameaa = "";
    },
    resetaddform() {
      this.addForm = [];
    },
    handleAdd() {
      this.resetaddform();
      let parm = {
        menuId: "CD2015",
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
        console.log(res.data);
        this.data2 = res.data.menu;
        this.data2 = JSON.parse("[" + JSON.stringify(this.data2) + "]");
      });
      var parma = {};
      this.$axios({
        method: "post",
        url: this.$api.selectmainjg,
        data: parma
      }).then(res => {
        console.log(res.data);
        this.jgoptions = res.data.tableList;
      });
    },
    addSubmit() {
      var parm = {
        id: this.addForm.id,
        roleName: this.addForm.roleName,
        organizationId: this.addForm.organizationId,
        flag: "1",
        channelId: this.checkedCitiesid,
        remarks: this.addForm.remarks,
        updateUser: sessionStorage.getItem("useridd"),
        menuId: this.bossmenu,
        authorityFlag: zscgvalue,
        createUser: sessionStorage.getItem("useridd")
      };
      console.log(parm);
      this.$axios({
        method: "post",
        url: this.$api.addmenurole,
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
              this.$emit("childSubmit");
              this.addFormVisible = false;
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
#dialog-footer {
  text-align: center;
}
#btnwidth {
  width: 120px;
}
.btnwidth {
  width: 120px;
}
</style>

