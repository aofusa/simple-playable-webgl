import { mat4, quat, vec3, vec4 } from "gl-matrix"
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
	rotate: quat

	static DefaultCenter: vec3 = vec3.fromValues(0, 0, 1)

	constructor(fieldOfView: number, aspect: number, zNear: number, zFar: number, position: vec3, center: vec3, up: vec3) {
		this.fieldOfView = fieldOfView
		this.aspect = aspect
		this.zNear = zNear
		this.zFar = zFar
		this.position = position
		this.center = center
		this.up = up

		this.mouseSensitivity = 10
		this.moveSpeed = 0.1

		this.rotate = quat.create()

		if (vec3.dot(center, Camera.DefaultCenter) < 1.0) {
			const angle = vec3.angle(center, Camera.DefaultCenter)
			const axis = vec3.create()
			vec3.cross(axis, Camera.DefaultCenter, center)
			quat.setAxisAngle(this.rotate, axis, angle)
		}
	}

	update(dt: DOMHighResTimeStamp) {
		// カメラの姿勢制御
		if (MouseState.left) {
			const d = this.mouseSensitivity * dt
			const dx = (d * -MouseState.dx * Math.PI) / 180
			const dy = (d * -MouseState.dy * Math.PI) / 180
			const q = quat.create()
			quat.fromEuler(q, dy, dx, 0)
			quat.mul(this.rotate, this.rotate, q)
			MouseState.dx = 0
			MouseState.dy = 0
		}

		// 姿勢制御結果を視線に反映
		vec3.transformQuat(this.center, Camera.DefaultCenter, this.rotate)

		// カメラの移動(XZ平面のみに縛る)
		let angle = vec3.angle(
			vec3.fromValues(this.center[0], 0, this.center[2]),
			Camera.DefaultCenter
		)
		if (this.center[0] < 0) { angle = -angle }

		// カメラの移動方向を現在の視線の方向に合わせる
		const move = vec3.create()
		if (KeyState.right) {move[0] -= 0.1 * dt}
		if (KeyState.left) {move[0] += 0.1 * dt}
		if (KeyState.up) {move[2] += 0.1 * dt}
		if (KeyState.down) {move[2] -= 0.1 * dt}
		vec3.rotateY(move, move, [0, 0, 0], angle)
		vec3.add(this.position, this.position, move)
	}
}
