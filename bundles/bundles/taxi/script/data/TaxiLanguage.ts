import { sys } from "cc";
import { injectLanguageData, LanguageDelegate } from "db://quick/core/language/LanguageDelegate";
import { TaxiData } from "./TaxiData";

const ZH = {
    language: sys.Language.CHINESE,
    data : {
        tips : [
            '请快一点，我要起飞机',
            '最美的一天不是下雨天',
        ],
        loadingRes : "正在加载游戏资源...",
        loadingMap : "正在加载游戏地图..."
    }
}

const EN = {
    language: sys.Language.ENGLISH,
    data : {
        tips : [
            'Please hurry up.\n I have a plane to catch',
            'The most beautiful day \nis not the rainy day',
        ],
        loadingRes : "正在加载游戏资源...",
        loadingMap : "正在加载游戏地图..."
    }
}
export const TaxiLan = ZH;

@injectLanguageData
export class TaxiLanguage extends LanguageDelegate {
    init(): void {
        this.add(ZH);
        this.add(EN);
    }
    bundle = TaxiData.module
}