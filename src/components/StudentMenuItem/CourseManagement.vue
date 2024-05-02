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
    <el-table-column label="操作">
      <template #default="{row}">
        <el-button type="primary" v-if="!isCourseSelected(row.id)" @click="selectCourse(row.id)">选课</el-button>
        <el-button type="danger" v-else @click="dropCourse(row.id)">退课</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
interface User {
  id: number;
  username: string;
  password: string;
  role: number;
}

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


// 定义一个响应式数据属性来存储用户信息
const user = ref<User | null>(null);

// 定义一个响应式数据属性来存储课程信息
const courses = ref<Course[]>([]);

// 定义一个响应式数据属性来存储学生课程信息
const stuCoursesId = ref<[]>([]);

const isCourseSelected = (courseId) => {
  // 在这里实现判断课程是否已经被选中的逻辑
  // 例如，你可以检查 stuCourses 数组中是否包含 courseId
  return stuCoursesId.value.some(id => id === courseId);
}
const fetchCourses = async () => {
  try {
    // 调用 API 来获取课程信息
    const coursesResponse = await axios.post('/api/stu/courses')
    // 将获取到的课程信息存储在 courses 数据属性中
    courses.value = coursesResponse.data.data
  } catch (error) {
    console.error(error)
  }
}
const fetchUserInfo = async () => {
  try {
    // 调用 API 来获取用户信息
    const userResponse = await axios.post('/api/system/getUserInfo')
    // 将获取到的用户信息存储在 user 数据属性中
    user.value = userResponse.data.data
  } catch (error) {
    console.error(error)
  }
}

const fetchStuCourses = async () => {
  try {
    // 调用 API 来获取学生课程信息
    const stuCoursesResponse = await axios.post('/api/stu/getStuCourse', { stuId: user.value.id })
    // 将获取到的学生课程信息存储在 stuCourses 数据属性中
    stuCoursesId.value = stuCoursesResponse.data.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchUserInfo();
  await fetchCourses();
  await fetchStuCourses();
})
onMounted(fetchUserInfo)
onMounted(fetchCourses)
onMounted(fetchStuCourses)
const selectCourse = async (courseId) => {
  console.log(`选课：${courseId}`);
  let data = {
    stuId: user.value.id,
    courseId: courseId
  };

  try {
    const response = await axios.post('/api/stu/choose', data).
    then(res => {
      if(res.data.success !== true){
        console.log("选课失败")
        ElMessage.error(res.data.errorMsg);
        return ;
      }else{
        ElMessage.success('选课成功');
        fetchCourses(); // 刷新课程列表
        fetchUserInfo(); // 刷新用户信息
        fetchStuCourses(); // 刷新学生课程信息
      }
    })
  } catch (error) {
    console.error(error);
  }
}

const dropCourse = async (courseId) => {
  console.log(`退课：${courseId}`);
  // 在这里实现退课的逻辑
  // 假设你已经实现了退课的 API
  try {
    const response = await axios.post('/api/stu/drop', { stuId: user.value.id, courseId: courseId }).
    then(res => {
      if(res.data.error !== null){
        ElMessage.error(res.data.errorMsg);
        return ;
      }else{
        ElMessage.success('退课成功');
        fetchCourses(); // 刷新课程列表
      }
    })
  } catch (error) {
    console.error(error);
  }
}

const getCourseNameById = (id) => {
  const course = courses.value.find(course => course.id === id);
  return course ? course.courseName : '无';
}
</script>
