<template>
  <div class="">
    <table
      class='hovertable'
      :id="id+'Table'"
      border="1"
      :style="{float:'left',tableLayout:'fixed',width:tableWidth}" >

      <!--行标题-->
      <thead>
        <tr :id="id+'TableTh'">
          <th
            v-for='info in realColumnInfo'
            :key='info.field'
            :style="{width:info.width}"
            :id="id+'Table'+info.field+'Th'">
            <div class="" style="float:left">
              <span>
                {{info.title}}&nbsp&nbsp&nbsp
              </span>
            </div>

            <div v-if='info.sortable===true' style="float:left">

              <div class="arrow-up"
                :class="{arrowUpSelect:sortRuleString===info.field+',asc'}"
                @click='upArrowSelect(info)'>
              </div>
              <div style="height:2px"></div>
              <div class="arrow-down"
                :class="{arrowDownSelect:sortRuleString===info.field+',desc'}"
                @click='downArrowSelect(info)'>
              </div>
            </div>
          </th>
          <th v-if="gapCompNeeded" :style="{width:gapWidth+'px'}"></th>
        </tr>
      </thead>
      <!--数据展示区-->
      <tbody :id="id+'tbList'">
        <tr v-for='data in showData'>
          <td
            v-for='info in realColumnInfo'
            :id='info.field'
            :style="{width:info.width}">
            {{data[info.field]}}
          </td>
          <td v-if="gapCompNeeded" rowspan="13" >
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>
<script>
export default {
  data: () => ({
    sortRuleString: '',
    sortNeeded: true,
    tableWidth: 0,
    gapWidth: 0
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
    },
    gapCompNeeded: {
      type: Boolean,
      default: false
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
      this.dataSortRuleUp(info.field,'asc');
    },
    // 点击向下箭头，向下箭头变色，并将该列数据从大到小排列
    downArrowSelect(info) {
      this.dataSortRuleUp(info.field,'desc');
    },
    // 将排序规则传递到父组件，将数据进行重新排序
    dataSortRuleUp(field,sortOrder) {
      // 对比比较规则，如果比较规则有变化，则触发事件，进行排序
      let sortArr = this.sortRuleString.split(',');
      if(sortArr[0]===field && sortArr[1]===sortOrder){
        this.sortNeeded = false;
      }
      if(sortArr[0]!==field || sortArr[1]!==sortOrder){
        this.sortNeeded = true;
      }
      if(this.sortNeeded){
        this.sortRuleString = field+','+sortOrder;
        let sortRule = {
          field: field,
          sort: sortOrder
        };
        this.$emit('dataSortRuleUp',sortRule);
      }
    },
    // 初始化排序规则字符
    initSortRuleString() {
      if(this.sortRule !== undefined && this.sortRule.length !== 0){
        this.sortRuleString = this.sortRule[0]+','+this.sortRule[1];
      }
    },
    // 初始化表格宽度
    initTableWidth() {
      let content = document.getElementById(this.id);
      this.tableWidth = (content.offsetWidth - 19) + 'px';
    },
    // 初始化空白策略
    initGapStrategy() {
      let gap = parseInt(this.tableWidth);
      for (let i = 0; i < this.columnInfo.length; i++) {
        let thDom = document.getElementById(this.id+'Table'+this.columnInfo[i].field+'Th');
        gap -= thDom.offsetWidth;
      }
      this.gapWidth = gap-1;
      console.log(this.gapWidth);
    }
  },
  mounted() {
    this.initSortRuleString();
    this.initTableWidth();
    if(this.gapCompNeeded) {
      this.initGapStrategy();
    }
  }
}
</script>
<style lang="css" scoped>

tbody {
  overflow-y: scroll;
}

thead {
  width: calc( 100% - 1em)
}
span {
  cursor: default;
}

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
    line-height: 13px;
    overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
}

.hovertable {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
    color:#333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
}
</style>
