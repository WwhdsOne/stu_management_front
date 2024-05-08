import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/EditionalOffice',
      name: 'EditionalOffice',
      component: () => import('@/views/EditionalOffice.vue'),
      children: [
        {
          path: 'addCourse',
          name: 'addCourse',
          component: () => import('@/components/EditionalOfficeMenuItem/addCourse.vue')
        },
        {
          path: 'stuManagement',
          name: 'stuManagement',
          component: () => import('@/components/EditionalOfficeMenuItem/stuManagement.vue')
        },
        {
          path: 'PasswordUpdateOffice',
          name: 'PasswordUpdateOffice',
          component: () => import('@/components/EditionalOfficeMenuItem/PasswordUpdateOffice.vue')
        }
      ]
    },
    {
      path: '/Student',
      name: 'Student',
      component: () => import('@/views/Student.vue'),
      children: [
        {
          path: 'CourseManagement',
          name: 'CourseManagement',
          component: () => import('@/components/StudentMenuItem/CourseManagement.vue')
        },
        {
          path: 'PasswordUpdateStu',
          name: 'PasswordUpdateStu',
          component: () => import('@/components/StudentMenuItem/PasswordUpdateStu.vue')
        }
      ]
    },
    {
      path: '/College',
      name: 'College',
      component: () => import('@/views/College.vue'),
      children: [
        {
          path: 'addStudent',
          name: 'addStudent',
          component: () => import('@/components/CollegeMenuItem/addStudent.vue')
        },
        {
          path: 'CourseSelectionQuery',
          name: 'CourseSelectionQuery',
          component: () => import('@/components/CollegeMenuItem/CourseSelectionQuery.vue')
        },
        {
          path: 'CourseInfo',
          name: 'CourseInfo',
          component: () => import('@/components/CollegeMenuItem/CourseInfo.vue')
        },
        {
          path: 'StudentInfo',
          name: 'StudentInfo',
          component: () => import('@/components/CollegeMenuItem/StudentInfo.vue')
        },
        {
          path: 'scoreManagement',
          name: 'scoreManagement',
          component: () => import('@/components/CollegeMenuItem/scoreManagement.vue')
        },
        {
          path: 'PasswordUpdateCollege',
          name: 'PasswordUpdateCollege',
          component: () => import('@/components/CollegeMenuItem/PasswordUpdateCollege.vue')
        }
      ]
    }
  ]
})

export default router
