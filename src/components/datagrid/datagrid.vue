<template>
  <div>
    <toolbar
      v-if='toolbarNeeded'
      :toolbar-query-data='toolbarQueryData'>
    </toolbar>
    <table class='hovertable' :id='id' border="0" style="float:left" >
      <column
        @dataSortRuleUp='orderData'
        :sort-rule='sortRule'
        :show-data='showData'
        :id='id'
        :column-info='columnData'>
      </column>
    </table>
    <div class="" style="float:left">
      <div id="" style="height:34px">
      </div>
      <div v-if='showScroll'
        :id="id+'divScroll'"
        :style="{height:itemSize*showNum+'px'}"
        style="width:19px;overflowY:scroll;overflowX:hidden"
        @scroll='getScrollPos'>
        <div class=""
          :style="{height:itemSize*data.length+'px'}"
          style="backgroundColor:white;width:1px">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import column from './column'
import toolbar from './toolbar'
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);


export default {
  name: 'datagrid',
  data: () => ({
    itemSize: 35, //单项尺寸
    pos: 0, // 当前滚动位置
    orderedData: [],
    dataOrderMonotirNumber: 0
  }),
  components: {
    column,
    toolbar
  },
  props: {
    // 表格唯一标识
    id: {
      type: String,
      required: true
    },
    // 表格列信息
    columnData: {
      type: Array,
      required: true
    },
    // 所有数据信息
    data: {
      type: Array,
      required: true
    },
    // 展示数据个数
    showNum: {
      type: Number,
      default: 20
    },
    // 排序规则，0为field，1为asc或desc
    sortRule: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  mounted() {
  },
  created() {
    this.initOrderedData();
  },
  computed: {
    // 是否显示滚动条
    showScroll(){
      if(this.data.length>this.showNum){
        return true;
      }else{
        return false;
      }
    },
    // 需要展示的数据
    showData(){
      let dataOrderMonotirNumber = this.dataOrderMonotirNumber;
      let showDataArray = [];
      let showNum = this.showNum;
      let totalNum = this.data.length;
      if(totalNum<showNum){
        showNum = totalNum;
      }
      for(let i = 0; i < showNum; i++){
        showDataArray[i] = this.data[this.pos+i];
      }
      return showDataArray;
    },
    // 获得toolbar查询相关数据
    toolbarQueryData() {
      let toolbarQueryData = [];
      for (var i = 0; i < this.columnData.length; i++) {
        if(this.columnData[i].query === true){
          toolbarQueryData.push(this.columnData[i]);
        }
      }
      console.log(toolbarQueryData.length);
      return toolbarQueryData;
    },
    // 是否需要toolbar
    toolbarNeeded() {
      let toolbarNeeded = false;
      if(this.toolbarQueryData.length !== 0) {
        toolbarNeeded = true
      }
      return toolbarNeeded;
    }
  },
  methods: {
    // 获得滚动位置
    getScrollPos(){
      let top = document.getElementById(this.id+'divScroll').scrollTop;
      let pos = parseInt(top/this.itemSize);
      this.pos = pos;
    },
    orderData(orderRule) {
      // 比较规则函数
      function compare(property,sort) {
        // 默认
        let rev = 1;
        if(sort === 'asc'){
          rev = 1;
        }else if(sort === 'desc'){
          rev = -1;
        }
        return function (a,b){
          let val1 = a[property];
          let val2 = b[property];
          if(val1 < val2) {
            return rev * -1;
          }
          if(val1 > val2) {
            return rev * 1;
          }
          return 0;
        }
      }
      this.data.sort(compare(orderRule.field,orderRule.sort));
      this.dataOrderMonotirNumber++;
      if(document.getElementById(this.id+'divScroll')!==null){
        document.getElementById(this.id+'divScroll').scrollTop = 0;
      }
    },
    initOrderedData() {
      this.orderedData = this.data;
    }
  }
}
</script>
<style lang="css" scoped>

.hovertable {
    font-family: verdana,arial,sans-serif;
    font-size:11px;
    color:#333333;
    border-width: 1px;
    border-color: #999999;
    border-collapse: collapse;
}

</style>
