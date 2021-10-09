var imgOpinionType="";
var submitFlag = false;
var HandWrieting = {
	submitFlag:false,
	clickOpinion : function(OpinionType,type){
		console.info(OpinionType)
		imgOpinionType=OpinionType;
		imgOpinionType=OpinionType;
				// ////h5Wisp.UI.HandWriting();			
				var bodyh= $(window).height();
				var bodyw= $(window).width();
				//隐藏头部和底部 以及 扩展高度
				// $("#FileBtn,#swiper-container2").hide();
				// $("#swiper-container3").css("padding","0");
				// $("#swiper-container3 .swiper-wrapper").height(bodyh);
				// alert(OpinionType.opinionNo)
				$("#v-"+OpinionType.opinionNo).append('<div id="hwView" style="height:250px;width:100%;margin-bottom: 15px;"></div>');
				//alert(JSON.stringify(OpinionType))
				var HWPosition=HandWrieting.getHWPosition();		
				var isSupportPen=false;
				if(/(SCM-AL09|BAH3-AN10)/i.test(navigator.userAgent)) {//支持手笔分离的设备
					isSupportPen=true;
				}	
				dingAuth(function(){
					dd.ready(function() {
                    try{dd.biz.util.startDocSign({
                        mode: 1,
                        userName: userinfo.userName,
                        copyRight: jgAuth.copyRight,  //金格授权码
						isSupportPen:isSupportPen,//是否手笔分离
						top:HWPosition.top,
						left:HWPosition.left,
						width:HWPosition.width,
						height:HWPosition.height,
                        onSuccess: function(result) {
                           if(result.code!="-1"){
							try {wispApp.UI.showProgressDialog("正在上传意见");} catch(e) {}	
								var _url=fcsurl+'fileurl='+encodeURIComponent(result.url)+"&task=none&type=src&res=url&filetype=png";
								//alert(_url)
								$.ajax({
									type: "GET",
									url: _url,
									dataType: "jsonp",
									jsonp: "jsoncallback",
									success: function (result){
										//console.log(fcshost+result.Content);	
										HandWrieting.getBase64(fcshost+result.Content)
											.then(function(base64){
												  //alert(base64);//处理成功打印在控制台
												  saveTopic(base64,OpinionType)
											},function(err){
												  console.log(err);//打印异常信息
											}); 
									}
								})
	
								
						   }else{
							 $("#hwView").remove();
						   }
                        },
                        onFail: function(err) {
                            alert('DD error:'+JSON.stringify(err));
                        }
                    })
					}catch(e){alert(e.description)}
				})
				})
				dd.error(function(err) {										//alert("应用编号<br>corpId"+corpId+"<br>timeStamp"+timeStamp+"<br>nonceStr"+nonceStr+"<br>signature"+signature);
					alert('dd error: ' + JSON.stringify(err));
				});
	},
	getHWPosition : function(){
		if(navigator.userAgent.toLowerCase().indexOf("android")==-1){
			var tops=0;
		}else{
			var tops=60;
		}
		var ratio=window.devicePixelRatio;
		var bodyh= $(window).height();
		var bodyw= $(window).width();
		//alert(window.screen.availHeight+"||"+$('body').height())
		var hwdiv = document.getElementById("hwView");//容器
		var vlw = hwdiv.getBoundingClientRect().left*ratio;//容器起点左
		var vth = hwdiv.getBoundingClientRect().top*ratio;//容器起点上
		var vrw = $("#hwView").width()*ratio;//容器宽度
		var vbh = $("#hwView").height()*ratio;//容器高度
		var getTitle ={top:vth,left:vlw,width:vrw,height:vbh};
		return getTitle;
	},
	getBase64:function(img){
		function getBase64Image(img,width,height) {//width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
		  var canvas = document.createElement("canvas");
		  canvas.width = width ? width : img.width;
		  canvas.height = height ? height : img.height;		 
		  var ctx = canvas.getContext("2d");
		  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		  var dataURL = canvas.toDataURL();
		  return dataURL;
		}
		var image = new Image();
		image.crossOrigin = '';
		image.src = img;
		var deferred=$.Deferred();
		if(img){
		  image.onload =function (){
			deferred.resolve(getBase64Image(image));//将base64传给done上传处理
		  }
		  return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
		}
	 },
	closeHwRatio : function(){
		//恢复底部和头部 以及 压缩高度，删除扩充的背景
		$("#hwView").remove();
	},
	Hwhandle : function(types){
		if(types=="add"){
			$("#hwView").height($("#hwView").height() + 50);
			//h5Wisp.UI.ChangeHW(getHWPosition());
			//$("#text3").scrollTop($("#text3").scrollTop() - 25);
		}else if(types=="cut"){
			//$("#text3").scrollTop($("#text3").scrollTop() + 25);
			$("#hwView").height($("#hwView").height() - 50);
			//h5Wisp.UI.ChangeHW(getHWPosition());
		}else if(types=="up"){
			$("#text4").scrollTop($("#text3").scrollTop() + 20);
			//h5Wisp.UI.ChangeHW(getHWPosition());
		}else if(types=="down"){
			$("#text4").scrollTop($("#text3").scrollTop() - 20);
			//h5Wisp.UI.ChangeHW(getHWPosition());
		}
	},
	saveTopic : function(data,OpinionType){
		//添加手写意见
		var activeinfo = docInfor;
		var flowSlab = activeinfo.permission.stateLabel;
		var paradata={
			createTime:(new Date()).Format("yyyy-MM-dd hh:mm:ss"), 
			docId:docInfor.form.id,
			opinionCode:OpinionType.opinionNo, 
			moduleId:OpinionType.businessNo, 
			opinionCodeName:OpinionType.optionName, 
			opinionContent:'',
			imageContent:data, 
			status:OpinionType.status, 
			flowSlab:flowSlab,
			os:"dd",
		};
		var _url = ZjgyHost+ZjgyUrl["opinion-add"];
		ajaxRequst(_url,'post','application/json;charset=UTF-8','json',JSON.stringify(paradata)).then(function(result){vFBD.getFlowOpinion();},error=>{
			toast("意见提交失败！")
		})		
	},
	deleteOpinion : function(data){
		//意见删除
		var dialog = App.UI('dialog', {
			type : 'confirm',
			title: 'queren',
			OkTxt: '确认',
			CancelTxt: '取消',
			msg	 : "删除, 是否继续?"
		},function(_action){
			if(_action==='OK'){
				var _url = ZjgyHost + ZjgyUrl['opinion-del'];
				try {wispApp.UI.showProgressDialog("正在删除意见");} catch(e) {}
				App.AJ.ajax({
					"type": "post",
				    "url": _url,
				    "data": JSON.stringify([data.listdata.id]),
				    "datatype": "json",
				    "contentType": 'application/json'
				}).then((responseData) => {
					dialog.remove();
				 	if(responseData==""||responseData=="1"){
						HandWrieting.updateDoc("del");
				 		try{baseCommon.getOpinionList();wispApp.UI.showToast("意见删除成功",2000);}catch(e){}
					}else{
						try{wispApp.UI.dismissProgressDialog();}catch(e){}
					}
				});
			}
		});	
	},
	updataOpinion : function(notTip){
		//更新领导意见签名列表
		return false;
	},
	LwriteOpinion:function(data,opinion){
		var submitOpin = {"data":data, "opinionBody":opinion.opinionContent, "opinion":opinion};
		HandWrieting.newSubmitOpin(submitOpin,null,null,function(){
			vFBD.getFlowOpinion();
		});
	},
	writeOpinion:function(data,opinion){
		var temp = [];
		temp.push(data);
		if(opinion){temp.push(opinion);}
		App.LS.set('flowParam',JSON.stringify(temp));
		App.LS.set("flowType","writeOpin");
		//var doc = toArr(App.LS.get("docInfor"));
		var doc = docInfor;
        var extras = {"docFormId":doc};
		OpenWebView("pages/zwxx/FlowBoxPage.html");
		  
	},
	autoSendOpinion:function(callback){
		//自动填写意见并做回调处理
		try {wispApp.UI.showProgressDialog("正在检测是否已填写意见...");} catch(e) {}
		var opinion1 = toArr(App.LS.get('flowOpinion'));
		//var thisDoc = toArr(App.LS.get('docInfor'));
		var thisDoc = docInfor;
		console.info(docInfor)
		var users = toArr(App.LS.get('User'));
		var oplist = toArr(App.LS.get('oplist'));
		var opinion3 = [];
		try{
			var opinion2 = thisDoc.permission.business.opinions.split(";");
		}catch(e){
			var opinion2 = [];
		}
		try{
			var flowSlab = thisDoc.permission.stateLabel;
		}catch(e){
			var flowSlab = "";
		}
		var autoflag = "";
		$.each(oplist,function(i,dat){
			if(dat.opinionUserNo == users.userNo && (dat.opinionCode=="sldps" || dat.opinionCode=="shenhe" || dat.opinionCode=="review" || dat.opinionCode=="Sign" || dat.opinionCode=="ldps")){
				autoflag += dat.opinionCode;
			}
		});
		/*0903新增权限筛选*/
		var thisGroups = toArr(App.LS.get("UserGroups"));
		var thisOrgs = toArr(App.LS.get("UserOrgs"));
		$.each(opinion1,function(i,opinion){
			var orgno = opinion.orgNos?opinion.orgNos:[];
			var groupno = opinion.groupNos?opinion.groupNos:[];
			var exorgno = opinion.excludeOrgNos?opinion.excludeOrgNos:[];
			var exgroupno = opinion.excludeGroupNos?opinion.excludeGroupNos:[];
			if((exorgno.length==0 || !HandWrieting.chackPermiss(exorgno,thisGroups,thisOrgs))&&(exgroupno.length==0 || !HandWrieting.chackPermiss(exgroupno,thisGroups,thisOrgs))){
				if((orgno.length==0 || HandWrieting.chackPermiss(orgno,thisGroups,thisOrgs))&&(groupno.length==0 || HandWrieting.chackPermiss(groupno,thisGroups,thisOrgs))){
					opinion.isEdit = true;
				}else{
					opinion.isEdit = false;
				}
			}else{
				opinion.isEdit = false;
			}
		});

		if(opinion2.length>0){
			$.each(opinion1,function(i,data){
				if(data.isAuto=="1" && data.isEdit){
					//是否自动填写
					$.each(opinion2,function(j,obj){
						var bt = obj.split("|");
						if(data.opinionNo == bt[1] && autoflag.indexOf(data.opinionNo)==-1){
							var paradata={
								createTime: (new Date()).Format("yyyy-MM-dd hh:mm:ss"),
								docCate: thisDoc.form.docCate,
								docId:thisDoc.form.id,
								opinionCode:data.opinionNo,
								moduleId:data.businessNo, 
								opinionCodeName:data.opinionName, 
								opinionContent:data.defaultInfo,
								status:data.status, 
								flowSlab:flowSlab,
								opinionUnitNo:users.orgNo,
								opinionUser:users.userName,
								opinionUserNo:users.userNo,
								proxyUser:users.userName,
								proxyUserNo:users.userNo
							};
							opinion3.push(paradata);
							//if(data.opinionNo=="sldps"){HandWrieting.updataOpinion("notTip");}
						}
					})
				}
			});
			console.info(opinion3);
			if(opinion3.length>0){
//				var _url = ZjgyHost + getPartUrl("opinion-add");
				$.each(opinion3,function(i,obj){
					var _url = ZjgyHost +  ZjgyUrl['opinion-add'] + "?docId=" + obj.docId;
					App.AJ.ajax({
						"type": "post",
						"url": _url,
						"data": JSON.stringify(obj),
						"datatype": "json",
						"contentType": 'application/json'
					}).then((json) => {
						console.info(callback)
						try{if(callback && (i==opinion3.length-1)){wispApp.UI.dismissProgressDialog();eval("("+callback+")");}}catch(e){}
					},function(e){
						try{wispApp.UI.dismissProgressDialog();}catch(e){}
						wispApp.UI.showToast("请求异常，无法自动填写意见！");
					});
				});
			}else{
				//wispApp.UI.showToast("未配置默认意见，无法自动填写，请手动填写！");
				try{if(callback){wispApp.UI.dismissProgressDialog();eval("("+callback+")");}}catch(e){}
			}
		}
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
	sendAndToread:function(userlist){
		var docid = docInfor.form.id;
		var touser = [];
		$.each(userlist, function(i,peo) {
			touser.push({userNo:peo.uid,userName:peo.uname})
		});
		var _url = ZjgyHost + ZjgyUrl['toSendRead'];
		console.info(_url)
		App.AJ.ajax({
			"type": "post",
		    "url": _url,
		    "data": JSON.stringify({docId:docid,users:touser,groupNo:[]}),
		    "datatype": "json",
		    "contentType": 'application/json'
		}).then((submitobj) => {
			
		},function(e){
			
		})
	},
	updateDoc:function(type, success){
		//适用于是否填写意见，选择发送的环节不用
		if(App.LS.get("selectSendLink")!="true"||App.LS.get("selectSendLink")==null){
			console.info("无需提交表单数据");
			if(success)success();
			return false;
		}
		var part = docInfor.form;
		var oplist = toArr(App.LS.get('oplist'));
		var users = toArr(App.LS.get('User'));
		var len = 0;
		$.each(oplist, function(i,opin) {
			if(opin.opinionUserNo == users.userNo){
				len++;
			}
		});
		if(len==1&&type=="del"){
			part.switchName = "意见未填写";
		}else if(len==0&&type!="del"){
			part.switchName = "意见已填写";
		}else{
			if(success)success();
			return false;
		}
		var _url = ZjgyHost + ZjgyUrl['updateDocInfor'];
		App.AJ.ajax({
			"type": "post",
		    "url": _url,
		    "data": JSON.stringify(part),
		    "datatype": "json",
		    "contentType": 'application/json'
		}).then((submitobj) => {
			docInfor.form = part;
			if(success)success();
		},function(e){
			if(success)success();
		})
	},
	newSubmitOpin:function(submitOpinion, docInfor, users, callback){
		/*新增键盘意见,修改键盘意见,新增手写意见,修改重写手写意见*/
		//try {wispApp.UI.showProgressDialog("正在提交意见");}catch(e){};
		HandWrieting.submitFlag = true;
		console.info("-----新的提交意见接口-----");
		docInfor = docInfor?docInfor:toArr(App.LS.get('docInfor'));
		users = users?users:toArr(App.LS.get('User'));
		var docCate = "";
		var docId = "";
		var flowslab = "";
		try{docCate = docInfor.form.docCate;}catch(e){}
		try{docId = docInfor.form.id;}catch(e){}
		try{flowslab = docInfor.permission.stateLabel;}catch(e){}
		var opData = submitOpinion.data;
		var opOpinion = submitOpinion.opinion;
		var paradata={
			createTime : (new Date()).Format("yyyy-MM-dd hh:mm:ss"),
			docCate : docCate,
			docId : docId,
			flowSlab : flowslab,
			/*意见的信息*/
			moduleId : opData.businessNo,
			opinionCode : opData.opinionNo,
			opinionCodeName : opData.optionName,
			status : opData.status,
			opinionContent : submitOpinion.opinionBody,
			/*用户的信息*/
			opinionUnitNo : users.orgNo,
			opinionUser : users.userName,
			opinionUserNo : users.userNo,
			opinionDept : users.orgName, 
			opinionDeptNo : users.orgNo,
			proxyUser : users.userName,
			proxyUserNo : users.userNo,
		};
		if(opOpinion){
			/*修改*/
			paradata.id = opOpinion.id;
		}
		if(opData.imageContent){
			/*手写意见*/
			paradata.opinionContent = '';
			paradata.imageContent = opData.imageContent;
		}
		var postUrl = ZjgyHost + ZjgyUrl['opinion-add'];
		App.AJ.ajax({
			"type": "post",
		    "url": postUrl,
		    "data": JSON.stringify(paradata),
		    "datatype": "json",
		    "contentType": 'application/json'
		}).then((responseData) => {
			try {wispApp.UI.showToast("意见提交成功",2000);} catch(e) {}
			HandWrieting.submitFlag = false;
			HandWrieting.updateDoc(null,function(){
				if(opData.imageContent){
					/*手写意见,直接刷新*/
					callback();
				}else{
					/*键盘意见，加入常用意见*/
					HandWrieting.addCommonOpin(submitOpinion.opinionBody,callback);
				}
			});
		},function(e){
			HandWrieting.submitFlag = false;
			try {wispApp.UI.showToast("意见提交失败",2000);wispApp.UI.dismissProgressDialog();} catch(e) {}
		})
	},
	addCommonOpin:function(content,callback){
		var _url = ZjgyHost +  ZjgyUrl['addCommomOpinion'] + "?docCate=" + docInfor.form.docCate + "&opinionCategory=COMMON" + "&opinionContent=" +content;
		App.AJ.ajax({
			"type": "post",
		    "url": _url,
		    "data": {},
		    "datatype": "json",
		    "contentType": 'application/json'
		}).then((responseData) => {
			callback();
			try{wispApp.UI.dismissProgressDialog();}catch(e){}
		},function(e){
			callback();
			try{wispApp.UI.dismissProgressDialog();}catch(e){}
		});
	},
}