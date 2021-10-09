

(function(owner) {
	owner.data = {
		today : new Date(),
		weekAll:"",//周数
		thisYear:"",//今天日期所在的年份
		thisWeek:"",//今天日期所在年份的周数
		userPicker:"",
		dbname:App.LS.get('SystemPath')+"/leadercalendar.nsf",
		userInfo:JSON.parse(App.LS.get("userInfo")),
		type:getUrlParam("moduleId")//user,leader,org
	}
	owner.init=function(){
		dd.ready(function(){
			dd.setTitle({title : App.LS.get("moduleName")});
		})
		dd.ready(function() {			
			dd.disablePullToRefresh();
			dd.disableWebviewBounce();	
		})
		$("title")[0].innerText=App.LS.get("moduleName");	
		
		$(".schedule-date-right .user").html("全部");
		$(".schedule-date-right .user").attr("title","");
		this.getWeek(this.data.today.getFullYear());
		this.data.thisYear=this.data.today.getFullYear();
		this.data.thisWeek=this.getWeekOfYear();
		this.change(this.data.thisYear,this.data.thisWeek);
		//console.log(moaDatabase);
		var _Day = ((this.data.today.getDay()==0)?6:(this.data.today.getDay()-1));
		$(".schedule-tab li").eq(_Day).addClass("active").siblings("li").removeClass("active");
		$(".schedule-ul").eq(_Day).show();
		if(this.data.type == "leader"){
			//$(".schedule-date-right").show();
			$(".schedule-date-right .title").text("人员：");
			this.data.userPicker = new mui.PopPicker();
			var userDatas = [{value: '',text: '全部'}];
			owner.ajax(ZjgyHost + ZjgyUrl[this.data.type + "-schedule"] + "&systemNo=" + this.data.userInfo.systemNo + '&startCurrDate=' + $(".schedule-tab li:first").data("date") + '&endCurrDate=' + $(".schedule-tab li:last").data("date") + '&offset=0&limit=1000',function(data){
				var data = data.list;
				$.each(data, function(index,value) {
					userDatas[index+1] = new Object;
					userDatas[index+1].value = value.userNo;
					userDatas[index+1].text = value.user;
				});
				selectWeek.data.userPicker.setData(userDatas);
			});
		}else if(this.data.type == "org"){
			//$(".schedule-date-right").show();
			$(".schedule-date-right .title").text("组织：");
			this.data.userPicker = new mui.PopPicker();
			var _self = this;
			var orgDatas = [];
			owner.ajax(ZjgyHost + ZjgyUrl[this.data.type + "-trees"] + "&systemNo=" + this.data.userInfo.systemNo,function(data){
				$.each(data, function(index,value) {
					if(value.treePid && value.treePid != ""){
						orgDatas[index-1] = new Object;
						orgDatas[index-1].value = value.treeId;
						orgDatas[index-1].text = value.treeName;
						if(_self.data.userInfo.orgNo == value.treeId)_self.data.userPicker.pickers[0].setSelectedIndex(index-1,value.treeName);//设置默认值得下标和内容。
					}
				});
				selectWeek.data.userPicker.setData(orgDatas);
			});
		}
		
		$(".selectDate-div .left").unbind().on("click",selectWeek.selectWeekClick('left'));
		$(".selectDate-div .right").unbind().on("click",selectWeek.selectWeekClick('right'));
		mui('.schedule-div.mui-scroll-wrapper').scroll();
		//console.log($(".schedule-tab .active").data("date"));
		this.listShow($(".schedule-tab .active").data("date"));
		$(".schedule-tab li").unbind().on("click",function(){
			$(".schedule-ul").hide();
			$(this).addClass("active").siblings("li").removeClass("active");
			$(".schedule-ul").eq($(this).index()).show();
			//selectWeek.listShow($(".schedule-tab .active").data("date"),($(".schedule-date-right .user").attr("title")||""));
		});
	}
	owner.listShow=function(date,name){
		//console.log(date);console.log(name);
		var _this=this;
		$('.schedule-date-left .date').text($(".schedule-tab li:first").data("date") + " 至 " + $(".schedule-tab li:last").data("date"));
		///schedule/getScheduleWeek?systemNo=ZJSFGW&startCurrDate=2021-02-15&endCurrDate=2021-02-22&type=user&draftUserNo=U000379&offset=0&limit=15&sort=
		//this.ajax(basehost+moaDatabase+'getLeadercalendar?OpenAgent&Server='+App.LS.get('ServerName')+'&DbName='+selectWeek.data.dbname+'&strleader='+(name||"")+'&strdate='+date,function(data){
		var _url = ZjgyHost + ZjgyUrl[this.data.type + "-schedule"] + "&systemNo=" + this.data.userInfo.systemNo + '&startCurrDate=' + $(".schedule-tab li:first").data("date") + '&endCurrDate=' + $(".schedule-tab li:last").data("date") + '&offset=0&limit=15';
		if(this.data.type == "user"){
			_url += '&draftUserNo=' + _this.data.userInfo.username;
		}else if(this.data.type == "org"){
			_url += '&draftOrgNo=' + (name || _this.data.userInfo.orgNo);
		}
		this.ajax(_url,function(data){
			$(".schedule-ul").html("");
			var data = data.list;
			console.log(data.length);
			if(data.length==0){
				$(".schedule-ul").append("<li class=no><img src='../../img/empty_prompt.png' width='100%' height='50%' /></li>");
			}
			for(var i=0; i<7; i++){
				let times = 0;//当天没有日程的个数
				$.each(data, function(index,values) {
					if(_this.data.type == "user"){
						$(".schedule-date-right").find(".user").html(values.user);
					}else if(_this.data.type == "org"){
						$(".schedule-date-right").find(".user").html(values.org);
					}
					if(values["day" + (i+1)].length == 0 ){ 
						times++;
						if(times == data.length){
							$(".schedule-ul.day" + (i+1)).append("<li class=no><img src='../../img/empty_prompt.png' width='100%' height='50%' /></li>");
						}
					}
					$.each(values["day" + (i+1)],function(v,value) {
						$(".schedule-ul.day" + (i+1)).append("<li userno=" + value.draftUserNo + "><p class=name>"+_this.retrurnAm(value.startTime)+"<div class='meeting'><div >"+value.subject+"</div><div >"+value.draftUser+"</div><div class=bottom>"+value.startTime+"</div></div></li>");
					})
				});
			}
				
			/*$.each(data, function(index,value) {
				$(".schedule-ul").append("<li data-unid="+value.UNID+"><p class=name>"+_this.retrurnAm(value.StartDate)+"<div class='meeting'><div >"+value.Subject+"</div><div >"+value.UserName+"</div><div class=bottom>"+value.StartDate+"</div></div></li>");
			}); */
			$(".schedule-ul li").unbind().on("click",function(){
				App.LS.remove('Urlpara');
				App.LS.remove('DbName');
				App.LS.remove('UNID');
				var _server=unescape(App.LS.get('ServerName'));
				var _DbName=selectWeek.data.dbname;
				var _unid=$(this).data("unid")
				App.LS.set('Urlpara',`&Server=${_server}&DbName=${_DbName}&Unid=${_unid}`);
				App.LS.set('Server',_server);
				App.LS.set('DbName',_DbName);
				App.LS.set('UNID',_unid);
				App.LS.set('viewType',"infor");
				wispApp.H5plus.creatWebview(`./fileDetail.html`,'fileDetail','表单');
			// 	selectWeek.ajax(basehost+moaDatabase+'GetDocInfo?OpenAgent&Server='+unescape(App.LS.get('ServerName'))+'&DbName='+unescape(selectWeek.data.dbname)+'&UNID='+,function(data){
			// 		var data = JSON.parse(data).data;
			// 		console.log(data)
			// 		$('#page_select').html("");
			// 		$('#page_select').html('<div class=text3-text id=text3></div><footer class="bottom-3nav" id="3-footer"><div class="bottom-3nav-btn"><a class="bottom-3nav-box" onclick="indexRefresh();"><span class="iconfont icon-return"></span><p>返回</p></a></div></footer>')
			// 		$('#page_select .text3-text').append("<h2>"+data.Subject+"</h2>");
			// 		$('#page_select .text3-text').append(
			// 			'<ul>'+			
			// 			'<li><span>领　　导：</span>'+(data.Leaders||"无")+'&nbsp;</li>'+
			// 			'<li><span>活动类型：</span>'+(data.CalendarType||"无")+'&nbsp;</li>'+
			// 			'<li><span>参加人员：</span>'+(data.Attend||"无")+'&nbsp;</li>'+
			// 			'<li><span>起始日期：</span>'+(data.StartDate||"无")+'&nbsp;</li>'+
			// 			'<li><span>结束日期：</span>'+(data.EndDate||"无")+'&nbsp;</li>'+
			// 			'<li><span>活动主题：</span>'+(data.Subject||"无")+'&nbsp;</li>'+	
			// 			'<li><span>活动内容：</span>'+(data.Topic||"无")+'&nbsp;</li>'+
			// 			'<li><span>活动地点：</span>'+(data.Location||"无")+'&nbsp;</li>'+
			// 			'<li><span>备注说明：</span>'+(data.Comment||"无")+'&nbsp;</li>'+	
			// 			'</ul>');
			// 		$('#page_select').show();
			// 		pageHide();
			// 	})
			 })
		})
	}
	owner.selectWeek=function(){
		$('.selectDate-div ul').html('');
		$('.selectDate-div .year').text($('.schedule-date-left .year').text());
		var thisweek=$('.week').text();
		for(var i=1;i<(selectWeek.data.weekAll+1);i++){
			if(i==thisweek){
				var lis='<li class="selected"  onclick="selectWeek.weekClick(this)">'+i+'</li>';
			}else if($('.selectDate-div .year').text() == selectWeek.data.thisYear && i==selectWeek.data.thisWeek){
				var lis='<li class="a_week"  onclick="selectWeek.weekClick(this)">'+i+'</li>';
			}else if($('.selectDate-div .year').text() == selectWeek.data.thisYear && i>selectWeek.data.thisWeek){
				var lis='<li onclick="selectWeek.weekClick(this)" style="color:#999;">'+i+'</li>';
			}else if($('.selectDate-div .year').text() > selectWeek.data.thisYear){
				var lis='<li onclick="selectWeek.weekClick(this)" style="color:#999;">'+i+'</li>';
			}else{
				var lis='<li onclick="selectWeek.weekClick(this)">'+i+'</li>';
			}
			$('.selectDate-div ul').append(lis);
		}
		$('.selectDate-div ul').append('<li onclick="selectWeek.benzhou()" style="color:#3296FA">本周</li>');
		$('.selectDate-div').show();
		$('.cover-div').show();
	};
	owner.selectWeekClick=function(type){
		var thisyear = parseInt($('.selectDate-div .year').text());
		if(type=='left'){
			$('.selectDate-div .year').text(thisyear-1);
		}else{
			$('.selectDate-div .year').text(thisyear+1);
		}
		this.getWeek(parseInt($('.selectDate-div .year').text()));//获取某年的周数
		$('.selectDate-div ul').html('');
		var thisweek=$('.schedule-date-left .week').text();
		var thisyear=$('.schedule-date-left .year').text();
		for(var i=1;i<(selectWeek.data.weekAll+1);i++){
			if($('.selectDate-div .year').text() == thisyear && i==thisweek){
				var lis='<li class="selected" onclick="selectWeek.weekClick(this)">'+i+'</li>';
			}else if($('.selectDate-div .year').text() == selectWeek.data.thisYear && i>selectWeek.data.thisWeek){
				var lis='<li onclick="selectWeek.weekClick(this)" style="color:#999;">'+i+'</li>';
			}else if($('.selectDate-div .year').text() > selectWeek.data.thisYear){
				var lis='<li onclick="selectWeek.weekClick(this)" style="color:#999;">'+i+'</li>';
			}else{
				if($('.selectDate-div .year').text() == selectWeek.data.thisYear && i==selectWeek.data.thisWeek){
					var lis='<li onclick="selectWeek.weekClick(this)" class="a_week">'+i+'</li>';
				}else{
					var lis='<li onclick="selectWeek.weekClick(this)">'+i+'</li>';
				}
			}
			$('.selectDate-div ul').append(lis);
		}
		$('.selectDate-div ul').append('<li onclick="selectWeek.benzhou()" style="color:#3296FA">本周</li>');
	}
	owner.getWeek=function(year){	
	    var d = new Date(year, 0, 1);	
	    while (d.getDay() != 1) {	
	        d.setDate(d.getDate() + 1);	
	    }	
	    var to = new Date(year + 1, 0, 1);	
	    var i = 1;
		weeks=[];
	    for (var from = d; from < to;) {
			var obj={
				index:i,
				year:year,
				startWeek:(from.getMonth() + 1) + "月" + from.getDate() + "日",
				startMonth:from.getMonth() + 1,
				startDate:from.getDate()
			};
	        from.setDate(from.getDate() + 6);	
	        if (from < to) {
				obj.endWeek=(from.getMonth() + 1) + "月" + from.getDate() + "日";
				obj.endMonth=from.getMonth() + 1;
				obj.endDate=from.getDate();
	            from.setDate(from.getDate() + 1);
	
	        } else {
	            to.setDate(to.getDate() - 1);
				obj.endWeek=(to.getMonth() + 1) + "月" + to.getDate() + "日";
				obj.endMonth=to.getMonth() + 1;
				obj.endDate=to.getDate();
	        }
			weeks.push(obj);
	        i++;
	    }
	    selectWeek.data.weekAll = i-1;
	}
	owner.getWeekOfYear=function(){
		  var today = new Date();
		  var firstDay = new Date(today.getFullYear(),0, 1);
		  var dayOfWeek = firstDay.getDay(); 
		  var spendDay= 1;
		  if (dayOfWeek !=0) {
		    spendDay=7-dayOfWeek+1;
		  }
		  firstDay = new Date(today.getFullYear(),0, 1+spendDay);
		  var d =Math.ceil((today.valueOf()- firstDay.valueOf())/ 86400000);
		  var result =Math.ceil(d/7);
		  return result+1;
	}
	owner.addweek=function(type){
		var thisWeek=parseInt($('.schedule-date-left .week').text());
		if(type=='left'){
			if(thisWeek==1){
				selectWeek.getWeek(parseInt($('.schedule-date-left .year').text())-1);//获取某年的周数
				this.change(parseInt($('.schedule-date-left .year').text())-1,selectWeek.data.weekAll);
			}else{
				this.change("",thisWeek-1);
			}
		}else{
			if(thisWeek==selectWeek.data.weekAll){
				this.change(parseInt($('.schedule-date-left .year').text())+1,1);
				selectWeek.getWeek(parseInt($('.schedule-date-left .year').text())+1);//获取某年的周数
			}else{
				this.change("",thisWeek+1);
			}
		}
	}
	owner.openClick=function(type){
		var _active = $(".schedule-tab li.active").index();
		var thisWeek=parseInt($('.schedule-date-left .week').text());
		console.log(_active);
		if(type=='left'){
			if(_active==0){
				if(thisWeek==1){
					selectWeek.getWeek(parseInt($('.schedule-date-left .year').text())-1);//获取某年的周数
					this.change(parseInt($('.schedule-date-left .year').text())-1,selectWeek.data.weekAll,true);
				}else{
					this.change("",thisWeek-1,true);
				}
			}else{
				$(".schedule-tab li").eq(_active-1).trigger("click");
			}
		}else{
			if(_active==6){
				if(thisWeek==selectWeek.data.weekAll){
					this.change(parseInt($('.schedule-date-left .year').text())+1,1);
					selectWeek.getWeek(parseInt($('.schedule-date-left .year').text())+1);//获取某年的周数
				}else{
					this.change("",thisWeek+1);
				}
			}else{
				$(".schedule-tab li").eq(_active+1).trigger("click");
			}
		}
	}
	owner.weekClick=function(el){
		$('.selectDate-div .selected').removeClass('thisweek_active');
		$(el).addClass('selected');
		var myweek=parseInt($(el).text());
		this.change($('.selectDate-div .year').text(),myweek);
		this.over();
	}
	owner.benzhou=function(){
		this.getWeek(this.data.thisYear);//获取当年的周数
		this.change(this.data.thisYear,this.data.thisWeek);
		this.over();
	}
	owner.change = function(year,week,type) {
		console.log("change");
		year && $('.schedule-date-left .year').text(year);
		week && $('.schedule-date-left .week').text(week);
		var _dates = this.returnDate($('.schedule-date-left .year').text(),$('.schedule-date-left .week').text());
		$(".schedule-tab li").each(function(index){
			$(this).data("date",_dates[index]);
			$(this).find(".date").text($(this).data("date").substring(5,$(this).data("date").length));
		});
		if(type){
			//$(".schedule-tab li:last").trigger("click");
			this.listShow($(".schedule-tab li:last").data("date"));
		}else{
			//$(".schedule-tab li:first").trigger("click");
			this.listShow($(".schedule-tab li:first").data("date"))
		}
	}
	owner.retrurnAm=function(str){
		str = str.replace(/-/g,"/");//ios和safari不支持“YYYY-MM-DD”的时间格式，会显示invalid Date
		var hour=Number(new Date(str).Format('hh'));
		if (hour >=12) {
			return "下午"
		} else{
			return "上午"	
		}
		
	}
	owner.returnDate = function(year, index) {
		year = parseInt(year);
		index= parseInt(index);
		var d = new Date(year, 0, 1);
		while (d.getDay() != 1) {
			d.setDate(d.getDate() - 1);
		}
		var to = new Date(year + 1, 0, 1);
		var arr = [];		
		d.setDate(d.getDate() + (7*(index-1)));//7天则为1周,得出第index周的第一天
		var j = 7;
		while (j > 0) {						
			var _Month = (((d.getMonth() + 1)<10)?("0"+(d.getMonth() + 1)):(d.getMonth() + 1));
			var _Date = ((d.getDate()<10)?("0"+d.getDate()):d.getDate());
			arr.push(d.getFullYear() + "-" + _Month + "-" + _Date);
			d.setDate(d.getDate() + 1);
			j--;
			if(j===0)return arr;
		}
    }
	owner.userFun=function(obj){
		var _this = $(obj);
		var _self = this;
		this.data.userPicker.show(function(items) {
			//console.log(items);
			_this.find(".user").html(items[0].text);
			//console.log(items[0].value);
			_this.find(".user").attr("title",items[0].value);
			if(_self.data.type == "org"){
				//_url += '&draftOrgNo=' +  _this.data.userInfo.orgNo;
				selectWeek.listShow($(".schedule-tab .active").data("date"),($(".schedule-date-right .user").attr("title")||""));
			}else{
				$.each($(".schedule-ul li"),function (i,li) {
					if(items[0].value != "" && $(li).attr("userno") != undefined && items[0].value != $(li).attr("userno")){
						$(li).hide();
					}else{
						$(li).show();
					}
				});
			}
			
			//selectWeek.listShow($(".schedule-tab .active").data("date"),($(".schedule-date-right .user").attr("title")||""));
		});
	}
	owner.over=function(){
		$(".cover-div,.selectDate-div").hide();
	}
	owner.ajax=function(url,callback){
		console.log(url);
		$.get(url,function(data){
			callback(data);
		})
	}
}(window.selectWeek = {}));
selectWeek.init();