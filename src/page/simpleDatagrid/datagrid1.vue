<template>
  <div class="">
    <datagrid :sort-rule='sortRule' :show-num=20 :data='dataList' :id='id' :column-data='columnData'></datagrid>
  </div>
</template>
<script>
import datagrid from '../../components/datagrid/datagrid'
export default {
  data(){
    return {
      id: 'test',
      columnData: [{
        title: 'ID',
        field: 'id',
        sortable: true,
        sort: ''
      },{
        title: '名称',
        field: 'text',
        sortable: true,
        sort: 'desc'
      }],
      sortRule: ['id','asc']
    }
  },
  components: {
    datagrid
  },
  computed: {
    dataList(){
      return this.getData();
    }
  },
  methods: {
    getData() {
      let dataList = [];
      for (var i = 0; i < 21000; i++) {
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
<style scoped>

</style>
