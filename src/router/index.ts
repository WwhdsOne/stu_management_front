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
        }
      ]
    }
  ]
})

export default router
