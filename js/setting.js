// 初始化vConsole
// if (/Android|webOS|iPhone|iPad|BlackBerry/i.test(navigator.userAgent)) {
//     window.vConsole = new window.VConsole({
//         defaultPlugins: ['system', 'network', 'element', 'storage'], // 可以在此设定要默认加载的面板
//         maxLogNumber: 1000,
//         // disableLogScrolling: true,
//         onReady: function () {
//             console.log('vConsole is ready.');
//         },
//         onClearLog: function () {
//             console.log('on clearLog');
//         }
//     });
// }

var setting = new Vue({
    el: '#setting',
    data() {
        return {
            settingData:toArr(App.LS.get('indexTabData'))[1].modal, // ipConfig
            settingList:toArr(App.LS.get('moudleInfoView')), // ipConfig
            value:20,
            //txtSize:[{name:"小号",val:"16"},{name:"标准",val:"18"},{name:"中号",val:"20"},{name:"大号",val:"22"},{name:"超大",val:"24"}],
            txtSize:[{name:"标准",val:"18"},{name:"大号",val:"20"}],
            itemNum : toArr(App.LS.get('indexTabData'))[1].modal.length > 7 ? 7 : toArr(App.LS.get('indexTabData'))[1].modal.length, //模块最多可选个数
            listNum: toArr(App.LS.get('moudleInfoView')).length > 7 ? 7 : toArr(App.LS.get('moudleInfoView')).length //列表页签最多可选个数
        }
    },
    computed: {
        getStep: function(){ //获取滑块的步数
            return 100/(this.txtSize.length-1);
        }
    },
    created: function () {
        var _this = this;
        if(os.isAndroid || os.isPhone) {
            if($(window).width() > 480){
                console.log("平板");
                _this.txtSize = [{name:"标准",val:"18"},{name:"大号",val:"22"},{name:"超大",val:"24"}];
            }
        } else if(os.isTablet) {
            console.log("平板")
            _this.txtSize = [{name:"标准",val:"18"},{name:"大号",val:"22"},{name:"超大",val:"24"}];
        }
        dd.ready(function() {
            document.addEventListener('back', function(e) {
                // 在这里处理你的业务逻辑
                _this.backStorage();
                setTimeout(()=>{
                    closePage("refreshList();");
                },100);
                e.preventDefault(); //backbutton事件的默认行为是回退历史记录，如果你想阻止默认的回退行为，那么可以通过preventDefault()实现
            });
            // if(/Android/i.test(navigator.userAgent)) {
                
            // }else{
            //     //设置导航栏右侧单个按钮
            //     dd.setNavLeftText({
            //         text: '返回'
            //     });
            // }
        })
        this.initDiyPage(toArr(App.LS.get("fontSize")));
    },
    mounted: function () {
        
    },
    methods: {
        initDiyPage : function(fontSize){
            var _this = this;
            //if(userDiyInfo.color){this.defColor = userDiyInfo.color};
            if(fontSize.val){
                _this.txtActive = fontSize.val;
                $.each(_this.txtSize,function(i,tsize){
                    if(tsize.val == fontSize.val){ _this.value = _this.getStep*i;}
                })
            };
            fontSizeSet.initFontSize();
        },
        changeMySize : function(val,index){
            this.txtActive = val;
            this.value = this.getStep*index;//设置滑块的位置
            fontSizeSet.changeSize(val);
            this.refresh = true;
        },
        changeMySize2 : function(val){//点击或滑动滑块改变字体大小
            //this.value = val;
            var index = val/this.getStep;
            this.txtActive = this.txtSize[index].val;
            fontSizeSet.changeSize(this.txtSize[index].val);
            this.refresh = true;
        },
        //index為下標 type判斷是首頁顯示功能還是首頁顯示列表
        switchChange(index,type,event){
            if (!type) {
                let data = Object.assign([],this.settingData);
                let selSettingData = data.filter(item => item.isCheck);
                selSettingData.length > this.itemNum && toast("最多可选"+this.itemNum+"项任务", 2000)
                selSettingData.length < 1 && toast("至少选择1项任务", 2000)
                this.settingData[index].isCheck = (selSettingData.length > this.itemNum || selSettingData.length < 1) ? !event : event
            } else {
                let list = Object.assign([],this.settingList);
                let selSettingList =  list.filter(item => item.isCheck);
                selSettingList.length > this.listNum && toast("最多可选"+this.listNum+"项任务", 2000)
                selSettingList.length < 1 && toast("至少选择1项任务", 2000)
                this.settingList[index].isCheck = (selSettingList.length > this.listNum || selSettingList.length < 1) ? !event : event
            }
          
        },
        //返回時候調用
        backStorage() {
            let indexTabData2 = Object.assign([],indexTabData);
            indexTabData2[1].modal=this.settingData;
            //moudleInfo[0].view = this.settingList;
            App.LS.set('indexTabData',JSON.stringify(indexTabData2));
            App.LS.set('moudleInfoView',JSON.stringify(this.settingList));
            //alert("moudleInfoView:"+App.LS.get('moudleInfoView'));
        }
    }
})


