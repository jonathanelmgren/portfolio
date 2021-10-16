import styles from '../../../styles/Home.module.scss'
import { useEffect, useState, useRef } from 'react'
import useWindowDimensions from '../../../hooks/useWindowDimensions'

const Whatido = () => {
	const [activeSpan, setActiveSpan] = useState<number>(1)
	const [toolsToggle, setToolsToggle] = useState<boolean>(false)
	const dimensions = useWindowDimensions()
	const spanRef = useRef<any>()
	const spanWidth = spanRef.current ? spanRef.current.offsetWidth : 156
	const span: any = [
		{ id: 0, text: 'amazing' },
		{ id: 1, text: 'staggering' },
		{ id: 2, text: 'astonishing' },
		{ id: 3, text: 'flabbergasting' },
		{ id: 4, text: 'dazzling' },
		{ id: 5, text: 'surprising' },
		{ id: 6, text: 'wonderful' },
		{ id: 7, text: 'unbelievable' },
		{ id: 8, text: 'prodigious' },
		{ id: 9, text: 'stunning' },
		{ id: 10, text: 'fascinating' },
		{ id: 11, text: 'marvelous' },
		{ id: 12, text: 'incredible' },
	]

	const displaySpans = () => {
		return span.map((span: any) => (
			<span key={span.id} ref={checkSpan(span.id - 1) ? spanRef : null} className={`${styles.span} ${checkSpan(span.id) ? styles.active : ''} ${checkSpan(span.id + 1) ? styles.notactive : ''}`}>
				&nbsp;{span.text}&nbsp;
			</span>
		))
	}

	const checkSpan = (id: any) => {
		let spanid = id
		if (id >= span.length) {
			spanid = 0
		}
		return isSpan(spanid)
	}

	const isSpan = (id: any) => {
		if (id === activeSpan) return true
		return false
	}

	const toolsDesktop = () => {
		return (
			<div className={styles.cardmisc}>
				<h3>Tools I use</h3>
				<div className={styles.misctitles}>
					<ul>
						<li>ReactJS</li>
						<ul>NextJS</ul>
						<li>NodeJS</li>
						<ul>ExpressJS</ul>
						<li>MongoDB</li>
						<li>Wordpress</li>
					</ul>
					<ul>
						<h6>With:</h6>
						<li>Sass</li>
						<li>Redux</li>
						<li>Styled components</li>
						<li>Material UI</li>
						<li>Passport</li>
						<li>And more...</li>
					</ul>
				</div>
			</div>
		)
	}
	const toolsMobile = () => {
		const miscStyle = toolsToggle ? { transform: 'translateY(0%)' } : { transform: 'translateY(90%)' }
		return (
			<div className={styles.cardmisc} style={miscStyle} onClick={() => setToolsToggle(!toolsToggle)}>
				<h3>Tools I use</h3>
				<div className={styles.misctitles}>
					<ul>
						<li>ReactJS</li>
						<ul>NextJS</ul>
						<li>NodeJS</li>
						<ul>ExpressJS</ul>
						<li>MongoDB</li>
						<li>Wordpress</li>
					</ul>
					<ul>
						<h6>With:</h6>
						<li>Sass</li>
						<li>Redux</li>
						<li>Styled components</li>
						<li>Material UI</li>
						<li>Passport</li>
						<li>And more...</li>
					</ul>
				</div>
			</div>
		)
	}

	const displayTools = () => {
		if (dimensions.width < 900) return toolsMobile()
		return toolsDesktop()
	}

	useEffect(() => {
		setTimeout(() => {
			if (span.length - 1 > activeSpan) {
				setActiveSpan(activeSpan + 1)
			} else {
				setActiveSpan(0)
			}
		}, 2000)
	})

	return (
		<div className={styles.cardcontainer}>
			<div className={styles.card}>
				<h1 className={styles.title}>
					I make
					{displaySpans()}
					<span className={styles.afterspan} style={{ marginLeft: `${spanWidth}px` }}>
						{dimensions.width < 700 ? <br /> : null}websites
					</span>
				</h1>
				<p>
					Developing websites the way you like it. <br />
					<br /> With experience in both front- &#38; backend development I am more than happy to help you make your dream website. Whether it is a static or a dynamic webapp. <br />
					<br /> I will most likely develop your website in React, maybe even with a framework like Next.js. If you also need a backend I can asure you nothing will go wrong with Node combined with Express and MongoDB (MERN FTW).
					<br />
					<br />
					<br /> Is the above text just gibberish for you? Don&#39;t panic - I make websites using some of the most used programming languages in the market.
				</p>
			</div>
			{displayTools()}
		</div>
	)
}

export default Whatido
