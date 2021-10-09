
let moduleTypes = [ //财务报销模块的类型
	"travel_expense",
	"other_expense",
	"labor_union_expense",
	"party_union_expense",
	"contract_approve",
	"purchase_notice",
	"purchase_result",
	"meeting_pay_issued",
	"official_reception",
	"project_planning_service",
	"union_activities",
	"goods_purchase"
];
var docInfor = toArr(App.LS.get("docInfor"));
window.relativePage = new Vue({
    el: '#relativePage',
    data() {
        return {
			value: '',
			item:{offset:0,limit:15,data:{},loading:false,refreshing:false,finished:true,count:0},
			scrollHeight:'',
			relDocList:toArr(App.LS.get("relDocList")) || toArr(docInfor.relDocList) || [],
			isEdit: (moduleTypes.includes(App.LS.get("module")) && App.LS.get("flowStatus") == "running") ||  App.LS.get("flowStatus") == "wait"
		 };
    },
   created: function () {	
		fontSizeSet.initFontSize();	
		this.backListening();
		dd.ready(function(){
			dd.setTitle({title : '关联'});			
		})
		this.getListData('refreshing');
		//console.log(App.LS.get("moduleName"));
		//wispApp.UI.showProgressDialog("正在加载页面数据...");
		//renderMark("body",{waterMark:App.LS.get("LastName")});//加上水印
	},
	mounted:function(){
		this.scrollHeight = document.body.clientHeight  -$(".form").height();
	},
	methods:{
		onSearch(val) {
			//this.item.finished=false;
			this.onRefresh();				
		  },		
		onRefresh : function(obj){ //下拉刷新
			console.log("refreshing");	
			this.getListData('refreshing');
		},
		onLoad : function(){//上拉加载	
			console.log("onload")	
			this.getListData('loading');
		},
		isRelatived(id){//是否已关联
			let relativedRelDocList = this.relDocList.filter(rel => rel.docId == id);
			if(relativedRelDocList.length == 0){
				return false;
			}else{
				return true;
			}
		},
		
		cancelRe:function(file){
			var _self=this;
			_self.relDocList.forEach((item,i) => {
				if(item.docId == file.id){
					_self.relDocList.splice(i,1);
					console.log(_self.relDocList);
				}
			})
		},
		addRe:function(file){
			var _self=this;
			_self.relDocList.push({docId:file.id,moduleId: file.S_businessNo,moduleDes:file.S_moduleDes,businessName:file.S_businessName,docMack:file.S_docMark,subject:file.C_subject.replace(/<[^>]+>/g,"")});
		},
		backListening(){ //返回监听
			let _self = this;
			let _url = ZjgyHost + ZjgyUrl["save-"+App.LS.get("module")];
			let viewType = App.LS.get('viewType');
			
			document.addEventListener('back', function(e) {
				docInfor.relDocList = JSON.stringify(_self.relDocList);
				if(viewType != "newDraft"){//新起草的话不用保存
					ajaxRequst(_url,'post','application/json;charset=UTF-8','json',JSON.stringify(docInfor)).then(function(json){
						// console.log(json);
						toast("保存成功！");
						closePage("location.reload();");
						// App.LS.set("docInfor",JSON.stringify(json));
					})
				}else{
					App.LS.set("relDocList",JSON.stringify(_self.relDocList));
					closePage("jbxx.updateRelDocList();");
				}
				
				e.preventDefault();
			})
		},
		getListData :function(para){
			let _self = this;
			if(this.value == ""){ 
				this.item.loading = false;
				this.item.refreshing = false;
				return false;
			}
			if(para=="refreshing")_self.item.offset=0;
			if(_self.item.data.total<=_self.item.offset && para=="loading"){
				console.info("没有更多");
				return false;
			}
			var _url=ZjgyHost + ZjgyUrl['getAllBySolr-' + App.LS.get("module")] + "?showAll=true&offset=" + _self.item.offset + "&limit=" + _self.item.limit + "&word=" + encodeURI(_self.value) ;
			//console.log(_self.value);
			var paras={
				addKeyWord:true,
				filter:null,
				firstOpen:true,
				limit:_self.item.limit,
				matchType:"default",
				offset:_self.item.offset,
				order:"default",
				q:_self.value,
				sourceType:"title",
				timeRange:"all",
				userinfo:{
					userNo: toArr(App.LS.get('userInfo')).userId, 
					sysNo: toArr(App.LS.get('userInfo')).systemNo
				}}
			ajaxRequst(_url,"get",'application/json;charset=UTF-8','json').then((result) => {	
				console.log(result);			
				
				if(_self.item.offset==0){
					_self.item.data=Object.assign({},result);
				}else{
					//_self.item.data = Object.assign(_self.item.data,result);
					_self.item.data.list = _self.item.data.list.concat(result.list);
				}	
				_self.item.offset=_self.item.offset+_self.item.limit;
				_self.item.finished=(result.total<_self.item.offset);
				_self.item.count=result.total;
				_self.item.loading = false;
				_self.item.refreshing = false;
				wispApp.UI.dismissProgressDialog();
			})		
		}
	}
});
addvisibListener();