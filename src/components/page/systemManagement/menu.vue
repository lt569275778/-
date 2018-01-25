<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                当前位置：系统管理/菜单管理
            </el-breadcrumb>
        </div>
        <div>
            <Search-menu :formInline="searchConditionParam" @childSubmit="loadData"></Search-menu>        
        </div>
        <div> 
            <el-table :data="tableData" @selection-change="selsChange" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >               
            <el-table-column prop="menuName" label="菜单名称"></el-table-column>
            <el-table-column prop="menuLevel" label="菜单类型"></el-table-column>
            <el-table-column prop="route" label="链接"></el-table-column>            
            <!-- <el-table-column prop="authorityFlag" label="权限标识"></el-table-column> -->
            <el-table-column prop="icon" label="图标">
              <template scope="scope"><i :class="scope.row.icon"></i></template>
              </el-table-column>  
            <el-table-column prop="menuSort" label="序号"></el-table-column>  
              
            <el-table-column prop="flag" label="状态"></el-table-column>  
            
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
 <el-dialog title="编辑菜单" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :data="editForm" label-width="80px" ref="editForm">
        	<el-form-item label="菜单名称" prop="menuName">
					<el-input v-model="editForm.menuName" disabled="true" auto-complete="off" maxlength=20></el-input>
				</el-form-item>
				<el-form-item label="链接">
					<el-input v-model="editForm.route" auto-complete="off" maxlength=100></el-input>
				</el-form-item>
				<el-form-item label="权限标识">
				  			  <el-select v-model="editForm.authorityFlag" clearable placeholder="请选择" style="width:100%" @change="select1">
    <el-option
      v-for="item in menuoptionss"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
				</el-form-item>
				<el-form-item label="备注">
				  	<el-input type="textarea" :rows="5" v-model="editForm.remarks" maxlength=100></el-input>
				</el-form-item>
        <el-form-item label="菜单级别">
				  <el-select v-model="editForm.menuLevel" disabled="true"  placeholder="请选择" style="width:100%" @change="select2">
    <el-option
      v-for="item in menuoptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
				</el-form-item>
				<el-form-item label="上级菜单" prop="">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
		           	<el-tree
              :data="data2"
              show-checkbox
              @check-change="getCheckedNodes"
              node-key="id"
              :props="defaultProps"
              highlight-current
              :default-checked-keys="topmenu"
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
				<el-button size="medium" type="primary" @click.native="editSubmit" @click="getCheckedNodes" :loading="editLoading" class="btnwidth1">提交</el-button>
				<el-button size="medium" @click.native="resetmenu" class="btnwidth2">重置</el-button>
      </div>
		</el-dialog>
    <!-- 这是查看页面 -->
<el-dialog :data="menulist"  title="菜单详情" :visible.sync="centerDialogVisible" center=true>
  <p style="border-bottom:1px solid #f3f3f3"></p>
  <div style="padding-top:50px;"></div>
  <span class="lleft">菜单名称：{{menulist.menuName}}</span>
  <span class="rright">菜单排序：{{menulist.menuSort}}</span>
  <span class="lleft">菜单级别：{{menulist.menuLevel}}</span>
  <span class="rright">备注：{{menulist.remarks}}</span>
  <span class="lleft">上级菜单：{{menulist.parentsName}}</span>
  <span class="rright" v-if="menulist.flag=='0'">状态：未启用</span>
  <span class="rright" v-else>状态：{{menulist.flag}}</span>
  
  <span class="lleft">权限标识：{{menulist.authorityFlag}}</span>
  <span class="rright">图片：<i :class="menulist.icon"></i></span>
  <div class="clear"></div>
  <span class="remarks">菜单链接：{{menulist.route}}</span>
  <p class="bor"></p>
   <p class="time">创建时间：{{menulist.createTime}}   创建人：{{menulist.createUser}}    更新时间：{{menulist.updateTime}}   更新人：{{menulist.updateUser}}</p>
</el-dialog>
        <page :formInline="pageParam" @pageSubmit="loadData"></page>
    </div>
</template>

