
export function initShaderProgram(gl: WebGL2RenderingContext, vsSource: string, fsSource: string): WebGLProgram | null {
	const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
	const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
	if (vertexShader === null) {
		console.warn("vertex shader load error")
		return null
	}
	if (fragmentShader === null) {
		console.warn("fragmen shader load error")
		return null
	}

	const shaderProgram = gl.createProgram()
	if (shaderProgram === null) {
		console.warn("shader compile eror")
		return null
	}
	gl.attachShader(shaderProgram, vertexShader)
	gl.attachShader(shaderProgram, fragmentShader)
	gl.linkProgram(shaderProgram)

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.warn("shader init error: ", gl.getProgramInfoLog(shaderProgram))
		return null
	}

	return shaderProgram
}


function loadShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null {
	const shader = gl.createShader(type)
	if (shader === null) {
		console.warn("load shader source error")
		return null
	}
	gl.shaderSource(shader, source)
	gl.compileShader(shader)

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.warn("compile shader error: ", gl.getShaderInfoLog(shader))
		return null
	}

	return shader
}

