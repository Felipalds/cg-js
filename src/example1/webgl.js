import { initBuffers } from "./initBuffers.js";
import { drawScene } from "./draw.js";

function main(){ 
  const canvas = document.querySelector('#glcanvas')
  const gl = canvas.getContext('webgl')
  console.log(gl)
  if(!gl){
    alert("You dont have WebGL")
    return;
  }

  const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main(){
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
  `
  const fsSource = `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `

  // Program is linked and compiled
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource)

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition")
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix")
    }
  }

  console.log(programInfo)

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)

  const buffers = initBuffers(gl);

  // Draw the scene
  drawScene(gl, programInfo, buffers);
}

// Link the shaders
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)

  const shaderProgram = gl.createProgram()
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
    alert(`Failed to initialize program: ${gl.getProgramInfoLog(shaderProgram)}`)
    return null
  }
  return shaderProgram
}

// Compiles the shaders
function loadShader(gl, type, source){
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(`Failed to compile: ${gl.getShaderInfoLog(shader)}`) 
    gl.deleteShader(shader)
    return null
  }
  return shader
}

main()
