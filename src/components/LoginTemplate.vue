<template>
  <div class="login-container">
    <h2>登录</h2>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="username" required/>
      </div>
      <div class="input-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="password" required/>
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import axios from "axios";
import Cookies from 'js-cookie';
import {useRouter} from 'vue-router';

const username = ref('')
const password = ref('')
const router = useRouter();

const submitForm = async () => {
  // console.log(`Username: ${username.value}, Password: ${password.value}`)
  // const res = await axios.post('http://localhost:8080/user/login', {
  //   username: username.value,
  //   password: password.value
  // }).then(res => {
  //   console.log(res.data);
  //   // 设置 cookie
  //   Cookies.set('user', res.data.user);
  //   // 跳转到对应的 view
  //   if(res.data.user.role === 1){
  //     router.push('/EditionalOffice');
  //   }else if(res.data.user.role === 3) {
  //     router.push('/College');
  //   }else if(res.data.user.role === 4) {
  //     router.push('/Student');
  //   }
  //
  //
  // }).catch(err => {
  //   console.error(err);
  // });
  router.push('/EditionalOffice');
}
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.login-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
