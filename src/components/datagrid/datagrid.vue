<template>
  <div id="">
    <table :id='id' border="0" style="float:left">
      
    </table>
  </div>
</template>
<script>
export default {
  name: "",
  data: () => ({

  }),
  props: {
    // 事件中心
    bus: {
      type: Object,
      required: true
    },
    // 表格唯一标识
    id: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
