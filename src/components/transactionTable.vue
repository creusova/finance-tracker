<script setup>
import { computed, ref } from 'vue'
import TransactionRow from './transactionRow.vue'

const props = defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
})

console.log(props.transactions)
const emit=defineEmits(['delete-transaction'])

function deleteTransaction(id){
  emit('delete-transaction',id)
}

const sortedTransaction = computed(()=>{
  const sorted = [...props.transactions]
  if(sortSumMethod.value ==='asc'){
    sorted.sort((a, b) => a.sum - b.sum)
  }
  else if(sortSumMethod.value ==='desc'){
    sorted.sort((a, b) => b.sum - a.sum)
  }
  else if(sortDateMethod.value ==='asc'){
    sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
  }
  else if(sortDateMethod.value ==='desc'){
    sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
  }
  return sorted
})

let sortSumMethod = ref('none')
let sortDateMethod = ref('none')

function sortTransaction(type){
  if (type==='date'){
    if (sortDateMethod.value === 'none' || sortDateMethod.value === 'desc') {
      sortDateMethod.value = 'asc'
      sortSumMethod.value = 'none'
      sortIconDate.value = '↓'
    } else {
      sortDateMethod.value = 'desc'
      sortSumMethod.value = 'none'
      sortIconDate.value = '↑'
    }
  }
  else if(type==='sum'){
    if (sortSumMethod.value === 'none' || sortSumMethod.value === 'desc') {
      sortSumMethod.value = 'asc'
      sortDateMethod.value = 'none' 
      sortIconSum.value = '↓' 
    } else {
      sortSumMethod.value = 'desc'
      sortDateMethod.value = 'none'
      sortIconSum.value = '↑'
    }
  }
}

const sortIconSum = computed(()=>{
  if(sortSumMethod.value === 'none' || sortSumMethod.value === 'desc')
    return '↓'
  else return '↑'
})
const sortIconDate = computed(()=>{
  if(sortDateMethod.value === 'none' || sortDateMethod.value === 'desc')
    return '↓'
  else return '↑'
})
</script>

<template>
  <div class="table">
    <table class="transaction-table">
    <thead>
      <tr>               
        <th class="table-header">Type</th>
        <th class="table-header">
          <div class="sorting-cell">
            <p>Date</p>
            <button class="btn-sorting" @click="sortTransaction('date')"> {{ sortIconDate }}</button>
          </div>
        </th>
        <th class="table-header">
          <div class="sorting-cell">
            <p>Sum</p>
            <button class="btn-sorting" @click="sortTransaction('sum')"> {{ sortIconSum }}</button>
          </div>
        </th>
        <th class="table-header">Category</th>
        <th class="table-header">Comment</th>
        <th class="table-header">Action</th>
      </tr>
    </thead>
    <tbody v-if ="transactions.length === 0">              
      <tr>
        <td colspan="6" class="no-transaction-row">No transaction yet</td>
      </tr>
    </tbody>
    <tbody v-else>
      <TransactionRow v-for="transaction in sortedTransaction" 
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
.no-transaction-row{
  padding: 12px 10px;
  text-align: center;
}
.sorting-cell{
  display: flex;
  justify-content: center;
  align-items:center;
  gap:10px;
}
.btn-sorting{
  cursor: pointer;
  border: 0.5px solid rgb(132, 131, 131);
  border-radius: 5px;
  padding: 0px 5px;
  background: #fbcf58d5;
}
.btn-sorting:hover{
  background: #fbe19cd5;
}
.btn-sorting:active{
  transform: scale(0.98);
}
</style>
