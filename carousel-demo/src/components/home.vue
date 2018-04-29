<template>
	<div class="home">
		<div class="content">
			<ul :style="{'left': -500*activeNum+'px',}">
				<li v-for="(item,index) in imgData"><img :src="item.src" /></li>
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
					src: a,
				}, {
					src: b,
				},{
					src: c,
				},{
					src: d,
				}]
			}
		},
		created() {
			this.timeStart();
		},
		activated() {

		},
		methods: {
			timeStart() {
				let self = this;
				self.timer = setInterval(res => {
					self.activeNum += 1;
					console.log(self.activeNum);
					if(self.activeNum==3){
						self.imgData.shift()
					}
				}, 3000)
			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	
	h1,
	h2 {
		font-weight: normal;
	}
	.content{
		width: 500px;
		height: 379px;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
	}
	ul {
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		display: -webkit-flex;
		/*animation: move 1s linear;*/
		transition: all 1s linear;
		li {
			flex: 1;
			-wekbit-flex: 1;
		}
	}
	a {
		color: #42b983;
	}
</style>