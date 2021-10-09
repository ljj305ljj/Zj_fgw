var docInfor = toArr(App.LS.get("docInfor"));
var userInfo = toArr(App.LS.get('userInfo'));
var listInfo = toArr(App.LS.get("listInfo"));
var feedbackForm = toArr(App.LS.get("feedbackForm"));
addvisibListener();

var feedBackPages = new Vue({
	el: '#feedBackPages',
	// props: {
	// 	urgerInfo: Object,
	// 	feedbackForm: Object,
	// 	nodeTime: {
	// 		type: String,
	// 		default: ''
	// 	},
	// 	couldOperate: {
	// 		type: Boolean,
	// 		default: true
	// 	},
	// 	openFeedbackButton:{
	// 		type: Boolean,
	// 		default: false
	// 	}
	// },
	data() {
		return {
			rules: {
				completeSituation: [
					{type: 'string', required: true, message: '请填写该字段'},
					{type: 'string', max: 1024, message: '长度不能超过1024个字符'}
				],
				contactNum: [
				   // {validator: checkPhone, trigger: 'blur'},
					{type: 'string', required: true, message: '请填写该字段'},
					{type: 'string', max: 16, message: '长度不能超过16个字符'}
				],
				annualTarget: [
					{type: 'string', required: true, message: '请填写该字段'},
					{type: 'string', max: 1024, message: '长度不能超过1024个字符'}
				],
				nextPlan: [
					{type: 'string', required: true, message: '请填写该字段'},
					{type: 'string', max: 1024, message: '长度不能超过1024个字符'}
				],
				problem: [
					{type: 'string', required: true, message: '请填写该字段'},
					{type: 'string', max: 1024, message: '长度不能超过1024个字符'}
				]
			},
			nodeTime:App.LS.get("nodeTime"),
			form:{
				id: feedbackForm.id,
				signId: feedbackForm.taskSignId,
				nodeId: feedbackForm.nodeId,
				taskId: feedbackForm.taskId,
				urgerId: feedbackForm.urgerId,
				handleObjectLevel: feedbackForm.handleObjectLevel,
				subject: feedbackForm.subject,
				completeSituation: '',
				feedbackUserName: '',
				contactNum: '',
				problem: '',
				nextPlan: '',
				feedbackStatus: '', //状态（0：暂存 1：已反馈 2：退回 3：撤回申请 4：撤回成功 ）
				annualTarget: '',
				feedbackSituation: '',
				  completeNum: undefined
			},
			dingXingZhiBiao:{ //定性选择
				showDingXingZhiBiao: false,
				options:[
					{
						label:"未完成",
						value:"未完成"
					},{
						label:"已完成",
						value:"已完成"
					}
				],
				selected:{
					label:"未完成",
					value:"未完成"
				}
			}
		}
	},
	created() {
		fontSizeSet.initFontSize();
		//this.taskSignId = this.getLastNodeFeedback().signId;
		//this.taskSignId = listInfo.id;
		 //加载反馈件表单信息
		 if(this.form.id){
			this.onloadForm();
			this.formId = this.form.id;
		} else {
			this.feedbackSituationFormat();
			this.initTemporaryId().then((res)=>{
				this.formId = this.form.temporaryId;
			});
		}
	},
	computed: {
		//可保存 状态（0：暂存 1：已反馈 2：退回 3：撤回申请 4：撤回成功 5：已评价)
		isSave() {
			return !this.form.id || this.form.feedbackStatus === '0' || this.form.feedbackStatus === '2' || this.form.feedbackStatus === '4';
		},
		//可反馈 状态（0：暂存 1：已反馈 2：退回 3：撤回申请 4：撤回成功 5：已评价)
		isFeedback() {
			return this.form.id && (this.form.feedbackStatus === '0' || this.form.feedbackStatus === '2' || this.form.feedbackStatus === '4');
		},
		//可反馈 状态（0：暂存 1：已反馈 2：退回 3：撤回申请 4：撤回成功 5：已评价)
		isDelete() {
			return !!this.form.id && this.form.feedbackStatus === '0' || this.form.feedbackStatus === '2' || this.form.feedbackStatus === '4';
		},
		//可更新标识
		isUpdate() {
			return !!this.form.id;
		},
		insertOrUpdateApi() {
			return this.isUpdate ? '/urger/report/updateUrgerTaskFeedback' : '/urger/report/insertUrgerTaskFeedback';
		}
	},
	mounted: function () {
		//this.getOpinionDesc();
	},
	methods: {
		 /**
		 * 新增获取临时id
		 */
		  initTemporaryId(){
			if (!this.form.id){
				let _url =  ZjgyHost + ZjgyUrl['getTemporaryId'];
				//ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(data)).then(function (res) {
				return ajaxRequst(_url, 'get', 'application/json;charset=UTF-8', 'json').then((res) => {
					this.form.temporaryId = res;
				});
			}
			return "";
		},
		/**
		 * 加载表单数据
		 * @returns {Q.Promise<T>}
		 */
		onloadForm() {
			this.loading = true;
			let _url =  ZjgyHost + ZjgyUrl['getUrgerTaskFeedbackById'];
			let data = {
				id: this.form.id
			};
			return ajaxRequst(_url, 'get', 'application/json;charset=UTF-8', 'json', (data)).then((res) => {
				if (res) {
					//后端初始化值
					this.form = res;
					this.getFuZeRen(this.form.feedbackOrgNo);
					//this.$refs.form.snapshot();
				}
			}).finally(() => {
				this.loading = false;
			});
		},
		getFuZeRen(mainHandleObjectNo) {
			if (!mainHandleObjectNo) {
				return ;
			}
			let _url = ZjgyHost + ZjgyUrl["getHandleUserBySignGroup"] + "?groupCateNo=URGERSIGNUSER&duty=责任人";
			ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify([mainHandleObjectNo])).then((res) => {
				if (res && res.length > 0) {
					this.fuZeRenNo = res[0].userNo;
				}
			});
		},
		feedbackSituationFormat(){
			if (!this.form.feedbackSituation && this.nodeTime) {
				let deadlineTime = this.$libs.dayjs(this.nodeTime).toDate();
				if (this.$libs.dayjs().toDate() > deadlineTime){
					this.form.feedbackSituation = '超期';
				} else{
					this.form.feedbackSituation = '正常';
				}
			}
		},
		showDingXingPopup(){
			if(this.dingXingZhiBiao.showDingXingZhiBiao){
				this.dingXingZhiBiao.showDingXingZhiBiao = false;
			}else{
				this.dingXingZhiBiao.showDingXingZhiBiao = true;
			}
			
		},
		setDingXingValue(itemOption){
			this.dingXingZhiBiao.selected = itemOption;
			this.dingXingZhiBiao.showDingXingZhiBiao = false;
			this.form.dingXingZhiBiao = itemOption.label;
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
		onFailed(errorInfo) {//表单提交失败
			//console.log('failed', errorInfo);
			if (errorInfo.errors[0].message == "请输入") {
				wispApp.UI.showToast("请输入必填项")
			}
		},
		validate(rules){
			let _this = this;
			let valid = true;
			for( var r in rules){
				if(_this.$refs[r] && _this.$refs[r].value == ""){
					_this.$refs[r].blur();
					valid = false;
				}
			}
			return valid;
		},
		onSubmit(feedbackStatus){
			let _this = this;
			let valid = this.validate(this.rules);
			//return;
			//this.validate(this.rules){
			if (valid) {
				this.form.feedbackStatus = feedbackStatus;
				return ajaxRequst(
					ZjgyHost + this.insertOrUpdateApi,
					'post',
					'application/json;charset=UTF-8',
					'json',
					JSON.stringify(this.form)
				).then((res) => {
					this.form = res;
					let message = '';
					if (feedbackStatus == '0') {
						message = '保存成功';
						toast(message, 2000);
					} else if (feedbackStatus == '1') {
						message = '反馈成功，提交处长审核。';
						toast(message, 2000);
					} else if (feedbackStatus == '1') {
						message = '反馈完成，处长审核通过。';
						toast(message, 2000);
					}
					let data = {
						signId: this.form.signId,
						operateContent: message
					}
					//更新操作记录表附件
					return ajaxRequst(
						ZjgyHost + ZjgyUrl["insert-UOR"],
						'post',
						'application/json;charset=UTF-8',
						'json',
							JSON.stringify(data)
					).then((res) => {
						if (res) {
							console.log(res);
							addCookie("callback", "location.reload();", 7, "/");
							//closePage('closePage("refreshList()")');
						}
					});
				});
			}
			//};
		}
	}
});




