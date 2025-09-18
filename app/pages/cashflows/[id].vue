<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Edit Cashflow</h1>
    <div v-if="cashflow">
      <form @submit.prevent="updateCashflow" class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-4">
          <label for="userId" class="block text-gray-700 text-sm font-bold mb-2">User ID:</label>
          <input type="text" id="userId" v-model="formData.userId" disabled class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name:</label>
          <input type="text" id="name" v-model="formData.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label for="amount" class="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
          <input type="number" id="amount" v-model="formData.amount" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label for="account" class="block text-gray-700 text-sm font-bold mb-2">Account:</label>
          <input type="text" id="account" v-model="formData.account" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label for="type" class="block text-gray-700 text-sm font-bold mb-2">Type:</label>
          <input type="number" id="type" v-model="formData.type" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
          <button type="button" @click="router.back()" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
        </div>
      </form>
    </div>
    <div v-else>
      <p>Loading cashflow details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const cashflowId = route.params.id

const { data: cashflow, refresh } = await useFetch(`/api/cashflows/${cashflowId}`)

const formData = ref({
  userId: '',
  name: '',
  amount: 0,
  account: '',
  type: 0
})

watch(cashflow, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal }
  }
}, { immediate: true })

const updateCashflow = async () => {
  await $fetch(`/api/cashflows/${cashflowId}`, {
    method: 'PUT',
    body: formData.value
  })
  router.push('/cashflows')
}
</script>