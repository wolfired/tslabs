import { Component, Register } from "../component";
import { IEntity } from "../entity";

@Register
export class Transform extends Component {
    public constructor(host: IEntity) {
        super(host);
    }

    protected update(): void {
    }

    public tx: float32;
    public ty: float32;
    public tz: float32;

    public sx: float32;
    public sy: float32;
    public sz: float32;

    public rx: float32;
    public ry: float32;
    public rz: float32;
}
