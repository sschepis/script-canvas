export class tObject {
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
  constructor(
    x: any,
    y: any,
    z: any,
    w: any,
    h: any,
    d: any,
    rx: any,
    ry: any,
    rz: any,
    sx: any,
    sy: any,
    sz: any,
    c: any
  ) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.d = d;
    this.rx = rx;
    this.ry = ry;
    this.rz = rz;
    this.sx = sx;
    this.sy = sy;
    this.sz = sz;
    this.color = c;
  }
}

export class tPoint extends tObject {
  constructor(x: any, y: any, z: any, c: any) {
    super(x, y, z, 0, 0, 0, 0, 0, 0, 0, 0, 0, c);
  }
}

export class tLine extends tObject {
  constructor(x1: any, y1: any, z1: any, x2: any, y2: any, z2: any, c: any) {
    super(x1, y1, z1, x2, y2, z2, 0, 0, 0, 0, 0, 0, c);
  }
}

export class tMesh {
  vertices: any[];
  faces: any[];
  uvs: any[];
  constructor(vertices: any, faces: any, uvs: any) {
    this.vertices = vertices; // vertices
    this.faces = faces; // faces
    this.uvs = uvs; // uvs
  }
}

export class tMaterial {
  color: any;
  texture: any;
  emissive: any;
  specular: any;
  shininess: any;
  reflectivity: any;
  opacity: any;
  transparent: any;
  constructor(
    color: any,
    texture: any,
    emissive: any,
    specular: any,
    shininess: any,
    reflectivity: any,
    opacity: any,
    transparent: any
  ) {
    this.color = color; // color
    this.texture = texture; // texture
    this.emissive = emissive; // emissive
    this.specular = specular; // specular
    this.shininess = shininess; // shininess
    this.reflectivity = reflectivity; // reflectivity
    this.opacity = opacity; // opacity
    this.transparent = transparent; // transparent
  }
}

export class tPlane extends tObject {
  constructor(x: any, y: any, z: any, w: any, h: any, c: any) {
    super(x, y, z, w, h, 0, 0, 0, 0, 0, 0, 0, c);
  }
}

export class tSphere extends tObject {
  radius: any;
  constructor(
    x: any,
    y: any,
    z: any,
    r: any,
    rx: any,
    ry: any,
    rz: any,
    sx: any,
    sy: any,
    sz: any,
    c: any,
    radius: any
  ) {
    super(x, y, z, r, 0, 0, rx, ry, rz, sx, sy, sz, c);
    this.radius = radius;
  }
}

export class tCube extends tObject {
  constructor(
    x: any,
    y: any,
    z: any,
    w: any,
    h: any,
    d: any,
    rx: any,
    ry: any,
    rz: any,
    sx: any,
    sy: any,
    sz: any,
    c: any
  ) {
    super(x, y, z, w, h, d, rx, ry, rz, sx, sy, sz, c);
  }
}

export class tLight extends tObject {
  intensity: any;
  constructor(x: any, y: any, z: any, color: any, intensity: any) {
    super(x, y, z, 0, 0, 0, 0, 0, 0, 0, 0, 0, color);
    this.intensity = intensity;
  }
} // tiny Light class
export class tCamera extends tObject {
  fov: any;
  near: any;
  far: any;
  aspect: any;
  constructor(
    x: any,
    y: any,
    z: any,
    rx: any,
    ry: any,
    rz: any,
    fov: any,
    near: any,
    far: any,
    aspect: any
  ) {
    super(x, y, z, 0, 0, 0, rx, ry, rz, 0, 0, 0, 0);
    this.aspect = aspect;
    this.fov = fov; // field of view
    this.near = near; // near plane
    this.far = far; // far plane
    this.aspect = 1; // aspect ratio
  }
}

export class tScene {
  objects: any;
  lights: any;
  camera: any;
  constructor(objects: any, lights: any, camera: any) {
    this.objects = objects; // objects
    this.lights = lights; // lights
    this.camera = camera; // camera
  }
  add(o: any) {
    this.objects.push(o);
  } // add object
  remove(o: any) {
    this.objects.splice(this.objects.indexOf(o), 1);
  } // remove object
  addLight(l: any) {
    this.lights.push(l);
  } // add light
  removeLight(l: any) {
    this.lights.splice(this.lights.indexOf(l), 1);
  } // remove light
} // tiny Scene class
// basic renderer
export class tRenderer {
  scene: any;
  canvas: any;
  ctx: any;
  buffers: any;
  textures: any;
  shaders: any;
  constructor(scene: any, canvas: any, width: any, height: any) {
    this.scene = scene; // scene
    this.canvas = canvas; // canvas
    this.setupCanvas(width, height);
    this.setupContext();
    this.setupBuffers();
    this.setupTextures();
    this.setupShaders();
  }

  setupCanvas(width: any, height: any) {
    this.canvas.width = width;
    this.canvas.height = height;
  } // setup canvas

  setupContext() {
    this.ctx = this.canvas.getContext("2d");
  } // setup context

  setupBuffers() {
    this.buffers = {
      position: this.ctx.createBuffer(),
      normal: this.ctx.createBuffer(),
      uv: this.ctx.createBuffer(),
      index: this.ctx.createBuffer(),
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
        `,
    };
  } // setup shaders

  clearScene() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  } // clear scene

  fillScene(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  } // fill scene

  renderObject(object: {
    x: any;
    y: any;
    rx: any;
    sx: any;
    sy: any;
    c: any;
    w: number;
    h: number;
  }) {
    this.ctx.save();
    this.ctx.translate(object.x, object.y);
    this.ctx.rotate(object.rx);
    this.ctx.scale(object.sx, object.sy);
    this.ctx.fillStyle = object.c;
    this.ctx.fillRect(-object.w / 2, -object.h / 2, object.w, object.h);
    this.ctx.restore();
  } // render object

  renderLight(light: any) {
    this.ctx.save();
    this.ctx.translate(light.x, light.y);
    this.ctx.fillStyle = light.c;
    this.ctx.fillRect(-light.w / 2, -light.h / 2, light.w, light.h);
    this.ctx.restore();
  } // render light

  renderCamera(camera: any) {
    this.ctx.save();
    this.ctx.translate(camera.x, camera.y);
    this.ctx.fillStyle = camera.c;
    this.ctx.fillRect(-camera.w / 2, -camera.h / 2, camera.w, camera.h);
    this.ctx.restore();
  } // render camera

  render(scene: {
    objects: string | any[];
    lights: string | any[];
    camera: any;
  }) {
    this.clearScene();
    this.fillScene("#000000");
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
