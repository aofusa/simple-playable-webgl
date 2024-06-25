import { initShaderProgram } from "./ShaderCompiler"
import type { ProgramInfoInterface } from "./ShaderProgramInterface"


type AttribLocations = {
	vertexPosition: number,
	vertexColor: number,
}


type UniformLocations = {
	projectionMatrix: WebGLUniformLocation,
	modelViewMatrix: WebGLUniformLocation,
}


export class ProgramInfo implements ProgramInfoInterface {
	program: WebGLProgram
	attribLocations: Map<string, number>
	uniformLocations: Map<string, WebGLUniformLocation>

	constructor(program: WebGLProgram, attribLocations: AttribLocations, uniformLocations: UniformLocations) {
		this.program = program
		this.attribLocations = new Map(Object.entries(attribLocations))
		this.uniformLocations = new Map(Object.entries(uniformLocations))
	}

	getProgram(): WebGLProgram {
		return this.program
	}

	getAttribLocation(name: string): number | undefined {
		return this.attribLocations.get(name)
	}

	getUniformLocation(name: string): WebGLUniformLocation | undefined {
		return this.uniformLocations.get(name)
	}
}


// 頂点シェーダプログラムのソースコード
const vsSource = `
	attribute vec4 aVertexPosition;
	attribute vec4 aVertexColor;

	uniform mat4 uModelViewMatrix;
	uniform mat4 uProjectionMatrix;

	varying lowp vec4 vColor;

	void main() {
		gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		vColor = aVertexColor;
	}
`

// ピクセルシェーダプログラムのソースコード
const fsSource = `
	varying lowp vec4 vColor;

	void main() {
		gl_FragColor = vColor;
	}
`


export function createShaderProgram(gl: WebGL2RenderingContext): ProgramInfo | null {
	const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
	if (shaderProgram === null) {
		console.warn("init shader program error")
		return null
	}

	const vertexPosition = gl.getAttribLocation(shaderProgram, "aVertexPosition")
	const vertexColor = gl.getAttribLocation(shaderProgram, "aVertexColor")
	const projectionMatrix = gl.getUniformLocation(shaderProgram, "uProjectionMatrix")
	const modelViewMatrix = gl.getUniformLocation(shaderProgram, "uModelViewMatrix")
	if (vertexPosition === null || vertexPosition === -1) {
		console.warn("get vertex position error")
	}
	if (vertexColor === null || vertexColor === -1) {
		console.warn("get vertex color error")
	}
	if (projectionMatrix === null || projectionMatrix === -1) {
		console.warn("get projection matrix error")
	}
	if (modelViewMatrix === null || modelViewMatrix === -1) {
		console.warn("get model view matrix error")
	}

	if (
		vertexPosition === null || vertexPosition === -1 ||
		vertexColor === null || vertexColor === -1 ||
		projectionMatrix === null || projectionMatrix === -1 ||
		modelViewMatrix === null || modelViewMatrix === -1
	) {
		return null
	}

	const programInfo = new ProgramInfo(
		shaderProgram,
		{
			vertexPosition: vertexPosition,
			vertexColor: vertexColor,
		},
		{
			projectionMatrix: projectionMatrix,
			modelViewMatrix: modelViewMatrix,
		}
	)

	return programInfo
}
