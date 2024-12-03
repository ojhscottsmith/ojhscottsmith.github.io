"use strict";

var canvas;
var gl;

var numPositions = 36;

var flag = false;

var texture;

var texCoordsArray = [];

var texCoord = [vec2(-0.5, -1.0), vec2(-0.5, 1.0), vec2(0.5, 1), vec2(0.5, -1)];

var positionsArray = [];
var colorsArray = [];

var program;

var vertices = [
  vec4(-0.5, -1.0, 0.3, 1.0),
  vec4(-0.5, 1.0, 0.3, 1.0),
  vec4(0.5, 1.0, 0.3, 1.0),
  vec4(0.5, -1.0, 0.3, 1.0),
  vec4(-0.5, -1.0, 0.2, 1.0),
  vec4(-0.5, 1.0, 0.2, 1.0),
  vec4(0.5, 1.0, 0.2, 1.0),
  vec4(0.5, -1.0, 0.2, 1.0),
];

var vertexColors = [
  vec4(0.0, 0.0, 0.0, 1.0), // black
  vec4(1.0, 0.0, 0.0, 1.0), // red
  vec4(1.0, 1.0, 0.0, 1.0), // yellow
  vec4(0.0, 1.0, 0.0, 1.0), // green
  vec4(0.0, 0.0, 1.0, 1.0), // blue
  vec4(1.0, 0.0, 1.0, 1.0), // magenta
  vec4(0.0, 1.0, 1.0, 1.0), // cyan
  vec4(1.0, 1.0, 1.0, 1.0), // white
];

window.onload = init;

function configureTexture(image) {
  texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);
  gl.texParameteri(
    gl.TEXTURE_2D,
    gl.TEXTURE_MIN_FILTER,
    gl.NEAREST_MIPMAP_LINEAR
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.uniform1i(gl.getUniformLocation(program, "uTextureMap"), 0);
}

function quad(a, b, c, d) {
  positionsArray.push(vertices[a]);
  colorsArray.push(vertexColors[a]);
  texCoordsArray.push(texCoord[0]);

  positionsArray.push(vertices[b]);
  colorsArray.push(vertexColors[a]);
  texCoordsArray.push(texCoord[1]);

  positionsArray.push(vertices[c]);
  colorsArray.push(vertexColors[a]);
  texCoordsArray.push(texCoord[2]);

  positionsArray.push(vertices[a]);
  colorsArray.push(vertexColors[a]);
  texCoordsArray.push(texCoord[0]);

  positionsArray.push(vertices[c]);
  colorsArray.push(vertexColors[a]);
  texCoordsArray.push(texCoord[2]);

  positionsArray.push(vertices[d]);
  colorsArray.push(vertexColors[a]);
  texCoordsArray.push(texCoord[3]);
}

var near = 0.3;
var far = 4.2;
var radius = 4.0;
var theta = 0.26;
var phi = 2.3;
var dr = (5.0 * Math.PI) / 180.0;

var fovy = 45.0; // Field-of-view in Y direction angle (in degrees)
var aspect; // Viewport aspect ratio

var modelViewMatrixLoc, projectionMatrixLoc;
var modelViewMatrix, projectionMatrix;
var eye;
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);

var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = xAxis;

var theta2 = vec3(0, 0, 0);

var thetaLoc;

init();

function colorCube() {
  quad(1, 0, 3, 2);
  quad(2, 3, 7, 6);
  quad(3, 0, 4, 7);
  quad(6, 5, 1, 2);
  quad(4, 5, 6, 7);
  quad(5, 4, 0, 1);
}



function init() {
  canvas = document.getElementById("gl-canvas");

  gl = canvas.getContext("webgl2");
  if (!gl) alert("WebGL 2.0 isn't available");

  colorCube();

  gl.viewport(0, 0, canvas.width, canvas.height);

  aspect = canvas.width / canvas.height;

  gl.clearColor(1.0, 1.0, 1.0, 1.0);
  gl.enable(gl.DEPTH_TEST);

  //
  //  Load shaders and initialize attribute buffers
  //
  program = initShaders(gl, "vertex-shader", "fragment-shader");
  gl.useProgram(program);

  //color buffer
  var cBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(colorsArray), gl.STATIC_DRAW);
  var colorLoc = gl.getAttribLocation(program, "aColor");
  gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(colorLoc);

  //positions buffer
  var vBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positionsArray), gl.STATIC_DRAW);
  var positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);

  // texture buffer
  var tBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, flatten(texCoordsArray), gl.STATIC_DRAW);
  var texCoordLoc = gl.getAttribLocation(program, "aTexCoord");
  gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(texCoordLoc);

  thetaLoc = gl.getUniformLocation(program, "Theta2");

  document.getElementById("ButtonX").onclick = function () {
    axis = xAxis;
  };
  document.getElementById("ButtonY").onclick = function () {
    axis = yAxis;
  };
  document.getElementById("ButtonZ").onclick = function () {
    axis = zAxis;
  };
  document.getElementById("ButtonT").onclick = function () {
    flag = !flag;
  };

  modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");
  projectionMatrixLoc = gl.getUniformLocation(program, "uProjectionMatrix");

  var image = document.getElementById("texImage");
  configureTexture(image);
  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  eye = vec3(
    radius * Math.sin(theta) * Math.cos(phi),
    radius * Math.sin(theta) * Math.sin(phi),
    radius * Math.cos(theta)
  );

  projectionMatrix = perspective(fovy, aspect, near, far);
  var S = scale(0.5, 0.5, 0.5);
  var Tleft = translate(-1.0, 0, 0);
  var Tright = translate(1.0, 0, 0);

  if (flag) theta2[axis] += 2.0;

  modelViewMatrix = mat4();
  modelViewMatrix = mult(modelViewMatrix, rotate(theta2[xAxis], vec3(1, 0, 0)));
  modelViewMatrix = mult(modelViewMatrix, rotate(theta2[yAxis], vec3(0, 1, 0)));
  modelViewMatrix = mult(modelViewMatrix, rotate(theta2[zAxis], vec3(0, 0, 1)));

  // Cube on the left
  // Scale is "first," since it's closest to the vertex, then translate
  // since it is left multiplied
  modelViewMatrix = lookAt(eye, at, up);
  modelViewMatrix = mult(modelViewMatrix, Tleft);
  modelViewMatrix = mult(modelViewMatrix, S);
  // update modelview matrix with required transformation(s)

  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
  gl.drawArrays(gl.TRIANGLES, 0, numPositions);

  // Cube in the middle
  // just need to Scale, no translate, coord are already centered
  modelViewMatrix = lookAt(eye, at, up);
  modelViewMatrix = mult(modelViewMatrix, S);
  // update modelview matrix with required transformation(s)

  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
  gl.drawArrays(gl.TRIANGLES, 0, numPositions);

  // Cube on the right
  // Scale is "first", since it's closest to the vertex, then translate
  // since it is left multiplied
  modelViewMatrix = lookAt(eye, at, up);
  modelViewMatrix = mult(modelViewMatrix, Tright);
  modelViewMatrix = mult(modelViewMatrix, S);
  // update modelview matrix with required transformation(s)

  

  gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
  gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

  gl.drawArrays(gl.TRIANGLES, 0, numPositions);
  requestAnimationFrame(render);
}
