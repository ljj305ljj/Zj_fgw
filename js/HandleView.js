var Forms={};
var Opinions=[];
var selectForm=[];
var dateFormat = [];
var handleId = "";
function initHandlePage(bldId,tempId,urlOrtxt,handletype){
	//bldId = 阅办单容器(id), tempId = 缓存PC阅办单的(id), urlOrtxt = 缓存已填入默认undefined, handletype = 自定义样式	
	
	handleId = bldId;
	if(handleId == "Bldbox"){
		Forms = typeof(Forms1) != "undefined" ?  Forms1 : Forms;
	}else if(handleId == "Bldbox2"){
		Forms =  typeof(Forms2) != "undefined" ?  Forms2 : Forms;
	}
	if(urlOrtxt){
		var getVals = document.getElementById(tempId);
		var regex=/<style>[\s\S]*?<\/style>/ig;//去掉样式
		var responseDiv = urlOrtxt.replace(regex,"")
		.replace(/:options/g,'options')
		.replace(/v-model/g,'model')
		.replace(/[$]+libs.dayjs/g,"new Date")
		.replace(/format/g,"Format")
		.replace(/setting.payForm/g,"form");
		//getVals.innerHTML = responseDiv;
		console.log(Forms);
		new vHtml({propsData: {'id':tempId,'Spans':{selected: responseDiv},"forms":Forms,"callback":function(){initHandlePage(bldId,tempId,"",handletype)}}}).$mount('#'+tempId);
		return false;
	}else{
		var getVals = document.getElementById(tempId);
	}
	var bldbox = document.getElementById(bldId);
	bldbox.style.padding = '1rem 0.5rem';
	//办理单标题
	var titNode = getVals.querySelectorAll("[moa-title]");
	var divtit = document.createElement('div');
	divtit.className = "table-bld-header";
	try{
		for(var i=0;i<titNode.length;i++){
			if(i == 0){
				var nodeobj = titNode[i].attributes;
				for(var j=0; j<nodeobj.length; j++){
					if(nodeobj[j].name=="moa-title"){
						var arr = nodeobj[j].nodeValue.split("|");
						var vname = arr[0]?arr[0]:"";
						var vid = arr[1]?arr[1]:"";
						var vtype = arr[2]?arr[2]:"";
						if(vid){
							vname = vname.replace(vid,getFormValue(vid));
						}
						
						var title = document.createTextNode(vname);
						divtit.appendChild(title);
						bldbox.appendChild(divtit);
					}
				}
			}
			
		}
	}catch(e){
		var title = document.createTextNode("办理单未定义");
		divtit.appendChild(title);
		bldbox.appendChild(divtit);
	}
	
	//办理单基本信息
	var filedArray = getVals.querySelectorAll("[moa-filed]");
	var tableValue = [];
	for(var i=0;i<filedArray.length;i++){
		var nodeName = filedArray[i].attributes;
		for(var j=0; j<nodeName.length; j++){
			if(nodeName[j].name=="moa-filed"){
				var arr = nodeName[j].nodeValue.split("|");
				var obj = {
					vname:arr[0] || "",
					vid:arr[1] || "",
					vtype:arr[2] || "",
					vcol:arr[3] || ""
				}
				tableValue.push(obj);
			}
			if(nodeName[j].name=="moa-data"){
				tableValue[i].vdata = nodeName[j].nodeValue;
			}
			if(nodeName[j].name=="options"){console.info(nodeName[j])}
		}
	}
	var selectTemp = ["t-select","t-radio","t-checkbox"];
	var len = 0;
	$.each(selectTemp,function(key,val){
		$.each($(val), function(i,item) {
	   		var nodeName = item.attributes;
	   		selectForm[len] = {"name":"","val":[]};
	   		$.each(nodeName,function(x,obj){
				if(obj.name=="model"){
					var _num = obj.nodeValue.indexOf(".");
					var names = obj.nodeValue.substring(_num+1);
					selectForm[len].name=names;
				}else if(obj.name=="options"){
					try {
						selectForm[len].val=eval("("+obj.nodeValue+")");
					} catch (error) {
						selectForm[len].val=[];
					}
				}else if(obj.name=="dict"){
					var dictId=obj.nodeValue.replace(/\'/g,"");
					var tempA = getDictList(dictId);
					selectForm[len].val = tempA?tempA:[];
				}
	   		});
	   		len++;
	   	});
	});
	//时间类型的字段
	let dateLen = 0;
	$.each($("t-datepicker"), function(i,item) {
		let dateNodeName = item.attributes;
		dateFormat[dateLen] = {"name":"","val":""};
		$.each(dateNodeName,function(x,obj){
			if(obj.name=="model"){
				let _num = obj.nodeValue.indexOf(".");
				let names = obj.nodeValue.substring(_num+1);
				dateFormat[dateLen].name = names;
			}
			if(obj.name.indexOf("format") > -1){
				dateFormat[dateLen].val = obj.nodeValue;
			}
		});
		dateLen ++;
	})

	let dataArray = getVals.querySelectorAll("[moa-data]");

	console.info(tableValue)
   	//console.info(selectForm);
	//tableValue基本信息列表取完毕，可清空temp缓存
	let unique = function(arrobj,name){//去重
		let obj = {};
		let arr = arrobj.reduce((cur,next) => {
			obj[next.vid] ? "" : obj[next.vid] = true && cur.push(next);
			return cur;
		},[]) //设置cur默认类型为数组，并且初始值为空的数组
		console.log(arr);
		return arr;
	 }
	// tableValue = unique(tableValue);
	 console.info("tableValue:"+tableValue);
	//getVals.innerHTML = "";
	creatHandleTable(tableValue,bldbox);
	
	
	//创建办理单表格
	/* var Table = document.createElement('table');
	Table.className = "table-bld-body";
	var colgroup = document.createElement("colgroup");
	for (var i=0;i<4;i++) {
		var col = document.createElement("col");
		if(i==0 || i==2){
			col.style.width = "5rem";
		}else{
			col.style.width = "auto";
		}
		colgroup.appendChild(col);
	}
	Table.appendChild(colgroup);
	for(var i=0; i<tableValue.length; i++){
		var lRow = document.createElement('tr');
		var vtd = tableValue[i];
		if(vtd.vtype!="t-listtext" && vtd.vid!="subject" && vtd.vid!="mainSend" && vtd.vid!="copySend" && vtd.vcol=="" && tableValue[i+1] && tableValue[i+1].vcol=="" && tableValue[i+1].vtype!="t-listtext"){
			//一行四列
			lRow.appendChild(addendTr("title",vtd));
			lRow.appendChild(addendTr("value",vtd));
			lRow.appendChild(addendTr("title",tableValue[i+1]));
			lRow.appendChild(addendTr("value",tableValue[i+1]));
			i++;
		}else if(vtd.vtype=="t-listtext" && vtd.vcol=="not" && tableValue[i+1] && tableValue[i+1].vcol==""){
			//一行三列
			lRow.appendChild(addendTr("title",vtd));
			lRow.appendChild(addendTr("value",vtd,2));
			lRow.appendChild(addendTr("super",tableValue[i+1]));
			i++;
		}else{
			//一行两列
			lRow.appendChild(addendTr("title",vtd));
			lRow.appendChild(addendTr("value",vtd,3));
		}
		Table.appendChild(lRow);
	}
	bldbox.appendChild(Table);
	initTemplet();//绑定数据 */
}
function creatHandleTable(tableValue,bldbox,diySet,addnum,formVals){
	//创建表格
	if(bldbox==""){
		handleId = diySet.id;
		var bldbox = document.getElementById(diySet.id);
		bldbox.style.padding = '1rem 0.5rem';
		var divtit = document.createElement('div');
		divtit.className = "table-bld-header";
		var title = document.createTextNode(diySet.title);
		// if(typeof(addnum)=="undefined" || addnum == 0 ){
		// 	divtit.appendChild(title);
		// }
		bldbox.appendChild(divtit);
	}
	
	//创建办理单标题下面的字段（不带表格边框）
	var noBorderTable = document.createElement('table');
	noBorderTable.className = "table-bld-body-noborder";
	let noBorderTableValue = tableValue.filter(value => value.vtype == "t-noborder");
	let loadNoBorder_pad = function(){
		let lRow = document.createElement('tr');
		for(let j = 0; j < noBorderTableValue.length; j++){
			lRow.appendChild(addendNoBorderTr("title",noBorderTableValue[j]));
			lRow.appendChild(addendNoBorderTr("value",noBorderTableValue[j]));
		}
		noBorderTable.appendChild(lRow);
	}
	let loadNoBorder_phone = function(){
		for(let j = 0; j < noBorderTableValue.length; j++){
			let lRow = document.createElement('tr');
			let vtd = noBorderTableValue[j];
			if(noBorderTableValue.length > 1){
				lRow.appendChild(addendNoBorderTr("title",vtd));
				lRow.appendChild(addendNoBorderTr("value",vtd));
				if(noBorderTableValue[j+1]){
					lRow.appendChild(addendNoBorderTr("title",noBorderTableValue[j+1]));
					lRow.appendChild(addendNoBorderTr("value",noBorderTableValue[j+1]));
				}
				j++;
			}else{
				lRow.appendChild(addendNoBorderTr("title",vtd));
				lRow.appendChild(addendNoBorderTr("value",vtd,3));
			}
			noBorderTable.appendChild(lRow);
		}
	}
	if(os.isAndroid || os.isPhone) {
		if($(window).width() > 480){
			console.log("平板");
			loadNoBorder_pad();
			
		}else{
			loadNoBorder_phone();
		}
	} else if(os.isTablet) {
		console.log("平板");
		loadNoBorder_pad();
	}else{
		loadNoBorder_pad();
	}

	bldbox.appendChild(noBorderTable);

	//创建办理单表格
	var Table = document.createElement('table');
	Table.className = "table-bld-body";
	var colgroup = document.createElement("colgroup");
	for (var i=0;i<4;i++) {
		var col = document.createElement("col");
		if(i==0 || i==2){
			col.style.width = "5rem";
		}else{
			col.style.width = "auto";
		}
		colgroup.appendChild(col);
	}
	Table.appendChild(colgroup);
	for(var i=0; i<tableValue.length; i++){
		var lRow = document.createElement('tr');
		var vtd = tableValue[i];
		if(vtd.vtype!="t-listtext" && vtd.vid!="subject" && vtd.vid!="mainSend" && vtd.vid!="copySend" && vtd.vcol=="" && tableValue[i+1] && tableValue[i+1].vcol=="" && tableValue[i+1].vtype!="t-listtext" && vtd.vtype != "t-noborder"){
			//一行四列
			lRow.appendChild(addendTr("title",vtd));
			lRow.appendChild(addendTr("value",vtd));
			lRow.appendChild(addendTr("title",tableValue[i+1]));
			lRow.appendChild(addendTr("value",tableValue[i+1]));
			i++;
		}else if(vtd.vtype=="t-listtext" && vtd.vcol=="not" && tableValue[i+1] && tableValue[i+1].vcol==""){
			//一行三列
			lRow.appendChild(addendTr("title",vtd));
			lRow.appendChild(addendTr("value",vtd,2));
			lRow.appendChild(addendTr("super",tableValue[i+1]));
			i++;
		}else if(vtd.vtype != "t-noborder"){
			//一行两列
			lRow.appendChild(addendTr("title",vtd));
			lRow.appendChild(addendTr("value",vtd,3));
		}
		Table.appendChild(lRow);
	}
	bldbox.appendChild(Table);
	initTemplet(formVals);
	
}
function addendTr(types,vtd,col){
	//拼接表格
	if(types=="title"){
		var valTd = document.createElement('td');
		valTd.className = "td-title";
		valTd.innerHTML = vtd.vname;
		// if(vtd.vtype=="t-listtext"){
		// 	var arr = vtd.vname.split("");
		// 	//valTd.innerHTML = arr.join("<br />");
		// 	valTd.innerHTML = vtd.vname;
		// }else{
		// 	var titleTd = document.createTextNode(vtd.vname);
		// 	valTd.appendChild(titleTd);
		// }
		return valTd;
	}else if(types == "value"){
		var vtds = vtd.vid.split(";");
		var lLine = document.createElement('td');
		lLine.className = "td-value";
		if(col){lLine.setAttribute('colspan',col);}
		$.each(vtds,function(v,vt){
			var divNode = document.createElement('div');
			if(vt.indexOf(",") > -1){
				divNode.id = "v-" + getFormKeyId(vt.split(",")[1]);
				divNode.setAttribute('vkey', vt.split(",")[1]);
				divNode.setAttribute('vlabel',vt.split(",")[0]);
			}else if(vt.indexOf("[") > -1){
				let key = vt.substring(vt.indexOf("[")+1,vt.indexOf("]"));
				divNode.id = "v-" + getFormKeyId(key);
				divNode.setAttribute('vkey', vt);
			}else{
				divNode.id = "v-" + getFormKeyId(vt);
				divNode.setAttribute('vkey', vt);
			}
			if(vtd.vdata){
				divNode.setAttribute('vdata', vtd.vdata);
			}
			divNode.setAttribute('type', vtd.vtype);
			lLine.appendChild(divNode);
		});

		/*var divNode = document.createElement('div');
		divNode.id = "v-" + getFormKeyId(vtd.vid);
		divNode.setAttribute('vkey', vtd.vid);
		divNode.setAttribute('type', vtd.vtype);
		var lLine = document.createElement('td');
		lLine.className = "td-value";
		if(col){lLine.setAttribute('colspan',col);}
		lLine.appendChild(divNode);*/
		return lLine;
	}else if(types == "super"){
		var divNode = document.createElement('div');
		divNode.id = "v-" + getFormKeyId(vtd.vid);
		divNode.setAttribute('vkey', vtd.vid);
		divNode.setAttribute('type', vtd.vtype);
		var lLine = document.createElement('td');
		lLine.className = "td-value td-super";
		lLine.appendChild(divNode);
		return lLine;
	}
}
function addendNoBorderTr(types,vtd,col){
	//拼接表格
	if(types=="title"){
		var valTd = document.createElement('td');
		valTd.className = "td-title noborder";
		if(vtd.vtype=="t-listtext"){
			var arr = vtd.vname.split("");
			valTd.innerHTML = arr.join("<br />");
		}else{
			var titleTd = document.createTextNode(vtd.vname);
			valTd.appendChild(titleTd);
		}
		return valTd;
	}else if(types == "value"){
		var vtds = vtd.vid.split(";");
		var lLine = document.createElement('td');
		lLine.className = "td-value noborder";
		if(col){lLine.setAttribute('colspan',col);}
		$.each(vtds,function(v,vt){
			var divNode = document.createElement('div');
			if(vt.indexOf(",") > -1){
				divNode.id = "v-" + getFormKeyId(vt.split(",")[1]);
				divNode.setAttribute('vkey', vt.split(",")[1]);
				divNode.setAttribute('vlabel',vt.split(",")[0]);
			}else{
				divNode.id = "v-" + getFormKeyId(vt);
				divNode.setAttribute('vkey', vt);
			}
			divNode.setAttribute('type', vtd.vtype);
			lLine.appendChild(divNode);
		});

		/*var divNode = document.createElement('div');
		divNode.id = "v-" + getFormKeyId(vtd.vid);
		divNode.setAttribute('vkey', vtd.vid);
		divNode.setAttribute('type', vtd.vtype);
		var lLine = document.createElement('td');
		lLine.className = "td-value";
		if(col){lLine.setAttribute('colspan',col);}
		lLine.appendChild(divNode);*/
		return lLine;
	}else if(types == "super"){
		var divNode = document.createElement('div');
		divNode.id = "v-" + getFormKeyId(vtd.vid);
		divNode.setAttribute('vkey', vtd.vid);
		divNode.setAttribute('type', vtd.vtype);
		var lLine = document.createElement('td');
		lLine.className = "td-value noborder td-super";
		lLine.appendChild(divNode);
		return lLine;
	}
}
function getFormKeyId(vid){
	var divId = "";
	var orLen = vid.indexOf("&");//或者 +
	var childLen = vid.indexOf(".");//子集 -
	if(orLen > -1){
		divId = vid.substring(0,orLen);//A&B ==> A
		if(childLen > -1){//A.x&A.y ==> A
			divId = divId.substring(0,childLen);
		}
	}else{
		divId = vid;//A ==> A
		if(childLen > -1){//A.x ==> A
			divId = divId.substring(0,childLen);
		}
	}
	return divId;
}
function getFormValue(val){
	if(Forms.urgerTaskNodes){
		if(!(val=="subject" || val=="deadlineTime" || val=="mainHandleObjectName")){
			if(Forms.urgerTaskNodes[0].urgerTaskFeedbacks[0]){
				Forms= Forms.urgerTaskNodes[0].urgerTaskFeedbacks[0];
			}else{
				return '';
			}
		}
	}
	if(val == "frontRangeDate"){//出差审批-出差时间
		let frontRangeDate = Forms.travelAddress[0][val];
		return frontRangeDate[0] + " 至 " + frontRangeDate[1];
	}
	val = val.replace("ToString","");
	if(val.indexOf("&")>-1){
		var tempArray = val.split("&");
		return Forms[tempArray[0]]?Forms[tempArray[0]]:(Forms[tempArray[1]]?Forms[tempArray[1]]:"")
	}else if(val.indexOf("-")>-1){
		var tempArray = val.split("-");
		var tempB = [];
		$.each(tempArray,function(x,obj){
			if(Forms[obj] && Forms[obj]!="null"){
				tempB.push(Forms[obj]);
			}else{
				tempB.push("");
			}
		});
		return tempB.join(",");
	}else if(val.indexOf("[")>-1){
		var tempArray = val.split("[");
		let key = val.substring(val.indexOf("[")+1,val.indexOf("]"));
		if(Forms[tempArray[0]]){
			return toArr(Forms[tempArray[0]])[key];
		}else{
			return "";
		}
	}else if(Forms[val]){
		if(val=="mainSend"||val=="copySend"){
			return Forms[val].join(",");
		}else if(val=="mainParts"){
			var backval=[];
			val = "mainParts";
			$.each(Forms[val], function(i,obj) {
				backval.push(obj.item+"("+obj.price+")");
			});
			return (backval.join(","));
		}
		// else if(val=="sendTime"){
		// 	return new Date(Forms[val]);
		// }
		else{
			return Forms[val];
		}
	}else{
		return '';
	}
}
function getEnumsVal(vid,selectForm,type){
	//枚举型数据展示获取
	try{
		if(type=="checkbox"){
			$.each(selectForm, function(i,item) {
				if(item.name == vid){
					var temp = Forms[vid].split(",");
					var tempVal = [];
					$.each(item.val, function(x,obj) {
						$.each(temp, function(k,val) {
							if(val == obj.itemValue){
								tempVal.push(obj.itemName);
							}
						});
					});
					Forms[vid] = tempVal.join(",");
				}
			});
		}else{
			$.each(selectForm, function(i,item) {
				if(item.name == vid){
					$.each(item.val, function(x,obj) {
						if(Forms[vid] == obj.itemValue){
							Forms[vid] = obj.itemName;
						}
					});
				}
			});
		}
	}catch(e){
		return false;
	}
}

function initTemplet(formVals){
	if(typeof(formVals)!='undefined'){
		// Forms=Forms.urgerTasks[addnum].urgerTaskNodes[0].urgerTaskFeedbacks[0];
		Forms = formVals;
		console.log(Forms)
	}
	try{var isSignFlag = isPad();}catch(e){var isSignFlag = true;}
	if(handleId == ""){
		handleId = "Bldbox";
	}
	$("#" + handleId + " .td-value div").each(function(){
		var thisId = $(this).attr("id");
		var thisVal = $(this).attr("vkey");
		var fname = thisId.substring(2);
		var thisType = $(this).attr("type");
		var thisdata =  $(this).attr("vdata");
	    if(thisId.indexOf("v-")>-1){
	    	if(thisType=="t-checkbox"){
	    		//多选挂载数据
	    		getEnumsVal(fname,selectForm,"checkbox");
	    		var fvalue=(Forms[thisVal]==null)?'':Forms[thisVal];
	    		//只读模式
	    		new Vonlyread({propsData: {'Spans':{selected: fvalue}}}).$mount('#'+thisId);
	    	}else if(thisType=="t-select" || thisType=="t-radio"){
	    		//下拉挂载数据绑定
	    		getEnumsVal(fname,selectForm);
	    		var fvalue=(Forms[thisVal]==null)?'':Forms[thisVal];
	    		//只读模式
	    		new Vonlyread({propsData: {'Spans':{selected: fvalue}}}).$mount('#'+thisId);
	    	}else if(thisType=="none"){
				//var fvalue=(Forms['number']==null)?'':Forms['number'];
				var fvalue=fname
				new Vonlyread({propsData: {'Spans':{selected: fvalue}}}).$mount('#'+thisId);
			}else if(thisType=="t-input"){
	    		//挂载输入框数据绑定
				var fvalue=(Forms[thisVal]==null)?'':Forms[thisVal].toString();
	    		//只读模式
	    		new Vonlyread({propsData: {'Spans':{selected: fvalue}}}).$mount('#'+thisId);
	    	}else if(thisType=="t-span" || thisType=="t-noborder"){
	    		//挂载只展示数据
				var fvalue=getFormValue(thisVal).toString();
				//if(thisdata) { fvalue = thisdata.replaceAll(thisVal,fvalue)};
				if(thisVal == "isSupervise") {//是否督办
					fvalue = (fvalue == '1'? '是' : '否');
				}else if(thisVal == "amount") {//金额
					fvalue = (fvalue == '0'? '' : fvalue);
				}else if(thisVal == "liangHuaJinDu"){//量化
					fvalue = fvalue ? fvalue+'%' : '';
				}
				if(dateFormat.length != 0){
					$.each(dateFormat, function(i,item) {
						if(item.name == fname){
							//fvalue=(Forms[thisVal]==null)?'': (item.val != "" ? new Date(Forms[thisVal].replace(/-/g, "/")).Format(item.val.replace(/H/g, "h")) : Forms[thisVal]);
							if(Forms[thisVal]!=null){
								if(typeof(Forms[thisVal])== "string"){
									Forms[thisVal] = Forms[thisVal].replace(/-/g, "/");
								}
								fvalue = (item.val != "" ? new Date(Forms[thisVal]).Format(item.val) : new Date(Forms[thisVal]).Format("yyyy-MM-dd hh:mm"));	
								
							}
							
						}
					});
				}
				new Vonlyread({propsData: {'Spans':{selected: fvalue}}}).$mount('#'+thisId);			
			}else if(thisType=="t-span-button"){
	    		//挂载只展示数据和一个关联按钮 发改委专用
				var fvalue=getFormValue(thisVal);
				new Vspanbutton({propsData: {'Spans':{selected: fvalue}}}).$mount('#'+thisId);			
			}else if(thisType=="t-list"){//数组类型
	    		//挂载只展示数据
	    		var fvalue=getFormValue(fname);
				if(fvalue.length > 0){
					new Listonlyread({propsData: {'Spans':{selected: fvalue}}}).$mount('#'+thisId);
				}
	    	}else if(thisType=="t-span-list"){//t-span和t-list混合
				var son = [];
				var fvalueNew = "";
				//if(thisVal.indexOf(",")>-1){
				var fvalue = getFormValue(fname);
				var thisLabel = $(this).attr("vlabel");
				if(fvalue[0] && typeof fvalue[0] == "object"){
					new Listread({propsData: {'Spans':{selected: fvalue,label:thisLabel}}}).$mount('#'+thisId);
				}else{
					new SpanListonlyNread({propsData: {'Spans':{selected: fvalue,label:thisLabel}}}).$mount('#'+thisId);
				}
				//}else{
					//var fvalue=getFormValue(fname);
					//new VNread({propsData: {'Spans':{selected: fvalue}}}).$mount('#'+thisId);
				//}
			
	    	}else if(thisType=="t-nspans"){//1对多
	    		//挂载只展示数据
	    		var son = [];
				if(thisVal.indexOf("&")>-1){
					$.each(thisVal.split("&"),function(i,item){
						son.push(item.split(".")[1]);
					})
					var fvalue=getFormValue(fname);
					new VonlyNread({propsData: {'Spans':{selected: fvalue,son:son}}}).$mount('#'+thisId);
				}else{
					
				}
				
	    	}else if(thisType=="t-treeInput"){
	    		//多选树形
	    		if(Forms[thisVal]==null){
	    			new Vonlyread({propsData: {'Spans':{selected: ''}}}).$mount('#'+thisId);
	    		}else{
	    			var fvalue=eval(Forms[thisVal]);
	    			new Vonlyread({propsData: {'Spans':{selected: fvalue.join(",") }}}).$mount('#'+thisId);
	    		}	
	    	}else if(thisType=="t-treeInput-radio"){
	    		//单选树形
	    		var fvalue=(Forms[thisVal]==null)?'':Forms[thisVal];
	    		new Vonlyread({propsData: {'Spans':{selected: fvalue}}}).$mount('#'+thisId);
	    	}else if(thisType=="t-datepicker"){
				var fvalue = "";
				if(dateFormat.length != 0){
					$.each(dateFormat, function(i,item) {
						if(item.name == fname){
							//fvalue=(Forms[thisVal]==null)?'': (item.val != "" ? new Date(Forms[thisVal].replace(/-/g, "/")).Format(item.val.replace(/H/g, "h")) : Forms[thisVal]);
							if(Forms[thisVal]!=null){
								fvalue = Forms[thisVal].indexOf("T") > -1 ? new Date(Forms[thisVal]).Format("yyyy-MM-dd hh:mm") : new Date(Forms[thisVal].replace(/-/g, "/")).Format("yyyy-MM-dd hh:mm");
							}
							
						}
					});
				}else{
					fvalue=(Forms[thisVal]==null)?'': new Date(Forms[thisVal].replace(/-/g, "/")).Format("yyyy-MM-dd hh:mm");
				}
				
				//var fvalue=(Forms[thisVal]==null)?'':Forms[thisVal];
	    		new Vonlyread({propsData: {'Spans':{selected: fvalue}}}).$mount('#'+thisId);
	    	}else if(thisType == "t-datecalculate"){
				var fvalue = new Date(Date.parse(Forms["endTime"].replace(/-/g, "/")) - Date.parse(Forms["startTime"].replace(/-/g, "/")))/(24 * 60 * 60 * 1000);
				new Vonlyread({propsData: {'Spans':{selected: fvalue}}}).$mount('#'+thisId);
			}else if(thisType=="t-listtext"){
	    		//挂载意见数据绑定
			// console.info(thisVal)
				if(handleId == "Bldbox" || handleId == "OPBldbox"){
					Opinions = typeof(Opinions1) != "undefined" ?  Opinions1 : Opinions;
				}else if(handleId == "Bldbox2"){
					Opinions = typeof(Opinions2) != "undefined" ?  Opinions2 : Opinions;
				}
	    		$.each(Opinions, function(index,obj) {
	    			if(obj.opinionNo == thisVal){
						if(obj&&obj.value&&obj.value[0]){
							var dd=(obj.value[0].opinionContent).replace(/<\/?.+?>/g,"");
							obj.value[0].opinionContent=dd.replace(/ /g,"");
						}
						obj.value = sortByKeyNum(obj.value,"createTime","asc");//按时间正序排
					
						if(obj.opinionName.indexOf("委领导") > -1 || obj.opinionName.indexOf("签发意见") > -1){//委领导审批意见、签发意见 
							//过滤 传阅意见并且少于或等于两个字的意见
							obj.value = obj.value.filter(val => !(val.extension != null && val.extension.indexOf("handleUserName") > -1 &&  /^[\u4e00-\u9fa5]{0,2}\W$/g.test(val.opinionContent)) )
							obj.value.forEach((val) => {
								if(val.userSortNo==undefined){
                                    val.userSortNo = "9999999999999999999999999"
                                }
                                if(typeof(val.userSortNo)=="number"){
                                    val.userSortNo = val.userSortNo + "";
                                }

							})
							obj.value = sortByKeyNum(obj.value,"userSortNo","asc");
						}
						let opinionObj = {};
						obj.value.forEach((val) => {
							if(typeof(opinionObj[val.opinionDept])=="undefined") opinionObj[val.opinionDept]=[];
							opinionObj[val.opinionDept].push(val);

						})
						//console.info(obj.value[0].opinionContent)
	    				new Voption({propsData: {'Datas':{
								// listdata:obj.value,
								listdata:opinionObj,
								isEdit:obj.isEdit,
								opinionName:obj.opinionName,
								id:obj.id,
						        businessNo:obj.businessNo,
						        opinionNo:obj.opinionNo,
						        status:obj.status,
								thisid:thisId,
								isPad:isSignFlag,
								opinionToRead: obj.opinionToRead
//						        showIcon:true,
							}
						}}).$mount("#" + handleId + ' #'+thisId);
	    			}
	    		});
	    	}
	    }
	});
	//try{ Forms = FormsInit; }catch(e){}
}
/**********办理单模板************/
//意见模板(列表)
var Voption = Vue.extend({
	template:'<div :id="Datas.thisid"><div class="optionBox" v-for="(values,i) in Datas.listdata">'+	
				'<div v-if="Object.keys(Datas.listdata).length > 1">【{{i}}】</div>'+
				'<div  v-for="(val,j) in values">'+
				'<div v-if="val.imageContent"><img class="imgcss"  :id="Datas.thisid+j" :width=getWidth(val.imageContent,Datas.thisid+i) :src="toBase64(val.imageContent)"/></div>'+
				'<div v-else>{{txtReplace(val.opinionContent)}}'+
				'<span> - </span>' +
				'<span class="rj-opuser">{{val.opinionUser}}  {{chackListTime(val.createTime)}}</span></div>'+
				
				'<div v-show="val.IsEdit" class="rj-opbtns">'+
					'<span @click="delOption(Datas,val)" class="baseIcon delIcon"></span><span v-show="!val.imageContent" @click="revOption(Datas,val)" class="baseIcon editIcon"></span></div>'+
				'</div>'+
				'</div>'+	
				'<div v-show="Datas.isEdit" class="rj-opbtns">'+

					//'<span @click="newOption(\'HW\',Datas)" class="rj-opinput">手写输入</span>'+
					'<span v-if="Datas.opinionToRead" @click="OpenWebView(\'/ReadSendPage.html?isLeader=true\')" class="rj-opinput">输入意见</span>'+
					'<span v-else @click="newOption(\'ADD\',Datas)" class="rj-opinput">输入意见</span>'+
				
				'</div>'+
				
			'</div>',
	// template:'<div :id="Datas.thisid"><div class="optionBox" v-for="(val,i) in Datas.listdata">'+	
	// 		'<div v-if="val.imageContent"><img class="imgcss"  :id="Datas.thisid+i" width="50%" :src="toBase64(val.imageContent)"/></div>'+
	// 		'<div v-else>{{txtReplace(val.opinionContent)}}'+
	// 		'<span> - </span>' +
	// 		'<span class="rj-opuser">{{val.opinionUser}}  {{chackListTime(val.createTime)}}</span></div>'+

	// 		'<div v-show="val.IsEdit" class="rj-opbtns">'+
				
	// 			'<span @click="delOption(Datas,val)" class="baseIcon delIcon"></span><span v-show="!val.imageContent" @click="revOption(Datas,val)" class="baseIcon editIcon"></span></div>'+

	// 			'<div class="rj-opuser">{{val.opinionUser}}  {{chackListTime(val.createTime)}}</div>'+
				
	// 		'</div>'+

	// 		'<div v-show="Datas.isEdit" class="rj-opbtns">'+

	// 			//'<span @click="newOption(\'HW\',Datas)" class="rj-opinput">手写输入</span>'+
			
	// 			'<span @click="newOption(\'ADD\',Datas)" class="rj-opinput">键盘输入</span>'+
				
	// 		'</div>'+
			
	// 	'</div>',
	props : ['Datas'],
	methods: {
		getWidth:function(obj,id){
			var img = new Image();
			img.src=obj;
			img.onload=function(){
				width=img.width/window.devicePixelRatio;
				var divwidth=$("#"+id.substring(0,id.length-1)).width();
				if(width>divwidth){
					$("#"+id).width(divwidth)					
				}else{
					$("#"+id).width(width)					
				}				
			}
		},
		delOption:function (datas,val) {
			var temp=JSON.parse(JSON.stringify(datas));
			temp.listdata=val;
			var param= {option:"DEL",data:temp}
			htmlPostMessage(param);
		},
		revOption:function(datas,val){
			var temp=JSON.parse(JSON.stringify(datas));
			temp.listdata=val;
			var param= {option:"UPDATE",data:temp}
			htmlPostMessage(param);
		},
		newOption:function(type,datas){//val={option:"",data:""}
			var temp=JSON.parse(JSON.stringify(datas));
			temp.listdata='';
			var param= {option:type,data:temp}
			htmlPostMessage(param);
		},
		chackListTime:function(tempTime){
			var _time='';
			//_time=(tempTime.indexOf(" ")>-1)?tempTime.substr(0,tempTime.indexOf(" ")):tempTime;		
			_time=(tempTime && tempTime.lastIndexOf(":")>-1)?tempTime.substr(0,tempTime.lastIndexOf(":")):tempTime;	
			return _time;
		},
		toBase64:function(val,to64){
			if(val!=""){
				if(to64){val = "data:image/png;base64,"+ val;}
				return val
			}else{
				return '';
			}
		},
		txtReplace:function(val){
			if(val){
				val = val.replace(/&nbsp;/g, "");
				return val.replace(/<[^>]+>/g, "");
			}else{
				return ""
			}
		}
   }
});
function htmlPostMessage(param){//传参
	if(param.option=="ADD"){
		//新增键盘意见
		HandWrieting.writeOpinion(param.data);
	}else if(param.option=="HW"){
		//新增手写意见
		HandWrieting.clickOpinion(param.data);
	}else if(param.option=="UPDATE"){
		//修改意见
		HandWrieting.writeOpinion(param.data,param.data.listdata);
	}else if(param.option=="DEL"){
		//删除意见
		HandWrieting.deleteOpinion(param.data);
	}else if(param.option=="AllHW"){
		//全屏手写意见
		HandWrieting.clickOpinion(param.data,true);
	}else if(param.option=="LUPDATE"){
		//领导确认
		HandWrieting.LwriteOpinion(param.data,param.data.listdata);
	}else if(param.option=="LHW"){
		//领导修改
		if(param.data.listdata[0].imageContent){
			//手写意见需要替换
			console.info("leaderReWriet")
			param.data.leaderReWriet = "Handle";
			HandWrieting.clickOpinion(param.data);
		}else{
			HandWrieting.writeOpinion(param.data,param.data.listdata[0]);
		}
	}
}
//输入框模板
var Vinput = Vue.extend({
	template: '<div @mouseover="showXiala" class="mouse">'+
		'<span class="rj-span" v-show="!Spans.isShow">{{Spans.selected}}</span>'+
		'<input v-show="Spans.isShow" v-on:blur="hideInput()" v-model="Spans.selected" class="rj-input" /></div>',
	props : ['Spans'],
	methods: {
		hideInput:function () {
			this.Spans.isShow=false;
		},
		showXiala:function(){
			this.Spans.isShow=true;
	    }
	}
});
//下拉选择框模板
var Vselect = Vue.extend({
	template: '<div @mouseover="showXiala" class="mouse"><span id="urgenLevel" v-model="Selli.selected" class="sel-val">{{ Selli.selected }}</span><span v-show="Selli.isShow" class="sel-icon iconfont icon-xiala"></span>'+
				'<div class="sel-css" v-show="Selli.isShow">'+
					'<div class="sel-li" v-for="option in Selli.options" v-on:click="hideSelect(option.itemValue)">{{ option.itemName }}</div>'+
				'</div></div>',
	props : ['Selli'],
	methods: {
		hideSelect: function (val) {
			this.Selli.selected=val;
			this.Selli.isShow=false;
		},
		showXiala:function(){
			this.Selli.isShow=true;
	    }
	}
});

//只读数据模板
var Vonlyread = Vue.extend({
	template: '<span class="rj-span">{{Spans.selected}}</span>',
	props : ['Spans'],
	methods: {}
});
//带按钮模板
var Vspanbutton = Vue.extend({
	template: '<span class="rj-span">{{Spans.selected}}<span style="display: inline-block;padding: .1rem .3rem; background: #5462E7;border-radius: 0.2rem;color: #CDD1F8;  float: right;font-size: .7rem;" @click="openwebview()">关联</span></span>',
	props : ['Spans'],
	methods: {
		openwebview(){
			OpenWebView("relative.html");
		}
	}
});
//只读1对多数据模板
var VonlyNread = Vue.extend({
	template:'<div><div v-for="(item,index) in Spans.selected"><span v-for="(itemSon,index) in Spans.son">{{item[itemSon]}}</span></div></div>',
	props : ['Spans'],
	methods: {}
});
//只读1对多数据模板 同时并存
var VNread = Vue.extend({
	template:'<div><div style="min-height: 36px; line-height: 36px; text-align: left; width: 100%; padding-left: 16px;" v-for="(item,index) in Spans.selected" v-if="index!=2"><div>{{item}}</div></div><div v-for="(item,index) in Spans.selected" v-if="index==2"><div style="min-height: 36px; line-height: 36px; text-align: right; width: 100%; padding-left: 16px;">{{item}}</div></div></div>',
	props : ['Spans'],
	methods: {}
});

//数组只读数据模板
var Listonlyread = Vue.extend({
	template:'<div><div v-for="(item,index) in Spans.selected"><td class="td" style="text-align: center; padding-left: 0">议题{{index+1}}<br><span v-if="index == 0">({{new Date(Forms.startTime).Format("hh:mm") || ""}} - {{issueTimeFormatter(Forms.startTime,item.reportTime,true) }})</span><span v-else>({{issueTimeFormatter(Forms.startTime,Spans.selected[index-1].reportTime,true)}} - {{issueTimeFormatter(issueTimeFormatter(Forms.startTime,Spans.selected[index-1].reportTime),item.reportTime,true) }})</span></td><td class="td"  colspan="3"><div style="padding: 10px 0;cursor: pointer"><span style="color:#5462E7">{{item.subject}}</span><br>(汇报时间：{{item.reportTime}}分钟，汇报人：{{item.reportUser}})</div></td></div></div>',
	props : ['Spans'],
	methods: {}
});
//span和list混合数据模板
var SpanListonlyNread = Vue.extend({
	template:'<div><div style="padding-bottom: 7px">{{Spans.label}}{{Spans.selected && Spans.selected.length != 0 ? Spans.selected.join("、") : "无"}}；<br></div></div>',
	props : ['Spans'],
	methods: {}
});
//span和list混合数据模板
var Listread = Vue.extend({
	template:'<div><div v-for="(item,index) in Spans.selected" style="padding-bottom: 7px">议题{{index+1}}：{{item.reportOrgList && item.reportOrgList.length != 0 ? item.reportOrgList.join("、") : "无"}}；<br></div></div>',
	props : ['Spans'],
	methods: {}
});
//调用oa原模板下的form判断
var vHtml = Vue.extend({
	template:'<div :id="id" style="display:none;" v-html="htmldom"></div>',
	//template:'<div :id="id" v-html="htmldom"></div>',
	props : ['id','Spans','forms','callback'],
	data(){
		return {
			htmldom:''
		}
	},
	created() {
		let that = this;
		this.htmldom = this.Spans.selected;
		this.$nextTick(() => {
			new Vue({
				el: '#'+that.id,
				data: {
					form: that.forms,
					options:{},
					setting:{}
				},
				mounted() {
					that.callback();
				}
			});
	 	})
	},
});

function issueTimeFormatter(startTime,reportTime,isFormatter){
	if(isFormatter){
		return new Date(new Date(startTime).getTime() + (reportTime)*60*1000).Format("hh:mm");
	}else{
		return new Date(new Date(startTime).getTime() + (reportTime)*60*1000);
	}
	
}
/**********办理单模板************/