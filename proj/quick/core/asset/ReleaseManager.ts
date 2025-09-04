
/**
 * 资源释放管理
 * DateTime = Mon Dec 13 2021 20:58:18 GMT+0800 (中国标准时间)
 * Author = zheng_fasheng
 */

import { Asset, assetManager, Node, isValid, tween, Tween, Prefab, AssetManager, SpriteFrame, Texture2D, sp, JsonAsset, TextAsset } from "cc";
import { Macro } from "../../defines/Macros";
import { Resource } from "./Resource";
import { ViewAsset } from "./ViewAsset";
import { DEBUG } from "cc/env";

const LOG_TAG = "【释放管理器】 : ";

class LazyInfo {

    private name: string = "";
    constructor(name: string) {
        this.name = name;
    }

    private _caches: Map<string, Resource.Cache> = new Map();

    /**@description 放入懒释放资源 */
    add(cache: Resource.Cache) {

        const success = cache.addRef();
        if ( DEBUG ){
            let log = success ? "成功" : "失败";
            if (cache.isDir) {
                Log.d(`${LOG_TAG}${log} 向${this.name}加入待释放目录:${cache.key}`);
            } else {
                Log.d(`${LOG_TAG}${log} 向${this.name}加入待释放资源:${cache.key}`);
            }
        }
        
        cache.stamp = Date.timeNow();

        this._caches.set(cache.key, cache);
    }

    /**
     * @description 获取缓存
     * @param key  Resource.getKey(url,type) 的值
     * @returns 
     */
    get(key: string) {
        let cache = this._caches.get(key);
        if (cache) {
            const success = cache.decRef(false);
            if (cache.isDir) {
                Log.d(`${LOG_TAG}向${this.name}获取待释放目录:${cache.key}`);
                this._caches.delete(key);
                return cache;
            } else {
                if (success) {
                    //获取后删除当前管理器的引用
                    Log.d(`${LOG_TAG}向${this.name}获取待释放资源:${cache.key}`);
                    this._caches.delete(key);
                    return cache;
                } else {
                    Log.w(`${LOG_TAG}向${this.name}获取待释放资源时，资源${cache.key}已经释放`);
                    this._caches.delete(key);
                    return null;
                }
            }
        }
        return null;
    }

    private toRelease(cache: Resource.Cache) {
        if (this.name == Macro.BUNDLE_REMOTE) {
            if (cache.data instanceof Asset) {
                Log.d(`${LOG_TAG}bundle : ${this.name} 释放远程加载资源${cache.url}`);
                assetManager.releaseAsset(cache.data as Asset);
            }
            this._caches.delete(cache.key);
            return;
        }

        //释放长时间未使用资源
        let bundle = App.bundleManager.getBundle(cache.bundle);
        this.release(cache, bundle!);
        this._caches.delete(cache.key);
    }

    private toReleasePrefab(cache: Resource.Cache) {
        if (Array.isArray(cache.data)) {
            if (cache.type == Prefab) {
                this.toRelease(cache);
            }
        } else {
            if (cache.data instanceof Prefab) {
                this.toRelease(cache);
            }
        }
    }

    onLowMemory() {
        if (this._caches.size > 0) {
            Log.d(`${LOG_TAG}bundle : ${this.name} 释放加载的资源`);
            if (this.name == Macro.BUNDLE_REMOTE) {
                this._caches.forEach((cache, key, source) => {
                    this.toRelease(cache);
                });
                return;
            }
            let bundle = assetManager.getBundle(this.name);
            if (bundle) {
                //先释放预置，再释放资源
                //不然再释放资源的时候，预置有可能在使用该资源，导致资源得不到释放
                this._caches.forEach((cache, key) => {
                    this.toReleasePrefab(cache);
                })
                this._caches.forEach(info => {
                    this.release(info, bundle!);
                });
                this._caches.clear();
            } else {
                Log.w(`${LOG_TAG}释放bundle : ${this.name} 时，Bundle已经被释放，直接清空待释放数据`);
                this._caches.clear();
            }
        }
    }

    tryRemove(bundle: BUNDLE_TYPE) {
        if (this.name != bundle) {
            return;
        }
        this.onLowMemory();
    }

