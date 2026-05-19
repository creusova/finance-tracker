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
  <div class="table">
    <table>
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
        <TransactionRow v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" />
    </tbody>
    </table>

  </div>
</template>

<style scoped>
.table{
  display: flex;
  margin-top: 10px;
  width: 100%;
}
</style>
