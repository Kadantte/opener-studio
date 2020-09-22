import { StoreonModule } from 'storeon'

import { initPersist, setPersist } from '@libs'

import { SettingStore, SettingEvent } from './types'

const Setting: StoreonModule<SettingStore, SettingEvent> = (store) => {
	store.on('@init', () => ({ safeMode: initPersist('safeMode', false) }))

	store.on('UPDATE_SAFE_MODE', (store, safeMode) => {
		setPersist('safeMode', safeMode)

		return {
			...store,
			safeMode
		}
	})
}

export type { SettingStore, SettingEvent }
export default Setting