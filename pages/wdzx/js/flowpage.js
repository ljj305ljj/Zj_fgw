var docInfor = toArr(App.LS.get("docInfor"));
var userinfo = toArr(App.LS.get('userInfo'));
var listInfo = toArr(App.LS.get("listInfo"));
addvisibListener();
//addCookie("callback", "", 7, "/");//回调函数存放在cookie中，存放再LS中IPHONE7手机有问题。
//tree 组件用于自由流人员选择；
Vue.component('tree',{
				props: ['item'],
				template:`<li :index="item.key">
							<label :class="{'tree-act':(item.lever==0 && item.data.treeDisabled=='true' && item.key==0),'dept-lab':item.data.treeDisabled=='true','people-lab':item.data.treeDisabled=='false'}" :data-uid="item.data.treeId" :data-uname="item.data.treeName" data-ulevel="item.userLevel" @click="item.data.treeDisabled=='true'?freedeptEvent($event):freepeoEvent($event,item.data)"><b v-if="item.data.treeDisabled=='true'" :class="item.lever==0?'icon-subup':'icon-addup'" class="rjicon"> </b>{{item.data.treeName}}</label>
							<ul v-if="item.data.treeDisabled=='true'" :perno="item.data.treeId" class="tree-dept">
								<tree v-for="(subItem,sIndex) in item.data.children" :key="sIndex"  :item='{data:subItem,key:sIndex,lever:(item.lever+1)}'>{{sIndex}}</tree>
							</ul>
						</li>`,
				methods:{
					freedeptEvent:function(_this){
						if($(_this.currentTarget).hasClass("tree-act")){
							$(_this.currentTarget).find("b").attr("class","rjicon icon-addup");
							$(_this.currentTarget).removeClass("tree-act");
						}else{
							$(_this.currentTarget).find("b").attr("class","rjicon icon-subup");
							$(_this.currentTarget).addClass("tree-act");
						}
					},
					freepeoEvent:function(_this,people){
						_this=_this.currentTarget;
						var pno = $(_this).data("pno");
						var uid = $(_this).data("uid");
						var uname = $(_this).data("uname");
						if($(_this).hasClass("pp-act")){
							$(_this).removeClass("pp-act");
							flowPage.selUsers.splice($.inArray(people,flowPage.selUsers),1)
						}else{
							$(_this).addClass("pp-act");
							flowPage.selUsers.push(people);
							//var backVal=uid+":"+pno+":"+uname+":"+operateType;
							//$('#resultUser').append('<label data-uid="'+uid+'" data-back="'+backVal+'" class="">'+uname+'<span class="rjicon icon-cuowu"></span></label>');
						}
					}
				}
			})
			window.flowPage=new Vue({
				el: '#flowPages',
				data(){
				    return{
				      	flowtype:App.LS.get("flowType"),
						objResult:[],
						dataResult:{},
						sendObj:{},
						buttonDisable:false,//无法点击事件
						leaderObj:[],
						objIndex:0,
						selResult:{},
						unitInDex:0,
						selUsers:[],	
						opinion:{opinionBody:'',CommonOpinion:[],CommonTab:0},	
						transitionLabel:""//路径编码				
				    }
				},
				created(){
					fontSizeSet.initFontSize();	
				},
				mounted:function(){
					//console.log(this.flowtype);
					this.dataResult=new Object();
					wispApp.UI.showProgressDialog("正在加载页面数据...");
					if(this.flowtype=="jsReturn" ){
						this.cancleaction('jsReturn');
						$("title")[0].innerText="退 回";
					}else if(this.flowtype=="jsSend" || this.flowtype=="jsSendfreedom"){
						this.jsSend(this.flowtype);
						$("title")[0].innerText='发  送';
					}else if(this.flowtype=="jsPass"){
						this.jsSend("MOAUserPass");
						$("title")[0].innerText='转  办';
					}else if(this.flowtype=="cancleFinished"){
						this.cancleaction('cancleFinished');
						$("title")[0].innerText="取消办结";
					}else{
						this.opinion.CommonOpinion=eval("("+App.LS.get("CommonOpinion")+")");
						var flowParam=eval("("+App.LS.get('flowParam')+")");
						var _self=this;
						if(flowParam[1]){							
							_self.opinion.opinionBody = flowParam[1].opinionContent;
							var defaultTab = "修改意见";
						}else{
							var defaultTab = "新意见";
						}
						try{wispApp.UI.dismissProgressDialog();}catch(e){}
						_self.opinion.data=flowParam[0];
						_self.opinion.opinion=flowParam[1];
						$("title")[0].innerText=defaultTab;
					}
				},
				methods:{
					smsEvent:function(_this){
						$(_this.currentTarget).toggleClass("icon-selected");
					},
					ObjEvent: function(_this){	
						var _self=this;
						var thisNum = $(_this.currentTarget).data("nums");
						if(!($(_this.currentTarget).hasClass("action-sel"))){
								$(_this.currentTarget).siblings().removeClass("action-sel");
								$(_this.currentTarget).addClass("action-sel");
								_self.objIndex=0;
								_self.selResult=_self.objResult[thisNum].assigndStates[0];
								_self.selUsers=[];
								if(_self.selResult.autoSend==1){
									$.each(_self.selResult.selUsers,function(k,kItem){
										_self.selUsers=_self.selUsers.concat(kItem);
									})
								}
								if(_self.objResult[thisNum].assigndStates.length>1){
									_self.dataResult=_self.objResult[thisNum];
								}else{
									_self.dataResult=[];
								}
						}
					},
					UnitEvent: function(_this){	
						var _self=this;
						var thisNum = $(_this.currentTarget).data("nums");	
						if(!($(_this.currentTarget).hasClass("action-sel"))){
								$(_this.currentTarget).siblings().removeClass("action-sel");
								if(_self.flowtype=="jsReturn"){//退回
									if(!($(_this.currentTarget).hasClass("action-sel"))){
										$(_this.currentTarget).addClass("action-sel");
										_self.unitInDex=thisNum;
										_self.selResult=_self.dataResult[thisNum].selUsers;
										if(_self.selResult.length==1){
											_self.selUsers=_self.selResult;
										}
									}									
								}else{
									$(_this.currentTarget).addClass("action-sel");
									if($("#valObj").is(':visible') || _self.flowtype=="jsSendfreedom" || _self.flowtype=="leaderSend"){//并发 或者 自由流
										
									}else{
										_self.selUsers=[];
									}
									_self.objIndex=thisNum;
									if(_self.flowtype!="jsSendfreedom" && _self.flowtype!="leaderSend"){//发送，转办
										_self.selResult=_self.dataResult.assigndStates[_self.objIndex];
										if(_self.dataResult.assigndStates[_self.objIndex].autoSend==1){
											$.each(_self.selResult.selUsers,function(k,kItem){
												_self.selUsers=_self.selUsers.concat(kItem);
											})
										}
									}else{//自由流程发送
										_self.selResult=_self.dataResult[Object.keys(_self.dataResult)[_self.objIndex]];
									}							
							}
						}
						
					},
					deptEvent:function(_this){
						var thisId = $(_this.currentTarget).attr("data-deptid");
						//console.info(thisId)
						if($(_this.currentTarget).hasClass("sel-act")){
							$(_this.currentTarget).removeClass("sel-act");
							$(_this.currentTarget).find("span").attr("class","rjicon icon-addup span-chack");
						}else{
							$(_this.currentTarget).addClass("sel-act");
							$(_this.currentTarget).find("span").attr("class","rjicon icon-subup span-chack");
						}
					},
					userEvent:function(_this,people,actClass){
						var _self=this;
						if(typeof(actClass)=="undefined")actClass="pp-act";
						if(!$(_this.currentTarget).hasClass(actClass)){
							_self.selUsers.push(people);
							$(_this.currentTarget).addClass(actClass);							
						}else{
							_self.selUsers.splice($.inArray(people,_self.selUsers),1)
							$(_this.currentTarget).removeClass(actClass);		
						}
					},
					selUserEvent:function(_this,people,actClass){	//已选人员					
						if(typeof(actClass)=="undefined")actClass="pp-act";
						var uid =$(_this.currentTarget).attr("data-uid");
						$("#"+((this.flowtype=="jsReturn")?'People-btn-reback':'box-deptList')).find("label[data-uid="+uid+"]").removeClass(actClass);
						//console.log($.inArray(people,this.selUsers));
						this.selUsers.splice($.inArray(people,this.selUsers),1);										
					},
				    jsSend:function(type){
						var _self=this;
						var getUrl='';
						var urlNo='';
						switch (type) {
							case "jsSend":
								urlNo="Gfs-"+App.LS.get("module");
								getUrl= ZjgyHost + ZjgyUrl[urlNo];
								this.jsSendBody(getUrl,type);								
								break; 
							case "jsSendfreedom":
								urlNo="Gfs-fd-"+App.LS.get("module");
								getUrl= ZjgyHost + ZjgyUrl[urlNo] + "?treeType=current_dept_user";
								this.jsFreeSend(getUrl,type);
								break; 
							case "MOAUserPass":
								urlNo="Gzb-"+App.LS.get("module");
								getUrl= ZjgyHost + ZjgyUrl[urlNo];
								this.jsSendBody(getUrl,type);
								break; 
							case "toRead":
								urlNo="Gfs-fd-"+App.LS.get("module");
								getUrl= ZjgyHost + ZjgyUrl[urlNo] + "?treeType=current_dept_user";
								this.jsFreeSend(getUrl,type);
								$("title")[0].innerText='传  阅';
								break; 
							case "toSend":
								urlNo="Gfs-fd-"+App.LS.get("module");
								getUrl= ZjgyHost + ZjgyUrl[urlNo] + "?treeType=current_dept_user";
								this.jsFreeSend(getUrl,type);
								$("title")[0].innerText='分  发';
								break;
						} 	
					},
					jsSendBody:function(getUrl,sendtype){//发送&转办						
						var _self=this;
						var datainfo=docInfor;
						getUrl=getUrl+'?docId='+datainfo.id+'&workTodoId='+listInfo.id+'&processId='+datainfo.flowProcessId;
						ajaxRequst(getUrl,'get','application/json;charset=UTF-8','json','').then(function(obj){
							//console.info(obj);
							if(obj.length==0){
								toast("未找到下一环节");
								goBack();
								try {wispApp.UI.dismissProgressDialog();} catch(e) {}
								return;
							}else{
								try {wispApp.UI.dismissProgressDialog();} catch(e) {}
								if(obj.length==1 && obj[0].autoType==1 && true){
									//领导发送
									_self.flowtype = "leaderSend";
									_self.jsFreeSend("","leaderSend");
									_self.leaderObj = obj;
									console.info("领导发送")
									return false;
								}
								$.each(obj,function(i,item){
									$.each(item.assigndStates,function(j,jItem){
										var obj={};
										if(jItem.listUsers.length>0){
											$.each(jItem.listUsers,function(k,kItem){
												var fname='流程人员';
												//fname=fname.substr(fname.lastIndexOf('/')+1);
												kItem.transitionLabel=item.transitionLabel;
												kItem.stateLabel=jItem.stateLabel;
												kItem.stateName=jItem.stateName;
												if(typeof(obj[fname])=="undefined")obj[fname]=[];
												obj[fname].push(kItem);
												//if(item.autoType==1 && _self.objIndex==i && _self.unitInDex==j)_self.selUsers.push(kItem);
												if((k+1)==jItem.listUsers.length){
													jItem.selUsers=obj;	
													if(j==0 && $.isEmptyObject(_self.selResult)){//赋值
														_self.selResult=jItem;
													}
												}	
											})
										}else{
											jItem.selUsers=[];	
										}																				
									})									
								});
								console.log(obj);
								_self.objResult = obj;
								_self.dataResult=_self.objResult[0];
							}	
						})	
					},
					submitSend:function(){
						var _self=this;
						try {wispApp.UI.showProgressDialog();} catch(e) {}	
						var obj={};
						var Result=[];
						$.each(_self.selUsers, function(i,people) {
							//"selOrgs": [],"selGroups": [],
							if(typeof(obj[people.stateLabel])=="undefined"){
								obj[people.stateLabel]={};
								obj[people.stateLabel].transitionLabel=people.transitionLabel;
								obj[people.stateLabel].selOrgs=[];
								obj[people.stateLabel].selGroups=[];
								obj[people.stateLabel].stateLabel=people.stateLabel;
								obj[people.stateLabel].stateName=people.stateName;
								obj[people.stateLabel].selUsers=[];
							}
							obj[people.stateLabel].selUsers.push({"orgNameChain":people.orgNameChain,"orgNo":people.orgNo,"systemNo":people.systemNo,"unitNo":people.unitNo,"userName":people.userName,"userNo":people.userNo});
							if(i+1==_self.selUsers.length){//最后一个；
								$.each(obj,function(i,item){
									//var _temp={slab:i.split(":")[0],stlab:i.split(":")[1],msgType:"",sendMsg:false,selUsers:item};
									// if($("#valMsm").hasClass("icon-selected")){
									// 	_temp.msgType="3";
									// 	_temp.sendMsg=true;
									// }
									Result.push(item);
									if(Object.keys(obj)[Object.keys(obj).length-1]==i){
										var urlNos='';
										var todata={};
										if(_self.flowtype == "jsSend"){
											urlNos="Tfs-"+App.LS.get("module");
										}else{
											urlNos="Tzb-"+App.LS.get("module"); 
										}
										todata={docId:docInfor.id,workTodoId:listInfo.id,submitStates:Result};
										console.log(todata);
										//return false
										ajaxRequst(ZjgyHost + ZjgyUrl[urlNos],'post','application/json;charset=UTF-8','json',JSON.stringify(todata)).then(function(submitobj){
											if(submitobj){
												try{toast("操作成功");}catch(e){}
												closePage('closePage("refreshList()")');
												//_self.submitOpinion();
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
								})	
							}
						});
					},
					submitOpinion:function(){
						var flowSlab = docInfor.permission.stateLabel;
						var docid = docInfor.id;
						var userno = docInfor.permission.originUserNo;	
						ajaxRequst(ZjgyHost + ZjgyUrl["public-Opinion"],'post','application/json;charset=UTF-8','json',JSON.stringify({flowSlab:flowSlab,docId:docid,opinionUserNo:userno})).then(function (submitobj) {  
								closePage('closePage("refreshList()")');
							})
					  
					},
					jsFreeSend:function(getUrl,sendtype){//自由流发送
						var _self=this;
						var userLevel = userinfo.userLevel?userinfo.userLevel:"";
						var range = userinfo.unitNo?userinfo.unitNo:"";
						var orgNo = userinfo.orgNo?userinfo.orgNo:"";
						UnitPersonList=[];	
						if(sendtype == "toRead"){
							//传阅
							var UnitPerson = ["本部门人员","所有人"];
						}else if(sendtype == "jsSendfreedom"){
							//自由流发送
							if(userLevel=="9"){
								var UnitPerson = ["本部门人员"];
							}else{
								var UnitPerson = ["常用联系人","所有人"];
							}
						}else if(sendtype == "toSend"){
							//分发
							var UnitPerson = ["分发单位"];
						}else if(sendtype == "leaderSend"){//领导特殊发送
							var UnitPerson = ["常用联系人","所有人"];
						}
						var promiseAllarray=[];
						$.each(UnitPerson,function(i,item){
							switch (item) {
								case "本部门人员":
									getUrl = ZjgyHost + ZjgyUrl["Gfs-fd-request"] + "?treeType=user"+"&range="+"direct"+"&orgNo="+orgNo;//本部门人员3
									promiseAllarray.push(_self.getFreeAllPeople(getUrl,"本部门"));
									break; 
								case "常用联系人":
									getUrl = ZjgyHost + ZjgyUrl["FreeDom-request"];//常用联系人1
									promiseAllarray.push(_self.getFreePeople(getUrl,'常用联系人'));
									break;
								case "所有人":
									getUrl = ZjgyHost + ZjgyUrl["Gfs-fd-request"] + "?treeType=user";//所有用户2
									promiseAllarray.push(_self.getFreeAllPeople(getUrl,"所有人"));
									break;
								case "本部门":
									getUrl = ZjgyHost + ZjgyUrl["Gfs-fd-request"] + "?treeType=user"+"&range="+"direct"+"&orgNo="+range;//本部门4
									promiseAllarray.push(_self.getFreeAllPeople(getUrl,"所有人"));
									break;
								case "分发单位":
									getUrl = ZjgyHost + ZjgyUrl["Gff-dept"] + "?treeType=unit";//分发单位5
									promiseAllarray.push(_self.getFreeAllPeople(getUrl,"分发单位"));
									break;
								case "群组":
									getUrl = ZjgyHost + ZjgyUrl["Gfs-fd-group"];//群组
									promiseAllarray.push(_self.getFreeAllPeople(getUrl,"群组","post"));
									break;
							}
							_self.selResult={a:1};
							if(UnitPerson.length == i+1){
								Promise.all(promiseAllarray).then((result) => {
									try{wispApp.UI.dismissProgressDialog();}catch(e){}
									_self.$set(_self.dataResult,_self.dataResult);
									_self.selResult=_self.dataResult[Object.keys(_self.dataResult)[0]];
									if($.isEmptyObject(_self.dataResult)){									
										App.UI('dialog', {
											type : 'alert',
											title: 'cuowu',
											msg  : '数据异常，人员列表获取失败！',
											times :3000
										})
										closePage();
									}
								}).catch((error) => {
								  console.log(error)
								})
							}	
						});
					},
					getFreePeople:function(getUrl,type){
						var _self=this;
						//常用联系人
						var obj={};
						return new Promise((resolve, reject) => {
							ajaxRequst(getUrl,'post','application/json;charset=UTF-8','json',JSON.stringify({userNo:userinfo.userNo}),false).then(function (item) {
								var ptemp=[];
								$.each(item,function(i,obj){
									ptemp.push({treeDisabled:false,treeId:obj.contactNo,treePid:obj.contactOrgNo,treeName:obj.contactName,userLevel:obj.contactDutyValue})
								})
								
								if(typeof(obj[type])=="undefined")obj[type]=[];
								obj[type]=obj[type].concat(ptemp);
								$.extend(_self.dataResult,obj);	
								resolve();
							});
						})
						  
					},
					getFreeAllPeople:function(getUrl,types,urltype){
						var _self=this;
						var objs={};
						//本部门人员&&所有人
						urltype = urltype?urltype:"get";
						return new Promise((resolve, reject) => {
						  ajaxRequst(getUrl,urltype,'application/x-www-form-urlencoded','json','',false).then(function (obj) {
								if(types=="所有人"){
									var allUser = [];
									var selPid = false;//可否选中父级单位id
									allUser = _self.getTrees(obj,"",selPid);
								}else if(types=="分发单位"){
									var allUser = [];
									var selPid = true;//可否选中父级单位id
									allUser =_self.getTrees(obj,"",selPid);
								}else if(types=="群组"){
									var allUser = [];
									var selPid = false;//可否选中父级单位id
									allUser =_self.creactReadTree(obj);
								}else{
									allUser=obj;
								}
								console.info(objs);
								//console.log(_self.dataResult);
								if(typeof(objs[types])=="undefined")objs[types]=[];
								objs[types]=objs[types].concat(allUser);
								console.log(objs);
								$.extend(_self.dataResult,objs);
								//console.log(_self.dataResult);
								resolve();
							});
						})	
					},
					getTrees:function(list, parentId, selPid) {
						var _self=this;
						var items= {};
						var thisDept = userinfo.unitNo?userinfo.unitNo:"";
						// 获取每个节点的直属子节点，*记住是直属，不是所有子节点
						for (var i = 0; i < list.length; i++) {
							 var key = list[i].treePid;
							 if(list[i].treeId == thisDept){parentId=key;}
							 if (items[key]) {
								 items[key].push(list[i]);
							 } else {
								 items[key] = [];
								 items[key].push(list[i]);
							 }
						 }
						 return _self.formatTree(items, parentId, selPid);
					},
					formatTree:function(items, parentId, selPid) {/*利用递归格式化每个节点*/
						var _self=this;
						var result = [];
						if (!items[parentId]) {
							return result;
						}
						for (var t of items[parentId]) {
							if(selPid){
								var b=_self.formatTree(items, t.treeId, selPid);
								var a=[{"treeId":t.treeId,"treePid":t.treeId,"treeName":t.treeName,"treeDisabled":false,"children":[]}];
								t.children = a.concat(b)
								result.push(t);
							}else{
								 t.children = _self.formatTree(items, t.treeId, selPid)
								 result.push(t);
							}
						}
					  return result;
					},
					creactReadTree:function(treeList){
						var backinfo = {};
						var backArry = [];
						$.each(treeList,function(i,item){
							if(item.groupNo==""){
								backinfo[item.userNo] = {"treePid":"","treeName":item.userName,"treeId":item.userNo,"treeDisabled":"true","TREE_TYPE":"ORG","children":[]};
							}
						})
						$.each(treeList,function(i,item){
							if(item.groupNo!=""){
								backinfo[item.groupNo].children.push({"treePid":item.groupNo,"treePname":item.groupName,"treeId":item.userNo,"TREE_TYPE":"USER","treeName":item.userName,"userLevel":item.userLevle,"userOrgNo":item.userOrgNo});
							}
						})
						$.each(backinfo,function(i,item){
							backArry.push(item)
						});
						return backArry;
					},
					submitFreeSend:function(){
						var _self=this;	
						try {wispApp.UI.showProgressDialog();} catch(e) {}
						var Result=[[{slab:'',stlab:'',selUsers:[]}],{msgType:""}];
						Result[0][0].slab = docInfor.permission?docInfor.permission.stateLabel:"";
						if($("#valMsm").hasClass("icon-selected")){Result[1].msgType="3";}
						var userLevel = userinfo.userLevel?userinfo.userLevel:"0";
						var operateType=1;
						$.each(flowPage.selUsers, function(i,people) {
							var ulevel = people.userLevle;
							if(parseInt(userLevel) > parseInt(ulevel)){
								operateType=2;
							}else if(parseInt(userLevel) == parseInt(ulevel)){
								operateType=0;
							}
							Result[0][0].selUsers.push({uid:people.treeId,did:people.treePid,uname:people.treeName,operateType:operateType});
						})
						var todata={};
						var urlNos="Tfs-fd-"+App.LS.get("module"); 	
						if(Result[1].msgType==""){
							todata={aid:docInfor.permission.aid,docId:docInfor.form.id,nextStates:Result[0]};
						}else{
							todata={aid:docInfor.permission.aid,docId:docInfor.form.id,msgType:Result[1].msgType,nextStates:Result[0]};
						}
						ajaxRequst(ZjgyHost + ZjgyUrl[urlNos],'post','application/json;charset=UTF-8','json',JSON.stringify(todata)).then(function(submitobj) {  
								try{wispApp.UI.dismissProgressDialog();}catch(e){}
								if(submitobj){
									toast( '发送成功！');
									_self.submitOpinion();				
									return ;
								}else{
									toast( '发送失败！');
									return ;
								}		  
						});
					},
					submitToReadSend: function(sendtype){
						try {wispApp.UI.showProgressDialog();} catch(e) {}
						var Result=[];
						if(sendtype == "toRead"){
							var toUrl = ZjgyHost + ZjgyUrl["word-toRead"];
						}else{
							var toUrl = ZjgyHost + ZjgyUrl["word-toSend"];							
						} 
						$.each(flowPage.selUsers, function(i,people) {							
							Result.push({id:people.treeId,did:people.treeName});
						})
						var todata={docId:docInfor.form.id,groupNos:[],units:Result};
						ajaxRequst(toUrl,'post','application/json;charset=UTF-8','json',JSON.stringify(todata)).then(function (submitobj) {  
								try{wispApp.UI.dismissProgressDialog();}catch(e){}
								if(submitobj){
									toast( '操作成功！');				
									return ;
								}else{
									toast( '操作失败！');
									return ;
								} 
						});
					},
					submitLeaderSend: function(sendtype){
						//领导发送
						try {wispApp.UI.showProgressDialog();} catch(e) {}
						var _self = this;
						var Result = [];
						var sendP = _self.leaderObj[0].stateInfos[0].selUsers;
						$.each(flowPage.selUsers, function(i,people) {
							var flag = true;
							$.each(sendP, function(j,sp) {
								if(people.treeId == sp.uid){
									flag = false;
								}
							});
							if(flag){Result.push({userNo:people.treeId,userName:people.treeName});}
						});
						if(Result.length>0){
							var toUrl = ZjgyHost + ZjgyUrl["word-toRead"];
							var todata={docId:docInfor.form.id,groupNos:[],users:Result};
							ajaxRequst(toUrl,'post','application/json;charset=UTF-8','json',JSON.stringify(todata)).then(function (submitobj) {  
									try{wispApp.UI.dismissProgressDialog();}catch(e){}
									if(submitobj){
										_self.leaderAutoSend();
										//toast( '操作成功！');				
										return ;
									}else{
										toast( '操作失败！');
										return ;
									} 
							});
						}else{
							_self.leaderAutoSend();
						}
						
					},
					leaderAutoSend:function(){
						var _self=this;
						try {wispApp.UI.showProgressDialog();}catch(e){}	
						var obj={};
						var Result=[];
						var sendP = _self.leaderObj[0].stateInfos[0].selUsers;
						var _temp=[{slab:_self.leaderObj[0].toslab,stlab:_self.leaderObj[0].tlab,msgType:"",sendMsg:false,selUsers:sendP}];
						var todata={aid:docInfor.permission.aid,docId:docInfor.form.id,nextStates:_temp};
						if($("#valMsm").hasClass("icon-selected")){
							_temp.msgType="3";
							_temp.sendMsg=true;
						}
						console.log(todata);
						var urlNos="Tfs-"+App.LS.get("module");
						ajaxRequst(ZjgyHost + ZjgyUrl[urlNos],'post','application/json;charset=UTF-8','json',JSON.stringify(todata)).then(function(submitobj){
							if(submitobj){
								try{toast("操作成功");}catch(e){}
								_self.submitOpinion();
							}else{
								App.UI('dialog', {
									type : 'alert',
									title: 'cuowu',
									msg  : '操作失败！',
									times :3000
								});
							}
						})
						
					},
					cancleaction: function(type){/*退回代码----------取消办结*/
						var _self=this;
						if(type=="cancleFinished"){//取消办结
							var urlNo="Qxbj-"+App.LS.get("module");
						}else{//退回
							var urlNo="Gth-"+App.LS.get("module");
						}
						var getUrl=ZjgyHost + ZjgyUrl[urlNo]+'?processId='+docInfor.flowProcessId+'&workTodoId='+listInfo.id+'&docId='+docInfor.id;
						ajaxRequst(getUrl,'GET','application/json;charset=UTF-8','json','').then(function (obj) { 
							if(obj.length==0){
								try{wispApp.UI.dismissProgressDialog();}catch(e){}
								toast("未找到上一环节")
								closePage();
								return false;
							}		
							_self.transitionLabel = obj[_self.objIndex].transitionLabel;
							_self.dataResult=obj[_self.objIndex].assigndStates;
							_self.selResult=obj[_self.objIndex].assigndStates[_self.unitInDex].listUsers;
							if(_self.selResult.length==1){
								_self.selUsers=[].concat(_self.selResult);
							}
							try{wispApp.UI.dismissProgressDialog();}catch(e){}
						})
					},
					submitCancel: function(sendtype){	/*退回代码----------取消办结*/
						var _self=this;
						_self.buttonDisable=true;
						if(sendtype=="cancleFinished"){//取消办结
							var urlNos="QxbjTj-"+App.LS.get("module");
							var Result=[].concat(_self.dataResult);	
							Result[0].selUsers=[];	
							var operation="取消办结";					
						}else{//退回
							var urlNos="Tth-"+App.LS.get("module");
							var _slab=$("#Unit-btn-reback").find(".action-sel").data("back");
							var Result=[{
								transitionLabel:_self.transitionLabel,
								stateLabel:_self.dataResult[_self.unitInDex].stateLabel,
								stateName:_self.dataResult[_self.unitInDex].stateName,
								selUsers:[],
								selOrgs:_self.dataResult[_self.unitInDex].listOrgs,
								selGroups:_self.dataResult[_self.unitInDex].listGroups
							}];
							//Result[0].slab=_slab;
							var operation="退回";	
						}
						$.each(flowPage.selUsers, function(i,people) {			
							Result[0].selUsers.push({userNo:people.userNo,userName:people.userName,orgNo:people.orgNo,orgNameChain:people.orgNameChain,unitNo:people.unitNo,systemNo:people.systemNo});	
						})
						var getUrls=ZjgyHost + ZjgyUrl[urlNos];
						try {wispApp.UI.dismissProgressDialog("正在"+operation+"，请稍候");} catch(e) {}
						ajaxRequst(getUrls,'post','application/json;charset=UTF-8','json',JSON.stringify({workTodoId:listInfo.id,docId:docInfor.id,submitStates:Result})).then(function (submitobj) {
							if(submitobj){
								try{toast(operation+"成功！",3000);}catch(e){}
								//执行成功,刷新视图
								closePage('closePage("refreshList()")');
							}else{
								toast(operation+"失败！",3000);
							}
						})
					},
					opinionEvent:function(_this){//意见选项绑定事件
						var _self=this;
						var _this = _this.currentTarget;
						var opinval  = $(_this).attr("data-val");
						
						if(!$(_this).find("span").eq(0).hasClass('icon-selected'))$("#valOpinion").val(_self.opinion.opinionBody+opinval);
						_self.opinion.opinionBody=$("#valOpinion").val();
						$(_this).find("span").eq(0).toggleClass("icon-selected");
					},
					submitOpin:function(){
						this.buttonDisable=true;
						var _self=this;
						var data=_self.opinion.data;
						var opinion=_self.opinion.opinion;
						var opinionBody=_self.opinion.opinionBody;	
						var stateBase = toArr(App.LS.get("stateBase"));	//当前环节信息
						var userinfo = toArr(App.LS.get('userInfo'));				
						try {wispApp.UI.showProgressDialog("正在提交意见");}catch(e){};
						console.log(data);
						/*意见提交post参数
						{
							id: "",
							createTime: null,
							opinionContent: "同意",
							opinionCode: "signOpinion",
							opinionCodeName: "签发意见",
							opinionUserNo: "U000000",
							flowSlab: "state30",
							docId: "120082d4978a2000"
						}*/
						var _url = ZjgyHost + ZjgyUrl['opinion-add'];
						if(opinion){
							var item = eval("(" +App.LS.get('userInfo')  + ")");
							opinion.createTime=(new Date()).Format("yyyy-MM-dd hh:mm:ss");
							opinion.opinionContent=opinionBody;
							paradata=Object.assign({},opinion);
							_url = ZjgyHost + ZjgyUrl['opinion-upd'];
						}else{
							var activeinfo = docInfor;
							//var flowSlab = activeinfo.permission.stateLabel;
							//var paradata={agentStatus:0,docId:App.LS.get("docId"),flowSlab:flowSlab,moduleId:data.businessNo,opinionCode:data.opinionNo,opinionCodeName:data.optionName,opinionContent:opinionBody,status:0};		
							var paradata = {
								id: "",
								createTime: null,
								opinionContent: opinionBody,
								opinionCode: data.opinionNo,
								opinionCodeName: data.optionName,
								opinionUserNo: userinfo.username,
								flowSlab: stateBase.stateLabel,
								docId: docInfor.id
							}
													
						}
						if(data.imageContent){paradata.opinionContent='';paradata.imageContent=data.imageContent;}
						
						//console.log(paradata);
						ajaxRequst(_url,'post','application/json;charset=UTF-8','json',JSON.stringify(paradata)).then(function (responseData) {
								toast("意见提交成功",2000);
								closePage('baseCommon.getOpinionList(true);');
								try{wispApp.UI.dismissProgressDialog();}catch(e){}
								//},500);
							},function(e){
								toast("意见提交失败！",2000);
								try{wispApp.UI.dismissProgressDialog();}catch(e){}
								return false;
							})
					},
					opinionchange:function(x){
						this.opinion.CommonTab = x;
					},
					claerOpinion:function(){
						this.opinion.opinionBody = '';
					}
				}
			});	




