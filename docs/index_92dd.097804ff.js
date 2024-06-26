(function(_){for(var r in _){_[r].__farm_resource_pot__='index_92dd.js';(globalThis || window || global)['2732537ceacf0b135848c632e5c6abaa'].__farm_module_system__.register(r,_[r])}})({"3dd40a4e":function  (t,r,e,i){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RainbowRectObject",{enumerable:!0,get:function(){return s;}});let o=e("e4115865"),n=e("5ce35544");class s{programInfo;buffers;scene;positionMatrix;color;constructor(t,r,e,i){this.programInfo=e;let s=(0,o.initBuffers)(t);if(null===s)throw console.warn("init buffer error"),"init buffer error";this.buffers=s,this.color=new Float32Array([1,1,0,1,0,1,1,1,1,0,1,1,0,0,1,1]),this.scene=i,this.positionMatrix=n.mat4.create(),n.mat4.translate(this.positionMatrix,this.positionMatrix,r);}update(t){let r=this.color.subarray(0,4),e=this.color.subarray(4,8),i=this.color.subarray(8,12),o=this.color.subarray(12,16),s=[r,e,i,o].map((t,r,e)=>(function(t){let r=t.map((t,r,e)=>Math.max(0,t)).map((t,r,e)=>Math.min(1,t)).map((t,r,e)=>Math.round(255*t)),e=r[0],i=r[1],o=r[2],s=Math.max(e,i,o),f=Math.min(e,i,o),u=0;return Math.abs(e-i)<Number.EPSILON&&Math.abs(i-o)<Number.EPSILON&&Math.abs(o-e)<Number.EPSILON?u=0:(e>=i&&e>=o?u=(i-o)/(s-f)*60:i>=e&&i>=o?u=(o-e)/(s-f)*60+120:o>=e&&o>=i&&(u=(e-i)/(s-f)*60+240),u<0&&(u+=360),u/=360),n.vec4.fromValues(u,(s-f)/s,s/255,t[3]);})(t)).map((r,e,i)=>{var o;let s;return o=1*t,(s=360*r[0]+o)>=360&&(s-=360),s/=360,n.vec4.fromValues(s,r[1],r[2],r[3]);}).map((t,r,e)=>(function(t){let r=Math.min(360,Math.max(0,360*t[0])),e=255*t[1],i=Math.max(e,255*t[2]),o=i-e/255*i,s=0,f=0,u=0;return r>=0&&r<60?(s=i,f=r/60*(i-o)+o,u=o):r>=60&&r<120?(s=(120-r)/60*(i-o)+o,f=i,u=o):r>=120&&r<180?(s=o,f=i,u=(r-120)/60*(i-o)+o):r>=180&&r<240?(s=o,f=(240-r)/60*(i-o)+o,u=i):r>=240&&r<300?(s=(r-240)/60*(i-o)+o,f=o,u=i):r>=300&&r<=360&&(s=i,f=o,u=(360-r)/60*(i-o)+o),s/=255,f/=255,u/=255,n.vec4.fromValues(s,f,u,t[3]);})(t));r[0]=s[0][0],r[1]=s[0][1],r[2]=s[0][2],r[3]=s[0][3],e[0]=s[1][0],e[1]=s[1][1],e[2]=s[1][2],e[3]=s[1][3],i[0]=s[2][0],i[1]=s[2][1],i[2]=s[2][2],i[3]=s[2][3],o[0]=s[3][0],o[1]=s[3][1],o[2]=s[3][2],o[3]=s[3][3];}draw(t){(function(t,r,e){let i=t.FLOAT,o=e.getAttribLocation("vertexPosition");void 0!==o&&(t.bindBuffer(t.ARRAY_BUFFER,r.position),t.vertexAttribPointer(o,2,i,!1,0,0),t.enableVertexAttribArray(o));})(t,this.buffers,this.programInfo),function(t,r,e){let i=t.FLOAT,o=e.getAttribLocation("vertexColor");void 0!==o&&(t.bindBuffer(t.ARRAY_BUFFER,r.color),t.vertexAttribPointer(o,4,i,!1,0,0),t.enableVertexAttribArray(o));}(t,this.buffers,this.programInfo),t.useProgram(this.programInfo.getProgram());let r=this.programInfo.getUniformLocation("projectionMatrix"),e=this.programInfo.getUniformLocation("modelViewMatrix");if(void 0===r||void 0===e){console.warn("undefined model view projection matrix in shader. skip");return;}let i=n.mat4.create();n.mat4.mul(i,this.positionMatrix,this.scene.modelViewMatrix),t.uniformMatrix4fv(r,!1,this.scene.projectionMatrix),t.uniformMatrix4fv(e,!1,i),t.bindBuffer(t.ARRAY_BUFFER,this.buffers.color),t.bufferData(t.ARRAY_BUFFER,this.color,t.STATIC_DRAW),t.drawArrays(t.TRIANGLE_STRIP,0,4);}}},"3f49111e":function  (t,r,o,e){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),function(t,r){for(var o in r)Object.defineProperty(t,o,{enumerable:!0,get:r[o]});}(r,{ProgramInfo:function(){return n;},createShaderProgram:function(){return c;}});let i=o("fb935ce4");class n{program;attribLocations;uniformLocations;constructor(t,r,o){this.program=t,this.attribLocations=new Map(Object.entries(r)),this.uniformLocations=new Map(Object.entries(o));}getProgram(){return this.program;}getAttribLocation(t){return this.attribLocations.get(t);}getUniformLocation(t){return this.uniformLocations.get(t);}}let l=`
	attribute vec4 aVertexPosition;
	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	}
`,u=`
	void main() {
		gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	}
`;function c(t){let r=(0,i.initShaderProgram)(t,l,u);if(null===r)return console.warn("init shader program error"),null;let o=t.getAttribLocation(r,"aVertexPosition"),e=t.getUniformLocation(r,"uProjectionMatrix"),c=t.getUniformLocation(r,"uModelViewMatrix");return((null===o||-1===o)&&console.warn("get vertex position error"),(null===e||-1===e)&&console.warn("get projection matrix error"),(null===c||-1===c)&&console.warn("get model view matrix error"),null===o||null===e||null===c||-1===o||-1===e||-1===c)?null:new n(r,{vertexPosition:o},{projectionMatrix:e,modelViewMatrix:c});}},"7f44d301":function  (e,o,r,t){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),Object.defineProperty(o,"KeyState",{enumerable:!0,get:function(){return n;}});let n={right:!1,left:!1,up:!1,down:!1};document.addEventListener("keydown",function(e){("Right"===e.key||"ArrowRight"===e.key||"d"===e.key)&&(console.log("right press"),n.right=!0),("Left"===e.key||"ArrowLeft"===e.key||"a"===e.key)&&(console.log("left press"),n.left=!0),("Up"===e.key||"ArrowUp"===e.key||"w"===e.key)&&(console.log("up press"),n.up=!0),("Down"===e.key||"ArrowDown"===e.key||"s"===e.key)&&(console.log("down press"),n.down=!0);},!1),document.addEventListener("keyup",function(e){("Right"===e.key||"ArrowRight"===e.key||"d"===e.key)&&(console.log("right release"),n.right=!1),("Left"===e.key||"ArrowLeft"===e.key||"a"===e.key)&&(console.log("left release"),n.left=!1),("Up"===e.key||"ArrowUp"===e.key||"w"===e.key)&&(console.log("up release"),n.up=!1),("Down"===e.key||"ArrowDown"===e.key||"s"===e.key)&&(console.log("down release"),n.down=!1);},!1);},"87e8ac49":function  (e,t,r,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]});}(t,{drawScene:function(){return p;},initScene:function(){return f;},updateScene:function(){return m;}});let o=r("5ce35544"),n=r("3f49111e"),i=r("cfc8ecc5"),l=r("7f44d301"),s=r("893cf13d"),u=r("3dd40a4e");function f(e){let t={fieldOfView:45*Math.PI/100,aspect:e.canvas.width/e.canvas.height,zNear:.1,zFar:100,position:[-0,0,-6]},r=o.mat4.create();o.mat4.perspective(r,t.fieldOfView,t.aspect,t.zNear,t.zFar);let c=o.mat4.create();o.mat4.translate(c,c,t.position);let l={camera:t,projectionMatrix:r,modelViewMatrix:c,objects:[]},f=(0,n.createShaderProgram)(e);if(null===f)return console.warn("create simple program error"),null;let m=(0,i.createShaderProgram)(e);if(null===m)return console.warn("create color program error"),null;let p=new s.RectObject(e,o.vec3.fromValues(0,0,0),f,l),d=new s.RectObject(e,o.vec3.fromValues(2.5,0,0),m,l);l.objects.push(p),l.objects.push(d);let w=new u.RainbowRectObject(e,o.vec3.fromValues(-2.5,0,0),m,l);return l.objects.push(w),e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),l;}function m(e,t){l.KeyState.right&&(e.camera.position[0]-=.1*t),l.KeyState.left&&(e.camera.position[0]+=.1*t),l.KeyState.up&&(e.camera.position[2]+=.1*t),l.KeyState.down&&(e.camera.position[2]-=.1*t),o.mat4.identity(e.modelViewMatrix),o.mat4.translate(e.modelViewMatrix,e.modelViewMatrix,e.camera.position),e.objects.forEach((e,r,c)=>e.update(t));}function p(e,t){e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),t.objects.forEach((t,r,c)=>t.draw(e));}},"893cf13d":function  (t,e,r,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"RectObject",{enumerable:!0,get:function(){return s;}});let o=r("e4115865"),n=r("5ce35544");class s{programInfo;buffers;scene;positionMatrix;constructor(t,e,r,i){this.programInfo=r;let s=(0,o.initBuffers)(t);if(null===s)throw console.warn("init buffer error"),"init buffer error";this.buffers=s,this.scene=i,this.positionMatrix=n.mat4.create(),n.mat4.translate(this.positionMatrix,this.positionMatrix,e);}update(t){}draw(t){(function(t,e,r){let i=t.FLOAT,o=r.getAttribLocation("vertexPosition");if(void 0===o){console.warn("undefined vertex position index in shader. skip");return;}t.bindBuffer(t.ARRAY_BUFFER,e.position),t.vertexAttribPointer(o,2,i,!1,0,0),t.enableVertexAttribArray(o);})(t,this.buffers,this.programInfo),function(t,e,r){let i=t.FLOAT,o=r.getAttribLocation("vertexColor");if(void 0===o){console.warn("undefined vertex color index in shader. skip");return;}t.bindBuffer(t.ARRAY_BUFFER,e.color),t.vertexAttribPointer(o,4,i,!1,0,0),t.enableVertexAttribArray(o);}(t,this.buffers,this.programInfo),t.useProgram(this.programInfo.getProgram());let e=this.programInfo.getUniformLocation("projectionMatrix"),r=this.programInfo.getUniformLocation("modelViewMatrix");if(void 0===e||void 0===r){console.warn("undefined model view projection matrix in shader. skip");return;}let i=n.mat4.create();n.mat4.mul(i,this.positionMatrix,this.scene.modelViewMatrix),t.uniformMatrix4fv(e,!1,this.scene.projectionMatrix),t.uniformMatrix4fv(r,!1,i),t.drawArrays(t.TRIANGLE_STRIP,0,4);}}},"bee6f350":function  (e,n,t,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),Object.defineProperty(n,"setupGLCanvasGraphics",{enumerable:!0,get:function(){return o;}});let i=t("87e8ac49");function o(n){let t=n.getContext("webgl2");if(null===t){console.warn("not HTMLCanvasElement");return;}let r=(0,i.initScene)(t);if(null===r){console.warn("init scene error");return;}!function(n,t){let r=1e3/e.meta.env.VITE_STANDARD_FPS,o=performance.now(),u=e=>{let c=(e-o)/r;o=e,(0,i.updateScene)(t,c),(0,i.drawScene)(n,t),requestAnimationFrame(u);};requestAnimationFrame(u);}(t,r);}},"cfc8ecc5":function  (r,o,t,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0}),function(r,o){for(var t in o)Object.defineProperty(r,t,{enumerable:!0,get:o[t]});}(o,{ProgramInfo:function(){return n;},createShaderProgram:function(){return u;}});let i=t("fb935ce4");class n{program;attribLocations;uniformLocations;constructor(r,o,t){this.program=r,this.attribLocations=new Map(Object.entries(o)),this.uniformLocations=new Map(Object.entries(t));}getProgram(){return this.program;}getAttribLocation(r){return this.attribLocations.get(r);}getUniformLocation(r){return this.uniformLocations.get(r);}}let l=`
	attribute vec4 aVertexPosition;
	attribute vec4 aVertexColor;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	varying lowp vec4 vColor;

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		vColor = aVertexColor;
	}
`,c=`
	varying lowp vec4 vColor;

	void main() {
		gl_FragColor = vColor;
	}
`;function u(r){let o=(0,i.initShaderProgram)(r,l,c);if(null===o)return console.warn("init shader program error"),null;let t=r.getAttribLocation(o,"aVertexPosition"),e=r.getAttribLocation(o,"aVertexColor"),u=r.getUniformLocation(o,"uProjectionMatrix"),s=r.getUniformLocation(o,"uModelViewMatrix");return((null===t||-1===t)&&console.warn("get vertex position error"),(null===e||-1===e)&&console.warn("get vertex color error"),(null===u||-1===u)&&console.warn("get projection matrix error"),(null===s||-1===s)&&console.warn("get model view matrix error"),null===t||-1===t||null===e||-1===e||null===u||-1===u||null===s||-1===s)?null:new n(o,{vertexPosition:t,vertexColor:e},{projectionMatrix:u,modelViewMatrix:s});}},"e4115865":function  (e,r,n,t){"use strict";function u(e){let r=function(e){let r=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([1,1,-1,1,1,-1,-1,-1]),e.STATIC_DRAW),r;}(e);if(null===r)return console.warn("init buffer error"),null;let n=function(e){let r=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,r),e.bufferData(e.ARRAY_BUFFER,new Float32Array([1,1,1,1,1,0,0,1,0,1,0,1,0,0,1,1]),e.STATIC_DRAW),r;}(e);return null===n?(console.warn("init color buffer error"),null):{position:r,color:n};}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"initBuffers",{enumerable:!0,get:function(){return u;}});},"ec2bf3a9":function  (e,n,o,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});let c=o("bee6f350");!function(){let e=document.querySelector("#gl-canvas");e?(console.log(e),(0,c.setupGLCanvasGraphics)(e)):console.warn("#gl-canvas not found");}();},"fb935ce4":function  (r,e,n,o){"use strict";function l(r,e,n){let o=t(r,r.VERTEX_SHADER,e),l=t(r,r.FRAGMENT_SHADER,n);if(null===o)return console.warn("vertex shader load error"),null;if(null===l)return console.warn("fragmen shader load error"),null;let u=r.createProgram();return null===u?(console.warn("shader compile eror"),null):(r.attachShader(u,o),r.attachShader(u,l),r.linkProgram(u),r.getProgramParameter(u,r.LINK_STATUS))?u:(console.warn("shader init error: ",r.getProgramInfoLog(u)),null);}function t(r,e,n){let o=r.createShader(e);return null===o?(console.warn("load shader source error"),null):(r.shaderSource(o,n),r.compileShader(o),r.getShaderParameter(o,r.COMPILE_STATUS))?o:(console.warn("compile shader error: ",r.getShaderInfoLog(o)),null);}Object.defineProperty(e,"__esModule",{value:!0}),Object.defineProperty(e,"initShaderProgram",{enumerable:!0,get:function(){return l;}});},});
//# sourceMappingURL=index_92dd.097804ff.js.map