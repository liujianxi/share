## 前端面试题库
## 1、介绍下 BFC 及其应用
```
- BFC 即 Block Formatting Contexts (块级格式化上下文),是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。
- 创建 BFC 的方式有：
html 根元素
float 浮动
position (absolute、fixed)
overflow 除了 visible 以外的值 (hidden、auto、scroll)
display 为 inline-block、table-cells、flex
```
#### BFC 特性
1）同一个 BFC 下外边距会发生折叠。

如下例子两个盒子之间距离只有100px，这不是 CSS 的 bug，我们可以理解为一种规范，如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。
```html
<head>
    <style>
        div{
            width: 100px;
            height: 100px;
            margin: 100px;
            border: 1px solid red;
        }
    </style>
</head>
<body>
    <div></div>
    <div></div>
</body>
```
即可改成这样
```html
<head>
    <style>
        p{
            width: 100px;
            height: 100px;
            margin: 100px;
            border: 1px solid red;
        }
        div{
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div>
        <p></p>
    </div>
    <div>
        <p></p>
    </div>
</body>
```
2）BFC 可以包含浮动的元素（清除浮动）
```html
<head>
    <style>
        p{
            width: 100px;
            height: 100px;
            background: black;
            float: left;
        }
        div{
            width: 100%;
            border: 1px solid red;
            /* 清除浮动 div可包含浮动的元素*/
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div>
        <p></p>
    </div>
</body>
```
3）BFC 可以阻止元素被浮动元素覆盖

下面是一个文字环绕效果
```html
<head>
    <style>
        div{
            width: 100px;
            height: 100px;
            background: #4CAF50;
            float: left;
        }
        section{
            width: 300px;
            border: 1px solid red;
            margin: 100px;
        }
    </style>
</head>
<body>
    <section>
        <div>我在左边浮动</div>
        <p>这是一段文字，BFC 即 Block Formatting Contexts (块级格式化上下文),是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。</p>
    </section>
</body>
```
![interview-init](./images/WX20191010-101541.png)

给p元素添加overflow: hidden
```html
p{
    overflow: hidden;
}
```
![interview-init](./images/WX20191010-102351.png)

这个方法可以用来实现两列自适应布局,左边宽度固定，右边自适应宽度

## 2、判断数组的方法，请分别介绍它们之间的区别和优劣
```js
Object.prototype.toString.call()、instanceof、Array.isArray()以及typeof
```
1）Object.prototype.toString.call()

每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回 [object type]，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，所以我们需要使用call或者apply方法来改变toString方法的执行上下文。
```js
const an = ['Hello','World'];
an.toString(); // "Hello,World"
Object.prototype.toString.call(an); // "[object Array]"
```
这种方法对于所有基本的数据类型都能进行判断，即使是 null 和 undefined 。
但是无法区分自定义对象类型，自定义类型可以采用instanceof区分
```js
console.log(Object.prototype.toString.call("this"));//[object String]
console.log(Object.prototype.toString.call(12));//[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]
console.log(Object.prototype.toString.call(null));//[object Null]
console.log(Object.prototype.toString.call({name: "this"}));//[object Object]
console.log(Object.prototype.toString.call(function(){}));//[object Function]
console.log(Object.prototype.toString.call([]));//[object Array]
console.log(Object.prototype.toString.call(new Date));//[object Date]
console.log(Object.prototype.toString.call(/\d/));//[object RegExp]
function Person(){};
console.log(Object.prototype.toString.call(new Person));//[object Object]
```
Object.prototype.toString.call() 常用于判断浏览器内置对象。

2）instanceof

instanceof 的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

使用 instanceof判断一个对象是否为数组，instanceof 会判断这个对象的原型链上是否会找到对应的 Array 的原型，找到返回 true，否则返回 false。

但 instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。
```js
instanceof Array; // true
instanceof Object; // true
'a' instanceof String; //false
```
3）Array.isArray()

- 功能：用来判断对象是否为数组
- instanceof 与 isArray

