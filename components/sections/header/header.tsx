import Lottie from 'react-lottie'
import Tilt from 'react-parallax-tilt'
import styles from '../../../styles/Home.module.scss'

import helloAnimation from '../../../public/images/lottie/hello.json'
import Contact from './contact/contact'
import useWindowDimensions from '../../../hooks/useWindowDimensions'

const Header = () => {
	const dimensions = useWindowDimensions()
	const defaultOptions = {
		loop: false,
		autoplay: true,
		animationData: helloAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	}

	const lottieSize = () => {
		const size = {
			height: 0,
			width: 0,
		}
		if(dimensions.width > 0 && dimensions.width < 599) {
			size.height = 250
			size.width = 250
		}
		if(dimensions.width > 600 && dimensions.width < 899) {
			size.height = 400
			size.width = 400
		}
		if(dimensions.width > 900 && dimensions.width < 1199) {
			size.height = 600
			size.width = 600
		}
		if(dimensions.width > 1200 && dimensions.width < 1799) {
			size.height = 800
			size.width = 800
		}
		if(dimensions.width > 1800) {
			size.height = 800
			size.width = 800
		}
		return size
	}

	return (
		<>
			<h1 className={styles.title}>
				Hello
				<br /> I&apos;m{' '}
				<span className={styles.name}>
					Jonathan
					<br /> Elmgren
				</span>
			</h1>
			<Tilt className={styles.lottie} trackOnWindow={true} tiltReverse={true} tiltMaxAngleX={50} tiltMaxAngleY={50}>
				<Lottie options={defaultOptions} {...lottieSize()} />
			</Tilt>
			<Contact />
		</>
	)
}

export default Header
