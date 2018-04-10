<template>
  <datagrid :id='' :column-data=''></datagrid>
</template>
<script>
import datagrid from '../../components/datagrid/datagrid'
export default {
  data: () => ({
    id: 'test',
    columnData: [{
      title: 'ID',
      field: 'id'
    },{
      title: '名称',
      field: 'text'
    }]
  })
}
</script>
<style lang="scss" scoped>
</style>
