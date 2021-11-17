var docInfor = toArr(App.LS.get("docInfor"));
var userinfo = toArr(App.LS.get('userInfo'));
var listInfo = toArr(App.LS.get("listInfo"));
const stateBase =  toArr(App.LS.get("stateBase"));
addvisibListener();
//addCookie("callback", "", 7, "/");//回调函数存放在cookie中，存放再LS中IPHONE7手机有问题。
//tree 组件用于自由流人员选择；
Vue.component('tree',{
				props: ['item'],
				// template:`<li :index="item.key">
				// 			<label :class="{'tree-act':(item.lever==0 && item.data.treeDisabled=='true' && item.key==0),'dept-lab':item.data.treeDisabled=='true','people-lab':item.data.treeDisabled=='false'}" :data-uid="item.data.treeId" :data-uname="item.data.treeName" data-ulevel="item.userLevel" @click="item.data.treeDisabled=='true'?freedeptEvent($event):freepeoEvent($event,item.data)"><i v-if="item.data.treeDisabled=='true'" :class="item.lever==0?'icon-subup span-chack':'icon-addup span-chack'" class="rjicon"> </i>{{item.data.treeName}}</label>
				// 			<ul v-if="item.data.treeDisabled=='true'" :perno="item.data.treeId" class="tree-dept">
				// 				<tree v-for="(subItem,sIndex) in item.data.children" :key="sIndex"  :item='{data:subItem,key:sIndex,lever:(item.lever+1)}'>{{sIndex}}</tree>
				// 			</ul>
				// 		</li>`,
				template:`<li :index="item.key">
					<label :class="{'dept-lab':item.data.treeDisabled=='true','people-lab':item.data.treeDisabled=='false'}" :data-uid="item.data.treeId" :data-uname="item.data.treeName" data-ulevel="item.userLevel" ><span @click="item.data.treeDisabled=='true'?freedeptEvent($event):freepeoEvent($event,item.data)"><i v-if="item.data.treeDisabled=='true'" class="rjicon icon-addup"> </i><span style="padding-left:.8rem;">{{item.data.treeName}}</span></span><span v-show="item.data.treeDisabled=='true'" class="rjicon icon-chekbox" style="float: right; padding-right: .8rem;" @click="deptEventByUnit($event,item.data)"></span></label>
					<ul v-if="item.data.treeDisabled=='true'" :perno="item.data.treeId" class="tree-dept">
						<tree v-for="(subItem,sIndex) in item.data.children" :key="sIndex"  :item='{data:subItem,key:sIndex,lever:(item.lever+1)}'>{{sIndex}}</tree>
					</ul>
				</li>`,
				methods:{
					// freedeptEvent:function(_this){
					// 	if($(_this.currentTarget).hasClass("tree-act")){
					// 		$(_this.currentTarget).find("i").attr("class","rjicon icon-addup span-chack");
					// 		$(_this.currentTarget).removeClass("tree-act");
					// 	}else{
					// 		$(_this.currentTarget).find("i").attr("class","rjicon icon-subup span-chack");
					// 		$(_this.currentTarget).addClass("tree-act");
					// 	}
					// },
					// freepeoEvent:function(_this,people){
					// 	_this=_this.currentTarget;
					// 	var pno = $(_this).data("pno");
					// 	var uid = $(_this).data("uid");
					// 	var uname = $(_this).data("uname");
					// 	if($(_this).hasClass("pp-act")){
					// 		$(_this).removeClass("pp-act");
					// 		flowPage.selUsers.splice($.inArray(people,flowPage.selUsers),1)
					// 	}else{
					// 		$(_this).addClass("pp-act");
					// 		flowPage.selUsers.push(people);
					// 		//var backVal=uid+":"+pno+":"+uname+":"+operateType;
					// 		//$('#resultUser').append('<label data-uid="'+uid+'" data-back="'+backVal+'" class="">'+uname+'<span class="rjicon icon-cuowu"></span></label>');
					// 	}
					// }
					freedeptEvent:function(_this){
						if($(_this.currentTarget).find("i").hasClass("icon-subup")){
							$(_this.currentTarget).parent().removeClass("tree-act");
							$(_this.currentTarget).find("i").attr("class","rjicon icon-addup");
						}else{
							$(_this.currentTarget).parent().addClass("tree-act");
							$(_this.currentTarget).find("i").attr("class","rjicon icon-subup");
						}

					},
					freepeoEvent:function(_this,people,peoples){
						_this=_this.currentTarget;
						var pno = $(_this).data("pno");
						var uid = $(_this).data("uid");
						var uname = $(_this).data("uname");
						if($(_this).hasClass("pp-act")){
							$(_this).removeClass("pp-act");
							$(_this).children("span").removeClass("pp-act");
							//$(_this).siblings("span").removeClass("pp-act");
							flowPage.selUsers.splice($.inArray(people,flowPage.selUsers),1);
							$(_this).parent().parent().parent().parent().find(".tree-act .icon-chekbox").removeClass("icon-selected");
							$(_this).parent().parent().parent().parent().find(".tree-act .icon-chekbox").removeClass("pp-act");
						}else{
							$(_this).addClass("pp-act");
							$(_this).children("span").addClass("pp-act");
							flowPage.selUsers.push(people);
							var noSelectTimes = 0;//没选中的个数
							$.each($(_this).parent().parent().parent().find("span"),function(i,obj){
								if(!$(obj).hasClass("pp-act") && !$(obj).hasClass("icon-chekbox")){
									noSelectTimes++;
								}
							})
							if(noSelectTimes == 0){//都选中了
								$(_this).parent().parent().parent().parent().find(".tree-act .icon-chekbox").addClass("icon-selected");
								$(_this).parent().parent().parent().parent().find(".tree-act .icon-chekbox").addClass("pp-act");
							}
							//var backVal=uid+":"+pno+":"+uname+":"+operateType;
							//$('#resultUser').append('<label data-uid="'+uid+'" data-back="'+backVal+'" class="">'+uname+'<span class="rjicon icon-cuowu"></span></label>');
						}
						
					},
					deptEventByUnit:function(_this,people,actClass){ //全选按钮
						_this=_this.currentTarget;
						if(typeof(actClass)=="undefined")actClass="pp-act";
						if($(_this).hasClass("icon-selected")){
							$(_this).removeClass("icon-selected");
							$(_this).removeClass(actClass);	
							$(_this).parent().parent().find("ul span").removeClass(actClass);	
							$(_this).parent().parent().parent().find("ul span.icon-chekbox").removeClass("icon-selected");
							$(_this).parent().parent().parent().siblings(0).find("span.icon-chekbox").removeClass("icon-selected");
							let delPeoples = function(trees){
								$.each(trees,function(p,peo){
									if(peo.children && peo.children.length != 0){
										delPeoples(peo.children);
									}else{
										if($.inArray(peo,flowPage.selUsers) > -1){
											flowPage.selUsers.splice($.inArray(peo,flowPage.selUsers),1);
										}
									}
								})
							}
							delPeoples(people.children);
						}else{
							$(_this).addClass("icon-selected");
							$(_this).addClass(actClass);
							$(_this).parent().parent().find("ul span").addClass(actClass);
							$(_this).parent().parent().parent().find("ul span.icon-chekbox").addClass("icon-selected");
							//flowPage.selUsers.push(people);
							//flowPage.selUsers = people.children;
							let addPeoples = function(trees){
								$.each(trees,function(p,peo){
									if(peo.children && peo.children.length != 0){
										addPeoples(peo.children);
									}else{
										if($.inArray(peo,flowPage.selUsers) == -1){
											flowPage.selUsers.push(peo);
										}
									}
								})
							}
							addPeoples(people.children);
						}
					},
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
						transitionLabel:"",//路径编码	
						transitionInfos:[],//发送环节	
						transitionDone: stateBase.rules && JSON.parse(stateBase.rules).transitionDoneName || '办结', //办结环节名称	
						selectedTransition:""	
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
					}else if(this.flowtype=="toRead"){
						this.jsSend("toRead");
						$("title")[0].innerText='传阅';
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
								_self.selResult = _self.objResult[thisNum].assigndStates ? _self.objResult[thisNum].assigndStates[0] : (_self.objResult[thisNum].transitionName ? _self.objResult[thisNum] : "");
								_self.selUsers=[];
								if(/*_self.selResult.autoSend == 1 &&*/　_self.selResult && _self.selResult.listUsers && _self.selResult.listUsers.length == 1){
									_self.selUsers=_self.selUsers.concat(_self.selResult.listUsers[0]);
								}
								if(_self.objResult[thisNum] && _self.objResult[thisNum].assigndStates && _self.objResult[thisNum].assigndStates.length>0){
									_self.dataResult=_self.objResult[thisNum];
								}else{
									_self.dataResult=[];
								}
						}
					},
					UnitEvent: function(_this){	
						var _self=this;
						var thisNum = $(_this.currentTarget).data("nums");
						//对树形选择框进行初始化
						$(".pp-act").removeClass("pp-act");
						$(".tree-act").removeClass("tree-act");
						$("#box-deptList .icon-selected").removeClass("icon-selected");
						$("#box-deptList").find("i").attr("class","rjicon icon-addup");

						if(!($(_this.currentTarget).hasClass("action-sel"))){
								$(_this.currentTarget).siblings().removeClass("action-sel");
								if(_self.flowtype=="jsReturn"){//退回
									if(!($(_this.currentTarget).hasClass("action-sel"))){
										$(_this.currentTarget).addClass("action-sel");
										_self.unitInDex=thisNum;
										_self.selResult=_self.dataResult[thisNum].listUsers;
										if(_self.selResult.length==1){
											_self.selUsers=_self.selResult;
										}
									}									
								}else{
									$(_this.currentTarget).addClass("action-sel");
									if($("#valObj").is(':visible') || _self.flowtype=="jsSendfreedom" || _self.flowtype=="leaderSend" || _self.flowtype=="toRead"){//并发 或者 自由流
										
									}else{
										_self.selUsers=[];
									}
									_self.objIndex=thisNum;
									if(_self.flowtype!="jsSendfreedom" && _self.flowtype!="leaderSend" && _self.flowtype!="toRead"){//发送，转办
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
						if($(_this.currentTarget).hasClass("icon-subup")){
							$(_this.currentTarget).parent().removeClass("sel-act");
							$(_this.currentTarget).attr("class","rjicon icon-addup span-chack");
						}else{
							$(_this.currentTarget).parent().addClass("sel-act");
							$(_this.currentTarget).attr("class","rjicon icon-subup span-chack");
						}
					},
					userEvent:function(_this,people,peoples,actClass){
						var _self=this;
						if(typeof(actClass)=="undefined")actClass="pp-act";
						if(!$(_this.currentTarget).hasClass(actClass)){
							_self.selUsers.push(people);
							$(_this.currentTarget).addClass(actClass);						
						}else{
							_self.selUsers.splice($.inArray(people,_self.selUsers),1);
							$(_this.currentTarget).removeClass(actClass);
							$(_this.currentTarget).parent().parent().find(".sel-act .icon-chekbox").removeClass("icon-selected");
							$(_this.currentTarget).parent().parent().find(".sel-act .icon-chekbox").removeClass(actClass);
						}
						if(peoples && peoples != ""){
							var selectTimes = 0;//选中的
							$.each(peoples,function(u,peo){
								if($.inArray(peo,_self.selUsers) > -1){//如果有选中这个部门里的人员
									selectTimes++;
								}
							});
							/*if(noselectTimes == peoples.length ){
								$(_this.currentTarget).parent().parent().find(".sel-act .icon-chekbox").removeClass("icon-selected");
								$(_this.currentTarget).parent().parent().find(".sel-act .icon-chekbox").removeClass(actClass);
							}*/
							if(selectTimes == peoples.length){
								$(_this.currentTarget).parent().parent().find(".sel-act .icon-chekbox").addClass("icon-selected");
								$(_this.currentTarget).parent().parent().find(".sel-act .icon-chekbox").addClass(actClass);
							}
						}
						
					},
					userEventByDept:function(_this,peoples,actClass){
						var _self=this;
						if(typeof(actClass)=="undefined")actClass="pp-act";
						if(!$(_this.currentTarget).hasClass(actClass)){
							$.each(peoples,function(p,people){
								if($.inArray(people,_self.selUsers) == -1){
									_self.selUsers.push(people);
								}
							})
							//_self.selUsers = peoples;
							$(_this.currentTarget).addClass(actClass);
							$(_this.currentTarget).addClass("icon-selected");							
						}else{
							$.each(peoples,function(p,people){
								if($.inArray(people,_self.selUsers) > -1){
									_self.selUsers.splice($.inArray(people,_self.selUsers),1);
								}
							})
							$(_this.currentTarget).removeClass(actClass);	
							$(_this.currentTarget).removeClass("icon-selected");		
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
								getUrl= ZjgyHost + ZjgyUrl[urlNo] + "?treeType=user";
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
						getUrl=getUrl+'?docId='+datainfo.id+'&workTodoId='+ (App.LS.get("workTodoId") || listInfo.id) +'&processId='+datainfo.flowProcessId;
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
								let noAutoSend = 0;
								
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
													$.each(obj,function(u,userObj){
														userObj = sortByKeyNum(userObj,"sortNo","asc");
													})
													jItem.selUsers=obj;	
													if(j==0 && $.isEmptyObject(_self.selResult)){//赋值
														_self.selResult=jItem;
													}
												}
												if(i == 0 && jItem.selUsers && jItem.autoSend == "1"){//自动发送
													$.each(jItem.selUsers,function(u,userObj){
														//if(userObj.length == 1)
														_self.userEvent($("div.pp-sel"),userObj[0]);
													})
												}	
											})
											if(jItem.autoSend == "0"){//不自动发送
												noAutoSend ++;
											}
										}else{
											jItem.selUsers=[];	
										}																				
									})									
								});
								_self.transitionInfos = obj;
								_self.changeSendNodeName();
								
								if(noAutoSend == 0 ){
									if(getUrl.indexOf("getTransferAssign") == -1){
										App.UI('dialog', {
											type : 'confirm',
											title: 'queren',
											OkTxt: '确认',
											CancelTxt: '取消',
											msg	 : '是否确定执行办理完毕？'
										},function(_action){
											if(_action==='OK'){
												wispApp.UI.showProgressDialog("提交数据...");
												_self.submitSend();
											}
										});
									}	
								}
								console.log(_self.transitionInfos);
								_self.objResult = _self.transitionInfos;
								_self.dataResult=_self.objResult[0];
							}	
						})	
					},
					changeSendNodeName(){//用于改变发送环节名称
						let _self = this;
						
						var transitionDoneName = "办结";
						// 判断是否送主办处室,sendTargetName: 原节点名称，sendChangeName：修改后节点名称
						if(stateBase.rules){
							const sendTargetName  = stateBase.rules && JSON.parse(stateBase.rules).sendTargetName;
							const sendChangeName  = stateBase.rules && JSON.parse(stateBase.rules).sendChangeName;
							transitionDoneName  = stateBase.rules && JSON.parse(stateBase.rules).transitionDoneName;
							if (sendTargetName && sendChangeName) {
								_self.transitionInfos.forEach(item => {
									if (item.transitionName === sendTargetName) {
										item.transitionName = sendChangeName;
									}
									
								})
							}
						}
						
						let isDone = false;
						if(App.LS.get("baseAction")){
							toArr(App.LS.get("baseAction")).forEach(item => {
								let operatorId = item.split("|")[1];
								if(operatorId === "done" || operatorId === "done4join" || operatorId === "done4serial"){ //有办结按钮的话 追加办结的环节选项
									isDone = true;
									_self.operatorId = operatorId;
								}
							})
						}
						if(isDone){
							let doneTransition = {
								transitionName: "办结",
								transitionLabel: "done"
							}
							if(transitionDoneName){ doneTransition.transitionName = transitionDoneName; }
							_self.transitionInfos.push(doneTransition);
						}
					},
					submitDone(){//有办结按钮的情况
						let _self = this;
						if(_self.operatorId === "done" || _self.operatorId === "done4join" ) {
							var urlNo="Tbb-"+App.LS.get("module");//flowDone
						}else{
							var urlNo="Fsd-"+App.LS.get("module");//flowSerialDone
						}
						var getUrl=ZjgyHost + ZjgyUrl[urlNo];
						let data = {
							docId:docInfor.id,
							workTodoId:App.LS.get("workTodoId"),
							isConverge:_self.operatorId === 'done4join' ? true : false,
							triggerLoading: false
						}
						ajaxRequst(getUrl,'get','application/json;charset=UTF-8','json',data).then(function(submitobj){
							if(submitobj){
								try{toast("办理成功");}catch(e){}
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
										todata={docId:docInfor.id,workTodoId:(App.LS.get("workTodoId") || listInfo.id),submitStates:Result};
										if(App.LS.get("opinionContent")){ todata.opinionContent = encodeURI(App.LS.get("opinionContent")); } 
										App.LS.remove("opinionContent");
										console.log(todata);
										//return false
										ajaxRequst(ZjgyHost + ZjgyUrl[urlNos],'post','application/json;charset=UTF-8','json',JSON.stringify(todata)).then(function(submitobj){
											if(submitobj){
												//发送后，删除此份文本人填过的意见缓存
												let myOpinions = toArr(App.LS.get("myOpinions"));
												let otherOpinions = myOpinions.filter(opin => !((opin.docId == App.LS.get("docId") && (opin.opinionUserNo == userinfo.userId || opin.opinionUserNo == userinfo.username))));
												App.LS.set("myOpinions",JSON.stringify(otherOpinions));

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
					/**
					 *  收转发时，获取未办理人员
					 */
					unFinishedPersonnel (todoAndAtdo) {
						let _url = `${ZjgyHost}/workflow/getFlowRecordList4Page?businessDocId=${docInfor.id}${ todoAndAtdo ? '' : '&flowStatus=running'}`;
						return new Promise((resolve, reject) => 
						ajaxRequst(_url,'get','application/json;charset=UTF-8','json').then(res => {
							console.log('res', res);
							let list = [];
							if (res && res.list && res.list.length) {
								list = res.list.filter(item => {
									return (item.stateName == '会办处长' || item.stateName == '另一会办处长' || item.stateName == '会办经办');
								});
							}
							console.log('res', list);
							resolve(list);
						}).catch(err => {
							console.log(err);
							reject([]);
						}))
					},
					beforeSendRules () {//会办不办理完不允许送主办的规则
						const stateBase =  toArr(App.LS.get("stateBase"));
						// 判断是否存在规则，不允许发送
						let isOffice = stateBase && stateBase.rules && JSON.parse(stateBase.rules).isHavSendState ? JSON.parse(stateBase.rules).isHavSendState : "";
						// 判断是否存在规则，获取待办跟已办。 默认只获取待办
						let todoAndAtdo = stateBase && stateBase.rules && JSON.parse(stateBase.rules).todoAndAtdo ? true : false;
						let isOfficeFlag = false;
						// 发⽂送⽂秘
						if(this.dataResult && this.dataResult.assigndStates){
							this.dataResult.assigndStates.filter((item) => {
								if (item.stateName === isOffice) {
									isOfficeFlag = true;
								} else {
									isOfficeFlag = false;
								}
							});
						}
						// 收⽂送办结
						this.selectedTransition = this.selResult.transitionName;
						const isReceiveDone = this.transitionDone === isOffice && this.selectedTransition === isOffice;
						if (isOfficeFlag || isReceiveDone) {
							this.unFinishedPersonnel(
								todoAndAtdo
							).then((res) => {
								let workFlowList = res;
								//发⽂跟收⽂不太⼀样，发⽂单独处理
								if (todoAndAtdo && docInfor.willdoUnitNo && docInfor.willdoUnitNo != "") {
									if (workFlowList && workFlowList.length == 0) {
										toast("会办处室：" + docInfor.willdoUnit.join("、") + "等未办理。⽆法发送" + this.selectedTransition);
										// return this.$message({
										// dangerouslyUseHTMLString: true,
										// showClose: true,
										// message:
										// 	"会办处室：" +
										// 	docInfor.dealUnit.join("、") +
										// 	"等未办理。⽆法发送" +
										// 	this.selectedtransitionName,
										// type: "error",
										// });
									} else if (workFlowList && workFlowList.length > 0) {
										let workFlowListNoDeal = [];
										workFlowList.forEach((item) => {
											if (
												item &&
												item.flowStatus &&
												item.flowStatus == "running"
											) {
												workFlowListNoDeal.push(item);
											}
										});
										if (workFlowListNoDeal && workFlowListNoDeal.length > 0) {
										workFlowListNoDeal = workFlowListNoDeal.map((item) => {
											let orgName =
											item.assignUserOrgChain.indexOf("/") > -1 && item.assignUserOrgChain.indexOf("D000") == -1 ? item.assignUserOrgChain.substring(item.assignUserOrgChain.lastIndexOf("/") + 1) : "";
											return (item.stateName + ":" + orgName + item.assignName + "未办理。");
										});
										let errorMessage = workFlowListNoDeal.join("");
										toast(errorMessage);
										// return this.$message({
										// 	dangerouslyUseHTMLString: true,
										// 	showClose: true,
										// 	message: errorMessage,
										// 	type: "error",
										// });
										} else {
											this.sendOnsubmit();
										}
									}
								} else {
									let workFlowListNoDeal = [];
									workFlowList.forEach((item) => {
										if (
										item &&
										item.flowStatus &&
										item.flowStatus == "running"
										) {
										workFlowListNoDeal.push(item);
										}
									});
									if (workFlowListNoDeal && workFlowListNoDeal.length > 0) {
										workFlowListNoDeal = workFlowListNoDeal.map((item) => {
											let orgName =
											item.assignUserOrgChain.indexOf("/") > -1 && item.assignUserOrgChain.indexOf("D000") == -1 ? item.assignUserOrgChain.substring(item.assignUserOrgChain.lastIndexOf("/") + 1) : "";
											return (item.stateName + ":" + orgName + item.assignName + "未办理。");
										});
										let errorMessage = workFlowListNoDeal.join("");
										toast(errorMessage);
										// return this.$message({
										// dangerouslyUseHTMLString: true,
										// showClose: true,
										// message: errorMessage,
										// type: "error",
										// });
									} else {
										this.sendOnsubmit();
									}
								}
							});
						} else {
							this.sendOnsubmit();
						}
         			},
					sendOnsubmit(){//最后提交 判断是办结还是发送
						 if(this.selUsers.length == 0){
							(this.selResult.transitionLabel && this.selResult.transitionLabel == 'done') ? this.submitDone() : '';
						 }else{
							this.submitSend();
						 }
					 },
					submitOpinion:function(){
						var flowSlab = docInfor.permission.stateLabel;
						var docid = docInfor.form.id;
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
							var UnitPerson = ["本处室人员"];
							const buttons = App.LS.get("stateBusiness") && toArr(App.LS.get("stateBusiness")).businessHandle ? toArr(App.LS.get("stateBusiness")).businessHandle : "";
							let isShowAllUser = (buttons != "" && buttons.filter(button => button.handleNo == "isShowAllUser").length != 0) ? true : false;
							if(isShowAllUser){
								UnitPerson = ["全委人员","群组"];
							}
							// if(listInfo.readType){
							// 	 UnitPerson = ["本处室人员"];
							// }else{
							// 	if(isShowAllUser){
							// 		UnitPerson = ["全委人员","群组"];
							// 	}
								
							// }
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
								//case "所有人":
								case "全委人员":
									getUrl = ZjgyHost + ZjgyUrl["Gfs-fd-request"] + "?treeType=user&orgNo=D00001";//全委人员
									promiseAllarray.push(_self.getFreeAllPeople(getUrl,"全委人员"));
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
									getUrl = ZjgyHost + ZjgyUrl["Gfs-fd-request"] + "?treeType=group";//群组
									promiseAllarray.push(_self.getFreeAllPeople(getUrl,"群组"));
									break;
								case "本处室人员":
									getUrl = ZjgyHost + ZjgyUrl["users-byOrgNo"] + "?orgNo=" + orgNo;//本处室人员
									promiseAllarray.push(_self.getFreeAllPeople(getUrl,"本处室人员"));
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
						let readers = _self.getLeaderReaders();
						return new Promise((resolve, reject) => {
						  ajaxRequst(getUrl,urltype,'application/x-www-form-urlencoded','json','',false).then(function (obj) {
								if(types=="全委人员"){
									var allUser = [];
									var selPid = false;//可否选中父级单位id
									obj = obj.filter(item => !readers.includes(item.treeId) );//把流程内的委领导排除掉
									allUser = _self.getTrees(obj,"",selPid);
								}else if(types=="分发单位"){
									var allUser = [];
									var selPid = true;//可否选中父级单位id
									allUser =_self.getTrees(obj,"",selPid);
								}else if(types=="群组"){
									var allUser = [];
									var selPid = true;//可否选中父级单位id
									//筛选出以-ZJSFGW结尾的
									obj = obj.filter(item => item.treeName.endsWith("-ZJSFGW")).map(treeItem => {
										return {
											SYSTEM_NO: treeItem.SYSTEM_NO,
											secLevel: treeItem.secLevel,
											treeDisabled: treeItem.treeDisabled,
											treeId: treeItem.treeId,
											treeName: treeItem.treeName.substring(0,treeItem.treeName.indexOf("-ZJSFGW"))
										}
									});
									allUser =_self.getTrees(obj,"",selPid);
									$.each(allUser,function(i,pp){
										if(pp.children && pp.children.length > 1){
											pp.treeDisabled = "true";
										}
										var childrens = Object.assign([],pp.children);
										$.each(childrens,function(c,child){
											if(child.treeId == child.treePid){
												pp.children.splice(c,1);//删除群组名
											}
										})
									})
								}else if(types== "本处室人员"){
									obj = obj.filter(item => !readers.includes(item.userNo) );//把流程内的委领导排除掉
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
						var thisDept = userinfo.username?userinfo.username:"";
						// 获取每个节点的直属子节点，*记住是直属，不是所有子节点
						for (var i = 0; i < list.length; i++) {
							 var key = list[i].treePid ? list[i].treePid : "";
							 //if(list[i].treeId == thisDept){parentId=key;}
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
						// $.each(treeList,function(i,item){
						// 	if(item.orgNo!=""){
						// 		backinfo[item.orgNo] = {"treePid":"","treeName":item.userName,"treeId":item.userNo,"treeDisabled":"true","TREE_TYPE":"ORG","children":[]};
						// 	}
						// })
						$.each(treeList,function(i,item){
							if(item.orgNo!=""){
								if(backinfo[item.orgNo] == undefined){ 
									backinfo[item.orgNo] =  {"treePid":"","treeName":item.orgName,"treeId":item.orgNo,"treeDisabled":"true","TREE_TYPE":"ORG","children":[]}; 
								}
								backinfo[item.orgNo].children.push({"treePid":item.orgNo,"treePname":item.orgName,"treeId":item.userNo,"TREE_TYPE":"USER","treeName":item.userName,"userLevel":item.userLevel,"sortNo":item.sortNo});
							}
						})
						
						$.each(backinfo,function(i,item){
							item.children = sortByKeyNum(item.children, "sortNo","asc");
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
						var groupNos = [], users = [];
						if(sendtype == "toRead"){
							var toUrl = ZjgyHost + ZjgyUrl["passRead-" + App.LS.get("module")];
						}else{
							var toUrl = ZjgyHost + ZjgyUrl["word-toSend"];							
						} 
						$.each(flowPage.selUsers, function(i,people) {
							if(/G\d+/g.test(people.treeId)){//匹配群组（G开头后面为数字的）
								groupNos.push(people.treeId);
							}else{
								users.push({userNo:people.treeId,userName:people.treeName});
							}						
							
						})
						let readers = this.getLeaderReaders();
						var todata={docId:docInfor.id,groupNos:groupNos,orgNos:[],users:users,excludeUsers:readers};
						ajaxRequst(toUrl,'post','application/json;charset=UTF-8','json',JSON.stringify(todata)).then(function (submitobj) {  
								try{wispApp.UI.dismissProgressDialog();}catch(e){}
								if(submitobj){
									toast( '分发成功！');				
									closePage();
									return ;
								}else{
									toast( '分发失败！');
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
						var getUrl=ZjgyHost + ZjgyUrl[urlNo]+'?processId='+docInfor.flowProcessId+'&workTodoId='+(App.LS.get("workTodoId") || listInfo.id)+'&docId='+docInfor.id;
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
						ajaxRequst(getUrls,'post','application/json;charset=UTF-8','json',JSON.stringify({workTodoId:(App.LS.get("workTodoId") || listInfo.id),docId:docInfor.id,submitStates:Result})).then(function (submitobj) {
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
						
						//if(!$(_this).find("span").eq(0).hasClass('icon-selected'))$("#valOpinion").val(_self.opinion.opinionBody+opinval);
						if(!$(_this).hasClass('icon-selected'))$("#valOpinion").val(_self.opinion.opinionBody+opinval);
						_self.opinion.opinionBody=$("#valOpinion").val();
						$(_this).toggleClass("icon-selected");
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
						let moduleId = App.LS.get("module");
						var _url = ZjgyHost + ZjgyUrl['opinion-add'];
						if(moduleId == "receival" || moduleId == "dispatch"){//收发文的意见提交接口不同
							_url = ZjgyHost + ZjgyUrl["opinion-add-" + moduleId];
						}
						if(opinion){
							var item = eval("(" +App.LS.get('userInfo')  + ")");
							opinion.createTime=(new Date()).Format("yyyy-MM-dd hh:mm:ss");
							opinion.opinionContent=opinionBody;
							paradata=Object.assign({},opinion);
							_url = ZjgyHost + ZjgyUrl['opinion-upd'];
							if(moduleId == "receival" || moduleId == "dispatch"){//收发文的意见提交接口不同
								_url = ZjgyHost + ZjgyUrl["opinion-upd-" + moduleId];
							}
						}else{
							var activeinfo = docInfor;
							//var flowSlab = activeinfo.permission.stateLabel;
							//var paradata={agentStatus:0,docId:App.LS.get("docId"),flowSlab:flowSlab,moduleId:data.businessNo,opinionCode:data.opinionNo,opinionCodeName:data.optionName,opinionContent:opinionBody,status:0};		
							if (_self.opinion.opinionBody === '') {
								_self.opinion.opinionBody = '无。';
								opinionBody=_self.opinion.opinionBody;
							}
							// alert(userinfo.userId);
							var paradata = {
								id: "",
								createTime: null,
								opinionContent: opinionBody,
								opinionCode: data.opinionNo,
								opinionCodeName: data.opinionName,
								opinionUserNo: userinfo.userId || userinfo.username,
								flowSlab: stateBase.stateLabel,
								docId: App.LS.get("docId")
							}
												
						}
						if(data.imageContent){paradata.opinionContent='';paradata.imageContent=data.imageContent;}
						
						//console.log(paradata);
						ajaxRequst(_url,'post','application/json;charset=UTF-8','json',JSON.stringify(paradata)).then(function (responseData) {
							let myOpinions = [];//用于判断是否填过意见
							if(App.LS.get("myOpinions") && App.LS.get("myOpinions") != ""){ 
								myOpinions = toArr(App.LS.get("myOpinions"));
							}
							myOpinions.push(responseData);
							App.LS.set("myOpinions", JSON.stringify(myOpinions));

							if(!opinion && moduleId == "dispatch"){ 
								_self.signOpinoin(paradata);//发文才有签发意见
								_self.dealPublic();//公开属性意见处理
							}
							App.LS.set("opinionContent",responseData.opinionContent);
							toast("意见提交成功",2000);
							closePage('detailPage.continueOperate();');
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
					},
					insertCommonOpinion(){//新增个人意见
						let _this = this;
						let _url = ZjgyHost + ZjgyUrl['insertCommonOpinion'];
						let paradata = {
							opinionCategory: "PERSON",
							opinionContent: _this.opinion.opinionBody,
							userNo: userinfo.userId || userinfo.username
						}
						ajaxRequst(_url,'post','application/json;charset=UTF-8','json',JSON.stringify(paradata)).then(function (responseData) {
							//console.log(responseData);
							if(responseData){
								toast("意见已添加至个人意见！",2000);
								_this.getCommonOpinion();
							}
						})

					},
					deleteCommonOpinion(id){//删除个人意见
						let _this = this;
						let _url = ZjgyHost + ZjgyUrl['deleteCommonOpinion'];
						ajaxRequst(_url,'post','application/json;charset=UTF-8','json',JSON.stringify([id])).then(function (responseData) {
							//console.log(responseData);
							if(responseData){
								toast("删除成功！",2000);
								_this.getCommonOpinion();
							}
						})
					},
					getCommonOpinion:function(){
						let _this = this;
						App.LS.remove("CommonOpinion");
						var userinfo = toArr(App.LS.get('userInfo'));
						var docinfor = toArr(App.LS.get('docInfor'));
						var personOpinion=[
							//{"class":"0","name":"公用意见","id":"COMMON",datalist:[],tourl:ZjgyHost + ZjgyUrl["getcommonOpinion"]+"?opinionCategory=COMMON"},
							{"class":"1","name":"常用意见","id":"PERSON",datalist:[],tourl:ZjgyHost + ZjgyUrl["getpersonOpinion"]+"?opinionCategory=PERSON&userNo=" + (userinfo.userId || userinfo.username)},
						];
						var requestTimes = 0;//请求公共意见、个人意见的次数
						$.each(personOpinion, function(i,item) {
							var _url = item.tourl;
							ajaxRequst( _url,"get",'application/json',"json",{}).then((json) => {
								personOpinion[i].datalist=json;
								requestTimes++;
								if(requestTimes == personOpinion.length){
									_this.opinion.CommonOpinion = personOpinion;
									App.LS.set("CommonOpinion",JSON.stringify(personOpinion));
								}
							});
						});
						
					},
					signOpinoin (opinion) {//签发意见
						const nameAndCode = opinion.opinionCode + '|' + opinion.opinionCodeName;
						if (nameAndCode && (opinion.opinionCode == 'wjdqfyj' || opinion.opinionCode == 'wldspyj' ||  
							opinion.opinionCode == 'nyjldshyj' || opinion.opinionCode == 'ldps')) {
							let _url = ZjgyHost + ZjgyUrl['updateSignInfo'];
							let data =  {
								id: opinion.docId,
								signUserNo: opinion.opinionUserNo
							}
							ajaxRequst( _url,"post",'application/json',"json",JSON.stringify(data)).then((res) => {
								if(!res){
									toast("签发意见保存失败！");
								}
							});
						}
			
					},
					getLeaderReaders(){//传阅选择待阅人员时，获取流程内的委领导
						let readers = [];
						if(docInfor.passReader) {
							const wldNos = [...docInfor.atdoReader,...docInfor.todoReader];//流程内的人员
							wldNos.forEach(item => {
								if(item.readOrgNo == "D00002"){
									readers.push(item.readerNo);
								}
							})
							console.log("readers:" + readers)
							return readers;
							
						}
					},
					 /**
					 *
					 * 单独处理公开信息理由
					 */
					  dealPublic () {
						debugger;
						let isPublicRule = false;
						// 新增规则判断是否需要添加公开属性意见
						try {
							if( stateBase.rules && typeof JSON.parse(stateBase.rules) == "object" && JSON.parse(stateBase.rules).isPublic){
								isPublicRule = true;
							}
						} catch(e) {
							isPublicRule = false
						}
						if (isPublicRule) {
							const publicType = docInfor.publicFlag;
							let opinionContent = '';
							if (publicType === "NOT_PUBLIC") {
								// 不予公开
								opinionContent = "不予公开" + "(" + docInfor.noPublicReason + ")。";
							} else if (publicType === "PUBLIC") {
								opinionContent = "主动公开。";
							} else if (publicType === "APPLY_PUBLIC") {
								opinionContent = "依申请公开。";
							}
							const oplist = toArr(App.LS.get("oplist"));//全部意见
							const publicId = oplist.filter(item => {
								return item.opinionCode === 'gksxyj' && item.opinionUserNo === (userinfo.userId || userinfo.username);
							})
							if (publicId.length > 0 ) {
								this.onSubmitPublicOpinion(opinionContent, publicId[0].id);
							} else {
								this.onSubmitPublicOpinion(opinionContent);
							}
						}
					},
					// 公开属性意见
					onSubmitPublicOpinion(opinionContent,id) { //提交公开属性意见
						let _this = this;
						let moduleId = App.LS.get("module");
						let _url = ZjgyHost + ZjgyUrl["opinion-add"];
						// if(moduleId == "receival" || moduleId == "dispatch"){//收发文的意见提交接口不同
						if(id){
							_url = ZjgyHost + ZjgyUrl["opinion-upd"];
						}
						// }
						let data = {
							// createTime: '',
							docId: App.LS.get("docId"),
							flowSlab: '',
							id: id || '',
							moduleId: App.LS.get("module"),
							opinionCode: "gksxyj",
							opinionCodeName: "公开属性意见",
							opinionContent: opinionContent,
							status: 0,
						}
						ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(data)).then(function (res) {
							if (!res) {
								toast("公开属性意见保存失败！");
							}
						});

					},
				}
			});	




