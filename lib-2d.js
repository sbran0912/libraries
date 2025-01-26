// Version: 1.0 Stand Februar 2023

// Instanzvariablen des Moduls
const canv = document.querySelector("canvas");
const output = document.querySelector("#output");
const ctx = canv.getContext("2d");
export const color_r = 51
export const color_g = 140
export const color_b = 255
export let mouseX = 0;
export let mouseY = 0;
let mouseStatus = 0;
let loop = true;

/** Init canvas
 * @type {(w: number, h: number) => void}
 * @param w width of canvas
 * @param h height of canvas */
export function init(w, h) {
  canv.width = w;
  canv.height = h;
  ctx.strokeStyle = `RGB(${color_r},${color_g},${color_b})`;   
  ctx.fillStyle = `RGB(${color_r},${color_g},${color_b})`;
  ctx.lineWidth = 1;
  ctx.save();
  canv.addEventListener("mousemove", updMousePos);
  canv.addEventListener("mousedown", setMouseDown);
  canv.addEventListener("mouseup", setMouseUp);
  canv.addEventListener("touchmove", updTouchPos);
  canv.addEventListener("touchstart", setTouchDown);
  canv.addEventListener("touchend", setTouchUp);
}

/** Starts Animation Loop
 * @type {(fnDraw: function) => void}
 * @param fnDraw Callback Function */
export function startAnimation(fnDraw) {
  let draw = fnDraw;
  loop = true;
  let animate = () => {
    draw();
    if (loop) {
      window.requestAnimationFrame(animate);
    }
  };
  window.requestAnimationFrame(animate);
}

/** get width of canvas 
 * @type {() => number} */
export function getWidth() {
  return canv.width;
}

/** get height of canvas 
 * @type {() => number} */
export function getHeight() {
  return canv.height;
}

/** stop looping */
export function noLoop() {
  loop = false;
}

/** update mouse position
 * @type {(e: MouseEvent) => void}  */
function updMousePos(e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
}

/** update status down position */
function setMouseDown() {
  mouseStatus = 1;
}

/** update status up position */
function setMouseUp() {
  mouseStatus = 2;
}

/** update touch position
 * @type {(e: TouchEvent) => void} */
function updTouchPos(e) {
  e.preventDefault();
  //@ts-ignore
  mouseX = e.targetTouches[0].pageX - e.target.getBoundingClientRect().left;
  //@ts-ignore
  mouseY = e.targetTouches[0].pageY - e.target.getBoundingClientRect().top;
}

/** update status down position
 * @type {(e: TouchEvent) => void} */
function setTouchDown(e) {
  mouseStatus = 1;
  updTouchPos(e);
}

/** update status up position */
export function setTouchUp() {
  mouseStatus = 2;
}

/** returns true when down position 
 * @type {() => boolean} */
export function isMouseDown() {
  if (mouseStatus == 1) {
    return true;
  } else {
    return false;
  }
}

/** returns true when up position 
 * @type {() => boolean} */
export function isMouseUp() {
  if (mouseStatus == 2) {
    mouseStatus = 0;
    return true;
  } else {
    return false;
  }
}

/** creates Paragraph-Element on html
 * @type {(item: string) => void} */
export function createP(item) {
  const newItem = document.createElement("p");
  newItem.textContent = item;
  output.appendChild(newItem);
}

/** saves the current drawing state. Use together with pop */
export function push() {
  ctx.save();
}

/** restores drawing state. Use together with push */
export function pop() {
  ctx.restore();
}

/** Transformation to current matrix 
 * @type {(x: number, y: number) => void} */
export function translate(x, y) {
  ctx.translate(x, y);
}
/** rotates drawing context in degrees
 * @param {number} n degrees */
export function rotate(n) {
  ctx.rotate(n);
}

/** Fillcolor of shape
 * @param  {...number} color r (0..255), g (0...255), b (0...255)
 */
