import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import ShoppingCartPage from './Webpages/ShoppingCartPage.vue';
import LessonsDetailPage from './Webpages/LessonsDetailPage.vue';
import LessonsPageView from './Webpages/LessonsPageView.vue';
import NotFoundPage from './Webpages/NotFoundPage.vue';


createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/',
        redirect: '/lessons',
    },{
        path: '/cart',
        component: ShoppingCartPage,
    }, {
        path: '/lessons',
        component:LessonsPageView,
    }, {
        path: '/lessons/:lessonsId',
        component: LessonsDetailPage,
    
    }, {
        path:'/:pathMatch(.*)*',
        component: NotFoundPage,
    }]
}))
.mount('#app')

