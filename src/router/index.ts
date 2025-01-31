import { createRouter, createWebHistory } from 'vue-router'
import WorkoutPanel from '@/views/WorkoutPanel.vue'
import Nutrition from '@/views/Nutrition.vue'
import Recovery from '@/views/Recovery.vue'
import AppleHealth from '@/views/AppleHealth.vue'
import Overview from '@/views/Overview.vue'
import AddRoutine from '@/views/AddRoutine.vue'
import StartRoutine from '@/views/StartRoutine.vue'
import PageError from '@/views/PageError.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Overview ,
    },
    {
      path: '/workout',
      name: 'workout',
      component: WorkoutPanel ,
    },
    {
      path: '/addworkout',
      name: 'addWorkout',
      component: AddRoutine ,
    },
    {
      path: '/routine/:id',
      name: 'routine',
      component: StartRoutine ,
    },
    {
      path: '/nutrition',
      name: 'nutrition',
      component: Nutrition ,
    },
    {
      path: '/recovery',
      name: 'recovery',
      component: Recovery ,
    },
    {
      path: '/applehealth',
      name: 'applehealth',
      component: AppleHealth ,
    },
    {
      path: '/404',
      name: '404',
      component: PageError ,
    },
  ],
})

export default router
