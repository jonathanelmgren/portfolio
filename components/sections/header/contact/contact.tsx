import { useState } from 'react'
import { useTransition, animated } from 'react-spring'
import Clipboard from 'react-clipboard.js'

import styles from '../../../../styles/Home.module.scss'

const Contact = () => {
	const [isCopied, setIsCopied] = useState(false)
	const transition = useTransition(isCopied, {
		from: { x: 0, y: 55, opacity: 0 },
		enter: { x: 0, y: 0, opacity: 1 },
		leave: { x: 0, y: -300, opacity: 0 },
	})

	const copyEmail = () => {
		setIsCopied(true)
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}

	return (
		<div className={styles.contactContainer}>
			{transition((style, item) =>
				item ? (
					<div className={styles.copiedcontainer}>
						<animated.div style={style} className={styles.messagebubble}>
							Copied :)
						</animated.div>
					</div>
				) : null
			)}
			<Clipboard component='a' button-href='#' data-clipboard-text='jonathan@elmgren.dev' className={styles.contactbtn} onClick={() => copyEmail()}>
				<svg viewBox='0 0 512 512' fill='currentColor' width='24'>
					<path d='M467 76H45a45 45 0 00-45 45v270a45 45 0 0045 45h422a45 45 0 0045-45V121a45 45 0 00-45-45zm-6.3 30L287.8 278a44.7 44.7 0 01-63.6 0L51.3 106h409.4zM30 384.9V127l129.6 129L30 384.9zM51.3 406L181 277.2l22 22c14.2 14.1 33 22 53.1 22 20 0 38.9-7.9 53-22l22-22L460.8 406H51.3zM482 384.9L352.4 256 482 127V385z' />
				</svg>
				jonathan@elmgren.dev
			</Clipboard>
		</div>
	)
}
export default Contact
