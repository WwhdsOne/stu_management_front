<template>
  <div id="add">
    <el-card style="max-width: 480px">
      <el-form ref="ruleFormRef" :model="form" label-width="120px">
        <el-form-item label="密码" prop="courseName">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {FormInstance} from "element-plus";
import {ElMessage} from 'element-plus';
import axios from "axios";

const ruleFormRef = ref<FormInstance>()
const form = ref({
  password: '',
})


const submitForm = async () => {
  axios.post('/api/user/updatePassword', {
    password: form.value.password
  })
    .then(res => {
      if(res.data.success != true){
        ElMessage.success(res.data.errorMsg)
        return ;
      }
      ElMessage.success('修改成功')
    })
    .catch(function (error) {
      console.log(error);
    });
}
</script>

<style scoped>
#add {
  width: 500px;
}
</style>
