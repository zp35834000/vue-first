<template>
  <div class="" style="height:100%">
    <datagrid
      :sort-rule='sortRule'
      :data='dataList'
      :id='id'
      :column-data='columnData'
      :height='height'
      :width='width'
      :gap-comp-needed = 'gapCompNeeded'
      :mouse-scroll-num = 5>
    </datagrid>
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
          condition: '111',
          compareRule: 'contain'
        },
        width: '200px'
      },{
        title: '名称',
        field: 'text',
        sortable: true,
        query: true,
        queryArugs: {
          tag: 'select',
          condition: [],
          compareRule: 'contain',
          options: [{
                        value: '11',
                        label: '11'
                    },
                    {
                        value: '22',
                        label: '22'
                    }]
        },
        width: '70px'
      }],
      sortRule: ['id','asc'],
      height: '50%',
      width: '50%',
      gapCompNeeded: false
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
      for (var i = 0; i < 10000; i++) {
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
