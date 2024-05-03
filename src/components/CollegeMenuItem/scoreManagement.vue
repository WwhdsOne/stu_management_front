<template>
  <el-table :data="stuCourses">
    <el-table-column prop="studentName" label="学生姓名"></el-table-column>
    <el-table-column prop="courseName" label="课程"></el-table-column>
    <el-table-column label="分数">
      <template #default="{ row }">
        <el-form-item ref="ruleFormRef">
          <el-input v-if="row.score === null" v-model="row.score" @blur="updateScore(row)"></el-input>
          <el-input v-else v-model="row.score" @blur="updateScore(row)"></el-input>
        </el-form-item>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { ElMessage, type FormInstance } from 'element-plus'

interface stuCourse {
  id: number;
  studentName: string;
  courseName: string;
  score: number;
}

const ruleFormRef = ref<FormInstance>()
const stuCourses = ref<stuCourse[]>([])
const fetchStuCourses = async () => {
  try {
    const response = await axios.post('/api/college/allStuCourse')
    stuCourses.value = response.data.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(fetchStuCourses)

const updateScore = async (course: stuCourse) => {
  if (course.score < 0 || course.score > 100) {
    ElMessage.error('分数应在0-100之间')
    return
  }
  await axios.post(`/api/college/updateScore`, course).then(
    res => {
      if (res.data.success === true) {
        ElMessage.success('更新成功')
        fetchStuCourses() // 更新分数后重新获取数据
      } else {
        ElMessage.error('更新失败')
      }
    }
  ).catch(err => {
      ElMessage.error('更新失败')
      console.log(err)
    }
  )
}
</script>
<style scoped>

</style>