    protected release(cache: Resource.Cache, bundle: AssetManager.Bundle) {
        const success = cache.decRef(false);
        if (cache.isDir) {
            Log.d(`${LOG_TAG}bundle : ${this.name} 释放加载目录${cache.fullUrl}`);
        } else {
            if (success) {
                //获取后删除当前管理器的引用
                if (cache.refCount <= 0) {
                    bundle?.release(cache.url, cache.type);
                    Log.d(`${LOG_TAG}bundle : ${this.name} 释放加载资源${cache.url}`);
                } else {
                    if ( cache.originaRefCount == cache.refCount ){
                        Log.d(`${LOG_TAG}bundle : ${this.name} 正常释放加载资源${cache.url}`);
                    }else{
                        Log.w(`${LOG_TAG}bundle : ${this.name} 资源${cache.url}正使用中引用计数为:${cache.refCount}`)
                    }
                }
            }
        }
    }

    /**@description 尝试释放长时间未使用资源 */
    tryRemoveTimeoutResources() {
        if (App.isLazyRelease && App.isAutoReleaseUnuseResources) {
            //先释放预置，再释放资源
            //不然再释放资源的时候，预置有可能在使用该资源，导致资源得不到释放
            this._caches.forEach((cache, key, source) => {
                if (cache.retain) {
                    return;
                }
                if (cache.stamp == null) {
                    return;
                }
                let now = Date.timeNow();
                let pass = now - cache.stamp;
                if (pass >= App.autoReleaseUnuseResourcesTimeout) {
                    this.toReleasePrefab(cache);
                }
            });

            this._caches.forEach((cache, key, source) => {
                if (cache.retain) {
                    return;
                }
                if (cache.stamp == null) {
                    return;
                }
                let now = Date.timeNow();
                let pass = now - cache.stamp;
                if (pass >= App.autoReleaseUnuseResourcesTimeout) {
                    this.toRelease(cache);
                }
            })
        }
    }

    get assets() {
        return this._caches;
    }

    clear(...args: any[]) {
        this._caches.clear();
    }
}

export class ReleaseManager implements ISingleton {
    static module: string = LOG_TAG;
    isResident?: boolean = true;
    module: string = null!;
    /**@description 待释放资源 */
    private _lazyInfos: Map<string, LazyInfo> = new Map();
    /**@description 待释放bundle */
    private _bundles: Map<string, number> = new Map();
    /**@description 远程资源 */
    private _remote: LazyInfo = new LazyInfo(Macro.BUNDLE_REMOTE);
    /**@description 界面资源 */
    private _uiDatas = new Map<string, ViewAsset.Data>;

    private _actionTag = 999;

    private getBundle(bundle: BUNDLE_TYPE) {
        return App.bundleManager.getBundle(bundle);
    }

    private getBundleName(bundle: BUNDLE_TYPE) {
        return App.bundleManager.getBundleName(bundle);
    }

    release(cache: Resource.Cache) {
        let bundle = this.getBundle(cache.bundle);
        if (bundle) {
            if (App.isLazyRelease) {
                let name = bundle.name
                //如果是懒释放，记录一下就行了
                let lazyInfo: LazyInfo | undefined;
                if (this._lazyInfos.has(name)) {
                    lazyInfo = this._lazyInfos.get(name);
                } else {
                    lazyInfo = new LazyInfo(name);
                    this._lazyInfos.set(name, lazyInfo);
                }

                if (App.cache.removeWithInfo(cache, bundle,lazyInfo)) {
                    if (lazyInfo) {
                        lazyInfo.add(cache);
                    }
                    App.cache.remove(cache);
                }
            } else {
                App.cache.removeWithInfo(cache, bundle,null!);
            }
        } else {
            Log.e(`${LOG_TAG}${cache.bundle} no found`);
        }
    }

    get(bundle: BUNDLE_TYPE, key: string) {
        let temp = this.getBundle(bundle);
        if (temp) {
            let info = this._lazyInfos.get(temp.name);
            if (info) {
                return info.get(key);
            }
        } else {
            Log.w(`${LOG_TAG}${bundle}不存在，删除释放管理器中的缓存`);
            let name = this.getBundleName(bundle);
            this.onLoadBundle(name);
            this._lazyInfos.delete(name);
        }
        return null;
    }

    removeBundle(bundle: BUNDLE_TYPE) {
        let temp = this.getBundle(bundle);
        if (App.isLazyRelease) {
            if (temp) {
                Log.d(`${LOG_TAG}向释放管理器中添加待释放bundle : ${temp?.name}`);
                this._bundles.set(temp?.name, Date.timeNow());
            }
        } else {
            Log.d(`${LOG_TAG}释放Bundle : ${temp?.name}`);
            temp?.releaseAll();
            if (temp) assetManager.removeBundle(temp);
        }
    }

    onLoadBundle(bundle: string) {
        this._bundles.delete(bundle);
    }

