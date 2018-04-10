<template>
  <div>
    <table :id='id' border="0" style="float:left">
      <column :column-info='columnData'></column>
    </table>
  </div>
</template>
<script>
import column from './column'
export default {
  data: () => ({

  }),
  components: {
    column
  },
  props: {
    // 表格唯一标识
    id: {
      type: String,
      required: true
    },
    columnData: {
      type: Array,
      required: true
    }
  },
  computed: {

  }
}
</script>
<style lang="scss" scoped>
</style>
