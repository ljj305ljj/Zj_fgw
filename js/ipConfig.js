/*version:2020-11-12**/
var htmlRoot = ""
var temphost = location.protocol + "//" + location.host;
var outerBasehost = window.location.protocol + "//" + window.location.host + htmlRoot;
var ZjgyHost = outerBasehost + "/fgwOA/";// /oa正式环境 /fgwOA 本地测试环境
var basehost = ZjgyHost;
var NginxHost = ZjgyHost;
var filePath = outerBasehost + "/rjmoafgw/";
var innerOA = "http://10.168.100.98:2080";//http://10.249.138.45:2080/
var fcsurl = "/wisp_fcs/fileConvServlet?";//mogo
var fcsgetfile = '/wisp_fcs/QueryDocumentIntf?key=';//mogo

// var fcsurl = outerBasehost+'/wisp_fcs/fileConvServlet?';//fcs 普通windo地址
// var fcshost=outerBasehost+"/wisp_fcs/conversion/conved";
var mgrUrl = outerBasehost;
var pdfjsHtml = outerBasehost + "generic/web/viewer.html?v=1";
var agentId = '338094445';
var ddGetConfig = outerBasehost + "/dd/getConfig?signedUrl=";
var ddGetLtpatoken = outerBasehost + "/dd/ddauth-conversion/getJOAtoken?authCode=";
var appKey = "fgw_moa-1l30ca9gF0WMDhaRvQjIVr";
var dingIdArray = [];
/*基础配置end，不同环境此部分配置有所不同*/
var dingIdObj = {};

//首页导航图标背景色
const iconBackgrounds = ["#52A9F2", "#1ECA9B", "#86CD46", "#F2BC2A", "#F98D12", "#DE5C51", "#3DD5CC"];

// 首页导航表
var indexTabData = [
    {
        "name": "常用应用", "modal": [{
            id: 'todoMsg',
            icon: 'gongwenliuzhuan',
            title: '公文处理',
            url: 'ListPage.html?moduleId=moa-gwgl',
            num: 0,
            childre: [
                {
                    id: 'receival',
                    icon: 'shouwenyunzhuan',
                    title: '收文处理',
                    url: '/ListPage.html?moduleId=moa-receival',
                },
                {
                    id: 'dispatch',
                    icon: 'fawenyunzhuan',
                    title: '发文处理',
                    url: '/ListPage.html?moduleId=moa-dispatch',
                },
                {
                    id: 'receival',
                    icon: 'shenglingdaopishi',
                    title: '省领导批示',
                    url: '/ListPage.html?moduleId=moa-sldps',
                },
                {
                    id: 'receival',
                    icon: 'weilingdaopishi',
                    title: '委领导批示',
                    url: '/ListPage.html?moduleId=moa-wldps',
                }
            ]
        },
            {
                id: 'toReadMsg2',
                icon: 'richengguanli',
                title: '日程安排',
                url: '',
                num: 0,
                childre: [
                    {
                        id: 'schedule',
                        icon: 'gerenricheng',
                        title: '个人日程',
                        url: 'pages/schedule/leaderSchedule.html?moduleId=user',
                    },
                    {
                        id: 'schedule',
                        icon: 'lingdaoricheng',
                        title: '领导日程',
                        url: 'pages/schedule/leaderSchedule.html?moduleId=leader',
                    },
                    {
                        id: 'schedule',
                        icon: 'quanweiricheng',
                        title: '全委日程',
                        url: 'pages/schedule/leaderSchedule.html?moduleId=org',
                    }
                ]
            },
            /*{
		id: 'todoMsg2',
		icon: 'zcyssp',
		title: '支出预算审批',
		url:'',
		num:0,
	},
	{
		id: 'atdo',
		icon: 'clsq',
		title: '公务用车',
		url:'pages/clgl/ListPage.html?moduleId=moa-clgl',
		num:0,
	}*/]
    },
    {
        "name": "所有应用", "modal": [
            {
                id: 'dispatch',
                icon: 'gongwenliuzhuan',
                title: '公文处理',
                url: '/ListPage.html?moduleId=moa-gwgl',
                num: 0,
				isCheck:true,
                childre: [
                    {
                        id: 'receival',
                        icon: 'shouwenyunzhuan',
                        title: '收文处理',
                        url: '/ListPage.html?moduleId=moa-receival',
                    },
                    {
                        id: 'dispatch',
                        icon: 'fawenyunzhuan',
                        title: '发文处理',
                        url: '/ListPage.html?moduleId=moa-dispatch',
                    },
                    {
                        id: 'receival',
                        icon: 'shenglingdaopishi',
                        title: '省领导批示',
                        url: '/ListPage.html?moduleId=moa-sldps',
                    },
                    {
                        id: 'receival',
                        icon: 'weilingdaopishi',
                        title: '委领导批示',
                        url: '/ListPage.html?moduleId=moa-wldps',
                    }
                ]
            },
            {
                id: 'xngl',
                icon: 'xiaonengguanli',
                title: '清单督办',
                url: '',
                num: 0,
				isCheck:true,
                childre: [
                    {
                        id: 'xngl',
                        icon: 'wenjianduban',
                        title: '省领导批示督办',
                        url: 'pages/urger/ListPage.html?moduleId=moa-listurger',
                    },
                    {
                        id: 'xngl',
                        icon: 'duchaduban',
                        title: '委领导批示督办',
                        url: 'pages/urger/ListPage.html?moduleId=moa-majorUrger',
                    },
                    {
                        id: 'xngl',
                        icon: 'pishiduban',
                        title: '委重点工作督查',
                        url: 'pages/urger/ListPage.html?moduleId=moa-urgerClient',
                    },
                    {
                        id: 'ldj',
                        icon: 'pishiduban',
                        title: '亮灯件',
                        url: 'pages/urger/ListPage.html?moduleId=moa-fileurger',
                    }
                   
                ]
            },
            {
                id: 'meetting',
                icon: 'huiyishenpi',
                title: '会议组织',
                url: 'ListPage.html?moduleId=moa-hygl',
                num: 0,
				isCheck:true,
                childre: [
                    {
                        id: 'meetting',
                        icon: 'dangzuzhurenhuiyi',
                        title: '党组主任会议',
                        url: 'pages/meeting/ListPage.html?moduleId=moa-DZHY',
                    },
                    {
                        id: 'meetting',
                        icon: 'zhuantihuiyi',
                        title: '专题会议',
                        url: 'pages/meeting/ListPage.html?moduleId=moa-ZTHY',
                    },
                    {
                        id: 'meetting',
                        icon: 'zhuantihuiyi',
                        title: '会议、活动交办事项处理',
                        url: 'pages/meeting/ListPage.html?moduleId=moa-MEETING_ACTIVITY',
                    },
                    {
                        id: 'meetting',
                        icon: 'waibuhuiyi',
                        title: '会议安排',//外部会议
                        url: 'pages/meeting/ListPage.html?moduleId=moa-WBHY',
                    },
                    {
                        id: 'meetting',
                        icon: 'daxinghuiyi',
                        title: '码上办会',//大型会议
                        url: 'pages/meeting/ListPage.html?moduleId=moa-DXHY'
                    },
                    {
                    	id: 'meetting',
                    	icon: 'huiyishenpi',
                    	title: '会议室预订',
                    	url:'pages/meeting/ListPage.html?moduleId=moa-hysgl'
                    }
                ]
            },
            // {
            //     id: 'qc',
            //     icon: 'all_xxgl',
            //     title: '采编管理',
            //     url: 'pages/xxgl/ListPage.html?moduleId=moa-xxgl',
            //     num: 0,
			// 	isCheck:true
            // },
			{
                id: 'qc',
                icon: 'zhengwuxinxi',
                title: '政务信息',
                url: 'pages/xxgl/ListPage.html?moduleId=moa-xxgl',
                num: 0,
				isCheck:true,
				childre: [
                    {
                        id: 'sbgl',
                        icon: 'shangbaoguanli',
                        title: '信息上报',
                        url: 'pages/xxgl/ListPage.html?moduleId=moa-sbgl',
                    },
                    {
                        id: 'xxbs',
                        icon: 'shangbaoguanli',
                        title: '信息编审',
                        url: 'pages/zwxx/ListPage.html?moduleId=moa-xxbs',
                    },
                    {
                        id: 'zwxx',
                        icon: 'zhengwuxinxi1',
                        title: '信息查询',
                        url: 'pages/zwxx/ListPage.html?moduleId=moa-zwxx',
                    }
                ]
            },
            {
                id: 'xzgl',
                icon: 'xingzhengfuwu',
                title: '行政服务',
                url: '',
                num: 0,
				isCheck:true,
                childre: [
                    {
                        id: 'car_apply',
                        icon: 'cheliangguanli',
                        title: '公务用车',//车辆管理
                        url: 'pages/clgl/ListPage.html?moduleId=moa-clgl',
                    },
                    {
                        id: 'wply',
                        icon: 'bangonghaocai',
                        title: '物品领用',
                        url: 'pages/goods/ListPage.html?moduleId=moa-wply',
                    },
                    // {
                    //     id: 'xzgl',
                    //     icon: 'bangongyongpin',
                    //     title: '办公用品',
                    //     url: 'pages/goods/ListPage.html?moduleId=moa-bgyp',
                    // },
                    // {
                    //     id: 'bghc',
                    //     icon: 'bangonghaocai',
                    //     title: '办公耗材',
                    //     url: 'pages/goods/ListPage.html?moduleId=moa-bghc',
                    // },
                    // {
                    // 	id: 'xzgl',
                    // 	icon: 'all_xzgl',
                    // 	title: '资产管理',
                    // 	url:'pages/transfer/ListPage.html?moduleId=nbzy',
                    // }
                ]
            },
            {
                id: 'cwgl',
                icon: 'baoxiaoguanli',
                title: '财务保障',
                url: '',
                num: 0,
				isCheck:true,
                childre: [
                    {
                        id: 'zcyssp',
                        icon: 'baoxiaoguanli',
                        title: '支出预算审批',
                        url: 'pages/expense/ListPage.html?moduleId=moa-zcyssp',
                    },
                    {
                        id: 'cggl',
                        icon: 'baoxiaoguanli',
                        title: '采购管理',
                        url: 'pages/expense/ListPage.html?moduleId=moa-cggl',
                    },
                    {
                        id: 'htgl',
                        icon: 'baoxiaoguanli',
                        title: '合同管理',
                        url: 'pages/expense/ListPage.html?moduleId=moa-htgl',
                    },
                    {
                        id: 'jfbx',
                        icon: 'baoxiaoguanli',
                        title: '经费报销',
                        url: 'pages/expense/ListPage.html?moduleId=moa-jfbx',
                    },
                ]
            },
            {
                id: 'specialWork',
                icon: 'zhuanbangongzuo',
                title: '专班工作',
                url: '/ListPage.html?moduleId=moa-zbgz',
                num: 0,
				isCheck:false
            },
            {
                id: 'gongzuoxietong',
                icon: 'gongzuoxietong',
                title: '工作协同',
                url: '',
                num: 0,
				isCheck:false,
                childre: [
                    {
                        id: 'informal',
                        icon: 'zhengqiuyijian',
                        title: '征求意见',
                        url: 'pages/informal/ListPage.html?moduleId=moa-informal',
                    },
                    {
                        id: 'email',
                        icon: 'youjian',
                        title: '电子邮件',
                        url: 'pages/mail/ListPage.html?moduleId=moa-mail',
                    },
                ]
            },
            // {
            //     id: 'zxcy',
            //     icon: 'zhenxianchuangyou',
            //     title: '争先创优',
            //     url: '',
            //     num: 0,
			// 	isCheck:false,
            //     childre: [
                    // {
                    //     id: 'jcefx',
                    //     icon: 'jiancefenxi',
                    //     title: '监测分析',
                    //     url: '',
                    // },
            //         {
            //             id: 'lst',
            //             icon: 'liangshaitai',
            //             title: '晾晒台',
            //             url: '',
            //         },
            //     ]
            // },
            {
                id: 'dqjs',
                icon: 'dangqunjianshe',
                title: '党群建设',
                url: '',
                num: 0,
				isCheck:false,
                childre: [
                    {
                        id: 'jgdj',
                        icon: 'dangjiangongzuo',
                        title: '机关党建',
                        url: 'pages/wdzx/ListPage.html?moduleId=moa-jgdj',
                    },
                    {
                        id: 'tqgz',
                        icon: 'qinggonggongzuo',
                        title: '团青工作',
                        url: 'pages/youthWork/ListPage.html?moduleId=moa-tqgz',
                    },
                ]
            },
            {
                id: 'wdzx',
                icon: 'wendangzhongxin',
                title: '文档中心',
                url: '',
                num: 0,
				isCheck:false,
                childre: [
                    {
                        id: 'xngl',
                        icon: 'wenjianziliao',
                        title: '文件资料',
                        url: 'pages/wdzx/ListPage.html?moduleId=moa-wjzl',
                    },
                    {
                        id: 'xxyd',
                        icon: 'xuexiyuandi',
                        title: '学习园地',
                        url: 'pages/wdzx/ListPage.html?moduleId=moa-xxyd',
                    },
                    // {
                    //     id: 'zycl',
                    //     icon: 'zhongyaocailiao',
                    //     title: '重要材料',
                    //     url: 'pages/wdzx/ListPage.html?moduleId=moa-zycl',
                    // },
                    // {
                    //     id: 'dsj',
                    //     icon: 'dashiji',
                    //     title: '大事记',
                    //     url: 'pages/wdzx/ListPage.html?moduleId=moa-dsj',
                    // },
                    {
                        id: 'gzzj',
                        icon: 'gongzuozongjie',
                        title: '工作总结',
                        url: 'pages/wdzx/ListPage.html?moduleId=moa-gzzj',
                    },
                    {
                        id: 'tzgg',
                        icon: 'tongzhigonggao',
                        title: '通知公告',
                        url: 'pages/wdzx/ListPage.html?moduleId=moa-tzgg',
                    },
                    // {
                    //     id: 'xngl',
                    //     icon: 'wenjianduban',
                    //     title: '省领导批示督办',
                    //     url: 'pages/urger/ListPage.html?moduleId=moa-fileurger',
                    // }
                ]
            },
            // {
            //     id: 'work',
            //     icon: 'qitagongzuo',
            //     title: '其他工作',
            //     url: 'ListPage.html?moduleId=moa-qtgz',
            //     num: 0,
			// 	isCheck:false,
            //     childre:[
            //     	{
            //     		id: 'work',
            //     		icon: 'qingjiashenpi',
            //     		title: '请假审批',
            //     		url:'ListPage.html?moduleId=moa-qjsp',
            //     	},
            //     	{
            //     		id: 'work',
            //     		icon: 'jiabanshenpi',
            //     		title: '加班审批',
            //     		url:'ListPage.html?moduleId=moa-jbsp',
            //     	},
            //         {
            //         	id: 'work',
            //         	icon: 'gongwuhuodong',
            //         	title: '出差审批',
            //         	url:'ListPage.html?moduleId=moa-ccsp',
            //         },
            //     	// {
            //     	// 	id: 'work',
            //     	// 	icon: 'all_qtgz',
            //     	// 	title: '公务活动',
            //     	// 	url:'',
            //     	// }
            //     ]
            // },
            // {
            //     id: 'schedule',
            //     icon: 'richengguanli',
            //     title: '日程安排',
            //     url: '',
            //     num: 0,
			// 	isCheck:false,
            //     childre: [
            //         {
            //             id: 'schedule',
            //             icon: 'gerenricheng',
            //             title: '个人日程',
            //             url: 'pages/schedule/leaderSchedule.html?moduleId=user',
            //         },
            //         {
            //             id: 'schedule',
            //             icon: 'lingdaoricheng',
            //             title: '领导日程',
            //             url: 'pages/schedule/leaderSchedule.html?moduleId=leader',
            //         },
            //         {
            //             id: 'schedule',
            //             icon: 'quanweiricheng',
            //             title: '全委日程',
            //             url: 'pages/schedule/leaderSchedule.html?moduleId=org',
            //         }
            //     ]
            // },
            {
                id: 'dzcs',
                icon: 'dianzichushi',
                title: '电子处室',
                url: 'pages/dzcs/ListPage.html?moduleId=moa-dzcs',
                num: 0,
				isCheck:false,
                
            },
            {
                id: 'schedule',
                icon: 'richengguanli',
                title: '日程安排',
                url: '',
                num: 0,
				isCheck:true,
                childre: [
                    {
                        id: 'schedule',
                        icon: 'gerenricheng',
                        title: '个人日程',
                        url: 'pages/schedule/leaderSchedule.html?moduleId=user',
                    },
                    {
                        id: 'schedule',
                        icon: 'lingdaoricheng',
                        title: '领导日程',
                        url: 'pages/schedule/leaderSchedule.html?moduleId=leader',
                    },
                    {
                        id: 'schedule',
                        icon: 'quanweiricheng',
                        title: '全委日程',
                        url: 'pages/schedule/leaderSchedule.html?moduleId=org',
                    }
                ]
            },
            {
                id: 'person',
                icon: 'gerenzhongxin',
                title: '个人中心',
                url: '',
                num: 0,
				isCheck:false,
                childre: [
                    // {
                    //     id: 'person',
                    //     icon: 'youjian',
                    //     title: '个人邮件',
                    //     url: 'pages/mail/ListPage.html?moduleId=moa-mail',
                    // },
                    {
                        id: 'schedule',
                        icon: 'gerenricheng',
                        title: '个人日程',
                        url: 'pages/schedule/leaderSchedule.html?moduleId=user',
                    },
                    {
                        id: 'schedule',
                        icon: 'lingdaoricheng',
                        title: '领导日程',
                        url: 'pages/schedule/leaderSchedule.html?moduleId=leader',
                    },
                    {
                        id: 'schedule',
                        icon: 'quanweiricheng',
                        title: '全委日程',
                        url: 'pages/schedule/leaderSchedule.html?moduleId=org',
                    },
                    {
                		id: 'work',
                		icon: 'qingjiashenpi',
                		title: '请假审批',
                		url:'ListPage.html?moduleId=moa-qjsp',
                	},
                    {
                    	id: 'work',
                    	icon: 'gongwuhuodong',
                    	title: '出差审批',
                    	url:'pages/ccsp/ListPage.html?moduleId=moa-ccsp',
                    },
                    {
                        id: 'person',
                        icon: 'tongxunlu',
                        title: '通讯录',
                        url:'pages/addbook/AddbookPage.html?moduleId=moa-addbook',
                    },
                    {
                        id: 'person',
                        icon: 'shoucang',
                        title: '我的空间',
                        url:'StarPage.html?moduleId=moa-star',
                    },
                    {
                        id: 'person',
                        icon: 'dianzichushi',
                        title: '工具箱',
                        url:'pages/wdzx/ListPage.html?moduleId=moa-toolBox',
                    },
				// {
				// 	id: 'person',
				// 	icon: 'all_grzx',
				// 	title: '个人收藏',
				// 	url:'',
				// },
				// {
				// 	id: 'person',
				// 	icon: 'all_grzx',
				// 	title: '工资单查询',
				// 	url:'pages/finance/ListPage.html?moduleId=moa-gzdcx',
				// }
                ]
            },
            
        ]
    },
]