<script type="text/ecmascript-6">
import SearchMenu from "../../common/SearchMenu.vue";
import Page from "../../common/page";
export default {
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  data() {
    return {
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
      editForm: [
        {
          id: "",
          menuName: "",
          route: "",
          authorityFlag: "",
          remarks: "",
          menuLevel: "",
          icon: "el-icon-document",
          createUser: sessionStorage.getItem("useridd")
        }
      ],
      menulist: [],
      topmenu: [],
      value2: false,
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
      jbvalue: "",
      jbnum: "",
      bossmenu: [],
      filterText: "",
      flagvalue: 1,
      data2: [],
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
    resetmenu() {
      (this.editForm.route = ""),
        (this.editForm.authorityFlag = ""),
        (this.editForm.remarks = ""),
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
      }
      if (this.bossmenu.length > 1) {
        this.$message({
          message: "只能选择一个",
          type: "warning"
        });
        this.$refs.tree2.setCheckedKeys([]);
      }
      this.bossmenu = Array.from(new Set(this.bossmenu)).toString();
      console.log(this.bossmenu);
    },
    handleDel(e) {
      let parm = {
        menuId: "CD2016",
        userId: sessionStorage.getItem("useridd"),
        authorityFlag: "2"
      };
      this.$axios({
        method: "post",
        url: this.$api.hasRes,
        data: parm
      }).then(res => {
        if (res.data.returnCode == "10001") {
          var parma = { id: e.id };
          this.$confirm("确认删除该记录吗?", "提示", {
            type: "warning"
          })
            .then(res => {
              this.listLoading = true;
              this.$axios({
                method: "post",
                url: this.$api.deleteMenu,
                data: parma
              }).then(res => {
                if (res.data.returnCode == "-200") {
                  this.$message({
                    message: res.data.returnMsg,
                    type: "warning"
                  });
                } else if (res.data.returnCode == "200") {
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                }
              });
              this.loadData();
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
    handleEdit(e) {
      let parm = {
        menuId: "CD2016",
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
      this.editForm.id = e.id;
      this.$axios({
        method: "post",
        url: this.$api.inserttree
      }).then(res => {
        console.log(res.data);
        this.data2 = res.data.menu;
        this.data2 = JSON.parse("[" + JSON.stringify(this.data2) + "]");
      });
      this.$axios({
        method: "post",
        url: this.$api.selectMenu,
        data: {
          id: e.id,
          updateUser: sessionStorage.getItem("useridd")
        }
      }).then(res => {
        console.log(res.data);
        this.editForm = res.data.menu;
        this.topmenu = [];
        this.topmenu.push(this.editForm.parentsId);
        // console.log(this.topmenu)
      });
    },
    select1(e) {
      this.editForm.authorityFlag = e;
      console.log(e);
    },
    select2(e) {
      this.editForm.menuLevel = e;
    },
    test(val) {
      this.flagvalue = val;
    },
    loadData() {
      this.loading2 = true;
      let param = this.searchConditionParam;
      param.pageNo = this.pageParam.currentPage;
      param.pageSize = this.pageParam.pageSize;
      param.menuName = this.searchConditionParam.menuname;
      param.flag = this.searchConditionParam.searvalue;
      this.$axios({
        method: "post",
        url: this.$api.selectmain,
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
          console.log(rej);
          this.loading2 = false;
        });
    },
    setStore(e) {
      let parm = {
        menuId: "CD2016",
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
        url: this.$api.selectMenu,
        data: {
          id: e.id,
          updateUser: sessionStorage.getItem("useridd")
        }
      }).then(res => {
        this.menulist = res.data.menu;
      });
    },
    editSubmit() {
      var parm = {
        id: this.editForm.id,
        menuName: this.editForm.menuName,
        route: this.editForm.route,
        authorityFlag: this.editForm.authorityFlag,
        remarks: this.editForm.remarks,
        menuLevel: this.editForm.menuLevel,
        parentsId: this.bossmenu,
        icon: "el-icon-document",
        flag: this.flagvalue,
        createUser: sessionStorage.getItem("useridd"),
        updateUser: sessionStorage.getItem("useridd")
      };
      console.log(parm);
      this.$axios({
        method: "post",
        url: this.$api.updateMenu,
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
    }
  },
  components: {
    Page,
    SearchMenu
  }
};
</script>

<style scoped>
.remarks {
  display: block;
  width: 100%;
  padding-left: 90px;
  box-sizing: border-box;
  height: 80px;
  margin-top: 10px;
}
.time {
  margin-top: 20px;
  text-align: center;
}
.bor {
  padding-top: 110px;
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
  padding-left: 90px;
  box-sizing: border-box;
  /* padding-bottom: 10 */
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
.el-tag + .el-tag {
  margin-left: 10px;
}
</style>

