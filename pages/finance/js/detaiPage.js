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
//addCookie("callback", "", 7, "/");//回调函数存放在cookie中，，存放再LS中IPHONE7手机有问题。
var docInfor = toArr(App.LS.get("docInfor"));
//传入图片路径，返回base64
window.detailPage=new Vue({ 
	el: '#detailPage',
	data(){
		return{
			btnArrs:[],
			tabActive:0,
			tabnum:3,
			swipeable:true,
			tabData:[
				{name:"基本信息",pageId:"bbsdetails",loadUrl:"./components/bbsDetails.html",initFlag:"false",datas:[]},
			],
			docInfo:{},
			proPermission:{}//流程权限
			//baseAction:[],//流程操作
			//stateBusiness:[]//环节权限，包括环节可操作按钮和环节可操作意见
		}
	},
	mounted() {
		
	},
	created(){	
		// wispApp.UI.showProgressDialog("正在加载页面数据...");
		console.info("detailPage");
		listInfo = toArr(App.LS.get("listInfo"));
		if(!isReaded()){//未读文件
			addCookie("callback", "refreshList()", 7, "/");
		}
		var _self=this;
		var moduleId = 'finance';
		// _self.tabData=[
		// 	{name:"基本信息",pageId:"bbsdetails",loadUrl:"./components/bbsDetails.html",initFlag:"false",datas:[]},
		// ];
	
		_self.getDocInfor();
	
	},
	methods:{
		toEvents: function(name,thisObj){
			console.log(name);
			//closePage();
			if(name=="jsEnd" || name=="jsOver" || name=="jsFreeReturn" || name=="jsCancle" || name=="startProcess" || name=="saveForm"){
				eval("("+name+"())");
			}else{
				App.LS.set("flowType",name);
				OpenWebView("/FlowBoxPage.html");
			}
		},
		initBtnData : function(){
			//this.btnArrs = detailCommon.InitFlowBtn(docInfor);
			var item = toArr(App.LS.get("docInfor"));							
			let stateBusiness = detailPage.proPermission.stateBusiness;
			console.log(stateBusiness);
			let businessHandle = [];//环节可操作按钮
			$.each( stateBusiness.businessHandle,function(h,handle){
				businessHandle.push(handle.handleNo);
			})

			let baseAction = [];
			$.each(toArr(App.LS.get("baseAction")),function(i,action){
				baseAction.push(action.split("|")[1]);
			})
			
			console.log(baseAction);
			var btns=[];
			var formisEdit=false;
			/*if(curPage!="newDraft"){
				formisEdit=this.formIsEdit();
			}	
			if(formisEdit)btns.push({btnName:"保存",iconCss:"icon-save",toEvent:"saveForm"});
			if(docInfor.form && docInfor.form.flowStatus=="0")btns.push({btnName:"启用流程",iconCss:"icon-save",toEvent:"startProcess"});
			if(detailPage.docstatus()=="done")btns.push({btnName:"取消办结",iconCss:"icon-tuihui",toEvent:"cancleFinished"});*/
			//console.log(btns);
			//if(!item.permission){this.btnArrs = btns;return false;}
			//try{var isPizhu=item.permission.business.buttons;}catch(e){var isPizhu='';}
			//try{var UnitButton=item.permission.actions.split(',');}catch(e){var UnitButton=[];}businessHandle
			//if(item.permission.astatus=="1"||item.permission.astatus=="0"){							
				if($.inArray("pdfNotation",businessHandle)>-1){
					//_MenuList.push('<a class="bottom-3nav-box" onclick=pdfFileList()><span class="iconfont icon-piyue"></span><p>正文批注</p></a>');
					//hasNotationBtn=true;
					haveSignbtn = true;
					//btns.push({btnName:"手写签批",iconCss:"icon-piyue",toEvent:"pdfNotation"});
				}
				if($.inArray("send",baseAction)>-1){
					//发送
					btns.push({btnName:"发送",iconCss:"icon-fasong",toEvent:"jsSend"});
				}
				if($.inArray("freedomSend",baseAction)>-1){
					//自由流发送
					btns.push({btnName:"发送",iconCss:"icon-fasong",toEvent:"jsSendfreedom"});
				}
				if($.inArray("transfer",baseAction)>-1){
					//转办
					btns.push({btnName:"转办",iconCss:"icon-zhuanfa",toEvent:"jsPass"});
				}			
				if($.inArray("return",baseAction)>-1 || $.inArray("returnPre",baseAction)>-1){
					//退回
					btns.push({btnName:"退回",iconCss:"icon-tuihui",toEvent:"jsReturn"});
				}
				if($.inArray("returnPre",businessHandle)>-1 || $.inArray("returnPre",baseAction)>-1){
					//退还
					btns.push({btnName:"退还",iconCss:"icon-tuihui",toEvent:"jsFreeReturn"});
				}
				if($.inArray("forcefinish",baseAction)>-1 ){
					//办结
					btns.push({btnName:"办结",iconCss:"icon-chuliwancheng",toEvent:"jsOver"});
				}
				if( $.inArray("finish",baseAction)>-1){
					//办理完毕
					btns.push({btnName:"办理完毕",iconCss:"icon-chuliwancheng",toEvent:"jsEnd"});
				}
			//}
			
			if( $.inArray("cancel",baseAction)>-1){
				//撤办
				btns.push({btnName:"撤办",iconCss:"icon-chuliwancheng",toEvent:"jsCancle"});
			}
			this.btnArrs = btns;
			//detailCommon.getCollecFlag(this.btnArrs);
		},
		getDocInfor:function(){	
			var _self=this;						
		  var moduleId = 'finance'
			//console.info(moduleId)
			App.LS.set("module",moduleId);
			var _url= ZjgyHost + ZjgyUrl[moduleId+"-wj"];
			App.LS.remove("docInfor");
			if(listInfo.businessDocId){
				var obj = {docId:listInfo.businessDocId,aid:listInfo.id,id:listInfo.businessDocId};
			}else{
				var obj = {docId:listInfo.id};
			}
			if(moduleId == 'transfer'){
				var obj = {docId:listInfo.businessDocId,businessNo:''};
			}
			if(moduleId == 'finance'){
				var obj = {id:listInfo.id};
			}
			var tableng = _self.tabnum;
			ajaxRequst(_url,'GET','application/x-www-form-urlencoded','json',obj).then(function(json){
				if(json.permission){
					_self.docInfo = json.form;
					App.LS.set("docInfor",JSON.stringify(json.form));
					App.LS.set("docId",json.form.id);
					Forms = json.form;
					var permission = json.permission;
					App.LS.set("stateBusiness",JSON.stringify(permission.stateBusiness));//环节可操作按钮
					App.LS.set("stateBase",JSON.stringify(permission.stateBase));//当前环节信息
					App.LS.set("flowStatus", permission.flowStatus);//流程状态
					_self.proPermission = permission;
					//App.LS.set("businessOpinion",JSON.stringify(json.stateBusiness.businessOpinion));//环节可操作意见
					App.LS.set("baseAction",JSON.stringify(permission.baseAction));//流程操作
					_self.getAllFiles();
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
					_self.$nextTick(function(){
						$.each(_self.tabData,function(i,item){
							_self.initLoadPage(0);
						})
					});
					//_self.getProcessPermission(moduleId);//流程权限获取
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
				App.LS.set("flowStatus", permission.flowStatus);//流程状态
				_self.proPermission = json;
				App.LS.set("workTodoId",json.workTodoId);
				//App.LS.set("businessOpinion",JSON.stringify(json.stateBusiness.businessOpinion));//环节可操作意见
				App.LS.set("baseAction",JSON.stringify(json.baseAction));//流程操作
				_self.getAllFiles();
				_self.initBtnData();
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
				wispApp.UI.showProgressDialog("正在加载页面数据...");
				//console.log("#"+iniPage.pageId)
				console.log(iniPage.loadUrl+"?v="+loadVersion.getVersion(iniPage.pageId));
				$("#"+iniPage.pageId).load(iniPage.loadUrl+"?v="+loadVersion.getVersion(iniPage.pageId),function(){
					//页面加载完成	
					wispApp.UI.dismissProgressDialog();
					_self.tabData[_index].initFlag = "true";
				});				    		
			}					
		},
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
//退还文件
function jsFreeReturn(){	
	App.UI('dialog', {
			type : 'confirm',
			title: 'queren',
			OkTxt: '确认退还',
			CancelTxt: '取消退还',
			msg	 : '是否确定退还操作!'
		},function(_action){
			if(_action==='OK'){
				try {wispApp.UI.showProgressDialog();} catch(e){}
				var datainfo=eval("("+App.LS.get("docInfor")+")");
				var getUrl=ZjgyHost + ZjgyUrl["Thuan-request"];
				ajaxRequst(getUrl,'post','application/json;charset=UTF-8','json',JSON.stringify({aid:datainfo.permission.aid,docId:datainfo.form.id})).then(function (submitobj) {
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
