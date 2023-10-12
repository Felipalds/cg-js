function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if(!success) {
    gl.deleteShader(shader)
    alert('Error compiling')
    throw new Error('compile')
  }

  return shader
}

function createProgram(gl, vertexShader, fragmentShader){
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  const success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if(!success){
    alert('Error linking')
    gl.deleteProgram(program)
    throw new Error('link')
  }

  return program
}

function main () {
  const canvas = document.querySelector('#canvas')
  const gl = canvas.getContext('webgl')
  if(!gl){
    alert(`You do not have WebGL`)
    return
  }

  const vertexShaderSource = `
    // an attribute will receive data from a buffer
    attribute vec4 a_position;

    // all shaders have a main function
    void main() {

      // gl_Position is a special variable a vertex shader
      // is responsible for setting
      gl_Position = a_position;
    }
  `

  const fragmentShaderSource = `
    // fragment shaders don't have a default precision so we need
    // to pick one. mediump is a good default
    precision mediump float;

    void main() {
      // gl_FragColor is a special variable a fragment shader
      // is responsible for setting
      gl_FragColor = vec4(0, 1, 0, 1); // return redish-purple
    }
  `

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

  const program = createProgram(gl, vertexShader, fragmentShader)

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position")
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

  let positions = [0, 0, 0, 0.5, 0.7, 0, 1, 1]

  drawScene()

  document.querySelector('#ndotsbutton').addEventListener('click', (event) => {
    event.preventDefault()
    const ndots = document.querySelector('#ndotsinput').value 
    const body = document.querySelector('body')
    const newBr0 = document.createElement('br')
    body.appendChild(newBr0)
      for(let n = 0; n < ndots; n++){
      const newText1 = document.createTextNode(`X ${n}`)
      const newInput1 = document.createElement('input')
      newInput1.setAttribute('id', `p${n}x`)

      const newText2 = document.createTextNode(`Y ${n}`)
      const newInput2 = document.createElement('input')
      newInput2.setAttribute('id', `p${n}y`)

      const newBr = document.createElement('br')
      
      body.appendChild(newText1)
      body.appendChild(newInput1)

      body.appendChild(newText2)
      body.appendChild(newInput2)

      body.appendChild(newBr)
    };
    const newButton = document.createElement('button')
    newButton.setAttribute('id', '#dotButton')
    const newButtonText = document.createTextNode('Plotar Pontos')
    newButton.appendChild(newButtonText)

    newButton.addEventListener('click', (event) => {
      event.preventDefault()
      console.log('query:')
      let x0 = document.querySelector('#p0x').value
      let y0 = document.querySelector('#p0y').value
      let x1 = document.querySelector('#p1x').value
      let y1 = document.querySelector('#p1y').value
      let x2 = document.querySelector('#p2x').value
      let y2 = document.querySelector('#p2y').value

      positions = [x0, y0, x1, y1, x2, y2]
      drawScene()
    })

    body.appendChild(newButton)
  })

  function drawScene() {
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)


    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)

    gl.useProgram(program)

    gl.enableVertexAttribArray(positionAttributeLocation)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)

    const size = 2
    const type = gl.FLOAT
    const normalize = false
    const stride = 0
    const offset = 0
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset)
    

    const primitiveType = gl.TRIANGLE_STRIP
    const count = 4
    gl.drawArrays(primitiveType, offset, count)

  }
}

main()
