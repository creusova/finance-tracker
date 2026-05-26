<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import BalanceBlock from './components/balanceBlock.vue'
import TransactionForm from './components/transactionForm.vue'
import TransactionTable from './components/transactionTable.vue'

const transactions = ref([])

const income = computed(() => {
  return transactions.value
    .filter((t) => t.type === 'income')
    .reduce((total, t) => total + t.sum, 0)
})

const expense = computed(() => {
  return transactions.value
    .filter((t) => t.type === 'expense')
    .reduce((total, t) => total + t.sum, 0)
})

const balance = computed(() => {
  return income.value - expense.value
})

function addTransaction(transaction) {
  transactions.value.push(transaction)
}

function deleteTransaction(id){
  const index = transactions.value.findIndex((item)=>item.id === id)
  if (index<0){
    console.log('error:cannot find transaction for delete')
    return
  }
  transactions.value.splice(index,1)
}

function saveTransaction(){
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
}

function loadTransaction(){
  try {
    const data = JSON.parse(localStorage.getItem("transactions"))
    if(Array.isArray(data)){
      transactions.value = data
    }
  } catch (error) {
    console.log('error data',error)
    localStorage.removeItem("transactions")
    transactions.value =[]
  }
}

onMounted(()=>{
  loadTransaction()
})

watch(()=>transactions.value,() =>{
  saveTransaction()},
  { deep: true }
)

</script>

<template>
  <div class="app">
    <header>
      <h1 class="header">Finance Traker</h1>
    </header>

    <main>
      <div class="main">
        <BalanceBlock :balance="balance" :income="income" :expense="expense" />
        <TransactionForm @add-transaction="addTransaction" />
        <TransactionTable :transactions="transactions" @delete-transaction="deleteTransaction" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app{
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}
.header{
  text-align: center;
  color: #1a4192;
  text-transform: uppercase;
  font-size: 3em;
}
.main{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
