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
//var listInfo = toArr(App.LS.get("listInfo"));
if(location.search.indexOf("x-auth-token=") > -1){
	//orgNo，orgName,phone,userName,userId,systemNo
	//alert(location.search)
	addCookie("x-auth-token", decodeURIComponent(getUrlParam("x-auth-token")), 7, "/");
	App.LS.remove("listInfo");
	App.LS.remove("viewType");
	if(!App.LS.get('userInfo')){
		userInfo = {
			orgNo: getUrlParam("orgNo"),
			orgName: decodeURIComponent(getUrlParam("orgName")),
			phone: getUrlParam("phone"),
			userName: decodeURIComponent(getUrlParam("userName")),
			userId: getUrlParam("userId"),
			systemNo: getUrlParam("systemNo")
		}
		App.LS.set('userInfo',JSON.stringify(userInfo));
	}
	listInfo = {
		"id":getUrlParam("id")  || "",
		"businessNo":getUrlParam("businessNo") || "",
		"businessDocId":getUrlParam("businessDocId") || "",
		// "readType":getUrlParam("readType") || "",
		// "isRead":getUrlParam("isRead") || "",
		// "docId":getUrlParam("docId") || "",
		// "moduleId":getUrlParam("moduleId") || "",
		// "status":getUrlParam("status") || "",
	}
	App.LS.set("listInfo",JSON.stringify(listInfo));
}/*else if(location.search.indexOf("readType=") > -1){//阅件
	listInfo = {
		"readType":getUrlParam("readType"),
		"isRead":getUrlParam("isRead")
	}
	App.LS.set("listInfo",JSON.stringify(listInfo));
}*/else{
	listInfo = toArr(App.LS.get("listInfo"));
}  
var attList = [], attList2 = []; 
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
				{name:"处理单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
				{name:"文件预览",pageId:"FileRead",loadUrl:"./components/FileReadPage.html",initFlag:"false",datas:[]},
				{name:"相关资源",pageId:"FileResource",loadUrl:"./components/FileResourcePage.html",initFlag:"false",datas:[]},
				{name:"查看流程",pageId:"FlowRead",loadUrl:"./components/FlowReadPage.html",initFlag:"false",datas:[]},
				{name:"查看意见",pageId:"opinion",loadUrl:"./components/opinionPage.html",initFlag:"false",datas:[]}	
			],
			docInfo:{},
			btnArrs:[],
			proPermission:{},//流程权限
			getFilesTimes:0,
			opinionSync:[],//意见同步对应表
			relopinionSyncListReceival:[],//需同步的收文意见列表
			relopinionSyncListDipatch:[],//需同步的发文意见列表
			docResource:[],//参考材料
			FilewordList:[],
			opinionToRead:[],//待阅填写意见的意见类型

			/*如下参数为已阅按钮使用*/
			opinionContent: '',
			opinionCode: '',
			opinionCodeName: '',
			orgName: userInfo.orgName ? userInfo.orgName.substring(userInfo.orgName.lastIndexOf("/") + 1) : userInfo.orgNo,
			baseAction:[],//操作按钮
		}
	},
	mounted() {
		
	},
	created(){	
		wispApp.UI.showProgressDialog("正在加载页面数据...");
		fontSizeSet.initFontSize();	
		listInfo = toArr(App.LS.get("listInfo"));
		var _self=this;
		if(!isReaded()){//未读文件
			addCookie("callback", "refreshList()", 7, "/");
		}
		if(listInfo.readType && listInfo.isRead == "0"){//待阅
			_self.getOpinionToReadByCondition();
		}
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
			moduleId = (listInfo.businessNo || listInfo.S_module || listInfo.source).toLowerCase();
		}catch(e){
			try{
				moduleId = (listInfo.S_module).toLowerCase();
			}catch(e){}
		}
		if(moduleId=="leave" || moduleId=="overtime" || moduleId=="travel_approval"){
			_self.tabData=[
				{name:"审批单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
				//{name:"办理单",pageId:"BaseOpin",loadUrl:"./components/BaseOpinPage.html",initFlag:"false",datas:[]},
				{name:"文件预览",pageId:"FileRead",loadUrl:"./components/FileReadPage.html",initFlag:"false",datas:[]},
				{name:"查看流程",pageId:"FlowRead",loadUrl:"./components/FlowReadPage.html",initFlag:"false",datas:[]}
			];
			_self.$nextTick(function(){
				_self.getDocInfor();
			})
		}else if(listInfo.businessDocId || listInfo.docId){
			if(moduleId == "dispatch"){
				_self.tabData[0].name = "发文单";
			}else if(moduleId == "receival"){
				_self.tabData[0].name = "收文单";
			}else if(moduleId == "special_work"){//专班工作
				_self.tabData[0].name = "专班稿";
			}
			_self.getDocInfor();
		}else if(listInfo.id){
			_self.getDocInfor();
		}else{
			//学习园地
			_self.tabData=[
				{name:"基本信息",pageId:"BaseInfor",loadUrl:"./components/bbsDetails.html",initFlag:"false",datas:[]},
			];					
			_self.$nextTick(function(){
				$(".van-tabs__wrap").eq(0).css("display",'none')
				_self.initLoadPage(0);
			})
			$("title")[0].innerText='学习园地';	
			dd.ready(function(){
				dd.setTitle({title : '学习园地'});
			})
		}
	},
	methods:{
		getDocInfor:function(){	
			var _self=this;						
			try{var moduleId = (listInfo.businessNo || listInfo.S_module || listInfo.source || listInfo.moduleId ).toLowerCase();}catch(e){var moduleId = "";}
			//console.info(moduleId)
			App.LS.set("module",moduleId);
			var _url= ZjgyHost + ZjgyUrl[moduleId+"-wj"];
			App.LS.remove("docInfor");
			App.LS.remove("docId");
			App.LS.remove("docInfor2");
			App.LS.remove("docId2");
			App.LS.remove("flowStatus");
			App.LS.remove("stateBusiness");
			App.LS.remove("stateBase");
			App.LS.remove("baseAction");
			if(listInfo.businessDocId){
				var obj = {docId:listInfo.businessDocId,id:listInfo.businessDocId};
			}else if(listInfo.docId){
				var obj = {docId:listInfo.docId};
			}else if(listInfo.fileDocId){//省领导批示督办
				var obj = {docId:listInfo.fileDocId};
			}else if(listInfo.resourceId){//文档中心-文件资料
				var obj = {docId:listInfo.resourceId};
				if(listInfo.isHistoryFile == "yes"){
					_url= ZjgyHost + ZjgyUrl["resourse-wj"];
					obj = {id:listInfo.id};
				}
			}else{
				var obj = {docId:listInfo.id};
			}					
			var tableng = _self.tabnum;
			ajaxRequst(_url,'GET','application/x-www-form-urlencoded','json',obj).then(function(json){
				if(json.permission){
					_self.docInfo = json.form;
					App.LS.set("docInfor",JSON.stringify(json.form));
					App.LS.set("docId",json.form.id);
					docInfor = json.form;
					Forms1 = json.form;
					docPermissionFlag = true; 
					var permission = json.permission;
					App.LS.set("stateBusiness",JSON.stringify(permission.stateBusiness));//环节可操作按钮
					App.LS.set("stateBase",JSON.stringify(permission.stateBase));//当前环节信息
					App.LS.set("flowStatus", permission.flowStatus);//流程状态
					_self.proPermission = permission;
					//App.LS.set("businessOpinion",JSON.stringify(json.stateBusiness.businessOpinion));//环节可操作意见
					App.LS.set("baseAction",JSON.stringify(permission.baseAction));//流程操作
					_self.initBtnData();
					//_self.getAllFiles(json.form.id);
					
				}else{
					if(moduleId=="info"){
						var temp = eval("("+json+")");
						_self.docInfo = temp[0];
						App.LS.set("docInfor",JSON.stringify(temp[0]));
						App.LS.set("docId",temp[0].id);
						docInfor = json;
						Forms1 = json;
					}else{
						if(moduleId == "dispatch"){ _self.getFilewordList(json); }
						else{Forms1 = json;}
						_self.docInfo = json;
						App.LS.set("docInfor",JSON.stringify(json));
						App.LS.set("docId",json.id);
						docInfor = json;
						
						//json.relReceivalMark ||
						if( (json.relDocMark && toArr(json.relDocMark).length == 1) || (json.relReceivalMark && toArr(json.relReceivalMark).length == 1)){//关联的发文或收文,多份的时候就不展示
							var relDocMark = toArr(json.relDocMark || json.relReceivalMark);
							var moduleId2 = relDocMark[0].moduleId.toLowerCase();
							App.LS.set("module2",moduleId2);
							if(moduleId2 == "special_work"){
								var obj = {id:relDocMark[0].docId};
							}else{
								var obj = {docId:relDocMark[0].docId};
							}
							
							var _url2 = ZjgyHost + ZjgyUrl[moduleId2+"-wj"];
							ajaxRequst(_url2,'GET','application/x-www-form-urlencoded','json',obj).then(function(json2){
								_self.docInfo = json2;
								App.LS.set("docInfor2",JSON.stringify(json2));
								App.LS.set("docId2",json2.id);
								docInfor2 = json2;
								Forms2 = json2;
								_self.tabActive = json.relDocMark ? 1 : 0;
								if(_self.tabActive == 0){
									_self.tabData=[
										{name:"发文单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
										{name:"收文单",pageId:"BaseInfor2",loadUrl:"./components/BaseInforPage2.html",initFlag:"false",datas:[]},
										{name:"文件预览",pageId:"FileRead",loadUrl:"./components/FileReadPage.html",initFlag:"false",datas:[]},
										{name:"相关资源",pageId:"FileResource",loadUrl:"./components/FileResourcePage.html",initFlag:"false",datas:[]},
										{name:"查看流程",pageId:"FlowRead",loadUrl:"./components/FlowReadPage.html",initFlag:"false",datas:[]},
										{name:"查看意见",pageId:"opinion",loadUrl:"./components/opinionPage.html",initFlag:"false",datas:[]}
									]
									if(moduleId == "special_work"){
										_self.getEgovConfigByCondition("opinionSyncSpecial");
										_self.tabData[0].name = "审批单";
									}else{
										_self.getEgovConfigByCondition("opinionSync");
									}
								}else if(_self.tabActive == 1){
									_self.tabData=[
										{name:"发文单",pageId:"BaseInfor2",loadUrl:"./components/BaseInforPage2.html",initFlag:"false",datas:[]},
										{name:"收文单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
										{name:"文件预览",pageId:"FileRead",loadUrl:"./components/FileReadPage.html",initFlag:"false",datas:[]},
										{name:"相关资源",pageId:"FileResource",loadUrl:"./components/FileResourcePage.html",initFlag:"false",datas:[]},
										{name:"查看流程",pageId:"FlowRead",loadUrl:"./components/FlowReadPage.html",initFlag:"false",datas:[]},
										{name:"查看意见",pageId:"opinion",loadUrl:"./components/opinionPage.html",initFlag:"false",datas:[]}
									]
									if(moduleId2 == "special_work"){
										_self.getEgovConfigByCondition("opinionSyncSpecial");
										_self.tabData[0].name = "审批单";
									}else{
										_self.getEgovConfigByCondition("opinionSync");
									}
								}
								_self.$nextTick(function(){
									$.each(_self.tabData,function(i,item){
										_self.initLoadPage(i);
									})
								});
								//_self.getProcessPermission(moduleId);//流程权限获取
								//return false;
							})
						}else{
							_self.$nextTick(function(){
								$.each(_self.tabData,function(i,item){
									_self.initLoadPage(i);
								})
								
							});
						}
						
					}
					if(moduleId == "overtime"){
						_self.getListDocResource();
					}
					
					if((docInfor.flowStatus && docInfor.flowStatus != "finish") || listInfo.isHistoryFile != "yes"){//办结文件 或 文件资料中的历史文件不需要获取流程权限 
						_self.getProcessPermission(moduleId);//流程权限获取
					}else{
						baseCommon.getOpinionList();
						_self.initBtnData();
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
			var obj = {docId:(listInfo.businessDocId || listInfo.docId || listInfo.fileDocId || listInfo.id)};
			ajaxRequst(_url,'get','application/json;charset=UTF-8','json',obj).then(function(json){
				console.log(json);
				if(json != ""){
					App.LS.set("stateBusiness",JSON.stringify(json.stateBusiness));//环节可操作按钮
					App.LS.set("stateBase",JSON.stringify(json.stateBase));//当前环节信息
					App.LS.set("flowStatus", json.flowStatus);//流程状态
					_self.proPermission = json;
					App.LS.set("workTodoId",json.workTodoId);
					//App.LS.set("businessOpinion",JSON.stringify(json.stateBusiness.businessOpinion));//环节可操作意见
					App.LS.set("baseAction",JSON.stringify(json.baseAction));//流程操作	
				}
				_self.initBtnData();
				baseCommon.getOpinionList();
			})
		},
		initBtnData : function(){	
			let btns=[];
			if(listInfo.readType && listInfo.isRead == "0"){//待阅
				this.btnArrs.push({btnName:"已阅",iconCss:"fasong",toEvent:"jsReaded"});
				if (userInfo.orgNo != "D00002") {//非委领导的人员，发送按钮在底部操作栏，委领导在阅办单上显示按钮
					this.btnArrs.push({btnName:"传阅意见",iconCss:"fasong",toEvent:"jsReadSend"});	
					this.btnArrs.push({btnName:"传阅",iconCss:"fasong",toEvent:"toRead"});		
				}
				return;
			}		
			if(detailPage.proPermission && detailPage.proPermission.stateBusiness && detailPage.proPermission.stateBusiness.businessHandle && detailPage.proPermission.flowStatus != "read"){		
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
				this.baseAction = baseAction;
				console.log(baseAction);		
				if($.inArray("pdfNotation",businessHandle)>-1){
					//_MenuList.push('<a class="bottom-3nav-box" onclick=pdfFileList()><span class="iconfont piyue"></span><p>正文批注</p></a>');
					//hasNotationBtn=true;
					haveSignbtn = true;
					//btns.push({btnName:"手写签批",iconCss:"piyue",toEvent:"pdfNotation"});
				}
				if($.inArray("send",baseAction)>-1 ){
					//发送
					btns.push({btnName:"发送",iconCss:"fasong",toEvent:"jsSend"});
				}
				if($.inArray("autosend",baseAction)>-1){
					//自动发送fa
					btns.push({btnName:"发送",iconCss:"fasong",toEvent:"jsAutoSend"});
				}
				if($.inArray("freedomSend",baseAction)>-1){
					//自由流发送
					btns.push({btnName:"发送",iconCss:"fasong",toEvent:"jsSendfreedom"});
				}
				if($.inArray("transfer",baseAction)>-1){
					//转办
					btns.push({btnName:"转办",iconCss:"zhuanban",toEvent:"jsPass"});
				}			
				if($.inArray("return",baseAction)>-1 || $.inArray("returnPre",baseAction)>-1 || $.inArray("freedomReturn",baseAction)>-1){
					//退回
					btns.push({btnName:"退回",iconCss:"tuihui",toEvent:"jsReturn"});
				}
				// if($.inArray("returnPre",businessHandle)>-1 || $.inArray("returnPre",baseAction)>-1 ){
				// 	//退还
				// 	btns.push({btnName:"退回",iconCss:"tuihui",toEvent:"jsFreeReturn"});
				// }
				if($.inArray("forcefinish",baseAction)>-1 ){
					//办结
					btns.push({btnName:"办结",iconCss:"banjie",toEvent:"jsOver"});
				}
				if( $.inArray("finish",baseAction)>-1 ){
					//办结
					let businessOpinion = detailPage.proPermission.stateBusiness.businessOpinion;/* 环节可操作意见 */
					if(businessOpinion.length == 0 || $.inArray("send",baseAction)>-1 || $.inArray("autosend",baseAction)>-1){//如果没有可操作意见 或者 有发送按钮 就显示办结
						btns.push({btnName:"办结",iconCss:"banjie",toEvent:"jsOver"});
					}else{
						
						btns.push({btnName:"发送",iconCss:"banjie",toEvent:"jsOver"});
					}
					
				}
				if( $.inArray("done",baseAction)>-1){
					//办结
					btns.push({btnName:"办结",iconCss:"banjie",toEvent:"jsEnd"});
				}
				/*if( $.inArray("finish",baseAction)>-1){
					//办理完毕
					btns.push({btnName:"办理完毕",iconCss:"chuliwancheng",toEvent:"jsEnd"});
				}*/
				//}
				
				if( $.inArray("cancel",baseAction)>-1){
					//撤办
					btns.push({btnName:"撤办",iconCss:"chexiao",toEvent:"jsCancle"});
				}
				
				if($.inArray("inDispatch",businessHandle)>-1 && detailPage.proPermission.flowStatus == "running"){ //内部传阅
					btns.push({btnName:"传阅",iconCss:"fasong",toEvent:"toRead"});
				}
				if(App.LS.get("module") == "receival" || App.LS.get("module") == "dispatch"){
					isCollected().then(function (responseData) {
						if(responseData != ""){
							btns.push({btnName:"取消收藏",iconCss:"shoucang btn-active",toEvent:"delCollect"}); 
						}
					});
					btns.push({btnName:"收藏",iconCss:"shoucang",toEvent:"collectFolder"});
				}
				this.btnArrs = btns;
				//detailCommon.getCollecFlag(this.btnArrs);
			}else{
				if(App.LS.get("module") == "receival" || App.LS.get("module") == "dispatch"){
					isCollected().then(function (responseData) {
						if(responseData != ""){
							btns.push({btnName:"取消收藏",iconCss:"shoucang btn-active",toEvent:"delCollect"}); 
						}
					});
					btns.push({btnName:"收藏",iconCss:"shoucang",toEvent:"collectFolder"});
				}
				this.btnArrs = btns;
			}
		},
		getAllFiles:function(docId){
			var _self = this;
			var _url = ZjgyHost + ZjgyUrl["File-List"];	
			var data = {
				docId: docId,
				type: ["main_doc", "main_trace", "main_pdf","main_ofd", "attach", "faircom_self_doc", "doc_self_doc", "affair_attach"],
				containFile: false,
				moduleId: ""
			}	
			ajaxRequst(_url,'get','application/json;charset=UTF-8','json',data).then(function(json){
				//console.log(json);
				_self.getFilesTimes ++;
				if(attList.length == 0){
					attList = json;
				}else{
					attList = attList.concat(json);
				}
				if((_self.getFilesTimes == 2 &&  attList.length==0) || (!App.LS.get("docId2") && attList.length==0 && _self.docResource.length == 0) ){//没有文件，去掉文件展示页面
					$.each(_self.tabData,function(i,item){
						if(item.pageId=="FileRead"){
							_self.tabData.splice(i,1);
							_self.tabnum =_self.tabData.length; 
							return false;
						}
					})
				}
				//_self.$nextTick(function(){
					// if((_self.getFilesTimes == 1 && !App.LS.get("docId2")) || _self.getFilesTimes == 2){
					// 	$.each(_self.tabData,function(i,item){
					// 		_self.initLoadPage(i);
					// 	})
					// }
					
				//});
			})
		},
		getListDocResource:function(){ //参考材料
			var _self = this;
			var _url = ZjgyHost + ZjgyUrl["overtime-res"];	
			var data = {
				docId: App.LS.get("docId"),
				status: "正常"
			}	
			ajaxRequst(_url,'get','application/json;charset=UTF-8','json',data).then(function(json){
				console.log(json);
				_self.docResource = json;
			})
		},
		initLoadPage: function(index){
			var _self=this;
			var _index=typeof(index) != "undefined" ? index:this.tabActive;
			var iniPage = this.tabData[_index];
			if(iniPage.initFlag=="true"){
				console.info("加载过了");
				return false;
			}else{
				//wispApp.UI.showProgressDialog("正在加载页面数据...");
				//console.log("#"+iniPage.pageId)
				console.log(iniPage.loadUrl+"?v="+loadVersion.getVersion(iniPage.pageId));
				$("#"+iniPage.pageId).load(iniPage.loadUrl+"?v="+loadVersion.getVersion(iniPage.pageId),function(){
					//wispApp.UI.dismissProgressDialog();
					_self.tabData[_index].initFlag = "true";
				});				    		
			}					
		},
		getEgovConfigByCondition: function(keyword){//获取收文和发文意见/收文和专班意见相互同步的信息
			//http://223.4.76.182:8080/oa/config/getEgovConfigByCondition?keyword=opinionSync&module=receival&systemNo=ZJSFGW&_t=1615360715866
			// /config/getEgovConfigByCondition?keyword=opinionSyncSpecial&module=receival&systemNo=ZJSFGW&_t=1615795968614
			let _this = this;
			let _url = ZjgyHost + "/config/getEgovConfigByCondition"; 
			let datas =  {
				keyword: keyword,
				module: "receival",
				systemNo: eval("("+App.LS.get('userInfo')+")").systemNo
			}
			ajaxRequst(_url,'GET','application/x-www-form-urlencoded','json',datas).then(function(res){
				//keyvalue: "主办处室意见:zbcsyj=主办处室意见:zbcsyj;会办处室意见:hbcsyj=会办处室意见:hbcsyj"
				if (res && res.keyvalue) {
                    const split = res.keyvalue.split(';');
                    split.forEach(item => {
                        const t1 = item.split('=');
                        const t2 = t1[0].split(':');
                        const t3 = t1[1].split(':');
                        const data = {
                            old: {name: t2[0], code: t2[1]},//收文意见
                            new: {name: t3[0], code: t3[1]}//发文意见/专班意见
                        }
                        _this.opinionSync.push(data);
                    });
                }
			})
		},
		getOpinionToReadByCondition: function(keyword="opinionToRead"){//待阅填写意见
			let _this = this;
			let _url = ZjgyHost + "/config/getEgovConfigByCondition"; 
			let datas =  {
				keyword: keyword,
				module: "receival",
				systemNo: eval("("+App.LS.get('userInfo')+")").systemNo
			}
			ajaxRequst(_url,'GET','application/x-www-form-urlencoded','json',datas).then(function(res){
				//keyvalue: "主办处室意见:zbcsyj=主办处室意见:zbcsyj;会办处室意见:hbcsyj=会办处室意见:hbcsyj"
				if (res && res.keyvalue) {
					_this.opinionToRead = toArr(res.keyvalue);
					JSON.parse(res.keyvalue).find((item) => {
						if (item['type'] === _this.orgName) {
							_this.opinionCode = item['opinionCode'];
							_this.opinionCodeName = item['opinionCodeName'];
						} else {
							_this.opinionCode = 'yyyj';
							_this.opinionCodeName = '已阅意见';
						}

					})
				}
			})
		},
		getFilewordList:function(docInfo){ //获取流程（文件字）
			var _self = this;
			var _url = ZjgyHost + ZjgyUrl["getFileword-dispatch"];	
			ajaxRequst(_url,'get','application/json;charset=UTF-8','json').then(function(json){
				console.log(json);
				_self.FilewordList = json;
				$.each(_self.FilewordList,function(f,fileword){
					if(fileword.docWord == docInfo.docWord){
						docInfo.showPublic = (fileword.showPublic == "显示" ? true : false);//公开属性显示或不显示
					}
				})
				Forms1 = docInfo;
			})
			
		},
		addOpinion(){
			let _this = this;
			let businessOpinion = detailPage.proPermission.stateBusiness.businessOpinion;/* 环节可操作意见 */
			let opinionContent = "无。";
			let _url = ZjgyHost + ZjgyUrl['opinion-add'];
			let moduleId = App.LS.get("module");
			if(moduleId == "receival" || moduleId == "dispatch"){//收发文的意见提交接口不同
				_url = ZjgyHost + ZjgyUrl["opinion-add-" + moduleId];
			}
			let toReadBaseMsg = {
				handleUserName: listInfo.handleUserName,
				sendUserName: listInfo.sendUserName,
				createTime: listInfo.createTime
			}
			let data = {
				// createTime: '',
				docId: App.LS.get("docId"),
				flowSlab: '',
				id: '',
				moduleId: App.LS.get("module"),
				opinionCode: businessOpinion[0].opinionNo,
				opinionCodeName: businessOpinion[0].opinionName,
				opinionContent: opinionContent,
				status: 0,
				extension: JSON.stringify(toReadBaseMsg)
			}
			ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(data)).then(function (res) {
				//this.bus.$emit(this.bus_event.UPDATE_OPINION);
				if (res) {
					jsOver();
					
				}
			});
		},
		isReaded(){ //判断是否已阅，用于首页是否加粗标题。未阅-加粗
			if(listInfo.readType){ //阅件
				if(listInfo.processExtension){
					let processExtension = JSON.parse(listInfo.processExtension);
					if(processExtension.isInterfaceRead && processExtension.isInterfaceRead == "1"){
						return true;
					}else{
						this.updateFlowReaderExtensions();
						return false;
					}
				}else{
					this.updateFlowReaderExtensions();
					return false;
				}
			}else{
				if(listInfo.isRead == 1){
					return true;
				}else{
					return false;
				}
			}
		},
		updateFlowReaderExtensions(){
			let _url = ZjgyHost + ZjgyUrl["update-FlowReader"];	
			let data = {
				ids:App.LS.get("docId"),
				isInterfaceRead: 1
			}
			ajaxRequst(_url,'post','application/json;charset=UTF-8','json',JSON.stringify(data)).then(function(json){
				console.log(json);
			})
			
		},
		// 新增意见
		onSubmit() {
			let _this = this;
			let _url = ZjgyHost + ZjgyUrl['opinion-add'];
			let moduleId = App.LS.get("module");
			if (this.opinionContent === '') {
				this.opinionContent = '已阅。';
			}
			if(moduleId == "receival" || moduleId == "dispatch"){//收发文的意见提交接口不同
				_url = ZjgyHost + ZjgyUrl["opinion-add-" + moduleId];
			}
			let toReadBaseMsg = {
				handleUserName: listInfo.handleUserName,
				sendUserName: listInfo.sendUserName,
				createTime: listInfo.createTime,
				//sendOpinion:true
			}
			let data = {
				// createTime: '',
				docId: App.LS.get("docId"),
				flowSlab: '',
				id: '',
				moduleId: App.LS.get("module"),
				opinionCode: this.opinionCode,
				opinionCodeName: this.opinionCodeName,
				opinionContent: this.opinionContent,
				status: 0,
				extension: JSON.stringify(toReadBaseMsg)
			}
			ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(data)).then(function (res) {
				//this.bus.$emit(this.bus_event.UPDATE_OPINION);
				if (res) {
					_this.isRead();
				}
			});

		},
		isRead() { //已阅
			let data = [listInfo.id];
			let _url = ZjgyHost + ZjgyUrl["finish-read"];
			ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(data)).then(function (res) {
				try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
				if (res) {
					toast("已阅成功", 2000);
					closePage("refreshList()");
				}else{
					toast("已阅失败", 2000);
				}
				
			});
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
				alert(error);
			}
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
	// App.UI('dialog', {
	// 		type : 'confirm',
	// 		title: 'queren',
	// 		OkTxt: '确认',
	// 		CancelTxt: '取消',
	// 		msg	 : '是否确定结束流程？'
	// 	},function(backflag){
			//if(backflag==='OK'){
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
			//}
		// });
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
	var getUrl=ZjgyHost + ZjgyUrl[urlNo]+'?docId='+datainfo.id+'&workTodoId='+detailPage.proPermission.workTodoId+'&processId='+datainfo.flowProcessId;
	ajaxRequst(getUrl,'get','application/json;charset=UTF-8','json').then(function (submitobj) {
			if(submitobj){
				try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				toast("流程操作成功！",3000);				
				closePage("location.reload();");
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
						if(sendobj.length==1 && assigndStates.autoSend=="1"){
							var todata = {
								docId:docInfor.id,
								workTodoId:detailPage.proPermission.workTodoId,
								transitionLabels:assigndStates.transitionLabel
							};
							ajaxRequst(ZjgyHost + ZjgyUrl["ZDfs-"+App.LS.get("module")],'post','application/json;charset=UTF-8','json',JSON.stringify(todata)).then(function(submitobj){
								if(submitobj){
									//发送后，删除此份文本人填过的意见缓存
									let myOpinions = toArr(App.LS.get("myOpinions"));
									let otherOpinions = myOpinions.filter(opin => !((opin.docId == App.LS.get("docId") && (opin.opinionUserNo == userInfo.userId || opin.opinionUserNo == userInfo.username))));
									App.LS.set("myOpinions",JSON.stringify(otherOpinions));

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

function jsReaded(){//已阅按钮-直接填写已阅意见。
	detailPage.onSubmit();
}
function collectFolder(){ //收藏文件夹显示
	//App.LS.set("listInfo",JSON.stringify(obj));
	let zNodes=[];
	//[{id: "default", folderName: "未分类", pFolderId: null, userNo: null, systemNo: null},{id: "13647de74b0b7000", folderName: "当月办理", pFolderId: "ROOT", userNo: "U006074", systemNo: "CSXT"},{id: "13647ee682cb7000", folderName: "暂缓办理", pFolderId: "13647de74b0b7000", userNo: "U006074"},{id: "13647ed8608b7000", folderName: "正式文", pFolderId: "13647e71294b7000", userNo: "U006074"},{id: "13647e71294b7000", folderName: "紧急办理", pFolderId: "13647de74b0b7000", userNo: "U006074"},{id: "13633af1714b7000", folderName: "领导关注", pFolderId: "ROOT", userNo: "U006074", systemNo: "CSXT"}],
	let treeNodes = function(data,zNodes){
		data.forEach((item,i) => {	 
			zNodes.forEach((node,n) => {
				if(node.id == item.pFolderId && !item.isClassify){
					item.isClassify = true;
					node.children.push({ 'id':item.id, 'pId':item.pFolderId, 'name':item.folderName,'open':(item.pFolderId && item.pFolderId != "ROOT")?true:false,children:[]});
				}
				if (node.children.length > 0) {
					let noClassData = data.filter(item => !item.isClassify);
					treeNodes(noClassData, node.children);
				}
			})
		})
	}
	
	let ListFolderUrl = ZjgyHost + ZjgyUrl['collectListFolder'] + "?type=default";
	ajaxRequst(ListFolderUrl,'get','application/json;charset=UTF-8','json','').then(function (resData) {
		console.log(resData);
		//treeNodes(resData,zNodes);
		zNodes = resData.filter(item => !(item.pFolderId && item.pFolderId != "ROOT")).map(item => { return { 'id':item.id, 'pId':item.pFolderId, 'name':item.folderName,'open':(item.pFolderId && item.pFolderId != "ROOT")?false:true,children:[]}});
		let otherData = resData.filter(item => (item.pFolderId && item.pFolderId != "ROOT"));
		treeNodes(otherData,zNodes);//tree2(resData,zNodes);
		//$('.treecontain').css('display','block');
		//$('.tree').append(htmllist.join(''));
		pdfwin=App.UI('dialog', {
			type : 'treelist',
			title: '收藏夹',
			menulist:''
		});	
		//以下为收藏功能的收藏文件夹树型代码
		var setting = {
			view: {
				selectedMulti: false, //设置是否能够同时选中多个节点
				showIcon: false,  //设置是否显示节点图标
				showLine: false,  //设置是否显示节点与节点之间的连线
				showTitle: true,  //设置是否显示节点的title提示信息
			},
			data: {
				simpleData: {
					enable: true,
					idKey: "id",//树节点ID名称
					pIdKey: "pid",//父节点ID名称
				}
			},
			callback: {
				//beforeClick: addCollect,
				onClick: doCollect,
			}
		};
		$.fn.zTree.init($("#treeList"), setting, zNodes);
	});
	
}

//这份文是否收藏过
function isCollected(){ 
	let datainfo=eval("("+App.LS.get("docInfor")+")");
	let moduleId =  listInfo.businessNo || listInfo.moduleId;
	let _url = ZjgyHost + ZjgyUrl['doCollect'] + "?moduleId=" + moduleId + "&docId=" + datainfo.id;
	return ajaxRequst(_url, 'get', 'application/json;charset=UTF-8', 'json', '');
}

function doCollect(e, treeId, treeNode) {
	if(pdfwin)pdfwin.remove();
	let datainfo=eval("("+App.LS.get("docInfor")+")");
	let moduleId =  listInfo.businessNo || listInfo.moduleId;
	let moduleName = listInfo.businessName || listInfo.moduleName;
	//$(_this.currentTarget).parent().css("transform", "translateX(0px)");
	isCollected().then(function (responseData) {
		console.log(responseData);
		if (responseData == "") {
			var para={
				docId:datainfo.id,
				folderId:treeNode.id,
				moduleId:moduleId,
				moduleName:moduleName,
				title:datainfo.subject
			};
			_url = ZjgyHost + ZjgyUrl['insertDocCollect'];
		} else {
			var para={
				collectTime:(new Date()).Format("yyyy-MM-dd"),
				collecter:eval("("+App.LS.get('userInfo')+")").username || eval("("+App.LS.get('userInfo')+")").userId,
				docId: datainfo.id, 
				folderId:treeNode.id,
				id: responseData.id, 
				moduleId: moduleId, 
				moduleName: moduleName, 
				systemNo: eval("(" + App.LS.get('userInfo') + ")").systemNo, 
				title: datainfo.subject
			};
			_url = ZjgyHost + ZjgyUrl['updateDocCollect'];
		}
		ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(para)).then(function (responseData) {
			detailPage.initBtnData();
			toast("收藏成功", 2000);
			//indexPhone.getColList();
			try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
		})
	})
}
function delCollect() {
	let datainfo=eval("("+App.LS.get("docInfor")+")");
	let moduleId =  listInfo.businessNo || listInfo.moduleId;
	//$(_this.currentTarget).parent().css("transform", "translateX(0px)");
	isCollected().then(function (responseData) {
		console.log(responseData);
		ajaxRequst(ZjgyHost + ZjgyUrl['delCollect'], 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify([responseData.id])).then(function (responseData) {
			console.log(responseData);
			detailPage.initBtnData();
			toast("取消成功", 2000);
			//indexPhone.getColList();
			try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
	
		})
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
