import { GameData } from "db://quick/data/GameData";
import EliminateGameModel from "../model/EliminateGameModel";
import { DEBUG } from "cc/env";

export class EliminateData extends GameData {
    static module = "eliminate";
    gameModel: EliminateGameModel = null!;

    initGameModel() {
        this.gameModel = new EliminateGameModel();
        this.gameModel.init();
    }

    get debugConfig(): string[] {
        if ( DEBUG ){
            return ["测试"]
        }
        return [];
    }
}
