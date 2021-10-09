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
//addCookie("callback", "", 7, "/");//回调函数存放在cookie中，，存放再LS中IPHONE7手机有问题。

window.detailPage=new Vue({ 
	el: '#detailPage',
	data(){
		return{
			subject:"",//主题
			isSMS:false,//是否短信提醒
			showPicker:false,//时间选择器的显示
			minDate: new Date(2021, 0, 1),
      		maxDate: new Date(2025, 10, 1),
      		currentDate: new Date(),
			cdate:new Date().Format('yyyy-MM-dd hh:mm:ss'),
			userInfo: JSON.parse(App.LS.get("userInfo")),
			selectDay: new Date(getUrlParam("selectDay").replace(/-/g,"/")).Format("yyyy-MM-dd"),//将"-"替换成"/",解决IOS端页面new Date显示invalid Date的问题,兼容safari。
			selweek: JSON.parse(App.LS.get('flowParam')).selweek,
			UserAuthList: JSON.parse(App.LS.get("UserAuthList")),
			showLeader:false,//是否显示领导列表
			selLeader:false,//选中的领导
			docInfo:{},
			getFilesTimes:0
		}
	},
	mounted() {
		
	},
	created(){	
		fontSizeSet.initFontSize();	
		//wispApp.UI.showProgressDialog("正在加载页面数据...");
		console.info("detailPage");
		//listInfo = toArr(App.LS.get("listInfo"));
		var _self=this;
		//_self.getDocInfor(_self.userInfo.username,_self.userInfo.orgNo);
		let draftUserNo = getUrlParam("draftUserNo");
		let draftOrgNo = getUrlParam("draftOrgNo");
		if(draftUserNo && draftOrgNo){
			_self.getDocInfor(draftUserNo,draftOrgNo);
		}else{
			_self.getDocInfor(_self.UserAuthList[0].userNo,_self.UserAuthList[0].orgNo);
		}
		
	},
	methods:{
		onConfirm:function(time) {
			this.cdate = time.Format('yyyy-MM-dd hh:mm:ss');
			this.showPicker = false;
		  },
		showDatePicker:function(){
			this.showPicker = true;
		},
		// 时间选项格式化函数
		formatter (type, value) {
			if (type === 'year') {
				return `${value}年`
			} else if (type === 'month') {
				return `${value}月`
			} else if (type === 'day') {
				return `${value}日`
			} else if (type === 'hour') {
				return `${value}时`
			} else if (type === 'minute') {
				return `${value}分`
			} else if (type === 'second') {
				return `${value}秒`
			}
			return value
		},
		getDocInfor:function(userNo,orgNo){	
			var _self=this;
			var _url= ZjgyHost + ZjgyUrl["get-schedule"];
			App.LS.remove("docInfor");
			App.LS.remove("docId");
			App.LS.remove("docInfor2");
			App.LS.remove("docId2");
			_url += '?currDate=' + _self.selectDay + '&draftUserNo=' + userNo + '&draftOrgNo=' + orgNo;
			ajaxRequst(_url,'GET','application/json;charset=UTF-8','json').then(function(json){
				_self.docInfo = json;
				_self.subject = json.subject;
				_self.isSMS = json.isAlert == "0" ? false : true;
				_self.cdate = json.alertTime;
				//App.LS.set("docInfor",JSON.stringify(json));
				
			});
		},
		submitSchedule:function(){
			let _self = this;
			let _url = ZjgyHost + ZjgyUrl["insert-schedule"];
			if(_self.docInfo.subject && _self.docInfo.subject != ""){
				_url = ZjgyHost + ZjgyUrl["update-schedule"];
			}
			_self.docInfo.subject = _self.subject;
			_self.docInfo.isAlert = _self.isSMS ? "1" : "0";
			_self.docInfo.alertTime = _self.cdate;
			_self.docInfo.currDate = _self.selectDay;
			_self.docInfo.endTime = _self.selectDay + " " + _self.docInfo.endTime.split(" ")[1];
			_self.docInfo.startTime = _self.selectDay + " " + _self.docInfo.startTime.split(" ")[1];
			ajaxRequst(_url,'post','application/json;charset=UTF-8','json',JSON.stringify(_self.docInfo)).then(function(json){
				console.log(json);
				toast("保存成功!",3000);
				//closePage("location.reload();");
				closePage("vleaderDate.selTheDay(vleaderDate.selday)");
			});

		},
		changeLeader:function(item){
			this.selLeader = item;
			this.$nextTick(function(){
				this.showLeader = false;
				this.getDocInfor(item.userNo,item.orgNo);
			});
		},
		
	}
});	
addvisibListener();
