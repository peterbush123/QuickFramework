import { sys } from "cc";

const data = {
  language: sys.Language.CHINESE,
  data: {
    /**@description 框架部分 */
    bundles: {},//程序写入
    capture_save_failed: "保存图片失败",
    capture_success: "截图成功",
    capture_failed: "截图失败",
    capture_save_photo_album: "成功保存到设备相册",
    capture_save_local_success1: "成功保存在设备目录并加载成功: {0}",
    capture_save_local_success2: "成功保存在设备目录: {0}",
    warningReconnect: "{0}网络已断开，是否重新连接？",
    tryReconnect: "{0}网络:正在尝试第{1}次连接...",
    updateFaild: "更新{0}失败",
    checkingUpdate: "检测更新中...",
    alreadyRemoteVersion: "{0}已升级到最新",
    loadFailed: "{0}加载失败!!",
    restartApp: "{0}更新完成，需要重启游戏",
    downloadFailed: "下载文件失败，请重试!!!",
    loading: "正在加载...",
    /**@description 框架部分 */

    alert_title: "温馨提示",
    alert_confirm: "确 定",
    alert_cancel: "取 消",
    quitGame: "您确定要退出游戏？",
    loading_game_resources: "正在加载游戏资源...",
    loadingProgress: "加载资源中({0}%)...",
    /**@description 图件多语言配置 */
    pic_background: "common/images/background",
    // pic_background : "common/images/com_bg_start2",
    richtext: "<color=#00ff00>富</c><color=#0fffff>文本</color>",
    pic_atlas: ["common/images/lobby_texture"],
    pic_key: "update_status_hot",
    pic_remote: "https://fanyi-cdn.cdn.bcebos.com/static/translation/img/header/logo_e835568.png",
    // pic_remote : "https://www.baidu.com/img/flexible/logo/pc/index_gray.png",
  }
}

const LangZH: Language.Data<typeof data.data> = data;
export { LangZH }