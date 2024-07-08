import type { DrawableInterface } from './DrawableInterface'
import type { ProgramInfoInterface } from "./ShaderProgramInterface"
import { initBuffers, type PositionBuffer } from "./RectBuffer"
import type { SceneContext } from './Scene'
import { mat4, vec4, type vec3 } from 'gl-matrix'


export class RainbowRectObject implements DrawableInterface {
	programInfo: ProgramInfoInterface
	buffers: PositionBuffer
	scene: SceneContext
	positionMatrix: mat4
	color: Float32Array

	constructor(gl: WebGL2RenderingContext, position: vec3, programInfo: ProgramInfoInterface, scene: SceneContext) {
		this.programInfo = programInfo

		const buffers = initBuffers(gl)
		if (buffers === null) {
			console.warn("init buffer error")
			throw "init buffer error"
		}
		this.buffers = buffers

		this.color = new Float32Array([
			1.0, 1.0, 0.0, 1.0,  // magenta
			0.0, 1.0, 1.0, 1.0,  // cyan
			1.0, 0.0, 1.0, 1.0,  // yellow
			0.0, 0.0, 1.0, 1.0,  // red
		])

		this.scene = scene

		this.positionMatrix = mat4.create()
		mat4.translate(
			this.positionMatrix,
			this.positionMatrix,
			position
		)
	}

	update(dt: DOMHighResTimeStamp) {
		const leftUpper = this.color.subarray(0, 4)
		const rightUpper = this.color.subarray(4, 8)
		const leftLower = this.color.subarray(8, 12)
		const rightLower = this.color.subarray(12, 16)

		const colors = [leftUpper, rightUpper, leftLower, rightLower]

		const rotateColors = colors
			.map((x, _index, _array) => rgb2hsv(x))
			.map((x, _index, _array) => rotateHue(x, 1 * dt))
			.map((x, _index, _array) => hsv2rgb(x))

		leftUpper[0] = rotateColors[0][0]
		leftUpper[1] = rotateColors[0][1]
		leftUpper[2] = rotateColors[0][2]
		leftUpper[3] = rotateColors[0][3]

		rightUpper[0] = rotateColors[1][0]
		rightUpper[1] = rotateColors[1][1]
		rightUpper[2] = rotateColors[1][2]
		rightUpper[3] = rotateColors[1][3]

		leftLower[0] = rotateColors[2][0]
		leftLower[1] = rotateColors[2][1]
		leftLower[2] = rotateColors[2][2]
		leftLower[3] = rotateColors[2][3]

		rightLower[0] = rotateColors[3][0]
		rightLower[1] = rotateColors[3][1]
		rightLower[2] = rotateColors[3][2]
		rightLower[3] = rotateColors[3][3]
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
		mat4.mul(modelViewMatrix, this.scene.modelViewMatrix, this.positionMatrix)

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

		// 各頂点の頂点カラーを更新する
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color)
		gl.bufferData(gl.ARRAY_BUFFER, this.color, gl.STATIC_DRAW)

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
		// console.warn("undefined vertex position index in shader. skip")
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
		// console.warn("undefined vertex color index in shader. skip")
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


function rgb2hsv(rgba: vec4): vec4 {
	const correctColor = rgba
		.map((x, _index, _array) => Math.max(0.0, x))
		.map((x, _index, _array) => Math.min(1.0, x))
		.map((x, _index, _array) => Math.round(x * 255.0))

	const red = correctColor[0]
	const green = correctColor[1]
	const blue = correctColor[2]
	// const alpha = correctColor[3]

	const max = Math.max(red, green, blue)
	const min = Math.min(red, green, blue)

	let hue = 0
	const saturation = (max - min) / max
	const valueBrightness = max / 255.0

	if (
		Math.abs(red - green) < Number.EPSILON &&
		Math.abs(green - blue) < Number.EPSILON &&
		Math.abs(blue - red) < Number.EPSILON
	) {
		hue = 0
	} else {
		if (red >= green && red >= blue) {
			hue = 60 * ((green - blue) / (max - min))
		} else if (green >= red && green >= blue) {
			hue = 60 * ((blue - red) / (max - min)) + 120
		} else if (blue >= red && blue >= green) {
			hue = 60 * ((red - green) / (max - min)) + 240
		}
		if (hue < 0) { hue += 360 }
		hue = hue / 360.0
	}

	return vec4.fromValues(hue, saturation, valueBrightness, rgba[3])
}


function hsv2rgb(hsv: vec4): vec4 {
	const hue = Math.min(360, Math.max(0, hsv[0] * 360.0))
	const saturation = hsv[1] * 255.0
	const valueBrightness = hsv[2] * 255.0
	// const alpha = hsv[3] * 255.0

	const max = Math.max(saturation, valueBrightness)
	const min = max - ((saturation / 255.0) * max)

	let red = 0
	let green = 0
	let blue = 0

	if (hue >= 0 && hue < 60) {
		red = max
		green = (hue / 60) * (max - min) + min
		blue = min
	} else if (hue >= 60 && hue < 120) {
		red = ((120 - hue) / 60) * (max - min) + min
		green = max
		blue = min
	} else if (hue >= 120 && hue < 180) {
		red = min
		green = max
		blue = ((hue - 120) / 60) * (max - min) + min
	} else if (hue >= 180 && hue < 240) {
		red = min
		green = ((240 - hue) / 60) * (max - min) + min
		blue = max
	} else if (hue >= 240 && hue < 300) {
		red = ((hue - 240) / 60) * (max - min) + min
		green = min
		blue = max
	} else if (hue >= 300 && hue <= 360) {
		red = max
		green = min
		blue = ((360 - hue) / 60) * (max - min) + min
	}

	red /= 255.0
	green /= 255.0
	blue /= 255.0

	return vec4.fromValues(red, green, blue, hsv[3])
}


function rotateHue(hsv: vec4, degree: number): vec4 {
	let hue = hsv[0] * 360.0 + degree
	if (hue >= 360) {
		hue = hue - 360
	}
	hue = hue / 360
	return vec4.fromValues(hue, hsv[1], hsv[2], hsv[3])
}

