<template>
  <el-card style="max-width: 480px">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="课程名称" prop="courseName">
        <el-input v-model="form.student_no"></el-input>
      </el-form-item>
      <el-form-item label="教学教室" prop="classroom">
        <el-input v-model="form.reason"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import type {FormInstance} from "element-plus";
import axios from "axios";

const ruleFormRef = ref<FormInstance>()
const form = ref({
  student_no: '',
  reason: '',
})

const rules = ref({
  student_no: [
    {required: true, message: '请输入学生学号', trigger: 'blur'}
  ],
  reason: [
    {required: true, message: '请输入退学原因', trigger: 'blur'}
  ],
})
const submitForm = async () => {
  const data = {
    student_no: form.value.student_no,
    reason: form.value.reason,
  }
  axios.post('/api/dropOut', data)
      .then(res => {
        console.log(res)
      }).catch(err => {
    console.log(err)
  })
}
</script>
<style scoped>

</style>
