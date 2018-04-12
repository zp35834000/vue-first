<template>
  <div class="">
    <!--行标题-->
    <thead>
      <tr>
        <th  v-for='info in realColumnInfo' :key='info.field'>
          {{info.title}}&nbsp&nbsp&nbsp
          <div v-if='info.sortable===true' style="float:right">
            <div class="arrow-up"
              :class="{arrowUpSelect:sortRuleString===info.field+'asc'}"
              @click='upArrowSelect(info)'></div>
            <div style="height:2px"></div>
            <div class="arrow-down"
              :class="{arrowDownSelect:sortRuleString===info.field+'desc'}"
              @click='downArrowSelect(info)'
            ></div>
          </div>
        </th>
      </tr>
    </thead>
    <!--数据展示区-->
    <tbody :id="id+'tbList'">
      <tr v-for='data in showData'>
        <td v-for='info in realColumnInfo' :id='info.field'>{{data[info.field]}}</td>
      </tr>
    </tbody>
  </div>
</template>
<script>
export default {
  data: () => ({
    sortRuleString: ''
  }),
  props: {
    // 列信息
    columnInfo: {
      type: Array,
      required: true
    },
    // 表格唯一标识
    id: {
      type: String,
      required: true
    },
    // 需要展示的数据，在父组件已经进行了过滤
    showData: {
      type: Array,
      required: true
    },
    // 默认排序规则，0为field，1为asc或desc
    sortRule: {
      type: Array
    }
  },
  computed: {
    realColumnInfo() {
      return this.columnInfo;
    }
  },
  methods: {
    // 点击向上箭头，向上箭头变色，并将该列数据从小到大排列
    upArrowSelect(info) {
      this.sortRuleString = info.field+'asc';
      this.dataSortRuleUp(info.field,'asc');
    },
    // 点击向下箭头，向下箭头变色，并将该列数据从大到小排列
    downArrowSelect(info) {
      this.sortRuleString = info.field+'desc';
      this.dataSortRuleUp(info.field,'desc');
    },
    // 将排序规则传递到父组件，将数据进行重新排序
    dataSortRuleUp(field,sortOrder) {
      let sortRule = {
        field: field,
        sort: sortOrder
      };
      this.$emit('dataSortRuleUp',sortRule);
    },
    // 初始化排序规则字符
    initSortRuleString() {
      if(this.sortRule !== undefined && this.sortRule.length !== 0){
        this.sortRuleString = this.sortRule[0]+this.sortRule[1];
      }
    }
  },
  mounted() {
    this.initSortRuleString();
  }
}
</script>
<style lang="css" scoped>

.arrowUpSelect {
  border-bottom:7px solid #2d8cf0 !important;
}

/*向上的三角*/
.arrow-up {
  width:0;
  height:0;
  border-left:7px solid transparent;
  border-right:7px solid transparent;
  border-bottom:7px solid #bbbec4;
  cursor: pointer;
}
.arrow-up:hover {
  border-bottom:7px solid black;
}
/*箭头向下*/
.arrow-down {
  width:0;
  height:0;
  border-left:7px solid transparent;
  border-right:7px solid transparent;
  border-top:7px solid #bbbec4;
  cursor: pointer;
}
.arrow-down:hover {
  border-top:7px solid black;
}

.arrowDownSelect {
  border-top:7px solid #2d8cf0 !important;
}

/*箭头向左*/
.arrow-left {
  width:0;
  height:0;
  border-top:7px solid transparent;
  border-bottom:7px solid transparent;
  border-right:7px solid #bbbec4;
  float: right;
  cursor: pointer;
}

/*箭头向右*/
.arrow-right {
  width:0;
  height:0;
  border-top:7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 7px solid #bbbec4;
  float: right;
  cursor: pointer;
}

th {
    background-color:white;
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #a9c6c9;
}
tr {
    background-color:white;
}
td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #a9c6c9;
}
</style>
