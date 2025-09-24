<template>
  <div v-if="show" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-xl w-1/3">
      <h2 class="text-xl font-bold mb-4">Edit Todo</h2>
      <form @submit.prevent="save">
        <div class="mb-4">
          <label for="text" class="block text-gray-700 text-sm font-bold mb-2">Text:</label>
          <input type="text" id="text" v-model="formData.text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
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
  todo: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['save', 'cancel'])

const formData = ref({ ...props.todo })

watch(() => props.todo, (newVal) => {
  formData.value = { ...newVal }
}, { immediate: true, deep: true })

const save = () => {
  emit('save', formData.value)
}

const cancel = () => {
  emit('cancel')
}
</script>
