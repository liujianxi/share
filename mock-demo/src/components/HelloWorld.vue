<template>
<div>
	<pre v-html="msg"></pre>
	<!-- <img :src="imgSrc" alt=""> -->
	<div>{{date}}</div>
	<div>{{time}}</div>
	<div>{{dateTime}}</div>
	<div :style="{color:rColor}">1123231121</div>
	<div>{{first}} {{name}} {{last}}</div>
</div>
</template>

<script>
import http from '../utils/http.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
	  msg: '',
	  imgSrc:'',
	  date: '',
	  time: '',
	  dateTime: '',
	  rColor:'black',
	  first: '',
	  last: '',
	  name: '',
    }
  },
  created(){
	  // 使用 Mock
	// var Mock = require('mockjs')
	// var data = Mock.mock({
	// 	// 属性 list 的值是一个数组，其中含有 1 到 10 个元素
	// 	'list|1-10': [{
	// 		// 属性 id 是一个自增数，起始值为 1，每次增 1
	// 		'id|+1': ['a','b','c','d','e']
	// 	}]
	// })
	// var data = Mock.mock({
	// 	name: {
	// 		first: '@FIRST',
	// 		middle: '@FIRST',
	// 		last: '@LAST',
	// 		full: '@first @middle @last'
	// 	}
	// })
	// // 输出结果
	// console.log(JSON.stringify(data))
  },
	mounted(){
		let Mock = require('mockjs');
		let self = this;
		// Mock.mock(/\.json/, {
		// 	'list|1-10': [{
		// 		'id|+1': 1,
		// 		'email': '@EMAIL'
		// 	}],
		// 	errorCode: 0
		// })
		// http.post('hello.json').then((data)=>{
		// 	// console.log(data);
		// 	self.msg = JSON.stringify(data, null, 4);
		// 	// $('<pre>').text().appendTo('body');
		// })
		var Random = Mock.Random;
		let email = Random.email();
		console.log(email);
		self.imgSrc = Random.image('','','','png','');
		self.date = Random.date();
		self.time = Random.time();
		self.dateTime = Random.datetime();
		// self.rColor = Random.color();
		self.rColor = Random.hex();
		self.first = Random.first();
		self.last = Random.last();
		self.name = Random.name();
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
