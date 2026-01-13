import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
	api: {
		projectId: 'uen7ijyc',
		dataset: 'production',
	},
	studioHost: 'tolo-trivia',
	deployment: {
		appId: 'jnjrkezyi269rnpzm80zs61v',
		/**
		 * Enable auto-updates for studios.
		 * Learn more at https://www.sanity.io/docs/cli#auto-updates
		 */
		autoUpdates: true,
	},
})
