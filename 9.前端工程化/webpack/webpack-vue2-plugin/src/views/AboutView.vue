<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="js">
var str = 'str';

const typeA = typeof str; // 触发钩子

const add = (a, b) => {
  // debugger;
  console.log('add function');
  return a + b;
};

add(1, 2);

console.log(1);
console.log(2);
console.log(3);

var ccc = '[REPLACE_ID]';

export default {};
</script>
