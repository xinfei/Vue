<template>
  <div class="wrapper">
    <div class="oldimg"><img class="pre-img" :src="src" alt="" v-show="!isShow"></div>
    <!--大小5M-->
    <vueCropper
      ref="cropper"
      :img="option.img"
      :outputSize="1"
      outputType="jpeg"
      :info="true"
      :full="true"
      :canMove="false"
      :canMoveBox="true"
      :fixedBox="true"
      :original="false"
      :autoCrop="true"
      :autoCropWidth="220"
      :autoCropHeight="220"
      @realTime="realTime"
      v-show="isShow"
    ></vueCropper>
    <label class="el-button el-button--primary btn-upload" for="uploads">上传头像</label>
    <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
    <el-button type="primary" v-show="isShow" @click="finish('base64')">确定</el-button>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper'
  import axios from 'axios'
  import base from '../../api/api'
  var qs=require('qs');

  //base64转file
  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  }
  
  export default {
    data(){
      //获取用户头像
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      }
      return {
        isShow:false,
        src:this.sysUserAvatar,
        option: {
          img: this.sysUserAvatar,
          size: 1,
          full: true,
          outputType: 'jpeg',
          canMove: false,
          fixedBox: false,
          original: false,
          canMoveBox: false,
          autoCrop: true,
        },
      }
    },
    components: {
      VueCropper
    },
    methods:{
      realTime (data) {
        this.previews = data
      },
      uploadImg (e, num) {
        //上传图片
        // this.option.img
        var file = e.target.files[0];
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
          return false
        }
        var reader = new FileReader();
        reader.onload = (e) => {
          let data;
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]));
          } else {
            data = e.target.result;
          }
          if (num === 1) {
            this.option.img = data
          } else if (num === 2) {
            this.example2.img = data
          }
        };
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file);
        this.isShow = !this.isShow;
      },
      finish (type) {
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            var img = window.URL.createObjectURL(data);
          });
        } else {
          this.$refs.cropper.getCropData((data) => {
            let imgData = new FormData();
            imgData.append("avatar_file", dataURLtoFile(data, 'a.jpg'));
            //提交数据
            axios.post(
              base.base()+'/_api/users/avatar',
              imgData,
              { headers: { "Content-Type": "multipart/form-data"}}
            ).then((res)=>{
              let user = JSON.parse(sessionStorage.getItem('user'));
              user.avatar = base.base()+res.data.avatar_url;
              sessionStorage.setItem('user', JSON.stringify(user));
              this.$message({
                message: '修改成功',
                type: 'success',
                duration:2000,
                onClose: function(){
                  window.location.reload();
                }
              });
            }).catch((error) => {
              this.$message({
                message: '修改失败',
                type: 'error',
                duration:2000,
                onClose: function(){
                  window.location.reload();
                }
              });
            });
          });
        }
      }
    }
  }
</script>

<style scoped>
  .pre-img{
    width:250px;
    height: 250px;
    margin-bottom: 20px;
    display:block;
  }
  .wrapper{
    width:500px;
    height:500px;
    margin-top:30px;
  }
  .btn-upload{
    margin-top:30px;
  }
</style>