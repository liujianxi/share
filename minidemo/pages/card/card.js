//index.js
//获取应用实例
const app = getApp()

Page({
	data: {
		a_width: 100,
		b_width: 0,
		a_flag: true,
		b_flag: false,
		a_timer: '',
		b_timer: '',
		playFlag: false,
	},
	//事件处理函数
	bindViewTap: function () {
		wx.navigateTo({
			url: '../logs/logs'
		})
	},
	onLoad: function () {

	},
	changeCard() {
		let self = this;
		let a_width = self.data.a_width;
		let b_width = self.data.b_width;
		let a_timer = '';
		let playFlag = self.data.playFlag;
		if(playFlag){
			return false;
		}
		if (a_width > b_width){
			a_timer = setInterval(function(){
				a_width -= 5;
				self.setData({
					a_width: a_width,
					playFlag: true,
				});
				if(a_width <= 0){
					clearInterval(self.data.a_timer);
					self.changeTimer(0);
					self.setData({
						a_flag: false,
						b_flag: true,
						a_width: 0,
						playFlag: false,
					});
				}
			},20);
		}else{
			a_timer = setInterval(function(){
				b_width -= 5;
				self.setData({
					b_width: b_width,
					playFlag: true,
				});
				if(b_width <= 0){
					clearInterval(self.data.a_timer);
					self.changeTimer(1);
					self.setData({
						a_flag: true,
						b_flag: false,
						b_width: 0,
						playFlag: false,
					});
				}
			},20);
		}
		self.setData({
			a_timer: a_timer,
		})
	},
	changeTimer(str){
		let self = this;
		let a_width = self.data.a_width;
		let b_width = self.data.b_width;
		let b_timer = '';
		//a变小
		if (str == 0){
			b_timer = setInterval(function(){
				b_width += 5;
				self.setData({
					b_width: b_width,
				});
				if(b_width >= 100){
					clearInterval(self.data.b_timer);
				}
			},20);
		}else{
			b_timer = setInterval(function(){
				a_width += 5;
				self.setData({
					a_width: a_width,
				});
				if(a_width >= 100){
					clearInterval(self.data.b_timer);
				}
			},20);
		}
		self.setData({
			b_timer: b_timer,
		})
	}
})