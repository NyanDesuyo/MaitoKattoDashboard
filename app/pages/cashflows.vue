<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Cashflows</h1>
    <div class="grid grid-cols-6 gap-4 mb-4">
      <input v-model="search.id" placeholder="Search ID" class="border p-2" />
      <input v-model="search.userId" placeholder="Search User ID" class="border p-2" />
      <input v-model="search.name" placeholder="Search Name" class="border p-2" />
      <input v-model="search.amount" placeholder="Search Amount" class="border p-2" />
      <input v-model="search.account" placeholder="Search Account" class="border p-2" />
      <input v-model="search.type" placeholder="Search Type" class="border p-2" />
    </div>
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">User ID</th>
          <th class="py-2 px-4 border-b">Name</th>
          <th class="py-2 px-4 border-b">Amount</th>
          <th class="py-2 px-4 border-b">Account</th>
          <th class="py-2 px-4 border-b">Type</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cashflow in cashflows.data" :key="cashflow.id">
          <td class="py-2 px-4 border-b">{{ cashflow.id }}</td>
          <td class="py-2 px-4 border-b">{{ cashflow.userId }}</td>
          <td class="py-2 px-4 border-b">{{ cashflow.name }}</td>
          <td class="py-2 px-4 border-b">{{ cashflow.amount }}</td>
          <td class="py-2 px-4 border-b">{{ cashflow.account }}</td>
          <td class="py-2 px-4 border-b">{{ mapCashflowType(cashflow.type) }}</td>
          <td class="py-2 px-4 border-b">
            <button @click="openEditModal(cashflow)" class="bg-blue-500 text-white py-1 px-2 rounded mr-2">Edit</button>
            <button @click="confirmDelete(cashflow)" class="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4 flex justify-between items-center">
      <button @click="currentPage--" :disabled="currentPage === 1" class="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages" class="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50">Next</button>
    </div>
    <DeleteConfirmationModal :show="showDeleteModal" @confirm="handleDelete" @cancel="showDeleteModal = false" />
    <EditCashflowModal :show="showEditModal" :cashflow="editingCashflow" @save="handleUpdate" @cancel="showEditModal = false" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import DeleteConfirmationModal from '~/components/DeleteConfirmationModal.vue'
import EditCashflowModal from '~/components/EditCashflowModal.vue'

const search = ref({
  id: '',
  userId: '',
  name: '',
  amount: '',
  account: '',
  type: ''
})

const currentPage = ref(1)
const pageSize = 10

const searchParams = computed(() => {
  const params = { ...search.value }
  if (params.id === '') params.id = undefined
  if (params.userId === '') params.userId = undefined
  if (params.name === '') params.name = undefined
  if (params.amount === '') params.amount = undefined
  if (params.account === '') params.account = undefined
  if (params.type === '') params.type = undefined
  return params
})

const { data: cashflows, refresh } = await useFetch('/api/cashflows', {
  query: {
    ...searchParams.value,
    page: currentPage.value,
    pageSize: pageSize
  },
  watch: [searchParams, currentPage]
})

const showDeleteModal = ref(false)
const showEditModal = ref(false)
const selectedCashflow = ref(null)
const editingCashflow = ref(null)

const mapCashflowType = (type) => {
  return Number(type) === 0 ? 'Expense' : 'Income'
}

const totalPages = computed(() => {
  if (!cashflows.value) return 0
  return Math.ceil(cashflows.value.total / pageSize)
})

const openEditModal = (cashflow) => {
  editingCashflow.value = { ...cashflow }
  showEditModal.value = true
}

const handleUpdate = async (updatedCashflow) => {
  await $fetch(`/api/cashflows/${updatedCashflow.id}`, {
    method: 'PUT',
    body: updatedCashflow
  })
  showEditModal.value = false
  refresh()
}

const confirmDelete = (cashflow) => {
  selectedCashflow.value = cashflow
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (selectedCashflow.value) {
    await $fetch(`/api/cashflows/${selectedCashflow.value.id}`, {
      method: 'DELETE'
    })
    showDeleteModal.value = false
    selectedCashflow.value = null
    refresh()
  }
}
</script>
