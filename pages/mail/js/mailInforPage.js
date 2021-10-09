// var docInfor = toArr(App.LS.get("docInfor"));
var thisModule = App.LS.get("moduleId");
var mailType = App.LS.get('mailType');

if(location.search.indexOf("x-auth-token=") > -1){
	//alert(location.search)
	addCookie("x-auth-token", decodeURIComponent(getUrlParam("x-auth-token")), 7, "/");
	App.LS.remove("listInfo");
	mailType = "inbox";
	if(!App.LS.get('userInfo')){
		userInfo = {
			orgNo: getUrlParam("orgNo"),
			orgName: decodeURIComponent(getUrlParam("orgName")),
			phone: getUrlParam("phone"),
			userName: decodeURIComponent(getUrlParam("userName")),
			userId: getUrlParam("userId"),
			systemNo: getUrlParam("systemNo")
		}
		App.LS.set('userInfo',JSON.stringify(userInfo));
	}
	listInfo = {
		"id":getUrlParam("id")  || "",
	}
	App.LS.set("listInfo",JSON.stringify(listInfo));
}
var userInfo = toArr(App.LS.get('userInfo'));
var listInfo = toArr(App.LS.get('listInfo'));
// var Form = docInfor.form;
var vFlow = new Vue({
  el: '#mail',
  data() {
	return {
	  docInfor: '',
	  attachList: [],
	  mailType: mailType,
	  module: thisModule
	}
  },
  mounted: function () {
	fontSizeSet.initFontSize();	
	console.log(App.LS.get('listInfo'));
	this.updateMailInbox();
	this.getDocInfor();
  },
  methods: {
	openFile: function (fileObj) {
	  if (fileObj.pdfurl && fileObj.pdfurl != "" && fileObj.pdfurl != "converFail") {
		//window.location.href = './pdfh5/pdfh5.html?fileUrl=' + fileObj.pdfurl + '&fileTitle=' + fileObj.title;
		OpenWebView('pages/mail/pdfh5/pdfh5.html?fileUrl=' + fileObj.pdfurl + '&fileTitle=' + fileObj.fileName + '&userName=' + (userInfo.userName || userInfo.username) + '&phone=' + (userInfo.phone ? userInfo.phone.substring(7) : ''), "Detail", "文件查阅");
	  } else {
		this.getPdfUrl(fileObj, 'open');
	  }

	},
	getPdfUrl: function (fileObj, event) {
	  var _this = this;
	  $.ajax({
		type: "GET",
		url: fileObj.fcsUrl,
		dataType: "jsonp",
		jsonp: "jsoncallback",
		success: function (result) {
		  console.info(result)
		  if (result == "converFail" || result.Success === 'False' || result.Content === 'null') {
			fcsError(fileObj);
		  } else {
			//autoflag=true;
			fileObj.pdfurl = outerBasehost + '/wisp_fcs/QueryDocumentIntf?key=' + result.Content;
		  }
		},
		error: function (error) {
		  //								try{wispApp.UI.dismissProgressDialog();}catch(e){}
		  //toast("数据加载出错，请刷新重试！");
		  //								console.log(error);
		}
	  })
	},
	fcsError: function (fileObj) {
	  if (fileObj.autoflag && fileObj.fcsTransTime == 3) {
		toast("转换失败，重新发起.");
		fileObj.pdfurl = "converFail";
	  } else if (fileObj.autoflag) {
		this.getPdfUrl(fileObj);
	  }
	},
	initFileList(item) {
	  var _this = this;
	  $.each(this.attachList, function (i, item) {
		// item.url=item.URL;
		item.url = innerOA + ZjgyUrl["File-download"] + '?id=' + item.id + "&x-auth-token=" + getCookieValue("x-auth-token");
		item.fileSuffix = item.fileSuffix.toLowerCase();
		item.fileTask = _this.getFileTask(item.fileSuffix);
		item.fcsUrl = fcsurl + 'fileurl=' + encodeURIComponent(item.url) + '&task=' + item.fileTask + '&type=src&res=url&filetype=' + item.fileSuffix + '&reqType=app&jsoncallback=?';
		_this.getPdfUrl(item);
	  })
	},
	getFileTask: function (fileSuffix) {
	  var fileTask = "";
	  if (fileSuffix.indexOf('doc') > -1) {
		fileTask = "word2PDF"
	  } else if (fileSuffix.indexOf('wps') > -1) {
		fileTask = "wps2PDF";
	  } else if (fileSuffix.indexOf('xls') > -1) {
		fileTask = "excel2PDF";
	  } else if (fileSuffix.indexOf('xlsx') > -1) {
		fileTask = "excel2PDF";
	  } else if (fileSuffix.indexOf('ppt') > -1) {
		fileTask = "ppt2PDF";
	  } else if (fileSuffix.indexOf('ppt') > -1) {
		fileTask = "ppt2PDF";
	  } else if (fileSuffix.indexOf('pdf') > -1) {
		fileTask = "none";
	  } else if (fileSuffix.indexOf('jpg') > -1) {
		fileTask = "jpg2PDF";
	  } else if (fileSuffix.indexOf('jpeg') > -1) {
		fileTask = "jpg2PDF";
	  } else if (fileSuffix.indexOf('gif') > -1) {
		fileTask = "gif2PDF";
	  } else if (fileSuffix.indexOf('png') > -1) {
		fileTask = "png2PDF";
	  } else if (fileSuffix.indexOf('txt') > -1) {
		fileTask = "txt2PDF";
	  } else if (fileSuffix.indexOf('html') > -1) {
		fileTask = "html2PDF";
	  } else {
		fileTask = 1;
	  }
	  return fileTask;
	},
	/**
	 * 撤回邮箱   
	 **/
	relateMail() {
	  ajaxRequst(ZjgyHost + ZjgyUrl["relate-mail"] + "?_t=" + new Date().getTime() + "&id=" + JSON.parse(App.LS.get('listInfo')).id, 'GET', 'application/x-www-form-urlencoded', 'json', '').then(function (json) {
		toast("撤回成功！");
		closePage("refreshList()");
	  });
	},
	/**
	 *  获取邮箱详情
	 * */
	getDocInfor() {
	  var _this = this;
	  var url = '';
	  if (mailType == 'inbox') {
		url = ZjgyHost + ZjgyUrl["mail-wj-inbox"]
	  } else {
		url = ZjgyHost + ZjgyUrl["mail-wj-sent"]
	  }
	  ajaxRequst(url + "?id=" + listInfo.id + "&type=1", 'GET', 'application/x-www-form-urlencoded', 'json', '').then(function (json) {
		App.LS.set("docInfor", JSON.stringify(json));
		console.log(json);
		_this.docInfor = json;
	  });
	  ajaxRequst(ZjgyHost + ZjgyUrl["mail-attach"] + "?docId=" + listInfo.id + "&type=attach&containFile=false", 'GET', 'application/x-www-form-urlencoded', 'json', '').then(function (json) {
		console.log(json);
		_this.attachList = json.reverse();
		_this.initFileList()
	  });
	},
	/**
	 * 获取邮箱新id
	 * */
	mailNewID(type) {
	  ajaxRequst(ZjgyHost + ZjgyUrl["mail-newId"] + "?_t=" + new Date().getTime(), 'GET', 'application/x-www-form-urlencoded', 'json', '').then(function (json) {
		// alert(json);
		App.LS.set('newMailId', json)
		App.LS.set('MailID', json)
		App.LS.set('mailSendType', type);
		OpenWebView("pages/mail/writeMail.html", "write", "写邮件");
	  });

	},
	updateMailInbox(){//更改已读未读状态
		let data = {
			id:listInfo.id,
			mailIsSeen:"1"
		}
		ajaxRequst(ZjgyHost + ZjgyUrl["update-mail"], 'post', 'application/json;charset=UTF-8', 'json', JSON.stringify(data)).then(function (json) {
			// alert(json);
			console.log(json);
		  });
	}
  }
});