<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                当前位置：系统管理/机构管理
            </el-breadcrumb>
        </div>
        <div>
            <Search-jggl :formInline="searchConditionParam" @childSubmit="loadData"></Search-jggl>
        </div>
        <div>
            <el-table :data="tableData" @selection-change="selsChange" border style="width: 100%;" v-loading="loading2" element-loading-text="拼命加载中" >
            <el-table-column prop="organizationName" label="机构名称"></el-table-column>
            <el-table-column prop="organizationType" label="机构类型"></el-table-column>
            <el-table-column prop="id" label="机构编码"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
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
			<el-form :data="editForm" label-width="80px" ref="editForm">
        	<el-form-item label="机构名称">
					<el-input v-model="editForm.organizationName" disabled="true" auto-complete="off"  maxlength=50></el-input>
				</el-form-item>
				<el-form-item label="机构类型" >
					  <el-select v-model="editForm.organizationType" disabled="true" placeholder="请选择"  style="width:100%" @change="select1">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
				</el-form-item>
				<el-form-item label="机构级别" >
				    <el-select v-model="editForm.organizationLevel" placeholder="请选择" disabled="true" style="width:100%" >
    <el-option>
    </el-option>
  </el-select>
				</el-form-item>
			  	<el-form-item label="上级机构">
				  	 <el-select v-model="editForm.parentsName" placeholder="请选择" @change="selecttwo" disabled="true"  style="width:100% " >
    <el-option
      v-for="item in optionss"
      :key="item.parentsId"
      :label="item.organizationName"
      :value="item.parentsId">
    </el-option>
  </el-select>
				</el-form-item>
          <el-form-item label="机构编码" >
				  	<el-input v-model="editForm.id" disabled="true" auto-complete="off" maxlength=10></el-input>
				</el-form-item>
          <el-form-item label="负责人" maxlength=15>
					  <el-input v-model="editForm.organizationLeader" auto-complete="off"></el-input>
				</el-form-item>
          <el-form-item label="电话" prop="mobile">
					  <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
				</el-form-item>
                <el-form-item label="邮箱" >
					  <el-input v-model="editForm.email" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="editForm.remark" :rows="5"></el-input>
				</el-form-item>
				<el-form-item label="状态">
        <el-switch v-model="flagvalue"  @change="test" on-value="1" off-value="0" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
				</el-form-item>
      </el-form>
			<div slot="footer" class="dialog-footer">
				<el-button size="medium" type="primary" @click.native="editSubmit" :loading="editLoading" class="btnwidth1">提交</el-button>
				<el-button size = "medium" @click.native = "resetjgcj" class = "btnwidth2">重置</el-button>
			</div>
		</el-dialog>
    <!-- 这是查看页面 -->
<el-dialog title="机构详情" :visible.sync="centerDialogVisible" center=true >
  <p style="border-bottom:1px solid #f3f3f3"></p>
  <div style="padding-top:50px;"></div>
  <span class="lleft">上级机构：{{getinfojg.parentsName}}</span>
  <span class="rright">电话：{{getinfojg.mobile}}</span>
  <span class="lleft">机构名称：{{getinfojg.organizationName}}</span>
  <span class="rright">邮箱：{{getinfojg.email}}</span>
  <span class="lleft">机构编码：{{getinfojg.id}}</span>
  <span class="rright">负责人：{{getinfojg.organizationLeader}}</span>
  <span class="lleft">机构类型：{{getinfojg.organizationType}}</span>
  <span class="rright">状态：{{getinfojg.flag}}</span>
  <span class="lleft">机构级别：{{getinfojg.organizationLevel}}</span>
  <span class="rright">备注：{{getinfojg.remark}}</span>
  <p class="bor"></p>
   <p class="time">创建时间：{{getinfojg.createTime}}   创建人：{{getinfojg.createUser}}    更新时间：{{getinfojg.updateTime}}   更新人：{{getinfojg.updateUser}}</p>
</el-dialog>
        <page :formInline="pageParam" @pageSubmit="loadData"></page>
    </div>
