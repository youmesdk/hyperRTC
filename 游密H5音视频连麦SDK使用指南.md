# 游密H5音视频连麦SDK使用指南

## 适用范围
本文档适用于游密H5音视频连麦在开发环境下的接入。

## SDK目录概述
文件列表 |用途
-------|------
ymrtc.js|H5音视频库
index.html|纯音频h5 Demo
RtmpStreamer.swf|Flash支持库
crypto-js.js|加密库，仅做Demo演示根据userid获取token使用，接入时应该调用接口getUserToken获取token

## 支持平台
操作系统平台 |浏览器/webview|版本要求|备注
-------|------|------|------
iOS|Safari(Only)|11.1.2|微信浏览器不支持
Android|4.4 (KitKat) | |
Mac|不限| |
Windows(PC)|不限| |

## 体验Demo

https://wxtest3.youme.im/index.html


## 时序图

https://www.youme.im/doc/images/h5_video_sdk_order.jpg


## 接口列表

### getSupportType
**获取当前浏览器支持的通话方式，** 可用于检查当前环境是否支持实时音视频通话。

``` javascript
YMSDK.ymrtc.Instance.getSupportType()
/*
 * params:
 *   无。
 * return:
 *   string 类型，可能的值：
 *   'webrtc': 支持webrtc，无需依赖任何额外插件
 *   'flash' : 仅支持flash，依赖浏览器的flash插件
 *   null    : 不支持实时通话(既不支持webrtc，也不支持flash)
 */
```

### setMode
**设置模式**

``` javascript
YMSDK.ymrtc.Instance.setMode(mode)
/*
 * params:
 *   mode  - Number, 模式
 * return:
 *   (无)
 */
```
**mode**

模式 | 值
-------|------
AUDIO_ONLY|0
AV|1

### init
**初始化**
``` javascript
YMSDK.ymrtc.Instance.init(listener, options)
/*
 * params:
 *   listener  - Object
 *   options    - Object, 可选的请求参数，如不需要Flash的支持可传null
 * return:
 *   (无)
 */
```
**listener**

参数 | 类型	 | 描述
-------|------|------
onInitResult|function|初始化成功的回调
onLocalStreamAdd|function|新增本地音视频流
onRemoteStreamAdd|function|新增远端音视频流
onRemoteStreamRemove|function|远端音视频流断开
onKickout|function|被踢下线
onWebSocketClose|function|websocket断开
onReconnect|function|发生网络重连
onReconnected|function|重连成功，需要手动重新启动自己的推流

**listener.onInitResult( result, message )**

>初始化成功
>
>``` javascript
>function onInitResult( result, message ) {
>	/*
> 	 * params:
>	 *   result		- Number, 0:Success;其它值参见StatusCode
>	 *   message   	- String, 消息
>	 * return:
>	 *   (无)
>	 */
> }
 > ```

 **listener.onLocalStreamAdd( type, stream )**

>新增本地音视频流
>
>``` javascript
>function onLocalStreamAdd( type, stream ) {
>	/*
> 	 * params:
>	 *   type		- Number, 0:WebRTC流;1:Flash流
>	 *   stream   	- any, type=0时非null，type=1时为null
>	 * return:
>	 *   (无)
>	 */
> }
> ```
>
>	处理stream:
> 
>``` javascript
>    function onLocalStreamAdd(type, stream) {
>      /** 如果是webrtc流，使用video标签播放，如果flash的不需要创建Video标签，会自动播放 */
>      if (type === 0) {
>        var localvideo = rtc.createLocalVideoElement('localvideo', stream);
>        document.body.appendChild(localvideo);
>      } else {
>
>      }
>```

 **listener.onRemoteStreamAdd( userid, type, stream )**

