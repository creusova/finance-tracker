<script setup>
defineProps({
  transaction: {
    type: Object,
    default: () => {},
  },
})
</script>

<template>      
    <tr>
      <td>{{ transaction.type }}</td>
      <td>{{ transaction.date }}</td>
      <td>{{ transaction.sum }}</td>
      <td>{{ transaction.category }}</td>
      <td>{{ transaction.comment }}</td>
    </tr>
</template>
