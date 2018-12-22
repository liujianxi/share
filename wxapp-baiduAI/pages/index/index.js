//index.js
//获取应用实例
import util from "../../utils/util.js";
const app = getApp()

Page({
	data: {
		img: 'https://user-gold-cdn.xitu.io/2018/12/15/167b145f612b2257?w=1200&h=972&f=jpeg&s=70526',
		motto: 'Hello World',
		userInfo: {},
		hasUserInfo: false,
		canIUse: wx.canIUse('button.open-type.getUserInfo'),
		score: 0,
	},
	onLoad: function () {
		//获取百度token
		this.initBaiduToken();
		if (app.globalData.userInfo) {
			this.setData({
				userInfo: app.globalData.userInfo,
				hasUserInfo: true
			})
		} else if (this.data.canIUse) {
			// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			// 所以此处加入 callback 以防止这种情况
			app.userInfoReadyCallback = res => {
				this.setData({
					userInfo: res.userInfo,
					hasUserInfo: true
				})
			}
		} else {
			// 在没有 open-type=getUserInfo 版本的兼容处理
			wx.getUserInfo({
				success: res => {
					app.globalData.userInfo = res.userInfo
					this.setData({
						userInfo: res.userInfo,
						hasUserInfo: true
					})
				}
			})
		}
	},
	initBaiduToken() {
		let self = this;
		wx.showLoading({
			title: '正在分析...',
		})
		util.getBaiduToken().then((res) => {
			console.log('baidu--token',res);
			let token = res.data.access_token;
			console.log('token----', token);
			let data = {
				"image": self.data.img,
				"image_type":"URL",
				"face_field":"ge,beauty,expression,face_shape,gender,glasses,landmark,race,quality,eye_status,emotion,face_type"
			}
			util.getImgIdentify(token, data).then((res)=>{
				console.log('baidu--img-detect',res);
				let score = parseInt(res.data.result.face_list[0].beauty);
				self.setData({
					score: score,
				})
				wx.hideLoading();
			})
		})
	},
	getUserInfo: function (e) {
		console.log(e)
		app.globalData.userInfo = e.detail.userInfo
		this.setData({
			userInfo: e.detail.userInfo,
			hasUserInfo: true
		})
	}
})