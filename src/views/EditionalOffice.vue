<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="h-6"/>
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
          <el-menu-item index="1">课程录入</el-menu-item>
          <el-menu-item index="2">退学处理</el-menu-item>
          <el-menu-item index="3">退课处理</el-menu-item>
          <el-menu-item index="4">休复学处理</el-menu-item>
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
    router.push({name: 'addCourse'})
  } else {
    router.push({name: 'addCourse'})
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
