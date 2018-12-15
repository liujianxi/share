# 小程序云开发

创建方法：
- 在开发者工具中，新建项目选择一个空目录，填入 AppID（使用云开发能力必须填写 AppID），勾选创建 “云开发 QuickStart 项目”，点击创建
- 在已有项目中接入云开发：
在 app.json中增加字段 "cloud": true;
在项目的app.js中进行wx.cloud.init。
```
onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        'env: 'test-x1dzi',//云开发控制台中的环境ID
        traceUser: true,
      })
    }

    this.globalData = {}
  }
```

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

