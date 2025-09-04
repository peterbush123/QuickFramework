/**
 * @description 公共工具
 */

import { Tween, Node, tween, Label, Vec3, UITransform, safeMeasureText } from "cc";


export class Utils implements ISingleton {
    static module: string = "【Utils】";
    module: string = null!;
    /**@description 显示视图动画 */
    showView(node: Node | null) {
        return new Promise<void>((resolve, reject) => {
            if (node) {
                Tween.stopAllByTarget(node);
                tween(node)
                    .set({ scale: new Vec3(0.2, 0.2, 0.2) })
                    .to(0.2, { scale: new Vec3(1.15, 1.15, 1.15) })
                    .delay(0.05)
                    .to(0.1, { scale: new Vec3(1, 1, 1) })
                    .call(() => {
                        resolve();
                    })
                    .start();
            } else {
                resolve();
            }
        });
    }

    /**@description 隐藏/关闭视图统一动画 */
    hideView(node: Node | null) {
        return new Promise<void>((resolve, reject) => {
            if (node) {
                Tween.stopAllByTarget(node);
                tween(node)
                    .to(0.2, { scale: new Vec3(1.15, 1.15, 1.15) })
                    .to(0.1, { scale: new Vec3(0.3, 0.3, 0.3) })
                    .call(() => {
                        resolve();
                    })
                    .start();
            } else {
                resolve();
            }
        });
    }

    /**
     * @description 判断是否是一个有效邮箱
     */
    isMail(mailAddress: string) {
        let regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
        return regex.test(mailAddress);
    }

    /**
     * @description 判断是否是一个有效的电话号码
     * 注意 : 限中国地区手机号
     * 目前匹配号段
     * 中国电信号段
     * 133、149、153、173、177、180、181、189、199
     * 中国联通号段
     * 130、131、132、145、155、156、166、175、176、185、186
     * 
     * 中国移动号段
     * 134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188、198
     * 
     * 其他号段
     * 14号段以前为上网卡专属号段，如联通的是145，移动的是147等等。
     * 
     * 虚拟运营商
     * 
     * 电信：1700、1701、1702
     * 
     * 移动：1703、1705、1706
     * 
     * 联通：1704、1707、1708、1709、171
     * 版权声明：本文为CSDN博主「一木未朽」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
     * 原文链接：https://blog.csdn.net/gh2537477282/article/details/125297724
     */
    isTEL(tel: string) {
        let regex = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/g;
        return regex.test(tel);
    }

    /**
     * @description 指定宽度显示字符串内容，如果超过指定宽度则显示为 xxx..的形式
     * @param label 需要限制显示的Label组件
     * @param content 显示内容
     * @param width 限制显示宽度 默认为100px
     * @param suffix 超出显示宽度时,后缀，默认为..
     * @returns 
     */
    limitString(label: Label | null | undefined, content: string, width: number = 100, suffix = "..") {
        if (label) {
            //计算内容大小
            label.string = content;
            label.forceDoLayout();
            let trans = label.getComponent(UITransform) as UITransform;
            let contentWidth = trans.width;
            if (contentWidth <= width) {
                return;
            }
            //每一个字的宽度
            let singleWidth = contentWidth / content.length;
            let overWidth = contentWidth - width;
            let overCount = overWidth / singleWidth;
            overCount = Math.floor(overCount);
            let subString = content.substring(0, content.length - overCount) + suffix;
            if (label.assemblerData && label.assemblerData.context) {
                let safeWidth = safeMeasureText(label.assemblerData.context, subString)
                while (safeWidth > width) {
                    subString = subString.substring(0, subString.length - suffix.length - 1) + suffix;
                    safeWidth = safeMeasureText(label.assemblerData.context, subString)
                }
            }
            label.string = subString;
        }
    }

    /**
     * @description 转换成千分位分隔形式
     * @param data 要格式化的数字
     * @param options 配置参数
     * @param options.point 精确小数点位数 默认为2位
     * @param options.locale 地区设置 'en'(英语系国家), 'de'(德语系国家), 'fr'(法语系国家) 等
     * @param options.floor 小数点后是否向下取整 默认为false true为向下取整 false为四舍五入
     * @example 
     * ```ts
     * toThousandths(1000000.45, {
     *     point: 2,
     *     locale: 'en'
     * }) --> "1,000,000.45"
     * 
     * toThousandths(1000000.456, {
     *     point: 2,
     *     locale: 'de',
     *     floor: true
     * }) --> "1.000.000,45"
     * 
     * toThousandths(1000000.456, {
     *     point: 2,
     *     locale: 'fr'
     * }) --> "1 000 000,46"
     * ```
     */
    toThousandths(
        data: number,
        options: {
            /**精确小数点位数 默认为2位*/
            point?: number,
            /**地区设置 'en'(英语系国家), 'de'(德语系国家), 'fr'(法语系国家) 等*/
            locale?: string,
            /**小数点后是否向下取整 默认为false true为向下取整 false为四舍五入*/
            floor?: boolean
        } = {}) {
        let prefix: string = "";
        if (data < 0) {
            data *= -1;
            prefix = '-';
        }

        // 根据地区选择分隔符和小数点符号
        let separator: string;
        let decimalPoint: string;
        let point = options.point || 2;
        let locale = options.locale || 'en';
        let floor = options.floor || false;

        switch (locale.toLowerCase()) {
            case 'de':
            case 'es':
            case 'it':
                separator = '.';
                decimalPoint = ',';
                break;
            case 'fr':
            case 'ru':
                separator = ' ';
                decimalPoint = ',';
                break;
            case 'en':
            default:
                separator = ',';
                decimalPoint = '.';
        }

        // 根据floor参数判断是否向下取整还是四舍五入
        if (floor) {
            let multiplier = Math.pow(10, point);
            data = Math.floor(data * multiplier) / multiplier;
        } else {
            data = Number(data.toFixed(point));
        }

        // 分离整数部分和小数部分
        let [integerPart, decimalPart] = data.toString().split('.');

        // 处理整数部分的千分位
        let formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);

