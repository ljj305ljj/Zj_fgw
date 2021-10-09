var docInfor = toArr(App.LS.get("docInfor"));
var userInfo = toArr(App.LS.get('userInfo'));
var listInfo = toArr(App.LS.get("listInfo"));
addvisibListener();

window.SendPages = new Vue({
	el: '#SendPages',
	data() {
		return {
			userTrees:{},//人员列表树
			selUsers:[],//选中的人员
		}
	},
	created() {
		fontSizeSet.initFontSize();
		this.userTrees = toArr(App.LS.get("userTrees"));
	},
	mounted: function () {
		//this.getOpinionDesc();
	},
	methods: {
		userEvent:function(_this,people,actClass){
			var _self=this;
			if(typeof(actClass)=="undefined")actClass="pp-act";
			$(_this.currentTarget).siblings().removeClass(actClass);
			_self.selUsers = [];
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
		submitSend(){
			App.LS.set("selUsers",JSON.stringify(this.selUsers));
			OpenWebView("/pages/urger/OpinionSendPage.html");
		},
		getOpinionDesc: function () {// 获取待阅填写意见的配置信息
			let _this = this;
			let _url = ZjgyHost + "/config/getEgovConfigByCondition";
			let datas = {
				keyword: "opinionToRead",
				module: "receival",
				systemNo: eval("(" + App.LS.get('userInfo') + ")").systemNo
			}
			ajaxRequst(_url, 'GET', 'application/x-www-form-urlencoded', 'json', datas).then(function (res) {
				if (res) {
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
		// 新增意见
		onSubmit() {
			let _this = this;
			if (this.opinionContent === '') {
				if(App.LS.get("flowType") == "jsFeedBack"){//发送
					_this.feedback();
				}else if(App.LS.get("flowType") == "jsFeedBackReturn"){//退回
					_this.feedbackReturn();
				}
				return;
			}
			let _url = ZjgyHost + ZjgyUrl['opinion-add'];
			let toReadBaseMsg = {
				handleUserName: listInfo.handleUserName,
				sendUserName: listInfo.sendUserName,
				createTime: listInfo.createTime
			}
			// {"docId":"12ca3ae2dc8a0000","opinionCode":"UrgerReportD00004","opinionContent":"测试","opinionCodeName":"督查上报端部门意见"}
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
					//toast("已阅成功", 2000);
					if(App.LS.get("flowType") == "jsFeedBack"){//发送
						_this.feedback();
					}else if(App.LS.get("flowType") == "jsFeedBackReturn"){//退回
						_this.feedbackReturn();
					}
				}
			});

		},
		isRead() {
			let data = [listInfo.id];
			let _url = ZjgyHost + ZjgyUrl["finish-read"];
			ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(data)).then(function (res) {
				if (res) {
					closePage('closePage("refreshList()")');
					try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
				}
			});
		},
	}
});




