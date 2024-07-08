
export type PositionBuffer = {
	position: WebGLBuffer,
	color: WebGLBuffer,
	indices: WebGLBuffer,
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
	const indexBuffer = initIndexBuffer(gl)
	if (indexBuffer === null) {
		console.warn("init index buffer error")
		return null
	}

	const buffer: PositionBuffer = {
		position: positionBuffer,
		color: colorBuffer,
		indices: indexBuffer,
	}

	return buffer
}


function initPositionBuffer(gl: WebGL2RenderingContext): WebGLBuffer | null {
	// 立方体の頂点座標の配列
	const position = [
		// 前面
		-1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
		// 背面
		-1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
		// 上面
		-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
		// 底面
		-1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
		// 右側面
		1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
		// 左側面
		-1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
	]

	const positionBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(position), gl.STATIC_DRAW)

	return positionBuffer
}


function initColorBuffer(gl: WebGL2RenderingContext): WebGLBuffer | null {
	const faceColors = [
		[1.0, 1.0, 1.0, 1.0], // 前面: 白
		[1.0, 0.0, 0.0, 1.0], // 背面: 赤
		[0.0, 1.0, 0.0, 1.0], // 上面: 緑
		[0.0, 0.0, 1.0, 1.0], // 底面: 青
		[1.0, 1.0, 0.0, 1.0], // 右側面: 黄
		[1.0, 0.0, 1.0, 1.0], // 左側面: 紫
	]

	// 色の配列をすべての頂点の表に変換する
	let colors: number[]= []

	for (let j = 0; j < faceColors.length; ++j) {
		const c = faceColors[j]
		// 各色を面の 4 つの頂点に対して 4 回繰り返します。
		colors = colors.concat(c, c, c, c)
	}

	const colorBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)

	return colorBuffer
}


function initIndexBuffer(gl: WebGL2RenderingContext): WebGLBuffer | null {
	const indices = [
		0,
		1,
		2,
		0,
		2,
		3, // 前面
		4,
		5,
		6,
		4,
		6,
		7, // 背面
		8,
		9,
		10,
		8,
		10,
		11, // 上面
		12,
		13,
		14,
		12,
		14,
		15, // 底面
		16,
		17,
		18,
		16,
		18,
		19, // 右側面
		20,
		21,
		22,
		20,
		22,
		23, // 左側面
	]

	const indexBuffer = gl.createBuffer()
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW)

	return indexBuffer
}