当检测Array实例时，Array.isArray 优于 instanceof ，因为 Array.isArray 可以检测出 iframes
```js
var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true
Object.prototype.toString.call(arr); // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```
- Array.isArray() 与 Object.prototype.toString.call()<br />
Array.isArray()是ES5新增的方法，当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。
```js
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
```
4）typeof
```js
typeof 只能检测基本数据类型，包括boolean、undefined、string、number、symbol，而null、Array、Object ,使用typeof检测出来都是Object，无法检测具体是哪种引用类型。
```

## 3、怎么让一个div水平垂直居中
```html
<div class="parent">
    <div class="child"></div>
</div>
```
1）使用position + transform，不定宽高时
```css
.parent{
    position: relative;
}
.child{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
```

2）使用position + transform，有宽高时
```css
.parent{
    position: relative;
}
.child{
    width: 100px;
    height: 100px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
}
```
3）使用flex
```css
.parent{
    display: flex;
    align-items: center;
    justify-content: center;
}
```
或者
```css
.parent{
    display: flex;
    align-items: center;
}
.child{
    margin: 0 auto;
}
```
或者
```css
.parent{
    display: flex;
}
.child{
    margin: auto;
}
```

4）使用position
```css
.parent{
    position: relative;
}
.child{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}
```
5）使用grid
```css
.parent{
    display: grid;
}
.child{
    justify-self: center;
    align-self: center;
}
```
6）使用table
```css
.parent{
    display: table;
}
.child{
    display: table-cell;
    vertical-align: middle;
    text-align: center;
}
```
或者
```css
.parent {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.child {
    display: inline-block;
}
```

7）使用伪类
```css
.parent{
    font-size: 0;
    text-align: center;
}
.parent::before {
    content: "";
    display: inline-block;
    width: 0;
    height: 100%;
    vertical-align: middle;
}
.child{
    display: inline-block;
    vertical-align: middle;
}
```

## 4、下面的代码打印什么内容，为什么？
```js
var b = 10;
(function b(){
    b = 20;
    console.log(b); 
})();
```
正常模式下：
```js
var b = 10;
(function b() {
   // 内部作用域，会先去查找是有已有变量b的声明，有就直接赋值20，确实有了呀。发现了具名函数 function b(){}，拿此b做赋值；
   // IIFE的函数无法进行赋值（内部机制，类似const定义的常量），所以无效。
  // （这里说的“内部机制”，想搞清楚，需要去查阅一些资料，弄明白IIFE在JS引擎的工作方式，堆栈存储IIFE的方式等）
    b = 20;
    console.log(b); // [Function b]
    console.log(window.b); // 10，不是20
})();
```
严格模式下会报错：
```js
var b = 10;
(function b() {
  'use strict'
  b = 20;
  console.log(b)
})() // "Uncaught TypeError: Assignment to constant variable."
```
有window：
```js
var b = 10;
(function b() {
    window.b = 20; 
    console.log(b); // [Function b]
    console.log(window.b); // 20是必然的
})();
```
有var：
```js
var b = 10;
(function b() {
    var b = 20; // IIFE内部变量
    console.log(b); // 20
   console.log(window.b); // 10 
})();
```
## 5、下面的代码打印什么内容，为什么？
```js
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
```
先说结果

依次为：undefined，10，20
```js
var a = 10;
(function () {
    //函数里面重新定义了a，变量提升，预解析
    console.log(a);//undefined
    a = 5;
    console.log(window.a);//10，a是函数局部变量
    var a = 20;
    console.log(a);//当然20
})()
console.log(a);//10，相当于window.a
```
换成这样：
```js
var a = 10;
(function () {
    //函数里面没有重新定义
    console.log(a);//10
    a = 5;
    console.log(window.a);//5
    a = 20;
    console.log(a);//当然20
})()
console.log(a);//20，相当于window.a
```
换成这样：
```js
var a = 10;
function b() {
    //函数里面重新定义了a，变量提升，预解析
    console.log(a);//undefined
    a = 5;
    console.log(window.a);//10，a是函数局部变量
    var a = 20;
    console.log(a);//当然20
}
b();
console.log(a);//10，相当于window.a
```
## 6、简单介绍下重绘和回流（Repaint & Reflow），以及如何进行优化

