# 游密H5 RTC SDK

[游密官网](https://www.youme.im/)


[演示地址：https://wxtest3.youme.im/](https://wxtest3.youme.im/)

## SDK文件说明

**必须的文件**
- `out/ymrtc.js` SDK库文件，最小依赖仅需引入文件即可

**可选文件**
- `out/RtmpStreamer.swf` 如果要兼容flash插件环境（比如IE浏览器），需要在初始化时传入该文件的URL

**Demo**
- `index.html` 是音频Demo页面，演示语音通话的效果，放到 https 服务器上再访问即可
- `index_av.html` 是视频Demo页面，演示视频通话的效果，放到 https 服务器上再访问即可
- `crypto-js.js` 演示用户token计算时用到的加密库

## DEMO 运行说明
 由于浏览器的安全显示，测试时需要把 Demo 页面放到 https 域名下运行，本地测试可以使用如下命令快速搭建一个https环境：
 `以下示例代码依赖NodeJs，请先安装NodeJs后再运行如下命令`

``` shell
npm install -g live-server 
npm install -g live-server-https
git clone https://github.com/youmesdk/hyperRTC
cd hyperRTC
live-server --https=/usr/local/lib/node_modules/live-server-https

```
## 技术支持交流群
QQ群：`329145286`