</template>
<script type="text/ecmascript-6">
import SearchJggl from "../../common/SearchJggl.vue";
import Page from "../../common/page";
export default {
  data() {
    return {
      tableData: [],
      searchConditionParam: {},
      getinfojg: {},
      pageParam: {
        currentPage: 1,
        total: 0,
        pageSize: 10
      },
      loading2: false,
      editFormVisible: false,
      editLoading: false,
      dialogTableVisible: false,
      centerDialogVisible: false,
      editForm: [
        {
          id: " ",
          name: "",
          email: "",
          organizationLeader: "",
          organizationType: 1,
          remark: "",
          organizationName: "",
          flag: ""
        }
      ],
      options: [
        {
          value: "选项1",
          label: "集团"
        },
        {
          value: "选项2",
          label: "公司"
        },
        {
          value: "选项3",
          label: "一级部门"
        },
        {
          value: "选项4",
          label: "二级部门"
        },
        {
          value: "选项5",
          label: "组"
        }
      ],
      value: "",
      optionss: [],
      value1: "",
      value2: "",
      flagvalue: "",
      value3: false
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    resetjgcj() {
      (this.editForm.email = ""),
        (this.editForm.mobile = ""),
        (this.editForm.remark = ""),
        (this.editForm.organizationLeader = "");
    },
    GetLength(str) {
      return str.replace(/[^\x00-\xff]/g, "aa").length;
    },
    checkjgname() {
      this.GetLength(this.editForm.organizationName);
    },
    select1() {
      var arr = ["A", "B", "C", "D", "E"];
      if (this.value == "选项1") {
        this.inputdisabled1 = true;
        this.value1 = arr[0];
      } else if (this.value == "选项2") {
        this.inputdisabled1 = true;
        this.value1 = arr[1];
      } else if (this.value == "选项3") {
        this.inputdisabled1 = true;

        this.value1 = arr[2];
      } else if (this.value == "选项4") {
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
    test(val) {
      this.flagvalue = val;
      this.editForm.flag = this.flagvalue;
      console.log(this.editForm.flag);
    },
    handleDel: function(e) {
      let parm = {
        menuId: "CD2014",
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
              let para = { id: e.id };
              this.$axios({
                method: "post",
                url: this.$api.deletejg,
                data: para
              }).then(res => {
                this.listLoading = false;
                if (res.data.returnCode == "-200") {
                  this.$message({
                    message: res.data.returnMsg,
                    type: "warning"
                  });
                } else {
                  this.$message({
                    message: "删除成功",
                    type: "success"
                  });
                }
                this.loadData();
              });
            })
            .catch(error => {
              this.$message({
                message: res.data.returnMsg,
                type: "error"
              });
            });
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
        menuId: "CD2014",
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
      this.value2 = "";
      this.$axios({
        method: "post",
        url: this.$api.getinfojg,
        data: {
          id: e.id
        }
      }).then(res => {
        let oridata = res.data.returnMap;
        this.editForm = res.data.returnMap;
        console.log(this.editForm);
        if (this.editForm.flag == "启用") {
          this.editForm.flag = "1";
        } else {
          this.editForm.flag = "0";
        }
      });
    },
    loadData() {
      this.loading2 = true;
      let param = this.searchConditionParam;
      param.pageNo = this.pageParam.currentPage;
      param.pageSize = this.pageParam.pageSize;
      (param.organizationName = this.searchConditionParam.jgname),
        (param.organizationType = this.searchConditionParam.jgtype),
        this.$axios({
          method: "post",
          url: this.$api.selectjg,
          data: param
        })
          .then(res => {
            if (res.data.returnCode == "200") {
              console.log(res.data);
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
    setStore(e) {
      let parm = {
        menuId: "CD2014",
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
      var pram = e;
      pram.id = e.id;
      this.$axios.post(this.$api.getinfojg, pram).then(res => {
        console.log(res.data.returnMap);
        this.getinfojg = res.data.returnMap;
      });
    },
    selecttwo(e) {
      this.editForm.parentsId = e;
    },
    editSubmit() {
      var param = {
        id: this.editForm.id,
        organizationName: this.editForm.organizationName,
        organizationType: this.editForm.organizationType,
        mobile: this.editForm.mobile,
        email: this.editForm.email,
        updateUser: sessionStorage.getItem("useridd"),
        parentsId: this.editForm.parentsId,
        organizationLevel: this.value1,
        organizationLeader: this.editForm.organizationLeader,
        flag: this.flagvalue,
        remark: this.editForm.remark
      };
      console.log(param);
      this.$axios({
        method: "post",
        url: this.$api.updatejg,
        data: param
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
                message: res.data[i].returnMsg,
                type: "success"
              });
              this.loadData();
              this.editFormVisible = false;
            } else if (res.data[i].returnCode == "-200") {
              this.$message({
                message: res.data[i].returnMsg,
                type: "warning"
              });
            } else if (res.data[i].returnCode == "1000") {
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
    }
  },
  components: {
    Page,
    SearchJggl
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
  padding-top: 220px;
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
  padding-left: 90px;
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

