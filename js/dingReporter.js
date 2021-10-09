try {
    const config = {
       bid: 'fgw_moa_zzdpro',
      signkey: '1234567890abcdef',
      gateway: 'https://wpk-gate.zjzwfw.gov.cn'
    };
    const wpk = new wpkReporter(config);
    wpk.installAll();
    window._wpk = wpk;
  } catch (err) {
    console.error('WpkReporter init fail', err);
  }
 (function(w, d, s, q, i) {
    w[q] = w[q] || [];
    var f = d.getElementsByTagName(s)[0],j = d.createElement(s);
    j.async = true;
    j.id = 'beacon-aplus';
    j.src = 'https://alidt.alicdn.com/alilog/mlog/aplus_cloud.js';
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'aplus_queue');

  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['aplus-rhost-v', 'alog.zjzwfw.gov.cn']
  });
  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['aplus-rhost-g', 'alog.zjzwfw.gov.cn']
  });
  
  var u = navigator.userAgent
  var isAndroid = u.indexOf('Android') > -1
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

  aplus_queue.push({
    action: 'aplus.setMetaInfo',
    arguments: ['appId', isAndroid ? '28302650' : isIOS ? '28328447' : '47130293']
  });

// 单页应用 或 “单个页面”需异步补充PV日志参数还需进行如下埋点：
aplus_queue.push({
  action: 'aplus.setMetaInfo',
  arguments: ['aplus-waiting', 'MAN']
});//
// 单页应用路由切换后 或 在异步获取到pv日志所需的参数后再执行sendPV：
aplus_queue.push({
  'action':'aplus.sendPV',
  'arguments':[{
    is_auto: false
  }, {
    // 当前你的应用信息，此两行请勿修改
    sapp_id: '9652',
    sapp_name: 'fgw_moa',
    page_url:'http://223.4.76.182:8080/rjmoafgw/indexPhone.html',
    page_id:'index',
    page_name:'indexPhone',
    // 自定义PV参数key-value键值对（只能是这种平铺的json，不能做多层嵌套），如：
    x: 111,
    y: 222
  }]
})
// 如采集用户信息是异步行为需要先执行这个BLOCK埋点
aplus_queue.push({
	action: 'aplus.setMetaInfo',
	arguments: ['_hold', 'BLOCK']
});