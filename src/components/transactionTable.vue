<script setup>
import TransactionRow from './transactionRow.vue'

defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
})

const emit=defineEmits(['delete-transaction'])

function deleteTransaction(id){
  emit('delete-transaction',id)
}
</script>

<template>
  <div class="table">
    <table class="transaction-table">
    <thead>
      <tr>               
        <th class="table-header">Type</th>
        <th class="table-header">Date</th>
        <th class="table-header">Sum</th>
        <th class="table-header">Category</th>
        <th class="table-header">Comment</th>
        <th class="table-header">Action</th>
      </tr>
    </thead>
    <tbody class="table-body">              
        <TransactionRow v-for="transaction in transactions" 
          :key="transaction.id" 
          :transaction="transaction" 
          @delete-transaction="deleteTransaction"/>
    </tbody>
    </table>

  </div>
</template>

<style scoped>
.table{
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.189);
  border-radius: 12px;
  margin: 10px;
}
.transaction-table{
  margin: 10px;
  table-layout: fixed;
  width: 98%;
  border: 1px solid;
  border-collapse: collapse;
  border-radius: 12px;
}
.table-header{
  padding: 12px 10px;
  background: #ffd562d5;
  text-align: center;
  border: 1px solid;
}
</style>
