# cgjs?
> A repository to learn computer graphics using WebGL, JavaScript and Electron.js (just the coolest tools, btw ><)


## WebGL? What is this?
- WebGL is a JavaScript API that allows the programmer to use the GPU of a computing device in a web browser window to render real-time 3D computer graphics.
### What is a WebGL program?
| HTML    | Canva tag    | CSS    | Graphical Data and OpenGL Shader    | Javascript program    |
|---------------- | --------------- | --------------- | --------------- | --------------- |

## How does graphics are rendered?
![alt text](/assets/hardware_overview.png) 
1. The server sends the HTML description of the web page and it is stored in the RAM;
2. The client browser reads the HTML and fetchs any other documents (using TCP protocol) including images, videos, JS code, CSS... All of these files are stored in the RAM;
3. If there is any JS code fetched, it will be executed by the browser.
3.1. If there is any 3D render task by JS, it will download any other files that are required;
3.2. It will initialize the WebGL context associated with the canvas HTML tag;
3.3. It will configure and load the model data to the GPUs memory;
3.4. It will stablish JS events (code that will execute if any event happens);
4. Finnaly the page is rendered in the browser and the webpage waits for the user interactions

> When a JS event handler initiates the rendering of graphics into a HTML canvas element, it tells the GPU which object buffer contains the data it wants to render;
> Then, JS issues the WebGL "draw" command. Notice that the data is already in the GPU memory. 
> When we use the "real-time graphics", we are talking about a rendering that can be done in less then 1/30 of a second.
- This is only done by the GPU acceleration! With the canva web api it is not possible because it runs the code in the CPU.

- The idea is that expensive operations are only done once. It is a principle in the computer science.
- The preprocessing and the render process are two steps
![](/assets/data_location.png) 



- https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial/Adding_2D_content_to_a_WebGL_context
- https://learnwebgl.brown37.net/
- https://glmatrix.net/
- https://webglfundamentals.org/
- https://webglfundamentals.org/webgl/lessons/webgl-3d-perspective.html
- https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection#clip_space
- https://registry.khronos.org/OpenGL/specs/es/3.2/GLSL_ES_Specification_3.20.pdf

