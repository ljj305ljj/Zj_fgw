/**
 *正文批注接口调用
 *pdfPath  pdf文件地址
 *userName  批注人
 *tableKeyId  业务id
 *name 正文名
 *filenewname 重新命名
 *basePath  app应用名 oaurl
 *stepId 流程环节
 *type  批注类型,true表示不批注,false批注
 *tableName 业务表名
 *fileType文件类型
 *directoryName 附件存放目录
 * */
var globa = {};
function PDFNotation(pdfPath, userName, type, filename, filenewname, basePath,docId, stepId,moduleId,fileType,extension,token) {
    globa.userName = userName;
    globa.FileName = filename; //正文名字
    globa.FileNewName = filenewname; //正文名字
    globa.AppPath = basePath; //oaurl
    globa.docId = docId;
    globa.stepId = stepId; //步骤ID
    globa.ModuleId = moduleId;
    globa.FileType = fileType;
    globa.Extension = extension;
    globa.Token = token;
	globa.type=type;
	let userInfo = JSON.parse(localStorage.getItem('userInfo'));
	var isSupportPen=false;
	if(/SCM-AL09|CMR-AL19/i.test(navigator.userAgent)) {//支持手笔分离的设备
		isSupportPen=true;
	}	
	 dingAuth(function(){
		dd.ready(function() {
				try{dd.biz.util.startDocSign({
					mode: 0,
					url: pdfPath,
					userName: userName,
					copyRight: jgAuth.copyRight,  //金格授权码
					isSupportPen:isSupportPen,//是否手笔分离
					onSuccess: function(result) {
						if(!result.url || result.url == '') {
							return;
						}	
						wispApp.UI.showProgressDialog("文件上传中...");	
						uploadPdfFile(globa,result)
					   // self.uploadPdfFile(_this, result, _this.mainFile[0]);
					},
					onFail: function(err) {
						if(err.errorCode == '7') {
							alert('DD error:'+JSON.stringify(err)+'，请手动刷新');
						}else {
							alert('DD error:'+JSON.stringify(err));
						}
					}
				})
				}catch(e){alert(e.description)}
			})
	 })
	 dd.error(function(err) {										//alert("应用编号<br>corpId"+corpId+"<br>timeStamp"+timeStamp+"<br>nonceStr"+nonceStr+"<br>signature"+signature);
		alert('dd error: ' + JSON.stringify(err));
	});
       
}
 function uploadPdfFile(url, result, item, page) {
		globa.fileName=(result.url).substr((result.url).lastIndexOf(".")+1);
		header={"Content-Type":"application/octet-stream","docId":App.LS.get("docId"),"isHeadere":"true","fileName":globa.FileNewName,"x-auth-token":getCookieValue("x-auth-token"),"moduleId":App.LS.get("module"),"type":globa.FileType,"extension":globa.Extension};		
		//var json={"fileUrl":result.url,"postUrl":innerOA + ZjgyUrl['File-upload'],"header":header};	
		//mgr调用的是此接口：c5186ba30b16474db5834b26d26b1d1c", /*文件上传，调用客户端上传---/egovAtt/uploadEgovAttFileWithFileStream*/
		var purl = "http://120.27.250.89:8181/drsp-ebsm-server/api/services/c5186ba30b16474db5834b26d26b1d1c";
		//var purl = "http://60.191.98.251:6010/channel/N6dxBQDmuH/egovAtt/uploadEgovAttFileWithFileStream";
		//var purl = ZjgyHost + ZjgyUrl['gy050'];
		//alert(purl)
		if(App.LS.get("mobile")=="U039275"){
			//purl = "http://60.191.98.251:6010/channel/N6dxBQDmuH/egovAtt/uploadEgovAttFileWithFileStream";
			alert(purl)
			var postUrl=mgrUrl+"/wisp_mgr/system/sys_uploadDingFile?fileUrl="+encodeURIComponent(result.url)+"&postUrl="+encodeURIComponent(purl)+"&header="+encodeURIComponent(JSON.stringify(header));
			$.getJSON(postUrl, function(json){	
				if(json.success){				
					DeletePdf();
				}else{
					toast("文件上传失败",3000);
					try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				}
			});
		}else{
			var postUrl=mgrUrl+"/wisp_mgr/system/sys_uploadDingFile?fileUrl="+encodeURIComponent(result.url)+"&postUrl="+encodeURIComponent(purl)+"&header="+encodeURIComponent(JSON.stringify(header));
			$.getJSON(postUrl, function(json){	
				if(json.success){				
					DeletePdf();
				}else{
					toast("文件上传失败！",3000);
					try {wispApp.UI.dismissProgressDialog();} catch(e) {}
				}
			});
		}
    }

function DeletePdf() { //pdf上传初始化init d盘地址
	if(App.LS.get("DeleteFileId")){
		//alert(1)
		var _url = ZjgyHost + ZjgyUrl["File-del"];
		var obj = [];
		obj.push(App.LS.get("DeleteFileId"))
		ajaxRequst(_url,'post','','json',JSON.stringify(obj)).then((json) => {
		 	vFile.initPdfPage();
		});
	}else{
		//alert(2)
		vFile.initPdfPage();
	}
}

