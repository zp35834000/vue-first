<template>
  <div>
    <toolbar
      @filterOperateUp = 'filtrationData'
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
          :style="{height:scrollDivHigh}"
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
import arrUtil from '../util/arrUtils'
Vue.use(iView);


export default {
  name: 'datagrid',
  data: () => ({
    itemSize: 35, //单项尺寸
    pos: 0, // 当前滚动位置
    // 存储了传入的data值，深复制操作
    // 理论上来说在排序和筛选的时候操作props中data值即可，但是可能出现问题，操作该数组
    originalData: [],
    showData: [], // 需要展示的数据，详情定义方式见setShowdata方法
    scrollDivHigh: 0
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
    // 将props中data值深复制到originalData中
    this.initOriginalData();
  },
  computed: {
    // 是否显示滚动条
    showScroll(){
      if(this.originalData.length>this.showNum){
        return true;
      }else{
        return false;
      }
    },
    // 获得toolbar查询相关数据
    toolbarQueryData() {
      let toolbarQueryData = [];
      for (var i = 0; i < this.columnData.length; i++) {
        if(this.columnData[i].query === true){
          toolbarQueryData.push(this.columnData[i]);
        }
      }
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
  watch: {
    pos: function(val) {
      // this.setShowdata();
      let showDataArray = [];
      let showNum = this.showNum;
      let totalNum = this.originalData.length;
      if(totalNum<showNum){
        showNum = totalNum;
      }
      for(let i = 0; i < showNum; i++){
        showDataArray[i] = this.originalData[val+i];
      }
      this.showData = showDataArray;
    },
    originalData: function(val) {
      // this.setShowdata();
      let showDataArray = [];
      let showNum = this.showNum;
      let totalNum = val.length;
      if(totalNum<showNum){
        showNum = totalNum;
      }
      for(let i = 0; i < showNum; i++){
        showDataArray[i] = val[this.pos+i];
      }
      this.showData = showDataArray;
      this.scrollDivHigh = this.itemSize*val.length+'px'
    }
  },
  methods: {
    // 获得滚动位置
    getScrollPos(){
      let top = document.getElementById(this.id+'divScroll').scrollTop;
      let pos = parseInt(top/this.itemSize);
      this.pos = pos;
    },
    // 对originalData进行排序操作
    orderData(orderRule) {
      arrUtil.order(this.originalData,orderRule.field,orderRule.sort);
      if(document.getElementById(this.id+'divScroll')!==null){
        document.getElementById(this.id+'divScroll').scrollTop = 0;
      }
    },
    // 初始化原始数据数组，也可用来还原originalData
    initOriginalData() {
      let arr = [];
      this.originalData = arr.concat(this.data);
    },
    // 对originalData展示数据进行过滤操作
    filtrationData(conditionArr) {
      // condition为过滤条件数组，每个数据元为单个过滤条件
      // key为比较字段，value为比较值，compareRule为比较规则
      // 如{key:'id',value:'1',compareRule:'contain'},比较包含
      // 如{key:'id',value:'1',compareRule:'equal'},比较规则为全等
      this.originalData = this.data.filter((value) => {
        let result = true;
        for (let i = 0; i < conditionArr.length; i++) {

          let key = conditionArr[i]['key'];
          let val = conditionArr[i]['value'];
          let actualVal =  value[key] +'';
          if(conditionArr[i].compareRule==='contain') {
            if(actualVal.indexOf(val) === -1) {
              result = false;
            }
          }else if(conditionArr[i].compareRule==='equal') {
            if(actualVal !== val) {
              result = false;
            }
          }
        }
        return result;
      })
    },
    // 设置column组件中需要的展示数据，即可以观察到的data数组
    setShowdata() {
      let showDataArray = [];
      let showNum = this.showNum;
      let totalNum = this.originalData.length;
      if(totalNum<showNum){
        showNum = totalNum;
      }
      for(let i = 0; i < showNum; i++){
        showDataArray[i] = this.originalData[this.pos+i];
      }
      this.showData = showDataArray;
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
