import {
	settingPageAtom,
	SettingPagePath,
	SettingPage
} from '@stores/setting-page'

import { SettingLayout, SettingTab, settings } from '@layouts/settings'

import tw from '@tailwind'

const FilterSetting = () => {
	return (
		<SettingLayout
			title="Filter"
			labels={[
				'Remove unwanted tags or keyword from your discover page.'
			]}
		>
			<section
				className={tw`flex sm:hidden flex-col gap-1 w-full rounded-lg`}
			>
				{settings.map(([label, icon, color], index) => (
					<>
						{index !== 0 ? (
							<div
								aria-hidden
								className={tw`w-full h-[1px] bg-gray-200 dark:bg-gray-600`}
							/>
						) : null}
						<SettingTab
							href={label.replace(' ', '-')}
							icon={icon}
							color={color}
						>
							{label}
						</SettingTab>
					</>
				))}
			</section>
		</SettingLayout>
	)
}

export default FilterSetting