/* 农历的计算方法 */
var LunarDate = {
    lunarInfo: new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
        0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
        0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
        0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
        0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
        0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
        0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
        0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
        0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
        0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,//1990
        0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
        0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
        0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
        0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
        0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0, 0x14b63),
    nStr1: new Array('', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'),
    nStr2: new Array('初', '十', '廿', '卅', '□'),
    lYearDays: function (y) {
        var i, sum = 348;
        for (i = 0x8000; i > 0x8; i >>= 1) sum += (LunarDate.lunarInfo[y - 1900] & i) ? 1 : 0; return (sum + LunarDate.leapDays(y));
    },
    leapDays: function (y) {
        if (LunarDate.leapMonth(y)) {
            return ((LunarDate.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
        } else {
            return (0)
        };
    },
    leapMonth: function (y) {
        return (LunarDate.lunarInfo[y - 1900] & 0xf);
    },
    monthDays: function (y, m) {
        return ((LunarDate.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
    },
    Lunar: function (y, m, d) {
        var back = {};
        var i, leap = 0, temp = 0;
        var offset = (Date.UTC(y, m, d) - Date.UTC(1900, 0, 31)) / 86400000;
        for (i = 1900; i < 2050 && offset > 0; i++) {
            temp = LunarDate.lYearDays(i);
            offset -= temp;
        }
        if (offset < 0) {
            offset += temp; i--;
        }
        back.year = i;
        leap = LunarDate.leapMonth(i);
        back.isLeap = false;
        for (i = 1; i < 13 && offset > 0; i++) {
            if (leap > 0 && i == (leap + 1) && back.isLeap == false) {
                --i; back.isLeap = true; temp = LunarDate.leapDays(back.year);
            } else {
                temp = LunarDate.monthDays(back.year, i);
            }
            if (back.isLeap == true && i == (leap + 1)) back.isLeap = false; offset -= temp;
        }
        if (offset == 0 && leap > 0 && i == leap + 1)
            if (back.isLeap) {
                back.isLeap = false;
            } else {
                back.isLeap = true; --i;
            }
        if (offset < 0) {
            offset += temp; --i;
        }
        back.month = i; back.day = offset + 1;

        back.month = LunarDate.GetcMon(back.month);
        back.day = LunarDate.GetcDay(back.day);
        if (back.isLeap == 1) { back.month = "闰" + back.month; }

        return back;
    },
    GetcDay: function (d) {
        var s;
        switch (d) {
            case 10: s = '初十'; break;
            case 20: s = '二十';break;
            case 30: s = '三十';break;
            default: s = LunarDate.nStr2[Math.floor(d / 10)]; s += LunarDate.nStr1[d % 10];break;
        }
        return (s);
    },
    GetcMon: function (m) { if (m == 1) return '正'; else return LunarDate.nStr1[m]; },
}

/*关于周的计算方法*/
var DateWeek = {
    getMathNums: function(y,m){
        let day = new Date(y,m,0);   /* 最后一个参数为0,意为获取y年m月一共多少天 */
        return day.getDate();
    },
    getDayWeek: function(y,m,d,isChz){//isChz=true表示返回中文
        if(m == 1){
            y = y-1;
        }else{
            m = m-1;
        }
        let day = new Date(y,m,d);   /* 获取日期的周几 */
        if(isChz){
            switch(day.getDay()){
                case 0:
                    return "星期日";
                    break;
                case 1:
                    return "星期一";
                    break;   
                case 2:
                    return "星期二";
                    break;   
                case 3:
                    return "星期三";
                    break; 
                case 4:
                    return "星期四";
                    break; 
                case 5:
                    return "星期五";
                    break; 
                case 6:
                    return "星期六";
                    break;  
            }
        }else{
            return day.getDay();
        }
        
    },

	getYearWeek: function (weekstr) {
		/* 计算某年第几周的起始时间段---
		 * 第n年的第n周，获取开始和结束时间 （星期一为一周的开始）
		 * 调用方法参数"年份-周数"  week_date("2020-1")*/
		let year = parseInt(weekstr.split("-")[0]);
		let weekNo = parseInt(weekstr.split("-")[1]);
		/*此年1号是星期几*/
		let oneday = new Date(year + '-01-01').getDay();
		/*方便计算，当为星期天时为7*/
		if (oneday == 0) { oneday = 7; }

		let one_fistday;
		let one_lastday;
		/*如果1号刚好是星期一*/
		if (oneday == 1) {
			one_fistday = year + '-01-01';
			one_lastday = year + '-01-07';
		} else {
			let jj = 8 - oneday;
			one_fistday = (year - 1) + '-12-' + (31 - oneday + 2 > 9 ? 31 - oneday + 2 : '0' + (31 - oneday + 2));
			one_lastday = year + '-01-' + (jj > 9 ? jj : '0' + jj);
		}

		let fistday;
		let lastday;
		/* 日期加减法  date参数为计算开始的日期，days为需要加的天数   
		 * 格式:addDate('2017-1-11',20) */
		let addDate = function (date, days) {
			var d = new Date(date);
			d.setDate(d.getDate() + days);
			var m = d.getMonth() + 1;
			return d.getFullYear() + '-' + (m > 9 ? m : '0' + m) + '-' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate());
		}

		/*如果刚好是第一周*/
		if (weekNo == 1) {
			fistday = one_fistday;
			lastday = one_lastday;
		} else {
			fistday = addDate(one_lastday, (weekNo - 2) * 7 + 1);
			lastday = addDate(one_lastday, (weekNo - 1) * 7);
		}
		/*返回参数["2020-01-01","2020-01-07"]*/
		return [fistday, lastday];
	},
	getWeekNums: function (a, b, c) {
		/* 计算某个时间为第几周
		 * date1是当前日期
		 * date2是当年第一天
		 * d是当前日期是今年第多少天
		 * 用d + 当前年的第一天的周差距的和在除以7就是本年第几周*/
		var date1 = new Date(a, parseInt(b) - 1, c),
			date2 = new Date(a, 0, 1),
			d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
		return Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7);
	},
	getWeekLength: function (year) {
		/* 计算一年有几周
		 * 一年第一天是周几*/
		var first = new Date(year, 0, 1).getDay();
		/*计算一年有多少天*/
		if ((year % 4 == 0 && year % 100 != 0) || (year % 100 == 0 && year % 400 == 0)) {
			var allyears = 366;
		} else {
			var allyears = 365;
		}
		/*计算一年有多少周*/
		var week = parseInt((allyears + first) / 7);
		if (((allyears + first) % 7) != 0) {
			week += 1;
		}
		return week;
	},
	weekToDateArr: function (year, index) {
		/* 转换为一周内输入 */
		year = parseInt(year);
		index = parseInt(index);
		var d = new Date(year, 0, 1);
		while (d.getDay() != 1) {
			d.setDate(d.getDate() - 1);
		}
		var to = new Date(year + 1, 0, 1);
		var arr = [];
		d.setDate(d.getDate() + (7 * (index - 1)));/* 7天则为1周,得出第index周的第一天 */
		var j = 7;
		while (j > 0) {
			var _Month = (((d.getMonth() + 1) < 10) ? ("0" + (d.getMonth() + 1)) : (d.getMonth() + 1));
			var _Date = ((d.getDate() < 10) ? ("0" + d.getDate()) : d.getDate());
			arr.push(d.getFullYear() + "-" + _Month + "-" + _Date);
			d.setDate(d.getDate() + 1);
			j--;
			if (j === 0) return arr;
		}
	}
}