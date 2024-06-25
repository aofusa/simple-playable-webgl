
export type PositionBuffer = {
	position: WebGLBuffer,
	color: WebGLBuffer,
}


export function initBuffers(gl: WebGL2RenderingContext): PositionBuffer | null {
	const positionBuffer = initPositionBuffer(gl)
	if (positionBuffer === null) {
		console.warn("init buffer error")
		return null
	}
	const colorBuffer = initColorBuffer(gl)
	if (colorBuffer === null) {
		console.warn("init color buffer error")
		return null
	}

	const buffer: PositionBuffer = {
		position: positionBuffer,
		color: colorBuffer,
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


function initColorBuffer(gl: WebGL2RenderingContext): WebGLBuffer | null {
	// 各頂点の頂点カラー配列
	const colors = [
		1.0, 1.0, 1.0, 1.0,  // white
		1.0, 0.0, 0.0, 1.0,  // red
		0.0, 1.0, 0.0, 1.0,  // green
		0.0, 0.0, 1.0, 1.0,  // blue
	]

	const colorBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

	return colorBuffer
}
