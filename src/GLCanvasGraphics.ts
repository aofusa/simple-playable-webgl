import { drawScene, initScene, updateScene } from "./Scene"
import type { SceneContext } from "./Scene"


export function setupGLCanvasGraphics(canvas: HTMLCanvasElement) {
	const gl = canvas.getContext("webgl2")

	if (gl === null) {
		console.warn("not HTMLCanvasElement")
		return
	}

	const sceneContext = initScene(gl)
	if (sceneContext === null) {
		console.warn("init scene error")
		return
	}

	setupRender(gl, sceneContext)
}


function eventLoop(gl: WebGL2RenderingContext, scene: SceneContext, dt: DOMHighResTimeStamp) {
	updateScene(scene, dt)
	drawScene(gl, scene)
}


function setupRender(gl: WebGL2RenderingContext, scene: SceneContext) {
	const fps = import.meta.env.VITE_STANDARD_FPS
	const fpsMillSecond = 1000 / fps
	let then: DOMHighResTimeStamp = performance.now()

	const render = (now: DOMHighResTimeStamp) => {
		const deltaTime = (now - then) / fpsMillSecond  // 1秒間にfpsで規定された時間処理されることを期待する
		then = now

		eventLoop(gl, scene, deltaTime)
		requestAnimationFrame(render)
	}

	requestAnimationFrame(render)
}

