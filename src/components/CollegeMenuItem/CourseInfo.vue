<template>
  <el-table :data="courses" style="width: 100%">
    <el-table-column prop="courseName" label="课程名称"></el-table-column>
    <el-table-column prop="classroom" label="教室"></el-table-column>
    <el-table-column prop="teacher" label="教师"></el-table-column>
    <el-table-column prop="classTime" label="上课时间"></el-table-column>
    <el-table-column prop="courseCredit" label="课程学分"></el-table-column>
    <el-table-column
      label="先修课程"
      :formatter="row => {return getCourseNameById(row.prerequisiteId)}"
    ></el-table-column>
    <el-table-column prop="courseDescription" label="课程描述"></el-table-column>
  </el-table>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

interface Course {
  id: number;
  courseName: string;
  classroom: string;
  teacher: string;
  classTime: Date;
  prerequisiteId: number | null;
  courseCredit: number;
  courseDescription: string;
}



// 定义一个响应式数据属性来存储课程信息
const courses = ref<Course[]>([]);

const fetchCourses = async () => {
  try {
    // 调用 API 来获取课程信息
    const coursesResponse = await axios.post('/api/college/allCourses')
    // 将获取到的课程信息存储在 courses 数据属性中
    courses.value = coursesResponse.data.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchCourses();
})
const getCourseNameById = (id) => {
  const course = courses.value.find(course => course.id === id);
  return course ? course.courseName : '无';
}
</script>
