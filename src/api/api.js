import axios from 'axios';
var qs=require('qs');

// let base = '';
// let base = 'http://172.18.1.173:5000';
let base = 'http://172.18.1.138:5000';
// let base = 'http://192.168.0.101:5000';
export default {
  base: function(){
    return base
  }
}

axios.interceptors.request.use((config) => {
  if (sessionStorage.getItem('user')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    let user = JSON.parse(sessionStorage.getItem('user'));
    config.headers.Authorization =  'JWT '+user.access_token;
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});

//登录
export const requestLogin = params => { return axios.post(`${base}/auth`, params).then(res => res); };

//获取用户信息
export const getUserInfo = data => { return axios.get(`${base}/_api/users/${data}`);};

//获取用户列表
export const getUserListPage = params => { return axios.get(`${base}/_api/users`, { params: params }); };

//添加用户
export const addUser = data => { return axios.post(`${base}/_api/users`, qs.stringify(data), { headers: { "Content-Type": "application/x-www-form-urlencoded"}});};

//删除用户
// export const removeUser = data => { return axios.post(`${base}/_api/users/`, data, { headers: { "Content-Type": "application/x-www-form-urlencoded"}});};

//批量删除用户
export const batchRemoveUser = data => { return axios.post(`${base}/_api/users/del`, qs.stringify({'ids': data}), { headers: { "Content-Type": "application/x-www-form-urlencoded"}}); };

//修改用户信息
export const editUser = data => { return axios.post(`${base}/_api/users/${data._id}`, qs.stringify(data), { headers: { "Content-Type": "application/x-www-form-urlencoded"}});};

//设置用户角色
export const setRole = data => { return axios.post(`${base}/_api/users/editrole/${data.userid}`, qs.stringify({ 'roles':data.roles }, { arrayFormat:'brackets' }), { headers: { "Content-Type": "application/x-www-form-urlencoded"}});};

//修改当前用户密码
export const changePwd = data => { return axios.post(`${base}/_api/auth/change_pwd`, qs.stringify(data), { headers: { "Content-Type": "application/x-www-form-urlencoded"}});};

//验证账号是否存在
export const checkAccount = data =>{ return axios.post(`${base}/_api/users/check_account`, qs.stringify({'account': data}), { headers: { "Content-Type": "application/x-www-form-urlencoded"}});};

//获取角色列表
export const getRoleList = params => { return axios.get(`${base}/_api/roles`, { params: params }); };

//获取角色信息
export const getRole = data => { return axios.get(`${base}/_api/roles/${data}`); };

//添加角色
export const addRole = data => { return axios.post(`${base}/_api/roles`, qs.stringify(data), { headers: { "Content-Type": "application/x-www-form-urlencoded"}});};

//修改角色信息
export const editRole = data => { return axios.post(`${base}/_api/roles/${data._id}`, qs.stringify(data), { headers: { "Content-Type": "application/x-www-form-urlencoded"}});};

//批量删除角色
export const batchRemoveRole = data => { return axios.post(`${base}/_api/roles/del`, qs.stringify({'ids': data}), { headers: { "Content-Type": "application/x-www-form-urlencoded"}}); };