**背景：监控keyup事件时，每输入一个字符就会触发，然后请求接口，请求过多**
----------
## demo在index.html里面，核心js如下,对输入的字符串进行延时处理 ##

```
function getData(content) {
	console.log('this is：' + content)
}
//去抖后
let inputb = document.querySelector('#debounce');
let getDebounce = debounce(getData, 100);
inputb.addEventListener('keyup', function (e) {
	getDebounce(e.target.value)
})
function debounce(fun, delay) {
	return function (args) {
		let that = this
		let _args = args
		clearTimeout(fun.id)
		fun.id = setTimeout(function () {
			fun.call(that, _args)
		}, delay)
	}
}
```
