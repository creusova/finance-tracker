<script setup>
import TransactionFieldsComponent from './TransactionFieldsComponent.vue'
import { computed } from 'vue'

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})

const emit=defineEmits(['submit-edit','close-edit'])

 function submitEdit(){
  emit('submit-edit')
 }
 
 function closeModal(){
  emit('close-edit')
 }

const originalTransaction = {...props.transaction}

const hasChangesTransaction = computed(()=>{
  return (
    (originalTransaction.sum !== (+props.transaction.sum) ||
    originalTransaction.type !== props.transaction.type ||
    originalTransaction.category !== props.transaction.category ||
    originalTransaction.date !== props.transaction.date ||
    originalTransaction.comment !== props.transaction.comment)
    && +props.transaction.sum>0
  )
})

const disabledSave = computed(() => !hasChangesTransaction.value)

</script>

<template>
  <div>
    <TransactionFieldsComponent :transaction="props.transaction" />
  </div>
  <div class="edit-actions">
    <button
      @click="submitEdit"
      class="edit-actions-btn"
      :disabled="disabledSave"
    >
      Save
    </button>
    <button @click="closeModal" class="edit-actions-btn">Close</button>
  </div>
</template>

<style scoped>

.edit-actions{
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.edit-actions-btn{
  background: #4a947b;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  white-space: nowrap; 
  font-size: 18px;
}

.edit-actions-btn:hover{
 background: #64bc9e;
}
.edit-actions-btn:active{
  transform: scale(0.98);
}
.edit-actions-btn:disabled{
  background: #9b9a9a5d;
  cursor: not-allowed;
  color: rgb(87, 86, 86);
}
</style>