<template>
  <datagrid :show-num=20 :data='dataList' :id='id' :column-data='columnData'></datagrid>
</template>
<script>
import datagrid from '../../components/datagrid/datagrid'
export default {
  data(){
    return {
      id: 'test',
      columnData: [{
        title: 'ID',
        field: 'id'
      },{
        title: '名称',
        field: 'text'
      }]
    }
  },
  components: {
    datagrid
  },
  computed: {
    dataList(){
      let dataList = [];
      for (var i = 0; i < 21; i++) {
        dataList[i] = {
          id: i,
          text: 'text'+i
        }
      }
      return dataList;
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
