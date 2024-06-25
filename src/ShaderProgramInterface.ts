
export interface ProgramInfoInterface {
	getProgram(): WebGLProgram
	getAttribLocation(name: string): number | undefined
	getUniformLocation(name: string): WebGLUniformLocation | undefined
}

