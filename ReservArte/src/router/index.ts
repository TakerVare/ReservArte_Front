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
import PrivacyView from '../views/PrivacyView.vue'
import PaymentMethodsView from '../views/PaymentMethodsView.vue'
import AboutView from '../views/AboutView.vue'
import NotificationsView from '../views/NotificationsView.vue'
import ProfileView from '../views/ProfileView.vue'
import TermsView from '../views/TermsView.vue'

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
    {
      path: '/',
      component: PublicLayout,
      children: [
        { path: '', name: 'home', component: HomeView },
        { path: 'login', name: 'login', component: LoginView },
        { path: 'inicio', name: 'inicio', component: HomeView },
        { path: 'contact', name: 'contact', component: ContactInfoView },
        { path: 'booking', name: 'booking', component: BookingView },
        { path: 'appointment-calendar', name: 'appointment-calendar', component: AppointmentCalendarView },
        { path: 'demo-page-title', name: 'demo-page-title', component: PageTitleDemoView },
        { path: 'style-guide', name: 'style-guide', component: StileGuideView },
        { path: 'user', name: 'user', component: UserView },
        { path: 'privacy', name: 'privacy', component: PrivacyView },
        { path: 'payment-methods', name: 'payment-methods', component: PaymentMethodsView },
        { path: 'about', name: 'about', component: AboutView },
        { path: 'notifications', name: 'notifications', component: NotificationsView },
        { path: 'profile', name: 'profile', component: ProfileView },
        { path: 'profile/edit/:id', name: 'profile-edit', component: CustomerDetailView },
        { path: 'terms', name: 'terms', component: TermsView },
      ],
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [],
    },
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

  if (to.name === 'login' && authStore.isAuthenticated) {
    return { name: 'booking' }
  }

  return true
})

export default router