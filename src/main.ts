import { setupGLCanvasGraphics } from './GLCanvasGraphics';


function main() {
	const glCanvas = document.querySelector<HTMLCanvasElement>("#gl-canvas")
	if (glCanvas) {
		console.log(glCanvas)
		setupGLCanvasGraphics(glCanvas)
	} else {
		console.warn("#gl-canvas not found")
	}
}


main()

