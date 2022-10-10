const funcs = {
    V3: function V3(x, y, z) {
        return { x, y, z };
    },
    V2: function V2(x, y) {
        return { x, y };
    },
    P: function P(x, y, z, r, c, a) {
        return {
            pos: funcs.V3(x, y, z),
            vel: funcs.V3(0, 0, 0),
            acc: funcs.V3(0, 0, 0),
            r,
            c,
            a,
        };
    },
    M: function M(v) {
        return { v, m: v.length, n: v[0].length };
    },
    R: function R(r, g, b) {
        return `rgba(${r},${g},${b})`;
    },
    F2: function F2(v, d) {
        return Math.sqrt(Math.pow(v.x - d.x, 2) + Math.pow(v.y - d.y, 2));
    },
    A2: function A2(v, d) {
        return Math.atan2(v.y - d.y, v.x - d.x);
    },
    F3: function F3(v, d) {
        return Math.sqrt(Math.pow(v.x - d.x, 2) + Math.pow(v.y - d.y, 2) + Math.pow(v.z - d.z, 2));
    },
    A3: function A3(v, d) {
        return Math.atan2(v.y - d.y, v.x - d.x);
    },
    cwt: function cwt(x, y, t) {
        return funcs.V2(x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t));
    },
    cwt3: function cwt3(x, y, z, t) {
        return funcs.V3(x * Math.cos(t) - y * Math.sin(t), x * Math.sin(t) + y * Math.cos(t), z);
    },
    // matrix functions - prefix with m
    madd: function madd(a, b) {
        const c = funcs.M(funcs.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
            for (let j = 0; j < a.n; j++) {
                c.v[i][j] = a.v[i][j] + b.v[i][j];
            }
        }
        return c;
    },
    msub: function msub(a, b) {
        const c = funcs.M(funcs.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
            for (let j = 0; j < a.n; j++) {
                c.v[i][j] = a.v[i][j] - b.v[i][j];
            }
        }
        return c;
    },
    mmul: function mmul(a, b) {
        const c = funcs.M(funcs.mzeros(a.m, b.n));
        for (let i = 0; i < a.m; i++) {
            for (let j = 0; j < b.n; j++) {
                for (let k = 0; k < a.n; k++) {
                    c.v[i][j] += a.v[i][k] * b.v[k][j];
                }
            }
        }
        return c;
    },
    mdiv: function mdiv(a, b) {
        const c = funcs.M(funcs.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
            for (let j = 0; j < a.n; j++) {
                c.v[i][j] = a.v[i][j] / b.v[i][j];
            }
        }
        return c;
    },
    mzeros: function mzeros(m, n) {
        const a = [];
        for (let i = 0; i < m; i++) {
            a[i] = [];
            for (let j = 0; j < n; j++) {
                a[i][j] = 0;
            }
        }
        return a;
    },
    mones: function mones(m, n) {
        const a = [];
        for (let i = 0; i < m; i++) {
            a[i] = [];
            for (let j = 0; j < n; j++) {
                a[i][j] = 1;
            }
        }
        return a;
    },
    mrand: function mrand(m, n) {
        const a = [];
        for (let i = 0; i < m; i++) {
            a[i] = [];
            for (let j = 0; j < n; j++) {
                a[i][j] = Math.random();
            }
        }
        return a;
    },
    mfill: function mfill(m, n, v) {
        const a = [];
        for (let i = 0; i < m; i++) {
            a[i] = [];
            for (let j = 0; j < n; j++) {
                a[i][j] = v;
            }
        }
        return a;
    },
    mcopy: function mcopy(a) {
        const b = funcs.M(funcs.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
            for (let j = 0; j < a.n; j++) {
                b.v[i][j] = a.v[i][j];
            }
        }
        return b;
    },
    mrow: function mrow(a, i) {
        return a.v[i];
    },
    mcol: function mcol(a, j) {
        const c = [];
        for (let i = 0; i < a.m; i++) {
            c[i] = a.v[i][j];
        }
        return c;
    },
    // vector functions - prefix with v
    vadd: function vadd(a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i] + b[i];
        }
        return c;
    },
    vsub: function vsub(a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i] - b[i];
        }
        return c;
    },
    vmul: function vmul(a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i] * b[i];
        }
        return c;
    },
    vdiv: function vdiv(a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i] / b[i];
        }
        return c;
    },
    vdot: function vdot(a, b) {
        let c = 0;
        for (let i = 0; i < a.length; i++) {
            c += a[i] * b[i];
        }
        return c;
    },
    vcross: function vcross(a, b) {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0],
        ];
    },
    vnorm: function vnorm(a) {
        return Math.sqrt(funcs.vdot(a, a));
    },
    vunit: function vunit(a) {
        const c = [];
        const n = funcs.vnorm(a);
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i] / n;
        }
        return c;
    },
    vcopy: function vcopy(a) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
            c[i] = a[i];
        }
        return c;
    },
    // physics functions - prefix with p
    pgrav: function pgrav(m1, m2, r) {
        const G = 6.673e-11;
        return (G * m1 * m2) / (r * r);
    },
    electrostatic: function electrostatic(q1, q2, r) {
        const k = 8.99e9;
        return (k * q1 * q2) / (r * r);
    },
    // geometry functions - prefix with g
    gline: function gline(x1, y1, x2, y2) {
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        return { m, b };
    },
    gline2: function gline2(x1, y1, m) {
        const b = y1 - m * x1;
        return { m, b };
    },
    gline3: function gline3(x1, y1, x2, y2) {
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        return { m, b };
    },
    bounds: function bounds(x, y, w, h) {
        return {
            x1: x,
            y1: y,
            x2: x + w,
            y2: y + h,
        };
    },
    gintersect: function gintersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        const l1 = funcs.gline(x1, y1, x2, y2);
        const l2 = funcs.gline(x3, y3, x4, y4);
        const x = (l2.b - l1.b) / (l1.m - l2.m);
        const y = l1.m * x + l1.b;
        return { x, y };
    },
    // raytrace functions - prefix with r
    rintersect: function rintersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        const l1 = funcs.gline(x1, y1, x2, y2);
        const l2 = funcs.gline(x3, y3, x4, y4);
        const x = (l2.b - l1.b) / (l1.m - l2.m);
        const y = l1.m * x + l1.b;
        if (x >= x3 && x <= x4 && y >= y3 && y <= y4) {
            return { x, y };
        }
        return null;
    },
    raytrace: function raytrace(x1, y1, x2, y2, walls) {
        let x = x2;
        let y = y2;
        let d = 0;
        let i = 0;
        let p = null;
        while (i < walls.length) {
            p = funcs.rintersect(x1, y1, x2, y2, walls[i].x1, walls[i].y1, walls[i].x2, walls[i].y2);
            if (p) {
                x = p.x;
                y = p.y;
                d = Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
                break;
            }
            i++;
        }
        return { x, y, d };
    },
    rnd: function rnd(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    rRr: function rR(max) {
        return Math.floor(Math.random() * (max + 1));
    },
};
export default funcs;
