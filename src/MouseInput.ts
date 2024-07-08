
export const MouseState = {
	x: 0,
	y: 0,
	dx: 0,
	dy: 0,
	left: false,
}


document.addEventListener("mousedown", mouseDownHandler, false)
document.addEventListener("mouseup", mouseUpHandler, false)
document.addEventListener("mousemove", mouseMoveHandler, false)


function mouseDownHandler(e: MouseEvent) {
	MouseState.left = true
	MouseState.x = e.clientX
	MouseState.y = e.clientY
	MouseState.dx = e.movementX
	MouseState.dy = e.movementY
}


function mouseUpHandler(e: MouseEvent) {
	MouseState.left = false
	MouseState.x = e.clientX
	MouseState.y = e.clientY
	MouseState.dx = e.movementX
	MouseState.dy = e.movementY
}


function mouseMoveHandler(e: MouseEvent) {
	MouseState.x = e.clientX
	MouseState.y = e.clientY
	MouseState.dx = e.movementX
	MouseState.dy = e.movementY
}

