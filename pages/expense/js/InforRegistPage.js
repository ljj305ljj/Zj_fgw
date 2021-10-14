// 初始化vConsole
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
var userInfo = toArr(App.LS.get('userInfo'));
var docInfor = toArr(App.LS.get("docInfor"));
window.InforRegistPage=new Vue({ 
	el: '#InforRegistPage',
	data(){
		return{
			tabActive:0,
			tabnum:4,
			signJson: toArr(App.LS.get("signJson")) || toArr(docInfor.signJson) || {signJsonList:[]},//信息登记
			payMethodDetail:toArr(App.LS.get("payMethodDetail")) || toArr(docInfor.payMethodDetail) || [],//支付明细\
			formData:toArr(App.LS.get("formData")),
			totalExpenses: {//报销费用总计
				bussinessPeoples:[],//出差人
				businessLocation:[],//出差地
				detail:[
					{amount: 0,name: "交通费"},
					{amount: 0,name: "住宿费"},
					{amount: 0,name: "伙食补助"},
					{amount: 0,name: "公杂补助"},
					{amount: 0,name: "其他费用"},
					{amount: 0,name: "小计"},
				]//费用合计
			},
			isEdit: toArr(App.LS.get("isEdit")),//表单是否可编辑
			showCalendar:false,
			minDate: new Date(2010, 0, 1),
   			maxDate: new Date(2025, 0, 31),
			defaultDate: new Date(),
			calendarComponetName:"",//日历控件的字段名称
			userTrees:[],//人员组织结构
			isShowTreeSelect:false,//是否显示树形选择器
		}
	},
	watch:{
		'signJson':{
			handler(val) {
				if(val){
					console.log(val);
					this.detailAutoCalculation();
					this.calculateTotalExpenses();
				}
			},
			// immediate: true,
            deep:true,
		}
	},
	mounted() {
		
	},
	created(){	
		// wispApp.UI.showProgressDialog("正在加载页面数据...");
		fontSizeSet.initFontSize();	
		if(this.isEdit){ this.backListening(); }
		this.calculateTotalExpenses();
		getUserTrees(this);
	},
	methods:{
		formatDate(date) {
			return date.Format("yyyy-MM-dd");
		},
		showCalendarComponet(name){//显示日历控件
			this.showCalendar = true;
			this.calendarComponetName = name;
		},
		onConfirmCalendar(date){//确认日期
			this.showCalendar = false;
			// this.signJson.signJsonList[this.tabActive][this.calendarComponetName] = this.formatDate(date);
			if(this.calendarComponetName == "endDate"){
				if(this.signJson.signJsonList[this.tabActive].startDate){
					if(this.formatDate(date) >= this.signJson.signJsonList[this.tabActive].startDate){
						this.dateCalculate(date);
					}else{
						toast("开始日期不能大于结束日期！");
					}
				}else{
					this.signJson.signJsonList[this.tabActive][this.calendarComponetName] = this.formatDate(date);
				}
			}else if(this.calendarComponetName == "startDate"){
				if(this.signJson.signJsonList[this.tabActive].endDate){
					if(this.formatDate(date) <= this.signJson.signJsonList[this.tabActive].endDate){
						this.dateCalculate(date);
					}else{
						toast("开始日期不能大于结束日期！");
					}
				}else{
					this.signJson.signJsonList[this.tabActive][this.calendarComponetName] = this.formatDate(date);
				}
			}
		},
		dateCalculate(date){//日期填充和天数计算
			this.signJson.signJsonList[this.tabActive][this.calendarComponetName] = this.formatDate(date);
			let d = new Date(this.signJson.signJsonList[this.tabActive].endDate) - new Date(this.signJson.signJsonList[this.tabActive].startDate);
			d = d/3600000/24;
			this.signJson.signJsonList[this.tabActive].days = d + 1;
		},
		detailAutoCalculation(){//伙食补助、公杂补助的自动计算
			if(this.signJson && this.signJson.signJsonList && this.signJson.signJsonList[this.tabActive]){
				let days = this.signJson.signJsonList[this.tabActive].days;//出差天数
				let heaven = this.signJson.signJsonList[this.tabActive].heaven;//会议天数
				let qinghaiTibetBorderDay = this.signJson.signJsonList[this.tabActive].qinghaiTibetBorderDay;//青藏疆天数
				let vehiclesDay = this.signJson.signJsonList[this.tabActive].vehiclesDay;//公务派车天数
				let expenseAmountArray = this.signJson.signJsonList[this.tabActive].chargeDetails.detail;
				let hotelAmount = expenseAmountArray.filter(det => det.name == "住宿费")[0].amount;//住宿费
				let foodAmount = 0, publicAmount = 0, total = 0;//伙食补助报销金额，公杂补助报销金额，小计
	
				if(heaven > days){
					toast("会议天数应小于等于出差天数！");
					this.signJson.signJsonList[this.tabActive].heaven = 0;
					return false;
				}else if(vehiclesDay > days){
					toast("派车天数应小于等于出差天数！");
					this.signJson.signJsonList[this.tabActive].vehiclesDay = 0;
					return false;
				}
				if(days == 1){
					foodAmount = 100;
					publicAmount = 80;
				}else if(days >= 2){
					if(heaven == 0 && hotelAmount > 0){
						//伙食补助报销金额=青藏疆天数*120+（出差天数-青藏疆天数）*100；
						foodAmount = qinghaiTibetBorderDay * 120 + (days - qinghaiTibetBorderDay)*100;
						//公杂补助报销金额=出差天数*80-派车天数*40；
						publicAmount = days * 80 - vehiclesDay * 40;
					}else if(heaven == 0 && hotelAmount == 0){
						foodAmount = 0;
						publicAmount = 0;
					}else if(heaven > 0){
						//伙食补助报销金额=（出差天数-会议天数+2）*100；
						foodAmount = (days - heaven + 2) * 100;
						//公杂补助报销金额=（出差天数-会议天数+2）*80-派车天数*40；
						publicAmount = (days - heaven + 2) * 80 - vehiclesDay * 40;
					}
				}

				expenseAmountArray.forEach((det,d) => {
					if(det.name == "伙食补助"){
						det.amount = foodAmount;
					}else if(det.name == "公杂补助"){
						det.amount = publicAmount;
					}
					if(d == expenseAmountArray.length - 1){
						det.amount = total;//最后一个是小计
					}else{
						total += det.amount;
					}
				})
			}
			
		},
		calculateTotalExpenses(){//计算总报销费用（合计）
			let signJsonList = this.signJson && this.signJson.signJsonList && JSON.parse(JSON.stringify(this.signJson.signJsonList));
			if(signJsonList){
				this.tabnum = signJsonList.length;
				let bussinessPeoples = [],businessLocation = [];
				signJsonList.forEach((sign,s) => {
					sign.bussinessPeople && sign.bussinessPeople != "" && bussinessPeoples.push(sign.bussinessPeople);//出差人
					sign.addressList.detail.forEach(address => {
						address.endAddress && address.endAddress != "" && businessLocation.push(address.endAddress);//出差地
					});
					if(s == 0){
						this.totalExpenses.detail = sign.chargeDetails.detail;
					}else{
						sign.chargeDetails.detail.forEach(detailData => {
							if(typeof(detailData.amount) == "string"){ detailData.amount = parseFloat(detailData.amount)}
							this.totalExpenses.detail.forEach( total => {
								if(typeof(total.amount) == "string"){ total.amount = parseFloat(total.amount)}
								if(total.name == detailData.name){
									total.amount += detailData.amount;
								}
							})
							
						})
					}
				})
				this.formData.bussinessPeople = bussinessPeoples;//出差人自动填充到表单字段
				this.formData.endAddress =  businessLocation.join("，");//出差地自动填充到表单字段
				this.formData.amount = this.totalExpenses.detail[this.totalExpenses.detail.length-1].amount;//总报销金额自动填充到表单字段
				this.totalExpenses.bussinessPeoples = bussinessPeoples.join("，");
				this.totalExpenses.businessLocation = businessLocation.join("，");
			}
		},
		ShowTreeSelect(){
			this.isShowTreeSelect = true;
			
		},
		setInforMation(name){//新增人员信息登记页签
			this.isShowTreeSelect = false;
			if(this.signJson){
				if(!this.signJson.signJsonList){ this.signJson.signJsonList= []; }
				
				this.signJson.signJsonList.push({
					addressList: {detail:[{endAddress:""}]},
					bussinessPeople: name,
					chargeDetails: {detail:[
						{amount: 0,name: "交通费"},
						{amount: 0,name: "住宿费"},
						{amount: 0,name: "伙食补助"},
						{amount: 0,name: "公杂补助"},
						{amount: 0,name: "其他费用"},
						{amount: 0,name: "小计"},
					]},
					days: null,
					endDate: "",
					heaven: 0,
					id: generateUUID(),
					qinghaiTibetBorderDay: 0,
					startDate: "",
					vehiclesDay: 0,
				})
				// this.calculateTotalExpenses();
				this.autoToPayMethodDetail(name);//自动同步到支付明细
				 setTimeout(() =>{
					 if(this.tabActive == this.signJson.signJsonList.length - 1 ){
						this.tabActive = this.signJson.signJsonList.length;
						setTimeout(() =>{
							this.tabActive = this.signJson.signJsonList.length - 1;
						},10)
					 }else{
						this.tabActive = this.signJson.signJsonList.length - 1;
					 }
					 this.$forceUpdate();//强制更新
				 },100)
				 
			}
		},
		deleteInforMation(){//删除当前人员信息登记页签
			let _this = this;
			if(_this.tabActive == _this.signJson.signJsonList.length){ //当前显示合计页签
				toast("当前页签无法删除！");
				return;
			}
			App.UI('dialog', {
				type : 'confirm',
				title: 'queren',
				OkTxt: '确定',
				CancelTxt: '取消',
				msg	 : '是否确定删除当前人员信息？'
			},function(_action){
				if(_action==='OK'){
					_this.signJson.signJsonList.splice(_this.tabActive,1); 
					if(_this.tabActive != 0){
						_this.tabActive = _this.tabActive - 1;
					}
				}
			})	
		},
		autoToPayMethodDetail(name){
			//自动同步到支付明细
			let _this = this;
			let payDetail = _this.payMethodDetail.filter(det => det.name == name);
			if(payDetail.length == 0){
                _this.payMethodDetail.push({id: generateUUID(), index: _this.payMethodDetail.length, name: name});
			}
		},
		backListening(){ //返回监听
			let _this = this;
			document.addEventListener('back', function(e) {
				if(_this.isShowTreeSelect){
					_this.isShowTreeSelect = false;
					e.preventDefault(); 
					return;
				}
				App.LS.set("signJson",JSON.stringify(_this.signJson));
				App.LS.set("payMethodDetail",JSON.stringify(_this.payMethodDetail));
				App.LS.set("formData",JSON.stringify(_this.formData));
				closePage("jbxx.updateForm();");
				// App.UI('dialog', {
				// 	type : 'confirm',
				// 	title: 'queren',
				// 	OkTxt: '确定',
				// 	CancelTxt: '取消',
				// 	msg	 : '是否提交票据信息？'
				// },function(_action){
				// 	if(_action==='OK'){
				// 		App.LS.set("signJson",JSON.stringify(_this.signJson));
				// 	}
				// 	closePage();
				// })	
				e.preventDefault();
			})
		}
	}
});	

addvisibListener();