export function fillColor(...color) {
  let r;
  let g;
  let b;
  if (color.length == 1) {
    r = color[0];
    g = color[0];
    b = color[0];
  } else {
    r = color[0] || color_r;
    g = color[1] || color_g;
    b = color[2] || color_b;
  }

  ctx.fillStyle = `RGB(${r},${g},${b})`;
}

/** Stroke Gradiant 
 * @param {number} color 0...255
 * @param {number} x 
 * @param {number} y 
 * @param {number} max  */
export function strokeGrd(color, x, y, max) {
  const grd = ctx.createRadialGradient(x, y, 5, x, y, max);
  grd.addColorStop(0, `RGB(${color},${color},${color})`);
  grd.addColorStop(1, `RGB(${0},${0},${0})`);
  ctx.strokeStyle = grd;
}

/** Strokecolor of shape
 * @param  {...number} color r (0..255), g (0...255), b (0...255)  */
export function strokeColor(...color) {
  let r;
  let g;
  let b;
  if (color.length == 1) {
    r = color[0];
    g = color[0];
    b = color[0];
  } else {
    r = color[0] || color_r;
    g = color[1] || color_g;
    b = color[2] || color_b;
  }

  ctx.strokeStyle = `RGB(${r},${g},${b})`;
}

/** strokewidth of line
 * @param {number} w width  */
export function strokeWidth(w) {
  ctx.lineWidth = w;
}

/** background color of drawing context
 * @param  {...number} color r (0..255), g (0...255), b (0...255)  */
export function background(...color) {
  let r;
  let g;
  let b;
  if (color.length == 1) {
    r = color[0];
    g = color[0];
    b = color[0];
  } else {
    r = color[0] || 255;
    g = color[1] || 255;
    b = color[2] || 255;
  }

  push();
  ctx.fillStyle = `RGB(${r},${g},${b})`;
  ctx.fillRect(0, 0, canv.width, canv.height);
  pop();
}

/** drawing rectangle with start position
 * @param {number} x position-x 
 * @param {number} y position-y
 * @param {number} w width
 * @param {number} h height
 * @param {number} style 0, 1 or 2 */
export function rect(x, y, w, h, style = 0) {
  if (style == 0) {
    ctx.strokeRect(x, y, w, h);
  }
  if (style == 1) {
    ctx.fillRect(x, y, w, h);
  }
  if (style == 2) {
    ctx.strokeRect(x, y, w, h);
    ctx.fillRect(x, y, w, h);
  }
}

/** drawing line
 * @param {number} x1 point 1
 * @param {number} y1 point 1
 * @param {number} x2 point 2
 * @param {number} y2 point 2 */
export function line(x1, y1, x2, y2) {
  const path = new Path2D();
  path.moveTo(x1, y1);
  path.lineTo(x2, y2);
  path.closePath();
  ctx.stroke(path);
}
/** drawing triangle
 * @param {number} x1 point 1
 * @param {number} y1 point 1
 * @param {number} x2 point 2
 * @param {number} y2 point 2
 * @param {number} x3 point 3
 * @param {number} y3 point 3
 * @param {number} style 0, 1 or 2 */
export function triangle(x1, y1, x2, y2, x3, y3, style = 0) {
  const path = new Path2D();
  path.moveTo(x1, y1);
  path.lineTo(x2, y2);
  path.lineTo(x3, y3);
  path.closePath();
  if (style == 0) {
    ctx.stroke(path);
  }
  if (style == 1) {
    ctx.fill(path);
  }
  if (style == 2) {
    ctx.stroke(path);
    ctx.fill(path);
  }
}

/** drawing shape with 4 points
 * @param {number} x1 point 1
 * @param {number} y1 point 1
 * @param {number} x2 point 2
 * @param {number} y2 point 2
 * @param {number} x3 point 3
 * @param {number} y3 point 3
 * @param {number} x4 point 4
 * @param {number} y4 point 4
 * @param {number} style 0, 1 or 2 */
