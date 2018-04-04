<template>
  <div style="height:100%">
    <vue-my-datagrid :bus='bus' @initData='initDatagrid3' opt-merge-rule="header1"  id="test" title="测试表格" :checkbox=false  id-field="header1"  :if-java-fx=true :check-on-select=false>
      <vue-my-column :bus='bus' title="<a href='#/datagrid' @onclick='openDetailedEchart(123,cpu)'>和并列</a>"  :column-index=0  :colspan=2 ></vue-my-column>
      <vue-my-column :bus='bus'  :width=300  field="header1" title="列1"  :column-index=1 replace="001_new001,003_new003"  :query=true></vue-my-column>
      <vue-my-column :bus='bus'  :width=200  field="header2" title="列2"  :column-index=1 query-mode="group" :query=true> </vue-my-column>
      <vue-my-funopt  :bus='bus' title="header1为003" funname="funOptTest1(header1,header2)" exp='header1#eq#003'></vue-my-funopt>
      <vue-my-funopt  :bus='bus' title="alert header2" funname="funOptTest2(header2)" exp=''></vue-my-funopt>
      <vue-my-toolbar :bus='bus' title="表格工具栏" funname="datagridTbTest" ></vue-my-toolbar>
    </vue-my-datagrid>
  </div>
</template>
<script>
import {datagrid,column,funopt,toolbar} from '../../../components/easyuiDatagrid/index.js'
import Vue from 'vue'

export default {
  data(){
    return {
      bus: new Vue()
    }
  },
  components: {
    vueMyDatagrid: datagrid,
    vueMyColumn: column,
    vueMyFunopt: funopt,
    vueMyToolbar: toolbar
  },
  methods: {
    initDatagrid3(queryParams){
      // debugger;
  		let queryParamObj = queryParams.queryParamsObj;
  		let pageSize = queryParams.pageSize;
  		let pageNumber = queryParams.pageNumber;
  		let total = 12;
  		let testJson = {
  				"total":total,
  				"rows" : [
  					{"header1":"001,002,003","header2":"002"},
  					{"header1":"003","header2":"004"},
  					{"header1":"004","header2":"004"},
  					{"header1":"005","header2":"004"},
  					{"header1":"006,002,003","header2":"002"},
  					{"header1":"007","header2":"004"},
  					{"header1":"008","header2":"004"},
  					{"header1":"009","header2":"004"},
  					{"header1":"010,002,003","header2":"002"},
  					{"header1":"013","header2":"004"},
  				]
  		};
  		$('#test').datagrid('loadData', testJson);
  		return '345';
  	},
    openDetailedEchart() {
      alert('echartTest');
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
