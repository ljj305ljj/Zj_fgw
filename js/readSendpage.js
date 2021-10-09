var docInfor = toArr(App.LS.get("docInfor"));
var userinfo = toArr(App.LS.get('userInfo'));
var listInfo = toArr(App.LS.get("listInfo"));
addvisibListener();

window.readSendPages = new Vue({
	el: '#readSendPages',
	data() {
		return {
			opinionContent: '',
			opinionCode: '',
			opinionCodeName: '',
			orgName: userinfo.orgName ? userinfo.orgName.substring(userinfo.orgName.lastIndexOf("/") + 1) : userinfo.orgNo
		}
	},
	created() {
		fontSizeSet.initFontSize();
	},
	mounted: function () {
		this.getOpinionDesc();
	},
	methods: {
		opinionchange: function (x) {
			this.opinion.CommonTab = x;
		},
		claerOpinion: function () {
			this.opinionContent = '';
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
			let moduleId = App.LS.get("module");
			let _url = ZjgyHost + ZjgyUrl['opinion-add'];
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
			if(location.search.indexOf("isLeader=true")>-1){ 
				toReadBaseMsg.sendOpinion = true;
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
		isRead() {
			let data = [listInfo.id];
			let _url = ZjgyHost + ZjgyUrl["finish-read"];
			ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(data)).then(function (res) {
				try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
				if (res) {
					toast("已阅成功", 2000);
					closePage('closePage("refreshList()")');
				}else{
					toast("已阅失败", 2000);
				}
			});
		},
	}
});




