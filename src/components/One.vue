<template>
  <div>
    <p>{{ tip }}</p>
    <p>vuex data: {{this.$store.state.uid}}</p>
  </div>
</template>

<script>
export default {
  name: 'one',
  data: function () {
    return {
      tip: '第一个子组件'
    }
  }
}
</script>

/* scoped=> css 仅在当前组件有效 */
<style scoped>
p{
  background-color: aqua;
}
</style>
