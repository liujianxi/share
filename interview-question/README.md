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
![jenkins-init](./images/WX20191010-101541.png)

给p元素添加overflow: hidden
```html
p{
    overflow: hidden;
}
```
![jenkins-init](./images/WX20191010-102351.png)

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