        // 组合结果
        let result = prefix + formattedInteger;
        if (point > 0) {
            // 如果需要显示小数
            if (decimalPart === undefined) {
                // 如果没有小数部分，补充0
                decimalPart = '0'.repeat(point);
            } else if (decimalPart.length < point) {
                // 如果小数位数不足，补充0
                decimalPart = decimalPart.padEnd(point, '0');
            }
            result += decimalPoint + decimalPart;
        }

        return result;
    }

    /**
     * @description 格式化成K,M,B,T计数单位
     * @param data 传入数值，支持科学计数法
     * @param options 配置参数
     * @param options.point 精确小数点位数 默认为2位
     * @param options.locale 地区设置 'en'(英语系国家), 'de'(德语系国家), 'fr'(法语系国家) 等
     * @param options.floor 小数点后是否向下取整 默认为false true为向下取整 false为四舍五入
     * @example 
     * ```ts
     * toFormat(1234, {
     *     point: 2,
     *     locale: 'en'
     * }) --> "1.23K"
     * 
     * toFormat(123456789, {
     *     point: 2,
     *     locale: 'fr'
     * }) --> "123.46M"
     * 
     * toFormat(123456789, {
     *     point: 2,
     *     locale: 'de'
     * }) --> "1.23M"
     * ```
     */
    toFormat(data: number, options: {
        /**精确小数点位数 默认为2位*/
        point?: number,
        /**地区设置 'en'(英语系国家), 'de'(德语系国家), 'fr'(法语系国家) 等*/
        locale?: string,
        /**小数点后是否向下取整 默认为false true为向下取整 false为四舍五入*/
        floor?: boolean
    } = {}) {
        let point = options.point || 2;
        let locale = options.locale || 'en';
        let floor = options.floor || false;
        // 处理特殊情况
        if (isNaN(data) || !isFinite(data)) {
            return '0';
        }

        // 根据地区选择小数点符号
        let decimalPoint: string;
        switch (locale.toLowerCase()) {
            case 'de':
            case 'es':
            case 'it':
            case 'fr':
            case 'ru':
                decimalPoint = ',';
                break;
            case 'en':
            default:
                decimalPoint = '.';
        }

        const K = 1000;
        const scales: { [key: string]: number } = {
            K: K,               // 1e3
            M: Math.pow(K, 2),  // 1e6
            B: Math.pow(K, 3),  // 1e9
            T: Math.pow(K, 4),  // 1e12
        };
        let units = ["K", "M", "B", "T"];
        let unit = "";
        let tempValue = 0;
        let flag = 1;
        if (data < 0) {
            flag = -1;
        }
        data = Math.abs(data);
        if (data < K) {
            tempValue = data;
        } else {
            for (let i = units.length - 1; i >= 0; i--) {
                let scale = scales[units[i]];
                tempValue = data / scale;
                if (tempValue >= 1) {
                    unit = units[i];
                    break;
                }
            }
        }

        let value = tempValue * flag;
        // 根据floor参数判断是否向下取整还是四舍五入
        if (floor) {
            let multiplier = Math.pow(10, point);
            value = Math.floor(value * multiplier) / multiplier;
        } else {
            value = Number(value.toFixed(point));
        }

        return `${value.toFixed(point)}${unit}`;
    }

    /**
     * @description 判断是否是一个有效的中国公民身份证号码
     * @param id 
     * @returns 
     */
    isIDNumber(id: string) {
        //18 位身份证号
        let test = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/g;
        if (test.test(id)) {
            return true;
        }
        return false;
    }

    /**
     * @description 数组去重
     * @param array 要去重的数组
     * @param key 如果是对象数组，指定用于比较的键名
     * @returns 去重后的新数组
     * @example
     * ```ts
     * // 基础类型数组
     * uniqueArray([1, 2, 2, 3]); // [1, 2, 3]
     * 
     * // 对象数组
     * uniqueArray([{id:1, name:'a'}, {id:1, name:'b'}], 'id'); // [{id:1, name:'a'}]
     * ```
     */
    uniqueArray<T>(array: T[], key?: keyof T): T[] {
        if (!key) {
            return [...new Set(array)];
        }

        const seen = new Set();
        return array.filter(item => {
            const value = item[key];
            if (seen.has(value)) {
                return false;
            }
            seen.add(value);
            return true;
        });
    }

    /**
     * @description 打乱数组顺序
     * @param array 要打乱的数组
     * @returns 打乱后的新数组
     * @example
     * ```ts
     * // 基础类型数组
     * shuffleArray([1, 2, 3, 4, 5]); // [3, 1, 5, 2, 4]
     * 
     * // 对象数组
     * shuffleArray([{id:1}, {id:2}, {id:3}]); // [{id:2}, {id:3}, {id:1}]
     * ```
     */
    shuffleArray<T>(array: T[]): T[] {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    }

    /**
     * @description 延时执行
     * @param ms 延时时间，单位毫秒
     * @returns 一个Promise对象，在延时结束后resolve
     */
    delayMs(ms: number): Promise<void> {
        return new Promise(resolve => {
            setTimeout(resolve, ms);
        });
    }

    /**
     * @description 延时执行
     * @param ms 延时时间，单位秒
     * @returns 一个Promise对象，在延时结束后resolve
     */
    async delay(ms: number): Promise<void> {
        await this.delayMs(ms * 1000);
    }
}