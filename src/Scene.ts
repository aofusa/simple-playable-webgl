import { mat4, type vec3 } from "gl-matrix"
import { createShaderProgram } from "./ShaderProgram"
import type { ProgramInfo } from "./ShaderProgram"
import { KeyState } from "./KeyInput"


export type Camera = {
	fieldOfView: number,
	aspect: number,
	zNear: number,
	zFar: number,
	position: vec3,
}


export type SceneContext = {
	programInfo: ProgramInfo,
	buffers: PositionBuffer,
	camera: Camera,
	projectionMatrix: mat4,
	modelViewMatrix: mat4,
}


type PositionBuffer = {
	position: WebGLBuffer
}


function initBuffers(gl: WebGL2RenderingContext): PositionBuffer | null {
	const positionBuffer = initPositionBuffer(gl)
	if (positionBuffer === null) {
		console.warn("init buffer error")
		return null
	}

	const buffer: PositionBuffer = {
		position: positionBuffer
	}

	return buffer
}


function initPositionBuffer(gl: WebGL2RenderingContext): WebGLBuffer | null {
	// 正方形の頂点座標の配列
	const position = [
		1.0, 1.0,
		-1.0, 1.0,
		1.0, -1.0,
		-1.0, -1.0
	]

	const positionBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)

	return positionBuffer
}


function setPosirionAttribute(gl: WebGL2RenderingContext, buffers: PositionBuffer, programInfo: ProgramInfo) {
	const numComponents = 2  // x,y座業の二つの値を取り出す
	const type = gl.FLOAT  // 型はFloat32 (32ビット浮動小数点)
	const normalize = false  // 正規化なし
	const stride = 0  // 次の値まで何バイト移動するか 0ならtype*numComponentsと同じ
	const offset = 0  // バッファの何バイト目から開始するか
	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position)
	gl.vertexAttribPointer(
		programInfo.attribLocations.vertexPosition,
		numComponents,
		type,
		normalize,
		stride,
		offset
	)
	gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
}


export function initScene(gl: WebGL2RenderingContext): SceneContext | null {
	const programInfo = createShaderProgram(gl)
	if (programInfo === null) {
		console.warn("create program error")
		return null
	}

	const buffers = initBuffers(gl)
	if (buffers === null) {
		console.warn("init buffer error")
		return null
	}

	// カメラの設定を行う
	const camera: Camera = {
		fieldOfView: (45 * Math.PI) / 100,  // 視野角45度のラジアン表記
		aspect: gl.canvas.width / gl.canvas.height,  // アスペクト比は描画先キャンパスサイズと合わせる
		zNear: 0.1,  // nearクリップ距離
		zFar: 100.0,  // farクリップ距離
		position: [-0.0, 0.0, -6.0],  // Z方向に少し引く
	}

	// 描画用の行列設定
	const projectionMatrix = mat4.create()
	mat4.perspective(projectionMatrix, camera.fieldOfView, camera.aspect, camera.zNear, camera.zFar)

	const modelViewMatrix = mat4.create()
	mat4.translate(
		modelViewMatrix,
		modelViewMatrix,
		camera.position
	)

	const sceneContext: SceneContext = {
		programInfo: programInfo,
		buffers: buffers,
		camera: camera,
		projectionMatrix: projectionMatrix,
		modelViewMatrix: modelViewMatrix,
	}

	// 描写前のWebGL設定
	gl.clearColor(0.0, 0.0, 0.0, 1.0)
	gl.clearDepth(1.0)
	gl.enable(gl.DEPTH_TEST)
	gl.depthFunc(gl.LEQUAL)

	return sceneContext
}


export function updateScene(scene: SceneContext) {
	// カメラの移動
	if (KeyState.right) {scene.camera.position[0] -= 0.1}
	if (KeyState.left) {scene.camera.position[0] += 0.1}
	if (KeyState.up) {scene.camera.position[2] += 0.1}
	if (KeyState.down) {scene.camera.position[2] -= 0.1}

	mat4.identity(scene.modelViewMatrix)
	mat4.translate(
		scene.modelViewMatrix,
		scene.modelViewMatrix,
		scene.camera.position
	)

	console.log('camera: ', scene.camera.position)
}


export function drawScene(gl: WebGL2RenderingContext, scene: SceneContext) {
	const programInfo = scene.programInfo

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

	// WebGLに頂点や変換行列の情報を伝える
	setPosirionAttribute(gl, scene.buffers, programInfo)
	gl.useProgram(programInfo.program)

	gl.uniformMatrix4fv(
		programInfo.uniformLocations.projectionMatrix,
		false,
		scene.projectionMatrix
	)
	gl.uniformMatrix4fv(
		programInfo.uniformLocations.modelViewMatrix,
		false,
		scene.modelViewMatrix
	)

	// 描画する
	{
		const offset = 0  // 描画を始める頂点配列のオフセット
		const vertexCount = 4  // 描画する頂点数
		gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount)
	}
}
