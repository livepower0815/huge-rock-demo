import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from '@/views/login.vue';
import Dashboard from '@/views/dashboard.vue';
import products from '@/views/dashboard/Products.vue';
import CustomerOrders from '@/views/dashboard/CustomerOrders.vue'
import Coupon from '@/views/dashboard/Coupon.vue';
import OrderList from '@/views/dashboard/OrderList.vue';
import orderCheckout from '@/views/dashboard/CustomerCheckout.vue';
// import Homepage from '@/views/HomePages/Homepage.vue';
import shopping from '@/views/HomePages/shopping.vue';
import detail from '@/views/HomePages/detail.vue';
import checkout from '@/views/HomePages/checkout.vue';
import order from '@/views/HomePages/orderList.vue';
import pay from '@/views/HomePages/pay.vue';
import cartList from '@/views/HomePages/cartList.vue';
import Test from '@/views/HomePages/Test.vue';



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        {
          path:'',
          name:'HomePage',
          component:shopping,
        },
        {
          path:'shopping',
          name:'shopping',
          component:shopping,
        },
        {
          path:'fireTest',
          name:'fireTest',
          component: () => import('@/views/HomePages/FireTest.vue'),
        },
        {
          path:'detail/:productId',
          name:'detail',
          component:detail,
        },
        {
          path:'checkout',
          name:'checkout',
          component:checkout,
        },
        {
          path:'order',
          name:'order',
          component:order,
        },
        {
          path:'pay/:orderId',
          name:'pay',
          component:pay,
        },
        {
          path:'cartList',
          name:'cartList',
          component:cartList,
        },
      ],
    },
    {
      path:'*',
      redirect:'/',
    },
    {
      path:'/login',
      name:'login',
      component:login,
      meta: { bgColor: true },
    },
    {
      path:'/test',
      name:'test',
      component:Test,
    },
    
    {
      path:'/dashboard',
      component:Dashboard,
      meta: { requiresAuth: true, bgColor: true },
      children:[
        {
          path:'products',
          name:'products',
          component:products,
          meta: { requiresAuth: true, bgColor: true },
        },
        {
          path:'customerOrders',
          name:'CustomerOrders',
          component:CustomerOrders,
          meta: { bgColor: true },
        },
        {
          path:'coupon',
          name:'Coupon',
          component:Coupon,
          meta: { requiresAuth: true, bgColor: true },
        },
        {
          path:'orderList',
          name:'orderList',
          component:OrderList,
          meta: { requiresAuth: true, bgColor: true },
        },
        {
          path:'orderCheckout/:orderId',
          name:'orderCheckout',
          component:orderCheckout,
          meta: { requiresAuth: true, bgColor: true },
        },
      ],
    }
  ]
})
