/*
Owen Scott-Smith
09/10/24
Computer Graphics

*/
"use strict";
var gl;
var points;
init();

function init() {
  var canvas = document.getElementById("gl-canvas");

  gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("WebGL isn't available");
  }
  var left = vec2(-1.0, 0.0);
  var right = vec2(1.0, 0.0);
  var pos1 = mix(left, right, 0.33);
  var pos2 = mix(left, right, 0.67);
  var pos3 = mix(left, pos1, 0.33);
  var pos4 = mix(left, pos1, 0.67);
  var pos5 = mix(pos2, right, 0.33);
  var pos6 = mix(pos2, right, 0.67);
  var mid = mix(pos3, pos4, 0.5);
  var sqrt3d2 = 0.87;
  var length = pos2 - pos1;
  var y = length * sqrt3d2;

  points = [
    // vec2(-1.0, 0.0),
    // vec2(-0.33, 0.0),
    // vec2(-0.33, 0.0),
    // vec2(0.0, 0.0),
    // vec2(0.0, 0.0),
    // vec2(0.33, 0.0),
    // vec2(0.33, 0.0),
    // vec2(1.0, 0.0),

    left,
    pos3,
    pos3,
    vec2(-0.67, 0.2),
    vec2(-0.67, 0.2),
    pos4,
    pos4,
    pos1,
    pos1,
    vec2(0, 0.571),
    vec2(0, 0.571),
    pos2,
    pos2,
    pos5,
    pos5,
    vec2(0.67, 0.2),
    vec2(0.67, 0.2),
    pos6,
    pos6,
    right,

    // vec2(-0.95, 0.1),
    // vec2(-0.95, 1),
    // vec2(0.05, 0.1),
    // vec2(-0.95, 0.1),
    // vec2(0.05, 0.1),
    // vec2(0.05, 1),
    // vec2(0.05, 1),
    // vec2(-0.95, 1),

    // vec2(0.2, 1),
    // vec2(0.35, 0.1),
    // vec2(0.35, 0.1),
    // vec2(0.6, 0.8),
    // vec2(0.6, 0.8),
    // vec2(0.8, 0.1),
    // vec2(0.8, 0.1),
    // vec2(1, 1),
  ];

  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  //  Load shaders and initialize attribute buffers

  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  // Load the data into the GPU

  var bufferId = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer

  var positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);

  //gl.drawArrays(gl.POINTS, 0, points.length);
  gl.drawArrays(gl.LINES, 0, points.length);
  //gl.drawArrays(gl.LINE_STRIP, 0, points.length);
  //gl.drawArrays(gl.LINE_LOOP, 0, points.length);
  //gl.drawArrays(gl.TRIANGLES, 0, points.length);
  //gl.drawArrays(gl.TRIANGLE_STRIP, 0, points.length);
  //gl.drawArrays(gl.TRIANGLE_FAN, 0, points.length);
}
