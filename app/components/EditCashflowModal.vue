<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-xl w-1/3">
      <h2 class="text-xl font-bold mb-4">Edit Cashflow</h2>
      <form @submit.prevent="save">
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
          <select id="type" v-model="formData.type" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <option :value="1">Income</option>
            <option :value="0">Expense</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Save</button>
          <button type="button" @click="cancel" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  cashflow: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['save', 'cancel'])

const formData = ref({ ...props.cashflow })

watch(() => props.cashflow, (newVal) => {
  formData.value = { ...newVal }
}, { immediate: true, deep: true })

const save = () => {
  emit('save', formData.value)
}

const cancel = () => {
  emit('cancel')
}
</script>
