import { mat4, vec3 } from "gl-matrix"
import { createShaderProgram as createSimpleShaderProgram } from "./SimpleShaderProgram"
import { createShaderProgram as createColorShaderProgram } from "./ColorShaderProgram"
import { RectObject } from "./RectObject"
import type { DrawableInterface } from "./DrawableInterface"
import { RainbowRectObject } from "./RainbowRectObject"
import { BoxObject } from "./BoxObject"
import { Camera } from "./SimpleCamera"


export type SceneContext = {
	camera: Camera,
	projectionMatrix: mat4,
	modelViewMatrix: mat4,
	objects: DrawableInterface[],
}


export function initScene(gl: WebGL2RenderingContext): SceneContext | null {
	// カメラの設定を行う
	const camera = new Camera(
		(45 * Math.PI) / 100,  // 視野角45度のラジアン表記
		gl.canvas.width / gl.canvas.height,  // アスペクト比は描画先キャンパスサイズと合わせる
		0.1,  // nearクリップ距離
		100.0,  // farクリップ距離
		[-0.0, 0.0, -6.0],  // Z方向に少し引く
		[0.0, 0.0, 1.0],  // 奥を見る
		[0.0, 1.0, 0.0]  // 上は上
	)

	// 描画用の行列設定
	const projectionMatrix = mat4.create()
	mat4.perspective(projectionMatrix, camera.fieldOfView, camera.aspect, camera.zNear, camera.zFar)

	const modelViewMatrix = mat4.create()
	const center = vec3.create()
	vec3.add(center, camera.position, camera.center)
	mat4.lookAt(
		modelViewMatrix,
		camera.position,
		center,
		camera.up
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
	scene.camera.update(dt)

	mat4.identity(scene.modelViewMatrix)
	const center = vec3.create()
	vec3.add(center, scene.camera.position, scene.camera.center)
	mat4.lookAt(
		scene.modelViewMatrix,
		scene.camera.position,
		center,
		scene.camera.up
	)

	scene.objects.forEach((obj, _index, _array) => obj.update(dt))
}


export function drawScene(gl: WebGL2RenderingContext, scene: SceneContext) {
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
	scene.objects.forEach((obj, _index, _array) => obj.draw(gl))
}
