declare namespace YMSDK {
    class ymrtc {
        static Instance: YMRTCClient;
    }
    enum StreamType {
        Normal = 0,
        RTMP = 1,
    }
    enum LogLevel {
        DISABLED = 0,
        FATAL = 1,
        ERROR = 10,
        WARNING = 20,
        INFO = 40,
        DEBUG = 50,
        VERBOSE = 60,
    }
    enum Mode {
        AUDIO_ONLY = 0,
        AV = 1,
    }
    enum RoomStatus {
        NOT_IN_ROOM = 0,
        JOINING_ROOM = 1,
        IN_ROOM = 2,
    }
    enum StatusCode {
        SUCCESS = 0,
        APPKEY_INVALID = -1,
        AUTH_INVALID = -2,
        ALREADY_IN_ROOM = -3,
        ON_JOINING_ROOM = -4,
        PARAM_ERROR = -5,
        NOT_JOIN_ROOM = -6,
        NOT_ALREADY_ON_PUB = -7,
        DEVICES_NOT_FOUND = -8,
        DEVICES_NOT_AVAILABLE = -9,
        LOCAL_SDP_ERROR = -10,
    }
    interface Listener {
        /**
         * 初始化成功
         * @param result 0 其他值表示有异常，可以重试init
         * @param msg 消息
         */
        onInitResult(result: number, msg: string): void;
        /**
         * 创建本地视频流
         * 特别注意
         * 本地视频流的video必须置为静音（muted)，否则会出现啸叫/回声等问题
         *  Mac / iPhone / iPad 需要用js设置muted属性
         * 此外autoplay也必须为激活状态
         * playsinline 可以保证在ios safari中不全屏播放
         * <video id="localVideo" muted autoplay playsinline></video>
         *
         * @param type 表示视频流类型, StreamType.Normal为Webrtc，StreamType.Normal为RTMP
         * @param stream 表示视频流
         */
        onLocalStreamAdd(type: StreamType, stream: any): void;
        /**
        * 创建对端视频流
        * 其中videoId 为 视频流id（ tinyid + "_" + 由随机字符串 )组成
        * 特别注意，每一个用户进来（不管是否是推流用户），都会触发这个回调
        *  Mac / iPhone / iPad 需要用js设置muted属性
        * 特别注意
        * 此外autoplay也必须为激活状态
        * <video id="remoteVideo" autoplay playsinline></video>
        *
        * @param type 表示视频流类型, StreamType.Normal为Webrtc，StreamType.Normal为RTMP
        * @param userid 登录的userid
        * @param stream 表示视频流(Webrtc时不为null)
        */
        onRemoteStreamAdd(userid: string, type: StreamType, stream: any): void;
        /**
        * 删除对端视频流
        * 其中videoId 为 视频流id（ tinyid + "_" + 由随机字符串 )组成
        *
        * @param userid 登录的userid
        */
        onRemoteStreamRemove(userid: string): void;
        /**
        * 由于在其他地方登录，该账号被踢下线
        */
        onKickout(): void;
        /**
        * websocket 断开
        */
        onWebSocketClose(): void;
        /**
         * 开始重连
         */
        onReconnect(): void;
        /**
        * 重连成功
        */
        onReconnected(): void;
    }
    class YMRTCClient {
        getSupportType(): string;
        isSupportFlash(): boolean;
        isSupportedWebRTC(): boolean;
        setLogLevel(level: LogLevel): void;
        setMode(mode: Mode): void;
        createFlashVideoElement(swfPath: String, callback: any): void;
        init(listener: Listener, config: {
            swfPath: string;
        }): void;
        joinRoom(options: any, callback: any): void;
        startPublish(options: any, callback: any): void;
        stopPublish(callback: any): void;
        leaveRoom(): void;
        createLocalVideoElement(id: string, stream: any): HTMLVideoElement;
        createRemoteVideoElement(id: string, stream: any): HTMLVideoElement;
        openCamera(): void;
        closeCamera(): void;
        openMic(): void;
        closeMic(): void;
        setRemoteVideoEnable(userid: string, enable: boolean, videoH5Ele?: HTMLVideoElement): void;
        setRemoteAudioEnable(userid: string, enable: boolean, videoH5Ele?: HTMLVideoElement): void;
        setPlaybackVolume(userid: string, volume: number, videoH5Ele: HTMLVideoElement): StatusCode;
        setAllUserPlaybackVolume(volume: number, videoH5Eles?: HTMLVideoElement[]): StatusCode;
        setFlashVideoScreenOptions(userid: string, options: any): void;
    }
}
declare class CryptoJS {
    static SHA1;
    static enc;
}