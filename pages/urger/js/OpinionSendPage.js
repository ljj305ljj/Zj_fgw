var docInfor = toArr(App.LS.get("docInfor"));
var userInfo = toArr(App.LS.get('userInfo'));
var listInfo = toArr(App.LS.get("listInfo"));
addvisibListener();

window.readSendPages = new Vue({
	el: '#readSendPages',
	data() {
		return {
			opinionContent: '',
			opinionCode: "UrgerReport" + userInfo.orgNo,
			opinionCodeName: "督查上报端部门意见",
			//orgName: userinfo.orgName ? userinfo.orgName.substring(userinfo.orgName.lastIndexOf("/") + 1) : userinfo.orgNo,
			taskSignId:''
		}
	},
	created() {
		fontSizeSet.initFontSize();
		//this.taskSignId = this.getLastNodeFeedback().signId;
		this.taskSignId = listInfo.id;
	},
	mounted: function () {
		//this.getOpinionDesc();
	},
	methods: {
		opinionchange: function (x) {
			this.opinion.CommonTab = x;
		},
		claerOpinion: function () {
			this.opinionContent = '';
		},
		// 当前办理单位
		urgerTaskSignUnit(){
			let urgerTaskSignUnit = {};
			docInfor.urgerTaskSignUnits.forEach((item)=>{
				if (item.handleObjectNo == userInfo.orgNo){ //todo:
					urgerTaskSignUnit = item;
				}
			});
			return urgerTaskSignUnit;
		},
		//获取最新一个节点的对应反馈件
        getLastNodeFeedback(){
			if (!docInfor || !docInfor.urgerTaskNodes) {
				return '';
			}
			//console.log(docInfor);
			let node = docInfor.urgerTaskNodes[docInfor.urgerTaskNodes.length - 1];
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
			if (!docInfor || !docInfor.urgerTaskNodes) {
				return '';
			}
			//console.log(docInfor);
			let node = docInfor.urgerTaskNodes[docInfor.urgerTaskNodes.length - 1];
			//console.log(node);
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
			let _this = this;
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
				   _this.insertUrgerOperateRecord(message);
                    
                }
			})
        },
		insertUrgerOperateRecord(message){
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
		},
        /**
         * 1 已阅 0 未阅
         */
        setTaskSignReadStatus(status){
            let form = {};
            form.id = this.taskSignId;
            form.isRead = status;
			let _url = ZjgyHost + ZjgyUrl["update-UTSU"];
			ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(form)).then((res) => {
				if (res) {
                	console.log(res);
				}
            });
        },
		assignSignUserImpl(userName,userNo,signStatus,operateContent){
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
					_this.insertUrgerOperateRecord(message);
					
				}
            });

            // this.$utils.ajax({
            //     url: '/urger/report/updateUrgerTaskSignUnit',
            //     method: 'post',
            //     data: form
            // }).then((res) => {
            //     //新增操作记录表
            //     return this.$utils.ajax({
            //         url: '/urger/report/insertUrgerOperateRecord',
            //         method: 'post',
            //         data: {
            //             signId: this.taskSignId,
            //             operateContent: operateContent ? operateContent : '转发给'+userName
            //         }
            //     });
            // }).then((res) => {
            //     this.$message({
            //         type: 'success',
            //         message: '转发成功!'
            //     });
            //     this.onClose();
            //     //this.loadComponent();
            // }).catch((err) => {
            //     this.$message.error(err);
            // });
        },

		feedback(){ //发送
        	this.updateFeedbackStatus('1','反馈成功，提交处长审核');
           	this.setTaskSignReadStatus(0);    
        },
		feedbackReturn(){ //退回
			this.updateFeedbackStatus('2','退回成功');
			this.setTaskSignReadStatus(0);
		},
		assignSignUser(){ //发送
        	//this.updateFeedbackStatus('1','反馈成功，提交处长审核');
			let selUsers = toArr(App.LS.get("selUsers"));
           	this.assignSignUserImpl(selUsers[0].treeName,selUsers[0].treeId,'1');
			      
        },
		// //转发就是指派签收人员
        // assignSignUser(){
        //     this.$tree({
        //                 'core': 'ztree',
        //                 '_this': this,
        //                 'request': {
        //                     'url': '/user/rjUser/getTrees',
        //                     'methods': 'get',
        //                     'param': {
        //                         'treeType': 'user',
        //                         'orgNo': this.$store.state.user.orgNo,
        //                         'range': 'recursion'
        //                     }
        //                 },
        //                 'tree': {
        //                     'multiplePattern': false,
        //                     'title': '用户选择'
        //                 }
        //             }
        //     ).then((treeResult) => {
        //         console.log(treeResult);
        //         if (treeResult && treeResult.length == 1){
        //             this.openOpinionInput("发送").then((res) => {
        //                 if (res) {
        //                     this.assignSignUserImpl(treeResult[0].label,treeResult[0].id,'1');
        //                 }
        //             });
        //         }
        //     });
        // },

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
				}else if(App.LS.get("flowType") == "jsAssignSignUser"){
					_this.assignSignUser();
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
					}else if(App.LS.get("flowType") == "jsAssignSignUser"){
						_this.assignSignUser();
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




