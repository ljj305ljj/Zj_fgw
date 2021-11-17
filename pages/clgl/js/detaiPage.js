// 初始化vConsole
// window.vConsole = new window.VConsole({
// 	defaultPlugins: ['system', 'network', 'element', 'storage'], // 可以在此设定要默认加载的面板
// 	maxLogNumber: 1000,
// 	// disableLogScrolling: true,
// 	onReady: function() {
// 		console.info(dd)
// 	  console.log('vConsole is ready.');
// 	},
// 	onClearLog: function() {
// 	  console.log('on clearLog');
// 	}
// });
var userInfo = toArr(App.LS.get('userInfo'));
var listInfo = toArr(App.LS.get("listInfo"));
var attList; 
App.LS.remove("handlefrom");
App.LS.remove("openpdf");
var viewType=App.LS.get('viewType');
//console.log(viewType);
var curPage="infor";
if(viewType=="commonForm"||viewType=="allForm"){
	curPage="newDraft";
}else if(viewType=="draft"){
	curPage="draft";
}else if(viewType=="done"){
	curPage="done";
}
docId="";
var handleType = "";//自定义阅办单类型；
var docPermissionFlag = false;//是否获取表单信息的时候就获取流程权限
//addCookie("callback", "", 7, "/");//回调函数存放在cookie中，，存放再LS中IPHONE7手机有问题。
//传入图片路径，返回base64
window.detailPage=new Vue({ 
	el: '#detailPage',
	data(){
		return{
			tabActive:0,
			tabnum:3,
			swipeable:true,
			tabData:[
				{name:"办理单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
				{name:"文件预览",pageId:"FileRead",loadUrl:"./components/FileReadPage.html",initFlag:"false",datas:[]},
				{name:"查看流程",pageId:"FlowRead",loadUrl:"./components/FlowReadPage.html",initFlag:"false",datas:[]},
				{name:"查看意见",pageId:"opinion",loadUrl:"./components/opinionPage.html",initFlag:"false",datas:[]}
			],
			docInfo:{},
			proPermission:{}//流程权限
		}
	},
	mounted() {
		
	},
	created(){	
		wispApp.UI.showProgressDialog("正在加载页面数据...");
		fontSizeSet.initFontSize();	
		console.info("detailPage");
		listInfo = toArr(App.LS.get("listInfo"));
		if(!isReaded()){//未读文件
			addCookie("callback", "refreshList()", 7, "/");
		}
		var _self=this;
		if(listInfo.pubCategoryName=="公告"){
			_self.tabData=[
				{name:"基本信息",pageId:"BaseInfor",loadUrl:"./components/bbsDetails.html",initFlag:"false",datas:[]},
				{name:"查看反馈",pageId:"FeedBack",loadUrl:"./components/FeedBackPage.html",initFlag:"false",datas:[]},
				{name:"查阅记录",pageId:"QueryHistoryPage",loadUrl:"./components/QueryHistoryPage.html",initFlag:"false",datas:[]}
			]
			_self.$nextTick(function(){
				_self.initLoadPage(0);
			})
			return false;
		}
		var moduleId = "";
		try{
			moduleId = (listInfo.businessNo).toLowerCase();
		}catch(e){
			try{
				moduleId = (listInfo.S_module).toLowerCase();
			}catch(e){}
		}
		if(moduleId=="leave" || moduleId=="overtime" || moduleId=="travel_approval" || moduleId=="car_apply"){
			_self.tabData=[
				{name:"申请单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
				{name:"审批单",pageId:"BaseOpin",loadUrl:"../../components/BaseOpinPage.html",initFlag:"false",datas:[]},
				{name:"文件预览",pageId:"FileRead",loadUrl:"./components/FileReadPage.html",initFlag:"false",datas:[]},
				{name:"查看流程",pageId:"FlowRead",loadUrl:"./components/FlowReadPage.html",initFlag:"false",datas:[]},
				{name:"查看意见",pageId:"opinion",loadUrl:"./components/opinionPage.html",initFlag:"false",datas:[]}
			];
			_self.$nextTick(function(){
				_self.getDocInfor();
			})
		}else if(listInfo.businessDocId || listInfo.docId){
			_self.getDocInfor();
		}else{
			//学习园地
			_self.tabData=[
				{name:"基本信息",pageId:"BaseInfor",loadUrl:"./components/bbsDetails.html",initFlag:"false",datas:[]}
			];					
			_self.$nextTick(function(){
				$(".van-tabs__wrap").eq(0).css("display",'none')
				_self.initLoadPage(0);
			})
			$("title")[0].innerText='学习园地';	
			dd.ready(function(){
				dd.biz.navigation.setTitle({title : '学习园地'});
			})
		}
	},
	methods:{
		getDocInfor:function(){	
			var _self=this;						
			try{var moduleId = (listInfo.businessNo).toLowerCase();}catch(e){var moduleId = (listInfo.S_module).toLowerCase();}
			//console.info(moduleId)
			App.LS.set("module",moduleId);
			var _url= ZjgyHost + ZjgyUrl[moduleId+"-wj"];
			App.LS.remove("docInfor");
			if(listInfo.businessDocId){
				var obj = {docId:listInfo.businessDocId,aid:listInfo.id,id:listInfo.businessDocId};
			}else{
				var obj = {docId:listInfo.id};
			}					
			var tableng = _self.tabnum;
			ajaxRequst(_url,'GET','application/x-www-form-urlencoded','json',obj).then(function(json){
				if(json.form){
					_self.docInfo = json.form;
					App.LS.set("docInfor",JSON.stringify(json.form));
					App.LS.set("docId",json.form.id);
					Forms = json.form;
					_self.getAllFiles();
					if(json.permission){
						docPermissionFlag = true;
						var permission = json.permission;
						App.LS.set("stateBusiness",JSON.stringify(permission.stateBusiness));//环节可操作按钮
						App.LS.set("stateBase",JSON.stringify(permission.stateBase));//当前环节信息
						App.LS.set("flowStatus", permission.flowStatus);//流程状态
						_self.proPermission = permission;
						//App.LS.set("businessOpinion",JSON.stringify(json.stateBusiness.businessOpinion));//环节可操作意见
						App.LS.set("baseAction",JSON.stringify(permission.baseAction));//流程操作
						
					}
				}else{
					if(moduleId=="info"){
						var temp = eval("("+json+")");
						_self.docInfo = temp[0];
						App.LS.set("docInfor",JSON.stringify(temp[0]));
						App.LS.set("docId",temp[0].id);
						Forms = json;
					}else{
						_self.docInfo = json;
						App.LS.set("docInfor",JSON.stringify(json));
						App.LS.set("docId",json.id);
						Forms = json;
					}
					if(json.flowStatus != "finish"){//办结文件不需要获取流程权限
						_self.getProcessPermission(moduleId);//流程权限获取
					}else{
						_self.getAllFiles();
					}
				}
				//if(json.permission==null){json.permission = {};}
				
				/*var leng = json.atts?json.atts.length:0;
				if(leng==0){
					_self.tabData.splice(1,1);
					tableng = tableng-1;
				}*/
				//_self.tabData = defaultTab;
				/*if(curPage=="infor"){
					_self.isEidt= _self.formIsEdit();
					if(_self.isEidt){
						_self.tabData=[
							{name:"基本信息",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
							{name:"上传文件",pageId:"FileList",loadUrl:"./components/FileListPage.html",initFlag:"false",datas:[]},
							{name:"查看流程",pageId:"FlowRead",loadUrl:"./components/FlowReadPage.html",initFlag:"false",datas:[]}
						];
					}
					var leng=json.atts.length;
					if(leng==0 &&  !_self.isEidt){
						_self.tabData.splice(1,1);
						_self.tabnum =tableng-1; 
						tableng = tableng-1;
					}
				}*/
			});
		},	
		tabclick:function(index){
			var _self=this;
			_self.$nextTick(function(){
				_self.initLoadPage(index);
			})
			
		},
		getProcessPermission:function(moduleId){//流程权限获取
			let _self = this;
			var _url= ZjgyHost + ZjgyUrl[moduleId+"-per"];
			var obj = {docId:listInfo.businessDocId};
			ajaxRequst(_url,'get','application/json;charset=UTF-8','json',obj).then(function(json){
				console.log(json);
				App.LS.set("stateBusiness",JSON.stringify(json.stateBusiness));//环节可操作按钮
				App.LS.set("stateBase",JSON.stringify(json.stateBase));//当前环节信息
				_self.proPermission = json;
				App.LS.set("workTodoId",json.workTodoId);
				//App.LS.set("businessOpinion",JSON.stringify(json.stateBusiness.businessOpinion));//环节可操作意见
				App.LS.set("baseAction",JSON.stringify(json.baseAction));//流程操作
				_self.getAllFiles();
			})
		},
		getAllFiles:function(){
			var _self = this;
			var _url = ZjgyHost + ZjgyUrl["File-List"];	
			var data = {
				docId: App.LS.get("docId"),
				type: ["main_doc", "main_trace", "main_ofd", "attach"],
				containFile: false,
				moduleId: ""
			}	
			ajaxRequst(_url,'get','application/json;charset=UTF-8','json',data).then(function(json){
				//console.log(json);
				attList=json;
				if(json.length==0){//没有文件，去掉文件展示页面
					$.each(_self.tabData,function(i,item){
						if(item.pageId=="FileRead"){
							_self.tabData.splice(i,1);
							_self.tabnum =_self.tabData.length; 
							return false;
						}
					})
				}
				_self.$nextTick(function(){
					$.each(_self.tabData,function(i,item){
						_self.initLoadPage(i);
					})
				});
			})
		},
		initLoadPage: function(index){
			var _self=this;
			var _index=index?index:this.tabActive;
			var iniPage = this.tabData[_index];
			if(iniPage.initFlag=="true"){
				console.info("加载过了");
				return false;
			}else{
				// wispApp.UI.showProgressDialog("正在加载页面数据...");
				//console.log("#"+iniPage.pageId)
				console.log(iniPage.loadUrl+"?v="+loadVersion.getVersion(iniPage.pageId));
				$("#"+iniPage.pageId).load(iniPage.loadUrl+"?v="+loadVersion.getVersion(iniPage.pageId),function(){
					//页面加载完成
					// wispApp.UI.dismissProgressDialog();
					_self.tabData[_index].initFlag = "true";
				});				    		
			}					
		},
		continueOperate() {//意见填写完继续办理
			baseCommon.getOpinionList(true);
			// try {
			// 	if($.inArray("send",this.baseAction)>-1 ){
			// 		vFBD.toEvents("jsSend","continue");
			// 	}else if($.inArray("autosend",this.baseAction)>-1){
			// 		jsAutoSend();
			// 	}
			// } catch (error) {
			// 	alert(error);
			// }
		}
	}
});	
/*办理完毕*/
function jsEnd(){	
	App.UI('dialog', {
			type : 'confirm',
			title: 'queren',
			OkTxt: '确认办理完毕',
			CancelTxt: '取消办理完毕',
			msg	 : '是否确定执行办理完毕？'
		},function(_action){
			if(_action==='OK'){
				wispApp.UI.showProgressDialog("提交数据...");
				submitEnd();
			}
		});
}
function submitEnd(){
	var datainfo=eval("("+App.LS.get("docInfor")+")");
	var urlNo="Tbb-"+App.LS.get("module");
	var getUrl=ZjgyHost + ZjgyUrl[urlNo]+"?docId="+datainfo.id+"&workTodoId="+detailPage.proPermission.workTodoId+"&isConverge=true";
	// isConverge Boolean 是	是否汇合（done4join时为true）
	ajaxRequst(getUrl,'get','application/json;charset=UTF-8','json').then(function (submitobj) {
			if(submitobj){
				try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				toast("流程操作成功！",3000);				
				closePage("refreshList()");
				return ;
			}else{
				toast("流程操作失败！",3000);
				try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				return;
			}
		},function(e){
			toast("流程操作失败！",3000);
			try {wispApp.UI.dismissProgressDialog();} catch(e) {}
		})
}
 function jsOver(){
	//办结（结束）
	var datainfo=eval("("+App.LS.get("docInfor")+")");
	App.UI('dialog', {
			type : 'confirm',
			title: 'queren',
			OkTxt: '确认',
			CancelTxt: '取消',
			msg	 : '是否确定结束流程？'
		},function(backflag){
			if(backflag==='OK'){
				try {wispApp.UI.showProgressDialog("正在办结文件");}catch(e){};
				var urlNo="Tbj-"+App.LS.get("module");
				var getUrl=ZjgyHost + ZjgyUrl[urlNo];
				var backdata = [];
				backdata[0] = {
					docId:datainfo.id,
					processId:datainfo.flowProcessId,
					workTodoId:detailPage.proPermission.workTodoId,
					workItemId:detailPage.proPermission.workItemId
				}
				ajaxRequst(getUrl,'post','application/json;charset=UTF-8','json',JSON.stringify(backdata)).then(function (submitobj) {
					if(submitobj){
						try {wispApp.UI.dismissProgressDialog();} catch(e) {}
						toast("办结成功！",3000);				
						closePage("refreshList()");
						return ;
					}else{
						toast("流程操作失败！",3000);
						try {wispApp.UI.dismissProgressDialog();} catch(e) {}
						return;
					}
				},function(e){
					toast("流程操作失败！",3000);
					try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				})
			}
		});
}
//退回文件
function jsFreeReturn(){	
	App.UI('dialog', {
			type : 'confirm',
			title: 'queren',
			OkTxt: '确认退回',
			CancelTxt: '取消退回',
			msg	 : '是否确定退回操作!'
		},function(_action){
			if(_action==='OK'){
				try {wispApp.UI.showProgressDialog();} catch(e){}
				var datainfo=eval("("+App.LS.get("docInfor")+")");
				var getUrl=ZjgyHost + ZjgyUrl["Tth-" + App.LS.get("module")];
				var data = {
					docId:datainfo.id,
					workTodoId:detailPage.proPermission.workTodoId
				}
				ajaxRequst(getUrl,'post','application/json;charset=UTF-8','json',JSON.stringify(data)).then(function (submitobj) {
						try {wispApp.UI.dismissProgressDialog();} catch(e){}
						if(submitobj){
							toast( '流程操作成功！')
							closePage("refreshList()");
							return ;
						}else{
							try {wispApp.UI.dismissProgressDialog();} catch(e){}
							toast( '流程操作失败！')
							return ;
						}
					}, function(e){
						try {wispApp.UI.dismissProgressDialog();} catch(e){}
						toast( '流程操作失败！')
						return ;
					})
			}
		}
	)
}
/*撤办*/
function jsCancle(){	
	App.UI('dialog', {
			type : 'confirm',
			title: 'queren',
			OkTxt: '确认撤办',
			CancelTxt: '取消撤办',
			msg	 : '是否确定撤办？'
		},function(_action){
			if(_action==='OK'){
				wispApp.UI.showProgressDialog("提交数据...");
				submitCancle();
			}
		});
}
function submitCancle(){
	var datainfo=eval("("+App.LS.get("docInfor")+")");
	var urlNo="Tcb-"+App.LS.get("module");
	var getUrl=ZjgyHost + ZjgyUrl[urlNo]+'?docId='+datainfo.id+'&workTodoId='+listInfo.id+'&processId='+datainfo.flowProcessId;
	ajaxRequst(getUrl,'get','application/json;charset=UTF-8','json').then(function (submitobj) {
			if(submitobj){
				try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				toast("流程操作成功！",3000);				
				closePage("refreshList()");
				return ;
			}else{
				toast("流程操作失败！",3000);
				try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				return;
			}
		},function(e){
			toast("流程操作失败！",3000);
			try {wispApp.UI.dismissProgressDialog();} catch(e) {}
		})
}
function submitToReadOver(){
	var datainfo = toArr(App.LS.get('listInfo'));
	var getUrl=ZjgyHost + ZjgyUrl["toReadOver"];
	ajaxRequst(getUrl,'post','application/json;charset=UTF-8','json',JSON.stringify([datainfo.id])).then(function (submitobj) {
			if(submitobj){
				try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				//toast("阅件成功！",3000);
				return ;
			}else{
				try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				return;
			}
		},function(e){
			try {wispApp.UI.dismissProgressDialog();} catch(e) {}
		})
}
function jsAutoSend(){//自动发送
	// App.UI('dialog', {
	// 	type : 'confirm',
	// 	title: 'queren',
	// 	OkTxt: '确认',
	// 	CancelTxt: '取消',
	// 	msg	 : '是否确定执行办理完毕？'
	// },function(_action){
	// 	if(_action==='OK'){
			wispApp.UI.showProgressDialog("提交数据...");
			var datainfo=eval("("+App.LS.get("docInfor")+")");
			var urlNo="Gfs-"+App.LS.get("module");
			var getUrl= ZjgyHost + ZjgyUrl[urlNo] + '?docId='+datainfo.id+'&workTodoId='+ detailPage.proPermission.workTodoId+'&processId='+datainfo.flowProcessId;
			ajaxRequst(getUrl,'get','application/json;charset=UTF-8','json').then(function (sendobj){
					//console.info(obj);
					if(sendobj.length==0){
						toast("未找到下一环节");
						try {wispApp.UI.dismissProgressDialog();} catch(e) {}
						return;
					}else{
						try {wispApp.UI.dismissProgressDialog();} catch(e) {}
						var assigndStates = sendobj[0].assigndStates[0];
						if(sendobj.length==1){
							var todata = {
								docId:docInfor.id,
								workTodoId:detailPage.proPermission.workTodoId,
								transitionLabels:assigndStates.transitionLabel
							};
							ajaxRequst(ZjgyHost + ZjgyUrl["ZDfs-"+App.LS.get("module")],'post','application/json;charset=UTF-8','json',JSON.stringify(todata)).then(function(submitobj){
								if(submitobj){
									try{toast("操作成功！",3000);}catch(e){}
									closePage("refreshList()");
								}else{
									App.UI('dialog', {
										type : 'alert',
										title: 'cuowu',
										msg  : '操作失败！',
										times :3000
									});
								}
							})
						}
						
					}
				},function(e){
					toast("流程操作失败！",3000);
					try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				})
	// 	}
	// });
}		
//页签滑动函数控制 id 滑动对象id，scale缩放大小;
function BackCtrlSwiper(id,scale){
		if(scale<=1){//没有缩放时支持页签左右滑动
			$("#"+id).find(".swiper-wrapper").find(".swiper-slide").removeClass("swiper-no-swiping");
		}else{
			$("#"+id).find(".swiper-wrapper").find(".swiper-slide").addClass("swiper-no-swiping");
		}
	}

var displayCondition={//计算控件是否显示 方法与oa一致
	parseCondition (condition) {
		let res = condition.operator === '&&';
		for (const item of condition.conditions) {
			if (condition.operator === '&&') {
				res = res && this.parseChildExp(item);
				if (res === false) {
					break;
				}
			} else {
				res = res || this.parseChildExp(item);
				if (res === true) {
					break;
				}
			}
		}
		return res;
	},
	equals(str1, str2) {  
		if(str1 == str2)  
		{  
			return true;  
		}  
		return false;  
	}, 
	parseChildExp (item) {
		let res = false;
		if (item.group) {
			res = this.parseCondition(item);
		} else {
			// 表达式或输入控件的值
			const realValue = item.type === 'exp' ? this.runScript(item.comparison) : ($("#"+item.comparison).val());
			const expectedValue = item.type === 'exp' ? this.runScript(item.value) : item.value;
			// 输入控件的值为null, 表达式的值应该为false
			switch (item.operator) {
				case 'in':
					res = this.parseInGrammar(realValue, expectedValue);
					break;
				case 'notin':
					res = this.parseNotinGrammar(realValue, expectedValue);
					break;
				case '==':
					res = displayCondition.equals(realValue, expectedValue);
					break;
				case '!=':
					res = !displayCondition.equals(realValue, expectedValue);
					break;
				case '>':
					res = realValue > expectedValue;
					break;
				case '>=':
					res = realValue >= expectedValue;
					break;
				case '<':
					res = realValue < expectedValue;
					break;
				case '<=':
					res = realValue <= expectedValue;
					break;
				default:
					break;
			}
		}
		return res;
	},
	/**
	* 解析in语法
	* @param inputValue 输入值
	* @param itemValue 条件值
	* @returns {boolean}
	*/
	parseInGrammar (inputValue, itemValue) {
		let res = false;
		// 输入控件的值有条件值中的一项即为true
		if (Array.isArray(itemValue)) {
			// 如果条件值为数组
			for (const a of itemValue) {
				if (includes(inputValue, a)) {
					// 如果包含，即为true，跳出当前循环
					res = true;
					break;
				}
			}
		} else {
			// 如果条件值为其他
			res = includes(inputValue, itemValue);
		}
		return res;
	},
	/**
	* 解析notin语法
	* @param inputValue 输入值
	* @param itemValue 条件值
	* @returns {boolean}
	*/
	parseNotinGrammar (inputValue, itemValue) {
		let res = true;
		// 输入控件的值有条件值中的一项即为false
		if (Array.isArray(itemValue)) {
			// 如果条件值为数组
			for (const a of itemValue) {
				if (includes(inputValue, a)) {
					// 如果包含，即为true，跳出当前循环
					res = false;
					break;
				}
			}
		} else {
			// 如果条件值为其他
		res = !includes(inputValue, itemValue);
		}
		return res;
	},
	runScript (exp) {
		try {
			// eslint-disable-next-line
			const res = eval(exp);
			//console.log(`exp: ${exp} eval result: ${res}`);
			return res;
		} catch (e) {
			console.error(e);
			return null;
		}
	}
}

addvisibListener();
