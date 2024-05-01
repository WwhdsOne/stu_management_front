<template>
  <div id="add">
    <el-card style="max-width: 480px">
      <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px">
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
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {FormInstance} from "element-plus";
import axios from "axios";

const ruleFormRef = ref<FormInstance>()
const form = ref({
  courseName: '',
  classroom: '',
  teacher: '',
  classTime: '',
  prerequisiteId: '',
  courseCredit: '',
  courseDescription: ''
})

const rules = ref({
  courseName: [
    {required: true, message: '请输入课程名称', trigger: 'blur'}
  ],
  classroom: [
    {required: true, message: '请输入教学教室', trigger: 'blur'}
  ],
  teacher: [
    {required: true, message: '请输入任课教师', trigger: 'blur'}
  ],
  classTime: [
    {required: true, message: '请输入上课时间', trigger: 'blur'}
  ],
  courseCredit: [
    {required: true, message: '请输入课程学分', trigger: 'blur'}
  ],
  courseDescription: [
    {required: true, message: '请输入课程说明', trigger: 'blur'}
  ]
})

const submitForm = async () => {
  const response = axios.post('/api/eduOffice/addCourse', {
    courseName: form.value.courseName,
    classroom: form.value.classroom,
    teacher: form.value.teacher,
    classTime: form.value.classTime,
    prerequisiteId: form.value.prerequisiteId,
    courseCredit: form.value.courseCredit,
    courseDescription: form.value.courseDescription
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.error(err);
  })
}
</script>

<style scoped>
#add {
  width: 500px;
}
</style>