    /**
     * @description 判断bundle是否存在于释放管理器中
     */
    isExistBunble(bundle: BUNDLE_TYPE) {
        if (App.isLazyRelease) {
            //开启了懒释放功能
            let name = this.getBundleName(bundle);
            if (this._bundles.has(name)) {
                return true;
            }
            return false;
        } else {
            //未开启，在释放之前已经获取过了，严格来说，不可能走到这里
            return false;
        }
    }

    /**
     * @description 高度状态下，打印出当前资源的引用情况
     */
    private debugUselessBundleAssets( bundle : string ){
        if ( DEBUG ){
            let bundleCache = this._lazyInfos.get(bundle)
            if ( bundleCache ){
                bundleCache.tryRemove(bundle);
            }
        }
    }

    /**
     * @description 释放无用的bundle 
     * @param isTimout true , 只释放超时的bundle ，并返回释放的 bundle名
     */
    private releaseUselessBundles(isTimout: boolean = false) {
        Log.d(`${LOG_TAG}-------------释放无用bundle-------------`);
        let result: string[] = [];
        let now = Date.timeNow();
        this._bundles.forEach((value, bundle) => {
            let temp = assetManager.getBundle(bundle);
            if (temp) {
                if (App.bundleManager.isEngineBundle(bundle)) {
                    Log.d(`${bundle} : 引擎bundle，跳过处理`)
                    return;
                }
                if (isTimout) {
                    let pass = now - value;
                    if (pass >= App.autoReleaseUnuseResourcesTimeout) {
                        Log.d(`释放长时间无用bundle : ${bundle}`);
                        this.debugUselessBundleAssets(bundle);
                        temp.releaseAll();
                        assetManager.removeBundle(temp);
                        result.push(bundle);
                        this._bundles.delete(bundle);
                        this._lazyInfos.delete(bundle)
                    }
                } else {
                    Log.d(`释放无用bundle : ${bundle}`);
                    this.debugUselessBundleAssets(bundle);
                    temp.releaseAll();
                    assetManager.removeBundle(temp);
                    this._bundles.delete(bundle);
                    this._lazyInfos.delete(bundle)
                }
            }
        });
        return result;
    }

    private destroyUI( data : ViewAsset.Data , now ?: number){
        if ( data ){
            if ( now ){
                let pass = now - data.cache.stamp!;
                if ( pass >= App.autoReleaseUnuseResourcesTimeout ){
                    data.destroy()
                    this._uiDatas.delete(data.name);
                    return true;
                }
            }else{
                data.destroy()
                this._uiDatas.delete(data.name);
                return true;
            }
        }
        return false;
    }

    private releaseUselessUI(isTimeout = false, bundle ?: BUNDLE_TYPE ){
        let now = Date.timeNow();
        this._uiDatas.forEach((v, k) => {
            if ( bundle ){
                if ( v.bundle == bundle ){
                    this.destroyUI(v);
                }
                return;
            }
            if ( isTimeout ){
                this.destroyUI(v,now);
            }else{
                this.destroyUI(v);
            }
        })
    }

    onLowMemory() {
        Log.d(`${LOG_TAG}------------收到内存警告，释放无用资源------------`);

        //先释放UI资源
        this.releaseUselessUI();
        //释放无用 bundle
        this.releaseUselessBundles();

        this._lazyInfos.forEach((info, key, source) => {
            info.onLowMemory();
        });

        Log.d(`${LOG_TAG}-------------释放无用远程资源-------------`);
        this._remote.onLowMemory();
    }

    onAutoReleaseUnuseResources() {
        Log.d(`${LOG_TAG}------------释放长时间未使用资源开始------------`);
        let curBundle = App.stageData.where;

        let result = this.releaseUselessBundles(true);
        this.releaseUselessUI(true);

        //释放UI 资源
        let now = Date.timeNow();
        let bMgr = App.bundleManager;
        this._uiDatas.forEach((v, k) => {
            if ( !this.destroyUI(v,now) ) {
                //删除bundle已经释放的UI
                if( result.indexOf(bMgr.getBundleName(v.bundle) ) != -1 ){
                    this.destroyUI(v);
                }
            }
        });

        //排除当前bundle的资源，当前bundle正在运行，没有必要释放当前bundle资源
        this._lazyInfos.forEach((info, bundle, source) => {
            if (bundle == curBundle) {
                return;
            }
            info.tryRemoveTimeoutResources()
        });

        Log.d(`${LOG_TAG}-------------释放无用远程资源-------------`);
        this._remote.tryRemoveTimeoutResources();

        Log.d(`${LOG_TAG}------------释放长时间未使用资源结束------------`);
    }

