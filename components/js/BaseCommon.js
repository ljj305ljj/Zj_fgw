
var baseCommon = {
	getHandleId : function(){
		//wispApp.UI.showProgressDialog("正在载入办理单...");
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
			// case "travel_approval":
			// case "overtime":
			// case "leave":
			case "special_work":
				_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId="+thisModule.toUpperCase()+"&type=DEALFORM&systemNo="+docInfor.systemNo;
				break;
			case "travel_approval":
			case "overtime":
			case "leave":
				_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId="+thisModule.toUpperCase()+"&type=DEALFORM&systemNo="+docInfor.systemNo+"&name=opinion";
				break;
			case "car_apply":
				_url="oaNotId"
			break;
			case "meeting_book":
				_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId="+thisModule.toUpperCase()+"&type=BOOK";
			break;
			case "info":
				_url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId=INFOREPORT&status=正常&type=DEALFORM";
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
					diySet.title = "item";
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
					// if(thisModule=="travel_approval"){
                    //     baseCommon.initbasePage(json[1].id);
                    //     if(json.length>1) baseCommon.initOpinionPage(json[0].id);
                    // }else{
                        baseCommon.initbasePage(json[0].id);
                    //}
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
			$("#Bldbox,#tempDiv,#tempDiv2").empty()
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
		//baseCommon.getOpinionId();
		wispApp.UI.dismissProgressDialog();
	},
	getOpinionId: function(){
		var thisModule = App.LS.get("module");
		if(thisModule == "leave" || thisModule == "overtime" || thisModule=="travel_approval"){
			var _url = ZjgyHost + ZjgyUrl[thisModule+"-bld"]+"?moduleId="+thisModule.toUpperCase()+"&type=DEALFORM&systemNo="+docInfor.systemNo+"&name=opinion";
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
		let _this = this;
		var getopinurl = ZjgyHost + ZjgyUrl["get-opinlist"] + "?docId=" + docInfor.id;
		//var getopinobj = JSON.stringify({docId:docInfor.form.id});
		ajaxRequst( getopinurl,"get",'application/json',"json").then((opinionData) => {
			if(refreshOpin && typeof(opinionPage) != "undefined" ){opinionPage.opinionList = opinionData;}
			App.LS.set("oplist",JSON.stringify(opinionData));
			if(typeof(docInfor2) != "undefined"){
				if(docInfor.relDocMark){
					//获取收文需同步到发文的意见
					if (detailPage.opinionSync.length && opinionData && opinionData.length) {
						opinionData.forEach(item => {
							detailPage.opinionSync.forEach(item2 => {
								if (item2.old.code == item.opinionCode) {
									if (item2.old.code == 'zbcsyj') {
										if (item.opinionDeptNo == docInfor2.draftDeptNo) {
											const d = Object.assign({}, item);
											d.opinionCode = item2.new.code;
											d.opinionCodeName = item2.new.name;
											d.docId = docInfor.id;
											detailPage.relopinionSyncListReceival.push(d);
										}
									} else {
										const d = Object.assign({}, item);
										d.opinionCode = item2.new.code;
										d.opinionCodeName = item2.new.name;
										d.docId = docInfor.id;
										detailPage.relopinionSyncListReceival.push(d);
									}
								}
							})
						});
					}
				}else if(docInfor.relReceivalMark){
					//获取发文需同步到收文的意见
					if (detailPage.opinionSync.length && opinionData && opinionData.length) {
						opinionData.forEach(item => {
							detailPage.opinionSync.forEach(item2 => {
								if (item2.new.code == item.opinionCode) {
									const d = Object.assign({}, item);
									d.opinionCode = item2.old.code;
									d.opinionCodeName = item2.old.name;
									d.docId = docInfor2.id;
									detailPage.relopinionSyncListDipatch.push(d);
								}
							})
						});
					}
				}
				
				baseCommon.getOpinionList2(opinionData);
			}else{
				baseCommon.fullOpinions(opinionData);
			}
			
		});
	},
	getOpinionList2: function (recOpinionData) {
		var _this = this;
		var getopinurl = ZjgyHost + ZjgyUrl["get-opinlist"] + "?docId=" + docInfor2.id;
		//var getopinobj = JSON.stringify({docId:docInfor2.form.id});
		ajaxRequst(getopinurl, "get", 'application/json', "json").then((opinionData) => {
			console.log("opinionData2:"+opinionData);
			var OpnDatas = Object.assign([], recOpinionData);
			if(docInfor2.relDocMark){
				//获取收文需同步到发文的意见
				if (detailPage.opinionSync.length && opinionData && opinionData.length) {
					opinionData.forEach(item => {
						detailPage.opinionSync.forEach(item2 => {
							if (item2.old.code == item.opinionCode) {
								if (item2.old.code == 'zbcsyj') {
									if (item.opinionDeptNo == docInfor.draftDeptNo) {
										//const d = item;
										const d = Object.assign({}, item);
										d.opinionCode = item2.new.code;
										d.opinionCodeName = item2.new.name;
										d.docId = docInfor.id;
										detailPage.relopinionSyncListReceival.push(d);
									}
								} else {
									const d = Object.assign({}, item);
									d.opinionCode = item2.new.code;
									d.opinionCodeName = item2.new.name;
									d.docId = docInfor.id;
									detailPage.relopinionSyncListReceival.push(d);
								}
							}
						})
					});
					OpnDatas = OpnDatas.concat(detailPage.relopinionSyncListReceival);
				}
			}else if(docInfor2.relReceivalMark){
				//获取发文需同步到收文的意见
				if (detailPage.opinionSync.length && opinionData && opinionData.length) {
					opinionData.forEach(item => {
						detailPage.opinionSync.forEach(item2 => {
							if (item2.new.code == item.opinionCode) {
								const d = Object.assign({}, item);
								d.opinionCode = item2.old.code;
								d.opinionCodeName = item2.old.name;
								d.docId = docInfor2.id;
								detailPage.relopinionSyncListDipatch.push(d);
							}
						})
					});
					OpnDatas = OpnDatas.concat(detailPage.relopinionSyncListDipatch);
				}
			}
			//App.LS.set("oplists", JSON.stringify(oData));
			baseCommon.fullOpinions(OpnDatas);
		});
	},
	fullOpinions : function(opinionData){
		let opinionopinionNo = [];/* 判断意见id是否已插入 opinionINfor */
		let opinionsByType = [];
		if(detailPage.proPermission && detailPage.proPermission.stateBusiness != undefined && detailPage.proPermission.stateBusiness.businessOpinion){
			var userinfo = toArr(App.LS.get('userInfo'));
			let businessOpinion = detailPage.proPermission.stateBusiness.businessOpinion;/* 环节可操作意见 */
			
			let unique = function(arrobj){//去重
				let obj = {};
				let arr = arrobj.reduce((cur,next) => {
					obj[next.opinionNo] ? "" : obj[next.opinionNo] = true && cur.push(next);
					return cur;
				},[]) //设置cur默认类型为数组，并且初始值为空的数组
				console.log(arr);
				return arr;
			}
			$.each(opinionData, function(z,opinionObj) {
				opinionsByType.push({"opinionNo":opinionObj.opinionCode,"opinionName":opinionObj.opinionCodeName});
			})
			$.each(businessOpinion,function(b,opinionObj){
				opinionsByType.push({"opinionNo":opinionObj.opinionNo,"opinionName":opinionObj.opinionName});
			})
			opinionsByType = unique(opinionsByType);//去重
			$.each(opinionsByType,function(t,opinion){//按意见类型分类显示
				opinion.value = [];
				$.each(opinionData, function(z,opinionObj) {
					if(opinionObj.opinionCode == opinion.opinionNo){
						opinion.value.push(opinionObj);
					}
				})
			})
			//当前文件的意见填写权限控制
			$.each(businessOpinion,function(b,opinion){
				//if(opinionsByType.length != 0){
					$.each(opinionsByType, function(z,opinionObj) {
						//console.dir(opinionObj.opinionCode)
						if (opinionObj.opinionNo == opinion.opinionNo) {
							//待办文件才可以填写意见
							if(detailPage.proPermission.flowStatus == "running"){opinionObj.isEdit = true;}else{ opinionObj.isEdit = false; }
							$.each(opinionObj.value,function(o,opinval){
								if(detailPage.proPermission.flowStatus == "running" && opinval.opinionUserNo == userinfo.username ){
									opinval.IsEdit = true;//是否可修改
								}else{
									opinval.IsEdit = false;
								}
								//opinion.value.push(opinionObj);
							})
						}
					});
				
			})
		}else{
			$.each(detailPage.opinionToRead, function(o,opinionObj) {
				if($.inArray(opinionObj.opinionCode,opinionopinionNo)==-1){
					/* 仅加入权限和初始参数，生成的opinionINfor，均为判断过权限，未加入的则无新增意见的权限 */
					opinionopinionNo.push(opinionObj.opinionCode);
					let perOpin = {"opinionNo":opinionObj.opinionCode,"opinionName":opinionObj.opinionCodeName,"value":[]};
					if (userInfo.orgNo == "D00002") {//委领导 在阅办单上显示填写意见的按钮
						perOpin.isEdit = true;
						perOpin.opinionToRead = true;
					}else{
						perOpin.isEdit = false;
					}
					opinionsByType.push(perOpin);
				}
			})
			$.each(opinionData, function(z,opinionObj) {
				if($.inArray(opinionObj.opinionCode,opinionopinionNo)==-1){
					/* 没有新增意见的权限，但需要展示意见列表 */
					opinionopinionNo.push(opinionObj.opinionCode);
					opinionObj.IsEdit = false;/* 没有新增权限，不展示[手写输入]、[键盘输入]两个按钮 */
					let perOpin = {"opinionNo":opinionObj.opinionCode,"opinionName":opinionObj.opinionCodeName,"value":[]};
					perOpin.value.push(opinionObj);
					opinionsByType.push(perOpin)
				}else{
					$.each(opinionsByType,function(t,opinion){//按意见类型分类显示
						opinion.value = [];
						$.each(opinionData, function(z,opinionObj) {
							if(opinionObj.opinionCode == opinion.opinionNo){
								opinion.value.push(opinionObj);
							}
						})
					})
				}
			})
			
		}
		
		Opinions1=opinionsByType;
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
			//{"class":"0","name":"公用意见","id":"COMMON",datalist:[],tourl:ZjgyHost + ZjgyUrl["getcommonOpinion"]+"?opinionCategory=COMMON"},
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
