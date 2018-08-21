**需求：页面滑动，滑到中间处有个组件需要固定在顶部，没滑动时又恢复原位**
----------
## 先弄一个wxml文件，滑动到目标处就固定在顶部 ##

```
<view class="news static-news"><text>今日新闻列表</text></view>
<view class="news fix-news" wx:if="{{fixTop<scrollTop}}"><text>今日新闻列表</text></view>
```
## wxss里面 ##

```
.news.fix-news{
    position: fixed;
    top:0;
    left: 0;
}
```
## js里面 ##

1.使用scroll-view组件,wxml里面固定目标处包在scroll-view里面

```
Page({
    data:{
        fixTop:'',//区域离顶部的高度
        scrollTop:0,//滑动条离顶部的距离
    },
    onShow:function(){
        let self=this;
        wx.createSelectorQuery().select('.static-news').boundingClientRect(function(rect){
           self.setData({
               fixTop:rect.top,
           })
        }).exec()
    },
    scroll:function(e){
        let self=this;
        let top=e.detail.scrollTop;
        self.setData({
            scrollTop:top
        });
    }
})
```
2.不使用scroll-view，利用页面的onPageScroll方法

```
Page({
    data:{
        fixTop:'',//区域离顶部的高度
        scrollTop:0,//滑动条离顶部的距离
    },
    onShow:function(){
        let self=this;
        wx.createSelectorQuery().select('.static-news').boundingClientRect(function(rect){
           self.setData({
               fixTop:rect.top,
           })
        }).exec()
    },
    onPageScroll:function(res){
        let self=this;
        let top=res.scrollTop;
        self.setData({
            scrollTop:top
        });
    }
})
```
总结：ios手机滑动时比较流畅，安卓手机滑的慢点的话完全ok，滑的快点会有些延迟，暂时没找到啥好方法，如有好的实现方法，望各位赐教。
sroll-view实现部分在pages/sroll-view里面,普通view实现部分在pages/fixdemo里面。
