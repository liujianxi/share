## 前端面试题库
### 1、介绍下 BFC 及其应用
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
1、同一个 BFC 下外边距会发生折叠。

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
2、BFC 可以包含浮动的元素（清除浮动）
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
3、BFC 可以阻止元素被浮动元素覆盖

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