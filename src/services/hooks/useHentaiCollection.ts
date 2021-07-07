import { useState, useRef, useCallback, useReducer, useMemo, useEffect } from 'react'

import { useAtom } from 'jotai'
import { preferenceAtom } from '@stores/settings'

import { copy } from '@services/array'
import { randomBetween } from '@services/random'
import { tags as defaultPreference } from '@services/data'

import type { Stories } from '@types'

interface UseHentaiCollectionResult {
	stories: Stories
	fetchMore: () => Promise<void>
	isEnd: boolean
}

// eslint-disable-next-line no-unused-vars
type UseHentaiCollection = (initial: Stories) => UseHentaiCollectionResult

const useHentaiCollection: UseHentaiCollection = (initial) => {
	let [{ useDefaultPreference, preferenceList }] = useAtom(preferenceAtom)

	let tags = useMemo(
		() =>
			useDefaultPreference || !preferenceList.length
				? defaultPreference
				: preferenceList,
		[useDefaultPreference, preferenceList]
	)

	let [stories, updateStories] = useState(initial)
	let [isEnd, setAsEnd] = useReducer(() => true, false)

	let availableTag = useRef(copy(tags))
	let page = useRef(1)

	let randomTag = useCallback(() => {
		if (availableTag.current.length === 0) {
			availableTag.current = copy(tags)
			page.current += 1
		}

		let [tag] = availableTag.current.splice(
			randomBetween(0, availableTag.current.length - 1),
			1
		)

		return tag
	}, [tags])

	useEffect(() => {
		availableTag.current = copy(tags)
	}, [tags])

	let fetchMore = useCallback(async () => {
		let tag = randomTag()

		let newStories: Stories = await fetch(
			`/api/preview/${tag}/${page.current}`
		).then((res) => res.json())

		if (newStories)
			updateStories(stories.concat(newStories))
		else setAsEnd()
	}, [stories, tags])

	return { stories, fetchMore, isEnd }
}

export default useHentaiCollection
