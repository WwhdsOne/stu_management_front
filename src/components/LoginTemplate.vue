<template>
  <div class="login-container">
    <h2 style="text-align: center;">登录</h2>
    <form @submit.prevent="submitForm">
      <div class="input-group">
        <label for="username">用户名&emsp;</label>
        <input type="text" id="username" v-model="username" required/>
      </div>
      <div class="input-group">
        <label for="password">密码&emsp;&emsp;</label>
        <input type="password" id="password" v-model="password" required/>
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import axios from "axios";
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';

const username = ref('')
const password = ref('')
const router = useRouter();

const submitForm = async () => {
  console.log(`Username: ${username.value}, Password: ${password.value}`)
  const res = await axios.post('/api/user/login', {
    username: username.value,
    password: password.value
  }).then(res => {
    if(res.data.success != true){
      ElMessage.error(res.data.errorMsg)
      return ;
    }
    localStorage.setItem('authorization', res.data.data.token);
    // 跳转到对应的 view
    if(res.data.data.role === 2){
      router.push('/EditionalOffice');
    }else if(res.data.data.role === 3) {
      router.push('/College');
    }else if(res.data.data.role === 4) {
      router.push('/Student');
    }
  }).catch(err => {
    ElMessage.error(err.data.errorMsg)
  });
}
</script>

<style scoped>

.input-group {
  margin-bottom: 20px;
  text-align: center;
}

input {
  width: 75%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 15%;
  padding: 10px;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: block;
  margin: auto;
}

.login-container {
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
