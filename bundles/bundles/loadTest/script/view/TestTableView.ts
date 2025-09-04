import { Component, EventHandler, find, Toggle, _decorator, Node } from "cc";
import EventComponent from "db://quick/components/EventComponent";
import TableView, { TableViewDelegate } from "db://quick/core/ui/TableView";
import { inject } from "db://quick/defines/Decorators";
import TestTableViewCell, { CellData } from "./TestTableViewCell";

const { ccclass, property } = _decorator;

@ccclass("TestTableView")
export default class TestTableView extends EventComponent implements TableViewDelegate {

    private _datas: CellData[] = [];

    @inject("TableviewH",TableView)
    private _tableViewH: TableView = null!;
    @inject("TableviewV",TableView)
    private _tableViewV: TableView = null!;
    private _count = 0;
    @inject("op/type",Toggle)
    private _type: Toggle = null!;

    private get vertical() {
        return this._type.isChecked;
    }

    private get horizontal() {
        return !this._type.isChecked;
    }

    protected getType(index: number) {
        return index % 2 == 0 ? 1 : 2;
    }

    updateCellData(view: TableView, cell: TestTableViewCell): void {
        cell.updateData(this._datas[cell.index]);
    }

    tableCellTypeAtIndex(view: TableView, index: number) {
        return this._datas[index].type;
    }

    numberOfCellsInTableView(view: TableView): number {
        return this._datas.length;
    }

    tableCellWillRecycle(view: TableView, cell: TestTableViewCell){
        cell.willRecycle();
    }

    tableDebug(view: TableView): void {
        Log.d(`------------------ 当前原始数据 ------------------`)
        this._datas.forEach((v, i, arr) => {
            Log.d(`[${i}] type : ${v.type} , content : ${v.content}`);
        })
    }

    private initData() {
        for (let i = 0; i < 20; i++) {
            this._datas.push({ content: `cell${i}`, type: this.getType(i) });
        }
    }

    onLoad(): void {
        this.initData();
        this.onN(this._type.node,"toggle", this.onChangeType);

        let eventHandler = new EventHandler;
        eventHandler.component = "TestTableView";
        eventHandler.target = this.node;
        eventHandler.handler = "onEvent";
        this._tableViewV.scrollEvents.push(eventHandler);
        this._tableViewV.delegate = this;
        this._tableViewV.node.active = this.vertical;

        let eventHandlerH = new EventHandler;
        eventHandlerH.component = "TestTableView";
        eventHandlerH.target = this.node;
        eventHandlerH.handler = "onEvent";
        this._tableViewH.scrollEvents.push(eventHandlerH);
        this._tableViewH.delegate = this;
        this._tableViewH.node.active = this.horizontal;

        this.onN(find("op/front", this.node)!,Node.EventType.TOUCH_END, this.onInsertFront);
        this.onN(find("op/dfront", this.node)!,Node.EventType.TOUCH_END, this.onDeleteFront);
        this.onN(find("op/end", this.node)!,Node.EventType.TOUCH_END, this.onInsertEnd);
        this.onN(find("op/dend", this.node)!,Node.EventType.TOUCH_END, this.onDeleteEnd);
        this.onN(find("op/mid", this.node)!,Node.EventType.TOUCH_END, this.onInsertMid);
        this.onN(find("op/dmid", this.node)!,Node.EventType.TOUCH_END, this.onDeleteMid);
        this.onN(find("op/to", this.node)!,Node.EventType.TOUCH_END, this.onScrollTo);
        this.onN(find("op/update", this.node)!,Node.EventType.TOUCH_END, this.onUpdateData);

        this.onChangeType(this._type);
    }

    private getNewType(index: number) {
        let type = 1;
        if (index >= 0 && index < this._datas.length && this._datas[index].type == 1) {
            type = 2;
        }
        return type;
    }

    private get time() {
        return 1;
    }

    private onInsertMid() {
        let index = 2;
        this._datas.splice(index, 0, { content: `Cell新${this._count}`, type: this.getNewType(index) })
        this._count++;
        this.horizontal && this._tableViewH.insertCellAtIndex(index);
        this.vertical && this._tableViewV.insertCellAtIndex(index);
    }
    private onInsertEnd() {
        let index = this._datas.length - 1;
        this._datas.push({ content: `Cell新${this._count}`, type: this.getNewType(index) })
        this._count++;
        this.horizontal && this._tableViewH.insertCellAtIndex();
        this.vertical && this._tableViewV.insertCellAtIndex();
    }
    private onInsertFront() {
        let index = 0;
        this._datas.unshift({ content: `Cell新${this._count}`, type: this.getNewType(index) })
        this._count++;
        this.horizontal && this._tableViewH.insertCellAtIndex(index);
        this.vertical && this._tableViewV.insertCellAtIndex(index);
    }

    private onDeleteData(index: number) {
        if (index >= 0 && index < this._datas.length) {
            this._datas.splice(index, 1);
        }
    }

    private onDeleteMid() {
        let index = 2;
        this.horizontal && this._tableViewH.removeCellAtIndex(index, this.onDeleteData.bind(this));
        this.vertical && this._tableViewV.removeCellAtIndex(index, this.onDeleteData.bind(this));
    }
    private onDeleteEnd() {
        let index = this._datas.length - 1;
        this.horizontal && this._tableViewH.removeCellAtIndex(index, this.onDeleteData.bind(this));
        this.vertical && this._tableViewV.removeCellAtIndex(index, this.onDeleteData.bind(this));
    }
    private onDeleteFront() {
        let index = 0;
        this.horizontal && this._tableViewH.removeCellAtIndex(index, this.onDeleteData.bind(this));
        this.vertical && this._tableViewV.removeCellAtIndex(index, this.onDeleteData.bind(this));
    }

    private onScrollTo() {
        let index = 5;
        this.horizontal && this._tableViewH.scrollToIndex(index, this.time);
        this.vertical && this._tableViewV.scrollToIndex(index, this.time)
    }

    private onUpdateData() {
        let index = 3;
        this._datas[index].content = "更新的Cell";
        this.horizontal && this._tableViewH.updateCellAtIndex(index);
        this.vertical && this._tableViewV.updateCellAtIndex(index);
    }

    private onEvent(target: TableView, event: string) {
        // Log.d(event)
    }

    private onChangeType(target: Toggle) {
        this._tableViewH.node.active = this.horizontal;
        if (this.horizontal) {
            this._tableViewH.reloadData();
        }
        this._tableViewV.node.active = this.vertical;
        if (this.vertical) {
            this._tableViewV.reloadData();
        }
    }

}
