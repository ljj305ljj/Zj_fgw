//初始化vConsole
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
var vleaderDate = new Vue({
	el: '#Schedule',
	data() {
		return {
			showWeekTit: true,//是否展开
			selLeader:false,//是否选领导（全委为true）
			isSelDept: false,//是否选部门
			selday: {},//选中的那一天
			today: {},//今天
			theMath: {},//当前月份
			selMath: [],//选中的月份
			miniMath: {},//选中的那周
			selDayList: [],//选中的那一天的日程表（只包含有日程的）
			UserAuthList:[],//选中那一天的所有有编辑权限的人员日程表（包含无日程的）
			userInfo: JSON.parse(App.LS.get("userInfo")),
			type: getUrlParam("moduleId"),
			deptTree: [],
			selDept: {},//选中的部门
			userAuth:{},//用户日程权限
			leaderList:[],//领导列表
			selectLeader:{}//选中的领导
		}
	},
	mounted: function () {
		fontSizeSet.initFontSize();	
		this.initHomePage();
		this.getCurrUserAuth();
		if(this.type == "org"){
			this.getSelTree();
		}
		dd.ready(function() {	
			dd.setTitle({title : App.LS.get("moduleName")});		
			dd.disablePullToRefresh();
			dd.disableWebviewBounce();	
		})
	},
	methods: {
		initHomePage: function () {
			/* 初始化页面 */
			console.log("Schedule.js");
			let Ctime = (new Date()).Format("yyyy-MM-dd").split("-");
			let Y = parseInt(Ctime[0]), M = parseInt(Ctime[1]), D = parseInt(Ctime[2]);
			this.selday = { year: Y, math: M, day: D };
			this.today = { year: Y, math: M, day: D };
			this.fullMath(Y, M);
			this.$nextTick(function(){
				this.getSelDayList(true);
			});
			
		},
		fullMath: function(y, m){
			/*展示的月份表*/
			var that = this;
			let fristWeek = DateWeek.getDayWeek(y, m, 1);
			let allDay = DateWeek.getMathNums(y, m);
			let minWeek = DateWeek.getDayWeek(that.selday.year, that.selday.math, that.selday.day);
			minWeek = minWeek==0?7:minWeek
			let days = [];
			let today = false;
			let selday = false;
			let oneDays = [];
			if(that.today.year == y && that.today.math == m){
				today = that.today.day;
			}
			if(that.selday.year == y && that.selday.math == m){
				selday = that.selday.day;
			}
			for(let I = 0; I < fristWeek-1; I++){
				days.push("");
			}
			for(let J = 0; J < allDay; J++){
				let lunars = LunarDate.Lunar(y, m-1, J+1);
				let pushday = { year:y, math:m, day:J+1, lunar:lunars.day};
				if(today && today == J+1){
					pushday.today = true;
				}
				if(selday && selday == J+1){
					pushday.selday = true;
				}
				days.push(pushday);
				if(selday && J>=(selday-minWeek) && J<(selday-minWeek+7)){
					oneDays.push(pushday);
				}
			}
			if(selday){that.miniMath = { "year": y,"math":m ,"days":oneDays };}
			that.theMath = { "year": y,"math":m ,"days":days };
			that.$nextTick(function(){
				ScrollObj.initScroll({
					selector: "#swiper-math",
					pullleft: function(selector,moveNum){
						that.preMath();
					},
					pullright: function(selector,moveNum){
						that.nextMath();
					}
				});
			});
		},
		nextMath: function(){
			/*下个月*/
			var Y = parseInt(this.theMath.year), M = this.theMath.math;
			if(M==12){
				M = 1;Y = Y+1;
			}else{
				M = M+1;
			}
			this.fullMath(Y, M);
		},
		preMath: function(){
			/*上个月*/
			var Y = parseInt(this.theMath.year), M = this.theMath.math;
			if(M==1){
				M = 12;Y = Y-1;
			}else{
				M = M-1;
			}
			this.fullMath(Y, M);
		},
		selTheDay: function(item){
			/* 选择某天后更新数据 */
			// console.info(item)
			if(item==""){return false;}
			this.selday = item;
			this.fullMath(item.year, item.math);
			this.$nextTick(function(){
				this.getSelDayList();
			});
		},
		getSelDayList: function(isInit){//isInit=true 初始化
			var that = this;
			let backList = [];
			let weekNum = DateWeek.getWeekNums(that.selday.year, that.selday.math, that.selday.day);
			let starEnd = DateWeek.getYearWeek(that.selday.year+"-"+weekNum);
			let minWeek = DateWeek.getDayWeek(that.selday.year, that.selday.math, that.selday.day);
			minWeek = minWeek==0?7:minWeek;
			let _url = ZjgyHost + ZjgyUrl[that.type + "-schedule"] +"&systemNo="+ that.userInfo.systemNo +"&startCurrDate="+ starEnd[0] +"&endCurrDate="+ starEnd[1] +"&offset=0&limit=100";
			if(this.type == "user"){
				_url += '&draftUserNo=' + that.userInfo.username;
			}else if(this.type == "org"){
				_url += '&draftOrgNo=' + (that.selDept.orgNo?that.selDept.orgNo:"D00002");//默认显示委领导
			}
			ajaxRequst(_url,'GET','application/x-www-form-urlencoded','json',{}).then(function(json){
				if(that.type == "leader"){
					that.leaderList.push({user:"全部",userNo:"全部"});
					$.each(json.list,function(i,obj){ 
						that.leaderList.push({user:obj.user,userNo:obj.userNo});
						if(isInit && obj.userNo == that.userInfo.username){
							that.selectLeader = obj;
						}
					})
					if(!that.selectLeader.user){
						that.selectLeader = that.leaderList[0];
					}
				}
				that.UserAuthList = [];
				$.each(json.list,function(i,obj){
					if(obj["day"+minWeek].length>0){
						let objday = obj["day"+minWeek];
						if(that.type == "leader"){
							if(that.selectLeader.userNo == obj.userNo || that.selectLeader.userNo == "全部"){
								backList.push(objday[0]);
							}
						}else{
							backList.push(objday[0]);
						}
						//backList.push(objday[0]);
					}
					if(that.isEdit(obj.userNo)){
						that.UserAuthList.push(obj);
					}
				});
				that.selDayList = backList;
				App.LS.set("UserAuthList",JSON.stringify(that.UserAuthList));
				
				console.info(that.UserAuthList);
			})
		},
		getSelTree: function(){
			var that = this;
			let deptList = [];
			let _url = ZjgyHost + ZjgyUrl[that.type + "-trees"] +"?systemNo="+ that.userInfo.systemNo;
			ajaxRequst(_url,'GET','application/x-www-form-urlencoded','json',{}).then(function(deptTree){
				that.deptTree = deptTree.filter(dept => dept.shortName != "未分类" && dept.shortName != "系统管理部门");
				that.selDept = that.deptTree[0];
				
			})
		},
		changeDept: function(item){
			this.selDept = item;
			this.$nextTick(function(){
				this.isSelDept = false;
				this.getSelDayList();
			});
		},
		changeLeader: function(item){
			this.selectLeader = item;
			this.$nextTick(function(){
				this.selLeader = false;
				this.getSelDayList();
			});
		},
		cutTime : function(times){
			try {
				let len = times.indexOf(" ");
				return times.substring(len+1);
			} catch (error) {
				return times;
			}
		},
		getCurrUserAuth : function(){ //获取当前用户日程权限
			let _this = this;
			let _url = ZjgyHost + ZjgyUrl["getAuth-schedule"];
			ajaxRequst(_url,'GET','application/x-www-form-urlencoded','json',{}).then(function(json){
				_this.userAuth = json;
			});
		},
		isEdit : function(userNo){//是否有编辑日程权限
			if(userNo == this.userInfo.username){//本人
				return true;
			}
			if($.inArray(userNo,this.userAuth.leaderNoList) > -1){//代理人
				return true;
			}
			if(this.userAuth.identity == "manager"){//管理员
				return true;
			}
			return false;
		},
		newSchedule : function(){//新增日程
			let selweek = DateWeek.getDayWeek(this.selday.year,this.selday.math,this.selday.day,true);
			let selectDay = this.selday.year+"-"+this.selday.math + "-" + this.selday.day;
			OpenWebView("pages/schedule/DetailSchedulePage.html?type=" + this.type + "&selectDay=" + selectDay ,{title:"新建日程",selweek:selweek});
		},
		openSchedule : function(item){//打开日程详情
			if(!this.isEdit(item.draftUserNo)){
				toast("你没有权限编辑");
				return false;
			}
			let selweekArray = item.currDate.split("-");
			let selweek = DateWeek.getDayWeek(selweekArray[0],selweekArray[1],selweekArray[2],true);
			//let selectDay = this.selday.year+"-"+this.selday.math + "-" + this.selday.day;
			OpenWebView("pages/schedule/DetailSchedulePage.html?type=" + this.type + "&selectDay=" + item.currDate + "&draftUserNo=" + item.draftUserNo + "&draftOrgNo=" + item.draftOrgNo,{title:"新建日程",selweek:selweek});
		}
	}
});

addvisibListener();


