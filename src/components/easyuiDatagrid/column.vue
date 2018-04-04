<template>
  <div style="display: none;" ></div>
</template>
<script>

export default {
  data(){
    return {

    }
  },
  props: {
    // 通讯事件中心
    bus: {
      type: Object,
      required: true
    },
    // 列显示值
		title:{
			type:String,
			required:true
		},
		// 与需要展示的后台数据对应的字段名称
		field:{
			type:String,
			required:true
		},
		// 宽度
		width:{
			type:Number,
			default:100
		},
		// 是否显示
		hidden:{
			type:Boolean,
			default:false
		},
		// 对齐方式
		align:{
			type:String,
			default:'center'
		},
		// 替换方式，格式为oldvalue_newvalue，oldvalue1_newvalue1
		replace:{
			type:String,
			default : ''
		},
		// 是否增加查询
		query:{
			type:Boolean,
			default:false
		},
		// 查询方式 默认为single，也可以为group
		queryMode:{
			type:String,
			default:'single'
		},
		// column中属于第几个集合
		columnIndex:{
			type:Number,
			default:0
		},
		// 合并行
		rowspan:{
			type:Number,
			default:1
		},
		// 合并列
		colspan:{
			type:Number,
			default:1
		},
		// 数据合并规则
		mergeRule:{
			type:Object,
			default:false
		},
		// 和并列参照列名
		referMergeField:{
			type:String,
			default:''
		},
		dateFormatter:{
			type:String,
			default:''
		}
  },
  mounted() {
    let columnData = {
      field : this.field,
      title : this.title,
      width : this.width,
      hidden : this.hidden,
      align : this.align,
      replace : this.replace,
      query : this.query,
      queryMode : this.queryMode,
      columnIndex : this.columnIndex,
      rowspan : this.rowspan,
      colspan : this.colspan,
      mergeRule : this.mergeRule,
      dateFormatter : this.dateFormatter
    };
    if(this.referMergeField!==''){
      let mergeRefers = [this.referMergeField,this.field];
      this.bus.$emit('mergeDataUp',mergeRefers);
    }
    this.bus.$emit('columnDataUp',columnData);
  },
  created() {
  }
}
</script>
<style lang="scss" scoped>
</style>
