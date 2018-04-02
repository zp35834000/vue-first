import Vue from 'vue'
let busMap = {};
export default {
  // 数据中心，key为datagridId，value为中存了一些表格相关的重要信息
  //
  // 增加数据中心
  addNewBus(tableId) {
    debugger;
    busMap[tableId] = {
      Bus: new Vue(),
    	column: [],
    	optFunData: [],
    	toolbarData: [],
    	queryFunname: '',
    	ifJavaFx: false,
    	queryParams: '',
    	definedMerges: [],
    	mergeRefers: {}
    };
  },
  // 获得数据中心指定key对应value
  getBusData(tableId,dataKey) {
    if(busMap[tableId]===undefined){
      busMap[tableId] = {
        Bus: new Vue(),
      	column: [],
      	optFunData: [],
      	toolbarData: [],
      	queryFunname: '',
      	ifJavaFx: false,
      	queryParams: '',
      	definedMerges: [],
      	mergeRefers: {}
      };
    }
    return busMap[tableId][dataKey];
  }
}
