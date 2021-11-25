import { useState, useEffect } from 'react'
import { useMousePosition } from '../../hooks/useMousePosition'

import styles from '../../styles/Navigation.module.scss'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const Navigation = () => {
	const responsive = useWindowDimensions()
	const [menuExpanded, setMenuExpanded] = useState(false)
	const [curve, setCurve] = useState('M60,500H0V0h60c0,0,20,172,20,250S60,900,60,500z')
	const [testCurve, setTestCurve] = useState({ x: 10, y: 0 })
	const mousePosition = useMousePosition()

	const mobile = 600
	const tablet = 750
	const laptop = 1200
	const desktop = 1900

	const dimensions = {
		mobile: responsive.width < mobile,
		tablet: responsive.width < laptop && responsive.width > mobile,
		laptop: responsive.width < desktop && responsive.width > tablet,
		desktop: responsive.width > desktop,
	}

	let height = 1080
	let targetX = 0
	let xitteration = 50
	let yitteration = 50

	let hoverZone = 350

	useEffect(() => {
		animatedCurve()
	}, [mousePosition])

	const easeOut = (currentIteration: any, startValue: any, changeInValue: any, totalIterations: any) => {
		return changeInValue * (-Math.pow(2, (-10 * currentIteration) / totalIterations) + 1) + startValue
	}

	const animatedCurve = () => {
		if (testCurve.x > mousePosition.x - 1 && testCurve.x < mousePosition.x + 1) {
			xitteration = 0
		} else {
			if (menuExpanded) {
				targetX = 0
			} else {
				xitteration = 0
				if (mousePosition.x > hoverZone) {
					targetX = 0
				} else {
					targetX = -((20 / 100) * (mousePosition.x - hoverZone))
				}
			}
			xitteration++
		}

		setTestCurve((prevState) => ({ ...prevState, x: easeOut(xitteration, testCurve.x, targetX - testCurve.x, 100) }))
		setTestCurve((prevState) => ({ ...prevState, y: easeOut(yitteration, testCurve.y, mousePosition.y - testCurve.y, 100) }))

		let anchorDistance = 200
		let curviness = anchorDistance - 60

		setCurve('M60,' + height + 'H0V0h60v' + (testCurve.y - anchorDistance) + 'c0,' + curviness + ',' + testCurve.x + ',' + curviness + ',' + testCurve.x + ',' + anchorDistance + 'S60,' + testCurve.y + ',60,' + (testCurve.y + anchorDistance * 2) + 'V' + height + 'z')
	}

	const navLinks = () => {
		let isMobile: any
		if (dimensions.mobile || dimensions.tablet) isMobile == true
		if (!dimensions.mobile || !dimensions.tablet) isMobile == false
		return (
			<div className={styles['menu-inner']} onMouseLeave={() => setMenuExpanded(false)} onMouseEnter={() => setMenuExpanded(true)}>
				<a href='#header' onClick={() => isMobile ? null : setMenuExpanded(false)}>Hello</a>
				<a href='#whatido' onClick={() => isMobile ? null : setMenuExpanded(false)}>What I do</a>
				<a href='#portfolio' onClick={() => isMobile ? null : setMenuExpanded(false)}>Portfolio</a>
				<a href='#about' onClick={() => isMobile ? null : setMenuExpanded(false)}>About me</a>
				<a href='#contact' onClick={() => isMobile ? null : setMenuExpanded(false)}>Contact</a>
			</div>
		)
	}

	const desktopNav = () => {
		return (
			<div className={styles.container}>
				<div id={styles.menu} className={menuExpanded ? styles.expanded : undefined}>
					<div className={styles.hamburger} style={{ transform: `translate(${testCurve.x}px,${testCurve.y}px)` }}>
						<div className={styles.line}></div>
						<div className={styles.line}></div>
						<div className={styles.line}></div>
					</div>
					{navLinks()}
					<svg version='1.1' id={styles.blob} style={{ width: `${testCurve.x + 60}` }} xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
						<path onMouseEnter={() => setMenuExpanded(!menuExpanded)} id={styles['blob-path']} d={curve} />
					</svg>
				</div>
			</div>
		)
	}

	const mobileNav = () => {
		return (
			<>
				<div className={styles.mobilehamburger} onClick={() => setMenuExpanded(true)} onMouseLeave={() => setMenuExpanded(!menuExpanded)}>
					<svg id='burgericon' xmlns='http://www.w3.org/2000/svg' width='70' height='60'>
						<g className='icon'>
							<rect className='frstbar' x='10' y='12' width='50' height='7' rx='3' ry='3' fill='#fff' />
							<rect className='scndbar' x='10' y='27' width='50' height='7' rx='3' ry='3' fill='#fff' />
							<rect className='thrdbar' x='10' y='42' width='50' height='7' rx='3' ry='3' fill='#fff' />
						</g>
					</svg>
				</div>
				<div className={styles.mobilecontainer}>
					<div id={styles.mobilemenu} className={menuExpanded ? styles.mobileexpanded : undefined}>
						{navLinks()}
						<svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd' className={styles.close} onClick={() => setMenuExpanded(false)}>
							<path d='M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z' />
						</svg>
					</div>
				</div>
			</>
		)
	}

	const responsiveNav = () => {
		if (dimensions.mobile || dimensions.tablet) return mobileNav()
		return desktopNav()
	}

	return responsiveNav()
}

export default Navigation
