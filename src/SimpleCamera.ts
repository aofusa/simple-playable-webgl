import { vec3 } from "gl-matrix"
import { KeyState } from "./KeyInput"
import { MouseState } from "./MouseInput"


export class Camera {
	fieldOfView: number
	aspect: number
	zNear: number
	zFar: number
	position: vec3
	center: vec3
	up: vec3

	mouseSensitivity: number
	moveSpeed: number
	defaultCenter: vec3

	constructor(fieldOfView: number, aspect: number, zNear: number, zFar: number, position: vec3, center: vec3, up: vec3) {
		this.fieldOfView = fieldOfView
		this.aspect = aspect
		this.zNear = zNear
		this.zFar = zFar
		this.position = position
		this.center = center
		this.up = up

		this.mouseSensitivity = 0.25
		this.moveSpeed = 0.1
		this.defaultCenter = vec3.fromValues(center[0], 0, center[2])
		vec3.normalize(this.defaultCenter, this.defaultCenter)
	}

	update(dt: DOMHighResTimeStamp) {
		// カメラの移動
		if (MouseState.left) {
			const d = this.mouseSensitivity * dt
			vec3.rotateY(this.center, this.center, [0, 0, 0], (d * -MouseState.dx * Math.PI) / 180)
			vec3.rotateX(this.center, this.center, [0, 0, 0], (d * -MouseState.dy * Math.PI) / 180)
		}

		let angle = vec3.angle(
			vec3.fromValues(this.center[0], 0, this.center[2]),
			this.defaultCenter
		)
		if (this.center[0] < 0) { angle = -angle }

		const move = vec3.create()
		if (KeyState.right) {move[0] -= 0.1 * dt}
		if (KeyState.left) {move[0] += 0.1 * dt}
		if (KeyState.up) {move[2] += 0.1 * dt}
		if (KeyState.down) {move[2] -= 0.1 * dt}
		vec3.rotateY(move, move, [0, 0, 0], angle)
		vec3.add(this.position, this.position, move)

		MouseState.dx = 0
		MouseState.dy = 0
	}
}
