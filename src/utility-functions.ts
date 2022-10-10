const funcs = {
  V3: function V3(x: any, y: any, z: any) {
    return { x, y, z };
  }, // 3d vector
  V2: function V2(x: any, y: any) {
    return { x, y };
  }, // 2d vector
  P: function P(x: any, y: any, z: any, r: any, c: any, a: any) {
    return {
      pos: funcs.V3(x, y, z),
      vel: funcs.V3(0, 0, 0),
      acc: funcs.V3(0, 0, 0),
      r,
      c,
      a,
    };
  }, // particle
  M: function M(v: string | any[]) {
    return { v, m: v.length, n: v[0].length };
  }, // matrix
  R: function R(r: any, g: any, b: any) {
    return `rgba(${r},${g},${b})`;
  }, // rgb
  F2: function F2(v: { x: number; y: number }, d: { x: number; y: number }) {
    return Math.sqrt(Math.pow(v.x - d.x, 2) + Math.pow(v.y - d.y, 2));
  }, // distance between 2d vectors
  A2: function A2(v: { y: number; x: number }, d: { y: number; x: number }) {
    return Math.atan2(v.y - d.y, v.x - d.x);
  }, // angle between 2d vectors
  F3: function F3(
    v: { x: number; y: number; z: number },
    d: { x: number; y: number; z: number }
  ) {
    return Math.sqrt(
      Math.pow(v.x - d.x, 2) + Math.pow(v.y - d.y, 2) + Math.pow(v.z - d.z, 2)
    );
  }, // distance between 3d vectors
  A3: function A3(v: { y: number; x: number }, d: { y: number; x: number }) {
    return Math.atan2(v.y - d.y, v.x - d.x);
  }, // angle between 3d vectors
  cwt: function cwt(x: number, y: number, t: number) {
    return funcs.V2(
      x * Math.cos(t) - y * Math.sin(t),
      x * Math.sin(t) + y * Math.cos(t)
    );
  }, // rotate 2d vector
  cwt3: function cwt3(x: number, y: number, z: any, t: number) {
    return funcs.V3(
      x * Math.cos(t) - y * Math.sin(t),
      x * Math.sin(t) + y * Math.cos(t),
      z
    );
  }, // rotate 3d vector
  // matrix functions - prefix with m
  madd: function madd(a: { m: number; n: number; v: any }, b: any) {
    const c = funcs.M(funcs.mzeros(a.m, a.n));
    for (let i = 0; i < a.m; i++) {
      for (let j = 0; j < a.n; j++) {
        c.v[i][j] = a.v[i][j] + b.v[i][j];
      }
    }
    return c;
  }, // add 2 matrices
  msub: function msub(a: { m: number; n: number; v: any }, b: { v: any }) {
    const c = funcs.M(funcs.mzeros(a.m, a.n));
    for (let i = 0; i < a.m; i++) {
      for (let j = 0; j < a.n; j++) {
        c.v[i][j] = a.v[i][j] - b.v[i][j];
      }
    }
    return c;
  }, // subtract 2 matrices
  mmul: function mmul(
    a: { m: number; n: number; v: any },
    b: { n: number; v: any }
  ) {
    const c = funcs.M(funcs.mzeros(a.m, b.n));
    for (let i = 0; i < a.m; i++) {
      for (let j = 0; j < b.n; j++) {
        for (let k = 0; k < a.n; k++) {
          c.v[i][j] += a.v[i][k] * b.v[k][j];
        }
      }
    }
    return c;
  }, // multiply 2 matrices
  mdiv: function mdiv(a: { m: number; n: number; v: any }, b: { v: any }) {
    const c = funcs.M(funcs.mzeros(a.m, a.n));
    for (let i = 0; i < a.m; i++) {
      for (let j = 0; j < a.n; j++) {
        c.v[i][j] = a.v[i][j] / b.v[i][j];
      }
    }
    return c;
  }, // divide 2 matrices
  mzeros: function mzeros(m: number, n: number) {
    const a: any = [];
    for (let i = 0; i < m; i++) {
      a[i] = [];
      for (let j = 0; j < n; j++) {
        a[i][j] = 0;
      }
    }
    return a;
  }, // create a matrix of zeros
  mones: function mones(m: number, n: number) {
    const a: any = [];
    for (let i = 0; i < m; i++) {
      a[i] = [];
      for (let j = 0; j < n; j++) {
        a[i][j] = 1;
      }
    }
    return a;
  }, // create a matrix of ones
  mrand: function mrand(m: number, n: number) {
    const a: any = [];
    for (let i = 0; i < m; i++) {
      a[i] = [];
      for (let j = 0; j < n; j++) {
        a[i][j] = Math.random();
      }
    }
    return a;
  }, // create a matrix of random numbers
  mfill: function mfill(m: number, n: number, v: any) {
    const a: any = [];
    for (let i = 0; i < m; i++) {
      a[i] = [];
      for (let j = 0; j < n; j++) {
        a[i][j] = v;
      }
    }
    return a;
  }, // create a matrix of a single value
  mcopy: function mcopy(a: any) {
    const b = funcs.M(funcs.mzeros(a.m, a.n));
    for (let i = 0; i < a.m; i++) {
      for (let j = 0; j < a.n; j++) {
        b.v[i][j] = a.v[i][j];
      }
    }
    return b;
  }, // copy a matrix
  mrow: function mrow(a: { v: { [x: string]: any } }, i: string | number) {
    return a.v[i];
  }, // get a row from a matrix
  mcol: function mcol(a: { m: number; v: any }, j: string | number) {
    const c = [];
    for (let i = 0; i < a.m; i++) {
      c[i] = a.v[i][j];
    }
    return c;
  }, // get a column from a matrix
  // vector functions - prefix with v
  vadd: function vadd(a: string | any[], b: any[]) {
    const c = [];
    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] + b[i];
    }
    return c;
  }, // add 2 vectors
  vsub: function vsub(a: string | any[], b: any) {
    const c = [];
    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] - b[i];
    }
    return c;
  }, // subtract 2 vectors
  vmul: function vmul(a: string | any[], b: any) {
    const c = [];
    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] * b[i];
    }
    return c;
  }, // multiply 2 vectors
  vdiv: function vdiv(a: string | any[], b: any) {
    const c = [];
    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] / b[i];
    }
    return c;
  }, // divide 2 vectors
  vdot: function vdot(a: string | any[], b: any) {
    let c = 0;
    for (let i = 0; i < a.length; i++) {
      c += a[i] * b[i];
    }
    return c;
  }, // dot product of 2 vectors
  vcross: function vcross(a: any, b: any) {
    return [
      a[1] * b[2] - a[2] * b[1],
      a[2] * b[0] - a[0] * b[2],
      a[0] * b[1] - a[1] * b[0],
    ];
  }, // cross product of 2 vectors
  vnorm: function vnorm(a: any) {
    return Math.sqrt(funcs.vdot(a, a));
  }, // norm of a vector
  vunit: function vunit(a: string | any[]) {
    const c = [];
    const n = funcs.vnorm(a);
    for (let i = 0; i < a.length; i++) {
      c[i] = a[i] / n;
    }
    return c;
  }, // unit vector
  vcopy: function vcopy(a: string | any[]) {
    const c = [];
    for (let i = 0; i < a.length; i++) {
      c[i] = a[i];
    }
    return c;
  }, // copy a vector
  // physics functions - prefix with p
  pgrav: function pgrav(m1: number, m2: number, r: number) {
    const G = 6.673e-11;
    return (G * m1 * m2) / (r * r);
  }, // gravitational force
  electrostatic: function electrostatic(q1: number, q2: number, r: number) {
    const k = 8.99e9;
    return (k * q1 * q2) / (r * r);
  }, // electrostatic force
  // geometry functions - prefix with g
  gline: function gline(x1: number, y1: number, x2: number, y2: number) {
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    return { m, b };
  }, // line from 2 points
  gline2: function gline2(x1: number, y1: number, m: number) {
    const b = y1 - m * x1;
    return { m, b };
  }, // line from point and slope
  gline3: function gline3(x1: number, y1: number, x2: number, y2: number) {
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    return { m, b };
  },
  bounds: function bounds(x: any, y: any, w: any, h: any) {
    return {
      x1: x,
      y1: y,
      x2: x + w,
      y2: y + h,
    };
  }, // bounds of a rectangle
  gintersect: function gintersect(
    x1: any,
    y1: any,
    x2: any,
    y2: any,
    x3: any,
    y3: any,
    x4: any,
    y4: any
  ) {
    const l1 = funcs.gline(x1, y1, x2, y2);
    const l2 = funcs.gline(x3, y3, x4, y4);
    const x = (l2.b - l1.b) / (l1.m - l2.m);
    const y = l1.m * x + l1.b;
    return { x, y };
  }, // intersection of 2 lines
  // raytrace functions - prefix with r
  rintersect: function rintersect(
    x1: any,
    y1: any,
    x2: any,
    y2: any,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    const l1 = funcs.gline(x1, y1, x2, y2);
    const l2 = funcs.gline(x3, y3, x4, y4);
    const x = (l2.b - l1.b) / (l1.m - l2.m);
    const y = l1.m * x + l1.b;
    if (x >= x3 && x <= x4 && y >= y3 && y <= y4) {
      return { x, y };
    }
    return null;
  }, // intersection of 2 lines
  raytrace: function raytrace(
    x1: number,
    y1: number,
    x2: any,
    y2: any,
    walls: string | any[]
  ) {
    let x = x2;
    let y = y2;
    let d = 0;
    let i = 0;
    let p = null;
    while (i < walls.length) {
      p = funcs.rintersect(
        x1,
        y1,
        x2,
        y2,
        walls[i].x1,
        walls[i].y1,
        walls[i].x2,
        walls[i].y2
      );
      if (p) {
        x = p.x;
        y = p.y;
        d = Math.sqrt((x - x1) * (x - x1) + (y - y1) * (y - y1));
        break;
      }
      i++;
    }
    return { x, y, d };
  }, // raytrace / raytrace
  rnd: function rnd(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }, // random number
  rRr: function rR(max: number) {
    return Math.floor(Math.random() * (max + 1));
  },
};

export default funcs;
