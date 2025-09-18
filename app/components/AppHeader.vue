<template>
  <header class="bg-gray-800 text-white p-4">
    <nav class="container mx-auto flex justify-between">
      <ul class="flex space-x-4">
        <li><NuxtLink to="/" class="hover:text-gray-400">Dashboard</NuxtLink></li>
        <li><NuxtLink to="/todos" class="hover:text-gray-400">Todos</NuxtLink></li>
        <li><NuxtLink to="/cashflows" class="hover:text-gray-400">Cashflows</NuxtLink></li>
      </ul>
    </nav>
  </header>
</template>
