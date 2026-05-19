<script setup>
    import { reactive, computed, watch } from 'vue'

    const emit = defineEmits(['add-transaction'])

    const transaction = reactive({
      type: 'expense',
      date: (new Date().toISOString().split('T')[0]),
      sum: '',
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
    transaction.sum = ''
    transaction.comment =''
  }

</script>

<template>
  <div class="transaction-form-view">
    <form @submit.prevent="addTransaction" class="transaction-form">
      <select v-model="transaction.type" class="form-input">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input type="date" v-model="transaction.date" class="form-input">
      <input type ="number" v-model="transaction.sum"  placeholder="0" class="form-input">
      
      <select v-model="transaction.category" class="form-input">
        <option v-for="category in categorySelect[transaction.type]" :value="category.value">{{ category.text }}</option>
      </select>
      
      <input v-model="transaction.comment" placeholder="comment" class="form-input">
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