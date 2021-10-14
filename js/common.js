var jgAuth={
	base: '/api',
    //金格授权码
    // copyRight: 'SxD/phFsuhBWZSmMVtSjKZmm/c/3zSMrkV2Bbj5tznSkEVZmTwJv0wwMmH/+p6wLiUHbjadYueX9v51H9GgnjUhmNW1xPkB++KQqSv/VKLDsR8V6RvNmv0xyTLOrQoGzAT81iKFYb1SZ/Zera1cjGwQSq79AcI/N/6DgBIfpnlwiEiP2am/4w4+38lfUELaNFry8HbpbpTqV4sqXN1WpeJ7CHHwcDBnMVj8djMthFaapMFm/i6swvGEQ2JoygFU38558QhLaX/Jr1koWwK15kEwlZt3sppt839y1vte3YDKVFihhgv7gZfkpfJMSm/MmYngL2kv2tNxddviuwBCLi6BI6KYwFlcBYnKg15z7MpVuZS0gUwX1/8P3iv7/SMU8ZyZT2umSeN/3tBNrXvDACvANk6qiXn/OBCU3QRIhmiAc/5/+UjdElADYFbJfzSv3/Hn3x/+Sr1EUVI4nLPB6z8tCvrboxvznvW9K4CSNvk29q6P0lp+QMvtZ8FsQQ1fAzNTOulVyP8KCTl7pA3dliR1ZgaHEdCsNQGBS7YpbvJb2KAbPgeMOV9VMsPsv9MDFzeCBkqp0V3QDJtH3vo+lHuHR8z0bXnNyxWpWpFFdE88=',
    copyRight: 'SxD/phFsuhBWZSmMVtSjKZmm/c/3zSMrkV2Bbj5tznSkEVZmTwJv0wwMmH/+p6wLiUHbjadYueX9v51H9GgnjUhmNW1xPkB++KQqSv/VKLDsR8V6RvNmv0xyTLOrQoGzAT81iKFYb1SZ/Zera1cjGwQSq79AcI/N/6DgBIfpnlwiEiP2am/4w4+38lfUELaNFry8HbpbpTqV4sqXN1WpeJ7CHHwcDBnMVj8djMthFaapMFm/i6swvGEQ2JoygFU3MLqfdggb/D24BVZAYtYNPgDmZtCX5uh1jzRYD+dvwPaVFihhgv7gZfkpfJMSm/MmYngL2kv2tNxddviuwBCLi6BI6KYwFlcBYnKg15z7MpURxqn7OINtot8w+O62sCtGZyZT2umSeN/3tBNrXvDACvANk6qiXn/OBCU3QRIhmiAc/5/+UjdElADYFbJfzSv3tZ1mvv9V0elKLYOqzl0iR8tCvrboxvznvW9K4CSNvk29q6P0lp+QMvtZ8FsQQ1fAzNTOulVyP8KCTl7pA3dliZzLpYkotk/oVHnj1o8SzgfWxxw/16+gMbwZLOwu+zg7zeCBkqp0V3QDJtH3vo+lHuHR8z0bXnNyxWpWpFFdE88='
};
var GradientObject = {
    "default":"background: linear-gradient(135deg, #00cbff,#0463ff);background: -webkit-linear-gradient(135deg, #00cbff,#0463ff);",
    //首页图标渐变
    "TODO":"background: linear-gradient(135deg, #ffe258,#ffac23);background: -webkit-linear-gradient(135deg, #ffe258,#ffac23);",
    "TOREAD":"background: linear-gradient(135deg, #ff8e81,#ff5c2e);background: -webkit-linear-gradient(135deg, #ff8e81,#ff5c2e);",
    "RECEIVAL":"background: linear-gradient(135deg, #00cbff,#0463ff);background: -webkit-linear-gradient(135deg, #00cbff,#0463ff);",
    "DISPATCH":"background: linear-gradient(135deg, #EC93FE,#C453FF);background: -webkit-linear-gradient(135deg, #EC93FE,#C453FF);",
    "INFORMAL":"background: linear-gradient(135deg, #a1e980,#20ca57);background: -webkit-linear-gradient(135deg, #a1e980,#20ca57);",
    "moreModule":"background: linear-gradient(135deg, #7ed9fe,#06aafa);background: -webkit-linear-gradient(135deg, #7ed9fe,#06aafa);",
    //设置页按钮渐变
    "refresh":"background: linear-gradient(270deg,#f4c216, #ff8e42);background: -webkit-linear-gradient(270deg,#f4c216, #ff8e42);",
    "reset":"background: linear-gradient(135deg,#00cbff, #0463ff);background: -webkit-linear-gradient(135deg,#00cbff, #0463ff);",
    "set":"background: linear-gradient(135deg,#a1e980, #20ca57);background: -webkit-linear-gradient(135deg,#a1e980, #20ca57);",
    "exit":"background: linear-gradient(135deg,#ff8e81, #ff5c2e);background: -webkit-linear-gradient(135deg,#ff8e81, #ff5c2e);",
    "gzt":"background: linear-gradient(135deg,#FF9900, #FF9900);background: -webkit-linear-gradient(135deg,#FF9900, #FF9900);",
    "fqsp":"background: linear-gradient(135deg,#0077FF, #0077FF);background: -webkit-linear-gradient(135deg,#0077FF, #0077FF);",
    //模块流程渐变
    //查看意见、查看流程颜色选取
};
//时间格式化
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//防止双击
function oneTap(obj,fn) {
	$(obj).addClass("noEvent");
	new Promise(function(resolve, reject){
		fn(resolve, reject);	
	}).then(function(data){
		$(obj).removeClass("noEvent");
	}).catch(function(data){
		console.log(data);
	});		
}
//按大小排序
function sortByKeyNum(array, key,sortType) { //sortType：desc,asc
	if($.isEmptyObject(array))return array;
    return array.sort(function(a, b) {   
		if(sortType && sortType == "asc"){
			return ((a[key] < b[key]) ? -1 : ((a[key] > b[key]) ? 1 : 0));
		} else{
			return ((a[key] > b[key]) ? -1 : ((a[key] < b[key]) ? 1 : 0));
		}  
		
    });
}
//排序时间按新到旧
function sortByKey(array, key) {
	if($.isEmptyObject(array))return array;
    return array.sort(function(a, b) {
        var x = filter(a[key].replace(/[:-\s]/g, ",").split(","));
        var y = filter(b[key].replace(/[:-\s]/g, ",").split(","));;
        ////console.log(x);
		return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}
function filter(array){
	 $.each(array,function(n,value){
         	if(value.length==1){
         		array[n]="0"+value;
         	}
      });
       return parseInt(array.join(""));
}

function GetGradient(name) {
    if(name!=undefined){
        return GradientObject[name]==undefined?GradientObject.default:GradientObject[name];
    }else{
        return GradientObject.default;
    }
}
function OpenWebView(url,para){
	//console.log(outerBasehost+"/rjmoaDD"+url);
	//window.open(outerBasehost+"/rjmoaDD"+url);
	//return false;
	//alert(JSON.stringify(para));
	if(para)App.LS.set('flowParam',JSON.stringify(para));
	var _name=url.substr(0,url.indexOf("."));
	// if(url.indexOf("DetailPage.html")>-1){
	// 	url=url+"?dd_orientation=auto&v="+loadVersion.getVersion(_name);
	// }else{
		url=url+((url.indexOf('?')>-1)?"&":"?")+"v="+loadVersion.getVersion(_name);
	// }
	console.log(filePath+url);
	if(!/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)){
		//window.location.href=filePath+url;
	}else{
		console.info(url);
		dd.ready(function() {
			console.info("ready");
			dd.openLink({
				url: filePath+url
			}).then(res => {
				if(para && para.title) {$("title").text(para.title); }
			}).catch(err => {
				console.info(err);
			})
			/*dd.openLink({
				url:filePath+url,//要打开链接的地址
				onSuccess : function(result) {
					console.info(result)
					$("title").text(para.title);
				},
				onFail : function(err) {
					console.info(err)
				}
			})*/
		})
	}
		
}
function relativeCallback(){
	if(FileList){
		if(App.LS.get("docInfor").indexOf("otherAllDocMark") > -1){
			FileList.otherAllDocMark=toArr(toArr(App.LS.get("docInfor")).otherAllDocMark);
		}
		if(App.LS.get("docInfor").indexOf("relDocList") > -1){
			FileList.relDocList=toArr(toArr(App.LS.get("docInfor")).relDocList);
		}
	};
}

function ListInfoCallback(){
	App.LS.set("listInfo",App.LS.get("preListInfo"));
	location.reload();
	//App.LS.set("docInfor",App.LS.get("preDocInfor"));
}

function goBack(callback){
	dd.biz.navigation.goBack({
		onSuccess : function(result) {
			//indexRefresh(1);//执行成功,刷新视图
			//toast("成功");
			if(callback){addCookie("callback", callback, 7, "/");}
		},
		onFail : function(err) {}
	})		
}

function closePage(callback,isClose){
	// alert(callback);
	if(callback){addCookie("callback", callback, 7, "/");}
	// alert(getCookieValue("callback"));
	if(isClose == undefined || isClose){
		dd.closePage();
	}
	
	// dd.closePage().close({
	// 	onSuccess : function(result) {
	// 		callback = App.LS.get("backRefalsh")?App.LS.get("backRefalsh"):callback;
	// 	    if(callback){addCookie("callback", callback, 7, "/");}
	// 	},
	// 	onFail : function(err) {
	// 		alert(JSON.stringify(err))
	// 	}
	// })
}
function WispApp(UI) {
    this.UI = new UI();
    function UI() { 
    	//显示等待框有文字提醒
        this.showProgressDialog = function (Title) { 
			if($("#progress").length==0){
				if(!Title){Title=" 加载中... ";}
				showProgressLoading(Title)
			}
        }
		//显示等待框纯图片
		 this.showProgress = function () {   
			if($("#progress").length==0){
				showProgress();
			} 
        }
        //关闭等待框
        this.dismissProgressDialog = function () {     
			if($("#progress").length>0){
				$('#progress').remove();
			}    
        }       
		/*
		*漂浮提示框（FloatingDialog）
		*type:base,comfirm
		*title:提示文字
		*callback：调用时定义
		* */
		this.ToastDialog = function (Title) {			
			if(!Title){Title=" 数据加载中，请等待... \n";}
			dd.toast({
			  icon: "success",
			  text: Title, //提示信息
			})
		}
    }
}
var wispApp = wispApp || new WispApp();
var starLoading=false;
var App = (function () {
	function UI(name, opts, callback){        
        var dialog = {
            "current"  : null,
            "init"     : function () {
                this.type = opts.type || null;
                this.title = opts.title || null;
                this.times = opts.times || 0;
//              if(this.type==='wait')this.times=10000;
                this.menulist =opts.menulist||'';
                this.msg = opts.msg || '';
                this.OkTxt = opts.OkTxt || '确定';
                this.CancelTxt = opts.CancelTxt || '取消';
                this.contextId=opts.contextId || 'contextId';
                this.callback = callback || null;
                this.twoType = 0;
                this.show();                
                return this;
            },
            "show"     : function () {
				console.info(this)
            		//if($('.modalbg'))$('.modalbg').remove();
                var _self = this;
                var _html = $(_self.getHtml());
                //alert(_self.getHtml());
				console.info(_html);
                $('body').append(_html);
				//_html.addClass('modal-in');
                setTimeout(function () {
                    _html.addClass('modal-in');
                }, 10);
                this.current = _html;
                this.bindEvent();
                if(_self.times>0){
                		setTimeout(function () {
                			if(_self.twoType!=1){
                    	_self.remove();
                    	_self.callback && _self.callback('OK');
                    }
                }, _self.times);
                }
            },
            "bindEvent": function () {
                var _self = this;
                var _current = _self.current;
                var _btn = _current.find('.modal-button');
                var _pwdval;
                _self.current.find('input').length && _self.current.find('input')[0].focus();
                if ( !_btn.length ) return;
                _btn.on('click', function (e) {
                    var $$this = $(this);
                    var _action = $$this.data('action');
                    if ( _action === 'OK' ) {
						_self.twoType=1;
						_self.remove();
						_self.callback && _self.callback('OK');                        
                    } else if ( _action === 'CANCEL' ) {
                        _self.remove();
                        _self.callback && _self.callback('CANCEL');
                    }else if(_action == 'delete'){
                    	deleteOpinion();
                    }
                    return true;
                })
            },
            "remove"   : function () {
                var _self = this;
                _self.current.removeClass('modal-in').addClass('modal-out');
                _self.current.remove();               
            },
            "getHtml"  : function () {
                var _self = this;
                var _type = _self.type;
                var _title = _self.title;//20190801修正为提示图标
                var _contextId = _self.contextId;
                var _msg = _self.msg;
                var _OkTxt = _self.OkTxt;
                var _CancelTxt = _self.CancelTxt;
                var _menulist=_self.menulist;
                var result;
                switch ( _type ) {
                    case 'alert':
                        result = [
                            '<div class="modalbg">',
                            '<div class="modal">',
                            '    <div class="modal-inner">',
                            '        <div class="modal-text"><span class="iconfont icon-'+_title+'"></span>' + _msg + '</div>',
                            '    </div>',
                            '    <div class="modal-buttons ">' +
                            '        <span class="modal-button" data-action="OK">确定</span>' +
                            '    </div>',
                            '</div>',
                            '<div class="ui-layer ui-layer-01"></div>',
                            '</div>'].join("");
                    break;
					case 'accountsShow':
                        result = [
                            '<div class="modalbg">',
                            '<div class="modal animated">',
                            '    <div class="modal-inner">',
                            '        <div class="modal-title">' + _title + '</div>',
                            '        <div class="modal-temp" >',
                            '             <ul class="menuul">'+ _menulist +'</ul>',                            
                            '        </div>', //modal-temp底部    
                            '    </div>',
                            '</div>',//modal animated底部
                            '</div>'].join("");
                    break;
                    case 'menulist':
                        result = [
                            '<div class="modalbg">',
                            '<div class="modal animated">',
                            '    <div class="modal-inner">',
                            '        <div class="modal-title">' + _title + '<span class="modal-button cancel" data-action="CANCEL">×</span></div>',
                            '        <div class="modal-temp" >',
                            '             <ul class="menuul">'+ _menulist +'</ul>',                            
                            '        </div>', //modal-temp底部    
                            '    </div>',
                            '</div>',//modal animated底部
                            '</div>'].join("");
                    break;
                    case 'treelist':
                        result = [
                            '<div class="modalbg">',
                            '<div class="modal animated">',
                            '    <div class="modal-inner">',
                            '        <div class="modal-title">' + _title + '<span class="modal-button" data-action="CANCEL">×</span></div>',
                            '         <div class="modal-temp" >',
                            '             <ul id="treeList" class="ztree">'+ _menulist +'</ul>',                            
                            '        </div>', //modal-temp底部    
                            '    </div>',
                            '</div>',//modal animated底部
                            '</div>'].join("");
                    break;
                    case 'confirm':
                        result = [
                            '<div class="modalbg">',
                            '<div class="modal">',
                            '    <div class="modal-inner">',
                            '        <div class="modal-text"><span class="iconfont icon-'+_title+'"></span>' + _msg + '</div>',                  
                            '    </div>',
                            '    <div class="modal-buttons ">',
							'  <span class="modal-button" data-action="CANCEL">' + _CancelTxt + '</span>',
                            '        <span class="modal-button" data-action="OK">' + _OkTxt + '</span>',
                            '    </div>',
                            '</div>',
                            '<div class="ui-layer ui-layer-01"></div>',
                            '</div>'].join("");
                    break;
                    case 'wait':         //数据加载-等待框
                        result = [
                            '<div class="modalbg">', //控制时间隐藏 modalbg
                            '<div class="modal_w">', 
                            '        <img class="wait-icon" src="img/loading.gif" width="30px" height="30px"/>',
                            '        <div class="modal-wait">' + _msg + '</div>',
                            '</div>',
//                          '<div class="ui-layer ui-layer-01"></div>',
                            '</div>'].join("");
                        break;
                    case 'tips':         //删除人员-点击两次则提示
                        result = [
                            '<div class="modalbg">', 
                            '<div class="modal_w">', 
                            '        <img src="img/onclick.png" width="80px" height="80px"/>',
                            '        <div class="modal-wait">' + _msg + '</div>',
                            '</div>',
                            '</div>'].join("");
                    break;
                    default :
                        result = [
                            '<div class="ui-loading">',
                            '    <div class="ico-loading"></div>',
                            '    <b class="msg">' + _msg + '</b>',
                            '</div>',
                            '<div class="ui-layer"></div>'].join("");
                }
                return result;
            },
            "resetMsg" : function (text) {
                var _self = this;
                text && (_self.msg = text);
                _self.remove();
                _self.show();
                return this;
            }
        };			
        var moduleNameMap = {
            "dialog"               : dialog
        };
        return name && moduleNameMap[name].init();
    }
    /*
     *   localStorage 封装
     * */
    var LS = {
        set   : function (key, value) {
            //在iPhone/iPad上有时设置setItem()时会出现诡异的QUOTA_EXCEEDED_ERR错误
            //这时一般在setItem之前，先removeItem()就ok了
            if ( this.get(key) !== null )
                this.remove(key);
            localStorage.setItem(key, value);
        },
        //查询不存在的key时，有的浏览器返回undefined，这里统一返回null
        get   : function (key) {
            var v = localStorage.getItem(key);
            return v === undefined ? null : v;
        },
        remove: function (key) {
            localStorage.removeItem(key);
        },
        clear : function () {
            localStorage.clear();
        },
        each  : function (fn) {
            var n = localStorage.length, i = 0, fn = fn || function () {
                }, key;
            for ( ; i < n; i++ ) {
                key = localStorage.key(i);
                if ( fn.call(this, key, this.get(key)) === false )
                    break;
                //如果内容被删除，则总长度和索引都同步减少
                if ( localStorage.length < n ) {
                    n--;
                    i--;
                }
            }
        }
	};
	var CK ={
    	addCookie : function(name, value, days, path) { /**添加设置cookie**/
			var name = escape(name);
			var value = escape(value);
			var expires = new Date();
			expires.setTime(expires.getTime() + days * 3600000 * 24);
			path = path == "" ? "" : ";path=" + path;
			var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();
			document.cookie = name + "=" + value + _expires + path;
		},
		getCookieValue : function(name) { 
			var name = escape(name);
			var allcookies = document.cookie;
			name += "=";
			var pos = allcookies.indexOf(name); 
			if(pos != -1) {
				var start = pos + name.length; //cookie值开始的位置
				var end = allcookies.indexOf(";", start); //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
				if(end == -1) end = allcookies.length; //如果end值为-1说明cookie列表里只有一个cookie  
				var value = allcookies.substring(start, end); //提取cookie的值  
				return(value); //对它解码        
			}else{ //搜索失败，返回空字符串 
				return "";
			}
		},
        "delCookie" : function (name) {
           var yestoday=new Date();
			yestoday.setDate(yestoday.getDate()-1);
			var para="=; expires="+yestoday.toUTCString()+"; path=/";
			document.cookie=name+para;
			var svr=document.location.hostname;
			var domain=svr.substr(svr.indexOf(".")+1);
			if(domain!=svr)document.cookie=name+para+"; domain="+domain;
        },
		"clearCookie":function(isLogout) {
			var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
			var expires = new Date();
			expires.setTime(expires.getTime() - 1 * 3600000 * 24);
			if(keys) {
				for(var i = 0; i < keys.length; i++) {
					if(keys[i] != "userName" && keys[i] != "userPass") {
						document.cookie = keys[i] + "=" + "" + ";expires=" + expires.toUTCString() + ";path=/";
					}
				}
			}
			localStorage.clear();
			if(typeof(isLogout) != 'undefined') {
                //location = 'MoaLogin.html';
                wispApp.H5plus.creatWebview("./MoaLogin.html?ver="+App.LS.get('appRes'),"login","欢迎登录");
                //var yy=plus.webview.getWebviewById("yy");//找到登录页
				//yy.evalJS('location.reload()');
			} //是否是注销操作    
		}
    };
	var AJ = {
		/*ajax请求
		*_url：请求地址
		*type:请求类型：get,post
		*datatype:数据类型json，text。。。
		*data：数据
		*callback:回调函数。
		*/
		ajax : function(param){
			var token = (param.token || App.CK.getCookieValue("akLtpaToken"));
			try{var user = eval("("+App.LS.get("User")+")");var UID = user.userNo;}catch(e){var UID = "";}
			if(param.type=="get"){
				var paramsArray = [];
				// 获取 params 内所有的 key
				var paramsKeyArray = Object.keys(param.data);
				// 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
				paramsKeyArray.forEach(key => paramsArray.push(key + '=' + param.data[key]));
				// 网址拼接
				if (param.url.search(/\?/) === -1) {
					param.url += '?' + paramsArray.join('&');
				}else {
					param.url += paramsArray.join('&');
				}
				//拼接结束后清空data
				param.data = "";
			}
			return new Promise((success, fail) => {
			    $.ajax({
				    type: param.type || "get",
				    url: param.url,
				    data: param.data || "",
				    datatype: param.datatype || "json",
				    contentType: param.contentType || 'application/json',
				    async: param.async || false,  
					cache: param.cache || false,
				    beforeSend: function (xhr) {
					    xhr.setRequestHeader("x-auth-token", token);
				    }, 
				    success: (res) => {
				        success(res);
				    },
				    error: (err) => {
				        fail(err);
						networkError(err);
				    }
			    })
			});
		}
	};
    return {
		"UI"  : UI, 
		"LS"  : LS,   //本地存储
		"AJ" : AJ,
    	"CK"   : CK,
    };
})();
var wispApp = new WispApp();
App.LS.set('starLoading',false);//开始加载为true。
function addCookie(name, value, days, path) { /**添加设置cookie**/
	var name = (name);
	var value = (value);
	var expires = new Date();
	expires.setTime(expires.getTime() + days * 3600000 * 24);
	//path=/，表示cookie能在整个网站下使用，path=/temp，表示cookie只能在temp目录下使用  
	path = path == "" ? "" : ";path=" + path;
	//GMT(Greenwich Mean Time)是格林尼治平时，现在的标准时间，协调世界时是UTC  
	//参数days只能是数字型  
	var _expires = (typeof days) == "string" ? "" : ";expires=" + expires.toUTCString();
	document.cookie = name + "=" + value + _expires + path;
	//alert(document.cookie);
}

function getCookieValue(name) { /**获取cookie的值，根据cookie的键获取值**/
	//用处理字符串的方式查找到key对应value  
	var name = escape(name);
	//读cookie属性，这将返回文档的所有cookie  
	var allcookies = document.cookie;
	//查找名为name的cookie的开始位置  
	name += "=";
	var pos = allcookies.indexOf(name);
	//如果找到了具有该名字的cookie，那么提取并使用它的值  
	if(pos != -1) { //如果pos值为-1则说明搜索"version="失败
		var start = pos + name.length; //cookie值开始的位置
		var end = allcookies.indexOf(";", start); //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置  
		if(end == -1) end = allcookies.length; //如果end值为-1说明cookie列表里只有一个cookie  
		var value = allcookies.substring(start, end); //提取cookie的值  
		return(value); //对它解码        
	} else { //搜索失败，返回空字符串  
		return "";
	}
}			
function delCookie(name)
{
	var yestoday=new Date();
	yestoday.setDate(yestoday.getDate()-1);
	var para="=; expires="+yestoday.toUTCString()+"; path=/";
	document.cookie=name+para;
	var svr=document.location.hostname;
	var domain=svr.substr(svr.indexOf(".")+1);
	if(domain!=svr)document.cookie=name+para+"; domain="+domain;
}
function clearCookie(isLogout){ 
	delCookie("DomAuthSessId");
	delCookie("DomAuthSessUser");
	delCookie("LtpaToken");
	delCookie("UNI_SESS");
    localStorage.clear();
    if(typeof(isLogout)!='undefined'){location='MoaLogin.html';}//是否是注销操作    
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
function toArr(val){
	return eval("("+val+")");
}
//显示错误页面
/*errorObj:具体的错误类型
{type:"",errorInfor:"",errorButton:"",}
*/
function showErrorPage(errorObj){	
	$("#errorInfor").html(errorObj.errorInfor);
	$("#errorButton").html(errorObj.errorButton);
	$("#errorButton").attr("data-errorType",errorObj.type);
	$("#errorPage").show();
}
//图标转圈
function showProgress(){
	$("body").append('<div id="progress" style="position: absolute;height: 100%;width: 100%;top: 0;z-index: 1000;text-align: center;"><div style="width: 4.8rem;height: 4.8rem;margin: auto auto;position: relative;top: 35%;"><img src="data:image/gif;base64,R0lGODlh0gDSAPf/AAG8/4yZ+wHK/wHD/2d5+TZO9wCy6wCp8pTU/56p+/L7/8n0+2vD/gCd/5Tk83mK+snp/xSV9xhm9RlJ9obN/xZz9OT6/RKW6xhX9QCl9Ybo/xG1+gzD/QCY/0Oy/xWI9wrL/QDA3VjF/HnI/guz4grS/g68/ACh/1Rq+Nfv/83U/Xnt/yin/9f1+ojZ/KHY/zbN5RSJ7eT0/wu0+wDZ/wCe+gCl/wC+3wW+3gC94Wvs/7z2/3vT+gCp/wDV/7zj/yjK4hCg6Bk99g2t5ACh+Buh/2va6w2x8wOz8XSm+ACx/wCt/za4+wC55QbZ/wCa/xvH4QDQ/0Pn/wGu7zas/wC2/wm34nne7gu78wu06zaM9gS57BKs+gC26BOj+qm0/FHU6A2s61bT/0XC+zbl/wur8mnV/jJ4+Aq66wCa/QDc/169/w6b/jrI/gmp/FG7/hk29hZ98wSd/wW69Ofp/hKh8hjX/17X6gC741KJ9yiy/a7j/g2+4wXV/yjj/wqj/QWh/hq76gWl/q7r9AnD9wXc/0Xa/hCr9Ful96Df/aHz/9jy/RzE/gjX/1Ho/wbQ/1G3/wKY/wSZ/wKW/zPZ/wCk+a71/73p/K7e/8PJ/QWt/rzu9obh70PR5pTx/wm54Bvh/wW84QSp/gW640TI6aPk9V7q/w+n5bTX+irL/wW2/ijX/7bJ/AOb/7Hh/PP1/wW45gCo99f6/wWx/g3g/wWh+kS98ALA3QLe/6Ho8ge/9Rkx9o6++VLi/6Pq/wLb/0pe+Aa952Dg/67s/wal+ACt9yU99gat9hCm7AGx+WTN9QCZ/qXI+VfN7x2o/QSp+Ce78AW2+La+/DS/7gKb/QG2+Dik8geo9anW/Ae73wex+EWl8QOe+7Ps/tj3/yql6wCW/wCX/wDf/xkz9wK84wDB3gO/3gDe/wOX/xkz9gDA3gCV/wGW/xky9wGX/xky9g3D39rf/gHe/wCX/gC/34bv/wHA3V7Y6gHB3gCc/BPA4AS/3QHf/6/p9one9////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjQwQkQ1RTA4QTYwRjExRUFBRDhGQUIyODA0RDdBMjBGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjQwQkQ1RTA5QTYwRjExRUFBRDhGQUIyODA0RDdBMjBGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDBCRDVFMDZBNjBGMTFFQUFEOEZBQjI4MDREN0EyMEYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NDBCRDVFMDdBNjBGMTFFQUFEOEZBQjI4MDREN0EyMEYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3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LZTmVnGABbZicgskuNdbYv21m2AzJtdCiU8hFldZQOTSo3YO2IijXyEa0cKR21nAFBRCQtHJFQtAmZ8FgzjgACcODPKklmSWaeaZaKap5ppstunmm3DGKeecdNZp55145qnnnnz26eefgAYq6KCEFmrooYgmquiijDbq6KOQRirppJRWaumlmGaq6aacdurpp6CGKuqopJZq6qmopqrqqi2lAAEEKSj/wKpFKSCwBhVFsKErCx4w8AOkr8STSSYqxHNSCgywAM6yzDbLBiQvLBpPAgQUYMw44xhTADAEJPCKSBQo2+y4464hw6HxPFAAHOOwi+047bQzTjrABPBtRzKsQe6+43rwK6EBFJBOOu8W/O7A6aAgDUcKQMLvw8xS8S+grxAABxwDG6wxwgUksJG++4Yj8sjh7OvBuX9WjHDGGhc88DvvGOMxRiOETPLNJY/LAKAEpPMOwi1vzPHCFv3Axrg4J50zs2xg4mcAKxMctNAwo0CHRQ43q7TS40LSpwoCAz11yysHUBEmR2u9ddLOQsAnAT+zPLbQAxdg7EQMIL0218wi/7An2CvPHXTZEylAhdp741zungHELbXgZA9MwERGI544yf3uicIuYkNOt90SvWD55SOPy4KseMYTttyeuzywMURDRMHopIvcLAso3ykNzKy3fjDCX0g0O7O1K84s7nl+EbjvBq88s+y0kz4uFXoq3znz2K4cfEQI6F380st6nac012M/7+uZSFQ58d+DD84IemZiTPm+r1zA1REpIO6y7bs/8Z10WJ35soewyU0EZOyrXeb21LPe1Q9hz4sIJrx3OXL5bU8JWB7zVgYM/E0kawncG7k80Cc6AIN+goua2c6WtuhhblxFcFqfoIbCsa0MBfeqSM1sdjN+USBlcKth5P/qFjuL5A1iEIMfoDKxusfZEGHviOBFjojEcbHhh4KSxrqESMDXrXAjFChCFSMWLUJJ44QObF46dtGxj/xgDWKEGAsokDtCqcBiTqQbAdIXEgiMAFfOosIaEFDHQ0mDANdqGRsJsL2SpOAHmMDEDyCAOkepIAAEAEYBtoUCAgRABbPCSA5DScpSmvKUqEylKlfJyla68pWwjKUsZ0nLWtrylrjMpS53ycte+vKXwAymMIdJzGIa85jITKYyl8nMZjrzmdCMpjSnSc1BKeCauFSAJXTgCDL44ZtSMIUn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I5w1/3hS/Xr2cODSp4fkffclD+PJVz+vXb16Ngyc497DosH48vTVZ596HvxwGwRMxAdggAIOCA4VBtKmAHxPVLgggw7aR0UKtPHgn4XmMYhehuqtMdsl4inYQYAktoiAbAx8SF6IDbY4oAexpaCHjPNlZ+OPL8CGwAkqrljjjw6a+JoIgDTQyoxGjogkiVQo8FqCT87o45QtshEhayl4IYeT1EXJZXpHBtnaHoDI0UorkYR4JjhHUuBaInK4CaecZx45gmsI5PlmnGb2KaV6f7aGQJuD8smln4AKCmecWz5a44trtummJIQe2eJ5A7bHGgRi6smpO5X+CCqd4bDBYWsK6P+RpyS0RhIJqp4OKGI4VMDGgKC12oqrqrsyABuemwbrDq6H2rcrdqK2JoMHySrLIqvPhoNjbBSYyqmtt2YrYgeYwqYAJNV+eyuz4lrngZWyYeJMuuB2wC6D1lnHRrSxIeBFK7QGXG++UYazYr7UJVqbv28GrC7BEHdQHXXG4vYCFW8CHCyhBE9MXRoK45YCA/8CTM2k1KWcchpPUFGueww40wo1NNP8RBo445wPd/r9lgICazDhTM00/0HFGggs8pxBKfzgCiZPQwDv0lRXbfXVWGet9dZcd+3112CHLfbYZJdt9tlop6322my37fbbcMct99x012333XjnrffefPcv7fffgAcu+OCEF2744YgnrvjijDfu+OOQRy755JRXbvnlmGeu+eacd+7556DvHRAAIfkECQQA/wAsAAAAANIA0gAACP8A/wkcSLCgwYMIEypcyLChw4cQI0qcSLGixYsYM2rcyLGjx48gQ4ocSbKkyZMoU6pcybKly5cwY8qcSbOmzZs4c+rcybOnz59AgwodSrSo0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gw4odS7as2bNo06pdy7at27dw48qdS7eu3bt48+rdy7ev37+AAwseTLiw4cOIEytezLix48eQI0ueTLmy5cuYM2vezLmz58+gQ4seTbq06dOoU6tezbq169ewY8ueTbu27du4c+vezbu379/AZcp4wQCSByoeIDFAkCI4wR8MWHSYHq669SKQXigAnoIBm+kdrIv/B0cenIcXvjFRWUZd/Pjy4NgwkLH7RRHw7t3DL++hOW5MRbAXXn767WceBLdBwIKABDZooAfb1bbGE+01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" style="display: block; margin: 15% auto 10%;width:100%"></div></div>')
}
//文字转圈
function showProgressLoading(msg){
	$("body").append('<div id="progress" style="position: absolute;height: 100%;width: 100%;top: 0;z-index: 1000;text-align: center;"><div style="background: #484848;padding: 0.3rem 1rem;border-radius: .3rem;margin: auto auto;position: relative;top: 35%;text-align: center;vertical-align: middle;color: #fff;display:inline-block"><img src="data:image/gif;base64,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" style="display: block; margin: 10% auto 5% auto;width:2.5rem"><span style="font-size:.8rem">'+msg+'</span></div></div>')
}
//toast弹窗
function toast(msg,second){
	$("body").append('<div id="toast" style="position: fixed;bottom: 4rem;color: #351c1c; width: 100%; z-index:999;text-align: center; font-size: .8rem;line-height: 2.4rem;opacity:0.8"><span style="background: #cac7c7; padding: .5rem; border-radius: .8rem;">'+msg+'</span></div>');
	second=second?second:2000;
	setTimeout(function(){$('#toast').remove()},second);
}
//toast弹窗
// function toast(msg, second) {
// 	$("body").append(
// 		'<div id="toast" style="position: fixed;bottom: 4rem;color: #351c1c; width: 100%;z-index:999;text-align: center; font-size: 1rem;margin-top:30px;opacity:0.8;"><span style="background: #cac7c7;padding: .8rem;border-radius:.5rem;">' +
// 		msg + '</span></div>');
// 	second = second ? second : 2000;
// 	setTimeout(function () {
// 		$('#toast').remove()
// 	}, second);
// }

//自定义tap
$(document).on("touchstart", function(e) {
    var $target = $(e.target);
    if(!$target.hasClass("disable")) $target.data("isMoved", 0);
});
$(document).on("touchmove", function(e) {
    var $target = $(e.target);
    if(!$target.hasClass("disable")) $target.data("isMoved", 1);
});
$(document).on("touchend", function(e) {
    var $target = $(e.target);
    if(!$target.hasClass("disable") && $target.data("isMoved") == 0) $target.trigger("tap");
});
//url参数
function getUrlParam(name) {
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
   var r = window.location.search.substr(1).match(reg);  //匹配目标参数
   if (r != null)
	   return unescape(r[2]);
   return null; //返回参数值
}
//获取鉴权的信息
function dingAuth(callback){
	$.ajax({  
	   url: ddGetConfig+window.location.href,   	
	   type: 'GET',  	
	   dataType: "jsonp",
	   jsonpCallback:'callback',  
	   success: function (_config) {		
			App.LS.set("corpId",_config.corpId);  
			dd.config({
				agentId : agentId,
				corpId : _config.corpId,
				timeStamp : _config.timeStamp,
				nonceStr : _config.nonceStr,
				signature : _config.signature,
				jsApiList : ['device.notification.showPreloader', 'runtime.permission.requestAuthCode',
						'biz.user.get','biz.cspace.saveFile','biz.util.uploadAttachment','biz.cspace.chooseSpaceDir','biz.cspace.preview','biz.util.startDocSign']	
			});			
			if(callback)callback();
	  }
	})
}
dd.ready(function() {
	if(/Android/i.test(navigator.userAgent)) {
	// 	document.addEventListener('backbutton', function(e) {
	// 		// 在这里处理你的业务逻辑
	// 		dd.closePage();
	// 		e.preventDefault(); //backbutton事件的默认行为是回退历史记录，如果你想阻止默认的回退行为，那么可以通过preventDefault()实现		
	//    });
	}else{
		//设置导航栏右侧单个按钮
		dd.setNavLeftText({
			text: '返回'
		});			
	}
})
function networkError(er,url) {
	try{wispApp.UI.dismissProgressDialog();}catch(e){}
	if(er.status=="401"){
		//toast("登陆过期，即将重新验证。"+url);
		closePage('toast("登陆过期，即将重新验证。");location.reload();');
	}else{
		try{
			//toast(toArr(er.responseText).message);
			let errorMessage = "请求出错，请联系管理员！";
			switch (er.status){
				case "400":
					errorMessage = " 请求出现语法错误！";
				case "404":
					errorMessage = "无法找到指定位置的资源！";
				case "500":
					errorMessage = "内部服务器错误！";
				case "502":
					errorMessage = "错误的网关！";
				case "504":
					errorMessage = "网关超时！";
			}
			toast("错误提示："+ er.status + errorMessage);
		}catch(e){
			//网络异常	
			toast('请求异常，请检查网络!'+url);
		}
		
		
	}
	
}
/*ajax请求
*_url：请求地址
*type:请求类型：get,post
*datatype:数据类型json，text。。。
*data：数据
*callback:回调函数。
*/
function ajaxRequst(_url,type,contentType,datatype,data,success){
	if(contentType=="")contentType="application/json";
	return new Promise((success, fail) => {
       $.ajax({
			url: _url,
			type: type,
			contentType: contentType,
			datatype:datatype,
			beforeSend: function (xhr) {  
			    xhr.setRequestHeader("x-auth-token",getCookieValue("x-auth-token"));  
		    },  
			data:data,
			success:function(result){
				success(result);
			},
			error:function(err){
				networkError(err,_url);
			}
		})         
    })
}

/*手机横竖屏判断*/
function islandscape(){
	var flag = false;
	if( (typeof window.orientation != "undefined" &&( window.orientation == 180 || window.orientation==0))||(typeof window.screen.orientation != "undefined" &&( window.screen.orientation.angle == 180 || window.screen.orientation.angle==0)) ){//竖屏
		flag = false;
	}else if( (typeof window.orientation != "undefined" &&( window.orientation == 90 || window.orientation==-90))||(typeof window.screen.orientation != "undefined" &&( window.screen.orientation.angle == 90 || window.screen.orientation.angle==-90)) ){//横屏
		flag = true;
	}
	return flag;
}

function isPad(){
	if(!/iPhone|iPad/i.test(navigator.userAgent)) {
		var width="";
		if(islandscape()){//横屏
			width=document.body.clientHeight
		}else{
			width=document.body.clientWidth
		}
		if(width>600){//平板
			return true;		
		}else{
			return false;
		}
	}
}

//上下拉动组件
var ScrollObj = {
	moveObj : {
		touchmoveTopFunction : function(selector, differenceY) {
			$(selector).css("transform", "translateY(" + differenceY/3 + "px)");
			if($(".refreshList").length==0 && (differenceY/3)>30){
				$(selector).before('<div class="refreshList"></div>');
				ScrollObj[selector].moveY = differenceY/3;
			}
		},
		touchmoveBottomFunction : function(selector, differenceY) {
			$(selector).css("transform", "translateY(" + (differenceY/-3) + "px)");
			if((differenceY/3)>30){
				ScrollObj[selector].moveY = differenceY/-3;
			}
		},
		touchmoveLeftFunction : function(selector, differenceX) {
//			$(selector).css("transform", "translateX(" + differenceX/3 + "px)");
			if((differenceX/3)>30){
				ScrollObj[selector].moveX = differenceX/3;
			}
		},
		touchmoveRightFunction : function(selector, differenceX) {
//			$(selector).css("transform", "translateX(" + (differenceX/-3) + "px)");
			if((differenceX/3)>30){
				ScrollObj[selector].moveX = differenceX/-3;
			}
		}
	},
	initScroll : function(scrollObj){
		var selector = scrollObj.selector;
		ScrollObj[selector] = new Object;
		ScrollObj[selector].pulldown = scrollObj.pulldown;
		ScrollObj[selector].pullup = scrollObj.pullup;
		ScrollObj[selector].pullleft = scrollObj.pullleft;
		ScrollObj[selector].pullright = scrollObj.pullright;
		ScrollObj[selector].canLeftMove = scrollObj.pullleft?true:false;
		ScrollObj[selector].canRightMove = scrollObj.pullright?true:false;
		document.querySelector(selector).addEventListener('touchstart', function(e) {
			//开始滑动
			ScrollObj[selector].nStartY = e.targetTouches[0].pageY;
			ScrollObj[selector].nStartX = e.targetTouches[0].pageX;
			ScrollObj[selector].moveY = 0;
			ScrollObj[selector].moveX = 0;
		});
		document.querySelector(selector).addEventListener('touchmove', function(e) {
			//滑动期间
			var Y = e.targetTouches[0].pageY;
			var X = e.targetTouches[0].pageX;
			var differenceY = Math.abs(ScrollObj[selector].nStartY - Y);
			var differenceX = Math.abs(ScrollObj[selector].nStartX - X);
			if(differenceY - differenceX>0){
				if(ScrollObj[selector].nStartY < Y){
					if(ScrollObj[selector].canTopMove){
						ScrollObj.moveObj.touchmoveTopFunction(selector, differenceY);//pullDownBack
					}
				}else{
					if(ScrollObj[selector].canBottomMove){
						ScrollObj.moveObj.touchmoveBottomFunction(selector, differenceY);//pullUpBack
					}
				}
			}else{
				if(ScrollObj[selector].nStartX < X){
					if(ScrollObj[selector].canLeftMove){
						ScrollObj.moveObj.touchmoveLeftFunction(selector, differenceX);//pullLeftBack
					}
				}else{
					if(ScrollObj[selector].canRightMove){
						ScrollObj.moveObj.touchmoveRightFunction(selector, differenceX);//pullRightBack
					}
				}
			}
		});
		document.querySelector(selector).addEventListener('touchend', function(e) {
			//滑动结束
			$(".refreshList").remove();
			$(selector).css("transform", 'none');
			if(Math.abs(ScrollObj[selector].moveY) - Math.abs(ScrollObj[selector].moveX)>0){
				if(ScrollObj[selector].moveY>0 && ScrollObj[selector].pulldown){
					ScrollObj[selector].pulldown(selector, ScrollObj[selector].moveY);
				}else if(ScrollObj[selector].moveY<0 && ScrollObj[selector].pullup){
					ScrollObj[selector].pullup(selector, ScrollObj[selector].moveY);
				}
			}else{
				if(ScrollObj[selector].moveX>0 && ScrollObj[selector].pullleft){
					ScrollObj[selector].pullleft(selector, ScrollObj[selector].moveX);
				}else if(ScrollObj[selector].moveX<0 && ScrollObj[selector].pullright){
					ScrollObj[selector].pullright(selector, ScrollObj[selector].moveX);
				}
			}
		});
		
		//判断是否有滚动条
		if($(selector).height() == $(selector).get(0).scrollHeight){
			ScrollObj[selector].canTopMove = true;
			ScrollObj[selector].canBottomMove = true;
		}else{
			ScrollObj[selector].canBottomMove = false;
			ScrollObj[selector].canTopMove = ($(selector).scrollTop()==0)?true:false;
		}
		$(selector).unbind("scroll").scroll(function(){
			var viewH = $(this).height(),//可见高度
    		contentH = $(this).get(0).scrollHeight,//内容高度
    		scrollTop = $(this).scrollTop();//滚动高度
    		var scrollBotom = contentH - (viewH + scrollTop);//滚动到底部的高度
			if(scrollBotom == 0){
				setTimeout(function(){
					ScrollObj[selector].canBottomMove = true;
				},500);
			}else{
				ScrollObj[selector].canBottomMove = false;
			}
			if(scrollTop == 0){
				setTimeout(function(){
					ScrollObj[selector].canTopMove = true;
				},500);
			}else{
				ScrollObj[selector].canTopMove = false;
			}
		});
	}
};
function getFileTask(fileSuffix){
	var fileTask="";
	if(fileSuffix.indexOf('doc')>-1){
		fileTask="word2PDF"
	}else if(fileSuffix.indexOf('wps')>-1){
		fileTask="wps2PDF";
	}else if(fileSuffix.indexOf('xls')>-1){
		fileTask="excel2PDF";
	}else if(fileSuffix.indexOf('ppt')>-1){
		fileTask="ppt2PDF";
	}else if(fileSuffix.indexOf('pdf')>-1){
		fileTask="none";
	}else if(fileSuffix.indexOf('jpg')>-1){
		fileTask="jpg2PDF";
	}else if(fileSuffix.indexOf('jpeg')>-1){
		fileTask="jpg2PDF";
	}else if(fileSuffix.indexOf('gif')>-1){
		fileTask="gif2PDF";
	}else if(fileSuffix.indexOf('png')>-1){
		fileTask="png2PDF";
	}else if(fileSuffix.indexOf('txt')>-1){
		fileTask="txt2PDF";
	}else{
		fileTask=1;
	}
	return fileTask;
}
function dingAuth(callback){//获取鉴权的信息
	$.ajax({  
	url: ddGetConfig+window.location.href+"&appKey="+appKey,   	
	type: 'GET',  	  
	success: function (_config) {  			
			//alert('_config: ' + JSON.stringify(_config));
			_config=_config.data;
			App.LS.set("corpId",_config.corpId); 
			dd.config({
				agentId :_config.agentId,
				corpId : _config.corpId,
				timeStamp : _config.timeStamp,
				nonceStr : _config.nonceStr,
				signature : _config.sign,
				jsApiList : ['device.notification.showPreloader', 'runtime.permission.requestAuthCode',
						'biz.user.get','biz.cspace.saveFile','biz.util.startDocSign']	
			});
			if(callback)callback();
	}
	})
}
function downFile(fileUrl,name){
	//alert(fileUrl);
	//if(pdfwin)pdfwin.remove();	
	dd.ready(function() {
		dd.biz.cspace.saveFile({
			corpId:App.LS.get("corpId"),
			url:fileUrl, 
			name:name,
			onSuccess: function(data) {
				toast("已下载至钉盘。");
					//toast(data.data[0].fileName)
					/* dd.biz.cspace.preview({
						corpId:App.LS.get("corpId"),
						spaceId:data.data[0].spaceId,
						fileId:data.data[0].fileId,
						fileName:data.data[0].fileName,
						fileSize:data.data[0].fileSize,
						fileType:data.data[0].fileType,
						onSuccess: function() {
							//无，直接在native显示文件详细信息
						},
						onFail: function(err) {
							// 无，直接在native页面显示具体的错误
							toast(JSON.stringify(err));
						}
					});	 */				 
			},
			onFail: function(err) {
				//alert(JSON.stringify(err));
				if(err.errorMessage.indexOf("Canceled")>-1 || err.errorMessage.indexOf("取消")>-1){
					toast("取消下载")	
				}else if(err.errorMessage.indexOf("Parameter error")>-1){
					toast("链接地址有误，请联系管理员。")	
				}else{
					alert(JSON.stringify(err));
				}				
			}
		});	
	})
}
function getpdfFile(_url){
	var _result='';
	$.ajax({
		type: "GET",
		url: _url,
		dataType: "jsonp",
		async: false,
		jsonp: "jsoncallback",
		success: function (result){
			console.info(result)
			_result=result.Content;
		},
		error:function(error){
			toast("文件转换失败")
			return false;
		}
	})
	return _result;
}
function openFile(fileUrl){
	var pdfUrl=outerBasehost + '/wisp_fcs/conversion/conved/' +getpdfFile(fileUrl);
	//console.log("filePreView.html?fileUrl="+pdfUrl);	
	try {wispApp.UI.dismissProgressDialog();} catch(e) {}		
	OpenWebView("filePreView.html?fileUrl="+pdfUrl,{title:"文件预览"});
}
//判断是否有汉字
function CheckChinese(val){
	var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
	if(reg.test(val)){return true }else{return false}
	}
//规则
var rules={start:
	[
		{
			validator: function (value) {
				//console.log(value);
				var source=approvalForm.dataResult;
				// 开始日期不存在
				if (value!="请选择"  &&  value > source.end) {
						console.log('开始日期需要小于结束日期');
						return false;
				} else {
					return true;
				}
			},
			message:"开始日期需要小于结束日期",	
			trigger:"onChange"
		}
	],
	end:[
		{
			validator: function (value) {
				//console.log(value);
				var source=approvalForm.dataResult;
				// 开始日期不存在
				if (value!="请选择" && value < source.start) {
						console.log('开始日期需要小于结束日期');
						return false;
					
				} else {
					return true;
				}
			},
			message:"开始日期需要小于结束日期",	
			trigger:"onChange"		
		}
	]
	}
	//日期转换成星期
	function getWeekday(date) { 
		switch (date.getDay()){
			case 0:
				return "星期日"
				break; 
			case 1:
				return "星期一"
				break;
			case 2:
				return "星期二"
				break;
			case 3:
				return "星期三"
				break;
			case 4:
				return "星期四"
				break;
			case 5:
				return "星期五"
				break;
			default:
				return "星期六"
				break;
		}
		
	}
	//字符串转换成时间格式
	function getDate(strDate){
		var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/, 
		function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
		return date;
	}
	function goList(obj,i,j) {
		if(obj.childre){
			if(indexPhone.showModalId==obj.id){
				indexPhone.showModalId = "";
				indexPhone.modalNum = {id:"",datas:[]};
			}else{
				indexPhone.showModalId=obj.id;
				indexPhone.modalNum = {id:i+'-'+parseInt(j/4),datas:obj.childre};
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
	function changeIndex(id,index) {
		if(index==4){
			$("title")[0].innerText="晾晒中心";	
			indexPhone.bottomBtnActive=index;
			indexPhone.$nextTick(function(){
				indexPhone.initEcharts();
			});
		}else if(index==2){
			$("title")[0].innerText="应用中心";
			indexPhone.bottomBtnActive=index;
		}else{
			$.each(moudleInfo,function(i,item){
				if(item.id==id){
					$("title")[0].innerText=item.title;	
					try {dd.ready(function(){
						dd.biz.navigation.setTitle({title : item.title});});
					} catch (error) {}
					indexPhone.tabData=Object.assign({},item)
					indexPhone.tabNum=item.view.length;
					indexPhone.getListData('refreshing');
					return false;
				}
			});	
			indexPhone.bottomBtnActive=index;
		}
		
	}
	// 单选组件封装
Vue.component('vindexbtns',{
    template: `<div class="indexBottom btn-opt-list">
                    <div @click="changeIndex('moa-todo',0)" :class="{'hover':Datas==0}" class="btn-opt-item"  >
                        <span class="opt-icon rjicon rjicon-todo"></span> 
                        <div>待办中心</div>
                    </div>
					<div @click="changeIndex('moa-yyzx',2)" :class="{'hover':Datas==2}" class="btn-opt-item " >
						<span class="opt-icon rjicon rjicon-yyzx"></span> 
						<div>应用中心</div>
					</div>
					<div @click="changeIndex('moa-lszx',4)":class="{'hover':Datas==4}" class="btn-opt-item " >
						<span class="opt-icon rjicon rjicon-lszx"></span> 
						<div>晾晒中心</div>
					</div>
                </div>`,
				/*`<div class="indexBottom btn-opt-list">
                    <div @click="changeIndex('moa-todo',0)" :class="{'hover':Datas==0}" class="btn-opt-item"  >
                        <span class="opt-icon rjicon rjicon-todo"></span> 
                        <div>待办中心</div>
                    </div>
                    <div @click="changeIndex('moa-xxzx',1)"  :class="{'hover':Datas==1}" class="btn-opt-item " >
                        <span class="opt-icon rjicon rjicon-xxzx"></span> 
                        <div>信息中心</div>
					</div>
					<div @click="changeIndex('moa-yyzx',2)" :class="{'hover':Datas==2}" class="btn-opt-item " >
						<span class="opt-icon rjicon rjicon-yyzx"></span> 
						<div>应用中心</div>
					</div>
                    <div @click="changeIndex('moa-dbzx',3)" :class="{'hover':Datas==3}" class="btn-opt-item " >
                        <span class="opt-icon rjicon rjicon-dbzx"></span> 
                        <div>督办中心</div>
                    </div>
                    <div @click="changeIndex('moa-lszx',4)":class="{'hover':Datas==4}" class="btn-opt-item " >
                        <span class="opt-icon rjicon rjicon-lszx"></span> 
                        <div>晾晒中心</div>
                    </div>
                </div>`,*/
    props : ['Datas'],
    methods:{ }
});
//添加水印
// function renderMark(container,options){
//     let can = document.createElement('canvas');
// 	var countnums=function(text){
// 		return text.length;
// 	}
//     //设置画布的长宽
//     var fontwidth=countnums(options.waterMark)*10;
//     can.width = fontwidth+10;
//     can.height = 50;
//     let cans = can.getContext('2d');
//     //旋转角度
//     cans.rotate(-15 * Math.PI / 180);
//     cans.font = '12px Vedana';
//     //设置填充绘画的颜色、渐变或者模式
//     cans.fillStyle = 'rgba(175,206,222,0.20)';
// 	// cans.fillStyle = 'rgba(255,0,0,1)';
//     //设置文本内容的当前对齐方式
//     cans.textAlign = 'center';
//     //设置在绘制文本时使用的当前文本基线
//     cans.textBaseline = 'Middle';
//     //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
//     cans.fillText(options.waterMark, 50, 50);
//     $(container).css('background', 'url(' + can.toDataURL('image/png') + ') left top repeat');
//    // document.body.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
//  }
 
 function renderMark(container,options){
    let can = document.createElement('canvas');
    //设置画布的长宽
	var countnums=function(text){
		return text.length;
	}
	let waterMark = options.waterMark.split(",");
	let maxLeng = 0;
	waterMark.filter((itme)=>{if(maxLeng<itme.length)maxLeng=itme.length})
    let fontwidth = maxLeng*12;
	//can.width = fontwidth;
	let cW = (container=="body")?window.innerWidth:$(container).width();
	if(cW && cW>fontwidth){
		can.width = cW/parseInt(cW/(fontwidth));
	}else{
		can.width = fontwidth;
	}
    can.height = waterMark.length*20+80;
    let cans = can.getContext('2d');
    //旋转角度
    cans.rotate(-15 * Math.PI / 180);
    cans.font = '12px 微软雅黑';
    //设置填充绘画的颜色、渐变或者模式
    cans.fillStyle = 'rgba(175,206,222,0.30)';
	// cans.fillStyle = 'rgba(255,0,0,1)';
    //设置文本内容的当前对齐方式
    cans.textAlign = 'center';
    //设置在绘制文本时使用的当前文本基线
    cans.textBaseline = 'Middle';
    //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
	waterMark.map((item,index)=>{
		cans.fillText(item, 80, 50+index*20);
	})
	// cans.fillText(options.waterMark, 60, 50);
    $(container).css('background', 'url(' + can.toDataURL('image/png') + ') left top repeat');
	$(container).css('height','auto');
	$(container).css('min-height','100vh');
   // document.body.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat';
 }
//监听返回当前页面后是否刷新页面。
function addvisibListener(){
    document.addEventListener("visibilitychange", function () {
        if (document.visibilityState == "visible") {//从表单页面切回
            try{wispApp.UI.dismissProgressDialog();}catch(e){}
            var _val= App.CK.getCookieValue("callback");
            // if(App.LS.get("UserName")=="U00008/ZJJK"  || App.LS.get("UserName")=="U00010/ZJJK"){
            //     alert(App.Cookie.getCookieValue("callback"));  
            // }  
			// alert(_val);      
            App.CK.delCookie("callback");
            if (_val && _val != ""){
				//alert("_val:"+_val)
                eval("(" + _val + ")");
            } 
        }
    });
}

/**
*邮箱回复
*
*/
function openBackMail() {
	//邮箱回复
	var datas = eval("(" + App.LS.get("listInfo") + ")");
	var dataTime = datas.receiveDate ? datas.receiveDate : datas.sentDate;
	var fromAddress = datas.fromAddress ? datas.fromAddress : "";
	var toAddress = datas.toAddress ? datas.toAddress : "";
	var subject = datas.subject ? datas.subject : "";
	var content = '<div>&nbsp;</div>'
		+ '<div style="font-size: 12px;font-family: Arial Narrow;padding:2px 0 2px 0;border-top: 2px solid rgb(229, 229, 229);">------------------&nbsp;原始邮件&nbsp;------------------</div>'
		+ '<div style="font-size: 12px;background:#efefef;padding:8px;">'
		+ '<div><b>发件人:</b>&nbsp;' + fromAddress.replace(/</g, "&lt;").replace(/>/g, "&gt;") + ';</div>'
		+ '<div><b>发送时间:</b>&nbsp;' + dataTime + ';</div>'
		+ '<div><b>收件人:</b>&nbsp;' + toAddress.replace(/</g, "&lt;").replace(/>/g, "&gt;") + ';</div>'
		+ '<div><b>主题:</b>&nbsp;' + subject + ';</div>'
		+ '</div><div><br></div>'
		+ '<div>' + datas.content + '</div><br/>';

	var toUser = fromAddress.split(";");
	var userinfo = eval("(" + App.LS.get("userInfo") + ")");
	var emailUrl = App.LS.get("InternetAddress");
	var sentInfo = JSON.parse(App.LS.get("sentInfo"));
	var tomailuser = sentInfo.userName + "&lt;" + sentInfo.email + "&gt;";

	$("#mail-subject").val("回复:" + subject);
	$("#temp-area").html(content);
	console.log(toUser)
	$.each(toUser, function (i, item) {
		var _num = item.indexOf("<");
		var _num1 = item.indexOf(">");
		$("#mailUser-0").append('<label data-val="' + item.substring(_num + 1, _num1) + '" data-name="' + item.substring(0, _num) + '">' + item.substring(0, _num) + '&lt;' + item.substring(_num + 1, _num1) + '&gt;<span class="rjicon rjicon-del"></span></label>');
	});
	$("#mailUser-0 label").find("span").unbind().on("tap", function () {
		$(this).parent().remove();
	});
	$("#toSendUser").html(tomailuser);
	bindWritePage();
}

// 邮件
var mailCallBack = [{ backPeople: [], peopleUId: [] }, { backPeople: [], peopleUId: [] }, { backPeople: [], peopleUId: [] }];
var sendType = 0;//默认0发送,1抄送,2密送
function bindWritePage() {
	//以下绑定选择人员等事件,公用的
	$("#writeMail").show();
	$("#addFile-btn").unbind().on("click", function () {
		// wispApp.Function.openFileBrower("","","","false","addFileUrl");
	});
	//人员列表获取,或者树型排列
	// if(App.LS.get("addressTrees")==null){
	// 	getMailPeople();

	// }else{
	// 	var tempArry = eval("("+App.LS.get("addressTrees")+")"); 
	// 	mailFullpeople(tempArry);
	// }
	getMailPeople();
	// getDeptMail();
	$("#needBack,#needNews").unbind().on("tap", function () {
		if ($(this).hasClass("chack-act")) {
			// $(this).find("span").attr("class","rjicon rjicon-del");
			$(this).removeClass("chack-act");
		} else {
			// $(this).find("span").attr("class","iconfont icon-gouxuan");
			$(this).addClass("chack-act");
		}
	});
	$("#seave-draft").unbind().on("click", function () {
		if ($("#mail-subject").val() == "") {
			toast("请填写主题");
		} else if ($("#mailUser-0").find('label').length == 0) {
			toast("请选择收件人");
		} else {
			try { wispApp.UI.showProgressDialog(); } catch (e) { }
			if ($("#writeMail .main-filelist").find(".add-file").length > 0) {
				var path = [];
				$.each($("#writeMail .main-filelist").find(".add-file"), function (x, obj) {
					path.push($(this).data("path"));
				});
				mailUploadFile(path.join("#"), "saveTo");
			} else {
				mailDraftSave();
			}
		}
	});
	try { wispApp.UI.dismissProgressDialog(); } catch (e) { };
}
var emailOrgArray = [];
// 获取所有部门
function getMailPeople() {
	ajaxRequst(ZjgyHost + ZjgyUrl["index-orgTree"] + "?treeType=emailUser&isAll=true", 'GET', 'application/x-www-form-urlencoded', 'json', '').then(function (json) {
		//console.log(json)
		App.LS.set('mail-org', JSON.stringify(json));
		emailOrgArray = json;
		// json.forEach(treenode => {
		// 	emailArray.push(treenode.treeName + "<" + treenode.email + ">");
		// 	// emailArray.push(treenode.treeName.split("")[0]);
		// })
		console.log(emailOrgArray);
		// $.typeahead({
		// 	input: '.open-search-btn',
		// 	order: "desc",
		// 	source: {
		// 		data: emailArray
		// 	},
		// 	callback: {
		// 		onInit: function (node) {
		// 			console.log('Typeahead Initiated on ' + node.selector);
		// 		}
		// 	}
		// });
		creactRangeTree(json);
	});
}
// 获取部门邮箱
function getDeptMail() {
	ajaxRequst(ZjgyHost + ZjgyUrl["deptmail-address"], 'GET', 'application/x-www-form-urlencoded', 'json', '').then(function (json) {
		console.log(json)
		App.LS.set('mail-dept', JSON.stringify(json));
		initDeptMailTree(json);
	});
}

function creactRangeTree(treeList, perId) {
	$("#address-Tree").empty();
	var treeList = treeList;
	var unit = [];
	var org = [];
	var user = [];
	var oneOrg = [];
	var twoOrg = [];
	var testOrg = [];
	var threeOrg = [];
	
	//console.log('USER'+JSON.stringify(user))
	if (treeList) {
		$.each(treeList, function (i, item) {
			if (item.treeType == 'UNIT') { //单位
				oneOrg.push(item);
			}else if (item.treeType == 'DEPT') { // 部门
				twoOrg.push(item);
			}else {
				threeOrg.push(item)
			}
		});
		App.LS.set("user-list", JSON.stringify(threeOrg))
		// $.each(unit, function (i, item) {
		// 	// 一层组织
		// 	if (!item.treePid || item.treePid == "") {
		// 		oneOrg.push(item);
		// 	}
		// });
		// $.each(org, function (i, item) {
		// 	if (item.treePid == 'D00001') { // 二层组织 河南人大
		// 		twoOrg.push(item);
		// 	} else if (item.treePid == 'D00000') {
		// 		testOrg.push(item)
		// 	}
		// });
		// $.each(treeList, function (i, item) {
		// 	twoOrg.forEach(jitem => {
		// 		if (item.treePid == jitem.treeId && item.treeType == 'DEPT') {
		// 			threeOrg.push(item);
		// 		}
		// 	})
		// });
		$.each(oneOrg, function (i, item) {
			if(item.treeDisabled == 'true'){
				$("#address-Tree").append('<li><label class="dept-lab" data-orgid="' + item.treeId + '"><b class="rjicon icon-addup"> </b>' + item.treeName + '</label><ul perno="' + item.treeId + '" class="tree-dept"></ul></li>');
			}
		});
		$.each(twoOrg, function (i, item) {
			if($("#address-Tree").find('ul[perno="' + item.treePid + '"]').length != 0){
				$("#address-Tree").find('ul[perno="' + item.treePid + '"]').append('<li><label class="dept-lab" data-orgid="' + item.treeId + '"><b class="rjicon icon-addup"> </b>' + item.treeName + '</label><ul perno="' + item.treeId + '" class="tree-dept"></ul></li>');
			}else{
				//$("#address-Tree").append('<li><label' + " data-treeid=" + item.treeId + " data-pid=" + item.treePid + " data-uname=" + item.treeName + " data-email=" + item.email + ' class="people-lab" >' + item.treeName + '</label></li>');
			}
			
		});
		// $.each(threeOrg, function (i, item) {
		// 	if($("#address-Tree").find('ul[perno="' + item.treePid + '"]').length == 0){
		// 		$("#address-Tree").append('<li><label' + " data-treeid=" + item.treeId + " data-pid=" + item.treePid + " data-uname=" + item.treeName + " data-email=" + item.email + ' class="people-lab" >' + item.treeName + '</label></li>');
		// 	}
		// });
	}
	var addressPeople = threeOrg;
	mailFullpeople(addressPeople);

}
function mailFullpeople(jsons) {
	console.log('22222')
	mailCallBack = [{ backPeople: [], peopleUId: [] }, { backPeople: [], peopleUId: [] }, { backPeople: [], peopleUId: [] }];
	initMailTree(jsons);

	$(".openSel-btn").unbind().on("tap", function () {
		console.log($(this).data("type"))
		if (sendType != $(this).data("type")) {
			sendType = $(this).data("type");
			mailCallBack[sendType].backPeople = [];
			mailCallBack[sendType].peopleUId = [];
			// initMailTree(jsons);
			// getMailPeople()
			var allOrg = eval("(" + App.LS.get('mail-org') + ")");
			creactRangeTree(allOrg);
			console.log(sendType)
		}
		$(".bak-sel-page").show();
	});
	// $(".openSel-input,.openSel-btn").unbind().on("tap",function(){
	// 	if(sendType != $(this).data("type")){
	// 		sendType = $(this).data("type");
	// 		mailCallBack[sendType].backPeople =[];
	// 		mailCallBack[sendType].peopleUId =[];
	// 		// initMailTree(jsons);
	// 	}
	// 	$(".bak-sel-page").show();
	// 	if($(this).data("inp") == true){
	// 		$("#mail-search-input").val('');
	// 		setTimeout(function(){$("#mail-search-input").focus();},500);	
	// 	}

	// });
	$("#mail-search-input").bind("input propertychange", function (event) {
		if ($("#mail-search-input").val()) {
			$("#address-List").empty();
			creactList(jsons.msg, "", $("#mail-search-input").val());
			$("#address-List").show();
			$("#address-Tree").hide();
		} else {
			$("#address-Tree").show();
			$("#address-List").hide();
		}
		$("#address-List").find(".people-lab").unbind().on("tap", function (events) {
			var pno = $(this).data("pid");
			var uid = $(this).data("treeid");
			var email = $(this).data("email");
			var uname = $(this).data("uname");
			labelAddClass(pno, uid, email, uname);
		});
	});

	$("#mail-PSumit").unbind().on("click", function () {
		$(".bak-sel-page").hide();
		if (mailCallBack[sendType].backPeople.length > 0) {
			var havUser = [];
			$.each($("#mailUser-" + sendType).find('label'), function (i, item) {
				havUser.push($(this).data("val"));
			});
			$.each(mailCallBack[sendType].backPeople, function (i, item) {
				if ($.inArray(item.email, havUser) == -1) {
					$("#mailUser-" + sendType).append('<label data-val="' + item.email + '" data-treeid="' + item.uid + '" data-pid="' + item.pno + '" data-name="' + item.uname + '">' + item.uname + '&lt;' + item.email + '&gt;<span class="rjicon rjicon-del"></span></label>');
				}
			});
			$("#mailUser-" + sendType).find("label").find("span").unbind().on("tap", function () {
				$(this).parent().remove();
				var pno = $(this).parent().data("pid");
				var uid = $(this).parent().data("treeid");
				var email = $(this).parent().data("email");
				var uname = $(this).parent().data("name");
				labelAddClass(pno, uid, email, uname);
			});
		}
	});
	//$("#mail-send-btn").unbind().on("click", function () {
	
	//});
	$("#mail-clear-input").unbind().on("click", function () {
		$("#mail-search-input").val("");
		$("#address-Tree").show();
		$("#address-List").hide();
	});
}
function mailSave(type){
	if ($("#mail-subject").val() == "") {
		toast("请填写主题");
	} else if ($("#mailUser-0").find('label').length == 0) {
		toast("请选择收件人");
	} else {
		try { wispApp.UI.showProgressDialog(); } catch (e) { }
		if ($("#writeMail .main-filelist").find(".add-file").length > 0) {
			var path = [];
			$.each($("#writeMail .main-filelist").find(".add-file"), function (x, obj) {
				path.push($(this).data("path"));
			});
			mailUploadFile(path.join("#"), "sendTo");
		} else {
			sendMailTo(type);
		}
	}
}
//初始化人员树
function initMailTree(jsons) {
	$("#address-Tree").show();
	$("#address-List").hide();
	// $("#address-Tree").empty();

	creactTree(jsons, "");
	$("#address-Tree").find("label").eq(0).find("b").attr("class", "rjicon icon-subup");
	$("#address-Tree").find("label").eq(0).addClass("tree-act");
	$("#address-Tree").find(".dept-lab").unbind().on("tap", function () {
		if ($(this).hasClass("tree-act")) {
			$(this).find("b").attr("class", "rjicon icon-addup");
			$(this).removeClass("tree-act");
		} else {
			$(this).find("b").attr("class", "rjicon icon-subup");
			$(this).addClass("tree-act");
		}
	});
	$("#address-Tree").find(".people-lab").unbind().on("tap", function () {
		var pno = $(this).data("pid");
		var uid = $(this).data("treeid");
		var email = $(this).data("email");
		var uname = $(this).data("uname");
		labelAddClass(pno, uid, email, uname);
	});

	if (mailCallBack[sendType].backPeople.length > 0) {
		$.each(mailCallBack[sendType].backPeople, function (i, item) {
			$(".people-tree").find('.people-lab[data-uid="' + item.uid + '"]').addClass("tree-act");
			$(".people-tree").find('label[data-orgid="' + item.pno + '"]').addClass("chack-act");
			$("#mail-PSumit").html("确认添加(" + (i + 1) + ")");
		});
	} else {
		$("#mail-PSumit").html("确认添加");
	}
}
//邮件人员通讯录---树 --绑定人员
function creactTree(treeList, perId) {
	// 人员组织树
	var _self = this;
	var allOrg = eval("(" + App.LS.get('mail-org') + ")");
	//treeList.forEach(item => {
		// _self.allPeople.push(item)
		
			allOrg.forEach(item => {
				if (item.treeDisabled !== 'true') {
				//if (item.treePid == oitem.treeId) {
					var addClass = "";
					if($("#address-Tree").find('ul[perno="' + item.treePid + '"]').length != 0){
						$("#address-Tree").find('ul[perno="' + item.treePid + '"]').append('<li><label' + " data-treeid=" + item.treeId + " data-pid=" + item.treePid + " data-uname=" + item.treeName + " data-email=" + item.email + ' class="people-lab' + addClass + '" >' + item.treeName + '</label></li>');
					}else{
						$("#address-Tree").append('<li><label' + " data-treeid=" + item.treeId + " data-pid=" + item.treePid + " data-uname=" + item.treeName + " data-email=" + item.email + ' class="people-lab' + addClass + '" >' + item.treeName + '</label></li>');
					}
					
				//}
			}
			})
		
	//})
	$("#address-Tree").find('label[data-orgid=D00378]').find("b").attr("class", "rjicon icon-subup");
	$("#address-Tree").find('label[data-orgid=D00378]').addClass("tree-act");
}
//邮件人员选中,输入框,树等样式改变
function labelAddClass(pno, uid, email, uname) {
	console.log(mailCallBack[sendType].peopleUId)
	var index = $.inArray(uid, mailCallBack[sendType].peopleUId);
	console.log(index)
	if (index > -1) {
		$(".people-tree").find('.people-lab[data-treeid="' + uid + '"]').removeClass("tree-act");
		mailCallBack[sendType].peopleUId.splice(index, 1);
		mailCallBack[sendType].backPeople.splice(index, 1);
	} else {
		$(".people-tree").find('.people-lab[data-treeid="' + uid + '"]').addClass("tree-act");
		mailCallBack[sendType].peopleUId.push(uid);
		mailCallBack[sendType].backPeople.push({ "pno": pno, "uid": uid, "email": email, "uname": uname })
	}

	var treeNum = $(".people-tree").find('ul[perno="' + pno + '"]').find(".tree-act").length;
	if (treeNum == 0) {
		$(".people-tree").find('label[data-orgid="' + pno + '"]').removeClass("chack-act");
	} else {
		$(".people-tree").find('label[data-orgid="' + pno + '"]').addClass("chack-act");
	}
	var haveNums = mailCallBack[sendType].peopleUId.length;
	if (haveNums > 0) {
		$("#mail-PSumit").html("确认添加(" + haveNums + ")");
	} else {
		$("#mail-PSumit").html("确认添加");
	}
	console.log(mailCallBack)
}

/**
	* 邮件转发
	*
	*/
function openTurnMail() {
	//邮箱转发
	var datas = eval("(" + App.LS.get("listInfo") + ")");
	dataTime = datas.receiveDate ? datas.receiveDate : datas.sentDate;
	var fromAddress = datas.fromAddress ? datas.fromAddress : "";
	var toAddress = datas.toAddress ? datas.toAddress : "";
	var subject = datas.subject ? datas.subject : "";
	var content = '<div>&nbsp;</div>'
		+ '<div style="font-size: 12px;font-family: Arial Narrow;padding:2px 0 2px 0;border-top: 2px solid rgb(229, 229, 229);">------------------&nbsp;原始邮件&nbsp;------------------</div>'
		+ '<div style="font-size: 12px;background:#efefef;padding:8px;">'
		+ '<div><b>发件人:</b>&nbsp;' + fromAddress.replace(/</g, "&lt;").replace(/>/g, "&gt;") + ';</div>'
		+ '<div><b>发送时间:</b>&nbsp;' + dataTime + ';</div>'
		+ '<div><b>收件人:</b>&nbsp;' + toAddress.replace(/</g, "&lt;").replace(/>/g, "&gt;") + ';</div>'
		+ '<div><b>主题:</b>&nbsp;' + subject + ';</div>'
		+ '</div><div><br></div>'
		+ '<div>' + datas.content + '</div><br/>';

	// var userinfo = eval("("+App.LS.get("userInfo")+")");
	var emailUrl = App.LS.get("InternetAddress");
	// var tomailuser = userinfo.userName+"&lt;"+userinfo.email+"&gt;";
	var sentInfo = JSON.parse(App.LS.get("sentInfo"));
	var tomailuser = sentInfo.userName + "&lt;" + sentInfo.email + "&gt;";
	$("#mail-subject").val("转发:" + subject);
	$("#temp-area").html(content);
	$("#toSendUser").html(tomailuser);
	if (datas.mailIsContainAttach == "1") {
		copyMailFile(datas.id);
	}
	bindWritePage();
}
//复制邮件
function copyMailFile(oldId) {
	var mailId = App.LS.get("newMailId");
	var openUrl = ZjgyHost + ZjgyUrl["copy-mailfile"] + "?sourceDocId=" + oldId + "&targetDocId=" + mailId;

	$.ajax({
		url: openUrl,
		dataType: 'json',
		type: 'post',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("x-auth-token", getCookieValue("LtpaToken"));
		},
		async: false,
		cache: false,
		contentType: 'application/json;charset=UTF-8',
		success: function (jsons) {
			if (jsons) {
				addFileUrl(jsons, "false");
				//mailWrite.getAttachList()
			}
		},
		error: function (e) {
			try { wispApp.UI.dismissProgressDialog(); } catch (e) { };
			//toast("网络开小差，附件获取异常！");
		}
	});
}
/**
* 重新编辑草稿箱
*/
function openFromDraftMail(params) {
	var datas = eval("(" + App.LS.get("listInfo") + ")");
	var dataTime = datas.receiveDate ? datas.receiveDate : datas.sentDate;
	var fromAddress = datas.fromAddress ? datas.fromAddress : "";
	var toAddress = datas.toAddress ? datas.toAddress.split(";") : "";//收件人
	var ccMailAddress = datas.ccMailAddress ? datas.ccMailAddress.split(";") : "";//抄送
	var bccMailAddress = datas.bccMailAddress ? datas.bccMailAddress.split(";") : "";//密送
	var subject = datas.subject ? datas.subject : "";
	var content = datas.content;

	var toUser = fromAddress.split(";");
	var sentInfo = JSON.parse(App.LS.get("sentInfo"));
	var tomailuser = sentInfo.userName + "&lt;" + sentInfo.email + "&gt;";

	$("#mail-subject").val(subject);
	//$("#mail-text").html(content);
	console.log(toUser)
	$.each(toAddress, function (i, item) {
		let _num = item.indexOf("<");
		let _num1 = item.indexOf(">");
		$("#mailUser-0").append('<label data-val="' + item.substring(_num + 1, _num1) + '" data-name="' + item.substring(0, _num) + '">' + item.substring(0, _num) + '&lt;' + item.substring(_num + 1, _num1) + '&gt;<span class="rjicon rjicon-del"></span></label>');
	});
	$.each(ccMailAddress, function (i, item) {
		let _num = item.indexOf("<");
		let _num1 = item.indexOf(">");
		$("#mailUser-1").append('<label data-val="' + item.substring(_num + 1, _num1) + '" data-name="' + item.substring(0, _num) + '">' + item.substring(0, _num) + '&lt;' + item.substring(_num + 1, _num1) + '&gt;<span class="rjicon rjicon-del"></span></label>');
	});
	$.each(bccMailAddress, function (i, item) {
		var _num = item.indexOf("<");
		var _num1 = item.indexOf(">");
		$("#mailUser-2").append('<label data-val="' + item.substring(_num + 1, _num1) + '" data-name="' + item.substring(0, _num) + '">' + item.substring(0, _num) + '&lt;' + item.substring(_num + 1, _num1) + '&gt;<span class="rjicon rjicon-del"></span></label>');
	});
	$("#mailUser-0 label").find("span").unbind().on("tap", function () {
		$(this).parent().remove();
	});
	$("#mailUser-1 label").find("span").unbind().on("tap", function () {
		$(this).parent().remove();
	});
	$("#mailUser-2 label").find("span").unbind().on("tap", function () {
		$(this).parent().remove();
	});
	$("#toSendUser").html(tomailuser);
	bindWritePage();
}

/***
* 新建邮件
*/
function openDraftMail(type) {
	var userinfo = eval("(" + App.LS.get("userInfo") + ")");
	ajaxRequst(ZjgyHost + ZjgyUrl["mail-newId"] + "?_t=" + new Date().getTime(), 'GET', 'application/x-www-form-urlencoded', 'json', '').then(function (json) {
		// alert(json);
		App.LS.set('newMailId', json);
		App.LS.set('MailID', json);
		if(type && (type == "back" || type == "turn")){
			mailWrite.getAttachList(type);
		}
	});
	var sentInfo = JSON.parse(App.LS.get("sentInfo"));

	var tomailuser = sentInfo.userName + "&lt;" + sentInfo.email + "&gt;";

	$("#toSendUser").html(tomailuser);
	bindWritePage();
}

//邮件发送
function sendMailTo(type) {
	var sentInfo = eval("(" + App.LS.get("sentInfo") + ")");
	var fromMailuser = sentInfo.userName + "<" + sentInfo.email + ">";
	//toast("邮件正在发送！");
	var temp0 = [];
	var temp1 = [];
	var temp2 = [];
	var subject = $("#mail-subject").val();
	var content = $("#mail-text").val();
	//content = content.replace(/(\r\n|\n|\r)/gm, "<br />");
	content = "<div>" + content + "</div>" + $("#temp-area").html();
	var mailId = App.LS.get("MailID");
	var sendMsg = $("#needNews").hasClass("chack-act") ? "1" : "0";
	var receipt = $("#needBack").hasClass("chack-act") ? "1" : "0";
	var opType = "";
	var extension = "";
	console.log(fromMailuser);
	if (App.LS.get("mailSendType") == "fromDraft") {
		opType = "update";
		extension = "draftsUpdate";
		mailId = JSON.parse(App.LS.get('listInfo')).id;
	}
	$.each($("#mailUser-0").find("label"), function (x, obj) {
		var infos = $(this).data("name") + "<" + $(this).data("val") + ">";
		temp0.push(infos);
	});
	$.each($("#mailUser-1").find("label"), function (x, obj) {
		var infos = $(this).data("name") + "<" + $(this).data("val") + ">";
		temp1.push(infos);
	});
	$.each($("#mailUser-2").find("label"), function (x, obj) {
		var infos = $(this).data("name") + "<" + $(this).data("val") + ">";
		temp2.push(infos);
	});
	var datas = { 
		"mailType": 1, 
		"id": mailId, 
		"fromAddress": fromMailuser, 
		"toAddress": temp0.join(";"), 
		"ccMailAddress": temp1.join(";"), 
		"bccMailAddress": temp2.join(";"), 
		"subject": subject, 
		"content": content, 
		"sendMsg": sendMsg, 
		"receipt": receipt, 
		"opType": opType, 
		"mailIsContainAttach": mailWrite.attachList.length == 0 ? "0" : "1", 
		"mailIsDelete": '', 
		"mailIsSeen": '', 
		"mailIsSpam": '', 
		"sentDate": '', 
		"attachment": '', 
		"extension": extension,
	}
	let userInfo = toArr(App.LS.get('userInfo'));
	if(type == "send"){//发送
		var openUrl = ZjgyHost + ZjgyUrl['mail-send'];
		datas.userNo = userInfo.userId || userInfo.username;
		datas.createDate = mailWrite.docInfor.createDate;
		//datas.extension = "draftsUpdate";
	}else if(type == "draft"){//存草稿
		var openUrl = ZjgyHost + ZjgyUrl['mail-draft'];
		
	}else{//保存
		var openUrl = ZjgyHost + ZjgyUrl['mail-save'];
		datas.userNo = userInfo.userId || userInfo.username;
		datas.createDate = mailWrite.docInfor.createDate;
	}
	if (App.LS.get("moduleId") == 'MAIL') {
		datas.mailType = 1;
	} else {
		datas.mailType = 2;
	}
	$.ajax({
		url: openUrl,
		dataType: 'json',
		type: 'post',
		data: JSON.stringify(datas),
		async: false,
		cache: false,
		contentType: 'application/json;charset=UTF-8',
		success: function (jsons) {
			if (jsons) {
				try { wispApp.UI.dismissProgressDialog(); } catch (e) { };
				if(type == "send"){//发送
					toast("发送成功！");
				}else{
					toast("保存成功！");
					if(type == "save"){ location.reload(); }//保存
				}
				// indexRefresh(1);
				// indexRefresh(1);	
				setTimeout(function () { closePage("location.reload();"); }, 2000);

			}
		},
		error: function (e) {
			try { wispApp.UI.dismissProgressDialog(); } catch (e) { };
			toast("网络开小差，发送失败！");
		}
	});
}
function getWeekDay(dateString) {
	let dateStringReg = /^\d{4}[/-]\d{1,2}[/-]\d{1,2}$/;

	if (dateString.match(dateStringReg)) {
		let presentDate = new Date(dateString),
			today = presentDate.getDay() !== 0 ? presentDate.getDay() : 7;

		return Array.from(new Array(7), function (val, index) {
			return formatDate(new Date(presentDate.getTime() - (today - index - 1) * 24 * 60 * 60 * 1000));
		});

	} else {
		throw new Error('dateString should be like "yyyy-mm-dd" or "yyyy/mm/dd"');
	}

	function formatDate(date) {
		// return date.Format("yyyy-MM-dd")
		return date
	}
}

function getWeek(dt) {
	let d1 = new Date(dt);
	let d2 = new Date(dt);
	d2.setMonth(0);
	d2.setDate(1);
	let rq = d1 - d2;
	let days = Math.ceil(rq / (24 * 60 * 60 * 1000));
	let num = Math.ceil(days / 7);
	return num;
}


if(App.LS.get('userInfo') && App.LS.get('userInfo') != ""){
	let userInfo = toArr(App.LS.get('userInfo'));
	renderMark("body", { waterMark: "省发改委  " + (userInfo.userName || userInfo.username) + " " + (userInfo.phone ?  userInfo.phone.substring(7) : "") });
}

var fontSize = {name:"标准",val:"18"};
//字体大小设置
var fontSizeSet = {
	initFontSize: function(){
		if(App.LS.get("fontSize") && (fontSize != toArr(App.LS.get("fontSize")))){
			fontSize = toArr(App.LS.get("fontSize"));
			fontSizeSet.changeSize(fontSize.val);
		}else{
			App.LS.set("fontSize",JSON.stringify(fontSize));
		}
	},
	changeSize: function(size){
		fontSize.val = size;
        document.documentElement.style.fontSize = size + 'px';
        //document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 * size + 'px';
		App.LS.set("fontSize",JSON.stringify(fontSize));
	}
}
//判断设备是手机端，电脑端还是平板端
var os = function() {
    var ua = navigator.userAgent,
        isWindowsPhone = /(?:Windows Phone)/.test(ua),
        isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
        isAndroid = /(?:Android)/.test(ua),
        isFireFox = /(?:Firefox)/.test(ua),
        isChrome = /(?:Chrome|CriOS)/.test(ua),
        isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
        isPhone = /(?:iPhone)/.test(ua) && !isTablet,
        isPc = !isPhone && !isAndroid && !isSymbian;
    return {
        isTablet: isTablet,
        isPhone: isPhone,
        isAndroid: isAndroid,
        isPc: isPc
    }
}();

var isReaded = function(){ //判断是否已阅，用于首页是否加粗标题。未阅-加粗
	if(listInfo.readType){ //阅件
		if(listInfo.processExtension){
			let processExtension = JSON.parse(listInfo.processExtension);
			if(processExtension.isInterfaceRead && processExtension.isInterfaceRead == "1"){
				return true;
			}else{
				updateFlowReaderExtensions();
				return false;
			}
		}else{
			updateFlowReaderExtensions();
			return false;
		}
	}else{
		if(listInfo.isRead == 1){
			return true;
		}else{
			return false;
		}
	}
}
/*修改是否点击过阅件的状态*/
var updateFlowReaderExtensions = function(){
	let _url = ZjgyHost + ZjgyUrl["update-FlowReader"];	
	let data = {
		ids:listInfo.id,
		isInterfaceRead: 1
	}
	ajaxRequst(_url,'post','application/json;charset=UTF-8','json',JSON.stringify(data)).then(function(json){
		console.log(json);
	})
	
}

/*经费报销-差旅报销*/
var generateUUID = function(){//生成附件id
	return 'xxxx-xxxx-xxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*12|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(12);
	});
}

var getUserTrees = function(_this){//获取人员组织结构
	// let _this = this;
	let _url = ZjgyHost + ZjgyUrl["user-trees"] + "?treeType=user";
	ajaxRequst(_url,'get','application/json;charset=UTF-8','json').then(function(obj){
		// let allUser = [];
		let selPid = false;//可否选中父级单位id
		_this.userTrees = getTrees(obj,"",selPid);
	})
}
var getTrees = function(list, parentId, selPid) {
	// var _self=this;
	var items= {};
	var thisDept = userInfo.username?userInfo.username:"";
	// 获取每个节点的直属子节点，*记住是直属，不是所有子节点
	for (var i = 0; i < list.length; i++) {
		 var key = list[i].treePid ? list[i].treePid : "";
		 //if(list[i].treeId == thisDept){parentId=key;}
		 if (items[key]) {
			 items[key].push(list[i]);
		 } else {
			 items[key] = [];
			 items[key].push(list[i]);
		 }
	 }
	 return formatTree(items, parentId, selPid);
}
var formatTree = function(items, parentId, selPid) {/*利用递归格式化每个节点*/
	// var _self=this;
	var result = [];
	if (!items[parentId]) {
		return result;
	}
	for (var t of items[parentId]) {
		if(selPid){
			var b=formatTree(items, t.treeId, selPid);
			var a=[{"treeId":t.treeId,"treePid":t.treeId,"treeName":t.treeName,"treeDisabled":false,"children":[]}];
			t.children = a.concat(b)
			result.push(t);
		}else{
			 t.children = formatTree(items, t.treeId, selPid)
			 result.push(t);
		}
	}
  return result;
}