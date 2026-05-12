<script setup>
    import { ref, watch } from 'vue'

    const emit = defineEmits(['add-transaction'])

    const selected = ref('expense')
    const transactionDate = ref((new Date().toISOString().split('T')[0]))
    const sumValue = ref(0)
    const categoryValue = ref('Food')
    const commentNew = ref('')
    watch(selected,(newValue)=>{
        if(newValue==='expense') categoryValue.value = 'Food' 
        else categoryValue.value = 'Work'
  })

  function addTransaction(){
    if(sumValue.value<=0) return
    const newTransaction={
      id: Date.now(),
      type: selected.value,
      date: transactionDate.value,
      sum: +sumValue.value,
      category: categoryValue.value,
      comment: commentNew.value
    }
    emit('add-transaction',newTransaction)
    sumValue.value = 0
  }
</script>

<template>
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
    <button @click="addTransaction">Add transaction</button>
   </div>
</template>