export declare class tObject {
    x: number;
    y: number;
    z: number;
    w: number;
    h: number;
    d: number;
    rx: number;
    ry: number;
    rz: number;
    sx: number;
    sy: number;
    sz: number;
    color: string;
    constructor(x: any, y: any, z: any, w: any, h: any, d: any, rx: any, ry: any, rz: any, sx: any, sy: any, sz: any, c: any);
}
export declare class tPoint extends tObject {
    constructor(x: any, y: any, z: any, c: any);
}
export declare class tLine extends tObject {
    constructor(x1: any, y1: any, z1: any, x2: any, y2: any, z2: any, c: any);
}
export declare class tMesh {
    vertices: any[];
    faces: any[];
    uvs: any[];
    constructor(vertices: any, faces: any, uvs: any);
}
export declare class tMaterial {
    color: any;
    texture: any;
    emissive: any;
    specular: any;
    shininess: any;
    reflectivity: any;
    opacity: any;
    transparent: any;
    constructor(color: any, texture: any, emissive: any, specular: any, shininess: any, reflectivity: any, opacity: any, transparent: any);
}
export declare class tPlane extends tObject {
    constructor(x: any, y: any, z: any, w: any, h: any, c: any);
}
export declare class tSphere extends tObject {
    radius: any;
    constructor(x: any, y: any, z: any, r: any, rx: any, ry: any, rz: any, sx: any, sy: any, sz: any, c: any, radius: any);
}
export declare class tCube extends tObject {
    constructor(x: any, y: any, z: any, w: any, h: any, d: any, rx: any, ry: any, rz: any, sx: any, sy: any, sz: any, c: any);
}
export declare class tLight extends tObject {
    intensity: any;
    constructor(x: any, y: any, z: any, color: any, intensity: any);
}
export declare class tCamera extends tObject {
    fov: any;
    near: any;
    far: any;
    aspect: any;
    constructor(x: any, y: any, z: any, rx: any, ry: any, rz: any, fov: any, near: any, far: any, aspect: any);
}
export declare class tScene {
    objects: any;
    lights: any;
    camera: any;
    constructor(objects: any, lights: any, camera: any);
    add(o: any): void;
    remove(o: any): void;
    addLight(l: any): void;
    removeLight(l: any): void;
}
export declare class tRenderer {
    scene: any;
    canvas: any;
    ctx: any;
    buffers: any;
    textures: any;
    shaders: any;
    constructor(scene: any, canvas: any, width: any, height: any);
    setupCanvas(width: any, height: any): void;
    setupContext(): void;
    setupBuffers(): void;
    setupTextures(): void;
    setupShaders(): void;
    clearScene(): void;
    fillScene(color: string): void;
    renderObject(object: {
        x: any;
        y: any;
        rx: any;
        sx: any;
        sy: any;
        c: any;
        w: number;
        h: number;
    }): void;
    renderLight(light: any): void;
    renderCamera(camera: any): void;
    render(scene: {
        objects: string | any[];
        lights: string | any[];
        camera: any;
    }): void;
}