export function shape(x1, y1, x2, y2, x3, y3, x4, y4, style = 0) {
  const path = new Path2D();
  path.moveTo(x1, y1);
  path.lineTo(x2, y2);
  path.lineTo(x3, y3);
  path.lineTo(x4, y4);
  path.closePath();
  if (style == 0) {
    ctx.stroke(path);
  }
  if (style == 1) {
    ctx.fill(path);
  }
  if (style == 2) {
    ctx.stroke(path);
    ctx.fill(path);
  }
}

/**
 * 
 * @param {number} x position-x
 * @param {number} y position-y
 * @param {number} radius 
 * @param {number} style 0, 1 or 2 */
export function circle(x, y, radius, style = 0) {
  const path = new Path2D();
  path.arc(x, y, radius, 0, 2 * Math.PI);
  path.closePath();
  if (style == 0) {
    ctx.stroke(path);
  }
  if (style == 1) {
    ctx.fill(path);
  }
  if (style == 2) {
    ctx.stroke(path);
    ctx.fill(path);
  }
}

/** Draw an arrow 
 * @type {(v_base: Vector, v_target: Vector, myColor: number) => void} */
 export function drawArrow(v_base, v_target, myColor) {
  const v_heading = subVector(v_target, v_base);
  push();
  strokeColor(myColor);
  strokeWidth(3);
  fillColor(myColor);
  translate(v_base.x, v_base.y);
  line(0, 0, v_heading.x, v_heading.y);
  rotate(v_heading.heading());
  let arrowSize = 7;
  translate(v_heading.mag() - arrowSize, 0);
  triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
  pop();
}

///////////////////////////////////////////////
//     Ab hier Implementierung für Vector !!!
///////////////////////////////////////////////
export class Vector {
  /**
   * @param {number} x 
   * @param {number} y 
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  /** @type {(x: number, y: number) => void} */
  set(x, y) {
    this.x = x;
    this.y = y;
  }
    
  /** @type {() => Vector} */
  copy() {
    return new Vector(this.x, this.y);
  }

  /** @type {(n: number) => void} */
  div(n) {
    this.x /= n;
    this.y /= n;
  }

  /** @type {(n: number) => void} */
  mult(n) {
    this.x *= n;
    this.y *= n;
  }

  /** @type {() => number} */
  magSq() {
    return this.x * this.x + this.y * this.y;
  }

  /** @type {() => number} */
  mag() {
    return Math.sqrt(this.magSq());
  }

  /** @type {(v: Vector) => void} */
  add(v) {
    this.x += v.x;
    this.y += v.y;
  }

