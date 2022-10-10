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

import {
  tObject,
  tPoint,
  tLine,
  tMesh,
  tMaterial,
  tPlane,
  tSphere,
  tCube,
  tLight,
  tCamera,
  tScene,
  tRenderer,
} from "./utility-classes";
import m from "./math-functions";
import funcs from "./utility-functions";

class ScriptCanvas extends HTMLCanvasElement {
  // called to inspect which apptributes to listen to
  static get observedAttributes() {
    return ["script", "width", "height", "paused", "active"];
  }

  _scriptInterval: any = null;
  _context: any = null;
  _paused: boolean = false;
  _active: boolean = true;
  _script: any = null;
  _fps: number = 60;
  _scriptFunction: any = null;
  _lastUpdate: number = 0;
  _startTime: number = 0;

  // fps meter overlay
	delta : any
	coef: any
	etn : any
	GR: any
	GRV: any
	stack: any
	stackAverage: any
	total = 0
  prev = 0
	c = this
	r: any
	x: any
	y: any
	pals: any
  palVals: any
  di = 0;
  raf: any
  totalAverage: any;
  range: any;

  overlayVisible: boolean = true;

  // webcomponent constructor
  constructor() {
    // Always call super first in constructor
    super();

    // setup the variables
    this.setupVariables();

    // setup the overlay variables
    this.setupOverlayVariables();

    // size the canvas to the width and height of the canvas element
    this._scriptRunner = this._scriptRunner.bind(this);
  }

  connectedCallback() {
  }

  disconnectedCallback() {
    if (this._scriptInterval) {
      clearTimeout(this._scriptInterval);
      this._scriptInterval = undefined;
    }
  }

  attributeChangedCallback(name: string, _oldValue: any, newValue: boolean) {
    if (name === "script") {
      if (this._scriptInterval) {
        clearTimeout(this._scriptInterval);
        this._scriptInterval = undefined;
        this._context = undefined;
      }
      if (newValue) {
        this.setScript(newValue);
        this._paused = false;
        this._active = true;
        this._startTime = Date.now();

        this.startScriptRunner();
      }
    } else if (name == "paused") {
      this._paused = newValue;
    } else if (name == "active") {
      this._active = newValue;
    } else if (name === 'fps-overlay') {
      this.overlayVisible = newValue;
    }
  }

  startScriptRunner() {
    this._scriptInterval = setTimeout(this._scriptRunner, 0);
  }

  setScript(s: any) {
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

      this.startScriptRunner();
    } else {
      if (this._scriptInterval) {
        clearTimeout(this._scriptInterval);
        this._scriptInterval = undefined;
      }
      if (this._context) {
        this._context = undefined;
      }
    }
  }

  setupVariables() {
    this._active = false; // set the active state to false
    this._paused = false; // set the paused state to false
    this._fps = 60; // set the fps to 60
    this._script = null; // set the script to null
    this._context = undefined;
  }

  setupOverlayVariables() {
    this.delta = 180 / this._fps
    this.coef = 1.02
    this.etn = 1000 / this._fps * this.coef
    this.GR = Math.PI / 180
    this.GRV = this.GR * this.delta
    this.stack = new Array(this._fps)
    this.stackAverage = new Array(this._fps)
    this.total = 0
    this.c = this
    this.r = this.width > this.height ? this.height/1.5 : this.width/1.5
    this.x = this.width/10
    this.y = this.height/10
    this.pals = ['this.green', 'yellow', 'red']
    this.palVals = [this._fps/100*8, this._fps/100*8, this._fps/100*8]
    this.di = 0;
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
    const wasActive = this._active;
    this._active = true;
    this._paused = false;
    if (!wasActive) {
      this.startScriptRunner();
    }
  }

  createContext(): any {
    const c = this;
    const x = c.getContext("2d");
    if(!x) return;

    const classes = {
      tObject,
      tPoint,
      tLine,
      tMesh,
      tMaterial,
      tPlane,
      tSphere,
      tCube,
      tLight,
      tCamera,
      tScene,
      tRenderer,
    };


    const canvasFuncs = {
      bp: x.beginPath,
      cp: x.closePath,
      f: x.fill,
      fs: x.fillStyle,
      fR: x.fillRect,
      lT: x.lineTo,
      mT: x.moveTo,
      st: x.stroke,
      sS: x.strokeStyle,
      sR: x.strokeRect,
      sT: x.strokeText,
      U: (x:any,y:any,x1:any,y1:any,c:any) => {
        x.strokeStyle = c
        x.beginPath()
        x.moveTo(x,y)
        x.lineTo(x1,y1)
        x.stroke()
      }
    };
  
    return { ...m, ...canvasFuncs, ...classes, ...funcs, c, x, t: 0 };
  }

  _scriptRunner() {
    // if not active, return after cleaning up interval if needed
    if (!this._active) {

      if(this._scriptInterval) {
        clearTimeout(this._scriptInterval);
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

      //const elapsed = Date.now() - this._startTime;
      if(this.overlayVisible) {
        this.stack.push(new Date().getTime() - this.prev)
        if(this.stack.length > 60) this.stack.shift();
        this.prev = new Date().getTime();
        this.drawOverlay();
      }

      // increment the time
      this._context.t += 0.01// (new Date().getTime() - this.prev) / 1000
      this._lastUpdate = Date.now();
      setTimeout(() => this._scriptRunner(), this.getPauseAmount());

    } catch (e:any) {

      clearTimeout(this._scriptInterval);
      this._scriptInterval = undefined;
      this._context = undefined;
      throw new Error(`invalid script: ${e.message}`);

    }
  }

  // get the amount of time to pause until the next frame
  getPauseAmount() {
    const now = Date.now();
    const elapsed = now - this._lastUpdate;
    const pause = 1000 / this._fps - elapsed;
    return pause > 0 ? pause / 1000 : 0;
  }

  drawOverlay() {
    var ctx = this.getContext("2d");
    if (!ctx) return;

    // draw the sparkline chart
    var path = new Path2D();
    path.rect(this.x + 10, this.y - 10, 150, 20);
    ctx.fillStyle = "#fff";
    ctx.fill(path);
    ctx.strokeStyle = "#000";
    ctx.stroke(path);

    // draw the current fps value
    ctx.font = "10px arial";
    ctx.fillStyle = "black";
    ctx.fillText(this.stack[this.stack.length - 1].toFixed(2) + '', this.x + 120, this.y + 5);

    // draw the sparkline chart
    var path = new Path2D();
    path.moveTo(this.x + 10, this.y + 10);
    if(this.stack.length>=this._fps) for (var i = 0; i < this.stack.length; i++) {
      path.lineTo(this.x + 10 + i * (100/this.stack.length), 10 + this.y + (100/this.stack.length) - this.stack[i] / 2);
    }
    ctx.strokeStyle = "blue";
    ctx.stroke(path);
	}
}
customElements.define("script-canvas", ScriptCanvas, {
  extends: "canvas",
});

export default ScriptCanvas;
