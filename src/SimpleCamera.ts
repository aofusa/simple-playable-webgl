import type { vec3 } from "gl-matrix"
import { KeyState } from "./KeyInput"


export class Camera {
	fieldOfView: number
	aspect: number
	zNear: number
	zFar: number
	position: vec3
	center: vec3
	up: vec3

	constructor(fieldOfView: number, aspect: number, zNear: number, zFar: number, position: vec3, center: vec3, up: vec3) {
		this.fieldOfView = fieldOfView
		this.aspect = aspect
		this.zNear = zNear
		this.zFar = zFar
		this.position = position
		this.center = center
		this.up = up
	}

	update(dt: DOMHighResTimeStamp) {
		// カメラの移動
		if (KeyState.right) {this.position[0] -= 0.1 * dt}
		if (KeyState.left) {this.position[0] += 0.1 * dt}
		if (KeyState.up) {this.position[2] += 0.1 * dt}
		if (KeyState.down) {this.position[2] -= 0.1 * dt}
	}
}
