import { sys } from "cc";

const data = {

    language: sys.Language.ENGLISH,
    data: {

        /**@description 框架部分 */
        bundles: {},//程序写入
        capture_save_failed: "Failed to save picture",
        capture_success: "Successful screenshot",
        capture_failed: "Screenshot failed",
        capture_save_photo_album: "Successfully saved to device album",
        capture_save_local_success1: "Successfully saved in the device directory {0} and loaded successfully",
        capture_save_local_success2: "Successfully saved in the device directory {0}",
        warningReconnect: "{0} network has been disconnected. Do you want to reconnect?",
        tryReconnect: "{0}Trying to connect for the {1} time...",
        updateFaild: "Update {0} Faild",
        checkingUpdate: "Checking update...",
        alreadyRemoteVersion: "{0}已升级到最新",
        loadFailed: "{0}加载失败!!",
        restartApp: "{0}更新完成，需要重启游戏",
        downloadFailed: "下载文件失败，请重试!!!",
        loading: "正在加载...",
        /**@description 框架部分 */

        alert_title: "Tips",
        alert_confirm: "Confirm",
        alert_cancel: "Cancel",
        quitGame: "您确定要退出游戏？",
        loading_game_resources: "正在加载游戏资源...",
        loadingProgress: "加载资源中({0}%)...",
        /**@description 图件多语言配置 */
        pic_background: "common/images/com_bg_start2",
        richtext: "<color=#00ff00>Rich</c><color=#0fffff>Text</color>",
        pic_atlas: ["common/images/lobby_texture"],
        pic_key: "update_status_new",
        pic_remote: "https://www.baidu.com/img/flexible/logo/pc/index_gray.png",
    }
}

const LangEN: Language.Data<typeof data.data> = data;
export { LangEN }