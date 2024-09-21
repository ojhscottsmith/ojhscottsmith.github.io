/* 
Owen Scott-Smith
09/15/24
Computer Graphics
*/
"use strict";
var gl;
var points;
var sliderVal;
var positions = [];
init();

function init() {
  var canvas = document.getElementById("gl-canvas");

  gl = canvas.getContext("webgl2");
  if (!gl) {
    alert("WebGL isn't available");
  }

  var left = vec2(-1.0, 0.0);
  var right = vec2(1.0, 0.0);
  if (positions[0] == null) {
    recursion(left, right, 0);
  }

  function recursion(left, right, count) {
    var pos1 = mix(left, right, 0.33);
    var pos2 = mix(left, right, 0.67);

    var pos3 = mix(left, pos1, 0.33);
    var pos4 = mix(left, pos1, 0.67);
    var pos5 = mix(pos2, right, 0.33);
    var pos6 = mix(pos2, right, 0.67);

    var pos7 = mix(left, pos3, 0.33);
    var pos8 = mix(left, pos3, 0.67);
    var pos9 = mix(pos4, pos1, 0.33);
    var pos10 = mix(pos4, pos1, 0.67);
    var pos11 = mix(pos2, pos5, 0.33);
    var pos12 = mix(pos2, pos5, 0.67);
    var pos13 = mix(pos6, right, 0.33);
    var pos14 = mix(pos6, right, 0.67);

    var pos15 = mix(left, pos7, 0.33);
    var pos16 = mix(left, pos7, 0.67);
    var pos17 = mix(pos8, pos3, 0.33);
    var pos18 = mix(pos8, pos3, 0.67);
    var pos19 = mix(pos4, pos9, 0.33);
    var pos20 = mix(pos4, pos9, 0.67);
    var pos21 = mix(pos10, pos1, 0.33);
    var pos22 = mix(pos10, pos1, 0.67);
    var pos23 = mix(pos2, pos11, 0.33);
    var pos24 = mix(pos2, pos11, 0.67);
    var pos25 = mix(pos12, pos5, 0.33);
    var pos26 = mix(pos12, pos5, 0.67);
    var pos27 = mix(pos6, pos13, 0.33);
    var pos28 = mix(pos6, pos13, 0.67);
    var pos29 = mix(pos14, right, 0.33);
    var pos30 = mix(pos14, right, 0.67);

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
    } else if (count == 3) {
      positions.push(left);
      positions.push(pos7);
      positions.push(pos7);
      positions.push(vec2(-0.89, 0.05));
      positions.push(vec2(-0.89, 0.05));
      positions.push(pos8);
      positions.push(pos8);
      positions.push(pos3);
      positions.push(pos3);
      positions.push(vec2(-0.67, 0.2));
      positions.push(vec2(-0.67, 0.2));
      positions.push(pos4);
      positions.push(pos4);
      positions.push(pos9);
      positions.push(pos9);
      positions.push(vec2(-0.45, 0.05));
      positions.push(vec2(-0.45, 0.05));
      positions.push(pos10);
      positions.push(pos10);
      positions.push(pos1);
      positions.push(pos1);
      positions.push(vec2(0, 0.571));
      positions.push(vec2(0, 0.571));
      positions.push(pos2);
      positions.push(pos2);
      positions.push(pos11);
      positions.push(pos11);
      positions.push(vec2(0.45, 0.05));
      positions.push(vec2(0.45, 0.05));
      positions.push(pos12);
      positions.push(pos12);
      positions.push(pos5);
      positions.push(pos5);
      positions.push(vec2(0.67, 0.2));
      positions.push(vec2(0.67, 0.2));
      positions.push(pos6);
      positions.push(pos6);
      positions.push(pos13);
      positions.push(pos13);
      positions.push(vec2(0.89, 0.05));
      positions.push(vec2(0.89, 0.05));
      positions.push(pos14);
      positions.push(pos14);
      positions.push(right);
    } else if (count == 4) {
      positions.push(left);
      positions.push(pos15);
      positions.push(pos15);
      positions.push(vec2(-0.9634, 0.02));
      positions.push(vec2(-0.9634, 0.02));
      positions.push(pos16);
      positions.push(pos16);
      positions.push(pos7);
      positions.push(pos7);
      positions.push(vec2(-0.89, 0.05));
      positions.push(vec2(-0.89, 0.05));
      positions.push(pos8);
      positions.push(pos8);
      positions.push(pos17);
      positions.push(pos17);
      positions.push(vec2(-0.8174, 0.02));
      positions.push(vec2(-0.8174, 0.02));
      positions.push(pos18);
      positions.push(pos18);
      positions.push(pos3);
      positions.push(pos3);
      positions.push(vec2(-0.67, 0.2));
      positions.push(vec2(-0.67, 0.2));
      positions.push(pos4);
      positions.push(pos4);
      positions.push(pos19);
      positions.push(pos19);
      positions.push(vec2(-0.52, 0.02));
      positions.push(vec2(-0.52, 0.02));
      positions.push(pos20);
      positions.push(pos20);
      positions.push(pos9);
      positions.push(pos9);
      positions.push(vec2(-0.45, 0.05));
      positions.push(vec2(-0.45, 0.05));
      positions.push(pos10);
      positions.push(pos10);
      positions.push(pos21);
      positions.push(pos21);
      positions.push(vec2(-0.375, 0.02));
      positions.push(vec2(-0.375, 0.02));
      positions.push(pos22);
      positions.push(pos22);
      positions.push(pos1);
      positions.push(pos1);
      positions.push(vec2(0, 0.571));
      positions.push(vec2(0, 0.571));
      positions.push(pos2);
      positions.push(pos2);
      positions.push(pos23);
      positions.push(pos23);
      positions.push(vec2(0.375, 0.02));
      positions.push(vec2(0.375, 0.02));
      positions.push(pos24);
      positions.push(pos24);
      positions.push(pos11);
      positions.push(pos11);
      positions.push(vec2(0.45, 0.05));
      positions.push(vec2(0.45, 0.05));
      positions.push(pos12);
      positions.push(pos12);
      positions.push(pos25);
      positions.push(pos25);
      positions.push(vec2(0.52, 0.02));
      positions.push(vec2(0.52, 0.02));
      positions.push(pos26);
      positions.push(pos26);
      positions.push(pos5);
      positions.push(pos5);
      positions.push(vec2(0.67, 0.2));
      positions.push(vec2(0.67, 0.2));
      positions.push(pos6);
      positions.push(pos6);
      positions.push(pos27);
      positions.push(pos27);
      positions.push(vec2(0.8174, 0.02));
      positions.push(vec2(0.8174, 0.02));
      positions.push(pos28);
      positions.push(pos28);
      positions.push(pos13);
      positions.push(pos13);
      positions.push(vec2(0.89, 0.05));
      positions.push(vec2(0.89, 0.05));
      positions.push(pos14);
      positions.push(pos14);
      positions.push(pos29);
      positions.push(pos29);
      positions.push(vec2(0.9634, 0.02));
      positions.push(vec2(0.9634, 0.02));
      positions.push(pos30);
      positions.push(pos30);
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
    positions = [];
    recursion(left, right, sliderVal);
    init();
    render();
  };

  render();
}

function render() {
  gl.clear(gl.COLOR_BUFFER_BIT);
  // use the variable from the slider event listener to determine how many
  // points to render
  gl.drawArrays(gl.LINES, 0, positions.length);
}
