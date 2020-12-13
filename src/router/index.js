import Vue from 'vue'
import Router from 'vue-router'
import Customer from '@/components/Customer'
import AddCustomer from '@/components/AddCustomer'
import EditCustomer from '@/components/EditCustomer'
import ViewCustomer from '@/components/ViewCustomer'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Customer,
        },
        {
            path: '/add',
            component: AddCustomer,
        },
        {
            path: '/edit/:id',
            component: EditCustomer,
        },
        {
            path: '/view-customer/:id',
            component: ViewCustomer, 
        },
    ]
})