### 先来看下浏览器的渲染过程

![interview-init](./images/browser-render.png)

从上面这个图上，我们可以看到，浏览器渲染过程如下：
```
1、解析HTML，生成DOM树，解析CSS，生成CSSOM树
2、将DOM树和CSSOM树结合，生成渲染树(Render Tree)
3、Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
4、Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
5、Display:将像素发送给GPU，展示在页面上。（这一步其实还有很多内容，比如会在GPU将多个合成层合并为同一个层，并展示在页面中，而css3硬件加速的原理则是新建合成层）
```
渲染过程看起来很简单，让我们来具体了解下每一步具体做了什么。

### 生成渲染树

![interview-init](./images/css-render.png)
为了构建渲染树，浏览器主要完成了以下工作：

1. 从DOM树的根节点开始遍历每个可见节点。
2. 对于每个可见的节点，找到CSSOM树中对应的规则，并应用它们。
3. 根据每个可见节点以及其对应的样式，组合生成渲染树。

第一步中，既然说到了要遍历可见的节点，那么我们得先知道，什么节点是不可见的。不可见的节点包括：

- 一些不会渲染输出的节点，比如script、meta、link等。
- 一些通过css进行隐藏的节点。比如display:none。注意，利用visibility和opacity隐藏的节点，还是会显示在渲染树上的。只有display:none的节点才不会显示在渲染树上。

####  注意：渲染树只包含可见的节点

### 回流
前面我们通过构造渲染树，我们将可见DOM节点以及它对应的样式结合起来，可是我们还需要计算它们在设备视口(viewport)内的确切位置和大小，这个计算的阶段就是回流。

为了弄清每个对象在网站上的确切大小和位置，浏览器从渲染树的根节点开始遍历，我们可以以下面这个实例来表示：
```html
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Critial Path: Hello world!</title>
    </head>
    <body>
        <div style="width: 50%">
        <div style="width: 50%">Hello world!</div>
        </div>
    </body>
</html>
```
我们可以看到，第一个div将节点的显示尺寸设置为视口宽度的50%，第二个div将其尺寸设置为父节点的50%。而在回流这个阶段，我们就需要根据视口具体的宽度，将其转为实际的像素值。

### 重绘

最终，我们通过构造渲染树和回流阶段，我们知道了哪些节点是可见的，以及可见节点的样式和具体的几何信息(位置、大小)，那么我们就可以将渲染树的每个节点都转换为屏幕上的实际像素，这个阶段就叫做重绘节点。

既然知道了浏览器的渲染过程后，我们就来探讨下，何时会发生回流重绘。

### 何时发生回流重绘

我们前面知道了，回流这一阶段主要是计算节点的位置和几何信息，那么当页面布局和几何信息发生变化的时候，就需要回流。比如以下情况：

- 添加或删除可见的DOM元素
- 元素的位置发生变化
- 元素的尺寸发生变化（包括外边距、内边框、边框大小、高度和宽度等）
- 内容发生变化，比如文本变化或图片被另一个不同尺寸的图片所替代。
- 页面一开始渲染的时候（这肯定避免不了）
- 浏览器的窗口尺寸变化（因为回流是根据视口的大小来计算元素的位置和大小的）

#### 注意：回流一定会触发重绘，而重绘不一定会回流

根据改变的范围和程度，渲染树中或大或小的部分需要重新计算，有些改变会触发整个页面的重排，比如，滚动条出现的时候或者修改了根节点。

### 浏览器的优化机制

现代的浏览器都是很聪明的，由于每次重绘都会造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量执行来优化重绘过程。浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，才清空队列。但是！当你获取布局信息的操作的时候，会强制队列刷新，比如当你访问以下属性或者使用以下方法：

- offsetTop、offsetLeft、offsetWidth、offsetHeight
- scrollTop、scrollLeft、scrollWidth、scrollHeight
- clientTop、clientLeft、clientWidth、clientHeight
- getComputedStyle()
- getBoundingClientRect
- 具体可以访问这个网站：https://gist.github.com/paulirish/5d52fb081b3570c81e3a

