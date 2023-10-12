const ctx = document.querySelector("canvas").getContext("2d");

ctx.beginPath();
ctx.moveTo(20, 20);
ctx.lineTo(250, 70);
ctx.lineTo(270, 120);
ctx.lineTo(170, 140);
ctx.lineTo(190, 80);
ctx.lineTo(100, 60);
ctx.lineTo(50, 130);
ctx.lineTo(20, 20);
ctx.stroke();

floodFill(ctx, 40, 50, [255, 0, 0, 255]);

function getPixel(imageData, x, y) {
  if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
    return [-1, -1, -1, -1];  // impossible color
  } else {
    const offset = (y * imageData.width + x) * 4;
    return imageData.data.slice(offset, offset + 4);
  }
}

function setPixel(imageData, x, y, color) {
  const offset = (y * imageData.width + x) * 4;
  imageData.data[offset + 0] = color[0];
  imageData.data[offset + 1] = color[1];
  imageData.data[offset + 2] = color[2];
  imageData.data[offset + 3] = color[0];
}

function colorsMatch(a, b) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

function floodFill(ctx, x, y, fillColor) {
  // read the pixels in the canvas
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  // get the color we're filling
  const targetColor = getPixel(imageData, x, y);
  
  // check we are actually filling a different color
  if (!colorsMatch(targetColor, fillColor)) {
  
    fillPixel(imageData, x, y, targetColor, fillColor);
    
    // put the data back
    ctx.putImageData(imageData, 0, 0);
  }
}

function fillPixel(imageData, x, y, targetColor, fillColor) {
  const currentColor = getPixel(imageData, x, y);
  if (colorsMatch(currentColor, targetColor)) {
    setPixel(imageData, x, y, fillColor);
    fillPixel(imageData, x + 1, y, targetColor, fillColor);
    fillPixel(imageData, x - 1, y, targetColor, fillColor);
    fillPixel(imageData, x, y + 1, targetColor, fillColor);
    fillPixel(imageData, x, y - 1, targetColor, fillColor);
  }
}
