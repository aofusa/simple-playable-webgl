
export interface DrawableInterface {
	update(dt: DOMHighResTimeStamp): void
	draw(gl: WebGL2RenderingContext): void
}

