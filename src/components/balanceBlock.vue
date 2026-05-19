<script setup>
  defineProps({balance: Number,
  income: Number,
  expense: Number})
</script>

<template>
  <div class="result">
    <div class="card balance">
      <span class="icon">💰</span>
      <p class="text">Balance</p>
      <p class="num">{{balance}}</p>
    </div>
    <div class="card income">
      <span class="icon ">📈</span>
      <p class="text">Income</p>
      <p class="num">{{income}}</p>
    </div>
    <div class="card expense">
      <span class="icon">📉</span>
      <p class="text">Expenses</p>
      <p class="num">{{expense}}</p>
    </div>
   </div>
</template>

<style scoped>
.result{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  justify-content: center;
  margin: 0 20px;
}
.card{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: white;
  padding: 16px 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
.icon{
  font-size: 18px;
  margin-bottom: 8px;
}
.text{
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 600;
  color: #d99036;
  margin:0;
}
.num{
  color: rgb(31, 31, 28);
  font-size: 18px;
  font-weight: 550;
  margin-bottom: 0;
}
.balance{
  border-top: 5px solid #63adb9;
}
.income{
  border-top: 5px solid #597d4f;
}
.expense{
  border-top: 5px solid #c22d2e;
}
</style>