declare const funcs: {
    V3: (x: any, y: any, z: any) => {
        x: any;
        y: any;
        z: any;
    };
    V2: (x: any, y: any) => {
        x: any;
        y: any;
    };
    P: (x: any, y: any, z: any, r: any, c: any, a: any) => {
        pos: {
            x: any;
            y: any;
            z: any;
        };
        vel: {
            x: any;
            y: any;
            z: any;
        };
        acc: {
            x: any;
            y: any;
            z: any;
        };
        r: any;
        c: any;
        a: any;
    };
    M: (v: string | any[]) => {
        v: string | any[];
        m: number;
        n: any;
    };
    R: (r: any, g: any, b: any) => string;
    F2: (v: {
        x: number;
        y: number;
    }, d: {
        x: number;
        y: number;
    }) => number;
    A2: (v: {
        y: number;
        x: number;
    }, d: {
        y: number;
        x: number;
    }) => number;
    F3: (v: {
        x: number;
        y: number;
        z: number;
    }, d: {
        x: number;
        y: number;
        z: number;
    }) => number;
    A3: (v: {
        y: number;
        x: number;
    }, d: {
        y: number;
        x: number;
    }) => number;
    cwt: (x: number, y: number, t: number) => {
        x: any;
        y: any;
    };
    cwt3: (x: number, y: number, z: any, t: number) => {
        x: any;
        y: any;
        z: any;
    };
    madd: (a: {
        m: number;
        n: number;
        v: any;
    }, b: any) => {
        v: string | any[];
        m: number;
        n: any;
    };
    msub: (a: {
        m: number;
        n: number;
        v: any;
    }, b: {
        v: any;
    }) => {
        v: string | any[];
        m: number;
        n: any;
    };
    mmul: (a: {
        m: number;
        n: number;
        v: any;
    }, b: {
        n: number;
        v: any;
    }) => {
        v: string | any[];
        m: number;
        n: any;
    };
    mdiv: (a: {
        m: number;
        n: number;
        v: any;
    }, b: {
        v: any;
    }) => {
        v: string | any[];
        m: number;
        n: any;
    };
    mzeros: (m: number, n: number) => any;
    mones: (m: number, n: number) => any;
    mrand: (m: number, n: number) => any;
    mfill: (m: number, n: number, v: any) => any;
    mcopy: (a: any) => {
        v: string | any[];
        m: number;
        n: any;
    };
    mrow: (a: {
        v: {
            [x: string]: any;
        };
    }, i: string | number) => any;
    mcol: (a: {
        m: number;
        v: any;
    }, j: string | number) => any[];
    vadd: (a: string | any[], b: any[]) => any[];
    vsub: (a: string | any[], b: any) => number[];
    vmul: (a: string | any[], b: any) => number[];
    vdiv: (a: string | any[], b: any) => number[];
    vdot: (a: string | any[], b: any) => number;
    vcross: (a: any, b: any) => number[];
    vnorm: (a: any) => number;
    vunit: (a: string | any[]) => number[];
    vcopy: (a: string | any[]) => any[];
    pgrav: (m1: number, m2: number, r: number) => number;
    electrostatic: (q1: number, q2: number, r: number) => number;
    gline: (x1: number, y1: number, x2: number, y2: number) => {
        m: number;
        b: number;
    };
    gline2: (x1: number, y1: number, m: number) => {
        m: number;
        b: number;
    };
    gline3: (x1: number, y1: number, x2: number, y2: number) => {
        m: number;
        b: number;
    };
    bounds: (x: any, y: any, w: any, h: any) => {
        x1: any;
        y1: any;
        x2: any;
        y2: any;
    };
    gintersect: (x1: any, y1: any, x2: any, y2: any, x3: any, y3: any, x4: any, y4: any) => {
        x: number;
        y: number;
    };
    rintersect: (x1: any, y1: any, x2: any, y2: any, x3: number, y3: number, x4: number, y4: number) => {
        x: number;
        y: number;
    } | null;
    raytrace: (x1: number, y1: number, x2: any, y2: any, walls: string | any[]) => {
        x: any;
        y: any;
        d: number;
    };
    rnd: (min: number, max: number) => number;
    rRr: (max: number) => number;
};
export default funcs;
