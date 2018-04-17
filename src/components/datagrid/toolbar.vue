<template>
  <div id="">
    <div class="" v-for='queryObj in queryArr' style="float:left">
      {{queryObj.title}}:
      <Input
        v-if="queryObj.queryArugs.tag === 'input'"
        v-model="queryObj.queryArugs.condition"
        style="width: 200px"
        clearable >
      </Input>
      <Select
        v-if="queryObj.queryArugs.tag === 'select'"
        v-model="queryObj.queryArugs.condition"
        style="width:200px">
          <Option
            v-for="item in queryObj.queryArugs.options"
            :value="item.value"
            :key="item.value">
            {{ item.label }}
          </Option>
      </Select>
      &nbsp&nbsp&nbsp
    </div>
    <Button v-if='queryArr.length!==0' type="ghost"  @click='filter'>过滤</Button>
  </div>
</template>
<script>

export default {
  name: "",
  data: () => ({
    queryArr: []
  }),
  props: {
    toolbarQueryData: Array
  },
  created() {
    this.initQueryArr();
  },
  methods: {
    filter() {
      console.log('过滤操作');
    },
    // 初始化查询相关数据数组
    initQueryArr() {
      for (var i = 0; i < this.toolbarQueryData.length; i++) {
        this.queryArr.push(this.toolbarQueryData[i]);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
