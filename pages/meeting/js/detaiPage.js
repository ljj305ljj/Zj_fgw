// 初始化vConsole
/* window.vConsole = new window.VConsole({
	defaultPlugins: ['system', 'network', 'element', 'storage'], // 可以在此设定要默认加载的面板
	maxLogNumber: 1000,
	// disableLogScrolling: true,
	onReady: function() {
		console.info(dd)
	  console.log('vConsole is ready.');
	},
	onClearLog: function() {
	  console.log('on clearLog');
	}
}); */
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
				{name:"相关资源",pageId:"FileResource",loadUrl:"./components/FileResourcePage.html",initFlag:"false",datas:[]},
				{name:"查看意见",pageId:"opinion",loadUrl:"./components/opinionPage.html",initFlag:"false",datas:[]},
				{name:"查看流程",pageId:"FlowRead",loadUrl:"./components/FlowReadPage.html",initFlag:"false",datas:[]}
			],
			docInfo:{},
			proPermission:{},//流程权限
			getFilesTimes:0
			//baseAction:[],//流程操作
			//stateBusiness:[]//环节权限，包括环节可操作按钮和环节可操作意见
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
		console.log(listInfo)
		console.log("HHHH"+listInfo.businessName)
		try{var moduleId = (listInfo.businessNo).toLowerCase();}catch(e){
			if(listInfo.S_module){
				var moduleId = listInfo.S_module.toLowerCase();
			}else if(listInfo.flowLabel){//会议模块
				var moduleId = listInfo.flowLabel;
			}else if(listInfo.isUrge){//督查督办
				var moduleId = "URGER";
			}
		}
		console.log(moduleId)
		if(moduleId=="leave" || moduleId=="overtime" || moduleId=="travel_approval"){
			_self.tabData=[
				{name:"申请单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
				{name:"办理单",pageId:"BaseOpin",loadUrl:"./components/BaseOpinPage.html",initFlag:"false",datas:[]},
				{name:"查看流程",pageId:"FlowRead",loadUrl:"./components/FlowReadPage.html",initFlag:"false",datas:[]}
			];
			_self.$nextTick(function(){
				_self.getDocInfor();
			})
		}else if(listInfo.businessDocId || listInfo.flowProcessId || listInfo.id){
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
			try{var moduleId = (listInfo.businessNo).toLowerCase();}catch(e){
				if(listInfo.S_module){
					var moduleId = listInfo.S_module.toLowerCase();
				}else if(listInfo.flowLabel){//会议模块
					var moduleId = listInfo.flowLabel;
				}else if(listInfo.urgerId){//督查督办
					var moduleId = "URGER";
				}
			}
			console.info("GGGGGGG"+moduleId)
			App.LS.set("module",moduleId);
			/*新增会议模块判断----------------*/
			if(moduleId=="meeting"){
				var businessName = listInfo.businessName || listInfo.type;
				var meetingType="";
				switch (businessName){
					case "大型会议":
						meetingType = "LARGE";
						break;
					case "党组会议":
					case "主任办公会议":
						meetingType = "OFFICE";
						break;
					case "码上办会":
						meetingType = "DO_ONE";
						break;
					default:
						meetingType = "SPECIAL";
						break;
				}
				App.LS.set("meetingType",meetingType);
			}
			if(moduleId == "meeting_external" || App.LS.get("meetingType") == "OFFICE"){//外部会议、党组、主任办公会议无【相关资源】
				_self.tabData = [
					{name:"办理单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
					{name:"文件预览",pageId:"FileRead",loadUrl:"./components/FileReadPage.html",initFlag:"false",datas:[]},
					//{name:"相关资源",pageId:"FileResource",loadUrl:"./components/FileResourcePage.html",initFlag:"false",datas:[]},
					{name:"查看意见",pageId:"opinion",loadUrl:"./components/opinionPage.html",initFlag:"false",datas:[]},
					{name:"查看流程",pageId:"FlowRead",loadUrl:"./components/FlowReadPage.html",initFlag:"false",datas:[]}
				]
			}
			/*---------------新增会议模块判断*/
			var _url= ZjgyHost + ZjgyUrl[moduleId+"-wj"];
			if(meetingType == "OFFICE"){
				var _url= ZjgyHost + ZjgyUrl[moduleId+"_dzhy-wj"];
			}
			console.log(_url)
			App.LS.remove("docInfor");
			App.LS.remove("docId");
			// App.LS.remove("docInfor2");
			// App.LS.remove("docId2");
			// App.LS.remove("flowStatus");
			// App.LS.remove("stateBusiness");
			// App.LS.remove("stateBase");
			// App.LS.remove("baseAction");
			if(listInfo.businessDocId){
				var obj = {docId:listInfo.businessDocId,aid:listInfo.id,id:listInfo.businessDocId};
			}else{
				if(moduleId == "meeting_external"){
					var obj = {docId:listInfo.id};
				}else{
					var obj = {id:listInfo.id};
				}
				
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
					_self.getAllFiles(App.LS.get("docId"));
				}else{	
					if(moduleId=="info"){
						var temp = eval("("+json+")");
						_self.docInfo = temp[0];
						App.LS.set("docInfor",JSON.stringify(temp[0]));
						App.LS.set("docId",temp[0].id);
						Forms = json;
					}else{
						if(json.meetingForm){
							_self.docInfo = json.meetingForm;
							if(json.issueList){ 
								_self.docInfo.issueList = json.issueList; 
								$.each(json.issueList,function(i,issue){
									_self.getAllFiles(issue.id);
								})
								
							}
							App.LS.set("docInfor",JSON.stringify(_self.docInfo));
							json.meetingForm.id?App.LS.set("docId",json.meetingForm.id):App.LS.set("docId",json.meetingForm.docId);
							Forms = _self.docInfo;
							FormsInit = _self.docInfo;
							
						}else{
							_self.docInfo = json;
							App.LS.set("docInfor",JSON.stringify(json));
							json.id?App.LS.set("docId",json.id):App.LS.set("docId",json.docId);
							Forms = json;
							FormsInit = json;
							if(meetingType == "DO_ONE"){//码上办会
								_self.getMeetingPayIssuedById(moduleId);
							}
						}
					}
					
					//_self.getProcessPermission(moduleId);//流程权限获取
					if(json.flowStatus != "finish"){//办结文件不需要获取流程权限
						_self.getProcessPermission(moduleId);//流程权限获取
					}else{
						//baseCommon.getOpinionList();
						_self.getAllFiles(App.LS.get("docId"));
						
					}
				}
				
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
			var obj = listInfo.businessDocId?{docId:listInfo.businessDocId}:{docId:listInfo.id};
			ajaxRequst(_url,'get','application/json;charset=UTF-8','json',obj).then(function(json){
				console.log(json);
				App.LS.set("stateBusiness",JSON.stringify(json.stateBusiness));//环节可操作按钮
				App.LS.set("stateBase",JSON.stringify(json.stateBase));//当前环节信息
				App.LS.set("flowStatus", json.flowStatus);//流程状态
				_self.proPermission = json;
				App.LS.set("workTodoId",json.workTodoId);
				//App.LS.set("businessOpinion",JSON.stringify(json.stateBusiness.businessOpinion));//环节可操作意见
				App.LS.set("baseAction",JSON.stringify(json.baseAction));//流程操作
				_self.getAllFiles(App.LS.get("docId"));
			})
		},
		getAllFiles:function(docId){
			var _self = this;
			var _url = ZjgyHost + ZjgyUrl["File-List"];	
			var data = {
				docId: docId,
				type: ["main_doc", "main_trace", "main_ofd", "main_pdf", "attach", "faircom_self_doc", "doc_self_doc", "affair_attach"],
				containFile: false,
				moduleId: ""
			}
			ajaxRequst(_url,'get','application/json;charset=UTF-8','json',data).then(function(json){
				//console.log(json);
				_self.getFilesTimes ++;
				if(typeof(attList) == "undefined"){
					attList = json;
				}else{
					attList = attList.concat(json);
				}
				//attList=json;
				if( (attList && attList.length==0 && !_self.docInfo.issueList)  || (attList && attList.length==0 && _self.docInfo.issueList && _self.getFilesTimes == _self.docInfo.issueList.length + 1)){//没有文件，去掉文件展示页面
					$.each(_self.tabData,function(i,item){
						if(item.pageId=="FileRead"){
							_self.tabData.splice(i,1);
							_self.tabnum =_self.tabData.length; 
							return false;
						}
					})
				}
				_self.$nextTick(function(){
					if(!_self.docInfo.issueList || (_self.docInfo.issueList && _self.docInfo.issueList.length + 1 == _self.getFilesTimes)){
						$.each(_self.tabData,function(i,item){
							_self.initLoadPage(i);
						})
					}
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
			try {
				if($.inArray("send",this.baseAction)>-1 ){
					vFBD.toEvents("jsSend","continue");
				}else if($.inArray("autosend",this.baseAction)>-1){
					jsAutoSend();
				}
			} catch (error) {
				toast(error);
			}
		},
		getMeetingPayIssuedById:function(moduleId){//码上办会-获取预算信息
			let _self = this;
			var _url= ZjgyHost + ZjgyUrl[moduleId+"-pay"];
			var obj = listInfo.businessDocId?{docId:listInfo.businessDocId}:{docId:listInfo.id};
			ajaxRequst(_url,'get','application/json;charset=UTF-8','json',obj).then(function(json){
				Forms.approvedNumber = json.approvedNumber;
				Forms.amount = json.amount;
				Forms.businessType = json.businessType;
			})
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
				closePage("location.reload()");
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
							if(App.LS.get("opinionContent")){ todata.opinionContent = encodeURI(App.LS.get("opinionContent")); } 
							App.LS.remove("opinionContent");
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
