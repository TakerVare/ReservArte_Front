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
import AppointmentCalendarView from '../views/appointmentCalendarView.vue'
import PageTitleDemoView from '../views/pageTitleDemoView.vue'
import StileGuideView from '../views/stileGuideView.vue'
import UserView from '../views/UserView.vue'

// Vistas auth
import LoginView from '../views/LoginView.vue'

// Vistas admin
import CustomerMasterView from '../views/customerMasterView.vue'
import CustomerDetailView from '../views/customerDetailView.vue'
import EmployeeMasterView from '../views/employeeMasterView.vue'
import EmployeeDetailView from '../views/employeeDetailView.vue'
import ServiceMasterView from '../views/serviceMasterView.vue'
import ServiceDetailView from '../views/serviceDetailView.vue'
import AppointmentMasterView from '../views/appointmentMasterView.vue'
import AppointmentDetailView from '../views/appointmentDetailView.vue'

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
        { path: '', name: 'home', component: LoginView },
        { path: 'login', name: 'login', component: LoginView },
        { path: 'inicio', name: 'inicio', component: HomeView },
        { path: 'contact', name: 'contact', component: ContactInfoView },
        { path: 'booking', name: 'booking', component: BookingView },
        { path: 'appointment-calendar', name: 'appointment-calendar', component: AppointmentCalendarView },
        { path: 'demo-page-title', name: 'demo-page-title', component: PageTitleDemoView },
        { path: 'style-guide', name: 'style-guide', component: StileGuideView },
        { path: 'user', name: 'user', component: UserView },
      ],
    },

    /**
     * RUTAS AUTH
     * Heredan de AuthLayout → Sin header ni footer (p. ej. registro)
     */
    {
      path: '/auth',
      component: AuthLayout,
      children: [
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
        { path: 'customers', name: 'admin-customers', component: CustomerMasterView },
        { path: 'customers/new', name: 'admin-new-customer', component: CustomerDetailView },
        { path: 'customers/:id/edit', name: 'admin-edit-customer', component: CustomerDetailView },
        { path: 'employees', name: 'admin-employees', component: EmployeeMasterView },
        { path: 'employees/new', name: 'admin-new-employee', component: EmployeeDetailView },
        { path: 'employees/:id/edit', name: 'admin-edit-employee', component: EmployeeDetailView },
        { path: 'services', name: 'admin-services', component: ServiceMasterView },
        { path: 'services/new', name: 'admin-new-service', component: ServiceDetailView },
        { path: 'services/:id/edit', name: 'admin-edit-service', component: ServiceDetailView },
        { path: 'bookings', name: 'admin-bookings', component: AppointmentMasterView },
        { path: 'bookings/new', name: 'admin-new-booking', component: AppointmentDetailView },
        { path: 'bookings/:id/edit', name: 'admin-edit-booking', component: AppointmentDetailView },
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

  // Si está logueado y va a la página de inicio, mostrar BookingView
  if (to.name === 'home' && authStore.isAuthenticated) {
    return { name: 'booking' }
  }

  return true
})

export default router