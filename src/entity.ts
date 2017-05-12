import { Component, ComponentType, ComponentConstructor } from "./component";

/**
 * 实体接口
 */
export interface IEntity {
    /**
     * 获取cc指定的组件，如果组件不存在，返回null
     */
    TryGet<T extends Component>(cc: ComponentConstructor<T>): T | null;
    /**
     * 获取cc指定的组件，如果组件不存在，构造一个新的
     */
    Get<T extends Component>(cc: ComponentConstructor<T>): T;
}

/**
 * 实体类
 */
export class Entity implements IEntity {

    private _component_map: Component[] = [];

    public constructor() {
    }

    public TryGet<T extends Component>(cc: ComponentConstructor<T> & ComponentType): T | null {
        let idx: uint = cc.IDX;
        if (Component.IDX === idx) {
            throw "error";
        }

        let com = this._component_map[idx];
        if (void 0 === com) {
            return null;
        }
        return <T>com;
    }

    public Get<T extends Component>(cc: ComponentConstructor<T> & ComponentType): T {
        let idx: uint = cc.IDX;
        if (Component.IDX === idx) {
            throw "error";
        }

        let com = this._component_map[idx];
        if (void 0 === com) {
            this._component_map[cc.IDX] = com = new cc(this);
        }
        return <T>com;
    }
}
