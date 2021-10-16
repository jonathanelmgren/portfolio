import styles from '../../../styles/Home.module.scss'

const Pagetitle = (props: any) => {
    return (
        <div className={styles.pagetitlecontainer}>
            <h2 className={styles.pagetitle}>{props.title}</h2>
        </div>
    )
}

export default Pagetitle
