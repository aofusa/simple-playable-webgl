import { defineConfig } from '@farmfe/core';

export default defineConfig({
	compilation: {
		presetEnv: false,
		output: {
			publicPath: process.env.NODE_ENV === 'production' ? '/simple-playable-webgl/' : '/'
		}
	}
});
