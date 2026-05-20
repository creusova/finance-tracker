<script setup>
import { computed } from 'vue';

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})



const sumClasses = computed(() => ({
  'income': props.transaction.type === 'income',
  'expense':  props.transaction.type === 'expense',

}))
 function deleteTransaction(){
  console.log('delete')
  console.log(props.transaction.id)
 }

</script>

<template>      
    <tr >
      <td>{{ transaction.type }}</td>
      <td>{{ transaction.date }}</td>
      <td :class="sumClasses">{{ transaction.sum }}</td>
      <td>{{ transaction.category }}</td>
      <td>{{ transaction.comment }}</td>
      <td class="action-cell">
        <button class="action-btn">✏️</button>
        <button class="action-btn" @click="deleteTransaction">🗑️</button>
      </td>
    </tr>
</template>


<style scoped>
td{
  padding: 12px 10px;
  text-align: center;
  border: 1px solid black;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
}
tr:hover{
  background: #d9dce635
}
.income{
  color:#067959;
}
.expense{
  color:#c03434;
}
.action-cell{
  display:flex;
  gap:10px;
  
}
</style>