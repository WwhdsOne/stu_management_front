<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
          :router="true"
        >
          <el-menu-item index="1">个人课程管理</el-menu-item>
          <el-menu-item index="2">退出登录</el-menu-item>
        </el-menu>
      </el-header>

      <el-main>
        <div id="container">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  if (key === '1') {
    activeIndex2.value = key
    router.push({name: 'CourseManagement'})
  } else if (key === '2') {
    localStorage.setItem('authorization', ''); // 设置 'authorization' 的值为空
    router.push({name: 'login'});
  }
}
</script>
<style scoped>
#container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
