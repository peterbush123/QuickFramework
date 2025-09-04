/**@description 语言包具体的代码实现 */


import { LangEN } from "./LangEN";
import { LangZH } from "./LangZH";
import { LanguageDelegate } from "db://quick/core/language/LanguageDelegate";
import { Macro } from "db://quick/defines/Macros";

export class Lang extends LanguageDelegate{
    bundle = Macro.BUNDLE_RESOURCES;
    init(): void {
        /**@description 游戏入口写入语言包 */
        App.stageData.entrys.forEach(v=>{
            (<any>LangEN.data.bundles)[v.bundle] = v.name.EN;
            (<any>LangZH.data.bundles)[v.bundle] = v.name.CN;
        })
        this.add(LangEN);
        this.add(LangZH);
    }
}