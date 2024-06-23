(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const t of n)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(n){const t={};return n.integrity&&(t.integrity=n.integrity),n.referrerPolicy&&(t.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?t.credentials="include":n.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(n){if(n.ep)return;n.ep=!0;const t=i(n);fetch(n.href,t)}})();var x=typeof Float32Array<"u"?Float32Array:Array;Math.hypot||(Math.hypot=function(){for(var e=0,r=arguments.length;r--;)e+=arguments[r]*arguments[r];return Math.sqrt(e)});function A(){var e=new x(16);return x!=Float32Array&&(e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0),e[0]=1,e[5]=1,e[10]=1,e[15]=1,e}function M(e){return e[0]=1,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[10]=1,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}function L(e,r,i){var o=i[0],n=i[1],t=i[2],a,c,f,l,u,d,m,p,w,h,y,v;return r===e?(e[12]=r[0]*o+r[4]*n+r[8]*t+r[12],e[13]=r[1]*o+r[5]*n+r[9]*t+r[13],e[14]=r[2]*o+r[6]*n+r[10]*t+r[14],e[15]=r[3]*o+r[7]*n+r[11]*t+r[15]):(a=r[0],c=r[1],f=r[2],l=r[3],u=r[4],d=r[5],m=r[6],p=r[7],w=r[8],h=r[9],y=r[10],v=r[11],e[0]=a,e[1]=c,e[2]=f,e[3]=l,e[4]=u,e[5]=d,e[6]=m,e[7]=p,e[8]=w,e[9]=h,e[10]=y,e[11]=v,e[12]=a*o+u*n+w*t+r[12],e[13]=c*o+d*n+h*t+r[13],e[14]=f*o+m*n+y*t+r[14],e[15]=l*o+p*n+v*t+r[15]),e}function S(e,r,i,o,n){var t=1/Math.tan(r/2),a;return e[0]=t/i,e[1]=0,e[2]=0,e[3]=0,e[4]=0,e[5]=t,e[6]=0,e[7]=0,e[8]=0,e[9]=0,e[11]=-1,e[12]=0,e[13]=0,e[15]=0,n!=null&&n!==1/0?(a=1/(o-n),e[10]=(n+o)*a,e[14]=2*n*o*a):(e[10]=-1,e[14]=-2*o),e}var g=S;function R(e,r,i){const o=P(e,e.VERTEX_SHADER,r),n=P(e,e.FRAGMENT_SHADER,i);if(o===null)return console.warn("vertex shader load error"),null;if(n===null)return console.warn("fragmen shader load error"),null;const t=e.createProgram();return t===null?(console.warn("shader compile eror"),null):(e.attachShader(t,o),e.attachShader(t,n),e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)?t:(console.warn("shader init error: ",e.getProgramInfoLog(t)),null))}function P(e,r,i){const o=e.createShader(r);return o===null?(console.warn("load shader source error"),null):(e.shaderSource(o,i),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)?o:(console.warn("compile shader error: ",e.getShaderInfoLog(o)),null))}const k=`
	attribute vec4 aVertexPosition;
	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	}
`,b=`
	void main() {
		gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	}
`;function F(e){const r=R(e,k,b);if(r===null)return console.warn("init shader program error"),null;const i=e.getAttribLocation(r,"aVertexPosition"),o=e.getUniformLocation(r,"uProjectionMatrix"),n=e.getUniformLocation(r,"uModelViewMatrix");return(i===null||i===-1)&&console.warn("get vertex position error"),(o===null||o===-1)&&console.warn("get projection matrix error"),(n===null||n===-1)&&console.warn("get model view matrix error"),i===null||o===null||n===null||i===-1||o===-1||n===-1?null:{program:r,attribLocations:{vertexPosition:i},uniformLocations:{projectionMatrix:o,modelViewMatrix:n}}}const s={right:!1,left:!1,up:!1,down:!1};document.addEventListener("keydown",E,!1);document.addEventListener("keyup",T,!1);function E(e){(e.key==="Right"||e.key==="ArrowRight"||e.key==="d")&&(console.log("right press"),s.right=!0),(e.key==="Left"||e.key==="ArrowLeft"||e.key==="a")&&(console.log("left press"),s.left=!0),(e.key==="Up"||e.key==="ArrowUp"||e.key==="w")&&(console.log("up press"),s.up=!0),(e.key==="Down"||e.key==="ArrowDown"||e.key==="s")&&(console.log("down press"),s.down=!0)}function T(e){(e.key==="Right"||e.key==="ArrowRight"||e.key==="d")&&(console.log("right release"),s.right=!1),(e.key==="Left"||e.key==="ArrowLeft"||e.key==="a")&&(console.log("left release"),s.left=!1),(e.key==="Up"||e.key==="ArrowUp"||e.key==="w")&&(console.log("up release"),s.up=!1),(e.key==="Down"||e.key==="ArrowDown"||e.key==="s")&&(console.log("down release"),s.down=!1)}function I(e){const r=V(e);return r===null?(console.warn("init buffer error"),null):{position:r}}function V(e){const r=[1,1,-1,1,1,-1,-1,-1],i=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,i),e.bufferData(e.ARRAY_BUFFER,new Float32Array(r),e.STATIC_DRAW),i}function _(e,r,i){const n=e.FLOAT,t=!1,a=0,c=0;e.bindBuffer(e.ARRAY_BUFFER,r.position),e.vertexAttribPointer(i.attribLocations.vertexPosition,2,n,t,a,c),e.enableVertexAttribArray(i.attribLocations.vertexPosition)}function C(e){const r=F(e);if(r===null)return console.warn("create program error"),null;const i=I(e);if(i===null)return console.warn("init buffer error"),null;const o={fieldOfView:45*Math.PI/100,aspect:e.canvas.width/e.canvas.height,zNear:.1,zFar:100,position:[-0,0,-6]},n=A();g(n,o.fieldOfView,o.aspect,o.zNear,o.zFar);const t=A();L(t,t,o.position);const a={programInfo:r,buffers:i,camera:o,projectionMatrix:n,modelViewMatrix:t};return e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),a}function U(e){s.right&&(e.camera.position[0]-=.1),s.left&&(e.camera.position[0]+=.1),s.up&&(e.camera.position[2]+=.1),s.down&&(e.camera.position[2]-=.1),M(e.modelViewMatrix),L(e.modelViewMatrix,e.modelViewMatrix,e.camera.position),console.log("camera: ",e.camera.position)}function B(e,r){const i=r.programInfo;e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT),_(e,r.buffers,i),e.useProgram(i.program),e.uniformMatrix4fv(i.uniformLocations.projectionMatrix,!1,r.projectionMatrix),e.uniformMatrix4fv(i.uniformLocations.modelViewMatrix,!1,r.modelViewMatrix),e.drawArrays(e.TRIANGLE_STRIP,0,4)}const O=1e3/60;function D(e){const r=e.getContext("webgl2");if(r===null){console.warn("not HTMLCanvasElement");return}const i=C(r);if(i===null){console.warn("init scene error");return}setInterval(N,O,r,i)}function N(e,r){U(r),B(e,r)}function j(){const e=document.querySelector("#gl-canvas");e?(console.log(e),D(e)):console.warn("#gl-canvas not found")}j();
