import { sys } from "cc";
const data = {
    language: sys.Language.ENGLISH,
    data: {
        hall_view_broadcast_content: '[broadcast] congratulations!',
        hall_view_nogame_notice: '【{0}】developing!!!',
        test: " test : {0}-->{1}-->{2}-->{3}-->",
        pic_girl : "texture/user",
    }
}

const HallEN: Language.BundleData<typeof data.data> = data;
export { HallEN }