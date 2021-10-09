

var indexPhone = new Vue({
	el: '#Index',
	data() {
		return {
			showError: false,
			setting: [
				{ name: "刷新", toclick: "toRefresh", iconName: "rjicon icon-refresh", bgColor: GetGradient("refresh") },
				{ name: "重置", toclick: "toReset", iconName: "rjicon icon-reset", bgColor: GetGradient("reset") },
				{ name: "设置", toclick: "toSet", iconName: "rjicon icon-set", bgColor: GetGradient("set") },
				{ name: "退出登录", toclick: "toExit", iconName: "rjicon icon-exit", bgColor: GetGradient("exit") }
			],//左侧按钮列表
			getLtaptokenTimes: 0,
			indexTabDatas: JSON.parse(JSON.stringify(indexTabData)),
			moudleInfo: JSON.parse(JSON.stringify(moudleInfo)),//模块基本信息
			moduleNums: [],//模块条数
			bottomBtnActive: 0,
			tabData: JSON.parse(JSON.stringify(moudleInfo))[0],
			tabActive: 0,
			moduleId: "",
			tabNum: JSON.parse(JSON.stringify(moudleInfo))[0].view.length,
			scrollHeight: "",
			showModalId: "",
			modalNum: { id: "", dates: [] },
			EchartsArray: {},
			userInfo: {},
			fcsurl1:fcsurl
		}
	},
	created: function () {
		this.moduleConfig();
		
	},
	mounted: function () {
		let that = this;
		this.scrollHeight = document.body.clientHeight - $(".indexBottom").height();
		this.initHomePage();
		dd.ready(() => {
			console.log("钉钉开始2"); 
			dd.setTitle({title : '省发改委OA'});
			//示例：首页右上角按钮
			dd.on("optionMenu", function(res){
				//alert(JSON.stringify(res));
				if(res.data.index==0){
					//$("#sousuo_body").show();
					OpenWebView("Setting.html", { title: "配置页" });
					return false;
				}else if(res.data.index==1){
					OpenWebView("SearchPage.html", { title: "搜索" });
					return false;
				}else if(res.data.index==2){
					that.getAuth();
					return false;
				}else{
					try {wispApp.UI.showProgress();} catch(e) {}
					location.reload();
				}
			});
			dd.setOptionMenu({
				override:true,
				menus : [
				   {
					   "title":"配置",
					   //"icon":"/searchIcon.png"
				   },
				   {
						"icon":temphost + "/rjmoafgw/img/searchIcon.png"
						//"title":"搜索",
				   },
				//    {
				// 		"title":"切换账号"
				//    },
			   ],
		   }).then(res => {
			   dd.showOptionMenu();
		   }).catch(err => {console.log("setOptionMenu失败：" + err)});
		});
	},
	methods: {
		initHomePage: function () {
			//console.log("indexPhone.js")
			wispApp.UI.showProgressDialog();
			if (!/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
				//this.getLtaptokenPC();
			} else {
				this.getPhoneNum();
			}
		},
		getNums: function (val) {
			var _self = this;
			if ($.isEmptyObject(_self.moduleNums)) return 0;
			var modules = _self.moduleNums;
			//console.log(val);
			if (val == "toread") {
				return val["toread"].count;
			} else {
				var todocout = 0;
				for (var i = 0; i < modules.todo.length; i++) {
					todocout += modules.todo[i].count;
					if (modules.todo[i].businessNo == val) {
						return modules.todo[i].count;
					}
				}
				if (val == "TODO") {
					return todocout;
				} else {
					return 0;
				}
			}
		},
		getTitleIcon: function (businessExtension) {
			if (businessExtension && JSON.parse(businessExtension).trafficLights) {
				switch (JSON.parse(businessExtension).trafficLights) {
					case "green":
						return "green";
					case "yellow":
						return "yellow";
					case "red":
						return "red";
					default:
						return "";
				}
			} else {
				return "";
			}

		},
		onRefresh: function (obj) { //下拉刷新
			//console.log(1);
			this.getListData('refreshing');
		},
		onLoad: function () {//上拉加载
			//console.log(12);
			this.getListData('loading');
		},
		onChange: function(obj){
			let _self = this;
			let item = _self.tabData.view[obj];
			setTimeout(()=>{
				if(item.finished){
					if($("#"+item.id).height() < _self.scrollHeight){
						$("#"+item.id).height(_self.scrollHeight);
					}else{
						$("#"+item.id).height("auto");
					}
				}
			},1000)
		},
		openDoc: function (obj) {
			App.LS.set("listInfo", JSON.stringify(obj));
			let detailPage = "DetailPage.html";
			if(obj.mailIp){ 
				App.LS.set('mailType', 'inbox');
				detailPage = "pages/mail/mailInforPage.html";
			}
			switch (obj.businessNo) {
				case "RECEIVAL"://收文处理
				case "DISPATCH"://发文处理
				case "SPECIAL_WORK"://专班工作
				case "LEAVE"://请假审批
				case "OVERTIME"://加班审批
				case "TRAVEL_APPROVAL"://出差审批
					detailPage = "DetailPage.html";
					break;
				case "CAR_APPLY"://车辆管理
					detailPage = "pages/clgl/DetailPage.html";
					break;
				case "MEETING_BOOK"://会议室预订
				case "MEETING_ISSUE"://党组会议-会议议题
				case "MEETING"://专题会议
				case "MEETING_OFFICE"://党组会议、主任办公会议
				case "MEETING_EXTERNAL"://会议安排
				case "MEETING_ACTIVITY"://会议、活动交办事项处理
					detailPage = "pages/meeting/DetailPage.html";
					break;
				case "URGERCLIENT"://委重点工作督查
				case "MAJORURGER"://委领导批示督办
				case "LISTURGER"://省领导批示督办
					detailPage = "pages/urger/DetailPage.html";
					break;
				// case "SPECIAL_WORK"://专班工作
				// 	detailPage = "pages/zbgz/DetailPage.html";
				// 	break;
				case "INFOREPORT": //信息上报
					detailPage = "pages/xxgl/DetailPage.html";
					break;
				case "INFO"://信息编审
					detailPage = "pages/zwxx/DetailPage.html";
					break;
				case "GOODS"://办公用品
				case "SUPPLIES"://办公耗材
					detailPage = "pages/goods/DetailPage.html";
					break;
				// case "SUPPLIES"://办公耗材
				// 	detailPage = "pages/supplies/DetailPage.html";
				// 	break;
				// case "SCRAP"://资产报废
				// 	detailPage = "pages/transfer/DetailPage.html";
				// 	break;
				case "INFORMAL"://征求意见
					detailPage = "pages/informal/DetailPage.html";
					break;
				case "TRAVEL_EXPENSE"://经费报销-差旅报销
				case "OTHER_EXPENSE"://经费报销-业务报销
				case "LABOR_UNION_EXPENSE"://经费报销-工会报销
				case "PARTY_UNION_EXPENSE"://经费报销-党费报销
				case "CONTRACT_APPROVE"://合同管理
				case "PURCHASE_NOTICE"://采购管理-采购公告审批
				case "PURCHASE_RESULT"://采购管理-采购结果审批
				case "MEETING_PAY_ISSUED"://支出预算审批-会议、培训、活动支出预算审批
				case "OFFICIAL_RECEPTION"://支出预算审批-公务接待预算审批
				case "UNION_ACTIVITIES"://支出预算审批-工会活动支出预算审批
				case "PROJECT_PLANNING_SERVICE"://支出预算审批-服务采购支出预算审批
				case "GOODS_PURCHASE"://支出预算审批-货物采购审批
					detailPage = "pages/expense/DetailPage.html";
					break;
				case "YOUTH_WORK"://团青工作
					detailPage = "pages/youthWork/DetailPage.html";
					break;
				default:
					if(obj.urgerId){
						detailPage = "pages/urger/DetailPage.html";
					}
					break;

			}
			if (obj.businessDocId) {
				App.LS.set('viewType', 'todo');
				OpenWebView(detailPage, { title: "表单页" });
			} else {
				OpenWebView(detailPage, { title: "表单页" });
			}
		},
		getListData: function (para, viewIndex) {
			var _self = this;
			var _url = "";
			//var item = _self.tabData.view[typeof (viewIndex) != 'undefined' ? viewIndex : _self.tabActive];
			//console.log(item);
			$.each(_self.tabData.view,function(i,item){
			
			if (para == "refreshing") {
				item.offset = 0;
				item.count = 0;
				item.data = {};
			}
			if (item.data.total <= item.offset && para == "loading") {
				console.info("没有更多");
				return false;
			}
			wispApp.UI.showProgressDialog("正在加载列表...");
			if (item.paras.indexOf("|") > -1) {
				let total = 0, reqTimes = 0;
				$.each(item.paras.split("|"), function (p, paras) {
					_url = ZjgyHost + ZjgyUrl[item.url.split("|")[p]] + (paras != "" ? paras + "&" : "?") + "offset=0&limit=1000";
					if(paras.indexOf("businessExtension") > -1 || item.url.split("|")[p] == "listurger-hometodo" || item.url.split("|")[p] == "majorurger-hometodo" ){
						_url += "&handleUserNo=" + eval("("+App.LS.get('userInfo')+")").username;
					}
					var _type = "get";
					//console.log(_url);
					//console.info("list:"+(new Date()).Format("yyyy-MM-dd hh:mm:ss.S"))			
					ajaxRequst(_url, _type, '', 'json', '').then((result) => {
						reqTimes ++;
						if (item.offset == 0) {
							if (!item.data.list) {
								item.data = result;
							} else {
								//item.data = Object.assign(item.data,result);
								item.data.list = item.data.list.concat(result.list);
								item.data.total += result.total;
							}
						} else {
							//item.data = Object.assign(item.data,result);
							item.data.list = item.data.list.concat(result.list);
							item.data.total = result.total;
						}
						item.data.list = sortByKeyNum(item.data.list, "createTime");

						_self.tabData = Object.assign({}, _self.tabData);
						//console.log(item.data);
						//item.offset=item.offset+item.limit;
						item.finished = true;//(result.total<item.offset);
						item[para] = false;
						total += result.total;
						if(reqTimes == item.paras.split("|").length){
							item.count = total;
							setTimeout(()=>{
								if(item.finished){
									if($("#"+item.id).height() < _self.scrollHeight){
										$("#"+item.id).height(_self.scrollHeight);
									}else{
										$("#"+item.id).height("auto");
									}
								}
							},1000)
						}
						
						wispApp.UI.dismissProgressDialog();
					})
				})
				
			} else {
				_url = ZjgyHost + ZjgyUrl[item.url] + (item.paras != "" ? item.paras + "&" : "?") + "offset=" + item.offset + "&limit=" + item.limit;
				if(item.url == "toread" || item.type == "xzfwtodo" || item.type == "mail" || item.type == "xntodo"){ 
					_url += "&handleUserNo=" + eval("("+App.LS.get('userInfo')+")").username; }
				var _type = "get";
				//console.log(_url);
				//console.info("list:"+(new Date()).Format("yyyy-MM-dd hh:mm:ss.S"))			
				ajaxRequst(_url, _type, '', 'json', '').then((result) => {
					item.offset = item.offset + item.limit;
					item.finished = (result.total <= item.offset);
					item[para] = false;
					item.count = result.total;
					if (item.offset == 0) {
						item.data = result;
					} else {
						item.data = Object.assign(item.data, result);
					}
					_self.tabData = Object.assign({}, _self.tabData);
					//console.log(item.data);
					setTimeout(()=>{
						if(item.finished){
							if($("#"+item.id).height() < _self.scrollHeight){
								$("#"+item.id).height(_self.scrollHeight);
							}else{
								$("#"+item.id).height("auto");
							}
						}
					},1000)
					wispApp.UI.dismissProgressDialog();
				})
			}
			})
		},
		getColList: function () {
			var _self = this;
			ajaxRequst(ZjgyHost + ZjgyUrl['getRegDocList'] + "?offset=0&limit=15&systemNo=" + (eval("(" + App.LS.get('userInfo') + ")").systemNo), 'GET', '', 'json', '').then(function (result) {
				try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
				_self.tabData[2].data = result;
				//_self.tabData[2].dataNum=result.total;
				_self.$nextTick(function () {
					slideToCollect();
				})
			})
		},
		repeatLogin: function (token, userinfo) {//重名认证；
			//console.info(userinfo)
			try { if (pdfwin) pdfwin.remove(); } catch (e) { }
			this.userInfo = JSON.parse(decodeURIComponent(userinfo));
			renderMark("body", { waterMark: "省发改委  " + (this.userInfo.userName || this.userInfo.username) + " " + (this.userInfo.phone ?  this.userInfo.phone.substring(7) : "") });
			//console.log(this.userInfo.accountId);
			
			// 设置会员昵称
			// aplus_queue.push({
			// 	action: "aplus.setMetaInfo",
			// 	arguments: ["_user_nick", (this.userInfo.userName || this.userInfo.username)]
			// });
			// // 设置会员ID
			// aplus_queue.push({
			// 	action: "aplus.setMetaInfo",
			// 	arguments: ["_user_id", (this.userInfo.accountId || this.userInfo.username)]
			// });
			// aplus_queue.push({
			// 	action: "aplus.setMetaInfo",
			// 	arguments: ["_dev_id", "yourDeviceId"]
			// });

			// // 如采集用户信息是异步行为，需要先设置完用户信息后再执行这个START埋点
			// // 此时被block住的日志会携带上用户信息逐条发出
			// aplus_queue.push({
			// 	action: 'aplus.setMetaInfo',
			// 	arguments: ['_hold', 'START']
			// });

			addCookie("x-auth-token", decodeURIComponent(token), 7, "/");
			App.LS.set("userInfo", decodeURIComponent(userinfo));
			App.LS.set("isCanLoad", false);
			this.onRefresh();
			//this.getEcharts();
		},
		getLtaptoken: function (json) {
			//console.info(json);
			var _self = this;
			if (json.length > 1) {
				try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
				var htmllist = new Array();
				$.each(json, function (i, item) {
					var _temp = item;
					var _tempData = JSON.parse(item.ssoLoginResult).data;
					_tempData.user.orgName = _temp.orgName;
					_tempData.user.userName = _temp.userName;
					_tempData.user.userId = _temp.userId;
					_tempData.user.phone = _temp.phone;
					_tempData.user.accountId = _temp.accountId;
					htmllist.push('<li class=Public-ptn onclick=indexPhone.repeatLogin("' + _tempData.token + '","' + encodeURIComponent(JSON.stringify(_tempData.user)) + '")>' + item.orgName.substring(item.orgName.lastIndexOf("/") + 1) + "/" + item.userName + '</li>');
				})
				pdfwin = App.UI('dialog', {
					type: 'accountsShow',
					title: '请选择登陆账号',
					menulist: htmllist.join('')
				});
			} else {
				var _temp = json[0];
				var _tempData = JSON.parse(json[0].ssoLoginResult).data;
				_tempData.user.orgName = _temp.orgName;
				_tempData.user.userName = _temp.userName;
				_tempData.user.userId = _temp.userId;
				_tempData.user.phone = _temp.phone;
				_tempData.user.accountId = _temp.accountId;
				console.info(_tempData.token)
				_self.repeatLogin(_tempData.token, encodeURIComponent(JSON.stringify(_tempData.user)));
				return
			}
			return false;
		},
		getLtaptokenPC: function (user, password) {
			var that = this;
			delCookie("x-auth-token");
			user = user ? user : "admin";
			password = password ? password : "12345678";
			$.ajax({  //获取鉴权的信息
				url: ZjgyHost + "login",
				type: 'post',
				dataType: "json",
				data: { username: user, password: password, remumber: false },
				success: function (_config) {
					// console.info(_config)
					that.repeatLogin(_config.token, encodeURIComponent(JSON.stringify(_config.user)))
				},
				error: function (err) {

				}
			});
		},
		getAuth(){ //鉴权
			let that = this;
			console.log("钉钉准备" + dd.ready);
			dd.ready(() => {
				console.log("钉钉开始1");
				dd.getAuthCode().then((result) => {
					console.info("鉴权:"+result.code);
					if (result) {
						//console.info(ddGetLtpatoken+result.code)
						//console.info((new Date()).Format("yyyy-MM-dd hh:mm:ss.S"))
						$.ajax({  //获取鉴权的信息
							url: ddGetLtpatoken + result.code,
							type: 'GET',
							dataType: "json",
							success: function (_config) {
								//console.info(_config)
								if (_config.code == "00") {
									that.getLtaptoken(_config.data);
								} else {
									try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
									showErrorPage({ type: 0, errorInfor: _config.msg, errorButton: "关闭" });
								}
							},
							error: function (err) {
								wispApp.UI.dismissProgressDialog();
								if (err.status == 'timeout') {//超时,status还有success,error等值的情况
									showErrorPage({ type: 0, errorInfor: "网络异常，请重新打开。", errorButton: "关闭" });
								} else if (err.status == '504') {//超时,status还有success,error等值的情况
									showErrorPage({ type: 0, errorInfor: "鉴权服务异常，请联系管理员", errorButton: "关闭" });
								}

							}
						})
					}
				}).catch(err => {
					console.log("鉴权接口失败：" + err);
					console.log(AlipayJSBridge);
				});
			});
			console.log("钉钉准备结束" + dd.ready);
		},
		getPhoneNum: function () {
			//dd.disablePullToRefresh();
			//dd.disableWebviewBounce();
			let that = this;
			console.log("userInfo" + App.LS.get("userInfo"))
			if( App.LS.get("userInfo") && App.LS.get("userInfo") != ""){
				let userInfo = toArr(App.LS.get("userInfo"));
				if(userInfo.accountId){
					$.ajax({  //获取单点登录的信息
						url: outerBasehost + "/dd/ddauth-conversion/getJOAtokenByAccountId?accountId=" + userInfo.accountId + "&appKey=" + appKey,
						type: 'GET',
						dataType: "json",
						success: function (_config) {
							//console.info(_config)
							if (_config.code == "00") {
								that.getLtaptoken(_config.data);
							} else {
								try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
								showErrorPage({ type: 0, errorInfor: _config.msg, errorButton: "关闭" });
							}
						},
						error: function (err) {
							wispApp.UI.dismissProgressDialog();
							if (err.status == 'timeout') {//超时,status还有success,error等值的情况
								showErrorPage({ type: 0, errorInfor: "网络异常，请重新打开。", errorButton: "关闭" });
							} else if (err.status == '504') {//超时,status还有success,error等值的情况
								showErrorPage({ type: 0, errorInfor: "鉴权服务异常，请联系管理员", errorButton: "关闭" });
							}
	
						}
					})
				}else{
					this.getAuth();
				}
				
				//this.onRefresh();
			}else{
				try{
					this.getAuth();
				}catch(e){ console.log("try catch:" + JSON.stringify(e))}
			}
			
		},
		getEcharts: function () {
			var _url = ZjgyHost + ZjgyUrl["dryingtable"];
			var EchartsData = { org: [], red: [], yellow: [], green: [] };
			ajaxRequst(_url, 'get', '', 'json', '').then((result) => {
				$.each(result, function (i, item) {
					EchartsData.org.push(item.orgName);
					EchartsData.red.push(item.redNum);
					EchartsData.yellow.push(item.yellowNum);
					EchartsData.green.push(item.greenNum);
				})
			});
			this.EchartsArray = EchartsData;
		},
		initEcharts: function () {
			var myChart = echarts.init(document.getElementById('picCanvas'));
			var EchartsData = this.EchartsArray;
			var options = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {            // 坐标轴指示器，坐标轴触发有效
						type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data: ['红灯', '黄灯', '绿灯']
				},
				grid: {
					left: '0', right: '0', bottom: '0', containLabel: true
				},
				xAxis: {
					type: 'category',
					data: EchartsData.org,
					axisLabel: { interval: 0, rotate: 40, textStyle: { fontSize: 12 } }
				},
				yAxis: {
					type: 'value',
					axisLabel: { textStyle: { fontSize: 12 } }
				},
				series: [
					{
						name: '红灯',
						type: 'bar',
						stack: '总量',
						label: { show: true, position: 'insideRight', fontSize: 12 },
						itemStyle: {
							normal: { color: "red" }
						},
						data: EchartsData.red
					},
					{
						name: '黄灯',
						type: 'bar',
						stack: '总量',
						label: { show: true, position: 'insideRight', fontSize: 12 },
						itemStyle: {
							normal: { color: "#ffdb5c" }
						},
						data: EchartsData.yellow
					},
					{
						name: '绿灯',
						type: 'bar',
						stack: '总量',
						label: { show: true, position: 'insideRight', fontSize: 12 },
						itemStyle: {
							normal: { color: "#1d953f" }
						},
						data: EchartsData.green
					}
				]
			};
			myChart.setOption(options);
		},
		moduleConfig(){//模块配置
			let _this = this;
			//首页模块过滤
			if(App.LS.get('indexTabData')  && JSON.stringify(indexTabData) != App.LS.get('indexTabData')){
				//console.log("index111");
				if(JSON.stringify(indexTabData) != (App.LS.get('indexTabDataNew'))){//若ipconfig中的indexTabData配置改变，则重置设置页面
					//console.log("index222");
					App.LS.set('indexTabData',JSON.stringify(indexTabData));
					App.LS.set('indexTabDataNew',JSON.stringify(indexTabData));
					_this.indexTabDatas[1].modal = (indexTabData[1].modal).filter(item => item.isCheck );
				}else{
					//console.log("index333");
					_this.indexTabDatas[1].modal = (toArr(App.LS.get('indexTabData'))[1].modal).filter(item => item.isCheck );
				}
				
			}else{
				//console.log("index444");
				App.LS.set('indexTabData',JSON.stringify(indexTabData));
				App.LS.set('indexTabDataNew',JSON.stringify(indexTabData));
				//var datas = JSON.parse(JSON.stringify(indexTabData));
				_this.indexTabDatas[1].modal = (indexTabData[1].modal).filter(item => item.isCheck );
			}
			//首页列表过滤
			if(App.LS.get('moudleInfoView')){ 
				var moduleViewShow = JSON.stringify( JSON.parse(App.LS.get('moudleInfoView')).map(item => { return { id: item.id, name: item.name, isCheck: item.isCheck } }) );
			}
			//console.log("moudleInfoView:"+App.LS.get('moudleInfoView'));
			//ipconfig配置中的
			let moduleViewConfig = JSON.stringify( moudleInfo[0].view.map(item => { return { id: item.id, name: item.name, isCheck: item.isCheck } }) );
			if (moduleViewShow && (moduleViewConfig != moduleViewShow)) {
				//console.log("111");
				if (moduleViewConfig != App.LS.get('moudleInfoViewNew')) {//若ipconfig中的moudleInfo[0].view配置改变，则重置设置页面
					//console.log("222");
					App.LS.set('moudleInfoView', JSON.stringify(moudleInfo[0].view));
					App.LS.set('moudleInfoViewNew', JSON.stringify(moudleInfo[0].view.map(item => { return { id: item.id, name: item.name, isCheck: item.isCheck } })));
					_this.tabData.view = moudleInfo[0].view.filter(item => item.isCheck);
					//_this.moudleInfo = moudleInfo;
				} else {
					//console.log("333");
					_this.tabData.view = toArr(App.LS.get('moudleInfoView')).filter(item => item.isCheck);
				}
			} else {
				//console.log("444");
				App.LS.set('moudleInfoView', JSON.stringify(moudleInfo[0].view));
				App.LS.set('moudleInfoViewNew', JSON.stringify(moudleInfo[0].view.map(item => { return { id: item.id, name: item.name, isCheck: item.isCheck } })));
				_this.tabData.view = moudleInfo[0].view.filter(item => item.isCheck);
				//_this.moudleInfo = moudleInfo;
			}
			fontSizeSet.initFontSize();
		},
		isReaded(obj){ //判断是否已阅，用于首页是否加粗标题。未阅-加粗
			if(obj.readType){ //阅件
				if(obj.processExtension){
					let processExtension = JSON.parse(obj.processExtension);
					if(processExtension.isInterfaceRead && processExtension.isInterfaceRead == "1"){
						return true;
					}else{
						return false;
					}
				}else{
					return false;
				}
			}else{
				if(obj.isRead == 1){
					return true;
				}else{
					return false;
				}
			}
		},
		getFileSubject(obj, item){
			if(item.subjectId.indexOf("|") > -1){
				let subjectIdObj = item.subjectId.split("|");
				return obj[subjectIdObj[0]] ? obj[subjectIdObj[0]] : (obj[subjectIdObj[1]] ? obj[subjectIdObj[1]] : "无标题");
			}else{
				return obj[item.subjectId]==null?'无标题':obj[item.subjectId];
			}
			
			//obj[item.subjectId]==null?'无标题':obj[item.subjectId;

		}
	}
});
max_X = 18 * 5;
//滑出收藏按钮
function slideToCollect() {
	var container = document.querySelectorAll('.indexli');
	for (var i = 0; i < container.length; i++) {
		(function (i) {
			var x, y, X, Y, swipeX, swipeY;
			container[i].addEventListener('touchstart', function (event) {
				startX = event.changedTouches[0].pageX;
				startY = event.changedTouches[0].pageY;
				swipeX = true;
				swipeY = true;
			});
			container[i].addEventListener('touchmove', function (event) {
				endX = event.changedTouches[0].pageX;
				endY = event.changedTouches[0].pageY;
				// 左右滑动
				var differenceX = startX - endX
				if (swipeX && Math.abs(endX - startX) - Math.abs(endY - startY) > 0) {
					// 阻止事件冒泡
					if (differenceX < 0 && $(this).css("transform") != "none" && $(this).css("transform") != "matrix(1, 0, 0, 1, 0, 0)") { //右滑
						var x = differenceX + max_X;
						if (-differenceX > max_X || x < max_X / 2) {//就自动还原
							x = 0;
						}
						$(this).css("transform", "translateX(-" + x + "px)");
					}
					if (differenceX > 10) { //左滑
						if (differenceX > max_X) differenceX = max_X;
						$(this).css("transform", "translateX(-" + differenceX + "px)");
					}
					swipeY = false;
				}
			});
			container[i].addEventListener('touchend', function (event) {
				var curTransforms = $(this).css("transform");
				curTransform = curTransforms.substring(7, curTransforms.lastIndexOf(')') - 1);
				curTransform = Math.abs(parseInt(curTransform.split(',')[4]));
				if (curTransform < max_X / 2) {
					$(this).css("transform", "translateX(0px)");
				} else if (curTransform > max_X / 2) {
					$(this).css("transform", "translateX(-" + max_X + "px)");
				}
			})
		})(i)
	}
}
function doCollect(obj, _this) {
	$(_this.currentTarget).parent().css("transform", "translateX(0px)");
	var _url = ZjgyHost + ZjgyUrl['doCollect'] + "?moduleId=" + obj.businessNo + "&docId=" + obj.id;
	ajaxRequst(_url, 'get', 'application/json;charset=UTF-8', 'json', '').then(function (responseData) {
		console.log(responseData);
		if (responseData == "") {
			var para = { docId: obj.id, moduleId: obj.businessNo, regDept: obj.businessOrgName, moduleName: obj.businessName, title: obj.content }
			_url = ZjgyHost + ZjgyUrl['insertDocCollect'];
		} else {
			var para = {
				collectTime: (new Date()).Format("yyyy-MM-dd"),
				collecter: eval("(" + App.LS.get('userInfo') + ")").userNo, docId: obj.id, id: responseData.id, moduleId: obj.businessNo, moduleName: obj.businessName, regDept: obj.businessOrgName, systemNo: eval("(" + App.LS.get('userInfo') + ")").systemNo, title: obj.content
			}
			_url = ZjgyHost + ZjgyUrl['updateDocCollect'];
		}
		ajaxRequst(_url, 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(para)).then(function (responseData) {
			toast("收藏成功", 2000);
			indexPhone.getColList();
			try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
		})
	})
}
function delCollect(obj, _this) {
	$(_this.currentTarget).parent().css("transform", "translateX(0px)");
	ajaxRequst(ZjgyHost + ZjgyUrl['delCollect'], 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify([obj.id])).then(function (responseData) {
		console.log(responseData);
		toast("取消成功", 2000);
		indexPhone.getColList();
		try { wispApp.UI.dismissProgressDialog(); } catch (e) { }

	})
}

function refreshList() {
	//console.log("刷新");
	indexPhone.moduleConfig();
	indexPhone.getListData('refreshing');
}
addvisibListener();


