import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as VueRouter from 'vue-router'
import ShoppingCartPage from './Webpages/ShoppingCartPage.vue';
import ProductDetailPage from './Webpages/ProductDetailPage.vue';
import ProductsPageView from './Webpages/ProductsPageView.vue';
import NotFoundPage from './Webpages/NotFoundPage.vue';


createApp(App)
.use(VueRouter.createRouter({
    history: VueRouter.createWebHistory(process.env.BASE_URL),
    routes: [{
        path: '/',
        redirect: '/products',
    },{
        path: '/cart',
        component: ShoppingCartPage,
    }, {
        path: '/products',
        component:ProductsPageView,
    }, {
        path: '/products/:productId',
        component: ProductDetailPage,
    
    }, {
        path:'/:pathMatch(.*)*',
        component: NotFoundPage,
    }]
}))
.mount('#app')

