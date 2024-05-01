<template>
  <el-table :data="students" style="width: 100%">
    <el-table-column prop="studentNo" label="学号"></el-table-column>
    <el-table-column prop="userId" label="用户ID"></el-table-column>
    <el-table-column prop="age" label="年龄"></el-table-column>
    <el-table-column prop="gender" label="性别"></el-table-column>
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="enrollmentDate" label="入学日期"></el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue';
import axios from 'axios';
interface User {
  studentNo: string
  userId: string
  age: number
  gender: string
  name: string
  enrollmentDate: string
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const students = ref<User[]>([])

onMounted(async () => {
  await axios.post('/api/eduOffice/students')
      .then(res => {
        students.value = res.data.data;
        console.log(res.data.data)
      }).catch(err => {
        console.log(err);
      });

});
console.log(students.value);
</script>

<style scoped>

</style>