以上属性和方法都需要返回最新的布局信息，因此浏览器不得不清空队列，触发回流重绘来返回正确的值。因此，我们在修改样式的时候，最好避免使用上面列出的属性，他们都会刷新渲染队列。如果要使用它们，最好将值缓存起来。

### 减少回流和重绘

好了，到了我们今天的重头戏，前面说了这么多背景和理论知识，接下来让我们谈谈如何减少回流和重绘。

### 最小化重绘和重排

由于重绘和重排可能代价比较昂贵，因此最好就是可以减少它的发生次数。为了减少发生次数，我们可以合并多次对DOM和样式的修改，然后一次处理掉。考虑这个例子

```js
const el = document.getElementById('test');
el.style.padding = '5px';
el.style.borderLeft = '1px';
el.style.borderRight = '2px';
```
例子中，有三个样式属性被修改了，每一个都会影响元素的几何结构，引起回流。当然，大部分现代浏览器都对其做了优化，因此，只会触发一次重排。但是如果在旧版的浏览器或者在上面代码执行的时候，有其他代码访问了布局信息(上文中的会触发回流的布局信息)，那么就会导致三次重排。

因此，我们可以合并所有的改变然后依次处理，比如我们可以采取以下的方式：
- 使用cssText
    ```js
    const el = document.getElementById('test');
    el.style.cssText += 'border-left: 1px; border-right: 2px; padding: 5px;';
    ```
- 修改CSS的class
    ```js
    const el = document.getElementById('test');
    el.className += ' active';
    ```
具体参考：https://muyiy.cn/question/browser/22.html

## 7、文字两端对齐
```html
<div>姓名</div>
<div>手机号码</div>
<div>账号</div>
<div>密码</div>
```
```css
div {
    margin: 10px 0; 
    width: 100px;
    border: 1px solid red;
    text-align: justify;
    text-align-last: justify;
}
```
![interview-init](./images/WX20191017-103128.png)

## 8、['1', '2', '3'].map(parseInt)的结果是什么？
```
先说结果：
['1', NaN, NaN]
为什么不是['1', '2', '3']呢，下面开始分析
```
- map() 方法返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。

- map() 方法按照原始数组元素顺序依次处理元素。

map(parseInt)其实是：
```js
map(function(item, index){
    return parseInt(item, index);
})
```
即依次运行的是：
```js
parseInt('1', 0);
parseInt('2', 1);
parseInt('3', 2);
```
### parseInt的用法

- parseInt(string, radix) 函数可解析一个字符串，并返回一个整数。
- 当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。
- radix 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。

所以：
parseInt('1', 0);//'1'
parseInt('2', 1);//NaN
parseInt('3', 2);//NaN，由于2进制中没有3

## 9、写出如下代码的打印结果
```js
function changeObjProperty(o) {
    o.siteUrl = "http://www.baidu.com";
    o = new Object();
    o.siteUrl = "http://www.google.com";
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
```
此题咋看小问题，其实暗藏玄机。
先说答案：
```
console.log(webSite.siteUrl);//"http://www.baidu.com"
```
复盘如下：

```js
function changeObjProperty(o) {
    //o是形参，对象的引用，依旧指向原地址，相当于 var o = webSite;赋值改变对象的属性
    o.siteUrl = "http://www.baidu.com";
    //变量o指向新的地址 以后的变动和旧地址无关，题目打印的是外部webSite.siteUrl
    o = new Object();
    o.siteUrl = "http://www.google.com";
}
```

将题目改成如下：
```js
function changeObjProperty(o) {
    o.siteUrl = "http://www.baidu.com";
    o = new Object();
    o.siteUrl = "http://www.google.com";
    return o;
} 
let webSite = new Object();
changeObjProperty(webSite);
console.log(webSite.siteUrl);
let newSite = changeObjProperty(webSite);
console.log(newSite.siteUrl);
```
此时打印结果如下：
```j
console.log(webSite.siteUrl);//"http://www.baidu.com"
console.log(newSite.siteUrl);//"http://www.google.com"
```

