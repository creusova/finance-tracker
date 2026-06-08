<script setup>
    import { reactive, computed } from 'vue'
    import {DEFAULT_CATEGORY } from '../category.js'
    import TransactionFieldsComponent from './TransactionFieldsComponent.vue'

    const emit = defineEmits(['add-transaction'])

    const transaction = reactive({
      type: 'expense',
      date: (new Date().toISOString().split('T')[0]),
      sum: 0,
      category: DEFAULT_CATEGORY.expense,
      comment: ''
    })

  const disabledBtn = computed(()=> transaction.sum <= 0)


  function addTransaction(){
    if(transaction.sum<=0){
      
      return
    }
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
    transaction.date =(new Date().toISOString().split('T')[0])
  }

</script>

<template>
  <div class="transaction-form-view">
    <form @submit.prevent="addTransaction" class="transaction-form">
      <TransactionFieldsComponent :transaction="transaction"/>
      <button type="submit" class="form-input" :disabled="disabledBtn">Add transaction</button> 
    </form>
  </div>

</template>

<style scoped>
.transaction-form-view{
  display: flex;
  justify-content: center;
  margin-right: 0;
  margin-left: 0;
}
.transaction-form{
  margin: 0;
  width: 100%;
  display: flex;
  gap:12px;
  justify-content: center;
  flex-wrap: wrap; 
}
.form-input{
  padding: 5px 12px;
  border: 1px solid black;
  border-radius: 5px;
  background: white;
  font-size: 14px;
}
.form-input:hover{
  border-color: #96969a;
}
.form-input:focus{
  border-color: #9fa2af;        
  box-shadow: 0 0 0 2px #68aa9456;  
  outline: none;
}
button.form-input{
  background: #4a947b;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;          
}
button.form-input:hover{
  background: #64bc9e;
}
button.form-input:active{
  transform: scale(0.98);
}
button.form-input:disabled{
  background: #9b9a9a5d;
  cursor: not-allowed;
  color: rgb(87, 86, 86);
}
</style>