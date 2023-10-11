function initBuffers (gl) {
  const positionBuffer = initPositionBuffer(gl)

  return {
    position: positionBuffer,
  }
}

function initPositionBuffer(gl) {
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  const positions = [2.0, 5.0, -1.0, 1.0, 12.0, -1.0, -1.0, -100.0]

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

  return positionBuffer;
}

export { initBuffers }
