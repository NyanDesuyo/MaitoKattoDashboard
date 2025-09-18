<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Edit Todo</h1>
    <div v-if="todo">
      <form @submit.prevent="updateTodo" class="bg-white p-6 rounded-lg shadow-md">
        <div class="mb-4">
          <label for="userId" class="block text-gray-700 text-sm font-bold mb-2">User ID:</label>
          <input type="text" id="userId" v-model="formData.userId" disabled class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="mb-4">
          <label for="text" class="block text-gray-700 text-sm font-bold mb-2">Text:</label>
          <input type="text" id="text" v-model="formData.text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex items-center justify-between">
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
          <button type="button" @click="router.back()" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cancel</button>
        </div>
      </form>
    </div>
    <div v-else>
      <p>Loading todo details...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const todoId = route.params.id

const { data: todo, refresh } = await useFetch(`/api/todos/${todoId}`)

const formData = ref({
  userId: '',
  text: ''
})

watch(todo, (newVal) => {
  if (newVal) {
    formData.value = { ...newVal }
  }
}, { immediate: true })

const updateTodo = async () => {
  await $fetch(`/api/todos/${todoId}`, {
    method: 'PUT',
    body: formData.value
  })
  router.push('/todos')
}
</script>