import style from '../../../../../../styles/Home.module.scss'

const CardButton = (props: any) => {

	const hasLink = (link: any) => {
		if (link === '#') return false
		return true
	}

	const classname = props.className ? props.className : ''
	return (
		<button className={`${style.buttontext} ${classname} ${hasLink(props.href) ? '' : style.disabled}`} onClick={() => (window.open(props.href,'_blank'))}>
			{props.text}
		</button>
	)
}

export default CardButton
