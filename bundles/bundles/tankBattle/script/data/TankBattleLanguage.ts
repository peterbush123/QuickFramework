/**@description 语言包具体的代码实现 */

import { injectLanguageData, LanguageDelegate } from "db://quick/core/language/LanguageDelegate";
import { TankBattleGameData } from "./TankBattleGameData";
import { TankBattleEN } from "./TankBattleLanguageEN";
import { TankBattleZH } from "./TankBattleLanguageZH";

@injectLanguageData
export class TankBattleLanguage extends LanguageDelegate {
    init(): void {
        this.add(TankBattleEN);
        this.add(TankBattleZH);
    }
    bundle = TankBattleGameData.module
}