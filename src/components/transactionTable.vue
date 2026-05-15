<script setup>
import TransactionRow from './transactionRow.vue'

defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <div>
   
    <table border="1">
    <thead>
      <tr>               
        <th>Type</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Comment</th>
      </tr>
    </thead>
    <tbody>              
      <!-- <tr v-for="transaction in transactions" :key="transaction.id"> -->
      <!-- <td>{{ transaction.type }}</td>
      <td>{{ transaction.date }}</td>
      <td>{{ transaction.sum }}</td>
      <td>{{ transaction.category }}</td>
      <td>{{ transaction.comment }}</td> -->
        <TransactionRow v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
      <!-- </tr> -->
    </tbody>
    </table>

  </div>
</template>
