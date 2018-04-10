<template>
  <!--行标题-->
  <thead>
    <tr>
      <th v-for='info in columnInfo'>{{info.title}}</th>
    </tr>
  </thead>
  <!--数据展示区-->
  <tbody>
    <tr>
      <td v-for='info in columnInfo' :id='info.field'></td>
    </tr>
  </tbody>
</template>
<script>
export default {
  data: () => ({

  }),
  props: {
    columnInfo: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
