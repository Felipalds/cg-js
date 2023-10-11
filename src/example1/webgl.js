function main(){ 
  const canvas = document.querySelector('#glcanvas')
  console.log(canvas)
  const gl = canvas.getContext('webgl')
  if(!gl){
    alert("You dont have WebGL")
    return;
  }

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
}

main()
