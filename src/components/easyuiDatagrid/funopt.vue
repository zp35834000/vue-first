<template>
  <div style="display: none;" ></div>
</template>
<script>

export default {
  data: () => ({

  }),
  props: {
    // 通讯事件中心
    bus: {
      type: Object,
      required: true
    },
    // 操作名称
		title:{
			type:String,
			required:true
		},
		// 判断操作是否显示
		exp:{
			type:String,
			default : ''
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
    let funOptData = {
			title : this.title,
			exp : this.exp,
			funname : this.funname
  	};
    this.bus.$emit('funOptDataUp',funOptData);
  }
}
</script>
<style lang="scss" scoped>
</style>
