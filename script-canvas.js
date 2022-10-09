// written by Sebastian Schepis
// License: MIT
//
// this canvas webcomponent runs dwitter-like scripts.
//
// The element takes a 'src' attribute which is the script to run. The script can be in text format or passed as a function.
// The script also has an 'fps' attribute which is the number of frames per second to run the script at. The default
// is 60. The script also has a 'active' property which is a boolean that can be set to true or false to start and stop the
// script. The script also has a 'paused' property which is a boolean that can be set to true or false to pause and unpause
// the script. The script also has a 'reset' method which can be called to reset the script. The script also has a 'clear'
// method which can  be called to clear the canvas. The script also has a 'canvas' property which is the canvasbelement that
// the script is running on. The script also has a 'context' property which is the canvas context that the script is running on.
// The script also has a 'width' property which is the width of the canvas. The script also has a 'height' property which is
// the height of the canvas. The script also has a 'time' property which is the time in seconds since the script
// started running.
//
export default class ScriptCanvas extends HTMLCanvasElement {
  // called to inspect which apptributes to listen to
  static get observedAttributes() {
    return ["script", "width", "height", "paused", "active"];
  }

  // webcomponent constructor
  constructor() {
    // Always call super first in constructor
    super();

    // setup the variables
    this.setupVariables();

    // size the canvas to the width and height of the canvas element
    this._scriptRunner = this._scriptRunner.bind(this);
  }

  disconnectedCallback() {
    if (this._scriptInterval) {
      clearInterval(this._scriptInterval);
      this._scriptInterval = undefined;
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "script") {
      if (this._scriptInterval) {
        clearInterval(this._scriptInterval);
        this._scriptInterval = undefined;
        this._context = undefined;
      }
      if (newValue) {
        this.setScript(newValue);
        this._paused = false;
        this._active = true;
        this._scriptInterval = setInterval(this._scriptRunner, 1000 / this.fps);
      }
    } else if (name == "paused") {
      this._paused = newValue;
    } else if (name == "active") {
      this._active = newValue;
    }
  }

  setScript(s) {
    this._script = s;
    if (this._script) {
      this._paused = false;
      this._active = true;
      if (typeof this._script == "function") {
        this._scriptFunction = this._script;
      } else {
        this._context = this.createContext();
        this._scriptFunction = new Function(
          ...Object.keys(this._context),
          this._script
        );
      }
      this._scriptInterval = setInterval(this._scriptRunner, 1000 / this._fps);
    } else {
      if (this._scriptInterval) {
        clearInterval(this._scriptInterval);
        this._scriptInterval = undefined;
      }
      if (this._context) {
        this._context = undefined;
      }
    }
  }

  setupVariables() {
    this._time = 0; // time in seconds since the script started running
    this._active = false; // set the active state to false
    this._paused = false; // set the paused state to false
    this._fps = 2; // set the fps to 60
    this._script = null; // set the script to null
    this._context = undefined;
  }

  setupContext() {
    this._context = !this._context ? this.createContext() : this._context;
  }

  pause() {
    this._paused = true;
  }

  resume() {
    this._paused = false;
  }

  stop() {
    this._active = false;
    this._paused = true;
  }

  start() {

  }

