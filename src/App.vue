<script setup>
import { ref, computed } from 'vue'
import BalanceBlock from './components/balanceBlock.vue'
import TransactionForm from './components/transactionForm.vue'
import TransactionTable from './components/transactionTable.vue'

const transactions = ref([
  {
    id: 1,
    type: 'expense',
    date: '2026-04-10',
    sum: 12,
    category: 'Food',
    comment: '',
  },
  {
    id: 2,
    type: 'income',
    date: '2026-04-10',
    sum: 12000,
    category: 'Work',
    comment: 'new',
  },
])

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
        <TransactionTable :transactions="transactions" />
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
  color: #22388a;
  text-transform: uppercase;
  font-size: 3em;
}
.main{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
