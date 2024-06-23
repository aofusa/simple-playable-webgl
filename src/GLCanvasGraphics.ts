import { drawScene, initScene, updateScene } from "./Scene"
import type { SceneContext } from "./Scene"


const FPS = 1000 / 60


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

	setInterval(eventLoop, FPS, gl, sceneContext)
}


function eventLoop(gl: WebGL2RenderingContext, scene: SceneContext) {
	updateScene(scene)
	drawScene(gl, scene)
}

