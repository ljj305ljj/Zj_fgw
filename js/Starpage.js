var wispApp = wispApp || new WispApp();
var loadflag = true;
var dialog = null;
function plusReady(){
	//UserDiy.initDiy();
	wispApp.UI.titleClass("收藏",DiyInfo.color);
	vStar.initStar();
	try{
		plus.key.addEventListener('backbutton',function(){
			closePage();
		},false);
	}catch(e){}
}
function closePage(back){
	if(back){wispApp.UI.BackAndCollback(back);}else{wispApp.UI.BackPrePage();}
}
var vStar=new Vue({
	el: '#Star',
	data(){
		return{
			tabActive:0,
			tabData:[],
			selectList:[]
		}
	},
	created(){
		fontSizeSet.initFontSize();
		this.initStar();
		$("title")[0].innerText="关注文件";	
		dd.ready(function(){
			dd.setTitle({title : "关注文件"});
		})
		dd.ready(function() {			
			dd.disablePullToRefresh();
			dd.disableWebviewBounce();	
		})
	},
	mounted:function(){},
	methods:{
		initStar:function(){
			var _this = this;
			var _url = ZjgyHost + ZjgyUrl["collectListFolder"] + "?type=all";
			App.AJ.ajax({
				"type": "get",
			    "url": _url,
			    "data": {},
			    "datatype": "json",
			    "contentType": 'application/json'
			}).then((result) => {
//				console.info(result)
				$.each(result,function(i,item){
					item.list = {url:"getCollectList",paras:"?folderId=" + item.id + "&systemNo=" + eval("("+App.LS.get('userInfo')+")").systemNo,start:0,count:20,total:1,data:{}};
				});
				result.push({subject:"所有分类",list:{url:"getCollectList",paras:"?folderId=&systemNo=" + eval("("+App.LS.get('userInfo')+")").systemNo,start:0,count:20,total:1,data:{}}});
				_this.tabData = result;
				_this.selectList = [];
				_this.initTab();
			});
		},
		initTab : function(){
			var _this = this;
			$.each(_this.tabData,function(i,item){
				_this.getListData(i);
			});
	    },
		getListData : function(index, refresh){
			wispApp.UI.showProgressDialog("数据加载中...");
			var _this = this;
			index = (index || index===0)?index:_this.tabActive;
			var item = _this.tabData[index].list;
			var include = [];
			item.start = refresh?0:item.start;
			if(item.total<=item.start && !refresh){
				wispApp.UI.dismissProgressDialog();
				console.info("没有更多了");
				return false;
			}
			var _url= NginxHost + getPartUrl(item.url) + item.paras +"&offset="+ item.start + "&limit="+ item.count;
			App.AJ.ajax({
				"type": "get",
			    "url": _url,
			    "data": {},
			    "datatype": "json",
			    "contentType": 'application/json'
			}).then((json) => {
				if(item.start==0 || refresh){
					_this.tabData[index].list.data=json.list;
					if(item.start==0 && !refresh){
						//只需要首次初始化即可
						_this.$nextTick(function(){
							ScrollObj.initScroll({
								selector: "#list" + index,
								pulldown: function(selector,moveNum){
									_this.getListData("",true);
								},
								pullup: function(selector,moveNum){
									_this.getListData();
								}
							});
						});
					}
				}else{
					var temp = _this.tabData[index].list.data;
					_this.tabData[index].list.data = temp.concat(json.list);
				}
			 	item.start = item.start + item.count;
			 	wispApp.UI.dismissProgressDialog();
			});
		},
		changeStar:function(i){
			if(this.tabActive==i){return false}
			this.tabActive = i;
			this.getListData(i);
			this.selectList = [];
		},
		addStarType:function(){
			var _this = this;
			App.UI('dialog', {
				type : 'confirmText',
				title: 'queren',
				OkTxt: '确认',
				CancelTxt: '取消',
				msg	 : ""
			},function(_action,backtext){
				if(_action==='OK'){
					if(backtext==""){return false;}
					var back = {id:"",sortNo:"",subject:backtext};
					var _url= NginxHost + getPartUrl("add-CollecType");
					App.AJ.ajax({
						"type": "post",
					    "url": _url,
					    "data": JSON.stringify(back),
					    "datatype": "json",
					    "contentType": 'application/json'
					}).then((json) => {
						_this.initStar();
						wispApp.UI.dismissProgressDialog();
					});
				}
			});	
		},
		chackBoxflag:function(doc){
			if($.inArray(doc.businessDocId,this.selectList)==-1){
				return false;
			}else{
				return true;
			}
		},
		onChekbox:function(e,doc){
			if($.inArray(doc.businessDocId,this.selectList)==-1){
				this.selectList.push(doc.businessDocId)
			}else{
				this.selectList.splice($.inArray(doc.businessDocId,this.selectList),1)
			}
			
		},
		moveTypeFlag:function(){
			var tempA = "";
			$.each(this.tabData, function(i,obj) {
				if(obj.subject != "所有分类"){
					tempA+='<li onclick="vStar.moveTypeTo('+i+')">'+obj.subject+'</li>';
				}
			});
			dialog = App.UI('dialog', {
				type : 'menulist',
				menulist: tempA,
				CancelTxt: '取消'
			});
		},
		moveTypeTo:function(i){
			try{dialog.remove();}catch(e){}
			wispApp.UI.showProgressDialog("数据移动中...");
			var _this = this;
			var selId = _this.tabData[i].subject;
			var backId = _this.selectList;
			var _url= NginxHost + getPartUrl("move-Collec") + "?businessType=" + selId;
			App.AJ.ajax({
				"type": "post",
			    "url": _url,
			    "data": JSON.stringify(backId),
			    "datatype": "json",
			    "contentType": 'application/json'
			}).then((json) => {
				_this.initStar();
				wispApp.UI.dismissProgressDialog();
			});
		},
		openDoc : function(obj){
			//wispApp.UI.showProgressDialog("正在请求文件...");
			App.LS.set("listInfo",JSON.stringify(obj));
			var openDetailUrl = "DetailPage.html";
			switch (obj.moduleId) {
				case "CAR_APPLY"://车辆管理
					detailPage = "pages/clgl/DetailPage.html";
					break;
				case "MEETING_BOOK":
				case "MEETING_ISSUE":
				case "MEETING":
				case "MEETING_OFFICE"://会议
				case "MEETING_EXTERNAL"://外部会议
					detailPage = "pages/meeting/DetailPage.html";
					break;
				case "URGERCLIENT"://督查督办
				case "MAJORURGER"://批示督办
					detailPage = "pages/urger/DetailPage.html";
					break;
				case "SPECIAL_WORK"://专班工作
					detailPage = "pages/zbgz/DetailPage.html";
					break;
				case "INFOREPORT": //上报管理
					detailPage = "pages/xxgl/DetailPage.html";
					break;
				case "INFO"://政务信息
					detailPage = "pages/zwxx/DetailPage.html";
					break;
				case "GOODS"://办公用品
				case "SUPPLIES"://办公耗材
					detailPage = "pages/goods/DetailPage.html";
					break;
				// case "SUPPLIES"://办公耗材
				// 	detailPage = "pages/supplies/DetailPage.html";
				// 	break;
				case "SCRAP"://资产报废
					detailPage = "pages/transfer/DetailPage.html";
					break;
				case "INFORMAL"://征求意见
					detailPage = "pages/informal/DetailPage.html";
					break;
				default:
					if(obj.urgerId){
						detailPage = "pages/urger/DetailPage.html";
					}
					break;

			}
			// if(DiyInfo.morePage){openDetailUrl = "DetailPage.html";}
			OpenWebView(openDetailUrl, { title: "表单页" });
		},
	}
});
