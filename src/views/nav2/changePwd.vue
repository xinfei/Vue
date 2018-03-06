<template>
  <el-form ref="form" :model="form" label-width="80px" :rules="pwdFormRules" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
    <el-form-item label="原密码" prop="oldPwd">
      <el-input type="password" v-model="form.oldPwd" auto-complete="off" style="width:80%;"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPwd">
      <el-input type="password" v-model="form.newPwd" auto-complete="off" style="width:80%;"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPwd">
      <el-input type="password" v-model="form.checkPwd" auto-complete="off" style="width:80%;"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click.native="pwdSubmit" type="primary" style="width:100px;">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { changePwd } from '../../api/api';
  
  export default {
    data() {
      //新增用户密码，确认密码验证
      var validPass = (rule, value, callback) => {
        if (this.form.checkPwd !== '') {
          this.$refs.form.validateField('checkPwd');
        }
        callback();
      };
      var validPass2 = (rule, value, callback) => {
        if (value !== this.form.newPwd) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        form: {
          oldPwd: '',
          newPwd: '',
          checkPwd: ''
        },
        pwdFormRules: {
          oldPwd: [
            { required: true, message: '请输入原密码', trigger: 'blur' }
          ],
          newPwd: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { validator: validPass, trigger: 'blur' }
          ],
          checkPwd: [
            { required: true, message: '请确认密码', trigger: 'blur' },
            { validator: validPass2, trigger: 'blur' }
          ]
        },
      }
    },
    methods: {
      pwdSubmit: function () {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              //NProgress.start();
              let para = {};
              para['oldpwd'] = this.form.oldPwd;
              para['newpwd'] = this.form.newPwd;
              //							console.log(para);
              //							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
              changePwd(para).then((res) => {
                this.editLoading = false;
                //NProgress.done();
                if(res.data.msg == ''){
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.$refs['form'].resetFields();
                } else{
                  this.$message({
                    message: '修改失败：'+res.data.msg,
                    type: 'error'
                  });
                }
              });
            });
          }
        });
      },
    }
  }

</script>