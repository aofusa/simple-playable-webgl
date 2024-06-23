import { initShaderProgram } from "./Shader"


export type AttribLocations = {
	vertexPosition: number,
}


export type UniformLocations = {
	projectionMatrix: WebGLUniformLocation,
	modelViewMatrix: WebGLUniformLocation,
}


export type ProgramInfo = {
	program: WebGLProgram,
	attribLocations: AttribLocations,
	uniformLocations: UniformLocations,
}


// 頂点シェーダプログラムのソースコード
const vsSource = `
	attribute vec4 aVertexPosition;
	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
	}
`

// ピクセルシェーダプログラムのソースコード
const fsSource = `
	void main() {
		gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
	}
`


export function createShaderProgram(gl: WebGL2RenderingContext): ProgramInfo | null {
	const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
	if (shaderProgram === null) {
		console.warn("init shader program error")
		return null
	}

	const vertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition")
	const projectionMatrix = gl.getUniformLocation(shaderProgram, "uProjectionMatrix")
	const modelViewMatrix = gl.getUniformLocation(shaderProgram, "uModelViewMatrix")
	if (vertexPosition === null || vertexPosition === -1) {
		console.warn("get vertex position error")
	}
	if (projectionMatrix === null || projectionMatrix === -1) {
		console.warn("get projection matrix error")
	}
	if (modelViewMatrix === null || modelViewMatrix === -1) {
		console.warn("get model view matrix error")
	}

	if (
		vertexPosition === null || projectionMatrix === null || modelViewMatrix === null ||
		vertexPosition === -1 || projectionMatrix === -1 || modelViewMatrix === -1
	) {
		return null
	}

	const programInfo: ProgramInfo = {
		program: shaderProgram,
		attribLocations: {
			vertexPosition: vertexPosition,
		},
		uniformLocations: {
			projectionMatrix: projectionMatrix,
			modelViewMatrix: modelViewMatrix,
		}
	}

	return programInfo
}
