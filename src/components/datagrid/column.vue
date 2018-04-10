<template>
  <div class="">
    <!--行标题-->
    <thead>
      <tr>
        <th v-for='info in columnInfo'>{{info.title}}</th>
      </tr>
    </thead>
    <!--数据展示区-->
    <tbody :id="id+'tbList'">
      <tr v-for='data in showData'>
        <td v-for='info in columnInfo' :id='info.field'>{{data[info.field]}}</td>
      </tr>
    </tbody>
  </div>
</template>
<script>
export default {
  data: () => ({

  }),
  props: {
    columnInfo: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    showData: {
      type: Array,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
