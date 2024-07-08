import { mat4, vec3 } from "gl-matrix"
import { createShaderProgram as createSimpleShaderProgram } from "./SimpleShaderProgram"
import { createShaderProgram as createColorShaderProgram } from "./ColorShaderProgram"
import { KeyState } from "./KeyInput"
import { RectObject } from "./RectObject"
import type { DrawableInterface } from "./DrawableInterface"
import { RainbowRectObject } from "./RainbowRectObject"
import { BoxObject } from "./BoxObject"


export type Camera = {
	fieldOfView: number,
	aspect: number,
	zNear: number,
	zFar: number,
	position: vec3,
}


export type SceneContext = {
	camera: Camera,
	projectionMatrix: mat4,
	modelViewMatrix: mat4,
	objects: DrawableInterface[],
}


export function initScene(gl: WebGL2RenderingContext): SceneContext | null {
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

	// 描画するシーン情報の作成
	const sceneContext: SceneContext = {
		camera: camera,
		projectionMatrix: projectionMatrix,
		modelViewMatrix: modelViewMatrix,
		objects: [],
	}

	// 描画オブジェクトの準備
	const simpleProgramInfo = createSimpleShaderProgram(gl)
	if (simpleProgramInfo === null) {
		console.warn("create simple program error")
		return null
	}

	const colorProgramInfo = createColorShaderProgram(gl)
	if (colorProgramInfo === null) {
		console.warn("create color program error")
		return null
	}

	const simpleRectObject = new RectObject(gl, vec3.fromValues(0, 0, 0), simpleProgramInfo, sceneContext)
	const colorRectObject = new RectObject(gl, vec3.fromValues(2.5, 0, 0), colorProgramInfo, sceneContext)

	sceneContext.objects.push(simpleRectObject)
	sceneContext.objects.push(colorRectObject)

	const rainbowRectObject = new RainbowRectObject(gl, vec3.fromValues(-2.5, 0, 0), colorProgramInfo, sceneContext)
	sceneContext.objects.push(rainbowRectObject)

	const boxObject = new BoxObject(gl, vec3.fromValues(0, 3, 0), colorProgramInfo, sceneContext)
	sceneContext.objects.push(boxObject)

	// 描写前のWebGL設定
	gl.clearColor(0.0, 0.0, 0.0, 1.0)
	gl.clearDepth(1.0)
	gl.enable(gl.DEPTH_TEST)
	gl.depthFunc(gl.LEQUAL)

	return sceneContext
}


export function updateScene(scene: SceneContext, dt: DOMHighResTimeStamp) {
	// カメラの移動
	if (KeyState.right) {scene.camera.position[0] -= 0.1 * dt}
	if (KeyState.left) {scene.camera.position[0] += 0.1 * dt}
	if (KeyState.up) {scene.camera.position[2] += 0.1 * dt}
	if (KeyState.down) {scene.camera.position[2] -= 0.1 * dt}
	// console.log(dt)

	mat4.identity(scene.modelViewMatrix)
	mat4.translate(
		scene.modelViewMatrix,
		scene.modelViewMatrix,
		scene.camera.position
	)

	// console.log('camera: ', scene.camera.position)
	scene.objects.forEach((obj, _index, _array) => obj.update(dt))
}


export function drawScene(gl: WebGL2RenderingContext, scene: SceneContext) {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
	scene.objects.forEach((obj, _index, _array) => obj.draw(gl))
}
