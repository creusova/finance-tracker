<script setup>
import { computed} from 'vue';

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})

const emit=defineEmits(['delete-transaction','edit-transaction'])

const sumClasses = computed(() => ({
  'income': props.transaction.type === 'income',
  'expense':  props.transaction.type === 'expense',

}))
 function deleteTransaction(){
  emit('delete-transaction',props.transaction.id)
 }
 
 function editTransaction(){
  emit('edit-transaction',props.transaction.id)
 }

</script>

<template>      
    <tr >
      <td>{{ transaction.type }}</td>
      <td>{{ transaction.date }}</td>
      <td :class="sumClasses">{{ transaction.sum }}</td>
      <td>{{ transaction.category }}</td>
      <td>{{ transaction.comment }}</td>
      <td>
        <div class="action-cell">
          <button class="action-btn" @click="editTransaction"> ✏️ </button>
          <button class="action-btn" @click="deleteTransaction"> 🗑️ </button>
        </div>
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
  justify-content: center;
  align-content: center;
}
.action-btn{
  cursor: pointer;
  border: 0.5px solid rgb(132, 131, 131);
  border-radius: 5px;
  padding: 3px 12px;
}
.action-btn:hover{
  background: rgb(220, 221, 221);
}
.action-btn:active{
  transform: scale(0.98);
}
</style>