const initDateFormat = function () {
	Date.prototype.format = function (fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份         
			"d+": this.getDate(), //日         
			"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
			"H+": this.getHours(), //小时         
			"m+": this.getMinutes(), //分         
			"s+": this.getSeconds(), //秒         
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度         
			"S": this.getMilliseconds() //毫秒         
		};
		var week = {
			"0": "/u65e5",
			"1": "/u4e00",
			"2": "/u4e8c",
			"3": "/u4e09",
			"4": "/u56db",
			"5": "/u4e94",
			"6": "/u516d"
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		if (/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
		}
		for (var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}
}
const getBaiduToken = function () {
	return new Promise((resolve, reject) => {
		const apiKey = 'tBAXij3FL1c47ZYBOCEjYPIc';
		const secKey = '7hXBKg1rekml2NCwLPrFn4jv3GjtjWEU';
		const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secKey}`;
		wx.request({
			url: tokenUrl,
			method: 'POST',
			dataType: "json",
			header: {
				'content-type': 'application/json; charset=UTF-8'
			},
			success: function (res) {
				resolve(res);
			},
			fail: function (res) {
				wx.hideLoading();
				wx.showToast({
					title: '网络错误，请重试！',
					icon: 'none',
					duration: 2000
				})
				reject(res);
			},
			complete: function (res) {
				resolve(res);
			}
		})
	})
}

const getImgIdentify = function(tokenUrl, data){
	return new Promise((resolve, reject) => {
		const detectUrl = `https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=${tokenUrl}`;
		wx.request({
			url: detectUrl,
			data: data,
			method: 'POST',
			dataType: "json",
			header: {
				'content-type': 'Content-Type:application/json; charset=UTF-8'
			},
			success: function (res) {
				resolve(res);
			},
			fail: function (res) {
				wx.hideLoading();
				wx.showToast({
					title: '网络错误，请重试！',
					icon: 'none',
					duration: 2000
				})
				reject(res);
			},
			complete: function (res) {
				resolve(res);
			}
		})
	})
}

module.exports = {
	initDateFormat,
	getBaiduToken,
	getImgIdentify
}