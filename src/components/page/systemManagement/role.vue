<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                当前位置：系统管理/角色管理
            </el-breadcrumb>
        </div>
        <div>
            <Search-role :formInline="searchConditionParam" @childSubmit="loadData"></Search-role>
        </div>
        <div> 
            <el-table :data="tableData" @selection-change="selsChange" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >           
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="id" label="角色码"></el-table-column>
            <el-table-column prop="organizationName" label="所属机构"></el-table-column>       
            <el-table-column prop="createTime" label="创建时间"></el-table-column> 
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
			<el-form :data="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="角色名称">
					<el-input v-model="editForm.roleName" disabled="true" auto-complete="off" maxlength=20></el-input>
				</el-form-item>
				<el-form-item label="角色码">
				  	<el-input v-model="editForm.id" disabled="true" auto-complete="off" maxlength=8></el-input>
				</el-form-item>
				<el-form-item label="所属机构">
				  	 <el-select v-model="editForm.organizationId" placeholder="请选择" style="width:100%" @click.native="selectjg" @change="selectjg">
    <el-option
      v-for="item in jgoptions"
      :key="item.organizationId"
      :label="item.organizationName"
      :value="item.id">
    </el-option>
  </el-select>
				</el-form-item>
          <el-form-item label="所属渠道">
				    <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" >全选</el-checkbox> -->
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city.id" :key="city.id" >{{city.name}}</el-checkbox>
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
   :default-checked-keys="toprole"
  :filter-node-method="filterNode" ref="tree2">
</el-tree>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" :rows="5" v-model="editForm.remarks" maxlength=50></el-input>
				</el-form-item> 
			</el-form>
			<div slot="footer" id="dialog-footer">
				<el-button size="medium" type="primary" @click.native="editSubmit" :loading="editLoading" class="btnwidth1">提交</el-button>  
				<el-button size="medium" @click.native="resetrole" class="btnwidth2">重置</el-button>
			</div>
		</el-dialog>
    <!-- 这是查看页面 -->
<el-dialog title="角色详情" :visible.sync="centerDialogVisible" center=true>
  <p style="border-bottom:1px solid #f3f3f3"></p>
  <div style="padding-top:50px;"></div>
  <span class="lleft">角色名称：{{getroleinfo.roleName}}</span>
  <span class="rright" id="meun">菜单授权：{{getroleinfo.menuList}}</span>
  <span class="lleft">角色码：{{getroleinfo.id}}</span>
  <span class="rright">所属机构：{{getroleinfo.organizationName}}</span>
  <span class="lleft">备注：{{getroleinfo.remarks}}</span>
  <p class="bor"></p>
   <p class="time">创建时间：{{getroleinfo.createTime}}   创建人：{{getroleinfo.createUser}}    更新时间：{{getroleinfo.updateTime}}   更新人：{{getroleinfo.updateUser}}</p>
</el-dialog>
        <page :formInline="pageParam" @pageSubmit="loadData"></page>
    </div>
</template>

