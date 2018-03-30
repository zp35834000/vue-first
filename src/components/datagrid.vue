<template>
  <div id="">
    <!-- <table class="easyui-datagrid" title="Basic DataGrid" id="datagrid"  style="width:700px;height:250px"
  			data-options="singleSelect:true,collapsible:true,method:'get'">
  		<thead>
  			<tr>
  				<th data-options="field:'code',width:80">Item ID</th>
  				<th data-options="field:'name',width:100">Product</th>
  			</tr>
  		</thead>
  	</table> -->
    <table id="dg"></table>
    <div class="easyui-calendar" style="width:250px;height:250px;"></div>
    datagridPage
  </div>
</template>
<script>
import 'easyui/themes/default/easyui.css'
import 'easyui/themes/icon.css'
import 'easyui/jquery.easyui.min.js'
export default {
  data(){
    return {

    }
  },
  created() {

  },
  mounted() {
    $('#dg').datagrid({
        columns:[[
            {field:'code',title:'Code',width:100},
            {field:'name',title:'Name',width:100}
        ]]
    });
    let total = 1;
		let testJson = {
				"total":total,
				"rows" : [
					{"code":"001,002,003","name":"002"},
				]
		};
		$('#dg').datagrid('loadData', testJson);
  }
}
</script>

<style lang="scss" scoped>
</style>
