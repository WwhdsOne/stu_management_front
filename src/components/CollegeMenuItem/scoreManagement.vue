<template>
  <el-table :data="stuCourses">
    <el-table-column prop="studentName" label="学生姓名"></el-table-column>
    <el-table-column prop="courseName" label="课程"></el-table-column>
    <el-table-column label="分数">
      <template #default="{ row }">
        <el-form-item ref="ruleFormRef">
          <div style="display: flex;">
            <el-input v-model="row.score" @blur="resetScore(row)" @change="showCheckMark(row)"
                      style="width: 70%;"></el-input>
            <el-button type="primary" plain v-if="true" @click="updateScore(row)">
              提交
            </el-button>
          </div>
        </el-form-item>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { ElMessage, type FormInstance } from 'element-plus'

interface stuCourse {
  id: number;
  studentName: string;
  courseName: string;
  score: number;
  originalScore: number;
  showCheckMark: boolean;
}

const ruleFormRef = ref<FormInstance>()
const stuCourses = ref<stuCourse[]>([])
const fetchStuCourses = async () => {
  try {
    const response = await axios.post('/api/college/allStuCourse')
    stuCourses.value = response.data.data.map(course => ({
      ...course,
      originalScore: course.score,
      showCheckMark: false
    }))
  } catch (error) {
    console.error(error)
  }
}

onMounted(fetchStuCourses)

const showCheckMark = (course: stuCourse) => {
  console.log(course.score)
  console.log(course.originalScore)
  course.showCheckMark = course.score !== course.originalScore
}

const resetScore = (course: stuCourse) => {
  if (!course.showCheckMark) {

    course.score = course.originalScore
  }
}
const updateScore = async (course: stuCourse) => {
  if (isNaN(course.score)) {
    ElMessage.error('分数应为数字')
    return
  }
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

stuCourses.value.forEach(course => {
  watch(() => course.score, (newVal, oldVal) => {
    if (newVal !== oldVal) {
      course.showCheckMark = true
    } else {
      course.showCheckMark = false
    }
  })
})
</script>
<style scoped>

</style>
