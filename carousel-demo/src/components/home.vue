<template>
	<div class="home">
		<div class="btn left-btn" @click="preBtn()">&lt;</div>
		<div class="btn right-btn" @click="nextBtn()">&gt;</div>
		<div class="content">
			<ul :style="{'left': -500*activeNum+'px',}">
				<!-- <li v-for="(item,index) in imgData"><img :src="item.src" /></li> -->
				<li v-for="(item,index) in imgData">{{item.src}}</li>
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
		name: 'HelloWorld',
		data() {
			return {
				activeNum: 0,
				timer: '',
				a:a,
				imgData: [{
					src: 1,
				}, {
					src: 2,
				},{
					src: 3,
				},{
					src: 4,
				}]
			}
		},
		created() {
			// this.timeStart();
		},
		activated() {

		},
		methods: {
			timeStart() {
				let self = this;
				self.timer = setInterval(res => {
					self.activeNum += 1;
					console.log(self.activeNum);
					// let preImg = self.imgData.shift();
					// self.imgData.push(preImg);
					// if(self.activeNum==4){
					// 	self.activeNum = 0;
					// }
				}, 3000)
			},
			preBtn(){
				let self = this;
				self.activeNum -= 1;
			},
			nextBtn(){
				let self = this;
				self.activeNum += 1;
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
		/*animation: move 1s linear;*/
		transition: all .2s linear;
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
	a {
		color: #42b983;
	}
</style>