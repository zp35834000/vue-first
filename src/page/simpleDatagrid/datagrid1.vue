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
        query: true,
        queryArugs: {
          tag: 'input',
          condition: '111'
        }
      },{
        title: '名称',
        field: 'text',
        sortable: true,
        query: true,
        queryArugs: {
          tag: 'select',
          condition: 'London',
          options: [{
                        value: 'New York',
                        label: '纽约'
                    },
                    {
                        value: 'London',
                        label: '伦敦'
                    }]
        }
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
      for (var i = 0; i < 100000; i++) {
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
