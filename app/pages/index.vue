<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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
    </div>
    <div class="p-4 bg-white border border-gray-200 rounded-lg mb-4 pt-4">
      <h2 class="text-xl font-semibold mb-2">Daily Transactions</h2>
      <BarChart :data="dailyTransactions" :height="200" />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="p-4 bg-white border border-gray-200 rounded-lg lg:col-span-1">
        <h2 class="text-xl font-semibold mb-2">Recent Todos</h2>
        <ul>
          <li v-if="item.text" v-for="item in recentTodos" :key="item.id" class="flex justify-between">
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg lg:col-span-1">
        <h2 class="text-xl font-semibold mb-2">Top 5 Spends</h2>
        <ul>
          <li v-for="item in topSpends" :key="item.id" class="flex justify-between">
            <span>{{ formatDateTime(item.transactionTimeStamp) }} - {{ item.name }}</span>
            <span>{{ formatCurrency(item.amount) }}</span>
          </li>
        </ul>
      </div>
      <div class="p-4 bg-white border border-gray-200 rounded-lg lg:col-span-1">
        <h2 class="text-xl font-semibold mb-2">Top 5 Incomes</h2>
        <ul>
          <li v-for="item in topIncomes" :key="item.id" class="flex justify-between">
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
import { formatCurrency, formatDateTime } from '~/utils/formatters'

const { data: todos } = await useFetch('/api/todos', { query: { all: 'true' } })
const { data: recentTodosData } = await useFetch('/api/todos', { query: { pageSize: 5 } })
const { data: cashflows } = await useFetch('/api/cashflows', { query: { all: 'true' } })

const totalTodos = computed(() => todos.value?.total || 0)

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

const recentTodos = computed(() => recentTodosData.value?.data || [])

const topSpends = computed(() => {
  if (!cashflows.value?.data) return []
  return [...cashflows.value.data]
    .filter(item => Number(item.type) === 0)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)
})

const topIncomes = computed(() => {
  if (!cashflows.value?.data) return []
  return [...cashflows.value.data]
    .filter(item => Number(item.type) === 1)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)
})

const dailyTransactions = computed(() => {
  if (!cashflows.value?.data) return {}
  const days = {}
  for (const item of cashflows.value.data) {
    const day = new Date(item.transactionTimeStamp).toLocaleDateString('id-ID', { weekday: 'long' })
    days[day] = (days[day] || 0) + 1
  }
  return days
})
</script>
