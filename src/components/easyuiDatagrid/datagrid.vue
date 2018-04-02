<template>
  <div>
    <table :id="id" width="100%" :toolbar="'#'+id+'tb'"><slot></slot></table>
  </div>
</template>
<script>
import bus from './event'
import Vue from 'vue'
import 'easyui/themes/default/easyui.css'
import 'easyui/themes/icon.css'
import 'easyui/jquery.easyui.min.js'
export default {
  data(){
    return {

    }
  },
  props: {
		ifJavaFx:{
			type:Boolean,
			default:false
		},
		// 表格唯一标识
		id:{
			type: String,
			required:true
		},
		// 取数方法
		queryFunname:{
			type : String,
			required:true
		},
		// 查询参数
		queryParams:{
			type:Object,
			default:{
			}
		},
		// 表格下的列组件集合
		column:{
			type:Object,
			default:[]
		},
		// 表格下的操作组件集合
		optFunData:{
			type : Object,
			default : []
		},
		// 工具栏操作集合
		toolbarData:{
			type : Object,
			default : []
		},
		// 表格标题
		title:{
			type:String,
			default:''
		},
		// 是否分页
		pagination:{
			type:Boolean,
			default:true
		},
		// 每页显示的记录数
		pageSize:{
			type:Number,
			default:10
		},
		// 是否显示复选框
		checkbox:{
			type:Boolean,
			default:false
		},
		// 是否显示行号列
		rownumbers:{
			type:Boolean,
			default:true
		},
		// 初始化页码
		pageNumber:{
			type:Number,
			default:1
		},
		// 初始化页面大小选择列表
		pageList:{
			type:Array,
			default:[10,30,50]
		},
		// id列
		idField:{
			type:String,
			required:true
		},
		// 定义按照哪一列进行排序
		sortName:{
			type:String
		},
		// 排序方式，只能是asc和desc
		sortOrder:{
			type:String,
			default:'asc'
		},
		// 是否只能选择一行
		singleSelect:{
			type:Boolean,
			default:false
		},
		// 是否显示斑马线效果
		striped:{
			type:Boolean,
			default:true
		},
		// 是否是树形表格
		treegrid:{
			type:Boolean,
			default:false
		},
		// 树形表格字段
		treeField:{
			type:String
		},
		checkOnSelect:{
			type:Boolean,
			default:false
		},
		// 需要合并相同值的列明
		autoMergeField:{
			type:Object,
			default:[]
		},
		// 是否需要合并操作列
		optMergeRule:{
			type:String,
			default:'optField'
		}
  },
  created() {
    debugger;
    bus.addNewBus(this.id);
    // bus.getBusData(this.id,'queryFunname') = this.queryFunname;
		// bus.getBusData(this.id,'ifJavaFx') = this.ifJavaFx;
		bus.getBusData(this.id,'Bus').$on('columnDataUp', (columnData) => { //Bus接收事件
      let column = bus.getBusData(this.id,'column');
      // 按照columnIndex值将column值放入column数组内的数组中
      if(column[columnData.columnIndex]===undefined){
      	column[columnData.columnIndex] = [];
      }
      let length = column[columnData.columnIndex].length;
      column[columnData.columnIndex][length] = columnData;
      if(columnData.mergeRule){
      	bus.getBusData(this.id,'definedMerges').push(columnData.mergeRule)
      }
    });
		bus.getBusData(this.id,'Bus').$on('funOptDataUp', (funOptData) => { //Bus接收事件
      let optFunData = bus.getBusData(this.id,'optFunData');
      let length = optFunData.length;
      optFunData[length] = funOptData;
    });
		bus.getBusData(this.id,'Bus').$on('toolbarDataUp', (toolbarDataRec) => { //Bus接收事件
			let toolbarData = bus.getBusData(this.id,'toolbarData');
			let length = toolbarData.length;
			toolbarData[length] = toolbarDataRec;
		});
		// 模板
		let templateString = '<table width="100%" :id="id" :toolbar="\'#\'+id+\'tb\'"><slot></slot></table>';
		// 初始化查询参数中的分页相关参数
		let queryParams = this.queryParams;
		queryParams.pageSize = this.pageSize;
		queryParams.pageNumber = this.pageNumber;
		queryParams.queryParamsObj = {};
		// bus.getBusData(this.id,'queryParams') = queryParams;
  },
  mounted() {
    // 初始化操作列
  	this.initFunOpt();
  	// 初始化toolbar
  	this.initToolBar();
  	// 增加时间格式化操作
  	this.addDateFormat();
  	// 初始化所有列
  	this.initColumn();
  	// 表格初始化
  	this.initGrid();
    // 表格数据上数

  },
  methods: {
    // 初始化toolbar
    initToolBar(){
  		// 是否需要增加tb div，默认为false，不需要添加
		  let toolbarGridId = this.id;
  		// 是否需要添加querydiv
  		let queryDivNeeded = false;
  		// 是否需要添加toolbardiv
  		let tbDivNeeded = false;
  		// 取数方法名称
  		let queryFunname = this.queryFunname;
  		// 查询参数
  		let queryParams = this.queryParams
  		// 判断是否有query为true的列
  		for(let i = 0;i<bus.getBusData(this.id,'column').length;i++){
  			for(let j = 0;j<bus.getBusData(this.id,'column')[i].length;j++){
  				if(bus.getBusData(this.id,'column')[i][j].query){
    				queryDivNeeded = true;
    				break;
    			}
  			}
  		}
  		// 判断是否需要添加工具栏
  		if(bus.getBusData(this.id,'toolbarData').length!=0){
  			tbDivNeeded = true;
  		}
  		let tbString;
  		// 需要添加toolbardiv或toolbardiv都需要添加tbdiv
  		if(queryDivNeeded || tbDivNeeded){
  			tbString = '<div id="'+toolbarGridId+'tb" style="padding:3px; height: auto">';
  			if(queryDivNeeded){
  				// 添加queryDiv
  				tbString+='<div name="'+toolbarGridId+'SearchColums">'+
  		 	 		'<input  id="'+toolbarGridId+'_sqlbuilder" name="'+toolbarGridId+'sqlbuilder"   type="hidden" />';
  				for(let i = 0;i<bus.getBusData(this.id,'column').length;i++){
  					for(let j = 0;j<bus.getBusData(this.id,'column')[i].length;j++){
  						if(bus.getBusData(this.id,'column')[i][j].query){
  							let currentColumn = bus.getBusData(this.id,'column')[i][j];
  							tbString+='<span style="display:-moz-inline-box;display:inline-block;">';
  							tbString+='<span style="vertical-align:middle;display:-moz-inline-box;display:inline-block;width: 80px;'+
  							'text-align:right;text-overflow:ellipsis;-o-text-overflow:ellipsis; overflow: hidden;white-space:nowrap;"'+
  							'title="'+currentColumn.title+'">'+
  							currentColumn.title+':</span>';
  							if(currentColumn.queryMode=='single'){
  								// 单独查询
  								if(currentColumn.replace==''){
  									tbString+='<input class="inuptxt" @keypress.13="EnterPress()" @keydown.13="EnterPress()"  type="text" name="'+currentColumn.field+'"  style="width: 100px" />';
  								}else{
  									tbString+='<select name="' + currentColumn.field + '" WIDTH="100" style="width: 104px">; ';
  									tbString+='<option value ="" ></option>';
  									let repArr = currentColumn.replace.split(',');
  									for(let i = 0;i<repArr.length;i++){
  										let oldAndNew = repArr[i].split('_');
  										tbString+='<option value ="' + oldAndNew[0] + '">' + oldAndNew[1] + '</option>';
  									}
  									tbString+='</select>';
  								}
  							}else if(currentColumn.queryMode=='group'){
  								// 区间查询
  								tbString+='<input class="inuptxt" type="text" name="' + currentColumn.field + '_begin"  style="width: 94px" />';
  								tbString+='<span style=\"display:-moz-inline-box;display:inline-block;width: 8px;text-align:right;\">~</span>';
  								tbString+='<input class="inuptxt" type="text" name="' + currentColumn.field + '_end"  style="width: 94px" />';
  							}
  							tbString+='</span>';
  						}
  					}
	    		}
  				tbString+='</div>';
  			}
  			tbString+='<div style="height:30px;" class="datagrid-toolbar">';
  			if(tbDivNeeded){
  				// 添加工具栏div
  				tbString+='<span style="float:left;" >';
  				let toolbarDataResource = bus.getBusData(this.id,'toolbarData');
  				for(let i = 0;i<toolbarDataResource.length;i++){
  					tbString+='<a href="#" class="easyui-linkbutton" plain="true" icon="'+toolbarDataResource[i].icon+'" onclick="'+toolbarDataResource[i].funname+'(\''+toolbarDataResource[i].title+'\',\''+toolbarGridId+'\')">'+toolbarDataResource[i].title+'</a>';
  				}
  				tbString+='</span>';
  			}
  			if(queryDivNeeded){
  				// 添加查询、重置按钮
  				tbString+='<span id="'+toolbarGridId+'clickButtonDiv" style="float:right">'+
  	    				'<a href="#" class="easyui-linkbutton" iconCls="icon-search" @click="listsearch(\''+toolbarGridId+'\')">查询</a>'+
  	    				'<a href="#" class="easyui-linkbutton" iconCls="icon-reload" @click="searchReset(\''+toolbarGridId+'\')">重置</a>'+
  	    			  '</span>';
  			}
  			tbString += '</div></div>';
  			$("#"+toolbarGridId).append(tbString);
  			if(queryDivNeeded){
  				// 为查询、重置按钮添加vue组件
  				new Vue({
  					el : '#'+toolbarGridId+'tb',
  					methods:{
  						// 重置输入框
  						searchReset:function(name){
  							$("#"+toolbarGridId+"tb").find(":input").val("");
  							this.listsearch(toolbarGridId);
  						},
  						// 查询操作
  						listsearch:function(gridId){
  							// 获得输入框的查询条件
  							let queryParamsObj=$('#'+gridId).datagrid('options').queryParams;
  							$('#'+gridId+'tb').find('*').each(function(){
  								queryParamsObj[$(this).attr('name')]=$(this).val();
  							});
  							queryParams.queryParamsObj = queryParamsObj;
  							// 查询取数操作
  							window[queryFunname](queryParams);
  						},
  						EnterPress:function(){
  		 	 			  this.listsearch(toolbarGridId);
  						}
  					}
  				})
  			}
  		}
    },
  	// 初始化表格列属性
  	initColumn(){
    		let columnData = bus.getBusData(this.id,'column');
    		let checkbox = this.checkbox;
    		let idField = this.idField;
    		for(let i=0 ; i < columnData.length ; i++){
    			for(let j=0; j<columnData[i].length ; j++){
    				if(columnData[i][j].replace!=undefined&&columnData[i][j].replace!=''){
    					// replace格式	oldValue_newValue,oldValue1_newValue1
    					var repArr = columnData[i][j].replace.split(",");
    					// 构建formatter函数
    					let formatter = function(value,rec,index){
    						// value值通过'，'隔开，如oldvalue，oldvalue1会显示为newvalue，newvalue1
    						let valArray = value.split(",");
    						if(valArray.length > 0){
    							// 结果字符串
    							let checkboxValue = "";
    							// 遍历原字符串解析出的数组
    							for(let k=0; k<valArray.length; k++){
    								// 是否匹配成功，默认未匹配成功，如果匹配成功，则该值为true
    								let ifReplaced = false;
    								// 遍历匹配规则
    								for(let j=0;j<repArr.length;j++){
    									// 匹配规则为old_new
    									let oldAndNewRep = repArr[j].split('_');
    									if(valArray[k] == oldAndNewRep[0]){
    										// 成功匹配
    										checkboxValue  += oldAndNewRep[1] + ',';
    										ifReplaced = true;
    										break;
    									}
    								}
    								if(!ifReplaced){
    									// 匹配失败，显示原始值
    									checkboxValue  += valArray[k] + ',';
    								}
    							}
    							return checkboxValue.substring(0,checkboxValue.length-1);
    						}
    					};
    					columnData[i][j].formatter = formatter;
    				}
    			}
    		};
    		// 增加复选框
  			if(checkbox){
  				columnData[0].unshift({
  	                field : 'checkboxField',
  	                checkbox : true,
  	                rowspan:columnData.length
          });
  			}
    	},
    	// 增加时间格式化操作
    	addDateFormat(){
    		let columnData = bus.getBusData(this.id,'column');
    		for(let i=0 ; i < columnData.length ; i++){
    			for(let j=0; j<columnData[i].length ; j++){
    				if(columnData[i][j].dateFormatter!=undefined&&columnData[i][j].dateFormatter!=''){
    					// 构建formatter函数
    					let formatter = function(value,rec,index){
    						return new Date(parseInt(value)).VueFormat(columnData[i][j].dateFormatter);
    					};
    					columnData[i][j].formatter = formatter;
    				}
    			}
    		};
    	},
    	// 初始化操作列
    	initFunOpt(){
    		var optFunDataTemp = bus.getBusData(this.id,'optFunData');
    		if(optFunDataTemp.length!=0){
    			let formatter = function(value,rec,index){
    				let optHerf='';

    				for(let i = 0; i < optFunDataTemp.length; i++){
    					let currentFunOpt = optFunDataTemp[i];
    					// 是否添加该操作按钮，默认为添加
    					let ifAdd = true;
    					if(currentFunOpt.exp==''){
    						// 如果没有exp，则为添加
    						ifAdd = true;
    					}else{
    						// 如果exp不为空，解析exp，每一组条件之间用&&分割，逻辑与关系
    						let expArr = currentFunOpt.exp.split("&&");
    						for(let j = 0;j < expArr.length;j++){
    							// 每一组条件的格式为	key#eq#value,key$ne#value，eq为等于，ne为不等于
    							let expArgs = expArr[j].split("#");
    							if(expArgs.length==3){
    								if(expArgs[1]=="eq"){
    									if($.inArray(rec[expArgs[0]],[expArgs[2]])<0){
    										ifAdd = false;
    									}
    								}
    								if(expArgs[1]=="ne"){
    									if($.inArray(rec[expArgs[0]],[expArgs[2]])>=0){
    										ifAdd = false;
    									}
    								}
    							}
    						}
    					};
    					if(ifAdd){
    						// 解析js函数
    						optHerf+="[<a href='#' onclick=";
    						let funStrArr = currentFunOpt.funname.split("(");
    						optHerf+=funStrArr[0]+"(";
    						// 解析js函数中的参数
    						let args = funStrArr[1].split(")")
    						if(args[0]!=""){
    							var argArr = args[0].split(",");
    						}
    						for(let j = 0;j < argArr.length-1;j++){
    							optHerf+="'"+rec[argArr[j]]+"',"
    						}
    						optHerf+="'"+rec[argArr[argArr.length-1]]+"'"
    						optHerf+=")>";
    						optHerf+=currentFunOpt.title+"</a>]";
    					};
    				}
    				return optHerf;
    			}
    			let funOptTemp = {field:'optField',title:'操作',align:'center',hidden:false,with:'auto',formatter:formatter,rowspan:bus.getBusData(this.id,'column').length};
    			bus.getBusData(this.id,'column')[0].push(funOptTemp);
    		}
    	},
    	// 初始化表格数据
    	initGrid(){
    		if(this.treegrid){
    			$("#"+this.id).treegrid({
    				columns:bus.getBusData(this.id,'column'),
    				idField:this.idField,
    				treeField:this.treeField,
    				title:this.title,
    				pagination:this.pagination,
    				pageSize:this.pageSize,
    				rownumbers:this.rownumbers,
    				pageNumber:this.pageNumber,
    				pageList:this.pageList,
    				sortName:this.sortName,
    				sortOrder:this.sortOrder,
    				singleSelect:this.singleSelect,
    				striped:this.striped,
    				fit:true,
    				checkOnSelect:this.checkOnSelect
    			});
    		}else{
    			let definedMerges = bus.getBusData(this.id,'definedMerges');
    			let autoMergeField = this.autoMergeField;
    			let optMergeRule = this.optMergeRule;
    			let mergeRefers = bus.getBusData(this.id,'mergeRefers');
    			$("#"+this.id).datagrid({
    				columns:bus.getBusData(this.id,'column'),
    				idField:this.idField,
    				title:this.title,
    				pagination:this.pagination,
    				pageSize:this.pageSize,
    				rownumbers:this.rownumbers,
    				pageNumber:this.pageNumber,
    				pageList:this.pageList,
    				sortName:this.sortName,
    				sortOrder:this.sortOrder,
    				singleSelect:this.singleSelect,
    				striped:this.striped,
    				fit:true,
    				checkOnSelect:this.checkOnSelect,
    				onLoadSuccess: function(data){
              //data是默认的表格加载数据，包括rows和Total
    					for(let j = 0;j<autoMergeField.length;j++){
    						//这里涉及到简单的运算，mark是计算每次需要合并的格子数
    						let mark=1;
    						//循环表格当前的数据
    						for (let i=1; i <data.rows.length; i++) {
    							//后一行的值与前一行的值做比较，相同就需要合并
    							if (data.rows[i][autoMergeField[j]] == data.rows[i-1][autoMergeField[j]]) {
    								mark += 1;
    								$(this).datagrid('mergeCells',{
    									index: i+1-mark,               //datagrid的index，表示从第几行开始合并；紫色的内容需是最精髓的，就是记住最开始需要合并的位置
    									field: autoMergeField[j],      //合并单元格的区域，就是clomun中的filed对应的列
    									rowspan:mark                   //纵向合并的格数，如果想要横向合并，就使用colspan：mark
    								});
    								// 合并操作列
    								if(optMergeRule!=='optField'&&optMergeRule===autoMergeField[j]){
    									$(this).datagrid('mergeCells',{
        									index: i+1-mark,
        									field: 'optField',
        									rowspan:mark
        								});
    								}
    								for(let key in mergeRefers){
    									if(key===autoMergeField[j]){
    										for(let k = 0;k<mergeRefers[key].length;k++){
    											$(this).datagrid('mergeCells',{
    	        									index: i+1-mark,
    	        									field: mergeRefers[key][k],
    	        									rowspan:mark
    	        								});
    										}
    									}
    								}
    							}else{
    								mark=1;                            //一旦前后两行的值不一样了，那么需要合并的格子数mark就需要重新计算
    							}
    						}
		　　　　	}
  					 for(let i=0; i <definedMerges.length; i++){
  					 $(this).datagrid('mergeCells',definedMerges[i]);
    						// 合并操作列
							if(optMergeRule!=='optField'&&optMergeRule===definedMerges[i].field){
								$(this).datagrid('mergeCells',{
									index: definedMerges[i].index,
									field: 'optField',
									rowspan:definedMerges[i].rowspan
								});
							}
  					}
		　　	}
  			});
  		}
  		let p = $('#'+this.id).datagrid('getPager');
			let queryDatagridDataFuname = this.queryDatagridData;
			let queryParams = this.queryParams;
			$(p).pagination({
				beforePageText: '第',//页数文本框前显示的汉字
				afterPageText: '页    共 {pages} 页',
				displayMsg: '当前显示 {from} - {to} 条记录,共 {total} 条记录',
				onSelectPage : function(pageNumber, pageSize) {
					queryParams.pageSize = pageSize;
					queryParams.pageNumber = pageNumber;
					queryDatagridDataFuname();
				}
			});
  	}
  }
}
</script>

<style lang="scss" scoped>
</style>
