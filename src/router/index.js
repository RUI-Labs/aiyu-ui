import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OrderView from '../views/OrderView.vue'
import TrainView from '../views/TrainView.vue'
import AiyuConfigView from '../views/AiyuConfigView.vue'
import WhisperConfigView from '../views/WhisperConfigView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView
    },
    {
      path: '/train',
      name: 'train',
      component: TrainView
    },
    {
      path: '/train/aiyubing',
      name: 'aiyuconfig',
      component: AiyuConfigView
    },
    {
      path: '/train/whisper',
      name: 'whisper',
      component: WhisperConfigView
    }
  ]
})


export default router
