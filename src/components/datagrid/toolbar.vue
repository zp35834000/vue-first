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
    // 组装过滤条件
    assembleCondition() {
      let conditionArr = [];
      for (let i = 0; i < this.queryArr.length; i++) {
        let condition = {};
        let queryObj = this.queryArr[i];
        condition.key = queryObj.field;
        condition.value = queryObj.queryArugs.condition;
        condition.compareRule = queryObj.queryArugs.compareRule;
        conditionArr.push(condition);
      }
      return conditionArr;
    },
    filter() {
      let conditionArr = this.assembleCondition();
      this.$emit('filterOperateUp',conditionArr);
    },
    // 初始化查询相关数据数组
    initQueryArr() {
      for (let i = 0; i < this.toolbarQueryData.length; i++) {
        this.queryArr.push(this.toolbarQueryData[i]);
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
