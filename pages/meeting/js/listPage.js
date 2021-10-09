//tree 组件用于综合审批部门表单选择；
Vue.component('tree',{
	props: ['item'],
	template:
			`<template v-if="typeof(item.data.child)=='undefined'">
			<li v-if="item.data.businessPublicStatus=='public'" class="tabBody-li" @click="listPage.openDoc(item.data,item.type)">
				<div class="word-title">{{item.data.businessName}}</div>
				<div class="word-bottom">
					<!--<p v-show='item.data.handbookAttList.length>0' class="rjicon icon-guide" @click.stop="listPage.download(item.data)">指南</p>
					<p v-show='item.data.resourceAttList.length>0' class="rjicon icon-download"  @click.stop="listPage.download(item.data,'attach')">资料下载</p>-->
					<p  class="rjicon icon-addcollect" @click.stop="listPage.colOperat(item.data.businessNo,'add')" >添加常用</p>
				</div>
			</li>
			</template>
			<template v-else>
			<li class="tabBody-li"  :index="item.key">
						<label :class="{'tree-act':(item.lever==0  && item.key==0),'dept-lab':typeof(item.data.child)!='undefined','people-lab':typeof(item.data.child)=='undefined'}"  @click="typeof(item.data.child)!='undefined'?freedeptEvent($event):''"><b v-if="typeof(item.data.child)!='undefined'"  class="rjicon icon-addup"> </b>{{item.data.orgName?item.data.orgName:item.data.businessName}}</label>
						<ul v-if="typeof(item.data.child)!='undefined'"  class="tree-dept box-dept">
							<tree :item='{data:item.data.child,key:0,lever:(item.lever+1)}'>
							</tree>
						</ul>
					</li>
			</template>
			`,
	methods:{
		freedeptEvent:function(_this){
			if($(_this.currentTarget).hasClass("tree-act")){
				$(_this.currentTarget).find("b").attr("class","rjicon icon-addup");
				$(_this.currentTarget).removeClass("tree-act");
			}else{
				$(_this.currentTarget).find("b").attr("class","rjicon icon-subup");
				$(_this.currentTarget).addClass("tree-act");
			}
		},
		openFile:function(item){
			
		},
	}
})
window.listPage=new Vue({
	el: '#ListData',
	data(){
		return{
			tabData:{},
			tabActive:0,
			moduleId:"",
			tabNum:1
		}
	},
	created: function () {		
		wispApp.UI.showProgressDialog("正在加载页面数据...");
		fontSizeSet.initFontSize();	
		var _self=this;		
		_self.moduleId=getUrlParam("moduleId");
		_self.getModuleInfor(this.moduleId);
		$("title")[0].innerText=App.LS.get("moduleName");	
		dd.ready(function(){
			dd.setTitle({title : App.LS.get("moduleName")});
		})
		dd.ready(function() {			
			dd.disablePullToRefresh();
			dd.disableWebviewBounce();	
		})
	},
	mounted() {
		this.scrollHeight = document.body.clientHeight - 44;
    },
	methods:{
		openDoc : function(obj){			
			App.LS.set("listInfo",JSON.stringify(obj));
			if(obj.businessDocId){
				App.LS.set('viewType','todo');
				OpenWebView("pages/meeting/DetailPage.html",{title:"表单页"});
			}else {
				OpenWebView("pages/meeting/DetailPage.html",{title:"表单页"});
			}			
		},
		onRefresh : function(obj){ //下拉刷新
			this.getListData('refreshing');
		},
		onLoad : function(){//上拉加载
			console.info("加载更多");
			this.getListData('loading');
		},
		getModuleInfor : function(moduleId){
			var _self=this;
			$.each(moudleInfo,function(i,item){
				if(item.id==moduleId){					
					_self.tabData=Object.assign({},item)
					_self.tabNum=item.view.length;
					//_self.getListData();
					return false;
				}
			})
		},
		getListData :function(para,viewIndex){
			var _self = this;
			var item = _self.tabData.view[typeof(viewIndex)!='undefined'?viewIndex:_self.tabActive];
			//console.log(item);
			if(para=="refreshing")item.offset=0;
			if(item.data.total<=item.offset && para=="loading"){
				console.info("没有更多");
				return false;
			}
			wispApp.UI.showProgressDialog("正在加载列表...");					
			var _url=ZjgyHost + ZjgyUrl[item.url]+(item.paras!=""?item.paras+"&":"?")+"offset="+item.offset+"&limit="+item.limit;
			if(item.url == "ZTHY_finish" || item.url == "WBHY_finish" || item.url == "DXHY_finish"){
				_url += "&passReaderStr="+eval("("+App.LS.get('userInfo')+")").username + "&queryStartDate=" + new Date().getFullYear() + "-01-01" + "&queryEndDate=" + (new Date().getFullYear() + 1) + "-01-01";
			}else if(item.url == "urgerClient_rwgl"){
				//_url += "&draftUserNo="+eval("("+App.LS.get('userInfo')+")").username;
			}
			var _type="get";
			console.log(_url);			
			ajaxRequst(_url,_type,'','json','').then((result) => {	
				if(item.url == "ZTHY_finish" || item.url == "DXHY_finish"){//会议
					$.each(result.list,function(r,res){
						res.businessNo = "meeting";
					});
				}else if(item.url == "WBHY_finish"){
					$.each(result.list,function(r,res){
						res.businessNo = "meeting_external";
					});
				}			
				if(item.offset==0){
					item.data=result;
				}else{
					// item.data = Object.assign(item.data,result);
					item.data.list = item.data.list.concat(result.list);
				}
				item[para] = false;
				item.count = result.total;
				item.offset = item.offset+item.limit;	
				item.finished=(result.total<item.offset);
				setTimeout(()=>{
                    if(item.finished){
                        if($("#"+item.id).height() < _self.scrollHeight){
                            $("#"+item.id).height(_self.scrollHeight);
                        }else{
							$("#"+item.id).height("auto");
						}
                    }
                },1000)
				_self.tabData=Object.assign({},_self.tabData);
				wispApp.UI.dismissProgressDialog();
			})
		}
		
	}
});
function refreshList(){
	listPage.getListData('refreshing');
}
addvisibListener();