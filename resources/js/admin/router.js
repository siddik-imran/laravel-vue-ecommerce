import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import AdminDashboard from '../components/admin/AdminDashboard.vue'
import AdminLogin from '../components/admin/auth/AdminLogin.vue'
import CategoryList from '../components/admin/category/CategoryList.vue'
import BrandList from '../components/admin/brand/BrandList.vue'
import ProductList from '../components/admin/product/ProductList.vue'
import CustomerList from '../components/admin/customer/CustomerList.vue'
import OrderList from '../components/admin/order/OrderList.vue'
import OrderDetails from '../components/admin/order/OrderDetails.vue'
import AddOrUpdateProduct from '../components/admin/product/AddOrUpdateProduct.vue'

const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'active',
    routes:[
        { path: '/admin/dashboard', component: AdminDashboard, name: 'AdminDashboard' },
        { path: '/admin/login', component: AdminLogin, name: 'AdminLogin' },
        { path: '/admin/categories', component: CategoryList, name: 'CategoryList' },
        { path: '/admin/brands', component: BrandList, name: 'BrandList' },
        { path: '/admin/products', component: ProductList, name: 'ProductList' },
        { path: '/admin/customers', component: CustomerList, name: 'CustomerList' },
        { path: '/admin/orders', component: OrderList, name: 'OrderList' },
        { path: '/admin/order-details/:orderId', component: OrderDetails, name: 'OrderDetails' },
        { path: '/admin/add-new-product', component: AddOrUpdateProduct, name: 'AddOrUpdateProduct' },
        { path: '/admin/edit-product/:id', component: AddOrUpdateProduct, name: 'editProduct' },

    ]
  })


// Route Scecure
router.beforeEach((to, from, next) => {
    let isAuthenticated = '';
    let authUser = localStorage.getItem('adminLoggedIn') ? JSON.parse(localStorage.getItem('adminLoggedIn')) : false;
    if(authUser){
        isAuthenticated = authUser.id && authUser.email ? true : false;
    }else{
        isAuthenticated = false;
    }

    if (to.name !== 'AdminLogin' && !isAuthenticated) next({ name: 'AdminLogin' })
    else if(to.name === 'AdminLogin' && isAuthenticated){
        next({name: 'AdminDashboard'})
    }
    else next()
  })

export default router;

