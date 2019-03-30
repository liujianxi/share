<template>
	<div class="home">
		<div class="btn left-btn" @click="preBtn()">&lt;</div>
		<div class="btn right-btn" @click="nextBtn()">&gt;</div>
		<p>{{activeNum}}</p>
		<div class="content">
			<ul :style="{'left': -500*activeNum+'px',}" :class="moveFlag?'move':''">
				<li v-for="(item,index) in imgData" :key="index"><img :src="item.src" /></li>
				<!-- <li v-for="(item,index) in imgData" :key="index">{{item.src}}</li> -->
			</ul>
		</div>
	</div>
</template>

<script>
	import a from '../assets/1.jpg'
	import b from '../assets/2.jpg'
	import c from '../assets/3.jpg'
	import d from '../assets/4.jpg'
	export default {
		name: 'home',
		data() {
			return {
				activeNum: 1,
				moveFlag: true,
				timer: '',
				a:a,
				imgData: [{
					src: a,
				}, {
					src: b,
				},{
					src: c,
				},{
					src: d,
				}],
				dataLength: '',
			}
		},
		created() {
			let self = this;
			let imgData = self.imgData;
			self.dataLength = imgData.length;
			let start_info = imgData[0];
			let end_info = imgData[imgData.length-1];
			imgData.unshift(end_info);
			imgData.push(start_info);
			console.log(imgData);
			self.timeStart();
		},
		activated() {

		},
		methods: {
			timeStart() {
				let self = this;
				clearInterval(self.timer);
				self.timer = setInterval(res => {
					self.moveFlag = true;
					self.activeNum += 1;
					self.moveMent();
				}, 3000)
			},
			preBtn(){
				let self = this;
				self.moveFlag = true;
				self.activeNum -= 1;
				clearInterval(self.timer);
				self.moveMent('click');
			},
			nextBtn(){
				let self = this;
				self.moveFlag = true;
				self.activeNum += 1;
				clearInterval(self.timer);
				self.moveMent('click');
				console.log(self.activeNum);
			},
			moveMent(str){
				let self = this;
				console.log(self.activeNum);
				if (self.activeNum == self.dataLength + 1){
					setTimeout(res=>{
						self.moveFlag = false;
						self.activeNum = 1;
						
					}, 200)
				}
				if(self.activeNum == 0){
					setTimeout(res=>{
						self.moveFlag = false;
						self.activeNum = self.dataLength;
					}, 200)
				}
				if(str === 'click'){
					self.timeStart();
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	
	h1,
	h2 {
		font-weight: normal;
	}
	.home{
		position: relative;
		>.btn{
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
			font-size: 20px;
			color: red;
			width: 100px;
			height: 100px;
			line-height: 100px;
			text-align: center;
			cursor: pointer;
			border: 1px solid red;
		}
		.left-btn{
			left: 100px;
		}
		.right-btn{
			right: 100px;
		}
	}
	.content{
		width: 500px;
		height: 375px;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		border: 1px solid red;
	}
	ul {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		display: -webkit-flex;
		li {
			flex: 1;
			-wekbit-flex: 1;
			width: 500px;
			height: 375px;
			line-height: 375px;
			color: black;
			font-size: 18px;
		}
	}
	.move{
		transition: all .2s linear;
	}
	a {
		color: #42b983;
	}
</style>