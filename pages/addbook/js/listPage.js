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
			tabNum:1,
			addbookObj:[],//组织通讯录
			unitName:[],
			outerAddbookObj:[],//个人通讯录
			active:0,
			scrollHeight:'',
			indexList:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
		}
	},
	created: function () {	
		this.scrollHeight = document.body.clientHeight - 44;	
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
	methods:{
		openDoc : function(obj){			
			App.LS.set("listInfo",JSON.stringify(obj));
			if(obj.businessDocId){
				App.LS.set('viewType','todo');
				OpenWebView("pages/addbook/DetailPage.html",{title:"表单页"});
			}else {
				OpenWebView("pages/addbook/DetailPage.html",{title:"表单页"});
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
					_self.getListData('refreshing');
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
			var _type="get";
			console.log(_url);			
			ajaxRequst(_url,_type,'','json','').then((result) => {				
				item.data=result;
				//item.data.list = sortByKeyNum(item.data.list,"sortNo");
				if(item.type == "inner"){
					_self.addbookObj = [];
					$.each(item.data.list,function(i,lItem) { 
						_self.addbookObj.push({text:lItem.unitName,value:lItem.unitNo,childrens:[]});
					});
					_self.addbookObj = unique(_self.addbookObj,"value");
					$.each(item.data.list,function(i,lItem) { 
						$.each(_self.addbookObj,function(u,unit){
							if(lItem.unitNo == unit.value){
								unit.childrens.push(lItem);
							}
						});
					})
					$.each(_self.addbookObj,function(a,aobj){
						if(aobj.childrens.length != 0){ 
							aobj.badge = aobj.childrens.length;
						}
					})
				}else{
					_self.outerAddbookObj = [];
					$.each(_self.indexList,function(i,index) {
						//searchFirstLetter(lItem.realName,function(result){
							//console.log("字母："+ result);
							_self.outerAddbookObj.push({id:index,childrens:[]});
						//});
					});
					/*_self.outerAddbookObj = unique(_self.outerAddbookObj,"id");
					_self.outerAddbookObj = sortByKeyNum(_self.outerAddbookObj, "id");*/
					$.each(item.data.list,function(i,lItem) { 
						searchFirstLetter(lItem.realName,function(result){
							$.each(_self.outerAddbookObj,function(o,obj){
								if(result == obj.id){
									obj.childrens.push(lItem);
								}
							})	
						});
					})
				
				}
				item[para] = false;
				//item.count = result.total;
				//item.offset = item.offset+item.limit;	
				//item.finished=(result.total<item.offset);
				_self.tabData=Object.assign({},_self.tabData);
				wispApp.UI.dismissProgressDialog();
			})
		},
		call: function(detail){ //打电话
			dd.ready(function(){
				//alert(111)
				dd.showCallMenu({
					phoneNumber: detail.mobile,
					code: "+86"
				}).then(res => {
					// 调用成功时回调
					console.log(res);
				}).catch(err => {
					// 调用失败时回调
					alert(JSON.stringify(err));
					console.log(err);
				});
				
			})
		}
		
	}
});
function refreshList(){
	listPage.getListData('refreshing');
}

addvisibListener();

function unique(arrobj,para){//去重
	let obj = {};
	let arr = arrobj.reduce((cur,next) => {
		obj[next[para]] ? "" : obj[next[para]] = true && cur.push(next);
		return cur;
	},[]) //设置cur默认类型为数组，并且初始值为空的数组
	//console.log(arr);
	return arr;
 }
 function searchFirstLetter(word, callback) {//返回中文关键字的首字母
	if(!String.prototype.localeCompare) callback(null);
	let letters = "*abcdefghjklmnopqrstwxyz".split('');
	let zh = "阿八嚓哒妸发旮哈讥咔垃痳拏噢妑七呥扨它穵夕丫帀".split('');
	letters.forEach((letter, i) => {
	  if((!zh[i-1] || zh[i-1].localeCompare(word,"zh") <= 0) && word.localeCompare(zh[i],"zh") == -1) {
		callback(letter.toUpperCase());
	  }
	})
}
//按大小排序
function sortByKeyNum(array, key,sortType) { //sortType：desc,asc
	if($.isEmptyObject(array))return array;
    return array.sort(function(a, b) {   
		if(sortType && sortType == "desc"){
			return ((a[key] > b[key]) ? -1 : ((a[key] < b[key]) ? 1 : 0));
		} else{
			return ((a[key] < b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0));	
		}  
		
    });
}