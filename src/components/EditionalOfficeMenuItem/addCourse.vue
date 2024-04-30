<template>
  <div id="add">
    <el-card style="max-width: 480px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="课程编号" prop="courseId">
          <el-input v-model="form.courseId"></el-input>
        </el-form-item>
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="form.courseName"></el-input>
        </el-form-item>
        <el-form-item label="教学教室" prop="classroom">
          <el-input v-model="form.classroom"></el-input>
        </el-form-item>
        <el-form-item label="任课教师" prop="teacher">
          <el-input v-model="form.teacher"></el-input>
        </el-form-item>
        <el-form-item label="上课时间" prop="classTime">
            <el-date-picker
                v-model="form.classTime"
                type="datetime"
                placeholder="Select date and time"
            />
        </el-form-item>
        <el-form-item label="先导课编号">
          <el-input v-model="form.prerequisiteId"></el-input>
        </el-form-item>
        <el-form-item label="课程学分" prop="courseCredit">
          <el-input v-model="form.courseCredit"></el-input>
        </el-form-item>
        <el-form-item label="课程说明" prop="courseDescription">
          <el-input v-model="form.courseDescription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type {FormInstance} from "element-plus";
const ruleFormRef = ref<FormInstance>()
const form = ref({
  courseId: '',
  courseName: '',
  classroom: '',
  teacher: '',
  classTime: '',
  prerequisiteId: '',
  courseCredit: '',
  courseDescription: ''
})

const rules = ref({
  courseId: [
    { required: true, message: '请输入课程编号', trigger: 'blur' }
  ],
  courseName: [
    { required: true, message: '请输入课程名称', trigger: 'blur' }
  ],
  classroom: [
    { required: true, message: '请输入教学教室', trigger: 'blur' }
  ],
  teacher: [
    { required: true, message: '请输入任课教师', trigger: 'blur' }
  ],
  classTime: [
    { required: true, message: '请输入上课时间', trigger: 'blur' }
  ],
  courseCredit: [
    { required: true, message: '请输入课程学分', trigger: 'blur' }
  ],
  courseDescription: [
    { required: true, message: '请输入课程说明', trigger: 'blur' }
  ]
})

const submitForm = (formName: string) => {
  console.log(form.value)
  // 在这里你可以处理提交表单的逻辑，例如发送一个请求到服务器
}
</script>

<style scoped>
#add {
  width: 500px;
}
</style>
