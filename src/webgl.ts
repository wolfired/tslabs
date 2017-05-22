const vss = `
    attribute vec4 a_position;

    void main(){
        gl_Position = a_position;
    }
`;

const fss = `
    precision mediump float;
    
    void main(){
        vec2 resolution = vec2(1750.0, 1750.0);

        vec2 center = resolution / 2.0;
        float radius = min(center.x, center.y);

        vec2 position = gl_FragCoord.xy - center;

        float z = sqrt(radius * radius - position.x * position.x - position.y * position.y);
        
        // z /= radius;
        vec3 normal = normalize(vec3(position.x, position.y, z));


        if(length(position) > radius) {
            discard;
        }else{
            gl_FragColor = vec4((normal + 1.0)/2.0, 1.);
        }
    }
`;

export enum ShaderType { VERTEX, FRAGMENT };

export class WebGL {
    public readonly ctx: WebGLRenderingContext;

    public constructor(ctx: WebGLRenderingContext) {
        this.ctx = ctx;
    }

    public createShader(st: ShaderType, s: string): WebGLShader {
        const shader = this.ctx.createShader(ShaderType.VERTEX === st ? this.ctx.VERTEX_SHADER : this.ctx.FRAGMENT_SHADER);
        if (null === shader) {
            throw "error";
        }

        this.ctx.shaderSource(shader, s);
        this.ctx.compileShader(shader);

        return shader;
    }

    public createProgram(vs: WebGLShader, fs: WebGLShader): WebGLProgram {
        const program = this.ctx.createProgram();
        if (null === program) {
            throw "error";
        }
        this.ctx.attachShader(program, vs);
        this.ctx.attachShader(program, fs);
        this.ctx.linkProgram(program);

        return program;
    }
}


export function setup(ctx: WebGLRenderingContext): void {
    ctx.viewport(0, 0, 1750, 1750);
    ctx.clearColor(0.157, 0.173, 0.204, 1.0);


    ctx.clear(ctx.COLOR_BUFFER_BIT);

    const webgl = new WebGL(ctx);

    const vs = webgl.createShader(ShaderType.VERTEX, vss);
    const fs = webgl.createShader(ShaderType.FRAGMENT, fss);
    const p = webgl.createProgram(vs, fs);

    const pdata = [
        -1, 1,
        1, 1,
        1, -1,
        -1, 1,
        1, -1,
        -1, -1
    ];
    const pbuffer = ctx.createBuffer()!;
    ctx.bindBuffer(ctx.ARRAY_BUFFER, pbuffer);
    ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(pdata), ctx.STATIC_DRAW);

    const l = ctx.getAttribLocation(p, "a_position");
    ctx.vertexAttribPointer(l, 2, ctx.FLOAT, false, 0, 0);
    ctx.enableVertexAttribArray(l);

    ctx.useProgram(p);

    ctx.drawArrays(ctx.TRIANGLES, 0, 6);
}



