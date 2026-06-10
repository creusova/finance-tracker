<script setup>
const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['confirm-delete', 'cancel-delete'])

function confirmDelete() {
  emit('confirm-delete')
}

function cancelDelete() {
  emit('cancel-delete')
}
</script>

<template>
  <p class="comfirm-delete-text">Do you want to delete transaction?</p>
  <div class="transaction-preview">
    <div>Type: {{ transaction.type }}</div>
    <div>Date: {{ transaction.date }}</div>
    <div>Sum: {{ transaction.sum }}</div>
    <div>Category: {{ transaction.category }}</div>
    <div>Comment: {{ transaction.comment }}</div>
  </div>
  <div class="delete-actions">
    <button @click="confirmDelete" class="delete-actions-btn">Confirm</button>
    <button @click="cancelDelete" class="delete-actions-btn">Cancel</button>
  </div>
</template>

<style scoped>
.edit-transaction {
  display: grid;
}
.delete-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}
.transaction-preview{
  padding: 12px;
  border-radius: 8px;
  background: #f7f7f7;
  margin: 10px 0;
}
.delete-actions-btn {
  background: #4a947b;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  white-space: nowrap;
  font-size: 18px;
}

.delete-actions-btn:hover {
  background: #64bc9e;
}
.delete-actions-btn:active {
  transform: scale(0.98);
}
</style>
