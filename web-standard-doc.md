**前端开发规范**
----------
*前端开发协作时的一些规范*
## css部分
- :每个声明后包含一个空格
- 将声明块的右括号放在新行上
- 分组选择器时，将单个选择器保持为一行
- 用分号结束所有声明
- 小写所有十六进制值，例如#fff
- 在可用的地方使用简写十六进制值，例如，#fff而不是#ffffff
- 避免指定零值的单位，例如，margin: 0;而不是margin: 0px;
- 引用选择器中的属性值，例如input[type="text"]

```css
/* Bad example */
.container{
    border-radius:50%;
    color: #FFFFFF;
    margin: 0px;
    border:2px solid white; }
.one, .red, .no_item, .input[type="text"] {
    // ...
}
#loading-box {
    // ...
}
/* Good example */
.container {
    border-radius: 50%;
    color: #fff;
    margin: 0;
    border: 2px solid white;
}

.one,
.red,
.no-item,
.input[type="text"]{
    // ...
}
.loading-box {
    // ...
}
```
- 相关属性声明应按顺序组合在一起
```css
.declaration-order {
  /* Positioning 定位 */
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;

  /* Box-model 盒子模型 */
  display: block;
  float: right;
  width: 100px;
  height: 100px;

  /* Typography 排版 */
  font: normal 13px "Helvetica Neue", sans-serif;
  line-height: 1.5;
  color: #333;
  text-align: center;

  /* Visual 视觉效果 */
  background-color: #f5f5f5;
  border: 1px solid #e5e5e5;
  border-radius: 3px;

  /* Misc 其他 */
  opacity: 1;
}
```
- 属性申明
```css
/* Bad example */
.test {
    display: block; height: 100px
}

/* Good example */
.test {
    display: block;
    height: 100px;
}
```
- 谨慎使用可缩写的属性
```css
/* Bad example */
.element {
    margin: 0 0 10px;
    background: red;
    background: url("image.jpg");
    border-radius: 3px 3px 0 0;
    padding: 0;
}

/* Good example */
.element {
    margin-bottom: 10px;
    background-color: red;
    background-image: url("image.jpg");
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    padding: 0;
}
```
- class类名命名规范，使用破折号，不使用驼峰，下划线命名
- class类名用有意义的名字
- class类名避免使用id，类名选择器不宜过长(3个以内)
```css
/* Bad example */
.t { ... }
.redBox { ... }
.tweet_header { ... }
.page-container #stream .stream-item .tweet .tweet-header {...}

/* Good example */
.table {...}
.red-box { ... }
.tweet-header { ... }
.page-container .tweet .tweet-header {...}
```
- 同一组件的样式写在一起
```css
/**************** Component section start ****************/

.element { ... }

/**************** Component section end ****************/
```
- sass或less时,嵌套不能太深

```css
.page-container {
    .content {
        .profile {
            // STOP!
        }
    }
}
```