<script setup>
import { computed, ref, watch } from 'vue'
import TransactionRow from './transactionRow.vue'
import {CATEGORIES_BY_TYPE, ALL_CATEGORIES } from '../category.js'

const props = defineProps({
  transactions: {
    type: Array,
    default: () => [],
  },
})

const emit=defineEmits(['delete-transaction'])

function deleteTransaction(id){
  emit('delete-transaction',id)
}

const typeFilter = ref('')
const categoryFilter = ref('')

const categoryForSelected = computed(()=>{
  let category = ALL_CATEGORIES

  if(typeFilter.value === 'income'){
    category = CATEGORIES_BY_TYPE.income
  }
  else if(typeFilter.value === 'expense'){
    category = CATEGORIES_BY_TYPE.expense
  }
  
  return category
})


const visibleTransaction = computed(()=>{
  const allTransactions = [...props.transactions]

  let filterTransaction = checkTypeFilter(allTransactions)
  filterTransaction = checkCategoryFilter(filterTransaction)
  if (isDateFilterActive.value === true){
    filterTransaction = checkDateFilter(filterTransaction)
  }

  return filterTransaction
})

function checkTypeFilter(transactions){
  if(typeFilter.value !== ''){
    const filterTransaction = transactions.filter((t)=>t.type === typeFilter.value)
    return filterTransaction
  }
  else return transactions
}

function checkCategoryFilter(transactions){
  if(categoryFilter.value !== ''){
    const filterCategoryTransaction = transactions.filter((t)=>t.category === categoryFilter.value)
    return filterCategoryTransaction
  }
  else return transactions
}

function checkDateFilter(transactions){
  if(dateFrom.value !== '' && dateTo.value !== ''){
    const filterDateTransaction = transactions.filter((t)=>(t.date >= dateFrom.value && t.date <= dateTo.value))
    return filterDateTransaction
  }
  else return transactions
}

const sortedTransaction = computed(()=>{
  const sorted = [...visibleTransaction.value]
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

const sortSumMethod = ref('none')
const sortDateMethod = ref('desc')


function sortTransaction(type){
  if (type==='date'){
    if (sortDateMethod.value === 'none' || sortDateMethod.value === 'desc') {
      sortDateMethod.value = 'asc'
      sortSumMethod.value = 'none'
    } else {
      sortDateMethod.value = 'desc'
      sortSumMethod.value = 'none'
    }
  }
  else if(type==='sum'){
    if (sortSumMethod.value === 'none' || sortSumMethod.value === 'desc') {
      sortSumMethod.value = 'asc'
      sortDateMethod.value = 'none' 
    } else {
      sortSumMethod.value = 'desc'
      sortDateMethod.value = 'none'
    }
  }
}

watch(typeFilter,()=>{
  sortSumMethod.value = 'none'
  sortDateMethod.value = 'desc'
  categoryFilter.value=''
})

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

const dateFrom = ref('')
const dateTo = ref('')
const showDateFilter = ref(false)
const errorMsg = ref('')
const applyError = ref(false)
const isDateFilterActive = ref(false)
const errorDate = computed(()=>{
  if((dateFrom.value > dateTo.value) && dateFrom.value !=='' && dateTo.value !==''){
    return true
  }
  if(applyError.value){
     return true
  }
  else return false
})

function toggleDateFilter() {
  showDateFilter.value = !showDateFilter.value
}

function clearDateFilter() {
  dateFrom.value = ''
  dateTo.value = ''
  isDateFilterActive.value = false
  applyError.value = false
  errorMsg.value = ''
}

function applyDateFilter(){
  if(dateFrom.value === ''){
    errorMsg.value='No From Date'
    applyError.value = true
    isDateFilterActive.value = false
  }
  else if(dateTo.value === ''){
    errorMsg.value='No To Date'
    applyError.value = true
    isDateFilterActive.value = false
  }
  else if(dateFrom.value > dateTo.value){
    applyError.value = true
    errorMsg.value ='Date To earlier then From'
  }
  else {
    isDateFilterActive.value = true
    showDateFilter.value = false
    applyError.value = false
    errorMsg.value = ''
  }

}

watch([dateFrom, dateTo], () => { applyError.value = false })

</script>

<template>
  <div class="table">
    <table class="transaction-table">
    <thead>
      <tr>               
        <th class="table-header">
          <div class="sorting-cell">
            <p>Type</p>
            <select v-model="typeFilter" class="selected">
              <option value="" class="select-option">All</option>
              <option value="income" class="select-option">Income</option>
              <option value="expense" class="select-option">Expense</option>
            </select>
          </div>
        </th>
        <th class="table-header">
          <div class="date-header">
            <p>Date</p>
            <button class="btn-sorting" @click="sortTransaction('date')"> {{ sortIconDate }}</button>
            <button @click="toggleDateFilter" class="filter-btn" :class="{ 'filter-active': isDateFilterActive}">📅</button>
            <div v-if="showDateFilter" class="date-popup">
              <label>From</label>
              <input type="date" v-model="dateFrom">
              <label>To</label>
              <input type="date" v-model="dateTo">
              <div class="popup-actions">
                <button @click="clearDateFilter">Clear</button>
                <button @click="applyDateFilter">Apply</button>
              </div>
              <div v-if="errorDate" class="error-msg">{{errorMsg}}</div>
            </div>
          </div>
        </th>
        <th class="table-header">
          <div class="sorting-cell">
            <p>Sum</p>
            <button class="btn-sorting" @click="sortTransaction('sum')"> {{ sortIconSum }}</button>
          </div>
        </th>
        <th class="table-header">
          <div class="sorting-cell">
            <p>Category</p>
            <select v-model="categoryFilter" class="selected">
              <option value="" class="select-option">All</option>
              <option v-for="category in categoryForSelected" :value="category.value">{{ category.text }}</option>
            </select>
          </div>
        </th>
        <th class="table-header">Comment</th>
        <th class="table-header">Action</th>
      </tr>
    </thead>
    <tbody v-if ="transactions.length === 0">              
      <tr>
        <td colspan="6" class="no-transaction-row">No transaction yet</td>
      </tr>
    </tbody>
    <tbody v-else-if ="sortedTransaction.length === 0">              
      <tr>
        <td colspan="6" class="no-transaction-row">No filtered transactions</td>
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
.selected{
  background: #ffd562d5;
}
.select-option{
  background: #f9efd4d5;
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

.date-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items:center;
  gap:10px;
}
.filter-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.filter-active{
  background: #0d98475c;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.date-popup {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  padding: 12px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 200px;
}

.date-popup label {
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
}

.date-popup input {
  padding: 6px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
}

.popup-actions {
  display: flex;
  gap: 6px;
  margin-top: 8px;
  justify-content: flex-end;
}

.popup-actions button {
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  font-size: 12px;
}

.error-msg{
  z-index: 1000;
  font-size: 14px;
  color:red;
  padding-top: 10px;
}
</style>
