// 初始化vConsole
//  window.vConsole = new window.VConsole({
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
//传入图片路径，返回base64
window.detailPage=new Vue({ 
	el: '#detailPage',
	data(){
		return{
			tabActive:0,
			tabnum:3,
			swipeable:true,
			tabData:[
				{name:"任务反馈",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
				//{name:"协办反馈",pageId:"OrgFeedBack",loadUrl:"./components/OrgFeedBackPage.html",initFlag:"false",datas:[]},
				{name:"文件预览",pageId:"FileRead",loadUrl:"./components/FileReadPage.html",initFlag:"false",datas:[]},
				//{name:"相关资源",pageId:"FileResource",loadUrl:"./components/FileResourcePage.html",initFlag:"false",datas:[]},
				{name:"查看意见",pageId:"opinion",loadUrl:"./components/opinionPage.html",initFlag:"false",datas:[]},
				//{name:"查看流程",pageId:"FlowRead",loadUrl:"./components/FlowReadPage.html",initFlag:"false",datas:[]}
			],
			docInfo:{},
			proPermission:{},//流程权限
			getFilesTimes:0,
			taskSignId:""
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
			}else if(listInfo.urgerId){//督查督办
				var moduleId = "URGER";
			}
		}
		console.log(moduleId)
		if(moduleId=="majorurger" || moduleId=="listurger"){//委重点工作督查
			_self.tabData=[
				{name:"任务反馈",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
				//{name:"协办反馈",pageId:"OrgFeedBack",loadUrl:"./components/OrgFeedBackPage.html",initFlag:"false",datas:[]},
				{name:"文件预览",pageId:"FileRead",loadUrl:"./components/FileReadPage.html",initFlag:"false",datas:[]},
				//{name:"相关资源",pageId:"FileResource",loadUrl:"./components/FileResourcePage.html",initFlag:"false",datas:[]},
				//{name:"查看意见",pageId:"opinion",loadUrl:"./components/opinionPage.html",initFlag:"false",datas:[]},
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
					default:
						meetingType = "SPECIAL";
						break;
				}
				App.LS.set("meetingType",meetingType);
			}
			
			/*---------------新增会议模块判断*/
			var _url= ZjgyHost + ZjgyUrl[moduleId+"-wj"];
			if(meetingType == "OFFICE"){
				var _url= ZjgyHost + ZjgyUrl[moduleId+"_dzhy-wj"];
			}
			console.log(_url)
			App.LS.remove("docInfor");
			App.LS.remove("docId");
			if(listInfo.businessDocId){
				var obj = {docId:listInfo.businessDocId,aid:listInfo.id,id:listInfo.businessDocId};
			}else{
				if(moduleId=="urgerreport" && listInfo.taskId){
					var obj = {taskId:listInfo.taskId};
				}else if( moduleId == "meeting_external" || moduleId == "majorurger" || moduleId=="listurger"){
					var obj = {docId:listInfo.id};
				}else{
					var obj = {id:listInfo.id};
				}
				
			}				
			ajaxRequst(_url,'GET','application/x-www-form-urlencoded','json',obj).then(function(json){
				_self.docInfo = json;
				App.LS.set("docInfor",JSON.stringify(json));
				App.LS.set("docId",json.urgerId);
				Forms = json;
				FormsInit = json;
				_self.getNodeFeedbackAttachs();
				if(moduleId=="urgerreport" && listInfo.taskId){
					_self.taskSignId = _self.urgerTaskSignUnit().taskId;
					_self.getAllFiles(App.LS.get("docId"));
				}else{
					if(json.flowStatus != "finish"){//办结文件不需要获取流程权限
						_self.getProcessPermission(moduleId);//流程权限获取
					}else{
						_self.getAllFiles(App.LS.get("docId"));
					}
					//_self.getProcessPermission(moduleId);
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
			var _url = ZjgyHost + ZjgyUrl["urger-filelist"];	
			var data = {
				docId: docId,
				type: ["main_doc", "main_trace", "main_ofd", "main_pdf", "attach", "faircom_self_doc", "doc_self_doc", "affair_attach"],
				containFile: false,
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
				if( attList && attList.length==0 &&  _self.getFilesTimes == _self.feedbacksTimes + 1){//没有文件，去掉文件展示页面
					$.each(_self.tabData,function(i,item){
						if(item.pageId=="FileRead"){
							_self.tabData.splice(i,1);
							_self.tabnum =_self.tabData.length; 
							return false;
						}
					})
				}
				_self.$nextTick(function(){
					if( _self.getFilesTimes == _self.feedbacksTimes + 1 ){
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
		// 当前办理单位
		urgerTaskSignUnit(){
			let urgerTaskSignUnit = {};
			this.docInfo.urgerTaskSignUnits.forEach((item)=>{
				if (item.handleObjectNo == userInfo.orgNo){ //todo:
					urgerTaskSignUnit = item;
				}
			});
			return urgerTaskSignUnit;
		},
		//获取最新一个节点的对应反馈件
        getLastNodeFeedback(){
			if (!this.docInfo || !this.docInfo.urgerTaskNodes) {
				return '';
			}
			//console.log(this.docInfo);
			let node = this.docInfo.urgerTaskNodes[this.docInfo.urgerTaskNodes.length - 1];
			//console.log(node);
            let currObjectFeedback = null;

            if (node.urgerTaskFeedbacks.length > 0){
                node.urgerTaskFeedbacks.forEach((item)=>{
                    if (item.handleObjectNo == userInfo.orgNo){ //todo:
                        currObjectFeedback = item;
                    }
                });
            }
            return currObjectFeedback;
        },
		//获取最新一个节点的对应反馈件Id
		getLastNodeFeedbackId(){
			
			if (!this.docInfo || !this.docInfo.urgerTaskNodes) {
				return '';
			}
			console.log(this.docInfo);
			let node = this.docInfo.urgerTaskNodes[this.docInfo.urgerTaskNodes.length - 1];
			console.log(node);
			let currObjectFeedbackId = '';

			if (node.urgerTaskFeedbacks.length > 0){
				node.urgerTaskFeedbacks.forEach((item)=>{
					if (item.handleObjectNo == userInfo.orgNo){ //todo:
						currObjectFeedbackId = item.id;
					}
				});
			}
			return currObjectFeedbackId;
		},
		updateFeedbackStatus(status,promptMessage){
            let message = promptMessage ? promptMessage : '反馈成功';
            let feedbackForm = {
                id: this.getLastNodeFeedbackId(),
                signId: this.taskSignId,
                feedbackStatus: status
            };
			let _url = ZjgyHost + ZjgyUrl["update-UTF"];
			
			ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(feedbackForm)).then((res) => {
				if (res) {
                   // this.$message.success(message);
				   toast(message, 2000);
                    //更新操作记录表附件
					let data = {
						signId: this.taskSignId,
						operateContent: message
					}
					let _inurl =  ZjgyHost + ZjgyUrl["insert-UOR"];
					ajaxRequst(_inurl, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(data)).then((res) => {
						if (res) {
							console.log(res);
							closePage('closePage("refreshList()")');
						}
					})
                    
                }
			})
        },
		getNodeFeedbackAttachs(){
			let _self = this;
			_self.feedbacksTimes = 0;
			if (!this.docInfo || !this.docInfo.urgerTaskNodes) {
				return '';
			}
			this.docInfo.urgerTaskNodes.forEach(node => {
				if (node.urgerTaskFeedbacks.length > 0){
					node.urgerTaskFeedbacks.forEach((item)=>{
						//if (item.handleObjectNo == userInfo.orgNo){ //todo:
							_self.feedbacksTimes ++;
							_self.getAllFiles(item.id);
						//}
					});
				}
			})
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
						if(sendobj.length==1 ){
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

function jsFeedBackComplete(){
	detailPage.updateFeedbackStatus('6','反馈完成');
}
function jsResetSignUser(){//退回
	App.UI('dialog', {
		type : 'confirm',
		title: 'queren',
		OkTxt: '确认退回',
		CancelTxt: '取消',
		msg	 : '是否确定退回？'
	},function(_action){
		if(_action==='OK'){
			wispApp.UI.showProgressDialog("提交数据...");
			assignSignUserImpl('','','0',userInfo.userName+'退回给处长分发');
		}
	});
}

function assignSignUserImpl(userName,userNo,signStatus,operateContent){
	let _this = this;
	let form = {};
	form.id = this.taskSignId;
	form.signUserName = userName;
	form.signUserNo = userNo;
	form.signStatus = signStatus;//状态修改已签收
	form.signTime = new Date().getTime();
	form.isRead = 0;
	let _url = ZjgyHost + ZjgyUrl["update-UTSU"];
	ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(form)).then((res) => {
		if (res) {
			console.log(res);
			//新增操作记录表
			let message = operateContent ? operateContent : '转发给'+userName;
			toast(message, 2000);
			insertUrgerOperateRecord(message);
			
		}
	});
}

function insertUrgerOperateRecord(message){
	//更新操作记录表附件
	let data = {
	   signId: this.taskSignId,
	   operateContent: message
   }
   let _inurl =  ZjgyHost + ZjgyUrl["insert-UOR"];
   ajaxRequst(_inurl, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(data)).then((res) => {
	   if (res) {
		   console.log(res);
		   closePage('closePage("refreshList()")');
	   }
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
