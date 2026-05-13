<script setup>
    import { reactive, ref, watch } from 'vue'

    const emit = defineEmits(['add-transaction'])

    const transaction = reactive({
      type: 'expense',
      date: (new Date().toISOString().split('T')[0]),
      sum: 0,
      category: 'Food',
      comment: ''
    })

    const categorySelect = {
      expense:[
        {text: 'Food', value: 'Food'},
        {text: 'Car', value: 'Car'},
        {text: 'Home', value: 'Home'},
      ],
      income:[
        {text: 'Work', value: 'Work'},
        {text: 'Card', value: 'Card'},
      ]
    }

    watch(()=>transaction.type,(newValue)=>{
      if(newValue==='expense') transaction.category = 'Food'
      else transaction.category = 'Work'
  })

  function addTransaction(){
    if(transaction.sum<=0) return
    const newTransaction={
      id: Date.now(),
      type: transaction.type,
      date: transaction.date,
      sum: +transaction.sum,
      category: transaction.category,
      comment: transaction.comment
    }
    
    emit('add-transaction',newTransaction)
    transaction.sum = 0
    transaction.comment =''
  }

</script>

<template>
  <div>
    <form @submit.prevent="addTransaction">
      <select v-model="transaction.type">
        <option value="income">income</option>
        <option value="expense">expense</option>
      </select>

      <input type="date" v-model="transaction.date">
      <input type ="number" v-model="transaction.sum">
      
      <select v-model="transaction.category">
        <option v-for="category in categorySelect[transaction.type]" :value="category.value">{{ category.text }}</option>
      </select>
      
      <input v-model="transaction.comment" placeholder="comment">
      <button type="submit">Add transaction</button> 
    </form>
  </div>
</template>