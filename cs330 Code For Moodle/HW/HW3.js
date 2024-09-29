/* 
Owen Scott-Smith
09/25/24
Computer Graphics
*/
"use strict";

var gl;

var morph = true;

var thetaLoc;
var theta = 0.0;

var delay = 100;

// var t;
// var P;
// var Q;

// var V;

var color = vec4(0.0, 0.0, 1.0, 1.0);
var colorLoc;

init();

function init() {
  var canvas = document.getElementById("gl-canvas");

  gl = canvas.getContext("webgl2");
  if (!gl) alert("WebGL 2.0 isn't available");

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  var L = [
    vec2(-0.5, 0.8),
    vec2(-0.5, -0.8),

    vec2(-0.5, -0.8),
    vec2(0.5, -0.8),

    vec2(0.5, -0.8),
    vec2(0.5, -0.5),

    vec2(0.5, -0.5),
    vec2(-0.2, -0.5),

    vec2(-0.2, -0.5),
    vec2(-0.2, 0.8),

    vec2(-0.2, 0.8),
    vec2(-0.5, 0.8),
  ];

  // Load the data into the GPU

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(L), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer

  var lLoc = gl.getAttribLocation(program, "lPosition");
  gl.vertexAttribPointer(lLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(lLoc);

  // prettier-ignore
  var V = [
    vec2(-0.8, 0.8),
    vec2(0.0, -0.8),

    vec2(0.0, -0.8),
    vec2(0.8, 0.8),

    vec2(0.8, 0.8),
    vec2(0.5, 0.8),

    vec2(0.5, 0.8),
    vec2(0.0, -0.2),

    vec2(0.0, -0.2),
    vec2(-0.5, 0.8),

    vec2(-0.8, 0.8),
    vec2(-0.5, 0.8)
  ];

  // Load the data into the GPU

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(V), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer

  var vLoc = gl.getAttribLocation(program, "vPosition");
  gl.vertexAttribPointer(vLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(vLoc);

  thetaLoc = gl.getUniformLocation(program, "t");
  colorLoc = gl.getUniformLocation(program, "aColor");

  //define the uniform variable in the shader, aColor

  // button listener here, toggle morph
  document.getElementById("Morph").onclick = function () {
    morph = !morph;
  };

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  theta += morph ? 0.02 : 0.0;

  gl.uniform1f(thetaLoc, theta);

  gl.uniform4fv(colorLoc, color);

  gl.drawArrays(gl.LINE_STRIP, 0, 12);

  setTimeout(function () {
    requestAnimationFrame(render);
  }, delay);
}
