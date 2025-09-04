
import { _decorator, Node, find, Animation, Label, Sprite, instantiate, Button, Vec3, UITransform, ParticleSystem2D, sp, SpriteFrame, AnimationClip, Layers, Widget, size, RenderTexture, dragonBones, v3, Asset } from "cc";
import { ButtonSpriteType } from "db://quick/defines/Enums";
import GameView from "db://quick/core/ui/GameView";
import { Macro } from "db://quick/defines/Macros";
import { inject } from "db://quick/defines/Decorators";
import { UIDropdownList } from "../../../../../quick/core/ui/UIDropdownList";

const { ccclass, property } = _decorator;

interface DropdownListData {
    title: string,
}

@ccclass("LoadTestView")
export default class LoadTestView extends GameView {

    public static getPrefabUrl() {
        return "prefabs/LoadTestView";
    }

    @inject("loadButton", Node)
    private loadButton: Node = null!;
    @inject("TableView", Node)
    private tableView: Node = null!;
    @inject("content", Node)
    private content: Node = null!;
    onLoad() {
        super.onLoad();
        this.onN(find("goback", this.node)!, Node.EventType.TOUCH_END, this.onGoback);

        let op = find("ScrollView/view/content", this.node) as Node;
        this.onN(find("loadFont", op)!, Node.EventType.TOUCH_END, this.onLoadFont);

        this.onN(find("loadImg", op)!, Node.EventType.TOUCH_END, this.onLoadImg);
        this.onN(find("loadImgAtlas", op)!, Node.EventType.TOUCH_END, this.onLoadImgAtlas);

        this.onN(find("loadNetImg", op)!, Node.EventType.TOUCH_END, this.onLoadNetImg);

        this.onN(find("loadButton", op)!, Node.EventType.TOUCH_END, this.onLoadButton);

        this.onN(find("loadParticle", op)!, Node.EventType.TOUCH_END, this.onLoadParticle);

        this.onN(find("loadSpine", op)!, Node.EventType.TOUCH_END, this.onLoadSpine);
        this.onN(find("loadNetSpine", op)!, Node.EventType.TOUCH_END, this.onLoadNetSpine);

        this.onN(find("loadDir", op)!, Node.EventType.TOUCH_END, this.onLoadDir);
        this.onN(find("loadRes", op)!, Node.EventType.TOUCH_END, this.onLoadRes);
        this.onN(find("loadPrefab", op)!, Node.EventType.TOUCH_END, this.onLoadPrefab);

        this.onN(find("loadDragon", op)!, Node.EventType.TOUCH_END, this.onLoadDragon);

        this.onN(find("tableView", op)!, Node.EventType.TOUCH_END, this.onTableView);
        this.onN(find("UIDropdownList", op)!, Node.EventType.TOUCH_END, this.onUIDropdownList);
        this.tableView.removeFromParent();
    }

    private onGoback() {
        this.enterBundle(Macro.BUNDLE_HALL);
        // this.backBundle();
    }

    private onLoadFont() {
        if (!this.content) return;
        if (this.content.getChildByName("font")) {
            return;
        }
        this.content.removeAllChildren();

        let node = new Node();
        node.name = "font";
        node.layer = Layers.Enum.UI_2D;
        this.content.addChild(node);
        let label = node.addComponent(Label);
        label.string = "";
        label.loadFont({
            //不提前加载目录方式
            font: "font/number",

            //提前加载目录资源方式
            // font : "number",
            // dir : "font",

            view: this,
            complete: (font) => {
                if (font) {
                    label.string = "+12345678.9万";
                }
            }, bundle: this.bundle
        });
    }

    private onLoadImg() {
        let name = "testImg";
        if (!this.content) return;
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();
        let node = new Node();
        node.layer = Layers.Enum.UI_2D;
        this.content.addChild(node);
        node.name = name;
        let sp = node.addComponent(Sprite);

        sp.loadImage({
            //加载单个图片
            url: "texture/timg",
            view: this
        });
    }

    private onLoadImgAtlas() {
        let name = "onLoadImgAtlas";
        if (!this.content) return;
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();
        let node = new Node();
        node.layer = Layers.Enum.UI_2D;
        this.content.addChild(node);
        node.name = name;
        let sp = node.addComponent(Sprite);

        sp.loadImage({
            //加载图集
            url: { urls: ["common/images/lobby_texture"], key: "update_status_hot" },
            bundle: Macro.BUNDLE_RESOURCES,
            view: this
        });
    }