## 10、数组去重
```js
var arr = [2,0,1,9,1,0,2,1];
```
- indexOf

```js
var arr = [2,0,1,9,1,0,2,1];
var a_arr = [];
for(let i=0;i<arr.length;i++){
    if(a_arr.indexOf(arr[i]) == -1){
        a_arr.push(arr[i]);
    }
}
console.log(a_arr);
```
- 两个for循环
```js
var arr = [2,0,1,9,1,0,2,1,4];
var a_arr = [];
for(let i=0;i<arr.length;i++){
    var flag = true;
    for(let j=0;j<a_arr.length;j++){
        if(arr[i] == arr[j]){
            flag = false;
        }
    }
    if(flag){
        a_arr.push(arr[i]);
    }
}
console.log(a_arr);
```
- ES6 set方法
```js
var arr = [2,0,1,9,1,0,2,1,4];
var a_arr = [...new Set(arr)]
console.log(a_arr);
```
- filter方法
```js
var arr = [2,0,1,9,1,0,2,1,4];
function unique(array) {
    var res = array.filter(function(item, index, array){
        return array.indexOf(item) === index;
    })
    return res;
}
console.log(unique(arr));
```

## 11、 一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？
```js
1、浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
2、调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;
3、通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;
4、进行HTTP协议会话，客户端发送报头(请求报头);
5、进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
6、进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理;
7、处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;
8、浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;
9、文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
10、页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。

```

## 12、ajax实现原理及方法使用

```js
AJAX不是JavaScript的规范，它来自一个缩写：Asynchronous JavaScript and XML，意思就是用JavaScript执行异步网络请求。
```
原生ajax的请求步骤
```js
//创建 XMLHttpRequest 对象
var ajax = new XMLHttpRequest();
//规定请求的类型、URL 以及是否异步处理请求。
ajax.open('GET',url,true);
//发送信息至服务器时内容编码类型
ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
//发送请求
ajax.send(null);  
//接受服务器响应数据
ajax.onreadystatechange = function () {
    if (obj.readyState == 4 && (obj.status == 200 || obj.status == 304)) { 
    }
};
```

## 13、说说vue中key的原理
```
便于diff算法的更新，key的唯一性，能让算法更快的找到需要更新的dom，需要注意的是，key要唯一，不然会出现很隐蔽性的更新问题。
```

## 14、vue双向绑定的原理是什么？
```
双向数据绑定是基于Object.defineProperty()重新定义get和set方法实现的。修改触发set方法赋值，获取触发get方法取值，并通过数据劫持发布信息。
```
```js
let obj = {
    name: 't-one',
    location: {x: 100, y: 200}
}

function render(){
    console.log('渲染视图');
}

function observe(data){
    for(let key in data){
        defineData(data, key, data[key]);
    }
}

function defineData(data, key, value){
    Object.defineProperty(data, key, {
        get(){
            return value;
        },
        set(newValue){
            render();
            value = newValue;
        }
    })
}
observe(obj);
obj.name = 'liu';
console.log(obj.name);//liu
```
一个简易的双向绑定
```js
<input type="text" id="input">
<div id="content"></div>
<script>
    function obersver(data){
        for(let i in data){
            defineData(data,i,data[i]);
        }
    }
    function defineData(data,key,value){
        Object.defineProperty(data,key,{
            get:function(){
                return value;
            },
            set: function(newValue){
                console.log('调用了set====');
                value = newValue;
                document.getElementById('content').innerHTML = newValue;
            }
        })
    }
    let obj = {};
    document.addEventListener('keyup',function(e){
        obersver(obj);
        obj.text = e.target.value;
        console.log(obj.text);
    })
</script>
```

## 15、vue中$nextTick有什么作用？
```js
处理数据动态变化后，dom还未及时更新的问题。$nextTick就可以获取到数据更新后最新的dom变化
```

## 16、浅谈前端工程化、模块化、组件化

#### 前端工程化
```js
1、将前端项目当成一项系统工程进行分析、组织和构建从而达到项目结构清晰、分工明确、团队配合默契、开发效率提高的目的
2、工程化思维就是“结构、样式和动作分离”。如目录分为assets,components,router,util
```

