import type { DrawableInterface } from './DrawableInterface'
import type { ProgramInfoInterface } from "./ShaderProgramInterface"
import { initBuffers, type PositionBuffer } from "./RectBuffer"
import type { SceneContext } from './Scene'
import { mat4, type vec3 } from 'gl-matrix'


export class RectObject implements DrawableInterface {
	programInfo: ProgramInfoInterface
	buffers: PositionBuffer
	scene: SceneContext
	positionMatrix: mat4

	constructor(gl: WebGL2RenderingContext, position: vec3, programInfo: ProgramInfoInterface, scene: SceneContext) {
		this.programInfo = programInfo

		const buffers = initBuffers(gl)
		if (buffers === null) {
			console.warn("init buffer error")
			throw "init buffer error"
		}
		this.buffers = buffers

		this.scene = scene
		
		this.positionMatrix = mat4.create()
		mat4.translate(
			this.positionMatrix,
			this.positionMatrix,
			position
		)
	}

	update() {
	}
	
	draw(gl: WebGL2RenderingContext) {
		// WebGLに頂点や変換行列の情報を伝える
		setPositionAttribute(gl, this.buffers, this.programInfo)
		setColorAttribute(gl, this.buffers, this.programInfo)
		gl.useProgram(this.programInfo.getProgram())
	
		const projectionMatrixLocation = this.programInfo.getUniformLocation("projectionMatrix")
		const modelViewMatrixLocation = this.programInfo.getUniformLocation("modelViewMatrix")
		
		if (projectionMatrixLocation === undefined || modelViewMatrixLocation === undefined) {
			console.warn("undefined model view projection matrix in shader. skip")
			return
		}

		const modelViewMatrix = mat4.create()
		mat4.mul(modelViewMatrix, this.positionMatrix, this.scene.modelViewMatrix)

		gl.uniformMatrix4fv(
			projectionMatrixLocation,
			false,
			this.scene.projectionMatrix
		)
		gl.uniformMatrix4fv(
			modelViewMatrixLocation,
			false,
			modelViewMatrix
		)
	
		// 描画する
		{
			const offset = 0  // 描画を始める頂点配列のオフセット
			const vertexCount = 4  // 描画する頂点数
			gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
		}
	}
}

function setPositionAttribute(gl: WebGL2RenderingContext, buffers: PositionBuffer, programInfo: ProgramInfoInterface) {
	const numComponents = 2  // x,y座業の二つの値を取り出す
	const type = gl.FLOAT  // 型はFloat32 (32ビット浮動小数点)
	const normalize = false  // 正規化なし
	const stride = 0  // 次の値まで何バイト移動するか 0ならtype*numComponentsと同じ
	const offset = 0  // バッファの何バイト目から開始するか

	const vertexPositionIndex = programInfo.getAttribLocation("vertexPosition")
	if (vertexPositionIndex === undefined) {
		console.warn("undefined vertex position index in shader. skip")
		return
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
	gl.vertexAttribPointer(
		vertexPositionIndex,
		numComponents,
		type,
		normalize,
		stride,
		offset
	)
	gl.enableVertexAttribArray(vertexPositionIndex)
}


function setColorAttribute(gl: WebGL2RenderingContext, buffers: PositionBuffer, programInfo: ProgramInfoInterface) {
	const numComponents = 4
	const type = gl.FLOAT  // 型はFloat32 (32ビット浮動小数点)
	const normalize = false  // 正規化なし
	const stride = 0  // 次の値まで何バイト移動するか 0ならtype*numComponentsと同じ
	const offset = 0  // バッファの何バイト目から開始するか

	const vertexColorIndex = programInfo.getAttribLocation("vertexColor")
	if (vertexColorIndex === undefined) {
		console.warn("undefined vertex color index in shader. skip")
		return
	}

	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color)
	gl.vertexAttribPointer(
		vertexColorIndex,
		numComponents,
		type,
		normalize,
		stride,
		offset
	)
	gl.enableVertexAttribArray(vertexColorIndex)
}
