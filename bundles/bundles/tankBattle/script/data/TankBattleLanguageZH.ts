import { sys } from "cc";

const data = {
    language: sys.Language.CHINESE,
    data: {
        title: `坦克大战`,
        player: '单人模式 ',
        players: '双人模式',
        tips : "当前游戏不支持触摸操作",
        stage : "第 {0} 关",
        Instructions : `
操作说明：

玩家1：
wsad 上下左右 
空格键 射击

玩家2：
方向键
回车键 射击

n 下一关
p 上一关`,
    gameOver: "游戏结束",
        change_enging : "该示例请切换2D物理引擎为内置",
    }
}

const TankBattleZH: Language.BundleData<typeof data.data> = data;
export { TankBattleZH }