    private onLoadNetImg() {
        let name = "netimg";
        if (!this.content) return;
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();
        let node = new Node();
        node.layer = Layers.Enum.UI_2D;
        this.content.addChild(node);
        node.name = name;
        let sp = node.addComponent(Sprite);
        sp.loadRemoteImage({
            // url : "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLeJcxcteU8DF5WwIicmKClkL6XQXY4uwAWBrBjaG5M171uqc3vibibWIdP4wp9ouibt1LyDp1zz4tBjA/132",
            url: "https://p26.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_aa5859fa41538782706313a7294ad45c.jpeg?from=3782654143",
            // url:"https://www.baidu.com/img/flexible/logo/pc/index_gray.png",
            view: this,
            defaultBundle: this.bundle,
            defaultSpriteFrame: "texture/timg"
        });
    }

    private onLoadButton() {
        let name = "button";
        if (!this.content) return;
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();
        let button = instantiate(this.loadButton);
        button.getComponent(Widget)?.destroy();
        this.content.addChild(button);
        button.name = name;
        button.setPosition(new Vec3());
        button.getComponent(UITransform)?.setContentSize(size(200, 60));
        let btn = button.getComponent(Button) as Button;
        button.active = true;
        btn.loadButton({
            //动态加载单图
            normalSprite: "texture/btn_b",
            pressedSprite: "texture/btn_y",
            hoverSprite: "texture/btnbg",
            bundle: Macro.BUNDLE_HALL,

            //加载图集
            // normalSprite:{urls : ["common/images/lobby_texture"] , key : "update_status_hot"},
            // pressedSprite:{urls : ["common/images/lobby_texture"] , key : "update_status_fav"},
            // hoverSprite:{urls : ["common/images/lobby_texture"] , key : "update_status_new"},
            // bundle : Macro.BUNDLE_RESOURCES,

            //提前以目录形式加载资源
            // normalSprite: "btn_b",
            // pressedSprite: "btn_y",
            // hoverSprite: "btnbg",
            // bundle: Macro.BUNDLE_HALL,
            // dir : "texture",

            // normalSprite:{urls : ["lobby_texture"] , key : "update_status_hot"},
            // pressedSprite:{urls : ["lobby_texture"] , key : "update_status_fav"},
            // hoverSprite:{urls : ["lobby_texture"] , key : "update_status_new"},
            // bundle : Macro.BUNDLE_RESOURCES,
            // dir : "common/images",


            view: this,
            complete: (type, spriteFrame) => {
                if (type == ButtonSpriteType.Norml && spriteFrame) {
                    let buttonTrans = button.getComponent(UITransform) as UITransform;
                    let targetTrans = btn.target.getComponent(UITransform) as UITransform;
                    Log.d(spriteFrame.originalSize);
                    buttonTrans.contentSize = spriteFrame.originalSize;
                    buttonTrans.setContentSize(spriteFrame.originalSize);
                    targetTrans.contentSize = spriteFrame.originalSize;
                    targetTrans.setContentSize(spriteFrame.originalSize);
                    Log.d(button.getComponent(UITransform))
                }
            },
        })
    }

    private onLoadParticle() {
        let name = "onLoadParticle";
        if (!this.content) return;
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();
        let node = new Node();
        node.layer = Layers.Enum.UI_2D;
        node.name = name;
        this.content.addChild(node);
        let sys = node.addComponent(ParticleSystem2D);
        sys.loadFile({
            //不以加载资源目录形式加载
            url: "particle/test",

            //以加载资源目录方式加载
            //  url : "test",
            //  dir : "particle",
            view: this,
        })
    }

    private onLoadSpine() {
        let name = "onLoadSpine";
        if (!this.content) return;
        if (this.content.getChildByName(name)) {
            return;
        }

        this.content.removeAllChildren();
        let node = new Node();
        node.layer = Layers.Enum.UI_2D;
        node.name = name;
        this.content.addChild(node);
        let spine = node.addComponent(sp.Skeleton);
        spine.loadSkeleton({
            view: this,
            complete: () => {
                spine.setAnimation(0, "walk", true);
            },

            //不提前以目录形式加载
            url: "spine/raptor",

            //提示以目录形式加载资源
            // url : "raptor",
            // dir : "spine",
        });
        let trans = this.content.getComponent(UITransform) as UITransform;
        node.setPosition(new Vec3(0, -trans.height / 2));
        node.setScale(new Vec3(0.5, 0.5));
    }

