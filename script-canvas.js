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
    } else if (name == "width") {
      this.width = newValue;
    } else if (name == "height") {
      this.height = newValue;
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

  createContext() {
    const c = this;
    const x = c.getContext("2d");
    const __ = {
      V3: function (x, y, z) {
        return { x, y, z };
      },
      V2: function (x, y) {
        return { x, y };
      },
      P: function (x, y, z, r, c, a) {
        return {
          pos: _.V3(x, y, z),
          vel: _.V3(0, 0, 0),
          acc: _.V3(0, 0, 0),
          r,
          c,
          a,
        };
      },
      M: function (v) {
        return { v, m: v.length, n: v[0].length };
      },
      R: function (r, g, b) {
        return `rgba(${r},${g},${b})`;
      },
      F2: function (v, d) {
        return Math.sqrt(Math.pow(v.x - d.x, 2) + Math.pow(v.y - d.y, 2));
      },
      A2: function (v, d) {
        return Math.atan2(v.y - d.y, v.x - d.x);
      },
      F3: function (v, d) {
        return Math.sqrt(
          Math.pow(v.x - d.x, 2) +
            Math.pow(v.y - d.y, 2) +
            Math.pow(v.z - d.z, 2)
        );
      },
      A3: function (v, d) {
        return Math.atan2(v.y - d.y, v.x - d.x);
      },
      cwt: function (x, y, t) {
        return _.V2(
          x * Math.cos(t) - y * Math.sin(t),
          x * Math.sin(t) + y * Math.cos(t)
        );
      },
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
      cosh = Math.cosh,
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
      fl: x.fillRect,
      fR: x.fillRect,
      lT: x.lineTo,
      mT: x.moveTo,
      sT: x.stroke,
      ss: (x.strokeStyle = R(255)),
      sl: x.strokeRect,
      sr: x.strokeRect,
      st: x.strokeText,
      Ft: x.fillText,
      w: (x.lineWidth = R(10)),
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
      cosh,
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
      S,
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
    if (!this._active || this._paused) {
      return;
    }
    this.setupContext();

    try {
      // run the script
      const runInContext = () => {
        this._scriptFunction(...Object.values(this._context));
      };
      runInContext.call(this._context);

      // increment the time
      this._context.t += 1 / this._fps;
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
