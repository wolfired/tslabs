import { Component, Register } from "../component";
import { IEntity } from "../entity";

@Register
export class Mesh extends Component {
    public constructor(host: IEntity) {
        super(host);
    }

    protected update(): void {
    }
}