    private onLoadNetSpine() {
        let name = "onLoadNetSpine";
        if (!this.content) return;
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();
        let node = new Node();
        node.layer = Layers.Enum.UI_2D;
        node.name = name;
        this.content.addChild(node);
        let spine = node.addComponent(sp.Skeleton);
        spine.loadRemoteSkeleton({
            view: this,
            path: "http://192.168.2.241",
            name: "raptor",
            complete: (data: sp.SkeletonData) => {
                if (data) {
                    spine.setAnimation(0, "walk", true);
                }
            }
        });
        let trans = this.content.getComponent(UITransform) as UITransform;
        node.setPosition(new Vec3(0, -trans.height / 2));
        node.setScale(new Vec3(0.7, 0.7));
    }

    private async onLoadDir() {
        let name = "onLoadDir";
        if (!this.content) return;
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();
        let node = new Node();
        node.layer = Layers.Enum.UI_2D;
        node.name = name;
        this.content.addChild(node);
        //添加显示渲染节点
        let sp = node.addComponent(Sprite);
        //添加动画
        let ani = node.addComponent(Animation);

        let makeAnimation = (data: Asset | Asset[] | null) => {
            if (data) {
                let arr: SpriteFrame[] = (<SpriteFrame[]>data);
                let clip = AnimationClip.createWithSpriteFrames(arr, arr.length) as AnimationClip;
                clip.name = "run";
                clip.wrapMode = AnimationClip.WrapMode.Loop;
                ani.createState(clip, "run");
                // ani.addClip(clip);
                ani.play("run");
            }
        }

        loadDirRes({
            url: "texture/sheep",
            type: SpriteFrame,
            view: this,
            onComplete: (data) => {
                makeAnimation(data.data);
            }
        })
    }

    private onLoadRes() {
        let name = "onLoadRes";
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();
        let node = new Node();
        node.layer = Layers.Enum.UI_2D;
        node.name = name;
        this.content.addChild(node);
        //添加显示渲染节点
        let sp = node.addComponent(Sprite);
        loadRes<SpriteFrame>({
            url: "texture/timg",
            type: SpriteFrame,
            view: this,
            onComplete: (data) => {
                sp.spriteFrame = data;
            }
        })
    }

    private onLoadPrefab() {
        let name = "onLoadPrefab";
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();

        createPrefab({
            url: "prefabs/Test",
            view: this,
            complete: (node) => {
                this.content.addChild(node);
                node.name = name;
            }
        })
    }

    private onLoadDragon() {
        let name = "onLoadDragon";
        if (!this.content) return;
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();
        let node = new Node();
        node.layer = Layers.Enum.UI_2D;
        node.name = name;
        this.content.addChild(node);
        //添加动画
        let ani = node.addComponent(dragonBones.ArmatureDisplay);
        ani.loadDisplay({
            // 未提前加载目录资源方式
            assetUrl: "dragonBones/NewDragonTest",
            atlasUrl: "dragonBones/texture",

            view: this,
            complete: (asset, atlas) => {
                if (asset && atlas) {
                    ani.armatureName = "armatureName";
                    ani.setAnimationCacheMode(dragonBones.ArmatureDisplay.AnimationCacheMode.REALTIME);
                    ani.timeScale = 1;
                    ani.playTimes = 0;
                    ani.playAnimation("stand", 0);
                }
            }
        })
        let trans = this.content.getComponent(UITransform) as UITransform;
        node.setPosition(new Vec3(0, -trans.height / 2));
        node.setScale(new Vec3(0.9, 0.9));
    }

    private onTableView() {
        let name = "testTableView";
        if (!this.content) return;
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();
        let node = instantiate(this.tableView);
        this.content.addChild(node);
        node.active = true;
        node.setPosition(v3(0, 0, 0));
    }

    private onUIDropdownList() {
        let name = "UIDropdownList";
        if (!this.content) return;
        if (this.content.getChildByName(name)) {
            return;
        }
        this.content.removeAllChildren();
        createPrefab({
            url: "prefabs/UIDropdownList",
            view: this,
            complete: (node) => {
                this.content.addChild(node);
                node.name = name;
                node.setPosition(0, 0)
                let dropdownList = node.getComponent(UIDropdownList)!;
                let data: DropdownListData[] = [];
                for (let i = 0; i < 5; i++) {
                    data.push({ title: `第${i}项` });
                }
                dropdownList.updateHandler = (isTitle, node, index) => {
                    let data = node.userData as DropdownListData;
                    node.getChildByName("Label")!.getComponent(Label)!.string = data.title;
                }
                dropdownList.reload(data);
            }
        })
    }
}