#### 前端模块化
```js
1、可以简单的认为模块化和组件化是工程化的表现形式
2、JS模块化方案很多有AMD/CommonJS/UMD/ES6 Module等,CSS模块化开发大多是在less、sass、stylus
```
es6带来了语言原生的模块化方案：
```js
const methodOne = params => {
    console.log(params)
}
const methodTwo = params => {
    console.log(params)
}
// 导出方式 1
export default {
    methodOne,
    methodTwo
}
// 导出方式 2 
export {
    methodOne,
    methodTwo
}
```
```js
// 引入方式 1 对应导出方式 1
import module from './module'
module.methodOne();

// 引入方式2 对应导出方式 2
import { methodOne } from './module'
methodOne();
```

#### 前端组件化
```js
1、组件化将页面视为一个容器,页面上各个独立部分例如:头部、导航、焦点图、侧边栏、底部等视为独立组件,不同的页面根据内容的需要,去盛放相关组件即可组成完整的页面。
2、模块化和组件化一个最直接的好处就是复用
```

## 17、css中link与@import的区别
```css
1、@import是 CSS 提供的语法规则，只有导入样式表的作用；link是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等。
2、加载页面时，link引入的CSS被同时加载，@import引入的CSS将在页面加载完毕后加载。
3、link标签作为HTML元素，不存在兼容性问题，而@import是CSS2.1才有的语法，故老版本浏览器（IE5之前）不能识别。
4、可以通过JS操作DOM，来插入link标签改变样式；由于DOM方法是基于文档的，无法使用@import方式插入样式。
```
## 18、请写一个正则15-20位的大写字母或数字
```js
var reg = /[^A-Z\d]{15,20}/;
```

## 19、如下代码输出是什么
```js
var fullName = 'a';
var obj = {
    fullName: 'b',
    prop:{
        fullName: 'c',
        getFullName: function(){
            console.log(this);
            return this.fullName
        }
    }
}
console.log(obj.prop.getFullName());
var test = obj.prop.getFullName;
console.log(test());
```
解释如下：
```js
obj.prop.getFullName()这里this指向obj.prop，故
console.log(obj.prop.getFullName());//'c'
test = obj.prop.getFullName;此处this指向window，故
console.log(test());//'a'
```
## 20、如下代码输出是什么
```js
var num = 1;
var myObject = {
    num: 2,
    add: function() {
        this.num = 3;
        (function() {
            console.log(this.num);
            this.num = 4;
        })();
        console.log(this.num);
    },
    sub: function() {
        console.log(this.num)
    }
}
myObject.add();
console.log(myObject.num);
console.log(num);
var sub = myObject.sub;
sub();
```
解释如下：
```js
var num = 1;
var myObject = {
    num: 2,
    add: function() {
        this.num = 3;
        (function() {
            //此时this指向window，故值为1
            console.log(this.num);
            //此时window.num = 4
            this.num = 4;
        })();
        //此处this为myObject，故this.num=3
        console.log(this.num);
    },
    sub: function() {
        console.log(this.num)
    }
}
myObject.add();//1，3
console.log(myObject.num);//3
console.log(num);//4
//此处this指向window
var sub = myObject.sub;
sub();//4
```
## 21、如下代码输出的是什么
```js
setTimeout(function(){
    console.log(1)
}, 0)
new Promise(function executor(resolve){
    console.log(2);
    for(var i=0;i<100;i++){
        i==99 && resolve();
    }
    console.log(3);
}).then(function(){
    console.log(4);
});
console.log(5);
```
解释如下：
```js
setTimeout 和 setInterval的运行机制是将指定的代码移出本次执行，等到下一轮 Event Loop 时，再检查是否到了指定时间。如果到了，就执行对应的代码；如果不到，就等到再下一轮 Event Loop时重新判断。
这意味着，setTimeout指定的代码，必须等到本次执行的所有同步代码都执行完，才会执行。
故最后输出1
new Promise是立即执行，先打印2，3，然后5，再执行then打印4，最后是1
故结果为：
2，3，5，4，1
```

