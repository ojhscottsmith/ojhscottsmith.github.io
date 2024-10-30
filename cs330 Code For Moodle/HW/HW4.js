"use strict";

var canvas;
var gl;

var numPositions = 72;

var positions = [];
var positions2 = [];
var colors = [];
var colors2 = [];

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;

var axis = 0;
var theta = [0, 0, 0];

var thetaLoc;

var rotate = false;

var rotatenum = 0;

var cubenum = 0;

init();

function init() {
  canvas = document.getElementById("gl-canvas");

  gl = canvas.getContext("webgl2");
  if (!gl) alert("WebGL 2.0 isn't available");

  var bigCube = [
    vec4(-0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, 0.5, 0.5, 1.0),
    vec4(0.5, 0.5, 0.5, 1.0),
    vec4(0.5, -0.5, 0.5, 1.0),
    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5, 0.5, -0.5, 1.0),
    vec4(0.5, 0.5, -0.5, 1.0),
    vec4(0.5, -0.5, -0.5, 1.0),
  ];

  var smallCube = [
    vec4(-0.1, -0.5, 0.5, 1.0),
    vec4(-0.1, 0.5, 0.5, 1.0),
    vec4(0.1, 0.5, 0.5, 1.0),
    vec4(0.1, -0.5, 0.5, 1.0),
    vec4(-0.1, -0.5, -0.5, 1.0),
    vec4(-0.1, 0.5, -0.5, 1.0),
    vec4(0.1, 0.5, -0.5, 1.0),
    vec4(0.1, -0.5, -0.5, 1.0),
  ];

  colorCube();

  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.clearColor(1.0, 1.0, 1.0, 1.0);

  gl.enable(gl.DEPTH_TEST);

  //
  //  Load shaders and initialize attribute buffers
  //
  var program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

  var colorLoc = gl.getAttribLocation(program, "aColor");
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLoc);

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

  var lLoc = gl.getAttribLocation(program, "lPosition");
  gl.vertexAttribPointer(lLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(lLoc);

  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positions2), gl.STATIC_DRAW);

  var uLoc = gl.getAttribLocation(program, "uPosition");
  gl.vertexAttribPointer(uLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(uLoc);

  thetaLoc = gl.getUniformLocation(program, "uTheta");
  //event listeners for buttons

  document.getElementById("xButton").onclick = function () {
    axis = xAxis;
  };
  document.getElementById("yButton").onclick = function () {
    axis = yAxis;
  };
  document.getElementById("zButton").onclick = function () {
    axis = zAxis;
  };

  document.getElementById("Morph").onclick = function () {
    i = 0;
    morph = !morph;
    if (morph) {
      test = 0.02;
    } else if (!morph) {
      test = -0.02;
    }
    render();
  };

  render();
}

function colorCube() {
  cubenum = 0;
  quad(1, 0, 3, 2, cubenum);
  quad(2, 3, 7, 6, cubenum);
  quad(3, 0, 4, 7, cubenum);
  quad(6, 5, 1, 2, cubenum);
  quad(4, 5, 6, 7, cubenum);
  quad(5, 4, 0, 1, cubenum);
  cubenum = 1;
  quad(1, 0, 3, 2, cubenum);
  quad(2, 3, 7, 6, cubenum);
  quad(3, 0, 4, 7, cubenum);
  quad(6, 5, 1, 2, cubenum);
  quad(4, 5, 6, 7, cubenum);
  quad(5, 4, 0, 1, cubenum);
}

function quad(a, b, c, d, cn) {
  var vertexColors = [
    vec4(0.0, 0.0, 0.0, 1.0), // black
    vec4(1.0, 0.0, 0.0, 1.0), // red
    vec4(1.0, 1.0, 0.0, 1.0), // yellow
    vec4(0.0, 1.0, 0.0, 1.0), // green
    vec4(0.0, 0.0, 1.0, 1.0), // blue
    vec4(1.0, 0.0, 1.0, 1.0), // magenta
    vec4(0.2, 0.8, 0.7, 1.0), // blueish
    vec4(0.5, 0.0, 1.0, 1.0), // violet

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

  if (cn == 0) {
    for (var i = 0; i < indices.length; ++i) {
      positions.push(bigCube[indices[i]]);
      colors.push(vertexColors[indices[i]]);

      // for solid colored faces use
      //colors.push(vertexColors[a]);
    }
  } else if ((cn = 1)) {
    for (var i = 0; i < indices.length; ++i) {
      positions2.push(smallCube[indices[i]]);
      colors2.push(vertexColors[indices[i]]);

      // for solid colored faces use
      //colors.push(vertexColors[a]);
    }
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

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  theta[axis] += rotatenum;
  gl.uniform3fv(thetaLoc, theta);

  gl.drawArrays(gl.TRIANGLES, 0, numPositions);
  requestAnimationFrame(render);
}
