<template>
  <div :id='id' :style="{height:height, width:width}">
    <toolbar
      @filterOperateUp = 'filtrationData'
      v-if='toolbarNeeded'
      :toolbar-query-data='toolbarQueryData'
      :id='id'>
    </toolbar>
    <cusTable
      @dataSortRuleUp='orderData'
      :sort-rule='sortRule'
      :show-data='showData'
      :id='id'
      :column-info='columnData'
      :gap-comp-needed='gapCompNeeded'>
    </cusTable>
    <div class="" style="float:left">
      <div id="" style="height:35px">
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
import cusTable from './cusTable'
import toolbar from './toolbar'
import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import arrUtil from '../util/arrUtils'
Vue.use(iView);


export default {
  name: 'datagrid',
  data: () => ({
    itemSize: 30, //单项尺寸
    pos: 0, // 当前滚动位置
    // 存储了传入的data值，深复制操作
    // 理论上来说在排序和筛选的时候操作props中data值即可，但是可能出现问题，操作该数组
    originalData: [],
    showData: [], // 需要展示的数据，详情定义方式见setShowdata方法
    scrollDivHigh: 0,
    showNum: 10 // 展示数据个数
  }),
  components: {
    cusTable,
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
    sortRule: {
      type: Array,
      default: function() {
        return [];
      }
    },
    height: {
      type: String,
      default: '100%'
    },
    width: {
      type: String,
      default: '100%'
    },
    gapCompNeeded: {
      type: Boolean,
      default: false
    },
    // 鼠标滚动时候数据变化条数
    mouseScrollNum: {
      type: Number,
      default: 3
    }
  },
  mounted() {
    this.initShowNum();
    this.bindScrollDivMouseScroll();
  },
  created() {
    // 将props中data值深复制到originalData中
    this.initOriginalData();
  },
  computed: {
    // 是否显示滚动条
    showScroll() {
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
      this.sortRule[0] = orderRule.field;
      this.sortRule[1] = orderRule.sort;
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
        // debugger;
        // 默认返回结果
        let result = true;
        // 遍历过滤条件
        for (let i = 0; i < conditionArr.length; i++) {
          let key = conditionArr[i]['key'];
          let val = conditionArr[i]['condition'];
          let actualVal =  value[key] +'';
          // 单个条件判断
          if(typeof(conditionArr[i].condition) === 'string') {
            if(conditionArr[i].compareRule==='contain') {
              if(actualVal.indexOf(val) === -1) {
                result = false;
                break;
              }
            }else if(conditionArr[i].compareRule==='equal') {
              if(actualVal !== val) {
                result = false;
                break;
              }
            }
          }else if(conditionArr[i].condition instanceof Array) {
            let singleConditionArr = conditionArr[i].condition;
            let tempResult = false;
            if(conditionArr[i].compareRule==='contain') {
              for (let j = 0; j < singleConditionArr.length; j++) {
                if(actualVal.indexOf(singleConditionArr[j]) !== -1) {
                  tempResult = true;
                  break;
                }
              }
            }else if(conditionArr[i].compareRule==='equal') {
              for (let j = 0; j < singleConditionArr.length; j++) {
                if(actualVal === singleConditionArr[j]) {
                  tempResult = true;
                  break;
                }
              }
            }
            if(!tempResult) {
              result = false;
              break;
            }
          }

        }
        return result;
      })
      // 按照已选排序方式进行排序
      arrUtil.order(this.originalData,this.sortRule[0],this.sortRule[1]);
    },
    // 根据分配高度初始化显示数据条数
    initShowNum() {
      let content = document.getElementById(this.id);
      let toolbarDom = document.getElementById(this.id+'Toolbar');
      let tableThDom = document.getElementById(this.id+'TableTh');
      let tdListHeight = content.offsetHeight-tableThDom.offsetHeight;
      if(toolbarDom!==null) {
        tdListHeight -= toolbarDom.offsetHeight;
      }

      this.showNum = parseInt(tdListHeight/30);
    },
    // 表格增加鼠标滚动事件，和右侧滚动条联动
    bindScrollDivMouseScroll() {
      let scrollDivDom = document.getElementById(this.id+'divScroll');
      let tbListDom = document.getElementById(this.id+'tbList');
      let mouseScrollNum = this.mouseScrollNum;
      let _this = this;
      let scrollFunc=function(e){
        // debugger;
        let direct=0;

        if(e.wheelDelta){//IE/Opera/Chrome
          direct = e.wheelDelta;
        }else if(e.detail){//Firefox
          direct = e.detail;
        }
        let top = scrollDivDom.scrollTop;
        if(direct > 0) {
          // 鼠标滚轮向上触发
          if(_this.pos > mouseScrollNum) {
            _this.pos = _this.pos - mouseScrollNum;
          }else {
            _this.pos = 0;
          }

        }
        if(direct < 0) {
          // 鼠标滚轮向下触发
          let totalShowNum = _this.originalData.length;
          let showNum = _this.showNum;
          let maxPos = totalShowNum - showNum;
          if(maxPos - _this.pos > mouseScrollNum) {
            _this.pos = _this.pos + mouseScrollNum;
          }else {
            _this.pos = maxPos;
          }
        }
        scrollDivDom.scrollTop = _this.pos * _this.itemSize;
      }

      if(scrollDivDom !== null) {
        /*注册事件*/
        if(document.addEventListener){
          //W3C
          tbListDom.addEventListener('DOMMouseScroll',scrollFunc,false);
        }
        //IE/Opera/Chrome/Safari
        tbListDom.onmousewheel=scrollFunc;
      }
    }
  }
}
</script>
<style lang="css" scoped>

span {
  cursor: default;
}

</style>
