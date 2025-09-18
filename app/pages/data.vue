<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Data</h1>

    <h2 class="text-xl font-semibold mb-2">Todos</h2>
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">User ID</th>
          <th class="py-2 px-4 border-b">Text</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in todos" :key="todo.id">
          <td class="py-2 px-4 border-b">{{ todo.id }}</td>
          <td class="py-2 px-4 border-b">{{ todo.userId }}</td>
          <td class="py-2 px-4 border-b">{{ todo.text }}</td>
        </tr>
      </tbody>
    </table>

    <h2 class="text-xl font-semibold mt-8 mb-2">Cashflows</h2>
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">ID</th>
          <th class="py-2 px-4 border-b">User ID</th>
          <th class="py-2 px-4 border-b">Name</th>
          <th class="py-2 px-4 border-b">Amount</th>
          <th class="py-2 px-4 border-b">Account</th>
          <th class="py-2 px-4 border-b">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cashflow in cashflows" :key="cashflow.id">
          <td class="py-2 px-4 border-b">{{ cashflow.id }}</td>
          <td class="py-2 px-4 border-b">{{ cashflow.userId }}</td>
          <td class="py-2 px-4 border-b">{{ cashflow.name }}</td>
          <td class="py-2 px-4 border-b">{{ cashflow.amount }}</td>
          <td class="py-2 px-4 border-b">{{ cashflow.account }}</td>
          <td class="py-2 px-4 border-b">{{ cashflow.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const { data: todos } = await useFetch('/api/todos')
const { data: cashflows } = await useFetch('/api/cashflows')
</script>
