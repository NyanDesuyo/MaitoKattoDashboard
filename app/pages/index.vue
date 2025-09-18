<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <div class="p-4 bg-white border border-gray-200 rounded-lg mb-4 pt-4">
      <h2 class="text-xl font-semibold mb-2">Monthly Transactions</h2>
      <BarChart :data="monthlyTransactions" :height="200" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Total Todos</h2>
        <p class="text-3xl font-bold">{{ totalTodos }}</p>
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Total Cashflow Records</h2>
        <p class="text-3xl font-bold">{{ totalCashflowRecords }}</p>
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Total Expenses</h2>
        <p class="text-3xl font-bold">{{ formatCurrency(totalExpenses) }}</p>
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg">
        <h2 class="text-xl font-semibold mb-2">Total Income</h2>
        <p class="text-3xl font-bold">{{ formatCurrency(totalIncome) }}</p>
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg md:col-span-2">
        <h2 class="text-xl font-semibold mb-2">Top 5 Spends</h2>
        <ul>
          <li v-for="item in topSpends" :key="item.id" class="flex justify-between">
            <span>{{ formatDateTime(item.transactionTimeStamp) }} - {{ item.name }}</span>
            <span>{{ formatCurrency(item.amount) }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BarChart from '~/components/BarChart.vue'

const { data: todos } = await useFetch('/api/todos', { query: { all: 'true' } })
const { data: cashflows } = await useFetch('/api/cashflows', { query: { all: 'true' } })

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
}

const formatDateTime = (dateString) => {
  const date = new Date(dateString)
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour12: false
  }
  return date.toLocaleString('id-ID', options).replace(/\./g, ':').replace(/, /g, ' ')
}

const totalTodos = computed(() => todos.value?.length || 0)

const totalCashflowRecords = computed(() => cashflows.value?.data?.length || 0)

const totalExpenses = computed(() => {
  if (!cashflows.value?.data) return 0
  return cashflows.value.data
    .filter(item => Number(item.type) === 0)
    .reduce((sum, item) => sum + item.amount, 0)
})

const totalIncome = computed(() => {
  if (!cashflows.value?.data) return 0
  return cashflows.value.data
    .filter(item => Number(item.type) === 1)
    .reduce((sum, item) => sum + item.amount, 0)
})

const topSpends = computed(() => {
  if (!cashflows.value?.data) return []
  return [...cashflows.value.data]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)
})

const monthlyTransactions = computed(() => {
  if (!cashflows.value?.data) return {}
  const months = {}
  for (const item of cashflows.value.data) {
    const month = new Date(item.createdAt).toLocaleString('default', { month: 'long' })
    months[month] = (months[month] || 0) + 1
  }
  return months
})
</script>
