/**@description 语言包具体的代码实现 */
import { injectLanguageData, LanguageDelegate } from "db://quick/core/language/LanguageDelegate";
import { Macro } from "db://quick/defines/Macros";
import { HallEN } from "./HallLanguageEN";
import { HallZH } from "./HallLanguageZH";

@injectLanguageData
export class HallLanguage extends LanguageDelegate{
    init(): void {
        this.add(HallEN);
        this.add(HallZH);
    }
    bundle = Macro.BUNDLE_HALL;
}