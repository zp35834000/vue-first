<template>
  <div>
    <table class='hovertable' :id='id' border="0" style="float:left" >
      <column @dataSortRuleUp='orderData' :sort-rule='sortRule' :show-data='showData' :id='id' :column-info='actualColumnData'></column>
    </table>
    <div class="" style="float:left">
      <div id="" style="height:32px">
      </div>
      <div v-if='showScroll' :id="id+'divScroll'" :style="{height:itemSize*showNum+'px'}"
        style="width:19px;overflowY:scroll;overflowX:hidden"
        @scroll='getScrollPos'>
        <div class="" :style="{height:itemSize*data.length+'px'}"
          style="backgroundColor:white;width:1px">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import column from './column'
export default {
  name: 'datagrid',
  data: () => ({
    itemSize: 31, //单项尺寸
    pos: 0 // 当前滚动位置
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
    actualColumnData(){
      return this.columnData;
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
      console.log(orderRule);
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
