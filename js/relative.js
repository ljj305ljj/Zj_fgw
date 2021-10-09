
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
window.relativePage = new Vue({
    el: '#relativePage',
    data() {
        return {
			value: '',
			item:{offset:0,limit:15,data:{},loading:false,refreshing:false,finished:true,count:0},
			scrollHeight:'',
			otherAllDocMark:toArr(App.LS.get("docInfor")).otherAllDocMark || toArr(App.LS.get("docInfor")).relDocList,
			isEdit: (App.LS.get("stateBusiness") != "undefined" && App.LS.get("stateBusiness") != null && JSON.stringify(toArr(App.LS.get("stateBusiness")).businessHandle).indexOf("修改关联文件")>-1 && App.LS.get("flowStatus") == "running") || (moduleTypes.includes(App.LS.get("module")) && App.LS.get("flowStatus") == "running")
		 };
    },
   created: function () {	
		fontSizeSet.initFontSize();	
		var _self=this;
		dd.ready(function(){
			dd.setTitle({title : '关联'});			
		})
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
		cancelRe:function(file){
			var _self=this;
			var _url = ZjgyHost + ZjgyUrl["upadete-"+App.LS.get("module")];
			var obj =toArr(App.LS.get("docInfor"));
			var otherAllDocMark=toArr(obj.otherAllDocMark) || toArr(obj.relDocList);
			$.each(otherAllDocMark,function(i,item){
				if(item.docId==file.id){
					console.log(otherAllDocMark);
					otherAllDocMark.splice(i,1);
					console.log(otherAllDocMark);
					return false;
				}				
			})			
			console.log(otherAllDocMark);
			ajaxRequst(_url,'post','','json',JSON.stringify(obj)).then((json) => {
				_self.otherAllDocMark=JSON.stringify(otherAllDocMark);
				if(obj.otherAllDocMark){
					obj.otherAllDocMark = JSON.stringify(otherAllDocMark);
				}else if(obj.relDocList){
					obj.relDocList = JSON.stringify(otherAllDocMark);
				}
				console.log(obj.otherAllDocMark);
				App.LS.set("docInfor",JSON.stringify(obj));
				addCookie("callback", 'relativeCallback()', 7, "/");
			});
		},
		addRe:function(file){
			var _self=this;
			var _url = ZjgyHost + ZjgyUrl["upadete-"+App.LS.get("module")];
			var obj =toArr(App.LS.get("docInfor"));
			var otherAllDocMark=toArr(obj.otherAllDocMark) || toArr(obj.relDocList) || [];
			otherAllDocMark.push({docId:file.id,moduleId: file.S_businessNo,moduleDes:file.S_businessName,businessName:file.S_businessName,docMack:file.S_docMark,subject:file.C_subject.replace(/<[^>]+>/g,"")})
			//console.log(otherAllDocMark);
			if(obj.otherAllDocMark || App.LS.get("module") == "receival" || App.LS.get("module") == "dispatch"){//收发文的相关联文件
				obj.otherAllDocMark = JSON.stringify(otherAllDocMark);
			}else if(obj.relDocList || App.LS.get("module").indexOf("meeting") > -1){
				obj.relDocList = JSON.stringify(otherAllDocMark);
			}
			ajaxRequst(_url,'post','','json',JSON.stringify(obj)).then((json) => {
				_self.otherAllDocMark=JSON.stringify(otherAllDocMark);
				App.LS.set("docInfor",JSON.stringify(obj));
				addCookie("callback", 'relativeCallback()', 7, "/");
			});
		},
		getListData :function(para){
			let _self = this;
			if(this.value == ""){ 
				this.item.loading = false;
				this.item.refreshing = false;
				return false;
			}
			var _url=ZjgyHost + ZjgyUrl['search-url'];
			var _type="post";
			if(para=="refreshing")_self.item.offset=0;
			if(_self.item.data.total<=_self.item.offset && para=="loading"){
				console.info("没有更多");
				return false;
			}
			//console.log(_self.value);
			var paras={addKeyWord:true,filter:null,firstOpen:true,limit:_self.item.limit,matchType:"default",offset:_self.item.offset,order:"default",q:_self.value,sourceType:"title",timeRange:"all",userinfo:{userNo: toArr(App.LS.get('userInfo')).userId, sysNo: toArr(App.LS.get('userInfo')).systemNo}}
			ajaxRequst(_url,_type,'application/json;charset=UTF-8','json',JSON.stringify(paras)).then((result) => {	
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