
export const KeyState = {
	right: false,
	left: false,
	up: false,
	down: false,
}


document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)


function keyDownHandler(e: KeyboardEvent) {
	if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
		console.log('right press')
		KeyState.right = true
	}
	if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
		console.log('left press')
		KeyState.left = true
	}
	if (e.key === "Up" || e.key === "ArrowUp" || e.key === "w") {
		console.log('up press')
		KeyState.up = true
	}
	if (e.key === "Down" || e.key === "ArrowDown" || e.key === "s") {
		console.log('down press')
		KeyState.down = true
	}
}


function keyUpHandler(e: KeyboardEvent) {
	if (e.key === "Right" || e.key === "ArrowRight" || e.key === "d") {
		console.log('right release')
		KeyState.right = false
	}
	if (e.key === "Left" || e.key === "ArrowLeft" || e.key === "a") {
		console.log('left release')
		KeyState.left = false
	}
	if (e.key === "Up" || e.key === "ArrowUp" || e.key === "w") {
		console.log('up release')
		KeyState.up = false
	}
	if (e.key === "Down" || e.key === "ArrowDown" || e.key === "s") {
		console.log('down release')
		KeyState.down = false
	}
}

