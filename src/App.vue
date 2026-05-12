<script setup>
import { ref, computed, watch } from 'vue'
import BalanceBlock from './components/balanceBlock.vue'
import TransactionForm from './components/transactionForm.vue'

  const transactions = ref([
    {
      id: 1,
      type: 'expense',
      date: '2026-04-10',
      sum: 12,
      category: 'Food',
      comment: ''
    },
    {
    id: 2,
    type: 'income',
    date: '2026-04-10',
    sum: 12000,
    category: 'Work',
    comment: 'new'
    }
  ])


  const income = computed(() =>{
    return transactions.value
    .filter(t => t.type ==='income')
    .reduce((total,t)=>total + t.sum,0)
  })

  const expense = computed(() =>{
    return transactions.value
    .filter(t => t.type ==='expense')
    .reduce((total,t)=>total + t.sum,0)
  })

  const balance = computed(() =>{
    return income.value- expense.value
  })

  function addTransaction(transaction){
    transactions.value.push(transaction)
  }
  // const selected = ref('expense')

  function selectedConsole(){
    console.log(selected.value)
    console.log(transactionDate.value)
  }

  // const transactionDate = ref((new Date().toISOString().split('T')[0]))
  // const sumValue = ref(0)
  // const categoryValue = ref('Food')
  // const commentNew = ref('')
  // watch(selected,(newValue)=>{
  //    if(newValue==='expense') categoryValue.value = 'Food' 
  //    else categoryValue.value = 'Work'
  // })
</script>



<template>
  <header>
   <h1>Finance Traker</h1>
  </header>

  <main>
    <BalanceBlock 
      :balance = "balance"
      :income = "income"
      :expense = "expense"/>

    <TransactionForm 
      @add-transaction="addTransaction"/>
<!-- 
   <div>
    <select v-model="selected">
      <option value="income">income</option>
      <option value="expense">expense</option>
    </select>
    <input type="date" v-model="transactionDate">
    <input type ="number" v-model="sumValue">
    <select v-if="selected==='expense'" v-model="categoryValue">
        <option value="Food">Food</option>
        <option value="Car">Car</option>
        <option value="Home">Home</option>
    </select>
    <select v-else-if="selected==='income'" v-model="categoryValue">
        <option value="Work">Work</option>
        <option value="Card">Card</option>
    </select>
    <input v-model="commentNew">
    <button @click="selectedConsole">Console</button>
    <button @click="addTransaction">Add transaction</button>
   </div> -->
   
   <div>
      <p v-for="transaction in transactions" :key="transaction.id">
        {{ transaction.type }} {{ transaction.date }} {{ transaction.sum }} {{ transaction.category }} {{ transaction.comment }}
      </p>
   </div>
  
  </main>
</template>

<style scoped>

</style>
