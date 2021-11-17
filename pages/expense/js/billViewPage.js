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
var billAttTimes = 0;
window.billViewPage=new Vue({ 
	el: '#billViewPage',
	data(){
		return{
			tabActive:0,
			tabData:[				
				{name:"机票",pageId:"invoiceList",billAttList:[],refreshing:false,loading:false,finished:false},
				{name:"火车票",pageId:"trainTicket",billAttList:[],refreshing:false,loading:false,finished:false},
				{name:"住宿票",pageId:"stayList",billAttList:[],refreshing:false,loading:false,finished:false},
				{name:"其他发票",pageId:"otherList",billAttList:[],refreshing:false,loading:false,finished:false},
			],
			expenseContentJson: toArr(App.LS.get("expenseContentJson")) || toArr(docInfor.expenseContentJson) || {},
			isEdit: toArr(App.LS.get("isEdit")),//表单是否可编辑
			billAttNums:0,
			showImg:false,//是否显示图片预览
			imgIndex: 0,
			images: [],
		}
	},
	mounted() {
		
	},
	created(){	
		// wispApp.UI.showProgressDialog("正在加载页面数据...");
		fontSizeSet.initFontSize();	
		// this.getBillList();
		if(this.isEdit){ this.backListening(); }
		this.defaultShowTab();
	},
	methods:{
		defaultShowTab(){//默认展示有数据的页签
			let _this = this;
			_this.tabData.forEach((tab,t) => {
				if(_this.expenseContentJson[tab.pageId] && _this.expenseContentJson[tab.pageId].length > 0){
					_this.tabActive = t;
					throw Error();//跳出整个循环
				}
			})
			
		},
		onRefresh(){
			this.getBillList();
		},
		getBillList(){
			let _this = this;
			billAttTimes = 0;
			let curTab = _this.tabData[_this.tabActive];
			// if(!_this.tabData[_this.tabActive].initFlag){//未加载过的话
			// 	_this.tabData[_this.tabActive].initFlag = true;
			_this.tabData[_this.tabActive].billAttList = [];
			let billIdArray = [];
			if(_this.expenseContentJson[curTab.pageId] && _this.expenseContentJson[curTab.pageId].length > 0){
				_this.billAttNums = _this.expenseContentJson[curTab.pageId].length;
				_this.expenseContentJson[curTab.pageId].forEach(item => {
					let getAtt = _this.getAttach(item.id);
					billIdArray.push(getAtt);
				});
				Promise.all(billIdArray).then((result) => {
					console.log(result);
					let toImgUrlArray = [];
					result.forEach((json,index) => {
						if(json.length > 0 && ["jpg","jpeg","png","bmp","gif","pdf"].includes(json[0].fileSuffix.toLowerCase())){
							if(json[0].fileSuffix.toLowerCase() == "pdf"){
								// var toImgUrl = ZjgyHost  + ZjgyUrl["PdfToImg"]+ '?id='+json[0].id +"&tTime="+(new Date()).getTime();
								toImgUrlArray.push(_this.getPdfToImg(json[0]));
							}
							if(_this.tabData[_this.tabActive].billAttList.length == 0){
								_this.tabData[_this.tabActive].billAttList = json;
							}else{
								_this.tabData[_this.tabActive].billAttList = _this.tabData[_this.tabActive].billAttList.concat(json);
							}
						}
					})
					if(toImgUrlArray.length > 0){
						Promise.all(toImgUrlArray).then( imgData => {
							_this.tabData[_this.tabActive].billAttList.forEach(item => {
								if(item.fileSuffix.toLowerCase() == "pdf"){
									var tempurl = item.img;
								}else{
									var tempurl = ZjgyHost  + ZjgyUrl["File-download"]+ '?id='+item.id+"&x-auth-token="+getCookieValue("x-auth-token") +"&tTime="+(new Date()).getTime();
								}
								// item.img = tempurl;
								_this.images.push(tempurl);
								_this.$refs[item.id][0].src = tempurl;
							});
							_this.tabData[_this.tabActive].loading = false;
							_this.tabData[_this.tabActive].refreshing = false;
							_this.tabData[_this.tabActive].finished = true;
							_this.$forceUpdate();//强制更新
					
						}).catch((error) => {
							console.log(error);
						})
					}else{
						if(_this.tabData[_this.tabActive].billAttList.length > 0){
							setTimeout(()=>{
								_this.tabData[_this.tabActive].billAttList.forEach(item => {
									// if(item.fileSuffix.toLowerCase() == "pdf"){
									// 	var tempurl = item.img;
									// }else{
										var tempurl = ZjgyHost  + ZjgyUrl["File-download"]+ '?id='+item.id+"&x-auth-token="+getCookieValue("x-auth-token") +"&tTime="+(new Date()).getTime();
									// }
									// item.img = tempurl;
									_this.images.push(tempurl);	
									_this.$refs[item.id][0].src = tempurl;
								})
								_this.tabData[_this.tabActive].loading = false;
								_this.tabData[_this.tabActive].refreshing = false;
								_this.tabData[_this.tabActive].finished = true;
								_this.$forceUpdate();//强制更新
							// }
							},1000)
						}
					}	
				})
			}else{
				_this.tabData[_this.tabActive].loading = false;
				_this.tabData[_this.tabActive].refreshing = false;
				_this.tabData[_this.tabActive].finished = true;
			}
		},
		getPdfToImg(data){
			var toImgUrl = ZjgyHost  + ZjgyUrl["PdfToImg"]+ '?id='+data.id +"&tTime="+(new Date()).getTime();
			return ajaxRequst(toImgUrl,'get','application/json;charset=UTF-8','json').then(function(imgData){
				// billAttTimes++;
				data.img = imgData;
			})
		},
		getAttach:function(docId){//获取票据附件
			var _self = this;
			var _url = ZjgyHost + ZjgyUrl["get-attach"];	
			var data = {
				docId: docId,
				type: "attach",
				containFile: false
			}	
			return new Promise((success, fail) => {
				$.ajax({
					 url: _url,
					 type: "get",
					 contentType: "application/json;charset=UTF-8",
					 datatype:"json",
					 data:data,
					 success:function(json){
						
						 success(json);
					 },
					 error:function(err){
						 networkError(err,_url);
					 }
				 })         
			 })
			return ajaxRequst(_url,'get','application/json;charset=UTF-8','json',data).then(function(json){
				//console.log(json);
				if(json.length > 0 && ["jpg","jpeg","png","bmp","gif","pdf"].includes(json[0].fileSuffix.toLowerCase())){
					if(json[0].fileSuffix.toLowerCase() == "pdf"){
						var toImgUrl = ZjgyHost  + ZjgyUrl["PdfToImg"]+ '?id='+json[0].id +"&tTime="+(new Date()).getTime();
						ajaxRequst(toImgUrl,'get','application/json;charset=UTF-8','json',data).then(function(imgData){
							billAttTimes++;
							json[0].img = imgData;
							
						})
					}else{
						billAttTimes++;
					}
					if(_self.tabData[_self.tabActive].billAttList.length == 0){
						_self.tabData[_self.tabActive].billAttList = json;
					}else{
						_self.tabData[_self.tabActive].billAttList = _self.tabData[_self.tabActive].billAttList.concat(json);
					}
					
					
					// App.LS.set("billAttList",JSON.stringify(billAttList));
				}
				
				if(billAttTimes == _self.billAttNums ){
					setTimeout(()=>{
						_self.tabData[_self.tabActive].billAttList.forEach(item => {
							if(item.fileSuffix.toLowerCase() == "pdf"){
								var tempurl = item.img;
							}else{
								var tempurl = ZjgyHost  + ZjgyUrl["File-download"]+ '?id='+item.id+"&x-auth-token="+getCookieValue("x-auth-token") +"&tTime="+(new Date()).getTime();
							}
							// item.img = tempurl;	
							_self.$refs[item.id][0].src = tempurl;
						})
						_self.tabData[_self.tabActive].loading = false;
						_self.tabData[_self.tabActive].refreshing = false;
						_self.tabData[_self.tabActive].finished = true;
						_self.$forceUpdate();//强制更新
					},1000);
				}
			})
		},
		formatChineseDate(chineseDate){//格式化中文日期为"yyyy-MM-dd"
			let newData = chineseDate.split("年");
			let year = newData[0];
			let month = newData[1].split("月")[0];
			let day = newData[1].split("月")[1].split("日")[0];
			return (year + "-" + month + "-" + day);
		},
		//上传前对图片进行压缩
		asyncBeforeRead(file) {
			// if(this.tabActive == 0){ 
			// 	toast("暂不支持，请稍候再试...");
			// 	return false;
			// }
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
		uploadFiles(file,obj){ //重新上传文件
			// console.log(file);
			let _this = this;
			let _url = ZjgyHost + ZjgyUrl["upload-attFile"];
			// return;
			wispApp.UI.showProgressDialog("票据上传中...");
			let formData = new FormData(); // FormData 对象
			formData.append("docId", obj.name.docId);
			formData.append("moduleId", App.LS.get("module"));
			formData.append("type", 'attach');
			formData.append("extension", {});
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
				_this.OcrIdentification(data,obj.name);
			}).error(err => {
				try {wispApp.UI.dismissProgressDialog();} catch(e) {}	
				toast("票据上传失败！");
				console.log(err);
			})
			
		},
		OcrIdentification(data,obj){ //ocr识别
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
					console.log(json.result);
					json.result.forEach(res => {
						if(typeof(res.money) == "string"){ res.money = parseFloat(res.money); }
						if(!_this.expenseContentJson[_this.tabData[_this.tabActive].pageId]){ 
							_this.$set(_this.expenseContentJson, _this.tabData[_this.tabActive].pageId, []);
						 }
						switch(_this.tabActive){
							case 0://机票
								_this.expenseContentJson.invoiceList.forEach((item,i) => {
									if(item.id == obj.docId){
										_this.expenseContentJson.trainTicket[i] = {
											amount: res.money,
											banquet: res.seat,
											date: res.time,
											departure: res.startStation,
											destination: res.endStation,
											expenseAmount: res.money,
											id: item.id,
											index: _this.expenseContentJson.invoiceList.length,
											invoiceNumber: res.num,
											passenger: res.name,
										}
									}
								})
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
								_this.expenseContentJson.trainTicket.forEach((item,i) => {
									if(item.id == obj.docId){
										_this.expenseContentJson.trainTicket[i] = {
											amount: res.money,
											banquet: res.seat,
											date: res.time!="" ? _this.formatChineseDate(res.time) : "",
											departure: res.startStation,
											destination: res.endStation,
											expenseAmount: res.money,
											id: item.id,
											index: _this.expenseContentJson.trainTicket.length,
											invoiceNumber: res.num,
											passenger: res.name,
										}
									}
								})
								break;
							case 2://住宿票
								// if(!_this.expenseContentJson.stayList){ _this.expenseContentJson.stayList = []; }
								_this.expenseContentJson.stayList.forEach((item,i) => {
									if(item.id == obj.docId){
										_this.expenseContentJson.stayList[i] = {
											amount: res.money,
											destination: {detail:[{}]},
											expenseAmount: res.money,
											id: item.id,
											index: _this.expenseContentJson.stayList.length,
											invoiceNumber: res.num,
											stayWhere: res.addr,
										}
									}
									
								})
								break;
							case 3://其他票据
								// if(!_this.expenseContentJson.otherList){ _this.expenseContentJson.otherList = []; }
								_this.expenseContentJson.otherList.forEach((item,i) =>{
									if(item.id == obj.docId){
										_this.expenseContentJson.stayList[i] = {
											amount: res.money,
											content: res.content,
											destination: {detail:[{}]},
											expenseAmount: res.money,
											id: data.docId,
											index:_this.expenseContentJson.otherList.length,
											invoiceNumber:res.num
										}
									}
									
								})
								break;
						}
					});
					_this.deleteAttFile(obj);//删除原来的票据
					_this.$forceUpdate();//强制更新
					toast("票据识别成功！");
				}else{	
					toast("票据识别失败！");
				}
				
			})
		},
		deleteAttFile(billAtt,isTip){//删除附件  isTip=true 需要提示删除
			let _this = this;
			let delAtt = function(){
				let _url =  ZjgyHost + ZjgyUrl["delete-attFile"];
				let data = [billAtt.id];
				ajaxRequst(_url,'post','application/json;charset=UTF-8','json',JSON.stringify(data)).then(function(result){
					if(result){
						if(isTip){
							toast("删除成功！");
						}
						_this.getBillList();
					}else{
						toast("删除失败！");
					}
				});
			}
			if(isTip){
				App.UI('dialog', {
					type : 'confirm',
					title: 'queren',
					OkTxt: '确定',
					CancelTxt: '取消',
					msg	 : '是否确定删除？'
				},function(_action){
					if(_action==='OK'){
						delAtt();
					}
				});
			}else{
				delAtt();
			}
			
		},
		backListening(){ //返回监听
			let _this = this;
			document.addEventListener('back', function(e) {
				// App.UI('dialog', {
				// 	type : 'confirm',
				// 	title: 'queren',
				// 	OkTxt: '确定',
				// 	CancelTxt: '取消',
				// 	msg	 : '是否提交票据信息？'
				// },function(_action){
				// 	if(_action==='OK'){
				// 		App.LS.set("expenseContentJson",JSON.stringify(_this.expenseContentJson));
				// 		closePage("billPage.updateForm();");
				// 	}else{
				// 		App.LS.remove("expenseContentJson");
				// 		closePage();
				// 	}
				// })	
				App.LS.set("expenseContentJson",JSON.stringify(_this.expenseContentJson));
				closePage("billPage.updateForm();");
				e.preventDefault();
			})
		},
		showBillImg(id){
			let _this = this;
			this.showImg = true;
			this.images.forEach((img,i) => {
				if(img.indexOf(id) > -1){
					_this.imgIndex = i;
					// _this.$refs.imgPreview.swipeTo(i);
				}
			})
		},
		onChange(index) {
			this.imgIndex = index;
		},
	}
});	

addvisibListener();
