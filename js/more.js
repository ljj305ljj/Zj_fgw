// 初始化vConsole
// if (/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
// 	window.vConsole = new window.VConsole({
// 		defaultPlugins: ['system', 'network', 'element', 'storage'], // 可以在此设定要默认加载的面板
// 		maxLogNumber: 1000,
// 		// disableLogScrolling: true,
// 		onReady: function () {
// 			console.log('vConsole is ready.');
// 		},
// 		onClearLog: function () {
// 			console.log('on clearLog');
// 		}
// 	});
// }

var more = new Vue({
	el: '#More',
	data() {
		return {
			showError: false,
			indexTabData: indexTabData,
			moudleInfo: moudleInfo,//模块基本信息
			moduleNums: [],//模块条数
			
			tabData: moudleInfo[0],
			tabActive: 0,
			moduleId: "",
			tabNum: moudleInfo[0].view.length,
			scrollHeight: "",
			showModalId: "",
			modalNum: { id: "", dates: [] },
			EchartsArray: {},
			userInfo: {},
		}
	},
	created: function () {
		fontSizeSet.initFontSize();	
		//this.initHomePage();
	},
	mounted: function () {
		this.scrollHeight = document.body.clientHeight - $(".indexBottom").height();
	},
	methods: {
		goList(obj,i,j) {
			let _this = this;
			if(obj.childre){
				if(_this.showModalId==obj.id){
					_this.showModalId = "";
					_this.modalNum = {id:"",datas:[]};
				}else{
					_this.showModalId=obj.id;
					_this.modalNum = {id:i+'-'+parseInt(j/4),datas:obj.childre};
				}
			}else{
				if(obj.url==""){
					toast("正在开发中...");
					return false;
				}
				App.LS.set("moduleName",obj.title);
				OpenWebView(obj.url);
			}
		}
	}
});

addvisibListener();


