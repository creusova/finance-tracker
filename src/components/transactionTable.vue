<script setup>
defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div>
    <p v-for="transaction in transactions" :key="transaction.id">
      {{ transaction.type }} {{ transaction.date }} {{ transaction.sum }}
      {{ transaction.category }} {{ transaction.comment }}
    </p>
  </div>
</template>
