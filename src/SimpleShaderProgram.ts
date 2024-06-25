import { initShaderProgram } from "./ShaderCompiler"
import type { ProgramInfoInterface } from "./ShaderProgramInterface"


type AttribLocations = {
	vertexPosition: number,
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


	const programInfo = new ProgramInfo(
		shaderProgram,
		{
			vertexPosition: vertexPosition,
		},
		{
			projectionMatrix: projectionMatrix,
			modelViewMatrix: modelViewMatrix,
		}
	)

	return programInfo
}
