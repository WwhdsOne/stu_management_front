<template>
  <div id="add">
    <el-card style="max-width: 480px">
      <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="120px">
        <el-form-item label="学生学号" prop="studentNo">
          <el-input v-model="form.studentNo"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="学生年龄" prop="name">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="form.gender">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="学生班级" prop="name">
          <el-input v-model="form.className"></el-input>
        </el-form-item>
        <el-form-item label="入学时间" prop="classTime ">
          <el-date-picker
            v-model="form.enrollmentDate"
            type="datetime"
            placeholder="Select date and time"
          />
        </el-form-item>
        <!-- 其他的表单项... -->
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, type FormInstance, ElMessage } from 'element-plus'
import axios from 'axios'

const ruleFormRef = ref<FormInstance>()
const form = ref({
  studentNo: '',
  name: '',
  age: '',
  gender: '',
  className: '',
  enrollmentDate: ''
})

const rules = ref({
  studentNo: [
    { required: true, message: '请输入学生学号', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入学生姓名', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入学生年龄', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'blur' }
  ],
  className: [
    { required: true, message: '请输入学生班级', trigger: 'blur' }
  ],
  enrollmentDate: [
    { required: true, message: '请选择入学时间', trigger: 'blur' }
  ]
})
const submitForm = async () => {
  axios.post('/api/college/addStudent', {
    studentNo: form.value.studentNo,
    name: form.value.name,
    age: form.value.age,
    gender: form.value.gender,
    className: form.value.className,
    enrollmentDate: form.value.enrollmentDate,
    status: 1
  }).then(res => {
    // 清空表单
    if(res.data.success === true){
      ElMessage.success('添加成功')
      form.value.studentNo = ''
      form.value.name = ''
      form.value.age = ''
      form.value.gender = ''
      form.value.className = ''
      form.value.enrollmentDate = ''
    }else{
      ElMessage.error('添加失败')
    }

  }).catch(err => {
    console.error(err)
  })
}
</script>
<style scoped>
#add {
  width: 500px;
}
</style>