## 22、vue项目优化的手段有哪些
```js
前端方面：
1、路由懒加载
2、图片，资源放cdn
3、页面图片较多进行懒加载
4、骨架屏方案
5、采用服务端渲染---nuxt.js
服务器端：
开启gzip
```

## 23、mvc，mvp，mvvm是什么
#### mvc
```js
模型（Model）：数据保存
视图（View）：用户界面。
控制器（Controller）：业务逻辑
```
![interview-init](./images/bg2015020105.png)
所有通信都是单向的
```js
View 传送指令到 Controller
Controller 完成业务逻辑后，要求 Model 改变状态
Model 将新的数据发送到 View，用户得到反馈
```
#### mvp
```js
1. 各部分之间的通信，都是双向的。
2. View 与 Model 不发生联系，都通过 Presenter 传递。
3. View 非常薄，不部署任何业务逻辑，称为"被动视图"（Passive View），即没有任何主动性，而 Presenter非常厚，所有逻辑都部署在那里。
```
![interview-init](./images/bg2015020109.png)

#### mvvm
```js
View的变动，自动反映在 ViewModel，反之亦然。
```
![interview-init](./images/bg2015020110.png)

## 24、vue，jq，react，angular区别，各自优势
#### jq
```js
1、需要频繁操作dom
2、容易引起重绘和回流，影响页面性能
```
#### vue
```js
1、mvvm模式，采用虚拟dom不需要频繁操作dom，通过双向绑定，用数据驱动页面变化，页面变化对应数据也发生变化，只需要关注数据层的业务逻辑，而无需关注视图层的更新。可以尽量减少无用的更新操作，提高dom渲染效率。
2、组件化开发，页面由若干个组建组成，可复用性高。
3、社区环境好，各类资源文档十分齐全。
4、通过Object.defineProperty() 方法，监控对数据的操作，从而可以自动触发数据同步。
```

#### react
```js
1、虚拟dom。
2、一切都是组件，组件实例之间可以嵌套。
3、使用独特的jsx语法。
```
#### angular
```js
1、AngularJS的学习成本高，比如增加了Dependency Injection特性，而Vue.js本身提供的API都比较简单、直观。
2、在性能上，AngularJS依赖对数据做脏检查，所以Watcher越多越慢。
```

## 25、什么是虚拟dom，优势是什么，存储在哪
```js
Virtual DOM 可以理解为一个简单的JS对象，并且最少包含标签名( tag)、属性(attrs)和子元素对象( children)三个属性。
```
优势：
```js
1、具备跨平台的优势-由于 Virtual DOM 是以 JavaScript 对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node 等。

2、提升渲染性能-Virtual DOM的优势不在于单次的操作，而是在大量、频繁的数据更新下，能够对视图进行合理、高效的更新。
为了实现高效的DOM操作，一套高效的虚拟DOM diff算法显得很有必要。通过找出本次DOM需要更新的节点来更新，其他的不更新。
3、是一个js对象，存储在内存中。
```

## 26、谈谈webpack的理解
```js
1、Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
2、Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
3、Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
4、Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
5、Plugin：扩展插件，在 Webpack 构建流程中的特定时机会广播出对应的事件，插件可以监听这些事件的发生，在特定时机做对应的事情。
6、Output：打包后文件输出的位置。
```

## 27、谈谈event loop
详细戳此👇
https://juejin.im/post/5c3d8956e51d4511dc72c200

## 28、介绍 HTTPS 握手过程
```js
1、客户端使用https的url访问web服务器,要求与服务器建立ssl连接
2、web服务器收到客户端请求后, 会将网站的证书(包含公钥)传送一份给客户端
3、客户端收到网站证书后会检查证书的颁发机构以及过期时间, 如果没有问题就随机产生一个秘钥
4、客户端利用公钥将会话秘钥加密, 并传送给服务端, 服务端利用自己的私钥解密出会话秘钥
5、之后服务器与客户端使用秘钥加密传输
```
参考出处：
https://muyiy.cn/question/network/44.html

## 29、如何防范CSRF攻击，XSS攻击

