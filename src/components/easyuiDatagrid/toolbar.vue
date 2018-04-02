<template>
  <div id="">

  </div>
</template>
<script>
import bus from './event'
export default {
  data: () => ({

  }),
  props: {
    datagridId: {
      type: String,
      required: true
    },
    // 显示名称
    title:{
      type:String,
      required:true
    },
    // 按钮图标
    icon:{
      type:String,
      default : 'icon-edit'
    },
    // 操作点击触发事件
    funname:{
      type:String,
      required : true
    }
  },
  methods:{
  },
  created(){
    let toolbarData = {
      title : this.title,
      icon : this.icon,
      funname : this.funname
    };
    bus.getBusData(this.datagridId,'Bus').$emit('toolbarDataUp',toolbarData);
  }
}
</script>
<style lang="scss" scoped>
</style>