  /** @type {(v: Vector) => void} */
  sub(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  /** @type {(v: Vector) => number} */
  dist(v) {
    const vdist = this.copy();
    vdist.sub(v);
    return vdist.mag();
  }

  /** @type {() => void} */
  normalize() {
    const len = this.mag();
    if (len != 0) {
      this.div(len);
    }
  }

  /** @type {(n: number) => void} */
  limit(max) {
    const mSq = this.magSq();
    if (mSq > max * max) {
      this.setMag(max);
    }
  }
  
  /** @type {(magnitude: number) => void} */
  setMag(magnitude) {
    this.normalize();
    this.mult(magnitude);
  }
  
  /** @type {(v: Vector) => number} */
  dot(v) {
    return this.x * v.x + this.y * v.y;
  }
  
  /** @type {(v: Vector) => number} */
  cross(v) {
    return this.x * v.y - this.y * v.x;
  }

  /** @type {() => number} */
  heading() {
    const h = Math.atan2(this.y, this.x);
    return h;
  }
  
  /** @type {(base: Vector, n: number) => void} */
  rotate(base, n) {
    const direction = this.copy();
    direction.sub(base);
    const newHeading = direction.heading() + n;
    const magnitude = direction.mag();
    this.x = base.x + Math.cos(newHeading) * magnitude;
    this.y = base.y + Math.sin(newHeading) * magnitude;
  }
  
  /** @type {(base: Vector, n: number) => void} */
  rotateMatrix(base, n) {
    const direction = this.copy();
    direction.sub(base);
    const x = direction.x * Math.cos(n) - direction.y * Math.sin(n);
    const y = direction.x * Math.sin(n) + direction.y * Math.cos(n);
    this.x = x + base.x;
    this.y = y + base.y;
  }

  /** @type {(v: Vector) => number} */
  angleBetween(v) {
    const dotmagmag = this.dot(v) / (this.mag() * v.mag());
    const angle = Math.acos(Math.min(1, Math.max(-1, dotmagmag)));
    return angle;
  }

  /** @type {() => Vector} */
  perp() {
    return new Vector(-this.y, this.x);
  }
}


/** creates an Random Vector 
 * @type {() => Vector} */
 export function VectorRandom2D() {
  const angle = Math.random() * Math.PI * 2;
  const x = Math.cos(angle);
  const y = Math.sin(angle);
  return new Vector(x, y);
}

/** creates Vector with angle
 * @type {(angle: number, len: number) => Vector}
 * @param angle angle measured in radians
 * @param len len of Vector */
 export function fromAngle(angle, len) {
  const x = len * Math.cos(angle);
  const y = len * Math.sin(angle);
  return new Vector(x, y);
}

/** adds v2 to v1 an creates new Vector
 * @type {(v1: Vector, v2: Vector)=> Vector} */
 export function addVector(v1, v2) {
  return new Vector(v1.x + v2.x, v1.y + v2.y);
}

/** substract v2 from v1 and create new Vector
 * @type {(v1: Vector, v2: Vector)=> Vector} */
 export function subVector(v1, v2) {
  return new Vector(v1.x - v2.x, v1.y - v2.y);
}

/** multiply vector with scalar
 * @type {(v: Vector, n: number)=> Vector} */
 export function multVector(v, n) {
  const vmult = v.copy();
  vmult.mult(n);
  return vmult;
}

/** divide vector by scalar n
 * @type {(v: Vector, n: number)=> Vector} */
 export function divVector(v, n) {
  const vdiv = v.copy();
  vdiv.div(n);
  return vdiv;
}

/** dot product of v1 and v2
 * @type {(v1: Vector, v2: Vector) => number} */
 export function dotProduct(v1, v2) {
  return v1.dot(v2);
}

/** cross product of v1 and v2
 * @type {(v1: Vector, v2: Vector) => number} */
export function crossProduct(v1, v2) {
  return v1.cross(v2);
}

/** Returns Point of intersection + Scalar s between 
 * line a (a0->a1) and line b (b0->b1)
 * Example: const [Point, s] = intersect(a0, a1, b0, b1)
 * @type {(a0: Vector, a1: Vector, b0: Vector, b1: Vector) => [Vector, number]} */
 export function intersect(a0, a1, b0, b1) {
  /** @type {[Vector, number]} */
  let pt = [null, null]; // pt[0] = Point of intersection, pt[1] = s
  const a = subVector(a1, a0);
  const b = subVector(b1, b0);
  const den1 = a.cross(b);
  const den2 = b.cross(a);

  if (den1 != 0) {
    const s = subVector(b0, a0).cross(b) / den1;
    const u = subVector(a0, b0).cross(a) / den2;
    if (s > 0 && s < 1 && u > 0 && u < 1) {
      const p = addVector(a0, multVector(a, s));
      pt[0] = p;
      pt[1] = s;
    }
  }

  return pt;
}

/** Mindistance between point p and line a(a0->a1)
 * @type {(p: Vector, a0: Vector, a1: Vector) => number} */
export function minDist(p, a0, a1) {
  let dist;

  //Vektor line a0 to a1
  const a0a1 = subVector(a1, a0);
  //Vektor imaginary line a0 to p
  const a0p = subVector(p, a0);
  //Magnitude of line a0 to a1
  const magnitude = a0a1.mag();

  //Scalarprojecton from line a0p to line a0a1
  a0a1.normalize();
  const sp = a0a1.dot(a0p);

  //Scalarprojection in magnitude of line a0a1?
  if (sp > 0 && sp <= magnitude) {
    a0a1.mult(sp);
    dist = subVector(a0p, a0a1).mag();
  }
  return dist;
}