if((window.location.href.toLowerCase()).indexOf("indexphone.html")>-1&&window.location.href.indexOf("?v=")==-1){
	window.location.href = window.location.href + "?v=" + (new Date()).getTime() ;
}

var versionUrl = '/dd/dictionary/getValueByCode?code=frontEndScriptVersionInfo';//获取版本号
/*测试环境*/
var basehost = window.location.protocol + "//" + window.location.host;
var loadVersion = {
	versionList : [],
	version : {},
	iniVersion : function(versionList,flag){
		var _this=this;
		if(versionList){_this.versionList = versionList;}
		if(flag || localStorage.getItem("version")==null){
			// localStorage.setItem("version", JSON.stringify({version:"1"}));
			// _this.eachLoadJs(0);
			//return false
			var httpRequest = new XMLHttpRequest();//第一步：建立所需的对象
	        httpRequest.open('GET', versionUrl, true);//第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
	        httpRequest.send();//第三步：发送请求  将请求参数写在URL中
	        /**获取数据后的处理程序**/
	        httpRequest.onreadystatechange = function () {
	            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
	                var json = JSON.parse(httpRequest.responseText.replace(/\s+/g,''));//获取到json字符串，还需解析
					_this.version = eval("("+ json +")");
					localStorage.setItem("version", json);
					_this.eachLoadJs(0);
				}
	        };
		}else{
			_this.version = eval("("+ localStorage.getItem("version") +")");
			_this.eachLoadJs(0);
		}
		
	},
	eachLoadJs : function(num){
		var _this = this;
    	if(num >= _this.versionList.length){return false;}
    	var obj = _this.versionList[num];
    	var BigV = _this.version.version?_this.version.version:"";
    	var MinV = _this.version[obj.name]?_this.version[obj.name]:"";
    	var verNum = BigV + "." + MinV;
      	var verUrl = obj.url + "?v=" + verNum;
    	if(obj.type=="js"){
    		_this.dynamicLoadJs(verUrl,function(){
    			try{if(obj.newcallback){eval("("+obj.newcallback+")");}}catch(e){}
    			_this.eachLoadJs(num+1);
    		});
    	}else if(obj.type=="css"){
    		_this.dynamicLoadCss(verUrl,function(){_this.eachLoadJs(num+1);});
    	}
    },
	dynamicLoadJs : function(url, callback) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		if(typeof(callback)=='function'){
			script.onload = script.onreadystatechange = function () {
				if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
					callback();
					script.onload = script.onreadystatechange = null;
				}
			};
		}
		head.appendChild(script);
	},
	dynamicLoadCss : function(url, callback) {
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.type='text/css';
		link.rel = 'stylesheet';
		link.href = url;
		if(typeof(callback)=='function'){
			link.onload = link.onreadystatechange = function () {
				if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
					callback();
					link.onload = link.onreadystatechange = null;
				}
			};
		}
		head.appendChild(link);
	},
	getVersion : function(name){
		var _this = this;
		try{
			var BigV = _this.version.version?_this.version.version:"";
    		var MinV = _this.version[name]?_this.version[name]:"";
    		var verNum = BigV + "." + MinV;
			return verNum;
		}catch(e){
			return Math.random();
		}
	}
};