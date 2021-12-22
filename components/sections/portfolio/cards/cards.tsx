import { useRef, useState, useEffect } from 'react'
import styles from '../../../../styles/Home.module.scss'
import Stack from './stack/stack'
import cards from './cards.json'
import CardButton from './stack/button/button'
import Image from 'next/image'

import prevArrow from './images/svg/previous.svg'
import nextArrow from './images/svg/next.svg'
import useWindowDimensions from '../../../../hooks/useWindowDimensions'

const Cards = () => {
	const { height, width } = useWindowDimensions()

	const [isHovered, setIsHovered] = useState({ id: 5, hovered: false })
	const [slideCount, setSlideCount] = useState<any>(0)
	const [opacity, setOpacity] = useState<any>(0)
	const [opacityTransition, setOpacityTransition] = useState<any>(true)
	const cardRef = useRef<any>(null)

	const cardWidth = cardRef.current ? cardRef.current.offsetWidth + 40 : 0

	const marginDimensions = () => {
		if (width > 1900) return width * 0.4
		if (width > 1000) return width * 0.3
		if (width > 800) return width * 0.2
		if (width < 800) return width * 0.1
	}

	const hoverEffect = (id: number) => {
		if (isHovered.id === id && isHovered.hovered) {
			return true
		}
		return false
	}

	useEffect(() => {
		setTimeout(() => {
			setOpacityTransition(true)
		}, 200)
	}, [slideCount])

	const moveRight = () => {
		setOpacityTransition(false)
		if (slideCount < cards.length - 1) {
			setSlideCount(slideCount + 1)
		} else {
			setSlideCount(0)
		}
	}
	const moveLeft = () => {
		setOpacityTransition(false)
		if (slideCount! > 0) {
			setSlideCount(slideCount - 1)
		} else {
			setSlideCount(cards.length - 1)
		}
	}

	const cardStyle = (card: any) => {
		const hovered = hoverEffect(card.id)
		const id = parseInt(card.id)
		const shadow = 'inset 0 0 0 2000px rgba(0, 0, 0, 0.3)'
		const style = {
			backgroundImage: `url(${card.image})`,
			transform: `translateX(-${cardWidth * slideCount}px)`,
		}
		if (id === slideCount && hovered) {
			return { ...style, boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.5)' }
		} else if (id === slideCount) {
			return style
		} else if (id === slideCount + 1) {
			return { ...style, opacity: 0.6, boxShadow: shadow }
		} else if (id === slideCount - 1) {
			return { ...style, opacity: 0.1, boxShadow: shadow }
		} else if (id < slideCount - 1) {
			return { ...style, opacity: 0, boxShadow: shadow }
		} else {
			return { ...style, opacity: 0.2, boxShadow: shadow }
		}
	}

	const renderCardInfo = (card: any) => {
		const id = parseInt(card.id)

		if (id === slideCount) {
			return (
				<>
					<div className={styles.cardhead} style={opacityTransition ? { transition: 'all 0.4s ease-in-out', opacity: '1' } : { transition: 'none', opacity: '0' }}>
						<div className={styles.cardtitle} style={hoverEffect(card.id) ? { opacity: '0' } : { opacity: '1' }}>
							<span>{card.title}</span>
						</div>
						<div style={{ opacity: 0.75 }} className={styles.stack}>
							<Stack stack={card.stack} />
						</div>
					</div>
					<div className={styles.cardHover} style={hoverEffect(card.id) ? { opacity: '1' } : { opacity: '0' }}>
						<div className={styles.cardText}>
							<div className={styles.description}>
								<div className={styles.toolscontainer}>
									<div className={styles.tools}>
										<h5>Tools:</h5>
										<ul>
											{card.notables.map((x: any) => (
												<li key={Math.random()}>{x}</li>
											))}
										</ul>
									</div>
								</div>
								<p>{card.description}</p>
							</div>
						</div>
						<div className={styles.cardButtons}>
							<CardButton className={styles.viewcode} text='View Code' href={card.source} />
							<CardButton className={styles.viewlive} text='View Live' href={card.live} />
						</div>
					</div>
				</>
			)
		}
		return null
	}

	const displayCards = () => {
		return (
			<>
				<div className={styles.cardcontainer} style={{ marginLeft: marginDimensions() }}>
					{cards.map((card: any) => (
						<div key={card.id}>
							<div className={styles.card} ref={cardRef} style={cardStyle(card)} onMouseEnter={() => setIsHovered({ id: card.id, hovered: true })} onMouseLeave={() => setIsHovered({ id: card.id, hovered: false })}>
								{renderCardInfo(card)}
							</div>
						</div>
					))}
				</div>
				<div className={styles.navigationArrows} style={{ marginLeft: marginDimensions() }}>
					<Image src={nextArrow} className={styles.next} alt='Next' onClick={() => moveRight()} />
					<Image
						src={prevArrow}
						className={styles.previous}
						alt='Prev'
						onClick={() => {
							moveLeft()
						}}
					/>
				</div>
			</>
		)
	}

	return displayCards()
}

export default Cards
