<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Todos</h1>
    <div class="grid grid-cols-3 gap-4 mb-4">
      <input v-model="search.id" placeholder="Search ID" class="border p-2" />
      <input v-model="search.userId" placeholder="Search User ID" class="border p-2" />
      <input v-model="search.text" placeholder="Search Text" class="border p-2" />
    </div>
    <div class="mb-4">
      <button @click="editTodo" :disabled="!selectedTodo" class="bg-blue-500 text-white py-2 px-4 rounded mr-2 disabled:opacity-50">Edit</button>
      <button @click="confirmDelete" :disabled="!selectedTodo" class="bg-red-500 text-white py-2 px-4 rounded disabled:opacity-50">Delete</button>
    </div>
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b"></th>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">User ID</th>
          <th class="py-2 px-4 border-b">Text</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos.data" :key="todo.id">
          <td class="py-2 px-4 border-b">
            <input type="radio" :value="todo" v-model="selectedTodo" :name="`todo-select`" />
          </td>
          <td class="py-2 px-4 border-b">{{ todo.id }}</td>
          <td class="py-2 px-4 border-b">{{ todo.userId }}</td>
          <td class="py-2 px-4 border-b">{{ todo.text }}</td>
        </tr>
      </tbody>
    </table>
    <div class="mt-4 flex justify-between items-center">
      <button @click="currentPage--" :disabled="currentPage === 1" class="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="currentPage++" :disabled="currentPage === totalPages" class="bg-gray-300 text-gray-700 py-2 px-4 rounded disabled:opacity-50">Next</button>
    </div>
    <DeleteConfirmationModal :show="showDeleteModal" @confirm="handleDelete" @cancel="showDeleteModal = false" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import DeleteConfirmationModal from '~/components/DeleteConfirmationModal.vue'

const search = ref({
  id: '',
  userId: '',
  text: ''
})

const currentPage = ref(1)
const pageSize = 10

const { data: todos, refresh } = await useFetch('/api/todos', {
  query: {
    ...search.value,
    page: currentPage.value,
    pageSize: pageSize
  },
  watch: [search, currentPage]
})

const selectedTodo = ref(null)
const showDeleteModal = ref(false)

const totalPages = computed(() => {
  if (!todos.value) return 0
  return Math.ceil(todos.value.total / pageSize)
})

const router = useRouter()

const editTodo = () => {
  if (selectedTodo.value) {
    router.push(`/todos/${selectedTodo.value.id}`)
  }
}

const confirmDelete = () => {
  if (selectedTodo.value) {
    showDeleteModal.value = true
  }
}

const handleDelete = async () => {
  if (selectedTodo.value) {
    await $fetch(`/api/todos/${selectedTodo.value.id}`, {
      method: 'DELETE'
    })
    showDeleteModal.value = false
    selectedTodo.value = null
    refresh()
  }
}

</script>