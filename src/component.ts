import { IEntity } from "./entity";

/**
 * 组件基类
 */
export abstract class Component {
    public static readonly IDX: uint = 0;

    public readonly host: IEntity;

    protected constructor(host: IEntity) {
        this.host = host;
    }

    protected abstract update(): void;
}

export type ComponentType = typeof Component;

export type ComponentConstructor<T> = new (host: IEntity) => T;

/**
 * 组件注册器
 */
export function Register(cc: ComponentType) {
    (<{ IDX: uint }>cc).IDX = (<{ IDX: uint }>Component).IDX++;
}

/** 已注册组件数量 */
export function Registered(): uint {
    return Component.IDX;
}
