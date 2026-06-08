<script setup>
import { watch } from 'vue'
import { CATEGORIES_BY_TYPE, DEFAULT_CATEGORY } from '../category.js'

const props = defineProps({
  transaction: {
    type: Object,
    required: true,
  },
})

watch(
  () => props.transaction.type,
  (newValue) => {
    if (newValue === 'expense')
      props.transaction.category = DEFAULT_CATEGORY.expense
    else props.transaction.category = DEFAULT_CATEGORY.income
  },
)
</script>

<template>
  <div class="form-fields">
    <select v-model="transaction.type" class="form-input">
      <option value="income">Income</option>
      <option value="expense">Expense</option>
    </select>
    <input type="date" v-model="transaction.date" class="form-input" />
    <input
      type="number"
      v-model="transaction.sum"
      placeholder="0"
      class="form-input"
    />

    <select v-model="transaction.category" class="form-input">
      <option
        v-for="category in CATEGORIES_BY_TYPE[transaction.type]"
        :value="category.value"
      >
        {{ category.text }}
      </option>
    </select>

    <input
      v-model="transaction.comment"
      placeholder="comment"
      class="form-input"
    />
  </div>
</template>

<style scoped>
.form-fields {
  margin: 0;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.form-input {
  padding: 5px 12px;
  border: 1px solid black;
  border-radius: 5px;
  background: white;
  font-size: 14px;
}
.form-input:hover {
  border-color: #96969a;
}
.form-input:focus {
  border-color: #9fa2af;
  box-shadow: 0 0 0 2px #68aa9456;
  outline: none;
}
</style>