    /**@description 尝试释放指定bundel的资源 */
    tryRemoveBundle(bundle: BUNDLE_TYPE) {
        Log.d(`${LOG_TAG}--------------尝试释放${bundle}加载资源------------`);

        //先释放UI资源
        this.releaseUselessUI(false,bundle);

        this._lazyInfos.forEach((info, key, source) => {
            info.tryRemove(bundle);
        });

        let name = this.getBundleName(bundle);
        let temp = assetManager.getBundle(name);
        if (temp) {
            Log.d(`释放无用bundle : ${name}`);
            temp.releaseAll();
            assetManager.removeBundle(temp);
            this._bundles.delete(name);
            this._lazyInfos.delete(name);
        }
    }

    getRemote(url: string, type: typeof Asset) {
        //返回的是数组
        let caches: Resource.Cache[] = [];
        if (type == SpriteFrame) {
            let spriteFrameCache = this._remote.get(Resource.getKey(url, type));
            let texture2DCache = this._remote.get(Resource.getKey(url, Texture2D));
            caches.push(spriteFrameCache!);
            caches.push(texture2DCache!);
        } else if (type == sp.SkeletonData) {
            let spineAtlas = `${url}.atlas`;
            let spinePng = `${url}.png`;
            let spineJson = `${url}.json`;
            let data = this._remote.get(Resource.getKey(url, type));
            let pngCache = this._remote.get(Resource.getKey(spinePng, Texture2D));
            let jsonCache = this._remote.get(Resource.getKey(spineJson, JsonAsset));
            let atlasCache = this._remote.get(Resource.getKey(spineAtlas, TextAsset));
            caches.push(data!);
            caches.push(pngCache!);
            caches.push(jsonCache!);
            caches.push(atlasCache!);
        } else {
            let cache = this._remote.get(Resource.getKey(url, type));
            caches.push(cache!);
        }
        return caches;
    }

    releaseRemote(cache: Resource.Cache, force: boolean = false) {
        if (App.isLazyRelease && !force) {
            this._remote.add(cache);
        } else {
            if (cache.data instanceof Asset) {
                assetManager.releaseAsset(cache.data as Asset);
            }
        }
    }

    /**@description 获取 UI 资源数据 */
    getUI(name: string,isDel = true) {
        let out = this._uiDatas.get(name);
        if (!isDel){
            return out;
        }

        if (out) {
            out = out.resumeRelease();
            if (DEBUG) {
                if (out) {
                    Log.d(`${this.module}获取待释放UI资源 : ${name}`)
                } else {
                    Log.d(`${this.module}获取待释放UI资源 : ${name} 时，节点已经销毁`);
                }
            }
            this._uiDatas.delete(name);
        }
        return out;
    }

    /**@description 释放 UI 资源数据 */
    releaseUI(data: ViewAsset.Data) {
        if (data.toRelease()) {
            DEBUG && Log.d(`${this.module}加入待释放的UI资源${data.name}`);
            this._uiDatas.set(data.name, data);
        }
    }

    onLoad(node: Node) {
        if ( App.isAutoReleaseUnuseResources && App.isLazyRelease ){
            tween(node).repeatForever(tween(node)
            .delay(App.autoReleaseUnuseResourcesTimeout)
            .call(() => {
                this.onAutoReleaseUnuseResources();
            }))
            .tag(this._actionTag)
            .start()
        }
    }

    onDestroy(node: Node) {
        Tween.stopAllByTag(this._actionTag);
        this.clear();
    }

    debug() {
        let bundles: string[] = [];
        this._bundles.forEach((data, key, source) => {
            bundles.push(key);
        })
        let data = {
            lazyInfo: this._lazyInfos,
            bundles: bundles,
            remote: this._remote
        }
        Log.d(`--------------${this.module}调试信息如下--------------`)
        if (App.isLazyRelease) {

            this._uiDatas.forEach((v, k) => {
                Log.d(`待释放UI ${k}`)
            })

            if (data.bundles.length > 0) {
                Log.d(`待释放Bundle : ${data.bundles.toString()}`);
            }
            if (data.lazyInfo.size > 0) {
                data.lazyInfo.forEach((value, key, source) => {
                    Log.d(`--------------${key}待释放资源--------------`);
                    value.assets.forEach((info, key, source) => {
                        Log.d(JSON.stringify(info.debug()));
                    })
                });
            }

            Log.d(`远程待释放资源`);
            data.remote.assets.forEach((info, key, source) => {
                Log.d(JSON.stringify(info.debug()));
            });

        } else {
            Log.w(`未开户懒释放功能!!!!`);
        }
    }

    clear(...args: any[]) {
        this._bundles.clear();
        this._lazyInfos.clear();
        this._uiDatas.clear();
        this._remote.clear();
    }
}
