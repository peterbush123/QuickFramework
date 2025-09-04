import { sys } from "cc";

const data = {
    language: sys.Language.ENGLISH,
    data: {
        title: `BATTLE
CITY`,
        player: '1  PLAYER ',
        players: '2  PLAYERS',
        tips:"The current game does not support touch operation",
        stage : "Stage {0}",
        Instructions : `
Instructions:

Player 1:
wasd up left down right 
space shoot
        
Player 2:
↓↑←→
enter shoot
        
n Next level
p Prev level`,
        gameOver: "GAME OVER",
        change_enging : "该示例请切换2D物理引擎为内置",
    }
}

const TankBattleEN: Language.BundleData<typeof data.data> = data;
export { TankBattleEN }