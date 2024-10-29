"use strict";
var gl;
var tParam = 0.0;
var tLoc;
var deltaT = 0.01;
var color = vec4(1.0, 0.65, 0.0, 1.0);
var positions = [];
var colors = [];
var numPositions = 36;
//var vec4 color;
var Ucolor = vec4(1.0, 0.65, 0.0, 1.0);
var Icolor = vec4(0.0, 0.0, 1.0, 1.0);
var colorLoc;
var delay = 100;
var morph = true;
var axis = 0;
var theta = [0, 0, 0];
var thetaLoc;
var rotatenum = 0;
var rotate = false;
init();
function init() {
  var canvas = document.getElementById("gl-canvas");
  gl = canvas.getContext("webgl2");
  if (!gl) alert("WebGL 2.0 isn't available");

  colorCube();
  //add the vertices for the axes
  positions.push(vec4(0.0, 0.0, 0.0, 1.0));
  colors.push(vec4(1.0, 0.0, 0.0, 1.0));
  positions.push(vec4(1.0, 0.0, 0.0, 1.0));
  colors.push(vec4(1.0, 0.0, 0.0, 1.0));
  positions.push(vec4(0.0, 0.0, 0.0, 1.0));
  colors.push(vec4(0.0, 1.0, 0.0, 1.0));
  positions.push(vec4(0.0, 1.0, 0.0, 1.0));
  colors.push(vec4(0.0, 1.0, 0.0, 1.0));
  positions.push(vec4(0.0, 0.0, 0.0, 1.0));
  colors.push(vec4(0.0, 0.0, 1.0, 1.0));
  positions.push(vec4(0.0, 0.0, 1.0, 1.0));
  colors.push(vec4(0.0, 0.0, 1.0, 1.0));
  //
  //  Configure WebGL
  //
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  gl.enable(gl.DEPTH_TEST);
  //  Load shaders and initialize attribute buffers
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var colorLoc = gl.getAttribLocation(program, "IColor");
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLoc);

  // Load the I into the GPU
  var vBufferI = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBufferI);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer
  var ipositionLoc = gl.getAttribLocation(program, "iPosition");
  gl.vertexAttribPointer(ipositionLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(ipositionLoc);

  thetaLoc = gl.getUniformLocation(program, "uTheta");

  render();
}
function colorCube() {
  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
}

function quad(a, b, c, d) {
  //Needs to change to vec4
  //Vec4(x, y, z, w)
  var I = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0),
  ];

  var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0), // black
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(1.0, 1.0, 0.0, 1.0), // yellow
    vec4(0.0, 1.0, 0.0, 1.0), // green
    vec4(0.0, 0.0, 1.0, 1.0), // blue
    vec4(1.0, 0.0, 1.0, 1.0), // magenta
    vec4(0.2, 0.8, 0.7, 1.0), // blueish
    vec4(0.5, 0.0, 1.0, 1.0), // violet
  ];

  // We need to parition the quad into two triangles in order for
  // WebGL to be able to render it.  In this case, we create two
  // triangles from the quad indices

  //vertex color assigned by the index of the vertex

  var indices = [a, b, c, a, c, d];

  for (var i = 0; i < indices.length; ++i) {
    positions.push(I[indices[i]]);
    colors.push(vertexColors[indices[i]]);

    // for solid colored faces use
    //colors.push(vertexColors[a]);
  }

  document.getElementById("StopRotate").onclick = function () {
    rotate = !rotate;
    if (rotate) {
      rotatenum = 2.0;
    } else if (!rotate) {
      rotatenum = 0.0;
    }
    render();
  };
}

// var U = [
//   vec2(-0.75, 0.75),
//   vec2(-0.38, 0.75),
//   vec2(-0.38, -0.38),
//   vec2(0.38, -0.38),
//   vec2(0.38, 0.75),
//   vec2(0.75, 0.75),
//   vec2(0.75, 0.0),
//   vec2(0.75, -0.38),
//   vec2(0.75, -0.75),
//   vec2(-0.75, -0.75),
//   vec2(-0.75, -0.38),
//   vec2(-0.75, 0.0),
// ];

// // Load the U into the GPU
// var vBufferU = gl.createBuffer();
// gl.bindBuffer(gl.ARRAY_BUFFER, vBufferU);
// gl.bufferData(gl.ARRAY_BUFFER, flatten(U), gl.STATIC_DRAW);

// // Associate out shader variables with our data buffer
// var upositionLoc = gl.getAttribLocation(program, "uPosition");
// gl.vertexAttribPointer(upositionLoc, 2, gl.FLOAT, false, 0, 0);
// gl.enableVertexAttribArray(upositionLoc);
// tLoc = gl.getUniformLocation(program, "t");
// colorLoc = gl.getUniformLocation(program, "inColor");

// Initialize event handlers
document.getElementById("Morph").onclick = function () {
  morph = !morph;
};
window.onkeydown = function (event) {
  var key = String.fromCharCode(event.keyCode);
  switch (key) {
    case "1":
      morph = !morph;
      break;
    case "2":
      deltaT /= 2.0;
      break;
    case "3":
      deltaT *= 2.0;
      break;
  }
};
render();

function render() {
  // gl.clear(gl.COLOR_BUFFER_BIT);
  // if (morph) tParam += deltaT;
  // if (tParam >= 1.0 || tParam <= 0.0) deltaT = -deltaT;
  // gl.uniform1f(tLoc, tParam);
  // color = mix(Icolor, Ucolor, tParam);
  // gl.uniform4fv(colorLoc, color);
  // gl.drawArrays(gl.LINE_LOOP, 0, 12);
  // setTimeout(function () {
  //   requestAnimationFrame(render);
  // }, delay);

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  theta[axis] += rotatenum;
  gl.uniform3fv(thetaLoc, theta);

  gl.drawArrays(gl.TRIANGLES, 0, numPositions);
  gl.drawArrays(gl.LINES, numPositions, 6);
  requestAnimationFrame(render);
}
