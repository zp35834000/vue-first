<template>
  <div id="">
    <table id="dg"></table>
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
