<template>
  <el-table :data="students" style="width: 100%">
    <el-table-column prop="studentNo" label="学号"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="className" label="班级"></el-table-column>
    <el-table-column prop="age" label="年龄"></el-table-column>
    <el-table-column
      prop="gender"
      label="性别"
      :formatter="row => {return dataDictionaryStore.dataDictionary['sex'][row.gender].value;}"
    ></el-table-column>
    <el-table-column prop="enrollmentDate" label="入学日期"></el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      :formatter="row => {return dataDictionaryStore.dataDictionary['stu_status'][row.status].value;}"
    ></el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElTable } from 'element-plus'
import { useDataDictionaryStore } from '@/stores/dataDictionaryStore' // 导入你的 Pinia store

interface User {
  studentNo: string
  age: number
  gender: number
  name: string
  enrollmentDate: string
  status: number
  className: string
}

const students = ref<User[]>([])

// 使用你的 Pinia store
const dataDictionaryStore = useDataDictionaryStore()
const fetchStudents = async () => {
  await axios.post('/api/college/allStudents')
    .then(res => {
      students.value = res.data.data
      console.log(res.data.data)
    }).catch(err => {
      console.log(err)
    })
}
onMounted(fetchStudents)


</script>

<style scoped>

</style>
