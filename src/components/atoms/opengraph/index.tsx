import Head from 'next/head'
import { useRouter } from 'next/router'

import type { OpenGraphComponent } from './types'

const OpenGraph: OpenGraphComponent = ({
	title = 'Opener Studio',
	alternativeTitle = [],
	description = 'Pinterest but for hentai and 6 digit code.',
	author = '',
	icon = '/assets/icon/icon.png',
	image = {
		info: {
			width: 1920,
			height: 1080,
			type: 'jpg'
		},
		link: 'https://atago.opener.studio/assets/images/cover.jpg'
	},
	name = 'Opener Studio',
	twitterDevAccount = '@SaltyAom',
	id = 0
}) => {
	let { asPath = '/' } = useRouter() ?? { asPath: '/' }

	return (
		<Head>
			<title>{title}</title>
			<meta name="title" content={title} />
			<meta name="description" content={description} />
			<meta name="author" content={author} />
			<link rel="icon" href={icon} />
			<link rel="shortcut icon" href={icon} />
			<link
				rel="canonical"
				href={`https://atago.opener.studio${asPath}`}
			/>
			<meta
				name="keyword"
				content={`${title},${
					alternativeTitle.length
						? `${alternativeTitle.join(',')},`
						: ''
				}${author},Opener Studio${id ? `,${id}` : ''}`}
			/>

			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="article:author" content={author} />
			<meta property="og:site_name" content={name} />
			<meta property="og:image" content={image.link} />
			<meta
				property="og:image:width"
				content={image.info.width.toString()}
			/>
			<meta
				property="og:image:height"
				content={image.info.height.toString()}
			/>
			<meta property="og:locale" content="en_US" />
			<meta property="og:type" content="website" />
			<meta
				property="og:url"
				content={`https://atago.opener.studio${asPath}`}
			/>

			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:site" content={twitterDevAccount} />
			<meta name="twitter:image" content={image.link} />
			<meta name="twitter:creator" content={twitterDevAccount} />
		</Head>
	)
}

export default OpenGraph
