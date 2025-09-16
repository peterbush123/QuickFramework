/** 是否打开DEBUG */
declare var CC_DEBUG: boolean;

interface Window {
    /** 获取当前网页参数数据 */
    GetHtmlQueryVariable(variable: string): string;

    /** 显示Html加载条 */
    ShowLoading(): void;
    /** 隐藏Html加载条 */
    HideLoading(): void;


}
