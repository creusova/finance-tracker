<script setup>
  defineProps({balance: Number,
  income: Number,
  expense: Number})
</script>

<template>
  <div class="result">
      <p>Balance</p>
      <p>{{balance}}</p>
      <p>Income</p>
      <p>{{income}}</p>
      <p>Expenses</p>
      <p>{{expense}}</p>
   </div>
</template>