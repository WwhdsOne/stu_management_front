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
    <el-table-column prop="status" label="状态"></el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      :formatter="row => {return dataDictionaryStore.dataDictionary['stu_status'][row.status].value;}"
    ></el-table-column>
    <el-table-column label="操作">
      <template #default="{row}">
        <el-button type="primary" plain v-if="row.status === 0" @click="handleRegister(row)" >注册</el-button>
        <el-button type="info" plain v-if="row.status === 1" @click="handlePause(row)">休学</el-button>
        <el-button type="success" plain v-if="row.status === 2" @click="handleResume(row)">复学</el-button>
        <el-button type="danger" plain v-if="row.status !== 3" @click="handleDropout(row)">退学</el-button>
      </template>
    </el-table-column>
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
  await axios.post('/api/eduOffice/students')
    .then(res => {
      students.value = res.data.data
      console.log(res.data.data)
    }).catch(err => {
      console.log(err)
    })
}
onMounted(async () => {
  await axios.post('/api/eduOffice/students')
    .then(res => {
      students.value = res.data.data
      console.log(res.data.data)
    }).catch(err => {
      console.log(err)
    })
})
onMounted(fetchStudents)

const handleUpdate = async (row: User) => {
  try {
    const response = await axios.post('/api/eduOffice/updateStudent', row);
    console.log(response.data);
    await fetchStudents(); // 刷新列表
  } catch (error) {
    console.error(error);
  }
}

const handleRegister = (row: User) => {
  let data = JSON.parse(JSON.stringify(row));
  data.status = 1;
  handleUpdate(data);
}

const handlePause = (row: User) => {
  let data = JSON.parse(JSON.stringify(row));
  data.status = 2;
  handleUpdate(data);
}

const handleResume = (row: User) => {
  let data = JSON.parse(JSON.stringify(row));
  data.status = 1;
  handleUpdate(data);
}

const handleDropout = (row: User) => {
  let data = JSON.parse(JSON.stringify(row));
  data.status = 3;
  handleUpdate(data);
}


</script>

<style scoped>

</style>
