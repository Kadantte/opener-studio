import { useEffect, useReducer, useState, useRef, useCallback } from 'react'

import { tags, randomPick, fetch } from '@libs'

import { Stories } from '@types'

const useInfiniteHentai = (initState: Stories) => {
	let [galleries, updateGalleries] = useState(initState)

	let [page, updatePage] = useState(2),
		[shouldFetchMore, fetchMore] = useReducer((state) => state + 1, 0)

	let persistedListener = useRef<() => void>(),
		isLoading = useRef(false),
		loadedTag = useRef<string[]>([]),
		isInitial = useRef(true)

	let lazyListener = useCallback(
		(tag = '') => {
			if (isLoading.current) return

			if (
				document.body.scrollHeight - window.innerHeight * 3.5 >=
				pageYOffset
			)
				return

			fetchMore()

			loadedTag.current = [...loadedTag.current, tag]

			if (loadedTag.current.length < tags.length) return

			// ? Load tag from next page
			loadedTag.current = []
			updatePage(page + 1)
		},
		[page]
	)

	let fetchStories = useCallback(
		(randomTag: string[]) => {
			isLoading.current = true

			fetch(`https://nhapi.now.sh/search/${randomTag}/${page}`)
				.then((newGalleries: Stories) => {
					updateGalleries([...galleries, ...newGalleries])
				})
				.finally(() => {
					isLoading.current = false
				})
		},
		[galleries]
	)

	useEffect(() => {
		let randomTag = randomPick(
			tags.filter((tag) => !loadedTag.current.includes(tag))
		)

		if (!isLoading.current)
			if (isInitial.current) isInitial.current = false
			else fetchStories(randomTag)

		let stopListener = () =>
				window.removeEventListener('scroll', persistedListener.current),
			listener = () => lazyListener(randomTag)

		if (persistedListener.current) stopListener()

		persistedListener.current = listener

		window.addEventListener('scroll', listener, {
			passive: true
		})

		return () => stopListener()
	}, [shouldFetchMore])

	return [galleries]
}

export default useInfiniteHentai
