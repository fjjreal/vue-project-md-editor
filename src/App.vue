<template>
  <div id="app">
    <Editor :fmarkdownOption="markdownOption"></Editor>
  </div>
</template>

<script>
import Editor from './views/Editor'
export default {
  name: 'App',
  data: function () {
    return {
      msg: '数据',
      markdownOption: {
        bold: true
      }
    }
  },
  components: {
    Editor
  }
}
</script>

<style scoped>

</style>
