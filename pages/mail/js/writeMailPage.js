// 初始化vConsole
// if (/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
// 	window.vConsole = new window.VConsole({
// 		defaultPlugins: ['system', 'network', 'element', 'storage'], // 可以在此设定要默认加载的面板
// 		maxLogNumber: 1000,
// 		// disableLogScrolling: true,
// 		onReady: function () {
// 			console.log('vConsole is ready.');
// 		},
// 		onClearLog: function () {
// 			console.log('on clearLog');
// 		}
// 	});
// }
var docInfor = toArr(App.LS.get("docInfor"));
var thisModule = App.LS.get("module");
// alert($($("#mail-text").val()).text()) 
// var Form = docInfor.form;
var mailWrite = new Vue({
	el: '#mail',
	data() {
		return {
			docInfor: '',
			attachList: [],
			backchecked: false,
			ssmchecked: false,
			treeType: '1',
			mailType: App.LS.get('mailSendType'),
			toAddress:"",//收件人
			ccMailAddress:"",//抄送
			bccMailAddress:"",//密送
			autoCompleteList:[],//自动补全 emaill列表
			isShowAutoCompleteList : false,
			isShowAutoCompleteList2 : false,
			isShowAutoCompleteList3 : false
		}
	},
	watch:{
		toAddress(newValue, oldValue){
			if(newValue != ""){
				this.autoCompleteList = emailOrgArray.filter(org => (org.email.indexOf(newValue) > -1 || org.treeName.indexOf(newValue) > -1));
			}else{
				this.autoCompleteList = [];
			}
			this.isShowAutoCompleteList = this.autoCompleteList.length == 0 ? false : true;
			//console.log(this.autoCompleteList)
		},
		ccMailAddress(newValue, oldValue){
			if(newValue != ""){
				this.autoCompleteList = emailOrgArray.filter(org => (org.email.indexOf(newValue) > -1 || org.treeName.indexOf(newValue) > -1));
			}else{
				this.autoCompleteList = [];
			}
			this.isShowAutoCompleteList2 = this.autoCompleteList.length == 0 ? false : true;
			//console.log(this.autoCompleteList)
		},
		bccMailAddress(newValue, oldValue){
			if(newValue != ""){
				this.autoCompleteList = emailOrgArray.filter(org => (org.email.indexOf(newValue) > -1 || org.treeName.indexOf(newValue) > -1));
			}else{
				this.autoCompleteList = [];
			}
			this.isShowAutoCompleteList3 = this.autoCompleteList.length == 0 ? false : true;
			//console.log(this.autoCompleteList)
		}
	},
	mounted: function () {
		fontSizeSet.initFontSize();	
		this.getSentInfo();
		console.log(App.LS.get('listInfo'))
		//openBackMail()
		switch (App.LS.get('mailSendType')) {
			case 'back':
				this.getDocInfor('back');
				openBackMail();
				break;
			case 'turn':
				this.getDocInfor();
				this.openTurnMail1();
				break;
			case 'draft':
				openDraftMail();
				break;
			case 'fromDraft':
				this.getDocInfor('fromDraft');
				openFromDraftMail();
				break;
		}



	},
	methods: {
		hideAutoComoleteList(){//失去焦点后执行
			setTimeout(() =>{
				this.isShowAutoCompleteList = false;
				this.isShowAutoCompleteList2 = false;
				this.isShowAutoCompleteList3 = false;
			},100)
		},
		selectAddress(obj,type){ //选择邮件地址
			sendType = type;
			this.toAddress = "", this.ccMailAddress = "", this.bccMailAddress = "";
			$(".people-tree").find('.people-lab[data-treeid="' + obj.treeId + '"]').addClass("tree-act");
			labelAddClass(obj.treePid, obj.treeId, obj.email, obj.treeName);
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
			
		},
		copyMailFile1(oldId) {
			var that = this;
			var mailId = App.LS.get("newMailId");
			var openUrl = ZjgyHost + ZjgyUrl["copy-mailfile"] + "?sourceDocId=" + oldId + "&targetDocId=" + mailId;
			var obj = {
				sourceDocId: oldId,
				targetDocId: mailId
			}
			console.log('copyMailFile1')
			$.ajax({
				url: openUrl,
				dataType: 'json',
				type: 'post',
				beforeSend: function (xhr) {
					xhr.setRequestHeader("x-auth-token", getCookieValue("LtpaToken"));
				},
				data: JSON.stringify(obj),
				contentType: 'application/json;charset=UTF-8',
				success: function (jsons) {
					console.log('1111')
					that.getAttachList()


				},
				error: function (e) {
					try { wispApp.UI.dismissProgressDialog(); } catch (e) { };
					//toast("网络开小差，附件获取异常！");
				}
			});
		},
		openTurnMail1() {
			console.log('1')
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
			this.copyMailFile1(datas.id);
			bindWritePage();
		},
		// 获取发件人信息
		getSentInfo() {
			var _this = this;
			ajaxRequst(ZjgyHost + ZjgyUrl["newmail-user"], 'GET', 'application/x-www-form-urlencoded', 'json', '').then(function (json) {
				//console.log(json);
				App.LS.set('sentInfo', JSON.stringify(json));
			});
		},
		initFileList(item) {
			var _this = this;
			$.each(this.attachList, function (i, item) {
				// item.url=item.URL;
				item.url = innerOA + ZjgyUrl["File-download"] + '?id=' + item.id + "&x-auth-token=" + getCookieValue("x-auth-token");
				item.fileSuffix = item.fileSuffix.toLowerCase();
				item.fileTask = _this.getFileTask(item.fileSuffix);
				item.fcsUrl = fcsurl + 'fileurl=' + encodeURIComponent(item.url) + '&task=' + item.fileTask + '&type=src&res=url&filetype=' + item.fileSuffix + '&jsoncallback=?';
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
		openFile: function (fileObj) {

			// if (fileObj.pdfurl != "" && fileObj.pdfurl != "converFail") {
			//   App.LS.set('goPdfh5', 1)
			//   window.location.href = './pdfh5/pdfh5.html?fileUrl=' + fileObj.pdfurl + '&fileTitle=' + fileObj.title;
			// } else if (fileObj.pdfurl == "") {
			//   this.getPdfUrl(fileObj, 'open');
			// }

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
						fileObj.pdfurl = outerBasehost + '/wisp_fcs/conversion/conved/' + result.Content;
					}
				},
				error: function (error) {
					//								try{wispApp.UI.dismissProgressDialog();}catch(e){}
					toast("数据加载出错，请刷新重试！");
					//								console.log(error);
				}
			})
		},
		mailWritBack() {
			closePage("refreshList()");
		},
		getDocInfor(type) {
			var url = '';
			if (type == "fromDraft") {
				url = ZjgyHost + ZjgyUrl["mail-wj-draft"] + "?id=" + JSON.parse(App.LS.get('listInfo')).id
			} else {
				url = ZjgyHost + ZjgyUrl["mail-wj"] + "?id=" + JSON.parse(App.LS.get('listInfo')).id + "&type=1"
			}
			var _this = this;
			ajaxRequst(url, 'GET', 'application/x-www-form-urlencoded', 'json', '').then(function (json) {
				App.LS.set("docInfor", JSON.stringify(json));
				console.log(json);
				_this.docInfor = json;
				if(type == "back" || type == "turn"){//回复、转发
					openDraftMail(type);
				}else{
					_this.getAttachList(type);
				}
			});

		},
		getAttachList(type) {
			var id = '';
			var _this = this;
			if (type == "fromDraft") {
				id = JSON.parse(App.LS.get('listInfo')).id;
			} else if (type == "draft" || type == "back" || type == "turn") {
				id = App.LS.get('newMailId');
			} else {
				id = _this.docInfor.id;
			}

			ajaxRequst(ZjgyHost + ZjgyUrl["mail-attach"] + "?docId=" + id + "&containFile=false", 'GET', 'application/x-www-form-urlencoded', 'json', '').then(function (json) {
				console.log(json);
				_this.attachList = json.reverse();
				_this.$nextTick(function () {//textarea里面的html解析
					var $textarea = $("#mail-text");
					var html = $textarea.val();
					if(html.indexOf("<div>") == -1){html = "<div>" + html + "</div>"; }
					$textarea.val($(html).text());
				})
				_this.initFileList()
			});
		},
		/**
		 *  上传附件 
		 * */
		uploadFile1(mailType, event) {
			//try { wispApp.UI.showProgressDialog("上传中..."); } catch (e) { }
			toast("上传中...");
			// var _dd = $(source).parent().parent().parent();
			// var _key=$(source).attr("data-key");
			// var _type=$(source).attr("data-type");
			// var _unid=$(_dd).attr("data-unid");	
			console.log(event)
			var _this = this;
			var fileObj = event.target.files[0]; // js 获取文件对象
			var url = ZjgyHost + ZjgyUrl["mail-upload"]; // 接收上传文件的后台地址
			var fileName = fileObj.name;
			// var fileType = fileName.substr(fileName.lastIndexOf(".") + 1).toLowerCase();
			//if(!/txt|xls|doc|ppt|pdf/i.test(fileType)){//文件类型的控制
			//	alert("不支持此类型文件");
			//	return false;
			//}
			//var newfile = new File([fileObj],(new Date().getTime())+"."+fileType);//以文件名编码方式支持中文名字的文件。
			// $(source)[0].outerHTML = $(source)[0].outerHTML;
			//var re=/[\u0391-\uFFE5]+/g
			//if (newfile.name.match(re)!=null)alert('文件名不能包含汉字！')
			// var formData = eval("(" + App.LS.get("activeinfo") + ")");
			var form = new FormData(); // FormData 对象
			form.append("file", fileObj); // 文件对象
			form.append("type", 'attach');//formData.atts[0].type
			form.append("moduleId", 'EMAIL');
			if(mailType == "back" || mailType == "turn"){//回复和转发
				form.append("docId",App.LS.get('newMailId'));
			}else{
				form.append("docId", ((_this.docInfor && _this.docInfor.id) || App.LS.get('newMailId')));
			}
			// form.append("rules", rules);
			xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
			xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
			xhr.onload = function (data) {
				//try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
				toast("上传成功！");
				document.getElementById("file").value = '';//清空value,解决第二次无法上传同一份文的问题
				_this.getAttachList(mailType);
				//console.log(this.responseText);		
				// flaglist[0]=0
				// inforPage.loadActivePage(0,function(data,_key){
				// 	if(_key=="material"){
				// 		flaglist[2]=0;
				// 		inforPage.loadActivePage(2);
				// 	}else{
				// 		flaglist[3]=0;
				// 		inforPage.loadActivePage(3);
				// 	}
				// },_key);
				// ajaxRequst(ZjgyHost + ZjgyUrl["mail-attach"] + "?docId=" + App.LS.get('newMailId') + "&type=attach", 'GET', 'application/x-www-form-urlencoded', 'json', '').then(function (json) {
				//  console.log(json);
				//  _this.attachList = json;
				// });
				
			}; //请求完成
			xhr.onerror = function (evt) {//请求失败	
				try { wispApp.UI.dismissProgressDialog(); } catch (e) { }
				document.getElementById("file").value = '';
				toast("上传失败！");

			};
			xhr.upload.onloadstart = function () {//上传开始执行方法
				ot = new Date().getTime();   //设置上传开始时间
				oloaded = 0;//设置上传开始时，以上传的文件大小为0
			};
			xhr.send(form); //开始上传，发送form数据
		},
		/**
		 * 删除附件
		 * */
		deleteAttach(obj) {
			var objArr = [];
			var _this = this;
			objArr.push(obj);
			App.UI('dialog', {
				type: 'confirm',
				title: 'queren',
				OkTxt: '确认',
				CancelTxt: '取消',
				msg: '是否确认删除该附件?'
			}, function (_action) {
				if (_action === 'OK') {
					ajaxRequst(ZjgyHost + ZjgyUrl["mail-deleteAttach"], 'POST', 'application/json;charset=UTF-8', 'json', JSON.stringify(objArr)).then(function (json) {
						toast('删除附件成功！')
						_this.getAttachList(_this.mailType);
					});
				}
			});

		}
	}
});