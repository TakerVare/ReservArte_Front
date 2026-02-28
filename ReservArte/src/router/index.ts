import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

// Layouts
import PublicLayout from '../layouts/PublicLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Vistas públicas
import HomeView from '../views/HomeView.vue'
import ContactInfoView from '../views/ContactInfoView.vue'
import BookingView from '../views/BookingView.vue'
import UserView from '../views/UserView.vue'

// Vistas auth
import LoginView from '../views/LoginView.vue'

// Vistas admin
import UserManagementView from '../views/UserManagementView.vue'
import NewUserView from '../views/NewUserView.vue'
import CustomerMasterView from '../views/customerMasterView.vue'
import CustomerDetailView from '../views/customerDetailView.vue'
import EmployeeMasterView from '../views/employeeMasterView.vue'
import EmployeeDetailView from '../views/employeeDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /**
     * RUTAS PÚBLICAS
     * Heredan de PublicLayout → Banner + contenido + NavBottom
     */
    {
      path: '/',
      component: PublicLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'contact', name: 'contact', component: ContactInfoView },
        { path: 'booking', name: 'booking', component: BookingView },
        { path: 'user', name: 'user', component: UserView },
      ],
    },

    /**
     * RUTAS AUTH
     * Heredan de AuthLayout → Sin header ni footer
     */
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        { path: 'login', name: 'login', component: LoginView },
        // { path: 'register', name: 'register', component: RegisterView },
      ],
    },

    /**
     * RUTAS ADMIN
     * Heredan de AdminLayout → Header y footer distintos
     */
    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: 'users', name: 'admin-users', component: UserManagementView },
        { path: 'users/new', name: 'admin-new-user', component: NewUserView },
        { path: 'customers', name: 'admin-customers', component: CustomerMasterView },
        { path: 'customers/new', name: 'admin-new-customer', component: CustomerDetailView },
        { path: 'customers/:id/edit', name: 'admin-edit-customer', component: CustomerDetailView },
        { path: 'employees', name: 'admin-employees', component: EmployeeMasterView },
        { path: 'employees/new', name: 'admin-new-employee', component: EmployeeDetailView },
        { path: 'employees/:id/edit', name: 'admin-edit-employee', component: EmployeeDetailView },
        // { path: 'users/:id/edit', name: 'admin-edit-user', component: EditUserView },
      ],
    },
  ],
})

router.beforeEach((to) => {
  const authStore = useAuthStore()
  const isAdminRoute = to.path.startsWith('/admin')

  if (isAdminRoute && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  return true
})

export default router