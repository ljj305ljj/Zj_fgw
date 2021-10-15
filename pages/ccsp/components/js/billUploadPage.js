// 初始化vConsole
// window.vConsole = new window.VConsole({
// 	defaultPlugins: ['system', 'network', 'element', 'storage'], // 可以在此设定要默认加载的面板
// 	maxLogNumber: 1000,
// 	// disableLogScrolling: true,
// 	onReady: function() {
// 		console.info(dd)
// 	  console.log('vConsole is ready.');
// 	},
// 	onClearLog: function() {
// 	  console.log('on clearLog');
// 	}
// });
var userInfo = toArr(App.LS.get('userInfo'));
var docInfor = toArr(App.LS.get("docInfor"));
var billAttList = [];//票据附件
window.billPage=new Vue({ 
	el: '#billPage',
	data(){
		return{
			tabActive:0,
			tabData:[//页签				
				{name:"机票",pageId:"invoiceList"},
				{name:"火车票",pageId:"trainTicket"},
				{name:"住宿票",pageId:"stayList"},
				{name:"其他发票",pageId:"otherList"},
			],
			expenseContentJson: toArr(App.LS.get("expenseContentJson")) || toArr(docInfor.expenseContentJson) || {},//票据信息
			signJson: toArr(App.LS.get("signJson")) || toArr(docInfor.signJson) || {signJsonList:[]},//信息登记
			payMethodDetail:toArr(App.LS.get("payMethodDetail")) || toArr(docInfor.payMethodDetail) || [],//支付明细
			isEdit: toArr(App.LS.get("isEdit")),//表单是否可编辑
			index:0,//第几个票据的日期
			checkBoxs:{//票据复选框
				invoiceList:{ 
					checkBoxsName:"invoiceListCheckBoxs",//复选框名称
					checkedIndexs:[],//选中的票据信息索引
				},
				trainTicket:{ 
					checkBoxsName:"trainTicketCheckBoxs",
					checkedIndexs:[],
				},
				stayList:{ 
					checkBoxsName:"stayListCheckBoxs",
					checkedIndexs:[],
				},
				otherList:{ 
					checkBoxsName:"otherListCheckBoxs",
					checkedIndexs:[],
				}
			},
			showCalendar:false,
			minDate: new Date(2010, 0, 1),
   			maxDate: new Date(2025, 0, 31),
			defaultDate: new Date(),
			userTrees:[],//人员组织结构
			isShowTreeSelect:false,
			exIndex:0,//票据信息
			peoIndex:0,//票据选人
		}
	},
	watch:{
		'expenseContentJson':{
			handler(val) {
				if(val){
					console.log(val);
					this.autoExpenseAmount();
				}
			},
			// immediate: true,
            deep:true,
		},
	},
	mounted() {
		
	},
	created(){	
		// wispApp.UI.showProgressDialog("正在加载页面数据...");
		fontSizeSet.initFontSize();	
		if(this.isEdit){ 
			getUserTrees(this);
			this.backListening(); 
		}
		this.defaultShowTab();
	},
	methods:{
		defaultShowTab(){ //默认展示有数据的页签
			let _this = this;
			_this.tabData.forEach((tab,t) => {
				if(_this.expenseContentJson[tab.pageId] && _this.expenseContentJson[tab.pageId].length > 0){
					_this.tabActive = t;
					throw Error();//跳出整个循环
				}
			})
		},
		formatDate(date) {
			return date.Format("yyyy-MM-dd");
		},
		formatChineseDate(chineseDate){//格式化中文日期为"yyyy-MM-dd"
			let newData = chineseDate.split("年");
			let year = newData[0];
			let month = newData[1].split("月")[0];
			let day = newData[1].split("月")[1].split("日")[0];
			return (year + "-" + month + "-" + day);
		},
		showTreeComponet(index,pindex){
			this.isShowTreeSelect = true;
			this.exIndex = index;//对应票据信息中的乘客
			if(pindex){ this.peoIndex = pindex; }//对应票据的选人
		},
		setPassengerTreeValue(name){//填充机票、火车票的乘客
			this.expenseContentJson[this.tabData[this.tabActive].pageId][this.exIndex].passenger = name;
			this.isShowTreeSelect = false;
			this.addBussinessPeople(name);
		},
		setPeoTreeValue(name){//填充住宿票、其他发票的选人
			let detail = this.expenseContentJson[this.tabData[this.tabActive].pageId][this.exIndex].destination.detail; 
			// detail[this.peoIndex].people = name; 
			this.$set(detail[this.peoIndex], "people", name);
			this.isShowTreeSelect = false;
			this.addBussinessPeople(name);
		},
		addBussinessPeople(name){//信息登记页面添加出差人
			let _this = this;
			let isHasBussinessPeople = false;//是否存在该出差人
			if(_this.signJson && _this.signJson.signJsonList){
				_this.signJson.signJsonList.forEach((sign,s) => {
					if( name && sign.bussinessPeople && name == sign.bussinessPeople){//存在该出差人
						isHasBussinessPeople = true;
					}
				});
			}
			if(!isHasBussinessPeople){//不存在该出差人的话就新增
				let newSignJsonItem = {
					addressList: {detail:[{}]},
					bussinessPeople: name,
					chargeDetails: {detail:[
						{amount: 0,name: "交通费"},
						{amount: 0,name: "住宿费"},
						{amount: 0,name: "伙食补助"},
						{amount: 0,name: "公杂补助"},
						{amount: 0,name: "其他费用"},
						{amount: 0,name: "小计"},
					]},
					days: null,
					endDate: "",
					heaven: 0,
					id: generateUUID(),
					qinghaiTibetBorderDay: 0,
					startDate: "",
					vehiclesDay: 0,
				}
				
				_this.signJson.signJsonList.push(newSignJsonItem);
			}
			//自动同步到支付明细
			let payDetail = _this.payMethodDetail.filter(det => det.name == name);
			if(payDetail.length == 0){
                _this.payMethodDetail.push({id: generateUUID(), index: _this.payMethodDetail.length, name: name});
			}

		},
		autoExpenseAmount(){//同步票据各费用到指定出差人
			let _this = this;
			let isHasBussinessPeople = false,detail = {};
			if(_this.signJson && _this.signJson.signJsonList){
				_this.signJson.signJsonList.forEach((sign,s) => {
					sign.chargeDetails.detail.forEach((det,d) => { det.amount = 0;})//清空一下该出差人的报销明细
					for(let pageId in _this.expenseContentJson){
						_this.expenseContentJson[pageId].forEach(expense => {
							let people = expense.destination && expense.destination.detail && expense.destination.detail.filter(del => del.people == sign.bussinessPeople);
							if( (expense.passenger && sign.bussinessPeople && expense.passenger == sign.bussinessPeople) || (people && people.length > 0)){//存在该出差人
								isHasBussinessPeople = true;
								switch(pageId){
									case "invoiceList":
									case "trainTicket":
										detail = {amount: expense.amount,name: "交通费"};
										break;
									case "stayList":
										detail = {amount: expense.amount,name: "住宿费"};
										break;
									case "otherList":
										detail = {amount: expense.amount,name: "其他费用"};
										break;
								}
								//计算该出差人的报销明细
								let total = 0;
								sign.chargeDetails.detail.forEach((det,d) => {
									if(typeof(det.amount) == "string"){ det.amount = parseFloat(det.amount)}
									if(det.name == detail.name){//各费用分类叠加计算
										// if(d == 0){det.amount =  parseFloat(detail.amount)}
										det.amount += parseFloat(detail.amount); 
									}
									if(d == sign.chargeDetails.detail.length - 1){
										det.amount = total;//小计
									}else{
										total += det.amount;
									}
								});

							}
						})
					};
				})
				
			}
		},
		showCalendarComponet(index){//显示日历控件
			this.showCalendar = true;
			this.index = index;
		},
		onConfirmCalendar(date){
			this.showCalendar = false;
			this.expenseContentJson[this.tabData[this.tabActive].pageId][this.index].date = this.formatDate(date);
		},
		//上传前对图片进行压缩
		asyncBeforeRead(file) {
			if(this.tabActive == 0 ){ 
				toast("暂不支持，请稍候再试...");
				return false;
			}
			this.fileName = file.name;
			const isIMG = file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png";
			return new Promise((resolve, reject) => {
				// let isLt2M = file.size / 1024 / 1024 < 2 // 判定图片大小是否小于2MB
				// if (isLt2M) {
				// 	  resolve(file);
				// }
				if(isIMG){//只对图片进行压缩
					console.log(file) // 压缩到500KB,这里的500就是要压缩的大小,可自定义
					imageConversion.compressAccurately(file, 500).then(res => { // console.log(res)
							resolve(res);
					});
				}else{
					resolve(file);
				}
				
			})
			
		},
		uploadFiles(file){ //上传文件
			// console.log(file);
			let _this = this;
			let _url = ZjgyHost + ZjgyUrl["upload-attFile"];
			wispApp.UI.showProgressDialog("票据上传中...");
			let formData = new FormData(); // FormData 对象
			formData.append("docId", generateUUID());
			formData.append("moduleId", App.LS.get("module"));
			formData.append("type", 'attach');
			formData.append("extension", "{}");
			formData.append("multipartFile", file.file,this.fileName); // 文件对象
			$.ajax({
				url: _url,
				type: "post",
				data:formData,
				contentType: false,
				processData:false,
			}).success(data => {
				console.log(data);
				try {wispApp.UI.dismissProgressDialog();} catch(e) {}	
				toast("票据上传成功！");
				_this.OcrIdentification(data);
			}).error(err => {
				try {wispApp.UI.dismissProgressDialog();} catch(e) {}	
				toast("票据上传失败！");
				console.log(err);
			})
			
		},
		OcrIdentification(data){ //ocr识别
			wispApp.UI.showProgressDialog("票据识别中...");
			let _this = this;
			let _OcrUrl =  ZjgyHost + ZjgyUrl["ocr_expense"];
			let OcrData = [];
			//type 1,2,3,4代表机票、火车票、住宿票、其他票据
			OcrData.push({id: data.id, type: (_this.tabActive+1) })
			ajaxRequst(_OcrUrl,'post','application/json;charset=UTF-8','json',JSON.stringify(OcrData)).then(function(json){
				json = JSON.parse(json);
				try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				if(json.errno == 0 && json.result && json.result.length > 0){	
					// console.log(json.result);
					let detail = {};
					json.result.forEach(res => {
						if(typeof(res.money) == "string"){ res.money = parseFloat(res.money); }
						if(!_this.expenseContentJson[_this.tabData[_this.tabActive].pageId]){ 
							_this.$set(_this.expenseContentJson, _this.tabData[_this.tabActive].pageId, []);
						 }
						switch(_this.tabActive){
							case 0://机票
								detail = {amount: res.money,name: "交通费"};
								_this.autoToSignJsonList(detail,res);
								break;
							case 1://火车票
								// {
								// 	endStation: "苍南站"
								// 	money: "157.0"
								// 	name: "林泉"
								// 	num: "90041300270624C070189"
								// 	seat: "二等座"
								// 	startStation: "杭州东站"
								// 	time: "2021年06月23日08:55"
								// }
								// if(!_this.expenseContentJson.trainTicket){ _this.expenseContentJson.trainTicket = []; }
								_this.expenseContentJson.trainTicket.push({
									amount: res.money,
									banquet: res.seat,
									date: res.time!="" ? _this.formatChineseDate(res.time) : "",
									departure: res.startStation,
									destination: res.endStation,
									expenseAmount: res.money,
									id: data.docId,
									index: _this.expenseContentJson.trainTicket.length,
									invoiceNumber: res.num,
									passenger: res.name,
								})
								detail = {amount: res.money,name: "交通费"};
								_this.autoToSignJsonList(detail,res);
								break;
							case 2://住宿票
								// if(!_this.expenseContentJson.stayList){ _this.expenseContentJson.stayList = []; }
								_this.expenseContentJson.stayList.push({
									amount: res.money,
									destination: {detail:[{}]},
									expenseAmount: res.money,
									id: data.docId,
									index: _this.expenseContentJson.stayList.length,
									invoiceNumber: res.num,
									stayWhere: res.addr,
								})
								detail = {amount: res.money,name: "住宿费"};
								break;
							case 3://其他票据
								// if(!_this.expenseContentJson.otherList){ _this.expenseContentJson.otherList = []; }
								_this.expenseContentJson.otherList.push({
									amount: res.money,
									content: res.content,
									destination: {detail:[{}]},
									expenseAmount: res.money,
									id: data.docId,
									index:_this.expenseContentJson.otherList.length,
									invoiceNumber:res.num
								})
								detail = {amount: res.money,name: "其他费用"};
								break;
						}
						
						
					});
					_this.$forceUpdate();//强制更新
					toast("票据识别成功！");
				}else{
					toast("票据识别失败！");
				}
				
			})
		},
		autoToSignJsonList(detail,res){
			//自动同步到信息登记
			let _this = this;
			let isHasBussinessPeople = false;//是否存在该出差人
			if(_this.signJson && _this.signJson.signJsonList){
				_this.signJson.signJsonList.forEach((sign,s) => {
					if( res.name && sign.bussinessPeople && res.name == sign.bussinessPeople){//存在该出差人
						isHasBussinessPeople = true;
						let address = sign.addressList.detail.filter(add => add.endAddress && add.endAddress == res.endStation);////筛选出有该出差地的
						if(address.length == 0){//不存在该出差地
							sign.addressList.detail.push({endAddress:res.endStation});
						}
						let total = 0;
						sign.chargeDetails.detail.forEach((det,d) => {
							if(typeof(det.amount) == "string"){ det.amount = parseFloat(det.amount)}
							if(det.name == detail.name){//各费用分类叠加计算
								det.amount += detail.amount;
							}
							if(d == sign.chargeDetails.detail.length - 1){
								det.amount = total;//小计
							}else{
								total += det.amount;
							}
							
						})
					}
				});
			}
			if(!isHasBussinessPeople){//不存在该出差人的话就新增
				let newSignJsonItem = {
					addressList: {detail:[{endAddress:res.endStation}]},
					bussinessPeople: res.name,
					chargeDetails: {detail:[
						{amount: 0,name: "交通费"},
						{amount: 0,name: "住宿费"},
						{amount: 0,name: "伙食补助"},
						{amount: 0,name: "公杂补助"},
						{amount: 0,name: "其他费用"},
						{amount: 0,name: "小计"},
					]},
					days: null,
					endDate: "",
					heaven: 0,
					id: generateUUID(),
					qinghaiTibetBorderDay: 0,
					startDate: "",
					vehiclesDay: 0,
				}
				let total = 0;
				newSignJsonItem.chargeDetails.detail.forEach((det,d) => {
					if(typeof(det.amount) == "string"){ det.amount = parseFloat(det.amount)}
						if(det.name == detail.name){//各费用分类叠加计算
							det.amount += detail.amount;
						}
						if(d == newSignJsonItem.chargeDetails.detail.length - 1){
							det.amount = total;
						}else{
							total += det.amount;
						}
				})
				_this.signJson.signJsonList.push(newSignJsonItem);
			}
			//自动同步到支付明细
			let payDetail = _this.payMethodDetail.filter(det => det.name == res.name);
			if(payDetail.length == 0){
                _this.payMethodDetail.push({id: generateUUID(), index: _this.payMethodDetail.length, name: res.name});
			}
		},
		takePhoto(){//拍照上传
			dd.takePhoto().then(res => {
				alert(JSON.stringify(res));
			}).catch(err => {
				
			})
		},
		addExpenseDetail(pageId){//增加票据信息
			let index = 0;
			if(this.expenseContentJson[pageId]){
				index = this.expenseContentJson[pageId].length;
			}else{
				this.$set(this.expenseContentJson, pageId, []);
				// this.expenseContentJson[pageId] = [];//无该类型票据信息的情况
			}
			if(pageId == "stayList"){
				this.expenseContentJson.stayList.push({
					amount: "",
					destination: {detail:[{}]},
					expenseAmount: "",
					id: generateUUID(),
					index: index,
					invoiceNumber: "",
					stayWhere: "",
				})
			}else if(pageId == "otherList"){
				this.expenseContentJson.otherList.push({
					amount: "",
					content: "",
					destination: {detail:[{}]},
					expenseAmount: "",
					id: generateUUID(),
					index:index,
					invoiceNumber: "",
				});
				
			}else{
				this.expenseContentJson[pageId].push({id: generateUUID(), index: index});
			}
			this.$forceUpdate();//强制更新
		},
		deleteExpenseDetail(pageId){//删除票据信息
			let _this = this;
			let checkedIndexs = _this.checkBoxs[pageId].checkedIndexs;//选中的票据信息索引
			if(!checkedIndexs || checkedIndexs.length === 0){
				toast("未选中删除项！");
				return false;
			}
			App.UI('dialog', {
				type : 'confirm',
				title: 'queren',
				OkTxt: '确定',
				CancelTxt: '取消',
				msg	 : '是否确定删除？'
			},function(_action){
				if(_action==='OK'){
					/**因为splice是从第二次的时候出现bug的，
					 *所以我们第一个索引的位置是正确的，
					*从第二次开始 “n-1”，也就是刚好对应索引数组的索引。**/
					let newIndexs = checkedIndexs.map(function(val, idx) {
						return val - idx;
					});
					checkedIndexs.forEach((val, idx) => {
						_this.$refs[_this.checkBoxs[pageId].checkBoxsName][val].toggle();
					});
					newIndexs.forEach((checked,cIndex) => {
						_this.expenseContentJson[pageId].splice(checked,1);
					});
				}
			});
			
		},
		toggleCheckBox(pageId,index){
			if(this.isEdit){
				this.$refs[this.checkBoxs[pageId].checkBoxsName][index].toggle();
			}
		},
		openBillView(){//打开票据列表页面
			App.LS.set("expenseContentJson",JSON.stringify(this.expenseContentJson));
			App.LS.set("signJson",JSON.stringify(this.signJson));
			App.LS.set("payMethodDetail",JSON.stringify(this.payMethodDetail));
			OpenWebView('pages/expense/BillViewPage.html');
		},
		backListening(){ //返回监听
			let _this = this;
			document.addEventListener('back', function(e) {
				if(_this.isShowTreeSelect){
					_this.isShowTreeSelect = false;
					e.preventDefault(); 
					return;
				}
				App.LS.set("expenseContentJson",JSON.stringify(_this.expenseContentJson));
				App.LS.set("signJson",JSON.stringify(_this.signJson));
				App.LS.set("payMethodDetail",JSON.stringify(_this.payMethodDetail));
				closePage("jbxx.updateForm();");
				// App.UI('dialog', {
				// 	type : 'confirm',
				// 	title: 'queren',
				// 	OkTxt: '确定',
				// 	CancelTxt: '取消',
				// 	msg	 : '是否提交票据信息？'
				// },function(_action){
				// 	if(_action==='OK'){
				// 		App.LS.set("expenseContentJson",JSON.stringify(_this.expenseContentJson));
				// 		App.LS.set("signJson",JSON.stringify(_this.signJson));
				// 		App.LS.set("payMethodDetail",JSON.stringify(_this.payMethodDetail));
				// 		closePage("jbxx.updateForm();");
				// 	}else{
				// 		App.LS.remove("expenseContentJson");
				// 		App.LS.remove("signJson");
				// 		App.LS.remove("payMethodDetail");
				// 		closePage();
				// 	}
				// })	
				e.preventDefault();
			})
		},
		updateForm(){
			this.expenseContentJson = toArr(App.LS.get("expenseContentJson"));
			// this.signJson = toArr(App.LS.get("signJson"));
			// this.payMethodDetail = toArr(App.LS.get("payMethodDetail"));
		}
	}
});	

addvisibListener();
