<template>
  <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit" :loading="logining">登录</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
  import { requestLogin } from '../api/api';
  import base from '../api/api'
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        logining: false,
        loginForm: {
          account: 'zhuangyan',
          checkPass: '12345678'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.loginForm.resetFields();
      },
      handleSubmit(ev) {
        var _this = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            //NProgress.start();
            var loginParams = {'username':this.loginForm.account, 'password':this.loginForm.checkPass };
            requestLogin(loginParams).then(res => {
              this.logining = false;
              //NProgress.done();
              let { data, status, statusText } = res;
              if (status !== 200) {
                this.$message({
                  message: statusText,
                  type: 'error'
                });
              } else {
                let user = {
                  access_token:data.access_token,
                  username: data.account,
                  avatar: base.base()+data.avatar,
                  gender:data.gender,
                  id: data.id,
                  is_admin:data.is_admin,
                  name: data.name,
                };
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$message({
                  message: '登录成功',
                  type: 'success',
                  duration:1000,
                  onClose: function(){
                    _this.$router.push({ path: '/Users' });
                  }
                });
              }
            });
          } else {
            this.$message({
              message: '登录失败',
              type: 'error',
              duration:1000,
            });
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>