>新增远端音视频流
>
>``` javascript
>function onRemoteStreamAdd( userid, type, stream ) {
>	/*
> 	 * params:
>	 *   userid		- String, 用户id
>	 *   type		- Number, 0:WebRTC流;1:Flash流
>	 *   stream		- any, type=0时非null，type=1时为null
>	 * return:
>	 *   (无)
>	 */
> }
> ```
>
>	处理stream:
> 
>``` javascript
>    function onLocalStreamAdd(type, stream) {
>      /** 如果是webrtc流，使用video标签播放, 如果是flash的不需要创建Video标签，会自动播放 */
>      if (type === 0) {
>        var video = rtc.createRemoteVideoElement('v_' + userid, stream);
>        document.body.appendChild(video);
>      } else {
>
>      }
>```

 **listener.onRemoteStreamRemove( userid )**

>远端音视频流断开 ，手动该回调可以移除对应 userid 的 H5 Video 标签。
>
>``` javascript
>function onRemoteStreamRemove( userid ) {
>	/*
> 	 * params:
>	 *   userid		- String, 用户id
>	 * return:
>	 *   (无)
>	 */
> }
> ```

 **listener.onKickout()**

>被踢下线
>
>``` javascript
>function onKickout() {
>	/*
> 	 * params:
>	 *   (无)
>	 * return:
>	 *   (无)
>	 */
> }
> ```

 **listener.onWebSocketClose()**

>websocket断开
>
>``` javascript
>function onWebSocketClose() {
>	/*
> 	 * params:
>	 *   (无)
>	 * return:
>	 *   (无)
>	 */
> }
> ```

 **listener.onReconnect()**

>发生网络重连
>
>``` javascript
>function onReconnect() {
>	/*
> 	 * params:
>	 *   (无)
>	 * return:
>	 *   (无)
>	 */
> }
> ```

 **listener.onReconnected()**

>重连成功，需要手动重新启动自己的推流
>
>``` javascript
>function onReconnected() {
>	/*
> 	 * params:
>	 *   (无)
>	 * return:
>	 *   (无)
>	 */
> }
> ```

**options**

参数 | 类型	 | 描述
-------|------|------
swfPath|string|swf文件(Flash功能支持)的路径


### isSupportedWebRTC
**是否支持WebRTC**

``` javascript
YMSDK.ymrtc.Instance. isSupportedWebRTC();
/*
 * params:
 * return:
 *   true:支持;false:不支持
 */
```


### joinRoom
**创建或加入房间**
不允许重复加入，结果在callback中回调

``` javascript
YMSDK.ymrtc.Instance.joinRoom(options, callback);
/*
 * params:
 *   options  	- Object, 请求参数
 *   callback	- function, 回调
 * return:
 *   (无)
 */
```

**options**

参数 | 描述
-------|------
appkey|应用的唯一标识appkey，可以后台申请，同时可获得apikey
token|由appkey、apikey、userid查询后台获取到的token
roomid|房间号
userid|用户id

**callback**

``` javascript
function (result, msg) {
	if (result !== 0) {
		console.log("进频道失败, res:", result, " msg:", msg);
	} else {
		console.log("进频道成功");
}
```

### startPublish
**开始推流**

``` javascript
YMSDK.ymrtc.Instance.startPublish(options, callback);
/*
 * params:
 *   options  	- Object, 请求参数
 *   callback	- function, 回调
 * return:
 *   (无)
 */
```

**options**