#### XSS攻击的防范
```js
1、HttpOnly 防止劫取 Cookie
2、输入检查-不要相信用户的所有输入
3、输出检查-存的时候转义或者编码
```
#### CSRF攻击的防范
```js
1、验证码
2、Referer Check
3、添加token验证
```
参考出处：
https://juejin.im/entry/5b4b56fd5188251b1a7b2ac1

## 30、使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果
```js
var arr = [3,15,8,29,102,22]
```
a、直接使用sort()方法，默认的排序方法会将数组元素转换为字符串，然后比较字符串中字符的UTF-16编码顺序来进行排序。
```js
var brr = arr.sort();
console.log(brr);//[102,15,22,29,3,8]
```
b、sort，可以接收一个函数，返回值是比较两个数的相对顺序的值
```js
var brr = arr.sort((a,b)=>a-b);
console.log(brr);//[3, 8, 15, 22, 29, 102]
```
- 返回值大于0 即a-b > 0 ， a 和 b 交换位置
- 返回值大于0 即a-b < 0 ， a 和 b 位置不变
- 返回值等于0 即a-b = 0 ， a 和 b 位置不变

## 31、箭头函数与普通函数的区别
```js
function data(a,b){
    return a-b
};

var data = (a,b)=>a-b;
```
a、箭头函数是匿名函数，不能作为构造函数，不能使用new
```js
let FunConstructor = () => {
    console.log('lll');
}

let fc = new FunConstructor();//报错
```
b、箭头函数不绑定arguments，取而代之用rest参数...解决
```js
function A(a){
    console.log(arguments);
}
A(1,2,3,4,5,8);  //  [1, 2, 3, 4, 5, 8, callee: ƒ, Symbol(Symbol.iterator): ƒ]

let B = (b)=>{
    console.log(arguments);
}

B(2,92,32,32);   // Uncaught ReferenceError：arguments is not defined

let C = (...c) => {
    console.log(c);
}
C(3,82,32,11323);  // [3, 82, 32, 11323]
```
c、箭头函数不绑定this，会捕获其所在的上下文的this值，作为自己的this值
```js
var obj = {
    a: 10,
    b: () => {
        console.log(this.a); // undefined
        console.log(this); // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
    },
    c: function() {
        console.log(this.a); // 10
        console.log(this); // {a: 10, b: ƒ, c: ƒ}
    }
}
obj.b(); 
obj.c();
```
d、箭头函数通过call()或apply()方法调用一个函数时，只传入了一个参数，对 this 并没有影响。
```js
let obj2 = {
    a: 10,
    b: function(n) {
        let f = (n) => n + this.a;
        return f(n);
    },
    c: function(n) {
        let f = (n) => n + this.a;
        let m = {
            a: 20
        };
        return f.call(m,n);
    }
};
console.log(obj2.b(1));  // 11
console.log(obj2.c(1)); // 11
```
e、箭头函数没有原型属性
```js
var a = ()=>{
    return 1;
}

function b(){
    return 2;
}

console.log(a.prototype);  // undefined
console.log(b.prototype);   // {constructor: ƒ}
```

## 32、简述react的生命周期，数据变化会触发哪些生命周期
旧版本react的生命周期：
- componentWillMount 在渲染前调用,在客户端也在服务端。

- componentDidMount : 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。 如果你想和其他JavaScript框架一起使用，可以在这个方法中调用setTimeout, setInterval或者发送AJAX请求等操作(防止异步操作阻塞UI)。

- componentWillReceiveProps 在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。

- shouldComponentUpdate 返回一个布尔值。在组件接收到新的props或者state时被调用。在初始化时或者使用forceUpdate时不被调用。
可以在你确认不需要更新组件时使用。

- componentWillUpdate在组件接收到新的props或者state但还没有render时被调用。在初始化时不会被调用。

- componentDidUpdate 在组件完成更新后立即调用。在初始化时不会被调用。

- componentWillUnmount在组件从 DOM 中移除之前立刻被调用。

数据变化会触发如下生命周期：
- componentWillReceiveProps()
- shouldComponentUpdate()
- componentWillUpdate()
- render()
- componentDidUpdate()