<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="名称/描述"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getRole">查询</el-button>
				</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
			</el-form>
		</el-col>
    
    <!--列表-->
    <el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="name" label="名称" width="120" sortable></el-table-column>
      <el-table-column prop="desc" label="描述" min-width="400"></el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!--工具条-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
      </el-pagination>
    </el-col>
    
    <!--编辑界面-->
    <el-dialog title="编辑角色信息" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="editForm.desc" :rows="7" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    
    <!--新增界面-->
    <el-dialog title="新增用户" v-model="addFormVisible" :close-on-click-modal="false">
      <el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addForm.name" auto-complete="off" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="addForm.desc" :rows="7" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>

	</section>
</template>
<script>
	import { getRoleList, getRole, addRole, editRole, batchRemoveRole } from '../../api/api';
	//import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
        total: 0,
        page: 1,
				listLoading: false,
				users: [],
        sels: [],//列表选中列
        
        //编辑界面
        editFormVisible: false,
        editLoading: false,
        editFormRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { max: 20, message: '输入内容不得超过20个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入描述', trigger: 'blur' },
            { max: 100, message: '输入内容不得超过100个字符', trigger: 'blur' }
          ]
        },
        //编辑界面数据
        editForm: {
          id: 0,
          name: '',
          desc: '',
        },

        //新增界面
        addFormVisible: false,
        addLoading: false,
        addFormRules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { max: 20, message: '输入内容不得超过20个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入描述', trigger: 'blur' },
            { max: 100, message: '输入内容不得超过100个字符', trigger: 'blur' }
          ]
        },
        //新增界面数据
        addForm: {
          name: '测试1212',
          desc: '测试1212测试1212测试1212',
        }
			}
		},
		methods: {
      selsChange: function (sels) {
        this.sels = sels;
      },
      //获取当前页码
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
			//获取角色列表
			getRole: function () {
        let para = {
          offset: (this.page - 1)*10,
          keyword:this.filters.name
        };
				this.listLoading = true;
				//NProgress.start();
        getRoleList(para).then((res) => {
          this.total = res.data.total;
          this.users = res.data.rows;
          this.listLoading = false;
					//NProgress.done();
				});
			},

      //显示编辑角色界面
      handleEdit: function (index, row) {
        this.editFormVisible = true;
        let para = row._id;
        getRole(para).then((res) => {
          this.addLoading = false;
          //NProgress.done();
          this.editForm = res.data.data;
        }).catch(() => {
          this.$message({
            message: '获取信息失败',
            type: 'error',
            duration:1500
          });
          this.editFormVisible = false;
        });
      },
      //编辑角色提交
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '保存', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              editRole(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                if(res.data.msg == ''){
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;
                  this.getRole();
                } else{
                  this.$message({
                    message: '修改失败：'+res.data.msg,
                    type: 'error'
                  });
                }
              }).catch(() => {
                this.$message({
                  message: '修改失败',
                  type: 'error',
                  duration:1500
                });
                this.editLoading = false;
              });
            });
          }
        });
      },

      //显示新增角色界面
      handleAdd: function () {
        this.addFormVisible = true;
      },
      //新增角色
      addSubmit: function () {
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '保存', {}).then(() => {
              this.addLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.addForm);
              addRole(para).then((res) => {
                console.log(res);
                this.addLoading = false;
                //NProgress.done();
                if(res.data.msg == ''){
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['addForm'].resetFields();
                  this.addFormVisible = false;
                  this.getRole();
                } else{
                  this.$message({
                    message: '提交失败：'+res.data.msg,
                    type: 'error'
                  });
                }
              }).catch(() => {
                this.$message({
                  message: '添加失败',
                  type: 'error',
                  duration:1500
                });
                this.editLoading = false;
              });
            });
          }
        });
      },
      
      //删除用户
      handleDel: function (index, row) {
        this.$confirm('确认删除该角色吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = row._id;
          batchRemoveRole(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            if(res.data.msg == ''){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            } else{
              this.$message({
                message: '删除失败：'+res.data.msg,
                type: 'error'
              });
            }
            this.getRole();
          });
        }).catch(() => {
          this.editLoading = false;
        });
      },
      //批量删除
      batchRemove: function () {
        let ids = this.sels.map(item => item._id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = ids;
          batchRemoveRole(para).then((res) => {
            this.listLoading = false;
            //NProgress.done();
            if(res.data.msg == ''){
              this.$message({
                message: '删除成功',
                type: 'success'
              });
            } else{
              this.$message({
                message: '删除失败：'+res.data.msg,
                type: 'error'
              });
            }
            this.getRole();
          });
        }).catch(() => {
          this.listLoading = false;
        });
      }
		},
		mounted() {
			this.getRole();
		}
	};

</script>

<style scoped>
  .el-textarea{
    width:80%;
  }
</style>