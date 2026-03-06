<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import CItemMasterManagement from '../components/c_itemMasterManagement.vue'
import { useAppointmentStore } from '../stores/appointment.store'
import { useEmployeeStore } from '../stores/employee.store'
import { useViewportSize } from '../composables/useViewportSize'

const { t: $t } = useI18n()
const router = useRouter()
const appointmentStore = useAppointmentStore()
const employeeStore = useEmployeeStore()
const { size } = useViewportSize()

const statusOptions = [
  { value: 'pending', labelKey: 'appointment.statusPending' },
  { value: 'confirmed', labelKey: 'appointment.statusConfirmed' },
  { value: 'in_progress', labelKey: 'appointment.statusInProgress' },
  { value: 'completed', labelKey: 'appointment.statusCompleted' },
  { value: 'cancelled', labelKey: 'appointment.statusCancelled' },
  { value: 'cancelled_by_customer', labelKey: 'appointment.statusCancelledByCustomer' },
  { value: 'cancelled_by_business', labelKey: 'appointment.statusCancelledByBusiness' },
  { value: 'no_show', labelKey: 'appointment.statusNoShow' },
]

onMounted(() => {
  appointmentStore.fetchAppointments()
  employeeStore.fetchEmployees()
})

function onBack() {
  router.push({ name: 'user' })
}

function onNew() {
  router.push({ name: 'admin-new-booking' })
}

function onEditItem(itemId: string) {
  router.push({ name: 'admin-edit-booking', params: { id: itemId } })
}

function onViewItem(itemId: string) {
  router.push({ name: 'admin-edit-booking', params: { id: itemId } })
}

async function onDeleteItem(itemId: string) {
  console.log($t('appointment.deleteConfirm'))
  await appointmentStore.deleteAppointment(itemId)
}
</script>

<script lang="ts">
export default {
  name: 'AppointmentMasterView',
}
</script>

<template>
  <div class="appointment-master-view">
    <p v-if="appointmentStore.error" class="appointment-master-view__error">
      {{ appointmentStore.error }}
    </p>
    <CItemMasterManagement
      v-else
      :size="size"
      :back-text="$t('common.back')"
      :item-label="$t('appointment.label')"
      :new-text="$t('appointment.new')"
      :title="$t('admin.customers')"
      :search-query="appointmentStore.searchQuery"
      @update:search-query="appointmentStore.setSearchQuery($event)"
      :items="appointmentStore.items"
      @back="onBack"
      @new="onNew"
      @edit-item="onEditItem"
      @delete-item="onDeleteItem"
      @view-item="onViewItem"
    >
      <template #filters>
        <div class="appointment-master-view__filters">
          <div class="appointment-master-view__filter">
            <label for="filter-date-from" class="appointment-master-view__label">
              {{ $t('appointment.filterDateFrom') }}
            </label>
            <input
              id="filter-date-from"
              v-model="appointmentStore.filterDateFrom"
              type="date"
              class="appointment-master-view__input"
            />
          </div>
          <div class="appointment-master-view__filter">
            <label for="filter-date-to" class="appointment-master-view__label">
              {{ $t('appointment.filterDateTo') }}
            </label>
            <input
              id="filter-date-to"
              v-model="appointmentStore.filterDateTo"
              type="date"
              class="appointment-master-view__input"
            />
          </div>
          <div class="appointment-master-view__filter">
            <label for="filter-status" class="appointment-master-view__label">
              {{ $t('appointment.filterStatus') }}
            </label>
            <select
              id="filter-status"
              v-model="appointmentStore.filterStatus"
              class="appointment-master-view__select"
            >
              <option value="">{{ $t('appointment.allStatuses') }}</option>
              <option
                v-for="opt in statusOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ $t(opt.labelKey) }}
              </option>
            </select>
          </div>
          <div class="appointment-master-view__filter">
            <label for="filter-employee" class="appointment-master-view__label">
              {{ $t('appointment.filterEmployee') }}
            </label>
            <select
              id="filter-employee"
              v-model="appointmentStore.filterEmployeeId"
              class="appointment-master-view__select"
              :disabled="employeeStore.loading"
            >
              <option value="">{{ $t('appointment.allEmployees') }}</option>
              <option
                v-for="emp in employeeStore.employees"
                :key="emp.id"
                :value="String(emp.id)"
              >
                {{ emp.fullName }}
              </option>
            </select>
          </div>
        </div>
      </template>
    </CItemMasterManagement>
    <p v-if="appointmentStore.loading" class="appointment-master-view__loading">
      {{ $t('appointment.loading') }}
    </p>
  </div>
</template>

<style scoped>
.appointment-master-view {
  width: 100%;
  position: relative;
}

.appointment-master-view__error {
  color: #b71c1c;
  padding: 1rem;
  margin: 0;
}

.appointment-master-view__loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  color: #666;
}

.appointment-master-view__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  align-items: flex-end;
}

.appointment-master-view__filter {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.appointment-master-view__label {
  font-size: 0.875rem;
  color: #333;
}

.appointment-master-view__input,
.appointment-master-view__select {
  padding: 0.4rem 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  min-width: 140px;
}

.appointment-master-view__select:disabled {
  opacity: 0.7;
}
</style>
