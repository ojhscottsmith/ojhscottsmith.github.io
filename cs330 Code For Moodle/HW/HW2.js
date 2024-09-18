/* 
Owen Scott-Smith
09/15/24
Computer Graphics
*/
"use strict";
var gl;
var points;
var sliderVal;
var positions;
init();

function init() {
  var canvas = document.getElementById("gl-canvas");

  gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("WebGL isn't available");
  }

  function recursion(left, right, count) {
    var sqrt3d2 = 0.87;
    var len = -0.66;
    var pos1 = mix(left, right, 0.33);
    var pos2 = mix(left, right, 0.67);
    var pos3 = mix(left, pos1, 0.33);
    var pos4 = mix(left, pos1, 0.67);
    var pos5 = mix(pos2, right, 0.33);
    var pos6 = mix(pos2, right, 0.67);

    if (count == 0) {
      positions.push(left);
      positions.push(pos1);
      positions.push(pos1);
      positions.push(pos2);
      positions.push(pos2);
      positions.push(right);
    } else if (count == 1) {
      positions.push(left);
      positions.push(pos1);
      positions.push(pos1);
      positions.push(vec2(0, 0.571));
      positions.push(vec2(0, 0.571));
      positions.push(pos2);
      positions.push(pos2);
      positions.push(right);
    } else if (count == 2) {
      positions.push(left);
      positions.push(pos3);
      positions.push(pos3);
      positions.push(vec2(-0.67, 0.2));
      positions.push(vec2(-0.67, 0.2));
      positions.push(pos4);
      positions.push(pos4);
      positions.push(pos1);
      positions.push(pos1);
      positions.push(vec2(0, 0.571));
      positions.push(vec2(0, 0.571));
      positions.push(pos2);
      positions.push(pos2);
      positions.push(pos5);
      positions.push(pos5);
      positions.push(vec2(0.67, 0.2));
      positions.push(vec2(0.67, 0.2));
      positions.push(pos6);
      positions.push(pos6);
      positions.push(right);
    }
  }

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
  gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);

  // Associate out shader variables with our data buffer

  var positionLoc = gl.getAttribLocation(program, "aPosition");
  gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(positionLoc);

  // slider event listener
  document.getElementById("Range").onchange = function (event) {
    sliderVal = parseInt(event.target.value);
    render();
  };

  render();
}

function render() {
  positions = [];

  var left = vec2(-1.0, 0.0);
  var right = vec2(1.0, 0.0);
  recursion(left, right, sliderVal);

  gl.clear(gl.COLOR_BUFFER_BIT);
  // use the variable from the slider event listener to determine how many
  // points to render

  gl.drawArrays(gl.LINES, 0, positions.length);
}
