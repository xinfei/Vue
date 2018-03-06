<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="请输入关键字"></el-input>
				</el-form-item>
        <el-form-item>
          <el-select v-model="seachItem" clearable placeholder="请选择" style="width:150px;">
            <el-option
                v-for="item in seachOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="getUsers">查询</el-button>
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
      <el-table-column prop="account" label="账号" width="120" sortable></el-table-column>
			<el-table-column prop="name" label="姓名" width="120" sortable></el-table-column>
			<el-table-column prop="gender" label="性别" width="100" :formatter="formatSex" sortable></el-table-column>
			<el-table-column prop="phone" label="电话" width="130" sortable></el-table-column>
			<el-table-column prop="email" label="邮箱" min-width="180" sortable></el-table-column>
			<el-table-column prop="isadmin" label="管理员" width="100" :formatter="formatAdmin" align="center"></el-table-column>
			<el-table-column label="操作" width="240" align="center">
				<template scope="scope">
          <el-button size="small" @click="handleRole(scope.$index, scope.row)">设置角色</el-button>
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

		<!--编辑用户界面-->
		<el-dialog title="编辑用户" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="120px" :rules="editFormRules" ref="editForm">
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="editForm.password" auto-complete="off" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input type="password" v-model="editForm.checkPassword" auto-complete="off" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="editForm.gender">
            <el-radio class="radio" label="1">男</el-radio>
            <el-radio class="radio" label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="editForm.phone" auto-complete="off" style="width:80%;"></el-input>
        </el-form-item>.
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email" auto-complete="off" style="width:80%;"></el-input>
        </el-form-item>
        <el-form-item label="是否为管理员" prop="isadmin">
          <el-radio-group v-model="editForm.isadmin">
            <el-radio class="radio" label="1">是</el-radio>
            <el-radio class="radio" label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增用户界面-->
		<el-dialog title="新增用户" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="120px" :rules="addFormRules" ref="addForm">
				<el-form-item label="账号" prop="account">
					<el-input v-model="addForm.account" auto-complete="off" style="width:80%;"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="addForm.password" auto-complete="off" style="width:80%;"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="checkPassword">
					<el-input type="password" v-model="addForm.checkPassword" auto-complete="off" style="width:80%;"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off" style="width:80%;"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="gender">
					<el-radio-group v-model="addForm.gender">
						<el-radio class="radio" label="1">男</el-radio>
						<el-radio class="radio" label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="电话" prop="phone">
					<el-input v-model="addForm.phone" auto-complete="off" style="width:80%;"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="addForm.email" auto-complete="off" style="width:80%;"></el-input>
				</el-form-item>
				<el-form-item label="是否为管理员" prop="isadmin">
					<el-radio-group v-model="addForm.isadmin">
						<el-radio class="radio" label="1">是</el-radio>
						<el-radio class="radio" label="0">否</el-radio>
					</el-radio-group>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
    
    <!--设置角色界面-->
    <el-dialog title="设置角色" v-model="roleFormVisible" :close-on-click-modal="false">
      <el-form :model="roleForm" label-width="120px" :rules="roleFormRules" ref="roleForm" class="roleForm">
        <el-row>
          <el-col :span="6" align="right" style="margin-right:20px;">姓名：</el-col>
          <el-col :span="12">{{ roleForm.name }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" align="right" style="margin-right:20px;">账号：</el-col>
          <el-col :span="12" align="left">{{ roleForm.account }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" align="right" style="margin-right:20px;">角色设置：</el-col>
        </el-row>
        <el-row>
          <template>
            <el-transfer v-model="roleValue" :data="roleData"></el-transfer>
          </template>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="roleFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="roleSubmit" :loading="roleLoading">提交</el-button>
      </div>
    </el-dialog>
		
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, batchRemoveUser, editUser, addUser, checkAccount, getUserInfo, getRoleList, setRole } from '../../api/api';

	export default {
		data() {
			//新增用户密码，确认密码验证
      var validatePass = (rule, value, callback) => {
        if (this.addForm.checkPassword !== '') {
          this.$refs.addForm.validateField('checkPassword');
        }
        callback();
      };
      var validatePass2 = (rule, value, callback) => {
        if (value !== this.addForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //编辑用户密码，确认密码验证
      var validEditPass = (rule, value, callback) => {
        if (this.editForm.checkPassword !== '') {
          this.$refs.editForm.validateField('checkPassword');
        }
        callback();
      };
      var validEditPass2 = (rule, value, callback) => {
        if (value !== this.editForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      //手机号码验证
      var validPhone = (rule, value,callback)=>{
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (!value){
          callback(new Error('请输入电话号码'))
        }else  if (!reg.test(value)){
          callback(new Error('请输入正确的11位手机号码'))
        }else {
          callback()
        }
      };
      //账号唯一验证
      var validAccount = (rule, value,callback)=>{
        var data = value;
        checkAccount(data).then((res) => {
          if(!res.data.valid){
            callback(new Error('账号已存在'))
          } else{
            callback()
          }
        });
      };
      return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
        seachOptions: [{
          value: 'name',
          label: '姓名'
        }, {
          value: 'account',
          label: '账号'
        }],
        seachItem:'name',
        
        //编辑界面
				editFormVisible: false,
				editLoading: false,
				editFormRules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          password: [
            { validator: validEditPass, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validEditPass2, trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: validPhone, message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          isadmin: [
            { required: true, message: '请选择是否为管理员', trigger: 'change' }
          ]
				},
				//编辑界面数据
				editForm: {
					id: 0,
          account:'',
          password:'',
          checkPassword:'',
					name: '',
          gender: -1,
					age: 0,
          phone: '',
          email: '',
          isadmin: -1
				},

        //新增界面
				addFormVisible: false,
				addLoading: false,
				addFormRules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { validator: validAccount, trigger: 'blur' }
          ],
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPassword: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { validator: validPhone, message: '请输入正确的手机号码', trigger: 'blur' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          isadmin: [
            { required: true, message: '请选择是否为管理员', trigger: 'change' }
          ]
				},
				//新增界面数据
        addForm: {
          account:'111',
          password:'12345678',
          checkPassword:'12345678',
          name: '111',
          gender: '1',
          phone: '18642091111',
          email: '1@qq.com',
          isadmin: '0'
        },
        
        //设置角色界面
        roleFormVisible: false,
        roleLoading: false,
        roleFormRules: {},
        roleForm: {
          account:'',
          name: '',
        },
        roleData: [],
        roleValue: []
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.gender == '1' ? '男' : row.gender == '0' ? '女' : '未知';
			},
			//管理员显示转换
      formatAdmin: function (row, column) {
        return row.isadmin == '1' ? '是' : row.isadmin == '0' ? '否' : '未知';
      },
      //获取当前页码
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
			  let para;
			  //判断搜索条件
			  if(this.seachItem == 'account'){
          para = {
            offset: (this.page - 1)*10,
            account:this.filters.name
          };
        } else{
          para = {
            offset: (this.page - 1)*10,
            name:this.filters.name
          };
        }
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.rows;
					this.listLoading = false;
					//NProgress.done();
				}).catch(() => {
          this.$message({
            message: '获取信息失败',
            type: 'error',
            duration:1500
          });
          this.listLoading = false;
        });
			},
      selsChange: function (sels) {
        this.sels = sels;
      },
			//显示编辑用户界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
        let para = row._id;
        getUserInfo(para).then((res) => {
          this.addLoading = false;
          //NProgress.done();
          this.editForm = res.data.data;
          this.editForm.gender = res.data.data.gender.toString();
          this.editForm.isadmin = res.data.data.isadmin.toString();
        }).catch(() => {
          this.$message({
            message: '获取信息失败',
            type: 'error',
            duration:1500
          });
          this.addLoading = false;
        });
			},
      //编辑用户
      editSubmit: function () {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '保存', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = Object.assign({}, this.editForm);
              para['password'] = this.editForm.password ? this.editForm.password : '';
              editUser(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                if(res.data.msg == ''){
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.$refs['editForm'].resetFields();
                  this.editFormVisible = false;
                  this.getUsers();
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
      
			//显示新增用户界面
			handleAdd: function () {
				this.addFormVisible = true;
			},
			//新增用户
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '保存', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
                if(res.data.msg == ''){
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  });
                  this.$refs['addForm'].resetFields();
                  this.addFormVisible = false;
                  this.getUsers();
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
                this.addLoading = false;
              });
						});
					}
				});
			},
      
      //显示获取角色页面
      handleRole: function(index, row){
        this.roleFormVisible = true;
        this.roleForm.name = row.name;
        this.roleForm.account = row.account;
        this.roleForm.id = row._id;
        for(let i in row.roles){
          this.roleValue.push(row.roles[i]);
        }
        let para = {
          offset: (this.page - 1)*10,
          keyword:this.filters.name
        };
        this.listLoading = true;
        //NProgress.start();
        getRoleList(para).then((res) => {
          this.roleData = [];
          for(let item in res.data.rows){
            this.roleData.push({
              key: res.data.rows[item]._id,
              label: res.data.rows[item].name,
              disabled: false
            });
          }
          this.listLoading = false;
          //NProgress.done();
        });
      },
      //提交角色更改
      roleSubmit: function () {
        this.$refs.roleForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '保存', {}).then(() => {
              this.roleLoading = true;
              //NProgress.start();
              let para = {};
              para.userid = this.roleForm.id;
              para.roles = this.roleValue;
              console.log(para.roles);
              setRole(para).then((res) => {
                this.roleLoading = false;
                //NProgress.done();
                if(res.data.msg == ''){
                  this.$message({
                    message: '设置成功',
                    type: 'success'
                  });
                  this.roleFormVisible = false;
                  this.getUsers();
                } else{
                  this.$message({
                    message: '提交失败：'+res.data.msg,
                    type: 'error'
                  });
                }
              }).catch((err) => {
                this.$message({
                  message: '设置失败',
                  type: 'error',
                  duration:1500
                });
                console.log(err);
                this.roleLoading = false;
              });
            });
          }
        });
      },
      
      //删除用户
      handleDel: function (index, row) {
        this.$confirm('确认删除该记录吗?', '删除', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          let para = row._id;
          batchRemoveUser(para).then((res) => {
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
            this.getUsers();
          });
        }).catch(() => {
          this.$message({
            message: '删除失败',
            type: 'error'
          });
          this.listLoading = false;
        });
      },
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item._id).toString();
				this.$confirm('确认删除选中记录吗？', '删除', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
//					//NProgress.start();
					let para = ids;
					batchRemoveUser(para).then((res) => {
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
						this.getUsers();
					});
				}).catch(() => {
          this.$message({
            message: '删除失败',
            type: 'error'
          });
          this.listLoading = false;
				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>
  .roleForm .el-row{
    padding-top:10px;
    line-height:24px;
  }
</style>