  createContext() {
    const c = this;
    const x = c.getContext("2d");
    const __ = {
      V3: function (x, y, z) {
        return { x, y, z };
      }, // 3d vector
      V2: function (x, y) {
        return { x, y };
      }, // 2d vector
      P: function (x, y, z, r, c, a) {
        return {
          pos: _.V3(x, y, z),
          vel: _.V3(0, 0, 0),
          acc: _.V3(0, 0, 0),
          r,
          c,
          a,
        };
      }, // particle
      M: function (v) {
        return { v, m: v.length, n: v[0].length };
      }, // matrix
      R: function (r, g, b) {
        return `rgba(${r},${g},${b})`;
      }, // rgb
      F2: function (v, d) {
        return Math.sqrt(Math.pow(v.x - d.x, 2) + Math.pow(v.y - d.y, 2));
      }, // distance between 2d vectors
      A2: function (v, d) {
        return Math.atan2(v.y - d.y, v.x - d.x);
      }, // angle between 2d vectors
      F3: function (v, d) {
        return Math.sqrt(
          Math.pow(v.x - d.x, 2) +
            Math.pow(v.y - d.y, 2) +
            Math.pow(v.z - d.z, 2)
        );
      }, // distance between 3d vectors
      A3: function (v, d) {
        return Math.atan2(v.y - d.y, v.x - d.x);
      }, // angle between 3d vectors
      cwt: function (x, y, t) {
        return _.V2(
          x * Math.cos(t) - y * Math.sin(t),
          x * Math.sin(t) + y * Math.cos(t)
        );
      }, // rotate 2d vector
      cwt3: function (x, y, z, t) {
        return _.V3(
          x * Math.cos(t) - y * Math.sin(t),
          x * Math.sin(t) + y * Math.cos(t),
          z
        );
      }, // rotate 3d vector
      // matrix functions - prefix with m
      madd: function (a, b) {
        const c = _.M(_.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
          for (let j = 0; j < a.n; j++) {
            c.v[i][j] = a.v[i][j] + b.v[i][j];
          }
        }
        return c;
      }, // add 2 matrices
      msub: function (a, b) {
        const c = _.M(_.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
          for (let j = 0; j < a.n; j++) {
            c.v[i][j] = a.v[i][j] - b.v[i][j];
          }
        }
        return c;
      }, // subtract 2 matrices
      mmul: function (a, b) {
        const c = _.M(_.mzeros(a.m, b.n));
        for (let i = 0; i < a.m; i++) {
          for (let j = 0; j < b.n; j++) {
            for (let k = 0; k < a.n; k++) {
              c.v[i][j] += a.v[i][k] * b.v[k][j];
            }
          }
        }
        return c;
      }, // multiply 2 matrices
      mdiv: function (a, b) {
        const c = _.M(_.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
          for (let j = 0; j < a.n; j++) {
            c.v[i][j] = a.v[i][j] / b.v[i][j];
          }
        }
        return c;
      }, // divide 2 matrices
      mzeros: function (m, n) {
        const a = [];
        for (let i = 0; i < m; i++) {
          a[i] = [];
          for (let j = 0; j < n; j++) {
            a[i][j] = 0;
          }
        }
        return a;
      }, // create a matrix of zeros
      mones: function (m, n) {
        const a = [];
        for (let i = 0; i < m; i++) {
          a[i] = [];
          for (let j = 0; j < n; j++) {
            a[i][j] = 1;
          }
        }
        return a;
      }, // create a matrix of ones
      mrand: function (m, n) {
        const a = [];
        for (let i = 0; i < m; i++) {
          a[i] = [];
          for (let j = 0; j < n; j++) {
            a[i][j] = Math.random();
          }
        }
        return a;
      }, // create a matrix of random numbers
      mfill: function (m, n, v) {
        const a = [];
        for (let i = 0; i < m; i++) {
          a[i] = [];
          for (let j = 0; j < n; j++) {
            a[i][j] = v;
          }
        }
        return a;
      }, // create a matrix of a single value
      mcopy: function (a) {
        const b = _.M(_.mzeros(a.m, a.n));
        for (let i = 0; i < a.m; i++) {
          for (let j = 0; j < a.n; j++) {
            b.v[i][j] = a.v[i][j];
          }
        }
        return b;
      }, // copy a matrix
      mrow: function (a, i) {
        return a.v[i];
      }, // get a row from a matrix
      mcol: function (a, j) {
        const c = [];
        for (let i = 0; i < a.m; i++) {
          c[i] = a.v[i][j];
        }
        return c;
      }, // get a column from a matrix
      // vector functions - prefix with v
      vadd: function (a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
          c[i] = a[i] + b[i];
        }
        return c;
      }, // add 2 vectors
      vsub: function (a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
          c[i] = a[i] - b[i];
        }
        return c;
      }, // subtract 2 vectors
      vmul: function (a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
          c[i] = a[i] * b[i];
        }
        return c;
      }, // multiply 2 vectors
      vdiv: function (a, b) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
          c[i] = a[i] / b[i];
        }
        return c;
      }, // divide 2 vectors
      vdot: function (a, b) {
        let c = 0;
        for (let i = 0; i < a.length; i++) {
          c += a[i] * b[i];
        }
        return c;
      }, // dot product of 2 vectors
      vcross: function (a, b) {
        return [
          a[1] * b[2] - a[2] * b[1],
          a[2] * b[0] - a[0] * b[2],
          a[0] * b[1] - a[1] * b[0],
        ];
      }, // cross product of 2 vectors
      vnorm: function (a) {
        return Math.sqrt(_.vdot(a, a));
      }, // norm of a vector
      vunit: function (a) {
        const c = [];
        const n = _.vnorm(a);
        for (let i = 0; i < a.length; i++) {
          c[i] = a[i] / n;
        }
        return c;
      }, // unit vector
      vcopy: function (a) {
        const c = [];
        for (let i = 0; i < a.length; i++) {
          c[i] = a[i];
        }
        return c;
      }, // copy a vector
      // physics functions - prefix with p
      pgrav: function (m1, m2, r) {
        const G = 6.673e-11;
        return (G * m1 * m2) / (r * r);
      }, // gravitational force
      electrostatic: function (q1, q2, r) {
        const k = 8.99e9;
        return (k * q1 * q2) / (r * r);
      }, // electrostatic force
      // geometry functions - prefix with g
      gline: function (x1, y1, x2, y2) {
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        return { m, b };
      }, // line from 2 points
      gline2: function (x1, y1, m) {
        const b = y1 - m * x1;
        return { m, b };
      }, // line from point and slope
      gline3: function (x1, y1, x2, y2) {
        const m = (y2 - y1) / (x2 - x1);
        const b = y1 - m * x1;
        return { m, b };
      },
      bounds: function (x, y, w, h) {
        return {
          x1: x,
          y1: y,
          x2: x + w,
          y2: y + h,
        };
      }, // bounds of a rectangle
      gintersect: function (x1, y1, x2, y2, x3, y3, x4, y4) {
        const l1 = _.gline(x1, y1, x2, y2);
        const l2 = _.gline(x3, y3, x4, y4);
        const x = (l2.b - l1.b) / (l1.m - l2.m);
        const y = l1.m * x + l1.b;
        return { x, y };
      }, // intersection of 2 lines
      // raytrace functions - prefix with r
      rintersect: function (x1, y1, x2, y2, x3, y3, x4, y4) {
        const l1 = _.gline(x1, y1, x2, y2);
        const l2 = _.gline(x3, y3, x4, y4);
        const x = (l2.b - l1.b) / (l1.m - l2.m);
        const y = l1.m * x + l1.b;
        if (x >= x3 && x <= x4 && y >= y3 && y <= y4) {
          return { x, y };
        }
        return null;
      }, // intersection of 2 lines
      raytrace: function (x1, y1, x2, y2, walls) {
        const l = _.gline(x1, y1, x2, y2);
        let x = x2;
        let y = y2;
        let d = 0;
        let i = 0;
        let p = null;
        while (i < walls.length) {
          p = _.rintersect(x1, y1, x2, y2, walls[i].x1, walls[i].y1, walls[i].x2, walls[i].y2);
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
      // tiny Object, Mesh, Scene, Renderer, Camera, Light, and Material classes
      tObject: class tObject {
        constructor (x, y, z, w, h, d, rx, ry, rz, sx, sy, sz, c) {
          this.x = x; // x position
          this.y = y; // y position
          this.z = z; // z position
          this.w = w; // width
          this.h = h; // height
          this.d = d; // depth
          this.rx = rx; // x rotation
          this.ry = ry; // y rotation
          this.rz = rz; // z rotation
          this.sx = sx; // x scale
          this.sy = sy; // y scale
          this.sz = sz; // z scale
          this.c = c; // color
        };
      }, // tiny Object class 
      tMesh: class Mesh {
        constructor (vertices, faces, uvs) {
          this.vertices = vertices; // vertices
          this.faces = faces; // faces
          this.uvs = uvs; // uvs
        }
      }, // tiny Mesh class
      tLine: class Line {
        constructor (x1, y1, z1, x2, y2, z2, c) {
          this.x1 = x1; // x position
          this.y1 = y1; // y position
          this.z1 = z1; // z position
          this.x2 = x2; // x position
          this.y2 = y2; // y position
          this.z2 = z2; // z position
          this.c = c; // color
        }
      }, // tiny Line class
      tPoint: class Point {
        constructor (x, y, z, c) {
          this.x = x; // x position
          this.y = y; // y position
          this.z = z; // z position
          this.c = c; // color
        }
      }, // tiny Point class
      tMaterial: class Material {
        constructor (color, texture, emissive, specular, shininess, reflectivity, opacity, transparent) {
          this.color = color; // color
          this.texture = texture; // texture
          this.emissive = emissive; // emissive
          this.specular = specular; // specular
          this.shininess = shininess; // shininess
          this.reflectivity = reflectivity; // reflectivity
          this.opacity = opacity; // opacity
          this.transparent = transparent; // transparent
        }
      }, // tiny Material class
      tPlane: class Plane {
        constructor (x, y, z, w, h, rx, ry, rz, sx, sy, sz, c) {
          this.x = x; // x position
          this.y = y; // y position
          this.z = z; // z position
          this.w = w; // width
          this.h = h; // height
          this.rx = rx; // x rotation
          this.ry = ry; // y rotation
          this.rz = rz; // z rotation
          this.sx = sx; // x scale
          this.sy = sy; // y scale
          this.sz = sz; // z scale
          this.c = c; // color
        }
      }, // tiny Plane class
      tSphere: class Sphere {
        constructor (x, y, z, r, rx, ry, rz, sx, sy, sz, c) {
          this.x = x; // x position
          this.y = y; // y position
          this.z = z; // z position
          this.r = r; // radius
          this.rx = rx; // x rotation
          this.ry = ry; // y rotation
          this.rz = rz; // z rotation
          this.sx = sx; // x scale
          this.sy = sy; // y scale
          this.sz = sz; // z scale
          this.c = c; // color
        }
      }, // tiny Sphere class
      tLight: class Light {
        constructor (x, y, z, color, intensity) {
          this.x = x; // x position
          this.y = y; // y position
          this.z = z; // z position
          this.color = color; // color
          this.intensity = intensity; // intensity
        }
      }, // tiny Light class
      tCamera: class Camera {
        constructor (x, y, z, rx, ry, rz, fov, near, far) {
          this.x = x; // x position
          this.y = y; // y position
          this.z = z; // z position
          this.rx = rx; // x rotation
          this.ry = ry; // y rotation
          this.rz = rz; // z rotation
          this.fov = fov; // field of view
          this.near = near; // near plane
          this.far = far; // far plane
        }
      }, // tiny Camera class
      tScene: class Scene {
        constructor (objects, lights, camera) {
          this.objects = objects; // objects
          this.lights = lights; // lights
          this.camera = camera; // camera
        }
        add (o) { this.objects.push(o); }; // add object
        remove (o) { this.objects.splice(this.objects.indexOf(o), 1); }; // remove object
        addLight (l) { this.lights.push(l); }; // add light
        removeLight (l) { this.lights.splice(this.lights.indexOf(l), 1); }; // remove light
      }, // tiny Scene class
      // basic renderer
      tRenderer: class Renderer { 

        constructor (scene, canvas, width, height) {
          this.scene = scene; // scene
          this.setupCanvas(canvas, width, height);
          this.setupContext();
          this.setupBuffers();
          this.setupTextures();
          this.setupShaders();
        }

        setupCanvas(canvas, width, height) {
          this.canvas = canvas;
          this.canvas.width = width;
          this.canvas.height = height;
        } // setup canvas

        setupContext() {
          this.ctx = this.canvas.getContext('2d');
        } // setup context

        setupBuffers() {
          this.buffers = {
            position: this.ctx.createBuffer(),
            normal: this.ctx.createBuffer(),
            uv: this.ctx.createBuffer(),
            index: this.ctx.createBuffer()
          };
        } // setup buffers
      
        setupTextures() {
          this.textures = [];
        } // setup textures
        
        setupShaders() {
          this.shaders = {
            vertex: `
              attribute vec3 aVertexPosition;
              attribute vec3 aVertexNormal;
              attribute vec2 aTextureCoord;
              uniform mat4 uMVMatrix;
              uniform mat4 uPMatrix;
              uniform mat3 uNMatrix;
              uniform vec3 uAmbientColor;
              uniform vec3 uLightingDirection;
              uniform vec3 uDirectionalColor;
              uniform bool uUseLighting;
              varying vec2 vTextureCoord;
              varying vec3 vLightWeighting;
              void main(void) {
                gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
                vTextureCoord = aTextureCoord;
                if (!uUseLighting) {
                  vLightWeighting = vec3(1.0, 1.0, 1.0);
                } else {
                  vec3 transformedNormal = uNMatrix * aVertexNormal;
                  float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);
                  vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;
                }
              }
            `,
            fragment: `
              precision mediump float;
              varying vec2 vTextureCoord;
              varying vec3 vLightWeighting;
              uniform sampler2D uSampler;
              uniform bool uUseTextures;
              void main(void) {
                vec4 textureColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
                gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);
              }
            `
          };
        } // setup shaders
      
        clearScene() {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        } // clear scene
        
        fillScene(color) {
          this.ctx.fillStyle = color;
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        } // fill scene
        
        renderObject(object) {
          this.ctx.save();
          this.ctx.translate(object.x, object.y);
          this.ctx.rotate(object.rx);
          this.ctx.scale(object.sx, object.sy);
          this.ctx.fillStyle = object.c;
          this.ctx.fillRect(-object.w / 2, -object.h / 2, object.w, object.h);
          this.ctx.restore();
        } // render object
        
        renderLight() {
          this.ctx.save();
          this.ctx.translate(this.scene.light.x, this.scene.light.y);
          this.ctx.fillStyle = this.scene.light.c;
          this.ctx.fillRect(-5, -5, 10, 10);
          this.ctx.restore();
        } // render light

        renderCamera() {
          this.ctx.save();
          this.ctx.translate(this.scene.camera.x, this.scene.camera.y);
          this.ctx.fillStyle = 'white';
          this.ctx.fillRect(-5, -5, 10, 10);
          this.ctx.restore();
        } // render camera
        
        render(scene) {
          this.clearScene();
          this.fillScene('#000000');
          // rendering order: objects, lights, camera
          // 1. render objects
          for (let i = 0; i < scene.objects.length; i++) {
            this.renderObject(scene.objects[i]);
          }
          // 2. render lights
          for (let i = 0; i < scene.lights.length; i++) {
            this.renderLight(scene.lights[i]);
          }
          // 3. render camera
          this.renderCamera(scene.camera);
        }
      }
    };

    const M = Math,
      a = Math.abs,
      ac = Math.acos,
      acs = Math.acosh,
      as = Math.asin,
      ass = Math.asinh,
      at = Math.atan,
      ats = Math.atanh,
      at2 = Math.atan2,
      cbrt = Math.cbrt,
      ce = Math.ceil,
      clz = Math.clz32,
      C = Math.cos,
      csh = Math.cosh,
      E = Math.exp,
      expm1 = Math.expm1,
      F = Math.floor,
      fr = Math.fround,
      H = Math.hypot,
      imul = Math.imul,
      L = Math.log,
      lp1 = Math.log1p,
      l10 = Math.log10,
      l2 = Math.log2,
      max = Math.max,
      min = Math.min,
      pow = Math.pow,
      R = Math.random,
      ro = Math.round,
      s = Math.sign,
      S = Math.sin,
      sh = Math.sinh,
      Q = Math.sqrt,
      T = Math.tan,
      th = Math.tanh,
      tr = Math.trunc;
    const CNV = {
      bp: x.beginPath,
      cp: x.closePath,
      f: x.fill,
      fs: (x.fillStyle = R(255)),
      fR: x.fillRect,
      lT: x.lineTo,
      mT: x.moveTo,
      sT: x.stroke,
      sS: (x.strokeStyle = R(255)),
      sL: x.strokeLine,
      sR: x.strokeRect,
      sT: x.strokeText
    };
    const m = {
      a,
      ac,
      acs,
      as,
      ass,
      at,
      ats,
      at2,
      cbrt,
      ce,
      clz,
      C,
      csh,
      E,
      expm1,
      F,
      fr,
      H,
      imul,
      L,
      lp1,
      l10,
      l2,
      max,
      min,
      pow,
      R,
      ro,
      s,
      S,
      sh,
      Q,
      T,
      th,
      tr,
      M,
    };
    return { ...m, ...CNV, ...__, c, x, t: 0 };
  }

  _scriptRunner() {
    // if not active, return after cleaning up interval if needed
    if (!this._active) {
      if(this._scriptInterval) {
        clearInterval(this._scriptInterval);
        this._scriptInterval = null;
      }
      return;
    }
    // if paused then just exit the render without touching interval
    if(this._paused) {
      return;
    }

    // setup the context
    this.setupContext();

    try {
      // run the script
      const runInContext = () => {
        this._scriptFunction(...Object.values(this._context));
      };
      runInContext.call(this._context);

      // increment the time
      this._context.t += 0.01;
    } catch (e) {
      clearInterval(this._scriptInterval);
      this._scriptInterval = undefined;
      this._context = undefined;
      throw new Error(`invalid script: ${e.message}`);
    }
  }
}
customElements.define("script-canvas", ScriptCanvas, {
  extends: "canvas",
});
