/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_STANDARD_FPS: number
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}