//模块配置表 DISPATCH,RECEIVAL,LEAVE,OVERTIME,MEETING,MEETING_BOOK,CAR_APPLY,TRAVEL_APPROVAL
var moudleInfo = [
    {
        "id": "moa-todo", "type": "", "badge": "0", "title": "待办中心", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            //多个列表拼接在一起，用|隔开
            //exclusionsBusinessNo=DISPATCH,RECEIVAL
            {
                "id": "mobile_todo_all",
                "type": "todo",
                "url": "todo|dispatch-todo|receival-todo|dispatch-todo",
                "titleIcon": "rjicon_title",
                "paras": "?includeBusinessNo=MEETING_ISSUE,MEETING,MEETING_OFFICE,MEETING_EXTERNAL,MEETING_BOOK,MEETING_ACTIVITY,LEAVE,TRAVEL_APPROVAL,INFOREPORT,INFO,CAR_APPLY,GOODS,SUPPLIES,URGER,MAJORURGER,LISTURGER,INFORMAL,SPECIAL_WORK,TRAVEL_EXPENSE,OTHER_EXPENSE,LABOR_UNION_EXPENSE,PARTY_UNION_EXPENSE,CONTRACT_APPROVE,PURCHASE_NOTICE,PURCHASE_RESULT,MEETING_PAY_ISSUED,OFFICIAL_RECEPTION,UNION_ACTIVITIES,PROJECT_PLANNING_SERVICE,GOODS_PURCHASE&isFirstState=0&flowStatus=running&sort=createTime,desc|?includeBusinessNo=DISPATCH&isFirstState=0&flowStatus=running&sort=createTime,desc|?includeBusinessNo=RECEIVAL&isFirstState=0&flowStatus=running&sort=createTime,desc|?includeBusinessNo=&exclusionsBusinessNo=&flowStatus=running&isFirstState=1&businessNo=DISPATCH&businessExtension=excludeReceivalDocId",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "应用类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }, {
                        "name": "发送环节",
                        "id": "processExtension|stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }
                ],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: true,
                refreshing: false,
                finished: false,
                count: 0,
                isCheck:true
            },
            {
                "id": "mobile_toread_all",
                "type": "toread",
                "url": "toread",
                "titleIcon": "rjicon_title",
                "paras": "?includeBusinessNo=DISPATCH,RECEIVAL,TRAVEL_APPROVAL&isRead=0&isFirstState=0&flowStatus=running&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "应用类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }, {
                        "name": "发送环节",
                        "id": "processExtension|stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }
                ],
                "name": "待阅",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: true,
                refreshing: false,
                finished: false,
                count: 0,
                isCheck:true
            },
            {
                "id": "mobile_todo_approval",
                "type": "todo",
                "url": "dispatch-todo|receival-todo|todo|dispatch-todo|receival-todo",
                "titleIcon": "rjicon_title",
                "paras": "?includeBusinessNo=DISPATCH&isFirstState=0&flowStatus=running&sort=createTime,desc|?includeBusinessNo=RECEIVAL&isFirstState=0&flowStatus=running&sort=createTime,desc|?includeBusinessNo=SPECIAL_WORK&flowStatus=running&isFirstState=0&sort=createTime,desc|?includeBusinessNo=&exclusionsBusinessNo=&flowStatus=running&isFirstState=1&businessNo=DISPATCH&businessExtension=excludeReceivalDocId",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办文",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0,
                isCheck:true
            },
            {//|receive-mail|?mailIsDelete=0&mailIsSpam=0&mailIsSeen=0&fileFolder=ALL&sort=receiveDate,desc&flowStatus=running
                "id": "mobile_todo_banshi",
                "type": "todo",
                "url": "todo|todo|todo",
                "paras": "?includeBusinessNo=CAR_APPLY,SUPPLIES,GOODS&flowStatus=running&isFirstState=0|?includeBusinessNo=TRAVEL_EXPENSE,OTHER_EXPENSE,LABOR_UNION_EXPENSE,PARTY_UNION_EXPENSE,CONTRACT_APPROVE,PURCHASE_NOTICE,PURCHASE_RESULT,MEETING_PAY_ISSUED,OFFICIAL_RECEPTION,UNION_ACTIVITIES,PROJECT_PLANNING_SERVICE,GOODS_PURCHASE&flowStatus=running&sort=createTime%2Cdesc|?includeBusinessNo=LEAVE,TRAVEL_APPROVAL&flowStatus=running&isFirstState=0",
                "openUrl": "gy042",
                "subjectId": "businessSubject|subject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "发件人",
                        "id": "fromAddress",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "收件日期",
                        "id": "receiveDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    } ],
                "name": "办事",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0,
                isCheck:true
            },
            {
                "id": "mobile_todo_xnjs",
                "type": "xntodo",
                "url": "urgerClient_rwgl|listurger-hometodo|majorurger-hometodo",
                "paras": "?includeBusinessNo=URGER,MAJORURGER,LISTURGER&flowStatus=running&pageType=fgwTodo&isFirstState=0&sort=createDate,desc|?includeBusinessNo=URGER,LISTURGER&flowStatus=running&businessNo=LISTURGER|?includeBusinessNo=URGER,LISTURGER&flowStatus=running&businessNo=MAJORURGER",
                "openUrl": "gy042",
                "subjectId": "subject|businessSubject",
                "field": [
                    {
                        "name": "类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    },
                    // {
                    //     "name": "处室",
                    //     "id": "handleObjectName",
                    //     "showName": false,
                    //     "icon": "",
                    //     "color": ""
                    // }, 
                    {
                        "name": "时间",
                        "id": "createDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "任务",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0,
                isCheck:true
            },
            {
                "id": "mobile_todo_meeting",
                "type": "todo",
                "url": "todo",
                "paras": "?includeBusinessNo=MEETING_ISSUE, MEETING, MEETING_OFFICE,MEETING_EXTERNAL,MEETING_BOOK,MEETING_ACTIVITY&isFirstState=0&flowStatus=running&sort=createTime,desc",
                "subjectId": "businessSubject",
                "openUrl": "gy042",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办会",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0,
                isCheck:true
            },
            {
                "id": "mobile_todo_zwxx",
                "type": "zwtodo",
                "url": "todo",
                "paras": "?includeBusinessNo=INFOREPORT,INFO&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "信息",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0,
                isCheck:true
            },
            // {
            //     "id": "mobile_todo_xzfw",
            //     "type": "xzfwtodo",
            //     "url": "todo",
            //     "paras": "?includeBusinessNo=CAR_APPLY,SUPPLIES,GOODS&flowStatus=running&isFirstState=0",
            //     "subjectId": "businessSubject",
            //     "openUrl": "gy042",
            //     "field": [
            //         {
            //             "name": "审批类型",
            //             "id": "businessName",
            //             "showName": true,
            //             "icon": "",
            //             "color": ""
            //         }, {
            //             "name": "时间",
            //             "id": "businessDate",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }],
            //     "name": "行政服务",
            //     "offset": 0,
            //     "limit": 1000,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0,
            //     isCheck:true
            // },
            // {
            //     "id": "mobile_todo_qtgz",
            //     "type": "xzfwtodo",
            //     "url": "todo",
            //     "paras": "?includeBusinessNo=LEAVE,OVERTIME,TRAVEL_APPROVAL&flowStatus=running&isFirstState=0",
            //     "subjectId": "businessSubject",
            //     "openUrl": "gy042",
            //     "field": [
            //         {
            //             "name": "审批类型",
            //             "id": "businessName",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }, {
            //             "name": "时间",
            //             "id": "createTime",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }],
            //     "name": "其他工作",
            //     "offset": 0,
            //     "limit": 1000,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0,
            //     isCheck:false
            // },
            // {
            //     "id": "mobile_todo_jfbx",
            //     "type": "todo",
            //     "url": "todo",
            //     "paras": "?includeBusinessNo=TRAVEL_EXPENSE,OTHER_EXPENSE,LABOR_UNION_EXPENSE,PARTY_UNION_EXPENSE&flowStatus=running&sort=createTime%2Cdesc",
            //     "openUrl": "gy042",
            //     "subjectId": "businessSubject",
            //     "field": [
            //         {
            //             "name": "报销类型",
            //             "id": "businessName",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }, {
            //             "name": "时间",
            //             "id": "createTime",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }],
            //     "name": "财务保障",
            //     "offset": 0,
            //     "limit": 1000,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0
            // },
            // { 
            //     "id": "mobile_todo_zbgz",
            //     "type": "todo",
            //     "url": "otherTodoList",
            //     "paras": "?businessNo=SPECIAL_WORK&flowStatus=running&isFirstState=0&sort=createTime%2Cdesc",
            //     "openUrl": "gy042",
            //     "subjectId": "businessSubject",
            //     "field": [
            //         {
            //             "name": "审批类型",
            //             "id": "businessName",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }, {
            //             "name": "时间",
            //             "id": "createTime",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }],
            //     "name": "专班工作",
            //     "offset": 0,
            //     "limit": 1000,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0
            // },
            {
                "id": "mobile_todo_informal",
                "type": "sbtodo",
                "url": "todo",
                "paras": "?businessNo=INFORMAL&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "征求意见",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            // {
            //     "id": "mobile_mail",
            //     "type": "mail",
            //     "url": "receive-mail",
            //     "paras": "?mailIsDelete=0&mailIsSpam=0&mailIsSeen=0&fileFolder=ALL&sort=receiveDate,desc&flowStatus=running",
            //     "subjectId": "subject",
            //     "openUrl": "gy042",
            //     "field": [{
            //         "name": "发件人",
            //         "id": "fromAddress",
            //         "showName": true,
            //         "icon": "",
            //         "color": ""
            //     }, {
            //         "name": "收件时间",
            //         "id": "receiveDate",
            //         "showName": false,
            //         "icon": "",
            //         "color": ""
            //     }],
            //     "name": "电子邮件",
            //     "offset": 0,
            //     "limit": 1000,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0,
            //     isCheck:false
            // },
        ]
    },
    {
        "id": "moa-xxzx", "type": "", "badge": "1", "title": "信息中心", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_xxzx_tzgg",
                "type": "todo",
                "url": "tgzz",
                "paras": "",
                "openUrl": "gy042",
                "preIcon": 'rjicon_bbs',
                "subjectId": "subject",
                "field": [
                    {
                        "name": "时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "通知公告",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: true,
                finished: false
            },
            {
                "id": "mobile_todo_xxyd",
                "type": "todo",
                "url": "study",
                "paras": "",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "学习园地",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-dbzx", "type": "", "badge": "3", "title": "督办中心", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_dbzx_rwdb",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=URGER&flowStatus=running&isFirstState=0&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "draftDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "任务督办",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_dbzx_gzsx",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=DISPATCH&flowStatus=done",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "跟踪事项",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-receival", "type": "", "badge": "4", "title": "收文处理", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_swgl_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=RECEIVAL&flowStatus=running&isFirstState=0&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "文件字号",
                        "id": "businessDocMark",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            // {
            //     "id": "mobile_swgl_atdo",
            //     "type": "receival-done",
            //     "url": "receival-done",
            //     "paras": "?isManager=false&selectUserNo=&flowStatus=running@finish&sort=S_draftTimeDes,desc",
            //     "openUrl": "gy042",
            //     "subjectId": "C_subject",
            //     "field": [
            //         {
            //             "name": "文件字号",
            //             "id": "S_docMark",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }, {
            //             "name": "时间",
            //             "id": "S_createTime",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }],
            //     "name": "已办文件",
            //     "offset": 0,
            //     "limit": 15,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0
            // },
            {
                "id": "mobile_swgl_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=RECEIVAL&flowStatus=done&sort=endTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "文件字号",
                        "id": "businessDocMark",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "endTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "已办文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_swgl_toread",
                "type": "toread",
                "url": "toread",
                "paras": "?businessNo=RECEIVAL&isRead=0&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "文件字号",
                        "id": "businessDocMark",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "传阅时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待阅文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_swgl_readed",
                "type": "toread",
                "url": "toread",
                "paras": "?businessNo=RECEIVAL&isRead=1&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "文件字号",
                        "id": "businessDocMark",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "传阅时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "已阅文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_swgl_finish",
                "type": "receival-done",
                "url": "receival-done",
                "paras": "?isManager=false&selectUserNo=&flowStatus=finish&sort=S_operatorTimeDes%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "C_subject",
                "field": [
                    {
                        "name": "文件字号",
                        "id": "S_docMark",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "办结时间",
                        "id": "S_operatorTimeDes",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },
    {
        "id": "moa-dispatch", "type": "", "badge": "4", "title": "发文处理", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_fwgl_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=DISPATCH&flowStatus=running&isFirstState=0&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "主办处室",
                        "id": "businessOrgName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            // {
            //     "id": "mobile_fwgl_atdo",
            //     "type": "dispatch-done",
            //     "url": "dispatch-done",
            //     "paras": "?isManager=false&selectUserNo=&flowStatus=running@finish&sort=S_createTime,desc",
            //     "openUrl": "gy042",
            //     "subjectId": "C_subject",
            //     "field": [
            //         {
            //             "name": "文件字号",
            //             "id": "S_docMark",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }, {
            //             "name": "时间",
            //             "id": "S_createTime",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }],
            //     "name": "已办文件",
            //     "offset": 0,
            //     "limit": 15,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0
            // },
            {
                "id": "mobile_fwgl_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=DISPATCH&flowStatus=done&sort=endTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "文件字号",
                        "id": "businessDocMark",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "endTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "已办文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_fwgl_toread",
                "type": "toread",
                "url": "toread",
                "paras": "?businessNo=DISPATCH&isRead=0&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "主办处室",
                        "id": "sendOrgName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "传阅时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待阅文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_fwgl_readed",
                "type": "toread",
                "url": "toread",
                "paras": "?businessNo=DISPATCH&isRead=1&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "主办处室",
                        "id": "sendOrgName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "传阅时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "已阅文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_fwgl_finish",
                "type": "dispatch-done",
                "url": "dispatch-done",
                "paras": "?isManager=false&selectUserNo=&flowStatus=finish&sort=S_operatorTimeDes%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "C_subject",
                "field": [
                    {
                        "name": "文件字号",
                        "id": "S_docMark",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "办结时间",
                        "id": "S_operatorTimeDes",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },
    {
        "id": "moa-sldps", "type": "", "badge": "4", "title": "省领导批示", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            // {
            //     "id": "mobile_gwgl_sldps",
            //     "type": "sldpstodo",
            //     "url": "sldpstodo",
            //     "paras": "?flowStatus=running&sort=",
            //     "openUrl": "gy042",
            //     "subjectId": "subject",
            //     "field": [
            //         {
            //             "name": "当前待办人",
            //             "id": "stateHandleInfo",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }, {
            //             "name": "时间",
            //             "id": "draftDate",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }],
            //     "name": "未办结",
            //     "offset": 0,
            //     "limit": 15,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0
            //  },
            {
                "id": "mobile_gwgl_ldpsj",
                "type": "sldpsj",
                "url": "sldpsj",
                "paras": "?docMarkName=&provinceCate=0&sort=draftDate%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "当前待办人",
                        "id": "stateHandleInfo",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "draftDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "领导批示件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_gwgl_sldps",
                "type": "sldpstodo",
                "url": "sldpstodo",
                "paras": "?docMarkName=&provinceCate=1&sort=draftDate%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "主办处室",
                        "id": "handleUnit",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "draftDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "批示（指示）督办",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
             },
        ]
    },
    {
        "id": "moa-wldps", "type": "", "badge": "4", "title": "委领导批示", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_wldps_nw",
                "type": "wldpsnw",
                "url": "wldpsnw",
                "paras": "?fileCate=0",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "批示意见",
                        "id": "approvalOpinion",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    },{
                        "name": "批示时间",
                        "id": "approvalDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    } ],
                "name": "内网",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_wldps_xx",
                "type": "wldpstodo",
                "url": "wldpstodo",
                "paras": "?fileCate=1&approvalLeaderName=&excludeOpinions=" + encodeURI('同意。,同意'),
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "批示意见",
                        "id": "approvalOpinion",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    },{
                        "name": "批示时间",
                        "id": "approvalDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "线下",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    // {
    //     "id": "moa-gwgl", "type": "", "badge": "4", "title": "公文运转", "formTab": [
    //         {
    //             name: "办理单",
    //             pageId: "BaseInfor",
    //             loadUrl: "./components/BaseInforPage.html",
    //             initFlag: "false",
    //             datas: []
    //         },
    //         {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
    //         {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
    //     ], "view": [
    //         {
    //             "id": "mobile_gwgl_swgl",
    //             "type": "todo",
    //             "url": "todo",
    //             "paras": "?businessNo=RECEIVAL&flowStatus=running&isFirstState=0&sort=createTime,desc",
    //             "openUrl": "gy042",
    //             "subjectId": "businessSubject",
    //             "field": [
    //                 {
    //                     "name": "来文编号",
    //                     "id": "businessDocMark",
    //                     "showName": false,
    //                     "icon": "",
    //                     "color": ""
    //                 }, {
    //                     "name": "时间",
    //                     "id": "draftDate",
    //                     "showName": false,
    //                     "icon": "",
    //                     "color": ""
    //                 }],
    //             "name": "收文管理",
    //             "offset": 0,
    //             "limit": 15,
    //             data: {},
    //             loading: false,
    //             refreshing: false,
    //             finished: false,
    //             count: 0
    //         },
    //         {
    //             "id": "mobile_gwgl_fwgl",
    //             "type": "todo",
    //             "url": "todo",
    //             "paras": "?businessNo=DISPATCH&flowStatus=running&isFirstState=0&sort=createTime%2Cdesc",
    //             "openUrl": "gy042",
    //             "subjectId": "businessSubject",
    //             "field": [
    //                 {
    //                     "name": "来文编号",
    //                     "id": "businessDocMark",
    //                     "showName": false,
    //                     "icon": "",
    //                     "color": ""
    //                 }, {
    //                     "name": "时间",
    //                     "id": "draftDate",
    //                     "showName": false,
    //                     "icon": "",
    //                     "color": ""
    //                 }],
    //             "name": "发文管理",
    //             "offset": 0,
    //             "limit": 1000,
    //             data: {},
    //             loading: false,
    //             refreshing: false,
    //             finished: false,
    //             count: 0
    //         },
    //         {
    //             "id": "mobile_gwgl_sldps",
    //             "type": "sldpstodo",
    //             "url": "sldpstodo",
    //             "paras": "?flowStatus=running&sort=",
    //             "openUrl": "gy042",
    //             "subjectId": "subject",
    //             "field": [
    //                 {
    //                     "name": "当前待办人",
    //                     "id": "stateHandleInfo",
    //                     "showName": false,
    //                     "icon": "",
    //                     "color": ""
    //                 }, {
    //                     "name": "时间",
    //                     "id": "draftDate",
    //                     "showName": false,
    //                     "icon": "",
    //                     "color": ""
    //                 }],
    //             "name": "省领导批示",
    //             "offset": 0,
    //             "limit": 15,
    //             data: {},
    //             loading: false,
    //             refreshing: false,
    //             finished: false,
    //             count: 0
    //         },
    //         {
    //             "id": "mobile_gwgl_wldps",
    //             "type": "wldpstodo",
    //             "url": "wldpstodo",
    //             "paras": "?excludeOpinions%5B0%5D=%E5%B7%B2%E9%98%85%E3%80%82&excludeOpinions%5B1%5D=%E5%90%8C%E6%84%8F%E3%80%82&flowStatus=running",
    //             "openUrl": "gy042",
    //             "subjectId": "subject",
    //             "field": [
    //                 {
    //                     "name": "批示意见",
    //                     "id": "approvalOpinion",
    //                     "showName": false,
    //                     "icon": "",
    //                     "color": ""
    //                 }],
    //             "name": "委领导批示",
    //             "offset": 0,
    //             "limit": 15,
    //             data: {},
    //             loading: false,
    //             refreshing: false,
    //             finished: false,
    //             count: 0
    //         }
    //     ]
    // },
    {
        "id": "moa-hygl", "type": "", "badge": "4", "title": "会议组织", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_xzgl_clgl",
                "type": "hystodo",
                "url": "hystodo",
                "paras": "?businessNo=MEETING_BOOK&flowStatus=running&sort=applyDate%2Cdesc&isFirstState=0",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发送人",
                        "id": "sendUserName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "会议室管理",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_xzgl_bgyp",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=MEETING_OFFICE&flowStatus=running&isFirstState=0&businessCate=党组会议;主任办公会议&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "会议管理",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-sbgl", "type": "", "badge": "4", "title": "信息上报", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "../../components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "../../components/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "../../components/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_sbgl_todo",
                "type": "sbtodo",
                "url": "todo",
                "paras": "?businessNo=INFOREPORT&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_sbgl_atdo",
                "type": "sbatdo",
                "url": "todo",
                "paras": "?businessNo=INFOREPORT&flowStatus=done&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },
    {
        "id": "moa-xxbs", "type": "", "badge": "4", "title": "信息编审", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "../../components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "../../components/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "../../components/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_xxbs_todo",
                "type": "sbtodo",
                "url": "todo",
                "paras": "?businessNo=INFO&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_xxbs_atdo",
                "type": "sbatdo",
                "url": "todo",
                "paras": "?businessNo=INFO&flowStatus=done&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },
	{
        "id": "moa-zwxx", "type": "", "badge": "4", "title": "信息查询", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "../../components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "../../components/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "../../components/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_zwxx_todo",
                "type": "sbtodo",
                "url": "info-query",
                "paras": "?act=item&infoTypes=&year=&month=&sourceUnit=&beginMonth=01&endMonth=12&sort=end_Time%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "title",
                "field": [
                    {
                        "name": "定版刊型",
                        "id": "infoTypesName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "定版时间",
                        "id": "endTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "当年信息",
                "offset": 0,
                "limit": 50,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_zwxx_atdo",
                "type": "sbatdo",
                "url": "info-draft",
                "paras": "?sort=end_Time%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "title",
                "field": [
                    {
                        "name": "刊型",
                        "id": "infoTypesName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "定版时间",
                        "id": "endTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "批示查询",
                "offset": 0,
                "limit": 50,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },
    {
        "id": "moa-xzgl", "type": "", "badge": "4", "title": "行政服务", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_xzgl_clgl",
                "type": "cartodo",
                "url": "cartodo",
                "paras": "?businessNo=CAR_APPLY&businessCate=apply&flowStatus=running&sort=applyDate%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "公务用车",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_xzgl_bgyp",
                "type": "goodstodo",
                "url": "goodstodo",
                "paras": "?flowStatus=wait&goodsType=0&sort=createdTime%2Cdesc&systemNo=ZJSFGW",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办公用品",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_xzgl_gdzc",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=DISPATCH&flowStatus=done",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "固定资产",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-zcyssp", "type": "", "badge": "", "title": "支出预算审批", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []},
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_zcyssp_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?includeBusinessNo=MEETING_PAY_ISSUED,OFFICIAL_RECEPTION,UNION_ACTIVITIES,PROJECT_PLANNING_SERVICE,GOODS_PURCHASE&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_zcyssp_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?includeBusinessNo=MEETING_PAY_ISSUED,OFFICIAL_RECEPTION,UNION_ACTIVITIES,PROJECT_PLANNING_SERVICE,GOODS_PURCHASE&flowStatus=done&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
           
        ]
    },
    {
        "id": "moa-cggl", "type": "", "badge": "", "title": "采购管理", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []},
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_cggl_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=PURCHASE_NOTICE&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "采购公告待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_cggl_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=PURCHASE_NOTICE&flowStatus=done&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "采购公告在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_cgjg_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=PURCHASE_RESULT&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "采购结果待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_cgjg_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=PURCHASE_RESULT&flowStatus=done&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "采购结果在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
           
        ]
    },
    {
        "id": "moa-htgl", "type": "", "badge": "", "title": "合同管理", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []},
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_htgl_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=CONTRACT_APPROVE&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "状态",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_htgl_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=CONTRACT_APPROVE&flowStatus=done&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "状态",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            // {
            //     "id": "mobile_qtgz_ygcc",
            //     "type": "todo",
            //     "url": "car_apply-bj",
            //     "paras": "?applyNo=apply&flowStatus=finish&sort=createTime%2Cdesc",
            //     "openUrl": "gy042",
            //     "subjectId": "reasons",
            //     "field": [
            //         {
            //             "name": "申请人",
            //             "id": "applyUserName",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }, {
            //             "name": "时间",
            //             "id": "applyDate",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }],
            //     "name": "办结文件",
            //     "offset": 0,
            //     "limit": 1000,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0
            // }
        ]
    },
    {
        "id": "moa-jfbx", "type": "", "badge": "", "title": "经费报销", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []},
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_jfbx_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?includeBusinessNo=TRAVEL_EXPENSE,OTHER_EXPENSE,LABOR_UNION_EXPENSE,PARTY_UNION_EXPENSE&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "报销类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_jfbx_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?includeBusinessNo=TRAVEL_EXPENSE,OTHER_EXPENSE,LABOR_UNION_EXPENSE,PARTY_UNION_EXPENSE&flowStatus=done&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "报销类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            // {
            //     "id": "mobile_qtgz_ygcc",
            //     "type": "todo",
            //     "url": "car_apply-bj",
            //     "paras": "?applyNo=apply&flowStatus=finish&sort=createTime%2Cdesc",
            //     "openUrl": "gy042",
            //     "subjectId": "reasons",
            //     "field": [
            //         {
            //             "name": "申请人",
            //             "id": "applyUserName",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }, {
            //             "name": "时间",
            //             "id": "applyDate",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }],
            //     "name": "办结文件",
            //     "offset": 0,
            //     "limit": 1000,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0
            // }
        ]
    },
    {
        "id": "moa-qjsp", "type": "", "badge": "4", "title": "请假审批", "formTab": [
            {
                name: "申请单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            // {name:"办理单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []},
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_qjsp_todo",
                "type": "todo",
                "url": "otherTodoList",
                "paras": "?businessNo=LEAVE&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_qjsp_atdo",
                "type": "todo",
                "url": "otherTodoList",
                "paras": "?businessNo=LEAVE&flowStatus=done&sort=endTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发起人",
                        "id": "sendUserName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_qjsp_toread",
                "type": "toread",
                "url": "toread",
                "paras": "?businessNo=LEAVE&isRead=0&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发起人",
                        "id": "sendUserName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待阅",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_qjsp_readed",
                "type": "toread",
                "url": "toread",
                "paras": "?businessNo=LEAVE&isRead=1&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发起人",
                        "id": "sendUserName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "已阅",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            /*{"id":"mobile_qtgz_ygcc","type":"todo","url":"otherTodoList","paras":"?businessNo=TRAVEL_APPROVAL&flowStatus=running&sort=applyDate%2Cdesc&isFirstState=0","openUrl":"gy042","subjectId":"businessSubject","field":[
			{
			"name":"审批类型",
			"id":"businessName",
			"showName":false,
			"icon":"",
			"color":""
			},{
			"name":"时间",
			"id":"businessDate",
			"showName":false,
			"icon":"",
			"color":""
			}],"name":"因公出差","offset":0,"limit":1000,data:{},loading:false,refreshing:false,finished:false,count:0}*/
        ]
    },
    {
        "id": "moa-jbsp", "type": "", "badge": "4", "title": "加班审批", "formTab": [
            {
                name: "申请单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            // {name:"办理单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []},
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_jbsp_todo",
                "type": "todo",
                "url": "otherTodoList",
                "paras": "?businessNo=OVERTIME&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_jbsp_atdo",
                "type": "todo",
                "url": "otherTodoList",
                "paras": "?businessNo=OVERTIME&flowStatus=done&sort=endTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发起人",
                        "id": "sendUserName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_jbsp_toread",
                "type": "toread",
                "url": "toread",
                "paras": "?businessNo=OVERTIME&isRead=0&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发起人",
                        "id": "sendUserName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待阅",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_jbsp_readed",
                "type": "toread",
                "url": "toread",
                "paras": "?businessNo=OVERTIME&isRead=1&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发起人",
                        "id": "sendUserName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "已阅",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            /*{"id":"mobile_qtgz_ygcc","type":"todo","url":"otherTodoList","paras":"?businessNo=TRAVEL_APPROVAL&flowStatus=running&sort=applyDate%2Cdesc&isFirstState=0","openUrl":"gy042","subjectId":"businessSubject","field":[
			{
			"name":"审批类型",
			"id":"businessName",
			"showName":false,
			"icon":"",
			"color":""
			},{
			"name":"时间",
			"id":"businessDate",
			"showName":false,
			"icon":"",
			"color":""
			}],"name":"因公出差","offset":0,"limit":1000,data:{},loading:false,refreshing:false,finished:false,count:0}*/
        ]
    },
    {
        "id": "moa-ccsp", "type": "", "badge": "4", "title": "出差审批", "formTab": [
            {
                name: "申请单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            // {name:"办理单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []},
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_ccsp_todo",
                "type": "todo",
                "url": "TRAVEL_APPROVAL-todo",
                "paras": "?businessNo=TRAVEL_APPROVAL&flowStatus=running&offset=0&limit=15&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_ccsp_atdo",
                "type": "todo",
                "url": "TRAVEL_APPROVAL-todo",
                "paras": "?businessNo=TRAVEL_APPROVAL&flowStatus=done&offset=0&limit=15&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发起人",
                        "id": "sendUserName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_ccsp_toread",
                "type": "toread",
                "url": "toread",
                "paras": "?businessNo=TRAVEL_APPROVAL&isRead=0&offset=0&limit=15&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发起人",
                        "id": "sendUserName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待阅",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_ccsp_readed",
                "type": "toread",
                "url": "toread",
                "paras": "?businessNo=TRAVEL_APPROVAL&isRead=1&offset=0&limit=15&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发起人",
                        "id": "sendUserName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "已阅",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            /*{"id":"mobile_qtgz_ygcc","type":"todo","url":"otherTodoList","paras":"?businessNo=TRAVEL_APPROVAL&flowStatus=running&sort=applyDate%2Cdesc&isFirstState=0","openUrl":"gy042","subjectId":"businessSubject","field":[
			{
			"name":"审批类型",
			"id":"businessName",
			"showName":false,
			"icon":"",
			"color":""
			},{
			"name":"时间",
			"id":"businessDate",
			"showName":false,
			"icon":"",
			"color":""
			}],"name":"因公出差","offset":0,"limit":1000,data:{},loading:false,refreshing:false,finished:false,count:0}*/
        ]
    },
    {
        "id": "moa-zbgz", "type": "", "badge": "4", "title": "专班工作", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []},
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []}
        ], "view": [
            { 
                "id": "mobile_zbgz_todo",
                "type": "todo",
                "url": "otherTodoList",
                "paras": "?businessNo=SPECIAL_WORK&flowStatus=running&isFirstState=0&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_zbgz_atdo",
                "type": "todo",
                "url": "otherTodoList",
                "paras": "?businessNo=SPECIAL_WORK&flowStatus=done&offset=0&limit=15&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发起人",
                        "id": "sendUserName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_zbgz_done",
                "type": "todo",
                "url": "special_work-bj",
                "paras": "?flowStatus=finish&sort=S_draftTimeDes%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-clgl", "type": "", "badge": "4", "title": "公务用车", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []},
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_qtgz_clgl",
                "type": "todo",
                "url": "otherTodoList",
                "paras": "?businessNo=CAR_APPLY&businessCate=apply&flowStatus=running&isFirstState=0&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_qtgz_jbsp",
                "type": "todo",
                "url": "otherTodoList",
                "paras": "?businessNo=CAR_APPLY&flowStatus=done&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_qtgz_ygcc",
                "type": "todo",
                "url": "car_apply-bj",
                "paras": "?applyNo=apply&flowStatus=finish&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "reasons",
                "field": [
                    {
                        "name": "申请人",
                        "id": "applyUserName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "applyDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-addbook", "type": "", "badge": "4", "title": "通讯录", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "../../components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "../../components/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "../../components/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_addbook_inner",
                "type": "inner",
                "url": "inner-contact",
                "paras": "&unitNo=&sort=sortNo%2Casc",
                "openUrl": "gy042",
                "subjectId": "realName",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "组织",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_addbook_outer",
                "type": "outer",
                "url": "outer-contact",
                "paras": "&unitNo=&sort=sortNo%2Casc",
                "openUrl": "gy042",
                "subjectId": "realName",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "个人",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },
    {
        "id": "moa-bghc", "type": "", "badge": "SUPPLIES", "title": "办公耗材", "formTab": [
            {name: "基本信息", pageId: "BaseInfor", loadUrl: "./components/bbsDetails.html", initFlag: "false", datas: []},
            {name:"审批单",pageId:"BaseOpin",loadUrl:"../../components/BaseOpinPage.html",initFlag:"false",datas:[]},
            {name: "查看意见", pageId: "opinion", loadUrl: "./components/opinionPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_xzgl_clgl",
                "type": "cartodo",
                "url": "todo",
                "paras": "?businessNo=SUPPLIES&flowStatus=running&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_xzgl_bgyp",
                "type": "goodstodo",
                "url": "todo",
                "paras": "?businessNo=SUPPLIES&flowStatus=done&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "已办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_xzgl_gdzc",
                "type": "todo",
                "url": "supplies-finish",
                "paras": "?businessNo=SUPPLIES&flowStatus=finish&goodsTyp=1&showAll=false&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-wply", "type": "", "badge": "SUPPLIES", "title": "物品领用", "formTab": [
            {name: "基本信息", pageId: "BaseInfor", loadUrl: "./components/bbsDetails.html", initFlag: "false", datas: []},
            {name:"审批单",pageId:"BaseOpin",loadUrl:"../../components/BaseOpinPage.html",initFlag:"false",datas:[]},
            {name: "查看意见", pageId: "opinion", loadUrl: "./components/opinionPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_bgyp_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=GOODS&flowStatus=running&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办公用品待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_bgyp_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=GOODS&flowStatus=done&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办公用品已办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_bgyp_finish",
                "type": "finish",
                "url": "goods-finish",
                "paras": "?businessNo=GOODS&flowStatus=finish&goodsType=0&showAll=false&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "申请人",
                        "id": "userName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    },
                    {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办公用品办结",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_bghc_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=SUPPLIES&flowStatus=running&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办公耗材待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_bghc_atdo",
                "type": "goodstodo",
                "url": "todo",
                "paras": "?businessNo=SUPPLIES&flowStatus=done&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办公耗材已办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_bghc_finish",
                "type": "todo",
                "url": "supplies-finish",
                "paras": "?businessNo=SUPPLIES&flowStatus=finish&goodsType=1&showAll=false&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "申请人",
                        "id": "userName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    },
                    {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办公耗材办结",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-gzdcx", "type": "", "badge": "4", "title": "工资单查询", "formTab": [
            {name: "基本信息", pageId: "bbsDetails", loadUrl: "./components/bbsDetails.html", initFlag: "false", datas: []},
        ], "view": [
            {
                "id": "mobile_xzgl_clgl",
                "type": "",
                "url": "gzdcx-todo",
                "paras": "?status=1&cardType=-1",
                "openUrl": "gy042",
                "subjectId": "year",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "工资单查询",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-zcbf", "type": "", "badge": "4", "title": "资产报废", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_xzgl_clgl",
                "type": "cartodo",
                "url": "todo",
                "paras": "?businessNo=scrap&flowStatus=running&isFirstState=0",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_xzgl_bgyp",
                "type": "goodstodo",
                "url": "todo",
                "paras": "?businessNo=scrap&flowStatus=done",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "已办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_xzgl_gdzc",
                "type": "todo",
                "url": "transfer-finish",
                "paras": "?businessNo=scrap&flowStatus=finish&sort=",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-mail", "type": "", "badge": "MAIL", "title": "个人邮件", "formTab": [
            {name: "基本信息", pageId: "BaseInfor", loadUrl: "./mailInforPage.html", initFlag: "false", datas: []},
        ], "view": [
            {
                "id": "mobile_receive_mail",
                "type": "mail",
                "url": "receive-mail",
                "paras": "?mailIsDelete=0&mailIsSpam=0&sort=receiveDate,desc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [{
                    "name": "发件人",
                    "id": "fromAddress",
                    "showName": true,
                    "icon": "",
                    "color": ""
                }, {
                    "name": "收件时间",
                    "id": "receiveDate",
                    "showName": false,
                    "icon": "",
                    "color": ""
                }],
                "name": "收件箱",
                "offset": 0,
                "limit": 1000,
                data: {}
            },
            {
                "id": "mobile_send_mail",
                "type": "mail",
                "url": "sent-mail",
                "paras": "?sort=sentDate,desc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [{
                    "name": "收件人",
                    "id": "toAddress",
                    "showName": true,
                    "icon": "",
                    "color": ""
                }, {
                    "name": "收件时间",
                    "id": "sentDate",
                    "showName": false,
                    "icon": "",
                    "color": ""
                }],
                "name": "已发送",
                "offset": 0,
                "limit": 1000,
                data: {}
            },
            {
                "id": "mobile_draft_mail",
                "type": "mail",
                "url": "draft-mail",
                "paras": "?sort=createDate,desc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [{
                    "name": "收件人",
                    "id": "toAddress",
                    "showName": true,
                    "icon": "",
                    "color": ""
                }, {
                    "name": "收件时间",
                    "id": "createDate",
                    "showName": false,
                    "icon": "",
                    "color": ""
                }],
                "name": "草稿箱",
                "offset": 0,
                "limit": 1000,
                data: {}
            }
        ]
    },
    {
        "id": "moa-bgyp", "type": "", "badge": "GOODS", "title": "办公用品", "formTab": [
            //{name:"申请单",pageId:"BaseInfor",loadUrl:"./components/BaseInforPage.html",initFlag:"false",datas:[]},
            {name: "基本信息", pageId: "BaseInfor", loadUrl: "./components/bbsDetails.html", initFlag: "false", datas: []},
            {name:"审批单",pageId:"BaseOpin",loadUrl:"../../components/BaseOpinPage.html",initFlag:"false",datas:[]},
            {
                name: "查看意见",
                pageId: "opinionPage",
                loadUrl: "./components/opinionPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_xzgl_clgl",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=GOODS&flowStatus=running&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_xzgl_bgyp",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=GOODS&flowStatus=done&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "已办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_xzgl_gdzc",
                "type": "finish",
                "url": "goods-finish",
                "paras": "?businessNo=GOODS&flowStatus=finish&goodsTyp=0&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-ZTHY", "type": "", "badge": "4", "title": "专题会议", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components_add/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "./components_add/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "./components_add/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_zthy_todo",
                "type": "hystodo",
                "url": "hystodo",
                "paras": "?businessNo=MEETING&flowStatus=running&businessCate=" + encodeURI('专题会议') + "&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发送人",
                        "id": "sendUserName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_zthy_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=MEETING&flowStatus=done&businessCate=" + encodeURI('专题会议') + "&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_zthy_done",
                "type": "todo",
                "url": "ZTHY_finish",
                "paras": "?meetingType=special&flowStatus=finish&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-MEETING_ACTIVITY", "type": "", "badge": "4", "title": "会议、活动交办事项处理", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components_add/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "./components_add/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "./components_add/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_activity_todo",
                "type": "hystodo",
                "url": "hystodo",
                "paras": "?businessNo=MEETING_ACTIVITY&flowStatus=running&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_activity_atdo",
                "type": "hystodo",
                "url": "hystodo",
                "paras": "?businessNo=MEETING_ACTIVITY&flowStatus=done&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },

    {
        "id": "moa-DZHY", "type": "", "badge": "4", "title": "党组会议", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components_add/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "./components_add/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "./components_add/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_dzhy_todo",
                "type": "hystodo",
                "url": "hystodo",
                "paras": "?businessNo=MEETING&flowStatus=running&isFirstState=0&businessCate=" + encodeURI("党组会议;主任办公会议") + "&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发送人",
                        "id": "sendUserName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_dzhy_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=MEETING&flowStatus=done&businessCate=" + encodeURI("党组会议;主任办公会议") + "&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_dzhy_done",
                "type": "todo",
                "url": "ZTHY_finish",
                "paras": "?meetingType=office&flowStatus=finish&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-WBHY", "type": "", "badge": "4", "title": "会议安排", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components_add/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "./components_add/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "./components_add/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_wbhy_todo",
                "type": "hystodo",
                "url": "hystodo",
                "paras": "?businessNo=MEETING_EXTERNAL&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发送人",
                        "id": "sendUserName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_wbhy_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=MEETING_EXTERNAL&flowStatus=done&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_wbhy_done",
                "type": "todo",
                "url": "WBHY_finish",
                "paras": "?flowStatus=finish&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-DXHY", "type": "", "badge": "4", "title": "码上办会", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components_add/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "./components_add/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "./components_add/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_dxhy_todo",
                "type": "hystodo",
                "url": "hystodo",
                "paras": "?businessNo=MEETING&flowStatus=running&businessCate=" + encodeURI('办会一件事') + "&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发送人",
                        "id": "sendUserName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_dxhy_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=MEETING&flowStatus=done&businessCate=" + encodeURI('办会一件事') + "&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_dxhy_done",
                "type": "todo",
                "url": "DXHY_finish",
                "paras": "?meetingType=doOne&flowStatus=finish&sort=startTime,desc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-hysgl", "type": "", "badge": "4", "title": "会议室预订", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components_add/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "./components_add/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "./components_add/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_hysgl_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=MEETING_BOOK&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "发送人",
                        "id": "sendUserName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办文件",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_hysgl_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=MEETING_BOOK&flowStatus=done&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "businessDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },

    {
        "id": "moa-majorUrger", "type": "", "badge": "4", "title": "委领导批示督办", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components_add/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "./components_add/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "./components_add/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_wldps_todo",
                "type": "todo",
                "url": "majorurger-todo",
                //flowStatus=finish&passReaderStr=U000088&offset=0&limit=15&sort=createTime%2Cdesc
                "paras": "?businessNo=MAJORURGER&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "责任处室",
                        "id": "majorOrgName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "办理时限",
                        "id": "urgerLimitTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_wldps_atdo",
                "type": "todo",
                "url": "majorurger-todo",
                //flowStatus=finish&passReaderStr=U000088&offset=0&limit=15&sort=createTime%2Cdesc
                "paras": "?businessNo=MAJORURGER&flowStatus=done&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "责任处室",
                        "id": "majorOrgName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "办理时限",
                        "id": "urgerLimitTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_wldps_finish",
                "type": "todo",
                "url": "majorurger-finish",
                //flowStatus=finish&passReaderStr=U000088&offset=0&limit=15&sort=createTime%2Cdesc
                "paras": "?flowStatus=finish&sort=createTime,desc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "责任处室",
                        "id": "majorOrgName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "办理时限",
                        "id": "urgerLimitTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "办结",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            // {
            //     "id": "mobile_xzgl_clgl",
            //     "type": "hystodo",
            //     "url": "hystodo",
            //     "paras": "?businessNo=MAJORURGER&flowStatus=running&isFirstState=0",
            //     "openUrl": "gy042",
            //     "subjectId": "businessSubject",
            //     "field": [
            //         {
            //             "name": "发送人",
            //             "id": "sendUserName",
            //             "showName": true,
            //             "icon": "",
            //             "color": ""
            //         }, {
            //             "name": "时间",
            //             "id": "createTime",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }],
            //     "name": "待反馈",
            //     "offset": 0,
            //     "limit": 1000,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0
            // },
            // {"id":"mobile_xzgl_bgyp","type":"todo","url":"majorurger-todo","paras":"?businessNo=MAJORURGER&flowStatus=running&sort=createTime,desc","openUrl":"gy042","subjectId":"businessSubject","field":[
			// {
			// "name":"责任处室",
			// "id":"majorOrgName",
			// "showName":false,
			// "icon":"",
			// "color":""
			// },{
			// "name":"办理时限",
			// "id":"urgerLimitTime",
			// "showName":false,
			// "icon":"",
			// "color":""
			// }],"name":"未办结","offset":0,"limit":15,data:{},loading:false,refreshing:false,finished:false,count:0},
            
        ]
    },
    {
        "id": "moa-urgerClient", "type": "", "badge": "4", "title": "委重点工作督查", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components_add/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "./components_add/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "./components_add/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_xzgl_clgl",
                "type": "hystodo",
                "url": "urgerClient_rwgl",
                "paras": "?pageType=fgwTodo&sort=createDate%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "督办处室",
                        "id": "handleObjectName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "下发时间",
                        "id": "createDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办任务",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_xzgl_bgyp",
                "type": "todo",
                "url": "urgerClient_rwgl",
                "paras": "?pageType=fgwHasDo&sort=createDate%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "督办处室",
                        "id": "handleObjectName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "下发时间",
                        "id": "createDate",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办任务",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            }
        ]
    },
    {
        "id": "moa-listurger", "type": "", "badge": "4", "title": "省领导批示督办", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components_add/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "./components_add/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "./components_add/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_sldps_todo",
                "type": "todo",
                "url": "listurger-todo",
                //flowStatus=finish&passReaderStr=U000088&offset=0&limit=15&sort=createTime%2Cdesc
                "paras": "?businessNo=LISTURGER&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "责任处室",
                        "id": "majorOrgName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "办理时限",
                        "id": "urgerLimitTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_sldps_atdo",
                "type": "todo",
                "url": "listurger-todo",
                //flowStatus=finish&passReaderStr=U000088&offset=0&limit=15&sort=createTime%2Cdesc
                "paras": "?businessNo=LISTURGER&flowStatus=done&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "责任处室",
                        "id": "majorOrgName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "办理时限",
                        "id": "urgerLimitTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            // {
            //     "id": "mobile_sldps_todo", "type": "todo", "url": "listurger-todo", "paras": "?businessNo=LISTURGER&flowStatus=running&sort=createTime,desc", "openUrl": "gy042", "subjectId": "businessSubject", "field": [
            //         {
            //             "name": "责任处室",
            //             "id": "majorOrgName",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }, {
            //             "name": "办理时限",
            //             "id": "urgerLimitTime",
            //             "showName": false,
            //             "icon": "",
            //             "color": ""
            //         }], "name": "未办结", "offset": 0, "limit": 15, data: {}, loading: false, refreshing: false, finished: false, count: 0
            // },
                {
                    "id": "mobile_sldps_finish",
                    "type": "todo",
                    "url": "listurger-finish",
                    //flowStatus=finish&passReaderStr=U000088&offset=0&limit=15&sort=createTime%2Cdesc
                    "paras": "?flowStatus=finish&sort=createTime,desc",
                    "openUrl": "gy042",
                    "subjectId": "subject",
                    "field": [
                        {
                            "name": "责任处室",
                            "id": "majorOrgName",
                            "showName": false,
                            "icon": "",
                            "color": ""
                        }, {
                            "name": "办理时限",
                            "id": "urgerLimitTime",
                            "showName": false,
                            "icon": "",
                            "color": ""
                        }],
                    "name": "办结",
                    "offset": 0,
                    "limit": 15,
                    data: {},
                    loading: false,
                    refreshing: false,
                    finished: false,
                    count: 0
                }
        ]
    },
    {
        "id": "moa-fileurger", "type": "", "badge": "4", "title": "亮灯件", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components_add/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "./components_add/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "./components_add/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_fileurger_all",
                "type": "fileurger-ldj",
                "url": "fileurger-ldj",
                "paras": "",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "主办处室",
                        "id": "majorOrgName",
                        "showName": true,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "期限时间",
                        "id": "fileLimitTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "所有亮灯件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            
        ]
    },
    {
        "id": "moa-informal", "type": "", "badge": "4", "title": "征求意见", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "../../components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "../../components/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "../../components/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_informal_todo",
                "type": "sbtodo",
                "url": "todo",
                "paras": "?businessNo=INFORMAL&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_informal_atdo",
                "type": "sbatdo",
                "url": "todo",
                "paras": "?businessNo=INFORMAL&flowStatus=done&sort=endTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },
    {
        "id": "moa-informal", "type": "", "badge": "4", "title": "征求意见", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "../../components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "../../components/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "../../components/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_informal_todo",
                "type": "sbtodo",
                "url": "todo",
                "paras": "?businessNo=INFORMAL&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_informal_atdo",
                "type": "sbatdo",
                "url": "todo",
                "paras": "?businessNo=INFORMAL&flowStatus=done&sort=endTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "审批类型",
                        "id": "businessName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },
     {
        "id": "moa-partywork", "type": "", "badge": "4", "title": "机关党建", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "../../components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查阅文件",
                pageId: "FileRead",
                loadUrl: "../../components/FileListPage.html",
                initFlag: "false",
                datas: []
            },
            {
                name: "查看流程",
                pageId: "FlowRead",
                loadUrl: "../../components/FlowReadPage.html",
                initFlag: "false",
                datas: []
            }
        ], "view": [
            {
                "id": "mobile_partywork_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=PARTY_WORK&flowStatus=running&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_partywork_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=PARTY_WORK&flowStatus=done&sort=endTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }, {
                        "name": "时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": ""
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 1000,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },
    {
        "id": "moa-wjzl", "type": "", "badge": "4", "title": "文件资料", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_wjzl_dispatch",
                "type": "resourse-list",
                "url": "resourse-list",
                "paras": "?beginYear=&endYear=&fileType=&isHistoryFile=no&source=dispatch&regType=&sort=docMark%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "title",
                "field": [
                    {
                        "name": "文件字号",
                        "id": "docMark",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },
                    {
                        "name": "签发日期",
                        "id": "signDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "发文文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_wjzl_receival",
                "type": "resourse-list",
                "url": "resourse-list",
                "paras": "?beginYear=&endYear=&fileType=&isHistoryFile=no&source=receival&regType=&sort=docMark%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "title",
                "field": [
                    {
                        "name": "文件字号",
                        "id": "docMark",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },
                    {
                        "name": "签发日期",
                        "id": "signDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "收文文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_wjzl_dept",
                "type": "resourse-list",
                "url": "resourse-list",
                "paras": "?year=&beginYear=&endYear=&infoType=&fileType=&historyDocCate=&filterFlag=true&isHistoryFile=&source=&publicFlat=&loadFlag=&loadFlagIsNull=&regType=&handleUnit=&dealUnit=&sort=docMark%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "title",
                "field": [
                    {
                        "name": "文件字号",
                        "id": "docMark",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },
                    {
                        "name": "签发日期",
                        "id": "signDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "本处室文件",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            // {
            //     "id": "mobile_wjzl_history",
            //     "type": "resourse-list",
            //     "url": "resourse-list",
            //     "paras": "?year=&beginYear=&endYear=&infoType=&fileType=&historyDocCate=&extension=&isHistoryFile=yes&source=&publicFlat=&loadFlag=&loadFlagIsNull=&regType=&sort=orderDocMark%2Cdesc",   
            //     "openUrl": "gy042",
            //     "subjectId": "title",
            //     "field": [
            //         {
            //             "name": "文件字号",
            //             "id": "docMark",
            //             "showName": false,
            //             "icon": "",
            //             "color": "",
            //             "count": 11
            //         },
            //         {
            //             "name": "签发日期",
            //             "id": "signDate",
            //             "showName": false,
            //             "icon": "",
            //             "color": "",
            //             "count": 11
            //         }],
            //     "name": "历史文件",
            //     "offset": 0,
            //     "limit": 15,
            //     data: {},
            //     loading: false,
            //     refreshing: false,
            //     finished: false,
            //     count: 0
            // },
           
        ]
    },
    {
        "id": "moa-xxyd", "type": "", "badge": "4", "title": "学习园地", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_xxyd_zxzl",
                "type": "study",
                "url": "study",
                "paras": "",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "资料类别",
                        "id": "targetPage",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },
                    {
                        "name": "时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "学习园地",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            
        ]
    },
    {
        "id": "moa-zycl", "type": "", "badge": "4", "title": "重要材料", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_zycl_zyclnr",
                "type": "importantMaterial",
                "url": "importantMaterial",
                "paras": "?status=1",
                "openUrl": "gy042",
                "subjectId": "title",
                "field": [
                    {
                        "name": "牵头处室",
                        "id": "draftDept",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发布时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "重要材料内容",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            
        ]
    },
    {
        "id": "moa-dsj", "type": "", "badge": "4", "title": "大事记", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_dsj",
                "type": "bigEvents",
                "url": "bigEvents",
                "paras": "?status=1",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "大事记类别",
                        "id": "category",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发布时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "发布信息",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            
        ]
    },
    {
        "id": "moa-gzzj", "type": "", "badge": "4", "title": "工作总结", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_gzzj_office",
                "type": "workSummary",
                "url": "workSummary",
                "paras": "?category=office&status=1&sort=publishDate%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "title",
                "field": [
                    {
                        "name": "姓名",
                        "id": "draftUser",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发布时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "处室工作总结",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_gzzj_personal",
                "type": "workSummary",
                "url": "workSummary",
                "paras": "?category=personal&status=1&sort=publishDate%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "title",
                "field": [
                    {
                        "name": "姓名",
                        "id": "draftUser",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发布时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "个人工作总结",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_gzzj_party",
                "type": "workSummary",
                "url": "workSummary",
                "paras": "?category=party&status=1&sort=publishDate%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "title",
                "field": [
                    {
                        "name": "姓名",
                        "id": "draftUser",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发布时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "基层工作总结",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },
    {
        "id": "moa-tzgg", "type": "", "badge": "4", "title": "通知公告", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_tzgg_zxgg",
                "type": "bbs",
                "url": "bbs",
                "paras": "",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "发布人",
                        "id": "draftUser",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },
                    {
                        "name": "时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "最新公告",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            
        ]
    },
    {
        "id": "moa-toolBox", "type": "", "badge": "4", "title": "工具箱", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_toolBox",
                "type": "toolBox",
                "url": "toolBox",
                "paras": "?status=1",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "资源类别",
                        "id": "targetPage",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发布时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "发布信息",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            
        ]
    },
    {
        "id": "moa-dzcs", "type": "", "badge": "4", "title": "电子处室", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_dzcs_gzsc",
                "type": "orgDoc",
                "url": "orgDoc",
                "paras": "",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "日期",
                        "id": "draftDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "电子处室",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            
        ]
    },
    {
        "id": "moa-jgdj", "type": "", "badge": "4", "title": "机关党建", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_jgdj_zxdj",
                "type": "partyBuilding",
                "url": "partyBuilding",
                "paras": "?sort=&pbCategory=",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "类型",
                        "id": "pbCategoryName",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发布时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "最新党建",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_jgdj_sxjs",
                "type": "partyBuilding",
                "url": "partyBuilding",
                "paras": "?status=1&pbCategoryName=思想建设&sort=&pbCategory=",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "类型",
                        "id": "pbCategoryName",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发布时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "思想建设",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_jgdj_zzjs",
                "type": "partyBuilding",
                "url": "partyBuilding",
                "paras": "?status=1&pbCategoryName=组织建设&sort=&pbCategory=",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "类型",
                        "id": "pbCategoryName",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发布时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "组织建设",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_jgdj_zfjs",
                "type": "partyBuilding",
                "url": "partyBuilding",
                "paras": "?status=1&pbCategoryName=作风建设&sort=&pbCategory=",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "类型",
                        "id": "pbCategoryName",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发布时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "作风建设",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_jgdj_dflzjs",
                "type": "partyBuilding",
                "url": "partyBuilding",
                "paras": "?status=1&pbCategoryName=党风廉政建设&sort=&pbCategory=",
                "openUrl": "gy042",
                "subjectId": "subject",
                "field": [
                    {
                        "name": "类型",
                        "id": "pbCategoryName",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发布时间",
                        "id": "publishDate",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "党风廉政建设",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
        ]
    },
    {
        "id": "moa-tqgz", "type": "", "badge": "4", "title": "团青工作", "formTab": [
            {
                name: "办理单",
                pageId: "BaseInfor",
                loadUrl: "./components/BaseInforPage.html",
                initFlag: "false",
                datas: []
            },
            {name: "查阅文件", pageId: "FileRead", loadUrl: "./components/FileListPage.html", initFlag: "false", datas: []},
            {name: "查看流程", pageId: "FlowRead", loadUrl: "./components/FlowReadPage.html", initFlag: "false", datas: []}
        ], "view": [
            {
                "id": "mobile_tqgz_todo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=YOUTH_WORK&flowStatus=running&isFirstState=0&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发送时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "待办",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_tqgz_atdo",
                "type": "todo",
                "url": "todo",
                "paras": "?businessNo=YOUTH_WORK&flowStatus=done&sort=createTime%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "businessSubject",
                "field": [
                    {
                        "name": "当前环节",
                        "id": "stateName",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "发送时间",
                        "id": "createTime",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "在办",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            {
                "id": "mobile_tqgz_finish",
                "type": "youth_work-finish",
                "url": "youth_work-finish",
                "paras": "?flowStatus=finish&sort=S_draftTimeDes%2Cdesc",
                "openUrl": "gy042",
                "subjectId": "C_subject",
                "field": [
                    {
                        "name": "发起人",
                        "id": "S_draftUserName",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    },{
                        "name": "申请时间",
                        "id": "S_createTime",
                        "showName": false,
                        "icon": "",
                        "color": "",
                        "count": 11
                    }],
                "name": "办结",
                "offset": 0,
                "limit": 15,
                data: {},
                loading: false,
                refreshing: false,
                finished: false,
                count: 0
            },
            
        ]
    },
];

//自定义配置的基本信息
var docWordInfo = {
    "dispatch": {
        "标题": "subject",
        "机关代字": "docWord",
        "发文字号": "docMark",
        "拟稿部门": "draftDept",
        "拟稿人": "draftUserName",
        "局务公开": "jwPublicFlag",
        "党务公开": "dwPublicFlag",
        "主送": "mainSend",
        "抄送": "copySend",
        "拟稿备注": "remark"
    },
    "receival": {
        "标题": "subject",
        "文件字号": "docMark",
        "来文单位": "sourceUnit",
        "成文日期": "signDate",
        "收文日期": "draftDate",
        "备注": "remark"
    },
    "informal": {
        "标题": "subject",
        "会议议程": "agenda",
        "开始时间": "beginTime",
        "结束时间": "endTime",
        "会议地点": "meetingAddressName",
        "备注": "remark"
    },
    "car_apply": {
        "标题": "reasons",
        "用车处室": "applyDept",
        "登记时间": "applyDate",
        "经办人": "applyUserName",
        "电话": "mobile",
        "用车人": "useCarName",
        "用车人手机": "useCarMobile",
        "随行人员": "",
        "路途": "carPath",
        "目的地": "locationTo",
        "出发时间": "applyStartTime",
        "返回时间": "applyEndTime",
        "是否有返航车辆": "returnCar",
        "车辆型号": "carType",
        "乘车人数": "passengerNum",
        "候车地点": "useCarPlace",
        "用车事由": "reasons",
        "备注": "remark"
    },
    "URGER": {
        "重点工作": "subject",
        "details" :{
            "反馈时间": "nodeTime",
            "责任处室": "handleObjectName",
            "经办人": "signUserName",
            "年度目标": "annualTarget",
            "进展情况": "completeSituation",
            "下一步工作计划": "nextPlan",
            "存在问题": "problem",
            "反馈情况": "feedbackSituation",
            "量化": "liangHuaJinDu",
            "定性": "dingXingZhiBiao"
        }
    },
    "urgerreport": {
        "重点工作": "subject",
        
            "量化": "liangHuaJinDu",
            "定性": "dingXingZhiBiao",
            //"责任处室": "handleObjectName",
            //"经办人": "signUserName",
            //"年度目标": "annualTarget",
            "进展情况": "completeSituation",
            "存在问题": "problem",
            "下一步计划": "nextPlan",
            "反馈情况": "feedbackSituation",
            "反馈时间": "nodeTime",
        
    },
    "meeting": {
        "标题": "subject",
        "时间": "draftDate",
        "地点": "rootName",
        "主持人": "hostUser",
        "会议议题": "subject",
        "出席": "attendUser",
        "列席": "sitUser"
    }
};

//返回ng可中转地址
function getPartUrl(name) {
    return ZjgyUrl[name];
}

//所有接口
var ZjgyUrl = {
    "todo": "/workflow/getActivityWorkTodoList4Page", /*待办*/
    "toread": "/workflow/getFlowWorkReadList4Page", /*待阅*/
    "bbs": "/bbs/bbs/getBbs4Page",/*通知公告*/
    "CommitteeLeader" : "/doc/receival/getCommitteeLeadersApproval4Page", /*委领导批示*/
    "update-FlowReader" : "/workflow/updateFlowReaderExtensions",/*阅件-修改是否点击过的状态*/
    /*收文模块*/
    "receival-todo": "doc/receival/getActivityWorkTodoList4Page",//收文列表
    "receival-done": "doc/receival/receivalSolrPageJson",/*收文已办*/
    "receival-wj": "/doc/receival/getReceivalById", /*收文文件信息---*/
    "receival-dysw": "/receival/receivalSolrPageJson?isAll=true", /*单位收文列表--*/
    "receival-per": "/doc/receival/workflow/getProcessPermission",/*收文流程权限*/
    "receival-bld": "/doc/receival/getEgovTemplateFileByDocCate",
    "Tfs-receival": "/doc/receival/workflow/flowSend", /* 收文发送提交--*/
    "Gfs-receival": "/doc/receival/workflow/getTransitionAndAssign", /* 收文发送获取---*/
    "Gth-receival": "/doc/receival/workflow/getReturnAssign", /*收文退回获取*/
    "Tth-receival": "/doc/receival/workflow/flowReturn", /* 收文退回提交*/
    "Gzb-receival": "/doc/receival/workflow/getTransferAssign", /*收文转办获取--*/
    "Tzb-receival": "/doc/receival/workflow/flowTransferSend", /*收文转办提交--*/
    "Tcb-receival": "/doc/receival/workflow/flowCancle", /*收文撤办---*/
    "Tbb-receival": "/doc/receival/workflow/flowDone", /* 收文办毕提交---/receival/wflow/submitProcessWithoutUsers*/
    "SerialDone-receival" : "/doc/receival/workflow/flowSerialDone",/*办毕送下一个*/
    "Tbj-receival": "/doc/receival/workflow/flowFinish", /*收文办结（结束）提交---/receival/wflow/setProcessDone*/
    'upadete-receival': "/doc/receival/updateReceival",/*收文取消关联*/
    "ZDfs-receival": "/doc/receival/workflow/flowAutoSend", /*收文自动发送提交*/
    "passRead-receival" : "/doc/receival/workflow/insertFlowPassRead",/*传阅*/
    "Fsd-receival": "/doc/receival/workflow/flowSerialDone", /* 收文办结提交*/
    "opinion-add-receival": "/doc/receival/opinion/insertDocOpinion", /*添加新增意见---/doc/receival/opinion/insertDocOpinion*/
    "opinion-upd-receival": "/doc/receival/opinion/updateDocOpinion", /*修改意见---/doc/receival/opinion/updateDocOpinion*/

    /*发文模块*/
    "dispatch-todo": "doc/dispatch/getActivityWorkTodoList4Page",//发文列表
    "dispatch-done": "/doc/dispatch/dispatchSolrPageJson",/*收文已办*/
    "dispatch-wj": "/doc/dispatch/getDispatchById", /*收文文件信息--*/
    "dispatch-per": "/doc/dispatch/workflow/getProcessPermission",/*收文流程权限*/
    "dispatch-bld": "/doc/dispatch/getEgovTemplateFileByDocCate",
    "Tfs-dispatch": "/doc/dispatch/workflow/flowSend", /* 发文发送提交--*/
    "Gfs-dispatch": "/doc/dispatch/workflow/getTransitionAndAssign", /* 发文发送获取--*/
    "Gth-dispatch": "/doc/dispatch/workflow/getReturnAssign", /*发文退回获取*/
    "Tth-dispatch": "/doc/dispatch/workflow/flowReturn", /*发文退回提交*/
    "Gzb-dispatch": "/doc/dispatch/workflow/getTransferAssign", /*发文转办获取---*/
    "Tzb-dispatch": "/doc/dispatch/workflow/flowTransferSend", /*发文转办提交--*/
    "Tcb-dispatch": "/doc/dispatch/workflow/flowCancle", /*发文撤办---*/
    "Tbb-dispatch": "/doc/dispatch/workflow/flowDone", /* 发文办毕提交---/dispatch/wflow/submitProcessWithoutUsers*/
    "Tbj-dispatch": "/doc/dispatch/workflow/flowFinish", /* 发文办结（结束）提交---/dispatch/wflow/setProcessDone*/
    'upadete-dispatch': "/doc/dispatch/updateDispatch",/*发文取消关联*/
    "ZDfs-dispatch": "/doc/dispatch/workflow/flowAutoSend", /*gy019 发文自动发送提交*/
    "getFileword-dispatch": "/doc/dispatch/disfileword/getFilewordList",/*获取流程（文件字）*/
    "otherTodoList": "/workflow/getActivityWorkTodoList4Page",/*部分模块待办列表*/
    "updateSignInfo" : "/doc/dispatch/updateSignInfo",//签发意见
    "passRead-dispatch" : "/doc/dispatch/workflow/insertFlowPassRead",/*传阅*/
    "Fsd-dispatch": "/doc/dispatch/workflow/flowSerialDone", /* 发文办结提交*/
    "opinion-add-dispatch": "/doc/dispatch/opinion/insertDocOpinion", /*添加新增意见---/doc/dispatch/opinion/insertDocOpinion*/
    "opinion-upd-dispatch": "/doc/dispatch/opinion/updateDocOpinion", /*修改意见---/doc/dispatch/opinion/updateDocOpinion*/

    /*公务用车 */
    "car_apply-bj": "/car/carApply/getCarApply4Page",/*公务用车待办列表*/
    "car_apply-wj": "/car/carApply/getCarApplyDetailById",/*用车文件信息*/
    "car_apply-per": "/doc/carApply/workflow/getProcessPermission",/*车辆流程权限*/
    "car_apply-bld": "/car/carApply/getTemplateFile",
    "Tfs-car_apply": "/car/workflow/flowSend", /* 车辆发送提交--*/
    "Gfs-car_apply": "/car/workflow/getTransitionAndAssign", /* 车辆发送获取--*/
    "Gth-car_apply": "/car/workflow/getReturnAssign", /*车辆退回获取*/
    "Tth-car_apply": "/car/workflow/flowFreedomReturn", /*车辆退回提交*/
    "Gzb-car_apply": "/car/workflow/getTransferAssign", /*车辆转办获取---*/
    "Tzb-car_apply": "/car/workflow/flowTransferSend", /*车辆转办提交--*/
    "Tcb-car_apply": "/car/workflow/flowCancle", /*车辆撤办---*/
    "Tbb-car_apply": "/car/workflow/flowDone", /* 车辆办毕提交---*/
    "Tbj-car_apply": "/car/workflow/flowFinish", /* 车辆办结（结束）提交--- */
    "ZDfs-car_apply": "/car/workflow/flowAutoSend", /*gy019 车辆自动发送提交*/
   
    /*办公用品管理 */
    "goodstodo": "/goodssupplies/applyGoodsSupplies/getApplyGoodsSupplies4Page",/*办公用品待办列表*/
    /*省领导批示管理 */
    "sldpstodo": "/doc/receival/getProvinceLeadersApproval4Page",/*省领导批示管理待办列表*/
    "sldpsj":"/doc/receival/getProvinceApproval4PageByReadPermission",/*领导批示件*/

    /*委领导批示管理 */
    "wldpstodo": "/doc/receival/getCommitteeLeadersApprovalDetail4Page",/*委领导批示-线下*/
    "wldpsnw": "/doc/receival/getCommitteeLeadersApproval4Page",/*委领导批示-内网*/

    // "wldpstodo": "/doc/receival/getCommitteeLeadersApproval4Page",/*委领导批示-线下*/
    // "wldpsnw": "/doc/receival/getCommitteeApproval4PageByRoleType",/*委领导批示-内网*/

    /*会议室预订*/
    "hystodo": "/workflow/getActivityWorkTodoList4Page",/*会议室预订*/
    "meeting_book-wj": "/meeting/getMeetingBookById",/*会议室信息*/
    "meeting_book-per": "/meeting/book/workflow/getProcessPermission",/*会议室流程权限*/
    "meeting_book-bld": "/meeting/getTemplateFile",
    "meeting-wj": "/meeting/getMeetingById",/*会议文件信息*/
    "meeting-per": "/meeting/workflow/getProcessPermission",/*会议流程权限*/
    "meeting-bld": "/meeting/getTemplateFile",

    "Tfs-meeting_book": "/meeting/book/workflow/flowSend", /* 会议发送提交--*/
    "Gfs-meeting_book": "/meeting/book/workflow/getTransitionAndAssign", /* 会议发送获取---*/
    "Gth-meeting_book": "/meeting/book/workflow/getReturnAssign", /*会议退回获取*/
    "Tth-meeting_book": "/meeting/book/workflow/flowFreedomReturn", /* 会议退回提交*/
    "Gzb-meeting_book": "/meeting/book/workflow/getTransferAssign", /*会议转办获取--*/
    "Tzb-meeting_book": "/meeting/book/workflow/flowTransferSend", /*会议转办提交--*/
    "Tcb-meeting_book": "/meeting/book/workflow/flowCancle", /*会议撤办---*/
    "Tbb-meeting_book": "/meeting/book/workflow/flowDone", /*会议办毕提交---/meeting/wflow/flowDone*/
    "Tbj-meeting_book": "/meeting/book/workflow/flowFinish", /*会议办结提交---/meeting/wflow/flowFinish*/
    'upadete-meeting_book': "/meeting/updateReceival",/*会议取消关联/*/
    "ZDfs-meeting_book": "/meeting/book/workflow/flowAutoSend", /*会议自动发送提交*/

    /*新增会议模块Url*/
    
    /*党组会议、专题会议、大型会议*/
    "Tfs-meeting": "/meeting/workflow/flowSend", /* 会议发送提交--*/
    "Gfs-meeting": "/meeting/workflow/getTransitionAndAssign", /* 会议发送获取---*/
    "Gth-meeting": "/meeting/workflow/getReturnAssign", /*会议退回获取*/
    "Tth-meeting": "/meeting/workflow/flowFreedomReturn", /* 会议退回提交*/
    "Gzb-meeting": "/meeting/workflow/getTransferAssign", /*会议转办获取--*/
    "Tzb-meeting": "/meeting/workflow/flowTransferSend", /*会议转办提交--*/
    "Tcb-meeting": "/meeting/workflow/flowCancle", /*会议撤办---*/
    "Tbb-meeting": "/meeting/workflow/flowDone", /*会议办毕提交---/meeting/wflow/flowDone*/
    "Tbj-meeting": "/meeting/workflow/flowFinish", /*会议办结提交---/meeting/wflow/flowFinish*/
    "upadete-meeting": "meeting/updateMeetingAndBook", //会议关联
    "ZDfs-meeting": "/meeting/workflow/flowAutoSend", /*会议自动发送提交*/
    "meeting_dzhy-wj": "/meeting/getMeetingAndIssueById",/*党组会议信息*/
    "DXHY_finish": "meeting/getMeeting4Page",/*大型会议办结*/
    "ZTHY_finish": "meeting/getMeeting4Page",/*专题会议办结*/
    "ZTHY-wj": "/meeting/getMeetingById",/*会议文件信息*/

    /*码上办会*/
    "meeting-pay": "/meeting/getMeetingPayIssuedById",//预算信息

    /*外部会议*/
    "meeting_external-wj": "/meeting/external/getMeetingExternalById",/*外部会议*/
    "meeting_external-per": "/meeting/external/workflow/getProcessPermission",/*外部会议流程权限*/
    "meeting_external-bld": "/meeting/external/getTemplateFile",
    "Tfs-meeting_external": "/meeting/external/workflow/flowSend", /* 会议发送提交--*/
    "Gfs-meeting_external": "/meeting/external/workflow/getTransitionAndAssign", /* 会议发送获取---*/
    "Gth-meeting_external": "/meeting/external/workflow/getReturnAssign", /*会议退回获取*/
    "Tth-meeting_external": "/meeting/external/workflow/flowFreedomReturn", /* 会议退回提交*/
    "Gzb-meeting_external": "/meeting/external/workflow/getTransferAssign", /*会议转办获取--*/
    "Tzb-meeting_external": "/meeting/external/workflow/flowTransferSend", /*会议转办提交--*/
    "Tcb-meeting_external": "/meeting/external/workflow/flowCancle", /*会议撤办---*/
    "Tbb-meeting_external": "/meeting/external/workflow/flowDone", /*会议办毕提交---/meeting/wflow/flowDone*/
    "Tbj-meeting_external": "/meeting/external/workflow/flowFinish", /*会议办结提交---/meeting/wflow/flowFinish*/
    'upadete-meeting_external': "/meeting/updateReceival",/*会议取消关联/*/
    "ZDfs-meeting_external": "/meeting/external/workflow/flowAutoSend", /*会议自动发送提交*/
    "WBHY_finish": "meeting/external/getMeetingExternal4Page",/*外部会议办结*/

    /*党组会议-会议议题*/
    "meeting_issue-wj": "/meeting/getMeetingIssueApplyById",/*议题文件信息*/
    "meeting_issue-per": "/meeting/issue/workflow/getProcessPermission",/*议题文件流程权限*/
    "meeting_issue-bld": "/meeting/getTemplateFile",
    "Tfs-meeting_issue": "/meeting/issue/workflow/flowSend", /* 会议发送提交--*/
    "Gfs-meeting_issue": "/meeting/issue/workflow/getTransitionAndAssign", /* 会议发送获取---*/
    "Gth-meeting_issue": "/meeting/issue/workflow/getReturnAssign", /*会议退回获取*/
    "Tth-meeting_issue": "/meeting/issue/workflow/flowFreedomReturn", /* 会议退回提交*/
    "Gzb-meeting_issue": "/meeting/issue/workflow/getTransferAssign", /*会议转办获取--*/
    "Tzb-meeting_issue": "/meeting/issue/workflow/flowTransferSend", /*会议转办提交--*/
    "Tcb-meeting_issue": "/meeting/issue/workflow/flowCancle", /*会议撤办---*/
    "Tbb-meeting_issue": "/meeting/issue/workflow/flowDone", /*会议办毕提交---/meeting/wflow/flowDone*/
    "Tbj-meeting_issue": "/meeting/issue/workflow/flowFinish", /*会议办结提交---/meeting/wflow/flowFinish*/
    "ZDfs-meeting_issue": "/meeting/issue/workflow/flowAutoSend", /*会议自动发送提交*/

    /*会议、活动交办事项处理*/
    "meeting_activity-wj": "/meeting/getMeetingActivityById",/*j基本信息*/
    "meeting_activity-per": "/meeting/activity/workflow/getProcessPermission",/*流程权限*/
    "meeting_activity-bld": "/meeting/getTemplateFile",
    "Tfs-meeting_activity": "/meeting/activity/workflow/flowSend", /* 会议发送提交--*/
    "Gfs-meeting_activity": "/meeting/activity/workflow/getTransitionAndAssign", /* 会议发送获取---*/
    "Gth-meeting_activity": "/meeting/activity/workflow/getReturnAssign", /*会议退回获取*/
    "Tth-meeting_activity": "/meeting/activity/workflow/flowFreedomReturn", /* 会议退回提交*/
    "Gzb-meeting_activity": "/meeting/activity/workflow/getTransferAssign", /*会议转办获取--*/
    "Tzb-meeting_activity": "/meeting/activity/workflow/flowTransferSend", /*会议转办提交--*/
    "Tcb-meeting_activity": "/meeting/activity/workflow/flowCancle", /*会议撤办---*/
    "Tbb-meeting_activity": "/meeting/activity/workflow/flowDone", /*会议办毕提交---/meeting/wflow/flowDone*/
    "Tbj-meeting_activity": "/meeting/activity/workflow/flowFinish", /*会议办结提交---/meeting/wflow/flowFinish*/
    'upadete-meeting_activity': "/meeting/updateReceival",/*会议取消关联/*/
    "ZDfs-meeting_activity": "/meeting/activity/workflow/flowAutoSend", /*会议自动发送提交*/

    /*新增会议模块Url*/

    /*新增委领导批示督办模块Url*/
    "majorurger-wj": "/majorurger/getMajorUrgerOrInit",
    "majorurger-per": "/majorurger/workflow/getProcessPermission",
    "majorurger-bld": "/majorurger/getEgovTemplateFileByDocCate",
    "Tfs-majorurger": "/majorurger/workflow/flowSend", /* 委领导批示督办发送提交--*/
    "Gfs-majorurger": "/majorurger/workflow/getTransitionAndAssign", /* 委领导批示督办议发送获取---*/
    "Gth-majorurger": "/majorurger/workflow/getReturnAssign", /*委领导批示督办退回获取*/
    "Tth-majorurger": "/majorurger/workflow/flowReturn", /* 委领导批示督办退回提交*/
    "Gzb-majorurger": "/majorurger/workflow/getTransferAssign", /*委领导批示督办转办获取--*/
    "Tzb-majorurger": "/majorurger/workflow/flowTransferSend", /*委领导批示督办转办提交--*/
    "Tcb-majorurger": "/majorurger/workflow/flowCancle", /*委领导批示督办撤办---*/
    "Tbb-majorurger": "/majorurger/workflow/flowDone", /*委领导批示督办办毕提交---/meeting/wflow/flowDone*/
    "Tbj-majorurger": "/majorurger/workflow/flowFinish", /*委领导批示督办办结提交---/meeting/wflow/flowFinish*/
    'upadete-majorurger': "/majorurger/updateReceival",/*委领导批示督办取消关联/*/
    "ZDfs-majorurger": "/majorurger/workflow/flowAutoSend", /*委领导批示督办自动发送提交*/
    "majorurger-todo": "/majorurger/getActivityWorkTodoList4Page",/*办件*/
    "majorurger-tofinish": "/majorurger/getActivityWorkTodoList4PageByStatus",/*未办结*/
    "majorurger-finish":"majorurger/getMajorUrger4Page",/*已办结*/
    "majorurger-hometodo" : "/majorurger/getMajorUrgerActivityWorkTodoList4Page",/*首页待办*/
    
    /*批示督办*/
    "URGER-wj": "/urger/client/getUrgerTaskById",
    "URGER-per": "/urger/client/workflow/getProcessPermission",
    "URGER-bld": "/urger/client/getTemplateFile",
    "Tfs-URGER": "urger/client/workflow/flowSend", /* 批示督办发送提交--*/
    "Gfs-URGER": "/urger/client/workflow/getTransitionAndAssign", /* 批示督办议发送获取---*/
    "Gth-URGER": "/urger/client/workflow/getReturnAssign", /*批示督办退回获取*/
    "Tth-URGER": "/urger/client/workflow/flowReturn", /* 批示督办退回提交*/
    "Gzb-URGER": "/urger/client/workflow/getTransferAssign", /*批示督办转办获取--*/
    "Tzb-URGER": "/urger/client/workflow/flowTransferSend", /*批示督办转办提交--*/
    "Tcb-URGER": "/urger/client/workflow/flowCancle", /*批示督办撤办---*/
    "Tbb-URGER": "/urger/client/workflow/flowDone", /*批示督办办毕提交---/meeting/wflow/flowDone*/
    "Tbj-URGER": "/urger/client/workflow/flowFinish", /*批示督办办结提交---/meeting/wflow/flowFinish*/
    'upadete-URGER': "/urger/client/updateReceival",/*批示督办取消关联/*/
    "ZDfs-URGER": "/urger/client/workflow/flowAutoSend", /*批示督办自动发送提交*/
    "getOpinion-URGER" : "/opinion/listDocOpinion", /*委领导批示督办查看意见列表*/
    "update-UTSU" : "/urger/report/updateUrgerTaskSignUnit",/*更新反馈任务阅件状态*/
    "update-UTF" : "/urger/report/updateUrgerTaskFeedback",/*更新反馈状态*/
    "insert-UOR" :"/urger/report/insertUrgerOperateRecord",/*更新操作记录表附件*/

     /*委重点工作督查*/
     "urgerClient_rwgl": "/urger/report/getUrgerTaskSignUnit4Page",
     "urgerreport-wj": "/urger/client/getUrgerTaskById",
     "urgerreport-per": "/urger/client/workflow/getProcessPermission",
     "urgerreport-bld": "/urger/client/getTemplateFile",
     "Tfs-urgerreport": "urger/client/workflow/flowSend", /* 批示督办发送提交--*/
     "Gfs-urgerreport": "/urger/client/workflow/getTransitionAndAssign", /* 批示督办议发送获取---*/
     "Gth-urgerreport": "/urger/client/workflow/getReturnAssign", /*批示督办退回获取*/
     "Tth-urgerreport": "/urger/client/workflow/flowReturn", /* 批示督办退回提交*/
     "Gzb-urgerreport": "/urger/client/workflow/getTransferAssign", /*批示督办转办获取--*/
     "Tzb-urgerreport": "/urger/client/workflow/flowTransferSend", /*批示督办转办提交--*/
     "Tcb-urgerreport": "/urger/client/workflow/flowCancle", /*批示督办撤办---*/
     "Tbb-urgerreport": "/urger/client/workflow/flowDone", /*批示督办办毕提交---/meeting/wflow/flowDone*/
     "Tbj-urgerreport": "/urger/client/workflow/flowFinish", /*批示督办办结提交---/meeting/wflow/flowFinish*/
     'upadete-urgerreport': "/urger/client/updateReceival",/*批示督办取消关联/*/
     "ZDfs-urgerreport": "/urger/client/workflow/flowAutoSend", /*批示督办自动发送提交*/
     "getOpinion-urgerreport" : "/opinion/listDocOpinion", /*委领导批示督办查看意见列表*/
     "update-UTSU" : "/urger/report/updateUrgerTaskSignUnit",/*更新反馈任务阅件状态*/
     "update-UTF" : "/urger/report/updateUrgerTaskFeedback",/*更新反馈状态*/
     "insert-UOR" :"/urger/report/insertUrgerOperateRecord",/*更新操作记录表附件*/
     "user-trees" : "/user/rjUser/getTrees",
     "getTemporaryId" : "/urger/client/getTemporaryId",//获取临时Id--填报功能
     "getUrgerTaskFeedbackById": "/urger/report/getUrgerTaskFeedbackById",//获取反馈信息--填报功能
     "getHandleUserBySignGroup": "/urger/client/getHandleUserBySignGroup",//获取责任人信息-填报功能
     "urger-filelist": "/attachment/listEgovAttByDocId",/* 正文附件列表 */
        
    /*新增文件督办模块Url*/
    "fileurger-wj": "/fileurger/getfileurgerOrInit",
    "fileurger-per": "/fileurger/workflow/getProcessPermission",
    "fileurger-bld": "/fileurger/getEgovTemplateFileByDocCate",
    "Tfs-fileurger": "/fileurger/workflow/flowSend", /* 文件督办发送提交--*/
    "Gfs-fileurger": "/fileurger/workflow/getTransitionAndAssign", /* 文件督办议发送获取---*/
    "Gth-fileurger": "/fileurger/workflow/getReturnAssign", /*文件督办退回获取*/
    "Tth-fileurger": "/fileurger/workflow/flowReturn", /* 文件督办退回提交*/
    "Gzb-fileurger": "/fileurger/workflow/getTransferAssign", /*文件督办转办获取--*/
    "Tzb-fileurger": "/fileurger/workflow/flowTransferSend", /*文件督办转办提交--*/
    "Tcb-fileurger": "/fileurger/workflow/flowCancle", /*文件督办撤办---*/
    "Tbb-fileurger": "/fileurger/workflow/flowDone", /*文件督办办毕提交---/meeting/wflow/flowDone*/
    "Tbj-fileurger": "/fileurger/workflow/flowFinish", /*文件督办办结提交---/meeting/wflow/flowFinish*/
    'upadete-fileurger': "/fileurger/updateReceival",/*文件督办取消关联/*/
    "ZDfs-fileurger": "/fileurger/workflow/flowAutoSend", /*文件督办自动发送提交*/
    "fileurger-ldj": "/fileurger/getFileUrgerRgyRuleLog4Page",/*亮灯件列表*/

     /*新增省领导批示督办模块Url*/
     "listurger-wj": "/listurger/getListUrgerOrInit",
     "listurger-per": "/listurger/workflow/getProcessPermission",
     "listurger-bld": "/listurger/getEgovTemplateFileByDocCate",
     "Tfs-listurger": "/listurger/workflow/flowSend", /* 文件督办发送提交--*/
     "Gfs-listurger": "/listurger/workflow/getTransitionAndAssign", /* 文件督办议发送获取---*/
     "Gth-listurger": "/listurger/workflow/getReturnAssign", /*文件督办退回获取*/
     "Tth-listurger": "/listurger/workflow/flowReturn", /* 文件督办退回提交*/
     "Gzb-listurger": "/listurger/workflow/getTransferAssign", /*文件督办转办获取--*/
     "Tzb-listurger": "/listurger/workflow/flowTransferSend", /*文件督办转办提交--*/
     "Tcb-listurger": "/listurger/workflow/flowCancle", /*文件督办撤办---*/
     "Tbb-listurger": "/listurger/workflow/flowDone", /*文件督办办毕提交---/meeting/wflow/flowDone*/
     "Tbj-listurger": "/listurger/workflow/flowFinish", /*文件督办办结提交---/meeting/wflow/flowFinish*/
     'upadete-listurger': "/listurger/updateReceival",/*文件督办取消关联/*/
     "ZDfs-listurger": "/listurger/workflow/flowAutoSend", /*文件督办自动发送提交*/
     "listurger-todo": "/listurger/getActivityWorkTodoList4Page",/*办件*/
     "listurger-tofinish": "/listurger/getActivityWorkTodoList4PageByStatus",/*未办结*/
     "listurger-finish":"listurger/getListUrger4Page",/*已办结*/
    "listurger-hometodo": "/listurger/getListUrgerActivityWorkTodoList4Page",/*首页待办*/

    /*出差审批*/
    "goodstodo111": "/workflow/getActivityWorkTodoList4Page",/*出差待办*/
    /*请假审批*/
    "leave-wj": "/leave/getLeaveById",/*请假基本信息*/
    "leave-per": "/leave/workflow/getProcessPermission",/*请假流程权限*/
    "leave-bld": "/leave/getTemplateFile",
    "Tfs-leave": "/leave/workflow/flowSend", /* 请假发送提交--*/
    "Gfs-leave": "/leave/workflow/getTransitionAndAssign", /* 请假发送获取--*/
    "Gth-leave": "/leave/workflow/getReturnAssign", /*请假退回获取*/
    "Tth-leave": "/leave/workflow/flowFreedomReturn", /*请假退回提交*/
    "Gzb-leave": "/leave/workflow/getTransferAssign", /*请假转办获取---*/
    "Tzb-leave": "/leave/workflow/flowTransferSend", /*请假转办提交--*/
    "Tcb-leave": "/leave/workflow/flowCancle", /*请假撤办---*/
    "Tbb-leave": "/leave/workflow/flowDone", /* 请假办毕提交---/leave/wflow/submitProcessWithoutUsers*/
    "Tbj-leave": "/leave/workflow/flowFinish", /* 请假办结（结束）提交---/leave/wflow/ */
    "ZDfs-leave": "/leave/workflow/flowAutoSend", /*gy019 请假自动发送提交*/
    /*加班审批*/
    "overtime-wj": "/overtime/getOvertimeById",/*加班基本信息*/
    "overtime-per": "/overtime/workflow/getProcessPermission",/*加班流程权限*/
    "overtime-bld": "/overtime/getTemplateFile",
    "Tfs-overtime": "/overtime/workflow/flowSend", /* 加班发送提交--*/
    "Gfs-overtime": "/overtime/workflow/getTransitionAndAssign", /* 加班发送获取--*/
    "Gth-overtime": "/overtime/workflow/getReturnAssign", /*加班退回获取*/
    "Tth-overtime": "/overtime/workflow/flowFreedomReturn", /*加班退回提交*/
    "Gzb-overtime": "/overtime/workflow/getTransferAssign", /*加班转办获取---*/
    "Tzb-overtime": "/overtime/workflow/flowTransferSend", /*加班转办提交--*/
    "Tcb-overtime": "/overtime/workflow/flowCancle", /*加班撤办---*/
    "Tbb-overtime": "/overtime/workflow/flowDone", /* 加班办毕提交---/overtime/wflow/submitProcessWithoutUsers*/
    "Tbj-overtime": "/overtime/workflow/flowFinish", /* 加班办结（结束）提交---/overtime/wflow/*/
    "overtime-res": "/attachment/listDocResource",/*参考材料*/
    "ZDfs-overtime": "/overtime/workflow/flowAutoSend", /* 加班自动发送提交*/

    /*出差审批*/
    "TRAVEL_APPROVAL-todo": "/workflow/getActivityWorkTodoList4Page",/*出差待办*/
    "TRAVEL_APPROVAL-toread":"/workflow/getFlowWorkReadList4Page",/*出差阅件*/
    "travel_approval-wj": "/travelApproval/getTravelApprovalById",/*出差基本信息*/
    "travel_approval-per": "/travelApproval/workflow/getProcessPermission",/*出差流程权限*/
    "travel_approval-bld": "/travelApproval/getTemplateFile",
    "Tfs-travel_approval": "/travelApproval/workflow/flowSend", /* 出差发送提交--*/
    "Gfs-travel_approval": "/travelApproval/workflow/getTransitionAndAssign", /* 出差发送获取--*/
    "Gth-travel_approval": "/travelApproval/workflow/getReturnAssign", /*出差退回获取*/
    "Tth-travel_approval": "/travelApproval/workflow/flowFreedomReturn", /*出差退回提交*/
    "Gzb-travel_approval": "/travelApproval/workflow/getTransferAssign", /*出差转办获取---*/
    "Tzb-travel_approval": "/travelApproval/workflow/flowTransferSend", /*出差转办提交--*/
    "Tcb-travel_approval": "/travelApproval/workflow/flowCancle", /*出差撤办---*/
    "Tbb-travel_approval": "/travelApproval/workflow/flowDone", /* 出差办毕提交---*/
    "Tbj-travel_approval": "/travelApproval/workflow/flowFinish", /* 出差办结（结束）提交---*/
    "travel_approval-res": "/attachment/listDocResource",/*参考材料*/
    "ZDfs-travel_approval": "/travelApproval/workflow/flowAutoSend", /* 出差自动发送提交*/

    "TRAVEL_APPROVAL-createId":"/travelApproval/createId", //新建出差审批id
    "initProcess-travel_approval":"travelApproval/workflow/initProcess",//启动流程
    "revoke-travel_approval":"travelApproval/workflow/flowRevoke",//删除流程
    "TRAVEL_APPROVAL-save":"/travelApproval/updateTravelApproval",//更新
    "TRAVEL_APPROVAL-insert":"/travelApproval/insertTravelApproval",//新增

    /*因公出差审批*/
    "travel_approval-wj": "/travelApproval/getTravelApprovalById",/*因公出差基本信息*/
    "travel_approval-per": "/travelApproval/workflow/getProcessPermission",/*因公出差流程权限*/
    "travel_approval-bld": "/travelApproval/getTemplateFile",

    /*经费报销-差旅报销*/
    "travel_expense-wj": "/finance/expense/travelExpense/getTravelExpenseOrInit",/*差旅报销基本信息*/
    "travel_expense-per": "/finance/travelExpense/workflow/getProcessPermission",/*差旅报销流程权限*/
    "travel_expense-bld": "/finance/config/getTemplateFileByBusinessNo",
    "Tfs-travel_expense": "/finance/travelExpense/workflow/flowSend", /* 差旅报销发送提交--*/
    "Gfs-travel_expense": "/finance/travelExpense/workflow/getTransitionAndAssign", /* 差旅报销发送获取--*/
    "Gth-travel_expense": "/finance/travelExpense/workflow/getReturnAssign", /*差旅报销退回获取*/
    "Tth-travel_expense": "/finance/travelExpense/workflow/flowFreedomReturn", /*差旅报销退回提交*/
    "Gzb-travel_expense": "/finance/travelExpense/workflow/getTransferAssign", /*差旅报销转办获取---*/
    "Tzb-travel_expense": "/finance/travelExpense/workflow/flowTransferSend", /*差旅报销转办提交--*/
    "Tcb-travel_expense": "/finance/travelExpense/workflow/flowCancle", /*差旅报销撤办---*/
    "Tbb-travel_expense": "/finance/travelExpense/workflow/flowDone", /* 差旅报销办毕提交---/travel_expense/wflow/submitProcessWithoutUsers*/
    "Tbj-travel_expense": "/finance/travelExpense/workflow/flowFinish", /* 差旅报销办结（结束）提交---/travel_expense/wflow/ */
    "ZDfs-travel_expense": "/finance/travelExpense/workflow/flowAutoSend", /*gy019 差旅报销自动发送提交*/
    'upadete-travel_expense': "/finance/travelExpense/updateTravelExpense",/*差旅报销关联*/
    "upload-attFile": "/attachment/uploadEgovAttFile",//上传附件
    "delete-attFile": "/attachment/updateEgovAttStatusById", //删除附件
    "ocr_expense": "/finance/ocr/recog",//OCR识别票据
    "get-attach": "/attachment/listEgovAttsByDocId",//获取附件
    "PdfToImg": "/finance/common/getPdfToImgBase64ById",//pdf转为Base64图片
    "save-travel_expense": "/finance/expense/travelExpense/updateTravelExpense",//保存
    "insert-travel_expense": "/finance/expense/travelExpense/insertTravelExpense",//起草
    "revoke-travel_expense": "/finance/travelExpense/workflow/flowRevoke",//删除
    "listFlowInfo": "/workflow/flowInfo/listFlowInfo",//获取流程
    "initProcess-travel_expense": "/finance/travelExpense/workflow/initProcess",//启用流程
    "getAllBySolr-travel_expense": "/finance/common/getAllBySolr",//关联文件里的搜索
    
    /*经费报销-业务报销*/
    "other_expense-wj": "/finance/expense/otherExpense/getOtherExpenseOrInit",/*业务报销基本信息*/
    "other_expense-per": "/finance/otherExpense/workflow/getProcessPermission",/*业务报销流程权限*/
    "other_expense-bld": "/finance/config/getTemplateFileByBusinessNo",
    "Tfs-other_expense": "/finance/otherExpense/workflow/flowSend", /* 业务报销发送提交--*/
    "Gfs-other_expense": "/finance/otherExpense/workflow/getTransitionAndAssign", /* 业务报销发送获取--*/
    "Gth-other_expense": "/finance/otherExpense/workflow/getReturnAssign", /*业务报销退回获取*/
    "Tth-other_expense": "/finance/otherExpense/workflow/flowFreedomReturn", /*业务报销退回提交*/
    "Gzb-other_expense": "/finance/otherExpense/workflow/getTransferAssign", /*业务报销转办获取---*/
    "Tzb-other_expense": "/finance/otherExpense/workflow/flowTransferSend", /*业务报销转办提交--*/
    "Tcb-other_expense": "/finance/otherExpense/workflow/flowCancle", /*业务报销撤办---*/
    "Tbb-other_expense": "/finance/otherExpense/workflow/flowDone", /* 业务报销办毕提交---/other_expense/wflow/submitProcessWithoutUsers*/
    "Tbj-other_expense": "/finance/otherExpense/workflow/flowFinish", /* 业务报销办结（结束）提交---/other_expense/wflow/ */
    "ZDfs-other_expense": "/finance/otherExpense/workflow/flowAutoSend", /*gy019 业务报销自动发送提交*/
    'upadete-other_expense': "/finance/otherExpense/updateOtherExpense",/*业务报销关联*/

    /*经费报销-工会报销*/
    "labor_union_expense-wj": "/finance/expense/laborUnionExpense/getLaborUnionExpenseOrInit",/*工会报销基本信息*/
    "labor_union_expense-per": "/finance/laborUnionExpense/workflow/getProcessPermission",/*工会报销流程权限*/
    "labor_union_expense-bld": "/finance/config/getTemplateFileByBusinessNo",
    "Tfs-labor_union_expense": "/finance/laborUnionExpense/workflow/flowSend", /* 工会报销发送提交--*/
    "Gfs-labor_union_expense": "/finance/laborUnionExpense/workflow/getTransitionAndAssign", /* 工会报销发送获取--*/
    "Gth-labor_union_expense": "/finance/laborUnionExpense/workflow/getReturnAssign", /*工会报销退回获取*/
    "Tth-labor_union_expense": "/finance/laborUnionExpense/workflow/flowFreedomReturn", /*工会报销退回提交*/
    "Gzb-labor_union_expense": "/finance/laborUnionExpense/workflow/getTransferAssign", /*工会报销转办获取---*/
    "Tzb-labor_union_expense": "/finance/laborUnionExpense/workflow/flowTransferSend", /*工会报销转办提交--*/
    "Tcb-labor_union_expense": "/finance/laborUnionExpense/workflow/flowCancle", /*工会报销撤办---*/
    "Tbb-labor_union_expense": "/finance/laborUnionExpense/workflow/flowDone", /* 工会报销办毕提交  */
    "Tbj-labor_union_expense": "/finance/laborUnionExpense/workflow/flowFinish", /* 工会报销办结（结束）提交- */
    "ZDfs-labor_union_expense": "/finance/laborUnionExpense/workflow/flowAutoSend", /*gy019 工会报销自动发送提交*/
    'upadete-labor_union_expense': "/finance/laborUnionExpense/updateLaborUnionExpense",/*工会报销关联*/

      /*经费报销-党费报销*/
      "party_union_expense-wj": "/finance/expense/partyUnionExpense/getPartyUnionExpenseOrInit",/*党费报销基本信息*/
      "party_union_expense-per": "/finance/partyUnionExpense/workflow/getProcessPermission",/*党费报销流程权限*/
      "party_union_expense-bld": "/finance/config/getTemplateFileByBusinessNo",
      "Tfs-party_union_expense": "/finance/partyUnionExpense/workflow/flowSend", /* 党费报销发送提交--*/
      "Gfs-party_union_expense": "/finance/partyUnionExpense/workflow/getTransitionAndAssign", /* 党费报销发送获取--*/
      "Gth-party_union_expense": "/finance/partyUnionExpense/workflow/getReturnAssign", /*党费报销退回获取*/
      "Tth-party_union_expense": "/finance/partyUnionExpense/workflow/flowFreedomReturn", /*党费报销退回提交*/
      "Gzb-party_union_expense": "/finance/partyUnionExpense/workflow/getTransferAssign", /*党费报销转办获取---*/
      "Tzb-party_union_expense": "/finance/partyUnionExpense/workflow/flowTransferSend", /*党费报销转办提交--*/
      "Tcb-party_union_expense": "/finance/partyUnionExpense/workflow/flowCancle", /*党费报销撤办---*/
      "Tbb-party_union_expense": "/finance/partyUnionExpense/workflow/flowDone", /* 党费报销办毕提交  */
      "Tbj-party_union_expense": "/finance/partyUnionExpense/workflow/flowFinish", /* 党费报销办结（结束）提交- */
      "ZDfs-party_union_expense": "/finance/partyUnionExpense/workflow/flowAutoSend", /*gy019 党费报销自动发送提交*/
      'upadete-party_union_expense': "/finance/partyUnionExpense/updatePartyUnionExpense",/*业务报销关联*/
    
      /*合同管理*/
      "contract_approve-wj": "/finance/contractApprove/getContractApproveOrInit",/*合同管理基本信息*/
      "contract_approve-per": "/finance/contractApprove/workflow/getProcessPermission",/*合同管理流程权限*/
      "contract_approve-bld": "/finance/config/getTemplateFileByBusinessNo",
      "Tfs-contract_approve": "/finance/contractApprove/workflow/flowSend", /* 合同管理发送提交--*/
      "Gfs-contract_approve": "/finance/contractApprove/workflow/getTransitionAndAssign", /* 合同管理发送获取--*/
      "Gth-contract_approve": "/finance/contractApprove/workflow/getReturnAssign", /*合同管理退回获取*/
      "Tth-contract_approve": "/finance/contractApprove/workflow/flowFreedomReturn", /*合同管理退回提交*/
      "Gzb-contract_approve": "/finance/contractApprove/workflow/getTransferAssign", /*合同管理转办获取---*/
      "Tzb-contract_approve": "/finance/contractApprove/workflow/flowTransferSend", /*合同管理转办提交--*/
      "Tcb-contract_approve": "/finance/contractApprove/workflow/flowCancle", /*合同管理撤办---*/
      "Tbb-contract_approve": "/finance/contractApprove/workflow/flowDone", /* 合同管理办毕提交  */
      "Tbj-contract_approve": "/finance/contractApprove/workflow/flowFinish", /* 合同管理办结（结束）提交- */
      "ZDfs-contract_approve": "/finance/contractApprove/workflow/flowAutoSend", /*gy019 合同管理自动发送提交*/
      'upadete-contract_approve': "/finance/contractApprove/updateContractApprove",/*合同管理取消关联*/

      /*采购管理-采购公告审批*/
      "purchase_notice-wj": "/finance/purchaseNotice/getPurchaseNoticeOrInit",/*采购公告基本信息*/
      "purchase_notice-per": "/finance/purchaseNotice/workflow/getProcessPermission",/*采购公告流程权限*/
      "purchase_notice-bld": "/finance/config/getTemplateFileByBusinessNo",
      "Tfs-purchase_notice": "/finance/purchaseNotice/workflow/flowSend", /* 采购公告发送提交--*/
      "Gfs-purchase_notice": "/finance/purchaseNotice/workflow/getTransitionAndAssign", /* 采购公告发送获取--*/
      "Gth-purchase_notice": "/finance/purchaseNotice/workflow/getReturnAssign", /*采购公告退回获取*/
      "Tth-purchase_notice": "/finance/purchaseNotice/workflow/flowFreedomReturn", /*采购公告退回提交*/
      "Gzb-purchase_notice": "/finance/purchaseNotice/workflow/getTransferAssign", /*采购公告转办获取---*/
      "Tzb-purchase_notice": "/finance/purchaseNotice/workflow/flowTransferSend", /*采购公告转办提交--*/
      "Tcb-purchase_notice": "/finance/purchaseNotice/workflow/flowCancle", /*采购公告撤办---*/
      "Tbb-purchase_notice": "/finance/purchaseNotice/workflow/flowDone", /* 采购公告办毕提交  */
      "Tbj-purchase_notice": "/finance/purchaseNotice/workflow/flowFinish", /* 采购公告办结（结束）提交- */
      "ZDfs-purchase_notice": "/finance/purchaseNotice/workflow/flowAutoSend", /*gy019 采购公告自动发送提交*/
      'upadete-purchase_notice': "/finance/purchaseNotice/updatePurchaseNotice",/*采购公告取消关联*/

      /*采购管理-采购结果审批*/
      "purchase_result-wj": "/finance/purchaseResult/getPurchaseResultOrInit",/*采购结果基本信息*/
      "purchase_result-per": "/finance/purchaseResult/workflow/getProcessPermission",/*采购结果流程权限*/
      "purchase_result-bld": "/finance/config/getTemplateFileByBusinessNo",
      "Tfs-purchase_result": "/finance/purchaseResult/workflow/flowSend", /* 采购结果发送提交--*/
      "Gfs-purchase_result": "/finance/purchaseResult/workflow/getTransitionAndAssign", /* 采购结果发送获取--*/
      "Gth-purchase_result": "/finance/purchaseResult/workflow/getReturnAssign", /*采购结果退回获取*/
      "Tth-purchase_result": "/finance/purchaseResult/workflow/flowFreedomReturn", /*采购结果退回提交*/
      "Gzb-purchase_result": "/finance/purchaseResult/workflow/getTransferAssign", /*采购结果转办获取---*/
      "Tzb-purchase_result": "/finance/purchaseResult/workflow/flowTransferSend", /*采购结果转办提交--*/
      "Tcb-purchase_result": "/finance/purchaseResult/workflow/flowCancle", /*采购结果撤办---*/
      "Tbb-purchase_result": "/finance/purchaseResult/workflow/flowDone", /* 采购结果办毕提交  */
      "Tbj-purchase_result": "/finance/purchaseResult/workflow/flowFinish", /* 采购结果办结（结束）提交- */
      "ZDfs-purchase_result": "/finance/purchaseResult/workflow/flowAutoSend", /*gy019 采购结果自动发送提交*/
      'upadete-purchase_result': "/finance/purchaseResult/updatePurchaseResult",/*采购结果取消关联*/

      /*支出预算审批-会议、培训、活动支出预算审批*/
      "meeting_pay_issued-wj": "/finance/expenditure/meetingPayIssued/getMeetingPayIssuedOrInit",/*采购结果基本信息*/
      "meeting_pay_issued-per": "/finance/meetingPayIssued/workflow/getProcessPermission",/*采购结果流程权限*/
      "meeting_pay_issued-bld": "/finance/config/getTemplateFileByBusinessNo",
      "Tfs-meeting_pay_issued": "/finance/meetingPayIssued/workflow/flowSend", /* 采购结果发送提交--*/
      "Gfs-meeting_pay_issued": "/finance/meetingPayIssued/workflow/getTransitionAndAssign", /* 采购结果发送获取--*/
      "Gth-meeting_pay_issued": "/finance/meetingPayIssued/workflow/getReturnAssign", /*采购结果退回获取*/
      "Tth-meeting_pay_issued": "/finance/meetingPayIssued/workflow/flowFreedomReturn", /*采购结果退回提交*/
      "Gzb-meeting_pay_issued": "/finance/meetingPayIssued/workflow/getTransferAssign", /*采购结果转办获取---*/
      "Tzb-meeting_pay_issued": "/finance/meetingPayIssued/workflow/flowTransferSend", /*采购结果转办提交--*/
      "Tcb-meeting_pay_issued": "/finance/meetingPayIssued/workflow/flowCancle", /*采购结果撤办---*/
      "Tbb-meeting_pay_issued": "/finance/meetingPayIssued/workflow/flowDone", /* 采购结果办毕提交  */
      "Tbj-meeting_pay_issued": "/finance/meetingPayIssued/workflow/flowFinish", /* 采购结果办结（结束）提交- */
      "ZDfs-meeting_pay_issued": "/finance/meetingPayIssued/workflow/flowAutoSend", /*gy019 采购结果自动发送提交*/
      'upadete-meeting_pay_issued': "/finance/expenditure/meetingPayIssued/updateMeetingPayIssued",/*采购结果取消关联*/

    /*支出预算审批-公务接待预算审批*/
    "official_reception-wj": "/finance/expenditure/officialReception/getOfficialReceptionOrInit",/*采购结果基本信息*/
    "official_reception-per": "/finance/officialReception/workflow/getProcessPermission",/*采购结果流程权限*/
    "official_reception-bld": "/finance/config/getTemplateFileByBusinessNo",
    "Tfs-official_reception": "/finance/officialReception/workflow/flowSend", /* 采购结果发送提交--*/
    "Gfs-official_reception": "/finance/officialReception/workflow/getTransitionAndAssign", /* 采购结果发送获取--*/
    "Gth-official_reception": "/finance/officialReception/workflow/getReturnAssign", /*采购结果退回获取*/
    "Tth-official_reception": "/finance/officialReception/workflow/flowFreedomReturn", /*采购结果退回提交*/
    "Gzb-official_reception": "/finance/officialReception/workflow/getTransferAssign", /*采购结果转办获取---*/
    "Tzb-official_reception": "/finance/officialReception/workflow/flowTransferSend", /*采购结果转办提交--*/
    "Tcb-official_reception": "/finance/officialReception/workflow/flowCancle", /*采购结果撤办---*/
    "Tbb-official_reception": "/finance/officialReception/workflow/flowDone", /* 采购结果办毕提交  */
    "Tbj-official_reception": "/finance/officialReception/workflow/flowFinish", /* 采购结果办结（结束）提交- */
    "ZDfs-official_reception": "/finance/officialReception/workflow/flowAutoSend", /*gy019 采购结果自动发送提交*/
    'upadete-official_reception': "/finance/expenditure/officialReception/updateOfficialReception",/*采购结果取消关联*/

    /*支出预算审批-工会活动支出预算审批*/
    "union_activities-wj": "/finance/expenditure/unionActivities/getUnionActivitiesOrInit",/*采购结果基本信息*/
    "union_activities-per": "/finance/unionActivities/workflow/getProcessPermission",/*采购结果流程权限*/
    "union_activities-bld": "/finance/config/getTemplateFileByBusinessNo",
    "Tfs-union_activities": "/finance/unionActivities/workflow/flowSend", /* 采购结果发送提交--*/
    "Gfs-union_activities": "/finance/unionActivities/workflow/getTransitionAndAssign", /* 采购结果发送获取--*/
    "Gth-union_activities": "/finance/unionActivities/workflow/getReturnAssign", /*采购结果退回获取*/
    "Tth-union_activities": "/finance/unionActivities/workflow/flowFreedomReturn", /*采购结果退回提交*/
    "Gzb-union_activities": "/finance/unionActivities/workflow/getTransferAssign", /*采购结果转办获取---*/
    "Tzb-union_activities": "/finance/unionActivities/workflow/flowTransferSend", /*采购结果转办提交--*/
    "Tcb-union_activities": "/finance/unionActivities/workflow/flowCancle", /*采购结果撤办---*/
    "Tbb-union_activities": "/finance/unionActivities/workflow/flowDone", /* 采购结果办毕提交  */
    "Tbj-union_activities": "/finance/unionActivities/workflow/flowFinish", /* 采购结果办结（结束）提交- */
    "ZDfs-union_activities": "/finance/unionActivities/workflow/flowAutoSend", /*gy019 采购结果自动发送提交*/
    'upadete-union_activities': "/finance/expenditure/unionActivities/updateUnionActivities",/*采购结果取消关联*/

    /*支出预算审批-服务采购支出预算审批*/
    "project_planning_service-wj": "/finance/expenditure/projectPlanningService/getProjectPlanningServiceOrInit",/*采购结果基本信息*/
    "project_planning_service-per": "/finance/projectPlanningService/workflow/getProcessPermission",/*采购结果流程权限*/
    "project_planning_service-bld": "/finance/config/getTemplateFileByBusinessNo",
    "Tfs-project_planning_service": "/finance/projectPlanningService/workflow/flowSend", /* 采购结果发送提交--*/
    "Gfs-project_planning_service": "/finance/projectPlanningService/workflow/getTransitionAndAssign", /* 采购结果发送获取--*/
    "Gth-project_planning_service": "/finance/projectPlanningService/workflow/getReturnAssign", /*采购结果退回获取*/
    "Tth-project_planning_service": "/finance/projectPlanningService/workflow/flowFreedomReturn", /*采购结果退回提交*/
    "Gzb-project_planning_service": "/finance/projectPlanningService/workflow/getTransferAssign", /*采购结果转办获取---*/
    "Tzb-project_planning_service": "/finance/projectPlanningService/workflow/flowTransferSend", /*采购结果转办提交--*/
    "Tcb-project_planning_service": "/finance/projectPlanningService/workflow/flowCancle", /*采购结果撤办---*/
    "Tbb-project_planning_service": "/finance/projectPlanningService/workflow/flowDone", /* 采购结果办毕提交  */
    "Tbj-project_planning_service": "/finance/projectPlanningService/workflow/flowFinish", /* 采购结果办结（结束）提交- */
    "ZDfs-project_planning_service": "/finance/projectPlanningService/workflow/flowAutoSend", /*gy019 采购结果自动发送提交*/
    'upadete-project_planning_service': "/finance/expenditure/projectPlanningService/updateProjectPlanningService",/*采购结果取消关联*/

    /*支出预算审批-货物采购审批*/
    "goods_purchase-wj": "/finance/expenditure/goodsPurchase/getGoodsPurchaseOrInit",/*采购结果基本信息*/
    "goods_purchase-per": "/finance/goodsPurchase/workflow/getProcessPermission",/*采购结果流程权限*/
    "goods_purchase-bld": "/finance/config/getTemplateFileByBusinessNo",
    "Tfs-goods_purchase": "/finance/goodsPurchase/workflow/flowSend", /* 采购结果发送提交--*/
    "Gfs-goods_purchase": "/finance/goodsPurchase/workflow/getTransitionAndAssign", /* 采购结果发送获取--*/
    "Gth-goods_purchase": "/finance/goodsPurchase/workflow/getReturnAssign", /*采购结果退回获取*/
    "Tth-goods_purchase": "/finance/goodsPurchase/workflow/flowFreedomReturn", /*采购结果退回提交*/
    "Gzb-goods_purchase": "/finance/goodsPurchase/workflow/getTransferAssign", /*采购结果转办获取---*/
    "Tzb-goods_purchase": "/finance/goodsPurchase/workflow/flowTransferSend", /*采购结果转办提交--*/
    "Tcb-goods_purchase": "/finance/goodsPurchase/workflow/flowCancle", /*采购结果撤办---*/
    "Tbb-goods_purchase": "/finance/goodsPurchase/workflow/flowDone", /* 采购结果办毕提交  */
    "Tbj-goods_purchase": "/finance/goodsPurchase/workflow/flowFinish", /* 采购结果办结（结束）提交- */
    "ZDfs-goods_purchase": "/finance/goodsPurchase/workflow/flowAutoSend", /*gy019 采购结果自动发送提交*/
    'upadete-goods_purchase': "/finance/expenditure/goodsPurchase/updateGoodsPurchase",/*采购结果取消关联*/
      
    /*专班工作*/
    "special_work-bj": "/specialWork/specialWorkApply/getSpecialWorkApply4SolrPage",/*专班办结列表*/
    "special_work-wj": "/specialWork/specialWorkApply/getSpecialWorkApplyById",/*专班基本信息*/
    "special_work-per": "/specialWork/specialWorkApply/workflow/getProcessPermission",/*专班流程权限*/
    "special_work-bld": "/specialWork/specialWorkApply/getTemplateFile",

    "Tfs-special_work": "/specialWork/specialWorkApply/workflow/flowSend", /* 收文发送提交--*/
    "Gfs-special_work": "/specialWork/specialWorkApply/workflow/getTransitionAndAssign", /* 收文发送获取---*/
    "Gth-special_work": "/specialWork/specialWorkApply/workflow/getReturnAssign", /*收文退回获取*/
    "Tth-special_work": "/specialWork/specialWorkApply/workflow/flowReturn", /* 收文退回提交*/
    "Gzb-special_work": "/specialWork/specialWorkApply/workflow/getTransferAssign", /*收文转办获取--*/
    "Tzb-special_work": "/specialWork/specialWorkApply/workflow/flowTransferSend", /*收文转办提交--*/
    "Tcb-special_work": "/specialWork/specialWorkApply/workflow/flowCancle", /*收文撤办---*/
    "Tbb-special_work": "//specialWork/specialWorkApply/submitProcessWithoutUsers", /*收文办毕提交---/special_work/wflow/submitProcessWithoutUsers*/
    "Tbj-special_work": "/specialWork/specialWorkApply/wflow/setProcessDone", /*收文办结提交---/special_work/wflow/setProcessDone*/
    "Tbb-special_work": "/specialWork/specialWorkApply/workflow/flowDone", /* 收文办毕提交---/special_work/wflow/submitProcessWithoutUsers*/
    "Tbj-special_work": "/specialWork/specialWorkApply/workflow/flowFinish", /*收文办结（结束）提交---/special_work/wflow/setProcessDone*/
    'upadete-special_work': "/specialWork/specialWorkApply/updateReceival",/*收文取消关联/*/
    "ZDfs-special_work": "/specialWork/specialWorkApply/workflow/flowAutoSend", /*收文自动发送提交*/


    /*公告 */
    "bbs-bbsFeedback": "/bbs/bbsFeedback/getBbsFeedback4Page", /* 公告反馈记录*/
    "bbs-QueryHistory": "/bbs/bbs/getBbsQueryHistory4Page", /* 公告查阅记录*/
    "bbs-wj":"/bbs/bbs/getBbsById",
    /*流程操作*/
    "flow-list": "/workflow/getFlowRecordList4Page", /*流程记录---/wflow/getProcessRecordList*/
    "get-opinlist": "/opinion/listDocOpinionByDocId", /*意见列表---/opinion/getDocOpinionList*/
    "opinion-del": "/opinion/batchDeleteDocOpinion", /*删除意见---/opinion/batchDeleteDocOpinion*/
    "opinion-add": "/opinion/insertDocOpinion", /*添加新增意见---/opinion/insertDocOpinion*/
    "opinion-upd": "/opinion/updateDocOpinion", /*修改意见---/opinion/updateDocOpinion*/
    "getcommonOpinion": "/opinion/listCommonOpinion", /*公用意见列表--- /commonOpinion/getCommonOpinionList*/
    "getpersonOpinion": "/opinion/listCommonOpinion",/* 获取用户个人意见 */
    "insertCommonOpinion": "/opinion/insertCommonOpinion",/*新增个人意见*/
    "deleteCommonOpinion": "/opinion/batchDeleteCommonOpinionById",/*删除个人意见*/
    "finish-read": "/workflow/finishReads",/*已阅*/
    /*文件操作 */
    "File-List": "/attachment/listEgovAttsByDocIdAndTypes",/* 正文附件列表 */
    "downloadBLD": "attachment/downloadEgovTemplateFile", /*下载办理单---*/
    "File-download": "/attachment/downloadEgovAttFile", /*下载正文附件---*/
    /*文件关联操作 */
    "search-url": "/doc/searchQuery.do",//文件关联
    /*晾晒台-首页数据*/
    "dryingtable": "/dryingtable/getDryingtableList",/*晾晒台-首页数据*/

    /*日程安排*/
    "user-schedule": "/schedule/getScheduleWeekByDate?type=user", //个人日程
    "leader-schedule": "/schedule/getScheduleWeekByDate?type=leader",//领导日程
    "org-schedule": "/schedule/getScheduleWeekByDate?type=org",//全委日程
    "org-trees": "/schedule/getlistUmsOrg",//全委组织结构
    "getAuth-schedule": "/schedule/getCurrUserAuth",//获取当天用户权限
    "get-schedule": "/schedule/getScheduleByCurrDate",//日程详情页面
    "insert-schedule": "/schedule/insertSchedule",//新增日程
    "update-schedule": "/schedule/updateSchedule",//修改日程
    /*通讯录*/
    "org-list": "/contacts/getlistUmsOrg",//通讯录的组织结构
    "inner-contact": "/contacts/getContacts4Page?type=inner",//组织通讯录
    "outer-contact": "/contacts/getContacts4Page?type=outer",//个人通讯录
    "contact-wj": "/contacts/getContactsById",//通讯录基本信息
    /*信息采编 */
    "info-wj": "/info/draft/getDraftById4open",/*信息采编详细详细信息*/
    "info-per": "/info/workflow/getProcessPermission",/*信息采编流程权限*/
    "info-bld": "/attachment/listEgovTemplate",
    "info-tempfile": "/attachment/listEgovTemplateFileByTemplateIds",
    "Gfs-info": "/info/workflow/getTransitionAndAssign", /* 信息采编发送获取--*/
    "Tfs-info": "/info/workflow/flowSend", /* 信息采编发送提交--*/
    "Gth-info": "/info/workflow/getReturnAssign", /*信息采编退回获取*/
    "Tth-info": "/info/workflow/flowReturn", /*信息采编退回提交*/
    "Gzb-info": "/info/workflow/getTransferAssign", /*信息采编转办获取---*/
    "Tzb-info": "/info/workflow/flowTransferSend", /*信息采编转办提交--*/
    "Tcb-info": "/info/workflow/flowCancle", /*信息采编撤办---*/
    "Tbb-info": "/info/workflow/flowDone", /* 信息采编办毕提交*/
    "Tbj-info": "/info/workflow/flowFinish", /* 信息采编办结（结束）提交*/
    "ZDfs-info": "/info/workflow/flowAutoSend", /*gy019 信息采编自动发送提交*/

    /*信息上报*/
    "inforeport-wj": "/info/inforeport/getReportById",/*信息上报基本信息*/
    "inforeport-per": "/info/infoReport/workflow/getProcessPermission",/*信息上报流程权限*/
    "inforeport-bld": "/attachment/listEgovTemplate",
    "inforeport-tempfile": "/attachment/listEgovTemplateFileByTemplateIds",
    "Tfs-inforeport": "/info/infoReport/workflow/flowSend", /* 信息上报发送提交--*/
    "Gfs-inforeport": "/info/infoReport/workflow/getTransitionAndAssign", /* 信息上报发送获取--*/
    "Gth-inforeport": "/info/infoReport/workflow/getReturnAssign", /*信息上报退回获取*/
    "Tth-inforeport": "/info/infoReport/workflow/flowFreedomReturn", /*信息上报退回提交*/
    "Gzb-inforeport": "/info/infoReport/workflow/getTransferAssign", /*信息上报转办获取---*/
    "Tzb-inforeport": "/info/infoReport/workflow/flowTransferSend", /*信息上报转办提交--*/
    "Tcb-inforeport": "/info/infoReport/workflow/flowCancle", /*信息上报撤办---*/
    "Tbb-inforeport": "/info/infoReport/workflow/flowDone", /* 信息上报办毕提交---/leave/wflow/submitProcessWithoutUsers*/
    "Tbj-inforeport": "/info/infoReport/workflow/flowFinish", /* 信息上报办结（结束）提交---/leave/wflow/ */
    "ZDfs-inforeport": "/info/infoReport/workflow/flowAutoSend", /*gy019 信息上报自动发送提交*/

    /*政务信息*/
    "info-query": "info/query/draftPageJson",/*刊物信息列表*/
    "info-draft": "/info/draft/getDraftReportedLeader",/*批示稿件列表*/
    "infodraft-wj": "/info/draft/getDraftById4open",/*政务信息基本信息*/
    "infodraft-bld": "/attachment/listEgovTemplate",
    "infodraft-tempfile": "/attachment/listEgovTemplateFileByTemplateIds",
    "infodraft-cmd": "info/draftcmd/draftCmdJson?draftId=13516cddc1ca0000",//领导批示页签

    /*办公用品 cjs*/
    "goods-finish": "/goodssupplies/applyGoodsSupplies/getApplyGoodsSupplies4Page",/*办公用品办结申请 */
    "goods-wj": "/goodssupplies/applyGoodsSupplies/getApplyGoodsSuppliesDetailById", /*办公用品文件信息--*/
    "goods-per": "/goodssupplies/workflow/getProcessPermission",/*办公用品流程权限*/
    "goods-bld": "/goodssupplies/getEgovTemplateFileByDocCate",
    "Tfs-goods": "/goodssupplies/workflow/flowSend", /* 办公用品发送提交--*/
    "Gfs-goods": "/goodssupplies/workflow/getTransitionAndAssign", /* 办公用品发送获取--*/
    "Gth-goods": "/goodssupplies/workflow/getReturnAssign", /*办公用品退回获取*/
    "Tth-goods": "/goodssupplies/workflow/flowFreedomReturn", /*办公用品退回提交*/
    "Gzb-goods": "/goodssupplies/workflow/getTransferAssign", /*办公用品转办获取---*/
    "Tzb-goods": "/goodssupplies/workflow/flowTransferSend", /*办公用品转办提交--*/
    "Tcb-goods": "/goodssupplies/workflow/flowCancle", /*办公用品撤办---*/
    "Tbb-goods": "/goodssupplies/workflow/flowDone", /* 办公用品办毕提交---/dispatch/wflow/submitProcessWithoutUsers*/
    "Tbj-goods": "/goodssupplies/workflow/flowForceFinish", /* 办公用品办结（结束）提交---/dispatch/wflow/setProcessDone*/
    'upadete-goods': "/goodssupplies/updateDispatch",/*办公用品取消关联*/
    "ZDfs-goods": "/goodssupplies/workflow/flowAutoSend", /*办公用品自动发送提交*/
    /*办公耗材 cjs*/
    "supplies-finish": "/goodssupplies/applyGoodsSupplies/getApplyGoodsSupplies4Page",/*办公耗材办结申请 */
    "supplies-wj": "/goodssupplies/applyGoodsSupplies/getApplyGoodsSuppliesDetailById", /*办公耗材文件信息--*/
    "supplies-per": "/goodssupplies/workflow/getProcessPermission",/*办公耗材流程权限*/
    "supplies-bld": "/goodssupplies/getEgovTemplateFileByDocCate",
    "Tfs-supplies": "/goodssupplies/workflow/flowSend", /* 办公耗材发送提交--*/
    "Gfs-supplies": "/goodssupplies/workflow/getTransitionAndAssign", /* 办公耗材发送获取--*/
    "Gth-supplies": "/goodssupplies/workflow/getReturnAssign", /*办公耗材退回获取*/
    "Tth-supplies": "/goodssupplies/workflow/flowFreedomReturn", /*办公耗材退回提交*/
    "Gzb-supplies": "/goodssupplies/workflow/getTransferAssign", /*办公耗材转办获取---*/
    "Tzb-supplies": "/goodssupplies/workflow/flowTransferSend", /*办公耗材转办提交--*/
    "Tcb-supplies": "/goodssupplies/workflow/flowCancle", /*办公耗材撤办---*/
    "Tbb-supplies": "/goodssupplies/workflow/flowDone", /* 办公耗材办毕提交---/dispatch/wflow/submitProcessWithoutUsers*/
    "Tbj-supplies": "/goodssupplies/workflow/flowForceFinish", /* 办公耗材办结（结束）提交---/dispatch/wflow/setProcessDone*/
    'upadete-supplies': "/goodssupplies/updateDispatch",/*办公耗材取消关联*/
    "ZDfs-supplies": "/goodssupplies/workflow/flowAutoSend", /*办公用品自动发送提交*/

    /*征求意见*/
    "informal-wj": "/informal/getInformalById",/*征求意见基本信息*/
    "informal-per": "/informal/workflow/getProcessPermission",/*征求意见流程权限*/
    "informal-bld": "/attachment/listEgovTemplate",
    "informal-tempfile": "/attachment/listEgovTemplateFileByTemplateIds",
    "Tfs-informal": "/informal/workflow/flowSend", /* 征求意见发送提交--*/
    "Gfs-informal": "/informal/workflow/getTransitionAndAssign", /* 征求意见发送获取--*/
    "Gth-informal": "/informal/workflow/getReturnAssign", /*征求意见退回获取*/
    "Tth-informal": "/informal/workflow/flowFreedomReturn", /*征求意见退回提交*/
    "Gzb-informal": "/informal/workflow/getTransferAssign", /*征求意见转办获取---*/
    "Tzb-informal": "/informal/workflow/flowTransferSend", /*征求意见转办提交--*/
    "Tcb-informal": "/informal/workflow/flowCancle", /*征求意见撤办---*/
    "Tbb-informal": "/informal/workflow/flowDone", /* 征求意见办毕提交---/leave/wflow/submitProcessWithoutUsers*/
    "Tbj-informal": "/informal/workflow/flowFinish", /* 征求意见办结（结束）提交---/leave/wflow/ */
    "ZDfs-informal": "/informal/workflow/flowAutoSend", /*gy019 征求意见自动发送提交*/

    /*资产管理-内部转移 cjs*/
    "transfer-finish": "/equipment/record/getEquipment4Page",
    "transfer-wj": "/equipment/record/detail",
    "transfer-per": "/equipment/workflow/getProcessPermission",
    "transfer-bld": "/equipment/getEgovTemplateFileByDocCate",
    "Tfs-transfer": "/equipment/workflow/flowSend",
    "Gfs-transfer": "/equipment/workflow/getTransitionAndAssign",
    "Gth-transfer": "/equipment/workflow/getReturnAssign",
    "Tth-transfer": "/equipment/workflow/flowReturn",
    "Gzb-transfer": "/equipment/workflow/getTransferAssign",
    "Tzb-transfer": "/equipment/workflow/flowTransferSend",
    "Tcb-transfer": "/equipment/workflow/flowCancle",
    "Tbb-transfer": "/equipment/workflow/flowDone",
    "Tbj-transfer": "/equipment/workflow/flowFinish",
    'upadete-transfer': "/equipment/updateDispatch",
    "ZDfs-transfer": "/equipment/workflow/flowAutoSend", /*自动发送提交*/

    /*工资单查询 cjs*/
    "gzdcx-info": "/finance/getFinanceSalaryInfoYear4Page",
    "gzdcx-todo": "/finance/getFinanceSalaryYear4Page",
    "finance-wj": "/finance/getFinanceSalaryInfoById",
    "gzdcx-per": "/finance/workflow/getProcessPermission",
    "gzdcx-bld": "/finance/getEgovTemplateFileByDocCate",
    "Tfs-gzdcx": "/finance/workflow/flowSend",
    "Gfs-gzdcx": "/finance/workflow/getTransitionAndAssign",
    "Gth-gzdcx": "/finance/workflow/getReturnAssign",
    "Tth-gzdcx": "/finance/workflow/flowReturn",
    "Gzb-gzdcx": "/finance/workflow/getTransferAssign",
    "Tzb-gzdcx": "/finance/workflow/flowTransferSend",
    "Tcb-gzdcx": "/finance/workflow/flowCancle",
    "Tbb-gzdcx": "/finance/workflow/flowDone",
    "Tbj-gzdcx": "/finance/workflow/flowFinish",
    'upadete-gzdcx': "/finance/updateDispatch",
    "ZDfs-gzdcx": "/finance/workflow/flowAutoSend", /*自动发送提交*/
    /*个人邮件*/
    "receive-mail": "/email/inbox/getMailInbox4Page",
    "sent-mail": "/email/sent/getMailSent4Page",
    "draft-mail": "/email/drafts/getMailDrafts4Page",
    // 邮箱
    "mail-wj-draft": "/email/drafts/getMailDraftsById",//获取草稿箱详情
    "receive-mail": "/email/inbox/getMailInbox4Page",//收件箱
    "sent-mail": "/email/sent/getMailSent4Page",//已发送
    "draft-mail": "/email/drafts/getMailDrafts4Page",//草稿箱
    "mail-wj": "/email/inbox/getMailInboxById",//获取邮件详情
    "mail-wj-inbox": "/email/inbox/getMailInboxById",//获取邮件详情-收件箱
    "mail-wj-sent": "/email/sent/getEmailSentById",//获取邮件详情-已发送
    "mail-attach": "/attachment/listEgovAttsByDocId",// 获取邮件附件
    "mail-address": "/email/getEmailUserTrees",/*通讯录获取列表*/
    "mail-send": "/email/sent/sendMail",/*邮件发送*/
    "mail-draft": "/email/drafts/insertMailDrafts",/*存草稿*/
    "mail-save": "/email/drafts/updateMailDrafts",/*保存*/
    "mail-upload": "/attachment/uploadEgovAttFiles",/*上传email文件 */
    "mail-newId": "/email/mail/getMailId", /**获取回复邮件的新id，用来上传附件 */
    "mail-deleteAttach": "/attachment/updateEgovAttStatusById", //删除附件
    "mail-receipt": "/email/setMailReceipt",/*回执申请是否发送*/
    "copy-mailfile": "/attachment/copyEgovAttByDocId",/*转发时邮件附件转换成新的邮件ID下*/
    "newmail-user": "/email/address/getMailAddressByUserNo", /**新建时获取发件人邮箱 */
    "index-orgTree": "/user/rjUser/getTrees",
    "update-mail": "/email/inbox/updateMailInbox",

    /*文件资料*/
    "resourse-list" : "/archive/getArchResource4Page",//收发文件列表
    "resourse-wj" : "/archive/getArchResourceById",//获取历史文件基本信息
    "resourse-flow" : "/archive/listArchFlowRecord",//获取历史文件流程记录

    /*学习园地*/
    "study": "/study/study/getAllStudy4Page",/*学习园地-最新资料*/
    "study-bytarget" : "study/study/getStudy4Page",//分类列表
    "study-wj": "/study/study/getStudyPreviewInfo",/*学习园地基本信息*/
    "study-attach": "/attachment/listEgovAttsByDocId",// 获取附件

    /*重要材料*/
    "importantMaterial" : "/importantMaterial/getImportantMaterial4Page",
    "importantMaterial-wj" : "/importantMaterial/getImportantMaterialPreviewInfo",//?id=1319da6d6b8af000&type=1

    /*大事记*/
    "bigEvents":"/bigEvents/getBigEvents4Page",
    "bigEvents-wj":"/bigEvents/getBigEventsPreviewInfo",

    /*工具箱*/
    "toolBox" : "/toolBox/toolBox/getToolBox4Page",
    "toolBox-wj":"/toolBox/toolBox/getToolBoxPreviewInfo",

    /*工作总结*/
    "workSummary" : "/workSummary/getWorkSummary4Page",
    "workSummary-wj" : "/workSummary/getWorkSummaryPreviewInfo",

    /*电子处室*/
    "orgDoc" : "/orgDoc/getOrgDoc4Page",//?columnNo=1379a5f0e8cac001
    "orgDoc-wj" : "/orgDoc/getOrgDocPreviewInfo",

    /*收藏夹*/
    // "CollecTypeList" : "/egovCollectionType/getCollectionTypeList",/*收藏列表类型获取，*/
    // "add-CollecType" : "/egovCollectionType/insertCollectionType",/*新增收藏类型*/
    // "addCollec" : "/egovCollection", /*收藏文件，*/
    // "delCollec" : "/egovCollection", /*取消收藏文件，+docid*/
    // "collecFlag" : "/egovCollection", /*判断文件是否收藏，+docid*/
    // "getCollecList" : "/egovCollection/page", /*获取收藏列表详细*/
    // "move-Collec" : "/egovCollection/updateCollection",/*收藏移动文件目录*/

    "collectListFolder" : "/personalLibrary/folder/listFolder",/*收藏分类列表*/
	"doCollect" : "/personalLibrary/otherCollect/getOtherCollectByModuleIdAndDocId",/*公文收藏查询接口 /personalLibrary/otherCollect/getOtherCollectByModuleIdAndDocId*/
	"insertDocCollect" : "/personalLibrary/otherCollect/insertOtherCollect",/*收藏插入接口 http://192.168.244.83:2080/personalLibrary/otherCollect/insertOtherCollect*/
	"updateDocCollect" : "/personalLibrary/otherCollect/updateOtherCollect",/*收藏更新接口 /personalLibrary/otherCollect/updateOtherCollect*/
	"delCollect" : "/personalLibrary/otherCollect/deleteOtherCollectByIds",/*取消收藏接口/personalLibrary/otherCollect/deleteOtherCollectByIds*/
	"getCollectList" : "/personalLibrary/otherCollect/getOtherCollect4Page",/*收藏列表 /personalLibrary/otherCollect/getOtherCollect4Page*/
	"searchQuery" : "/zjfgwRjsearch/searchQuery.do",/*公文搜索 /zjfgwRjsearch/searchQuery.do*/
	"downloadBLD" : "/attachment/downloadEgovTemplateFile", /*下载正文附件---/egovTemplateFile/downloadEgovTemplateFile*/
	"File-List" : "/attachment/listEgovAttsByDocIdAndTypes",//正文附件列表

    /*机关党建*/
    "partyBuilding" : "/partyBuilding/pb/getPb4Page",
    "partyBuilding-wj" : "/partyBuilding/pb/getPbById",

    /*团青工作*/
    "youth_work-finish": "/youthWork/specialWorkApply/getSpecialWorkApply4SolrPage",
    "youth_work-wj" : "/youthWork/specialWorkApply/getSpecialWorkApplyById",/*团青工作基本信息*/
    "youth_work-per": "/youthWork/specialWorkApply/workflow/getProcessPermission",/*团青工作流程权限*/
    "youth_work-bld": "/youthWork/specialWorkApply/getTemplateFile",
    "youth_work-tempfile": "/attachment/listEgovTemplateFileByTemplateIds",
    "Tfs-youth_work": "/youthWork/specialWorkApply/workflow/flowSend", /* 团青工作发送提交--*/
    "Gfs-youth_work": "/youthWork/specialWorkApply/workflow/getTransitionAndAssign", /* 团青工作发送获取--*/
    "Gth-youth_work": "/youthWork/specialWorkApply/workflow/getReturnAssign", /*团青工作退回获取*/
    "Tth-youth_work": "/youthWork/specialWorkApply/workflow/flowFreedomReturn", /*团青工作退回提交*/
    "Gzb-youth_work": "/youthWork/specialWorkApply/workflow/getTransferAssign", /*团青工作转办获取---*/
    "Tzb-youth_work": "/youthWork/specialWorkApply/workflow/flowTransferSend", /*团青工作转办提交--*/
    "Tcb-youth_work": "/youthWork/specialWorkApply/workflow/flowCancle", /*团青工作撤办---*/
    "Tbb-youth_work": "/youthWork/specialWorkApply/workflow/flowDone", /* 团青工作办毕提交---/leave/wflow/submitProcessWithoutUsers*/
    "Tbj-youth_work": "/youthWork/specialWorkApply/workflow/flowFinish", /* 团青工作办结（结束）提交---/leave/wflow/ */
    "ZDfs-youth_work": "/youthWork/specialWorkApply/workflow/flowAutoSend", /*gy019 团青工作自动发送提交*/

    "word-toRead" : "/workflow/insertFlowPassRead", /*文件传阅接口--- /wflow/innerDistribute*/
    "FreeDom-request" : "/egovCommonContacts/listEgovCommonContacts", /*自由流人员常用人员 字典--- /flow/flowFrequentContact/listFlowFrequentContact*/
    "Gfs-fd-request" : "/user/rjUser/getTrees", /*自由流发送人员获取--- /index/getTrees*/
    "Gff-dept" : "/dispatch/getDispatchUnit", /*分发单位，单位名获取--- /dispatch/getDispatchUnit*/
    "word-toSend" : "/dispatch/sendDispatchToUnit", /*分发接口--- /dispatch/getDispatchUnit*/
    "users-byOrgNo" : "/user/umsUser/getUmsUsersByOrgNo",/*按处室获取人员*/
    //"Gfs-fd-group" : "/egovCommonGroup/listCommonGroupUsers2", /*群组--- /egovCommonGroup/listCommonGroupUsers2*/
};

//自定义配置的基本信息
var toEachData = {
    "dispatch": {
        "标题": "subject",
        "机关代字": "docWord",
        "发文字号": "docMark",
        "拟稿部门": "draftDept",
        "拟稿人": "draftUserName",
        "局务公开": "jwPublicFlag",
        "党务公开": "dwPublicFlag",
        "主送": "mainSend",
        "抄送": "copySend",
        "拟稿备注": "remark"
    },
    "receival": {
        "标题": "subject",
        "文件字号": "docMark",
        "来文单位": "sourceUnit",
        "成文日期": "signDate",
        "收文日期": "draftDate",
        "备注": "remark"
    },
    "meeting": {
        "标题": "subject",
        "会议议程": "agenda",
        "开始时间": "beginTime",
        "结束时间": "endTime",
        "会议地点": "meetingAddressName",
        "备注": "remark"
    },
    "approval": {
        "标题": "subject",
        "业务类型": "businessName",
        "申请处室": "draftUserDept",
        "申请人": "draftUser",
        "申请时间": "draftDate",
        "备注": "remark"
    },
    "bbs": {
        "标题": "subject",
        "公告类型": "bbsCategoryName",
        "发布单位": "publisherOrgName",
        "发起人": "publisherName",
        "开始时间": "validStart",
        "结束时间": "validEnd",
        "公告内容": "content"
    },
    "travel_approval": {
        "标题": "subject",
        "申请处室": "draftDept",
        "申请日期": "draftDate",
        "申请人": "draftUserName",
        "出差开始时间": "travelStartDate",
        "出差结束时间": "travelEndDate",
        "出差天数": "travelDays"
    },
    "car_apply": {
        "标题": "reasons",
        "申请处室": "applyUnit",
        "申请日期": "applyDate",
        "申请人": "applyUserName",
        "出发地点": "locationFrom",
        "前往地点": "locationTo"
    },
    "signature": {
        "标题": "subject",
        "类别": "signatureType",
        "申请处室": "draftDeptName",
        "申请日期": "draftDate",
        "申请人": "draftUserName",
        "审核人": "checkUserNo",
        "呈报领导": "presentLeaderNo",
        "呈报时间": "presentDate",
        "内容摘要": "content",
        "备注": "remark"
    },
    "efficiency_supervision": {
        "标题": "content",
        "内容及意见": "specificContentOpinion",
        "登记人": "draftUserName",
        "监督部门": "draftDeptName",
        "监督时间": "draftDate",
        "反馈周期": "feedbackCycle",
        "提醒时间": "remindDate"
    },
    "efficiency_remind": {
        "标题": "taskContent",
        "发起部门": "draftDeptName",
        "发起人": "draftUserName",
        "发起时间": "draftDate",
        "责任部门": "dutyDeptName",
        "任务执行情况": "executeSituation"
    },
};

//返回ng可中转地址
function getPartUrl(name) {
    return ZjgyUrl[name];
}