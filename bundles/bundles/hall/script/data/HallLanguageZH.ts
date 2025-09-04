import { sys } from "cc";

const data = {
  language: sys.Language.CHINESE,
  data: {
    hall_view_broadcast_content: '[系统广播] 恭喜大佬进入',
    hall_view_nogame_notice: '【{0}】未实现，更多功能，敬请期待!!!',
    test: "测试 : {0}-->{1}-->{2}-->{3}-->",
        pic_girl: "texture/girl",
    }
}

const HallZH: Language.BundleData<typeof data.data> = data;
export { HallZH }