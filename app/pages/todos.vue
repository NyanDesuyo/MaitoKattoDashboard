<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Todos</h1>
    <div class="flex items-center mb-4">
      <input v-model="searchTerm" placeholder="Search..." class="border p-2 rounded-l-md w-full" />
      <select v-model="searchField" class="border p-2 border-l-0">
        <option value="text">Text</option>
        <option value="id">ID</option>
        <option value="userId">User ID</option>
      </select>
    </div>
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">User ID</th>
          <th class="py-2 px-4 border-b">Text</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos.data" :key="todo.id">
          <td class="py-2 px-4 border-b">{{ todo.id }}</td>
          <td class="py-2 px-4 border-b">{{ todo.userId }}</td>
          <td class="py-2 px-4 border-b">{{ todo.text }}</td>
          <td class="py-2 px-4 border-b">
            <button @click="openEditModal(todo)" class="bg-blue-500 text-white py-1 px-2 rounded mr-2">Edit</button>
            <button @click="confirmDelete(todo)" class="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
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
    <EditTodoModal :show="showEditModal" :todo="editingTodo" @save="handleUpdate" @cancel="showEditModal = false" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import DeleteConfirmationModal from '~/components/DeleteConfirmationModal.vue'
import EditTodoModal from '~/components/EditTodoModal.vue'

const searchTerm = ref('')
const searchField = ref('text')

const currentPage = ref(1)
const pageSize = 10

const searchParams = computed(() => {
  const params = {}
  if (searchTerm.value && searchTerm.value.trim() !== '') {
    params[searchField.value] = searchTerm.value.trim()
  }
  return params
})

const { data: todos, refresh } = await useFetch('/api/todos', {
  query: {
    ...searchParams.value,
    page: currentPage.value,
    pageSize: pageSize
  },
  watch: [searchParams, currentPage]
})

const showDeleteModal = ref(false)
const showEditModal = ref(false)
const selectedTodo = ref(null)
const editingTodo = ref(null)

const totalPages = computed(() => {
  if (!todos.value) return 0
  return Math.ceil(todos.value.total / pageSize)
})

const openEditModal = (todo) => {
  editingTodo.value = { ...todo }
  showEditModal.value = true
}

const handleUpdate = async (updatedTodo) => {
  await $fetch(`/api/todos/${updatedTodo.id}`, {
    method: 'PUT',
    body: updatedTodo
  })
  showEditModal.value = false
  refresh()
}

const confirmDelete = (todo) => {
  selectedTodo.value = todo
  showDeleteModal.value = true
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