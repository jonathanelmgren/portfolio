import Image from 'next/image'
import { useState } from 'react'
import style from '../../../../../styles/Home.module.scss'

import reactSVG from './svg/reactjs.svg'
import wordpressSVG from './svg/wordpress.svg'
import woocommerceSVG from './svg/woocommerce.svg'
import nodeSVG from './svg/nodejs.svg'

const Stack = (props: any) => {
	const [stack, setStack] = useState<any>([])
	const displayStack = () => {
		return props.stack.map((stack: any) => {
			let id = 0
			let src = wordpressSVG
			if (stack === 'wordpress') src = wordpressSVG
			if (stack === 'reactjs') src = reactSVG
			if (stack === 'woocommerce') src = woocommerceSVG
			if (stack === 'nodejs') src = nodeSVG
			return <Image src={src} key={Math.random()} alt='Stack' className={style.image} />
		})
	}

	return <div className={style.stackimage}>{displayStack()}</div>
}

export default Stack
