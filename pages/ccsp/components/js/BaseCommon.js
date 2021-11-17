
var baseCommon = {
	getHandleId : function(){
		// wispApp.UI.showProgressDialog("正在载入办理单...");
		try{
			var listInfo = toArr(App.LS.get('listInfo'));
			var userinfo = toArr(App.LS.get('User'));
			if(listInfo.AtRead=="1"){
				var _url = ZjgyHost + ZjgyUrl["isReadOpinion"];
		    	var obj = {docCate:docInfor.form.docCate,userNo:userinfo.userNo};
				ajaxRequst( _url,"get",'application/json',"json",obj).then((json) => {
					var canopinion = [];
					$.each(json, function(i,list) {
						$.each(list.opinionNo, function(j,opin) {
							canopinion.push("已阅意见|"+opin);
						});
					});
					App.LS.set("isReadOpin",JSON.stringify(canopinion));
					if(App.LS.get("module")=="dispatch"){
						baseCommon.initbasePage(JSON.parse(docInfor.dealFormId).options[0].id);
					}else if(App.LS.get("module")=="receival"){
						baseCommon.getToHandleId();//收文调用这个方法
					}else{

					}	
				});
			}else{
				//console.log(JSON.parse(docInfor.dealFormId).options[0].id);
				if(App.LS.get("module")=="dispatch"){
					baseCommon.initbasePage(JSON.parse(docInfor.dealFormId).options[0].id);
				}else{
					baseCommon.getToHandleId();//收文调用这个方法
				}								
				App.LS.remove("isReadOpin");
			}
		}catch(e){
			baseCommon.getToHandleId();
			App.LS.remove("isReadOpin");
		}
	},
	//收文调用这个方法
    getToHandleId : function(){
		var thisModule = App.LS.get("module");
		var _url = "";
		switch (thisModule){
			case "receival":
		    	_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?docCateNo="+docInfor.docCate+"&handleOrView=1&systemNo="+docInfor.systemNo;
			break;
			case "dispatch":
				_url = "notGetId";
			break;
			case "meeting":
				_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId="+thisModule.toUpperCase()+"&type=SPECIAL";
			break;
			case "travel_approval":
			case "overtime":
			case "leave":
				_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId="+thisModule.toUpperCase()+"&type=DEALFORM&systemNo="+docInfor.systemNo;
			break;
			case "car_apply":
				_url="oaNotId"
				//_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId="+thisModule.toUpperCase()+"&type=APPLYFORM&os=pc";
			break;
			case "meeting_book":
				_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId="+thisModule.toUpperCase()+"&type=BOOK";
			break;
			case "info":
				_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId=INFOREPORT&status=正常&type=DEALFORM";
			break;
			case "special_work":
				_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId="+thisModule.toUpperCase()+"&type=DEALFORM&systemNo="+docInfor.systemNo;
			break;
			case "travel_expense":
			case "other_expense":
			case "labor_union_expense":
			case "party_union_expense":
			case "contract_approve"://合同管理
			case "purchase_notice"://采购管理-采购公告审批
			case "purchase_result"://采购管理-采购结果审批
			case "meeting_pay_issued"://会议、培训、活动支出预算审批
			case "official_reception"://公务接待预算审批
			case "union_activities"://工会活动支出预算审批
			case "project_planning_service"://服务采购支出预算审批
			case "goods_purchase"://货物采购审批
				_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?businessNo="+thisModule.toUpperCase()+"&type=DEALFORM&systemNo="+docInfor.systemNo + "&os=pc";
			break;
			default:

			break;
		}
		if(_url=="notGetId"){
			baseCommon.initbasePage(JSON.parse(docInfor.dealFormId).options[0].id);
		}else if(_url=="oaNotId"){
			var infos = docWordInfo[thisModule];//{vname: "姓名", vid: "draftUserName", vtype: "t-span", vcol: ""}
			var tableVal = [];
			var diySet = {id:"Bldbox",title:"办理单未定义标题"};
			$.each(infos,function(keys,item){
				if(keys=="标题"){
					//diySet.title = "item";
				}else{
					tableVal.push({vname: keys, vid: item, vtype: "t-span", vcol: ""});
				}
			});
			creatHandleTable(tableVal,"",diySet);
			baseCommon.getCommonOpinion();
			baseCommon.getOpinionId();
			wispApp.UI.dismissProgressDialog();
		}else if(_url!=""){
			ajaxRequst( _url,"get",'application/json',"json").then((json) => {
				if(json[0].id){
					//console.log(json[0].id);
					baseCommon.initbasePage(json[0].id);
				}else{
					wispApp.UI.dismissProgressDialog();
					wispApp.UI.showToast("办理单获取失败，请稍后重试。");
				}							
			});
		}
		
    },
    initbasePage : function(handleid){
		var handleType = "";
		var _url = ZjgyHost + ZjgyUrl["downloadBLD"];
		var obj = {id:handleid,isDownload:false}
		ajaxRequst( _url,"get",'application/json',"text",obj).then((json) => {
			$("#Bldbox,#tempDiv").empty()
			initHandlePage("Bldbox","tempDiv",json,handleType);
			try{
				var top = $(".canGoto").eq(0).offset().top;
				top = top>30?top:30
				App.LS.remove("goToScroll")
				App.LS.set("goToScroll",top);
			}catch(e){
				App.LS.set("goToScroll",30);
			}
		});
		baseCommon.getCommonOpinion();
		baseCommon.getOpinionId();
		wispApp.UI.dismissProgressDialog();
	},
	getOpinionId: function(){
		var thisModule = App.LS.get("module");
		if(thisModule == "leave" || thisModule == "overtime" || thisModule=="travel_approval" || thisModule == "car_apply"){
			var _url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId="+thisModule.toUpperCase()+"&type=APPLYFORM&os=pc";
			ajaxRequst( _url,"get",'application/json',"json").then((json) => {
				if(json[0].id){
					baseCommon.initOpinionPage(json[0].id);
				}else{
					wispApp.UI.dismissProgressDialog();
					wispApp.UI.showToast("办理单获取失败，请稍后重试。");
				}							
			});
		}
	},
	initOpinionPage : function(handleid){
		var handleType = "";
		var _url = ZjgyHost + ZjgyUrl["downloadBLD"];
		var obj = {id:handleid,isDownload:false}
		ajaxRequst( _url,"get",'application/json',"text",obj).then((json) => {
			$("#OPBldbox,#OPtempDiv").empty()
			initHandlePage("OPBldbox","OPtempDiv",json,handleType);
		});
		wispApp.UI.dismissProgressDialog();
    },
	getOpinionList : function(refreshOpin){
		var getopinurl = ZjgyHost + ZjgyUrl["get-opinlist"] + "?docId=" + docInfor.id;
		//var getopinobj = JSON.stringify({docId:docInfor.form.id});
		ajaxRequst( getopinurl,"get",'application/json',"json").then((opinionData) => {
			// if(refreshOpin){opinionPage.opinionList = opinionData;}
			App.LS.set("oplist",JSON.stringify(opinionData));
		 	baseCommon.fullOpinions(opinionData);
		});
	},
	fullOpinions : function(opinionData){
		let opinionINfor = [];
		if(detailPage.proPermission && detailPage.proPermission.stateBusiness != undefined && detailPage.proPermission.stateBusiness.businessOpinion){
			var userinfo = toArr(App.LS.get('userInfo'));
			let businessOpinion = detailPage.proPermission.stateBusiness.businessOpinion;/* 环节可操作意见 */
			let opinionopinionNo = [];/* 判断意见id是否已插入 opinionINfor */
			$.each(businessOpinion,function(b,opinionObj){
				/* 权限循环判断 */
				if($.inArray(opinionObj.opinionNo,opinionopinionNo)==-1){
					/* 仅加入权限和初始参数，生成的opinionINfor，均为判断过权限，未加入的则无新增意见的权限 */
					opinionopinionNo.push(opinionObj.opinionNo);
					let perOpin = {"opinionNo":opinionObj.opinionNo,"opinionName":opinionObj.opinionName,"value":[]};
					if (detailPage.proPermission.flowStatus == "running") {
						/* 待办环节，可新增意见，展示[手写输入]、[键盘输入]两个按钮 */
						perOpin.isEdit = true;
					}else{
						/* 有权限，但不在待办环节，不展示[手写输入]、[键盘输入]两个按钮 */
						perOpin.isEdit = false;
					}
					opinionINfor.push(perOpin);
				}
			});
			$.each(opinionData, function(o,opinionObj) {
				/* 已有的意见循环判断 */
				if($.inArray(opinionObj.opinionCode,opinionopinionNo)==-1){
					/* 没有新增意见的权限，但需要展示意见列表 */
					opinionopinionNo.push(opinionObj.opinionCode);
					opinionObj.IsEdit = false;/* 没有新增权限，不展示[手写输入]、[键盘输入]两个按钮 */
					let perOpin = {"opinionNo":opinionObj.opinionCode,"opinionName":opinionObj.opinionCodeName,"value":[]};
					perOpin.value.push(opinionObj);
					opinionINfor.push(perOpin)
				}else{
					/* 有新增意见的权限，判断是不是当前人员写的，是不是处在待办环节 */
					$.each(opinionINfor,function(x,item){
						if(item.opinionNo == opinionObj.opinionCode){
							if (detailPage.proPermission.flowStatus == "running" && opinionObj.opinionUserNo == userinfo.username) {
								opinionObj.IsEdit = true;/* 展示[删除]、[修改]两个按钮 */
							}else{
								opinionObj.IsEdit = false;/* 不展示[删除]、[修改]两个按钮 */
							}
							item.value.push(opinionObj);
						}
					});
				}
			});
		}else{
			$.each(opinionData, function(z,opinionObj) {
				opinionINfor.push({"opinionNo":opinionObj.opinionCode,"opinionName":opinionObj.opinionCodeName});
			})
			$.each(opinionINfor,function(t,opinion){//按意见类型分类显示
				opinion.value = [];
				$.each(opinionData, function(z,opinionObj) {
					if(opinionObj.opinionCode == opinion.opinionNo){
						opinion.value.push(opinionObj);
					}
				})
			})
		}
		
		Opinions1=opinionINfor;
		baseCommon.getHandleId();
	},
	chackPermiss : function(arry1,info,dept){
		//检查是否拥有所属或排除
		var backnum = false;
		$.each(arry1,function(i,obj){
			if(info.indexOf(obj)>-1 || dept.indexOf(obj)>-1){
				backnum = true;
				return false;
			}
		});
		return backnum;
	},
	getCommonOpinion:function(){
		App.LS.remove("CommonOpinion");
		var userinfo = toArr(App.LS.get('userInfo'));
		var docinfor = toArr(App.LS.get('docInfor'));
		var personOpinion=[
			//{"class":"0","name":"常用意见","id":"COMMON",datalist:[],tourl:ZjgyHost + ZjgyUrl["getcommonOpinion"]+"?opinionCategory=COMMON"},
			{"class":"1","name":"常用意见","id":"PERSON",datalist:[],tourl:ZjgyHost + ZjgyUrl["getpersonOpinion"]+"?opinionCategory=PERSON&userNo=" + userinfo.username},
		];
		var requestTimes = 0;//请求公共意见、个人意见的次数
		$.each(personOpinion, function(i,item) {
			var _url = item.tourl;
			ajaxRequst( _url,"get",'application/json',"json",{}).then((json) => {
				personOpinion[i].datalist=json;
				requestTimes++;
				if(requestTimes == personOpinion.length){
					App.LS.set("CommonOpinion",JSON.stringify(personOpinion));
				}
			});
		});
		
	},
	getNoteList : function(dates){
		var getUrl = ZjgyHost + ZjgyUrl["getPreDocNote"];
		var userinfo = toArr(App.LS.get('User'));
		try{			
			var datas = {docId:docInfor.form.id,sendStateLabel:docInfor.permission.preStateLabel};
		}catch(e){
			vFBD.noteDate = [];
			return false;
		}
		ajaxRequst( getUrl,"post",'application/json',"json",JSON.stringify(datas)).then((json) => {
			if(json){
				vFBD.noteDate = json;
			}
		});
	},
};
