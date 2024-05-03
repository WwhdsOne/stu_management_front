

<template>
  <el-table :data="stuCourses">
    <el-table-column prop="studentName" label="学生姓名"></el-table-column>
    <el-table-column prop="courseName" label="课程"></el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
interface stuCourse {
  id: number;
  studentName: number;
  courseName: number;
  score: number;
}
const stuCourses = ref<stuCourse[]>([]);


onMounted(async () => {
  try {
    const response = await axios.post('/api/college/allStuCourse')
    stuCourses.value = response.data.data
  } catch (error) {
    console.error(error)
  }
})
</script>
<style scoped>

</style>
