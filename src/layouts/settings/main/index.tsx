import { useRouter } from 'next/router'

import { SettingPage, SettingPagePath } from '@stores/setting-page'

import {
	Activity,
	File,
	ChevronLeft,
	Edit3,
	Heart,
	Filter,
} from 'react-feather'
import Spacer from '@atoms/spacer'
import OpenGraph from '@atoms/opengraph'

import tw, { combine } from '@tailwind'

import { SettingTab } from './components'
import { SearchSetting, SettingLabels } from '..'

import type { SettingLayoutComponent } from './types'

import styles from './main.module.sass'

export const settings = [
	[
		SettingPagePath[SettingPage.Appearance],
		<Edit3 fill="currentColor" />,
		tw`bg-red-400`
	],
	[SettingPagePath[SettingPage.Performance], <Activity />, tw`bg-blue-400`],
	[SettingPagePath[SettingPage.DataUsage], <File />, tw`bg-green-400`],
	[
		SettingPagePath[SettingPage.Preference],
		<Heart fill="#fff" />,
		tw`bg-red-400`
	],
	[
		SettingPagePath[SettingPage.Filter],
		<Filter fill="currentColor" />,
		tw`bg-indigo-400`
	]
] as const

const MainSettingLayout: SettingLayoutComponent = ({
	children,
	title = 'Settings',
	labels = []
}) => {
	let { back } = useRouter()

	return (
		<>
			<OpenGraph title={`${title} - Opener Studio`} />
			<section className={tw`flex flex-row`}>
				<div
					className={tw`relative hidden sm:flex flex-col w-full max-w-[220px] md:max-w-[260px] h-screen`}
				>
					<aside
						className={tw`fixed t-0 flex flex-col gap-1 max-w-[220px] md:max-w-[240px] w-full h-screen px-3 py-5 bg-white dark:bg-gray-900 border-0 border-r border-solid border-gray-200 dark:border-gray-700 overflow-x-hidden overflow-y-auto`}
					>
						<SearchSetting tint dense />
						{settings.map(([label, icon, color]) => (
							<SettingTab
								href={label.replace(' ', '-')}
								icon={icon}
								color={color}
							>
								{label}
							</SettingTab>
						))}
					</aside>
				</div>
				<main
					key={title}
					className={combine(
						tw`flex flex-col justify-start items-start w-full max-w-[580px] mx-auto px-6 py-6 lg:py-12 md:py-12`,
						styles['setting-layout']
					)}
				>
					<button
						className={tw`appearance-none flex flex-row items-center text-gray-500 dark:text-gray-400 text-lg font-medium mb-2 pl-0 pr-3 py-1 bg-transparent hover:bg-gray-100 focus:bg-gray-100 dark:hover:bg-gray-700 dark:focus:bg-gray-700 border-0 rounded cursor-pointer`}
						onClick={back}
						title="Back to previous page"
						aria-label="Back to previous page"
						type="button"
					>
						<ChevronLeft className={tw`mr-1`} />
						Back
					</button>
					<h1
						className={tw`text-4xl text-gray-900 dark:text-gray-200 font-semibold my-2`}
					>
						{title}
					</h1>
					<SettingLabels id="settings" labels={labels} />
					<Spacer small />

					{children}
				</main>
			</section>
		</>
	)
}

export { SettingTab } from './components'

export default MainSettingLayout