<script type="text/ecmascript-6">
import SearchRole from "../../common/SearchRole";
import Page from "../../common/page";
var zscgvalue = [];
var  gggg=[];
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
      Editmenu:[],
      tableData: [],
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
      editForm: [],
      getroleinfo: [],
      jgvalue: "",
      checkAll: false,
      checkedCities: [],
      cities: zzz,
      isIndeterminate: true,
      adgc: [
        {
          label: "增加",
          value: "1"
        },
        {
          label: "删除",
          value: "2"
        },
        {
          label: "修改",
          value: "3"
        },
        {
          label: "查看",
          value: "4"
        }
      ],
      toprole: [],
      adgcvalue: [],
      checkedCities1: [],
      data2: [],
      bossmenu: [],
      checkedCitiesid: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    resetrole() {
      this.editForm.remarks = [];
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
      console.log(this.bossmenu);
      // this.toprole=this.bossmenu; 
    },
    handleDel: function(obj) {
      let parm = {
        menuId: "CD2015",
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
              console.log(obj.id);
              this.listLoading = true;
              let para = { id: obj.id };
              this.$axios({
                method: "post",
                url: this.$api.deleterole,
                data: para
              }).then(res => {
                this.$message({
                  message: "删除成功",
                  type: "success"
                });
                this.loadData();
              });
              this.listLoading = false;
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
      console.log(e);
      this.editForm.organizationId = e;
    },
    handleCheckedCitiesChange(value) {
      console.log("-----" + JSON.stringify(value));
      let flag = false;
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      var tepArry = [];
      for (let i = 0; i < value.length; i++) {
        tepArry.push(value[i]);
      }
      this.checkedCitiesid = tepArry;
      console.log(this.checkedCitiesid);
    },
    // ----
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
      // console.log(zscgvalue);
    },
    handleEdit(obj) {
      var pararm = {};
      this.$axios({
        method: "post",
        url: this.$api.selectmainjg,
        data: pararm
      }).then(res => {
        console.log(res.data);
        this.jgoptions = res.data.tableList;
      });

      let parm = {
        menuId: "CD2015",
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

      this.$axios({
        method: "post",
        url: this.$api.inserttree
      }).then(res => {
        this.data2 = res.data.menu;
        this.data2 = JSON.parse("[" + JSON.stringify(this.data2) + "]");
      });

      let param = {
        id: obj.id
        // updateUser: sessionStorage.getItem("useridd")
      };
      this.$axios({
        method: "post",
        url: this.$api.selectRole,
        data: param
      }).then(res => {
        console.log(res.data);
        let arrnew = res.data.role.channelList;
        let meunarr = res.data.role.buttonList;
        this.editForm = res.data.role;
        console.log(this.editForm.organizationId);

        this.checkedCities = [];
        // ------------------
        let oriList = res.data.role.menuList;
        // gggg=oriList;
        let removeList = [];
        //处理父级菜单
        this.Editmenu=[];
        for (let i = 0; i < oriList.length; i++) {
         this.Editmenu.push(oriList[i].id)
          let remove = oriList[i];
          if (remove.parentsId == null || remove.parentsId == "") {
            removeList.push(remove.id);
          } else {
            for (let j = 0; j < oriList.length; j++) {
              if (remove.id == oriList[j].parentsId) {
                removeList.push(remove.id);
              }
            }
          }
        }
        removeList = Array.from(new Set(removeList));
        let handle = [];
        for (let k = 0; k < oriList.length; k++) {
          let count = 0;
          for (let z = 0; z < removeList.length; z++) {
            if (oriList[k].id != removeList[z]) {
              count++;
            } else {
              break;
            }
          }
          if (removeList.length == count) {
            handle.push(oriList[k].id);
          }
        }
        // this.bossmenu=[];
        console.log('这是iboss'+this.bossmenu)
        this.toprole = handle;
        // if(this.bossmenu==[]){
        //  gggg=this.toprole
        // }else{
        //   gggg=this.bossmenu
        // }
        // this.getCheckedNodes();
        // console.log(123)
        // console.log(this.$refs.tree2.getCheckedNodes());
        // this.bossmenu=this.toprole;
        for (let i = 0; i < arrnew.length; i++) {
          this.checkedCities.push(arrnew[i].id);
          console.log(this.checkedCities);
        }
        this.checkedCitiesid = this.checkedCities;
        // console.log(this.checkedCitiesid);

        this.checkedCities1 = [];
        for (let i = 0; i < meunarr.length; i++) {
          this.checkedCities1.push(meunarr[i].authorityFlag);
        }
        zscgvalue = this.checkedCities1;
      });
    },
    editSubmit() {
      console.log('123'+this.bossmenu)
      console.log('456'+this.Editmenu)
      if(this.bossmenu=[]||this.bossmenu==undefined){
        this.bossmenu=this.Editmenu
      }
      var parm = {
        id: this.editForm.id,
        roleName: this.editForm.roleName,
        organizationId: this.editForm.organizationId,
        flag: "1",
        channelId: this.checkedCitiesid,
        remarks: this.editForm.remarks,
        updateUser: sessionStorage.getItem("useridd"),
        menuId: this.bossmenu,
        authorityFlag: zscgvalue,
        createUser: sessionStorage.getItem("useridd")
      };
      console.log(parm);
      this.$axios.post(this.$api.updateRole, parm).then(res => {
        let isArray = res.data;
                // debugger
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
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].returnCode == "200") {
              this.$message({
                message: "编辑成功",
                type: "success"
              });
              this.loadData();
              this.editFormVisible = false;
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
            } else {
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
      param.roleName = this.searchConditionParam.roleNameaa;
      this.$axios({
        method: "post",
        url: this.$api.selectRoleList,
        data: param
      })
        .then(res => {
          console.log(res.data);
          if (res.data.returnCode == "200") {
            this.tableData = res.data.tableList;
            this.pageParam.total = res.data.total;
          } else {
            this.$message.error(res.data.returnMsg);
          }
          this.loading2 = false;
        })
        .catch(rej => {
          this.loading2 = false;
        });
    },
    setStore(obj) {
      let parm = {
        menuId: "CD2015",
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
      let param = {
        id: obj.id
      };
      this.$axios({
        method: "post",
        url: this.$api.selectRole,
        data: param
      }).then(res => {
        console.log(res.data);
        let starlist = [];
        this.getroleinfo = res.data.role;
        for (let i = 0; i < this.getroleinfo.menuList.length; i++) {
          starlist.push(this.getroleinfo.menuList[i].menu_name);
          console.log(starlist);
        }
        this.getroleinfo.menuList = starlist;
      });
    }
  },
  components: {
    Page,
    SearchRole
  }
};
</script>

<style scoped>
.remarks {
  width: 100%;
  padding-left: 90px;
  box-sizing: border-box;
}
.time {
  margin-top: 20px;
  padding-left: 50px;
}
.bor {
  padding-top: 150px;
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
.lleft {
  display: block;
  width: 50%;
  float: left;
  line-height: 40px;
  padding-left: 90px;
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
.clearfix {
  clear: both;
  display: block;
  content: "";
}
#dialog-footer {
  position: relative;
}
.btnwidth1 {
  width: 120px;
  position: absolute;
  top: -40px;
  left: 200px;
  height: 40px;
}
.btnwidth2 {
  width: 120px;
  height: 40px;
  position: absolute;
  top: -40px;
  left: 346px;
}
#meun {
  height: 80px;
  overflow: auto;
}
</style>