设定WebRTC的mediaConstraints参数，详情见
[我是链接名](http://www.rtcmulticonnection.org/docs/mediaConstraints/)


参数 | 描述
-------|------
audio|音频参数
video|视频参数

audio:

设为true或false以开关麦克风，或者设置回声消除等参数

video:

设为true或false以开关摄像头，或者传递宽高帧率等

**callback**

``` javascript
function (result) {
	if (result !== 0) {
		console.log("推流失败, res:", result);
	} else {
		console.log("推流成功");
	}
}
```

### createLocalVideoElement
**创建本地音视频流H5元素**
注意仅在支持WebRTC时调用，不支持WebRTC时走Flash，不需要创建

``` javascript
YMSDK.ymrtc.Instance.createLocalVideoElement(id,stream);
/*
 * params:
 *   id  	- H5标签id
 *   stream	- any, 流
 * return:
 *   (无)
 */
```

### createRemoteVideoElement
**创建本地音视频流H5元素**
注意仅在支持WebRTC时调用，不支持WebRTC时走Flash，不需要创建

``` javascript
YMSDK.ymrtc.Instance.createRemoteVideoElement(id,stream);
/*
 * params:
 *   id  	- H5标签id
 *   stream	- any, 流
 * return:
 *   (无)
 */
```

### closeMic()
**关闭麦克风**

需要进入房间后调用
``` javascript
YMSDK.ymrtc.Instance.closeMic();
/*
 * params:
 *   (无)
 * return:
 *   (无)
 */
```

### openMic()
**打开麦克风**

需要进入房间后调用

``` javascript
YMSDK.ymrtc.Instance.openMic();
/*
 * params:
 *   (无)
 * return:
 *   (无)
 */
```

### closeCamera()
**关闭摄像头**

需要进入房间后调用

``` javascript
YMSDK.ymrtc.Instance.closeCamera();
/*
 * params:
 *   (无)
 * return:
 *   (无)
 */
```

### openCamera()
**打开摄像头**

需要进入房间后调用

``` javascript
YMSDK.ymrtc.Instance.openCamera();
/*
 * params:
 *   (无)
 * return:
 *   (无)
 */
```

### setRemoteAudioEnable(userid, enable, videoH5Ele)
**设置是否收听远端用户音频**

需要进入房间后调用

``` javascript
YMSDK.ymrtc.Instance.setRemoteAudioEnable(userid, enable, videoH5Ele);
/*
 * params:
 *   userid  	- String, 用户id
 *   enable		- Boolean, 是否开启
 *   videoH5Ele		- HTMLVideoElement，H5标签，Flash用户传null
 * return:
 *   (无)
 */
```

### setRemoteVideoEnable(userid, enable, videoH5Ele)
**设置是否收看远端用户音视频**

需要进入房间后调用

``` javascript
YMSDK.ymrtc.Instance.setRemoteVideoEnable(userid, enable, videoH5Ele);
/*
 * params:
 *   userid  	- String, 用户id
 *   enable		- Boolean, 是否开启
 *   videoH5Ele		- HTMLVideoElement，H5标签，Flash用户传null
 * return:
 *   (无)
 */
```

### stopPublish(callback)
**停止推流**

``` javascript
YMSDK.ymrtc.Instance.stopPublish(callback);
/*
 * params:
 *   callback	- Boolean, 回调
 * return:
 *   (无)
 */
```

**callback**

``` javascript
function (result) {
	if (result !== 0) {
		console.log("停止推流失败, res:", result);
	} else {
		console.log("停止推流成功");
}
```


### leaveRoom()
**离开房间**

``` javascript
YMSDK.ymrtc.Instance.leaveRoom();
/*
 * params:
 *   (无)
 * return:
 *   (无)
 */
```

### setLogLevel
**设置日志等级**

``` javascript
YMSDK.ymrtc.Instance.setLogLevel(level)
/*
 * params:
 *   level  - Number, 日志等级
 * return:
 *   (无)
 */
```
**level**

等级 | 值
-------|------
DISABLED|0
FATAL|1
ERROR|10
WARNING|20
INFO|40
DEBUG|50
VERBOSE|60

## 状态码

### Mode类型定义

枚举常量 |值| 含义
-------|------|------
AUDIO_ONLY  |0|纯音频模式
AV          | 1|音视频模式

### StatusCode类型定义

枚举常量 |值| 含义
-------|------|------
SUCCESS  			| 0|成功
APPKEY_INVALID		|-1|已经在房间
AUTH_INVALID 		|-2|已经在房间
ALREADY_IN_ROOM 	|-3|已经在房间
ON_JOINING_ROOM  	|-4|正在加入房间
PARAM_ERROR         |-5|参数错误
NOT_JOIN_ROOM  		|-6|还未加入房间
NOT_ALREADY_ON_PUB  |-7|还未推流
DEVICES_NOT_FOUND	|-8|已经在房间
DEVICES_NOT_AVAILABLE|-9|已经在房间
LOCAL_SDP_ERROR  	|-10|本地SDK错误