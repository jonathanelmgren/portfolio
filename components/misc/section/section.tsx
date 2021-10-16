import styles from '../../../styles/Home.module.scss'
import Pagetitle from '../pagetitle/pagetitle'

const Section = (props: any) => {
    const classname = props.classname ? props.classname : ''
	const id = props.id ? props.id : ''
    const titleOrNot = () => {
        if(!props.title) return
        return <Pagetitle title={props.title} />
    }
	return (
		<section className={`${styles.section} ${classname}`} id={id}>
			{titleOrNot()}
			{props.children}
		</section>
	)
}

export default Section
