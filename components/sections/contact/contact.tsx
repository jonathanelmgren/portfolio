import { useRef, useState } from 'react'
import styles from '../../../styles/Home.module.scss'
import emailjs from 'emailjs-com'
import { useTransition, animated } from 'react-spring'
import Image from 'next/image'

import email from './images/email.svg'
import github from './images/github.svg'

const Contact = () => {
	const [nameIsEmpty, setNameIsEmpty] = useState<boolean>(true)
	const [mailIsEmpty, setMailIsEmpty] = useState<boolean>(true)
	const [messageIsEmpty, setMessageIsEmpty] = useState<boolean>(true)
	const [emailSent, setEmailSent] = useState<boolean>(false)
	const form = useRef<any>()
	const transition = useTransition(emailSent, {
		from: { x: 0, y: -300, opacity: 0 },
		enter: { x: 0, y: 0, opacity: 1 },
		leave: { x: 0, y: 300, opacity: 0 },
	})
	const sendEmail = (e: any) => {
		e.preventDefault()

		emailjs.sendForm('service_hljcmjo', 'template_m19p94a', form.current, 'user_QDGrJgsNzNrSqAikKERQH').then(
			(result) => {
				console.log(result.text)
				mailSuccess()
			},
			(error) => {
				console.log(error.text)
			}
		)
	}
	const mailSuccess = () => {
		setEmailSent(true)
		setTimeout(() => {
			setEmailSent(false)
		}, 3000)
	}
	return (
		<>
			<div className={styles['get-in-touch']}>
				<form ref={form} className={`${styles['contact-form']} ${styles.row}`}>
					<div className={`${styles['form-field']} ${styles.col} ${styles['x-50']}`}>
						<input id={styles.name} className={`${styles['input-text']} ${styles['js-input']} ${nameIsEmpty ? styles[''] : styles['not-empty']}`} type='text' name='username' required onChange={(e: any) => (e.target.value ? setNameIsEmpty(false) : setNameIsEmpty(true))} />
						<label className={styles.label} htmlFor='name'>
							Name
						</label>
					</div>
					<div className={`${styles['form-field']} ${styles.col} ${styles['x-50']}`}>
						<input id={styles.email} className={`${styles['input-text']} ${styles['js-input']} ${mailIsEmpty ? styles[''] : styles['not-empty']}`} type='email' name='usermail' required onChange={(e: any) => (e.target.value ? setMailIsEmpty(false) : setMailIsEmpty(true))} />
						<label className={styles.label} htmlFor='email'>
							E-mail
						</label>
					</div>
					<div className={`${styles['form-field']} ${styles.col} ${styles['x-100']}`}>
						<input id='message' className={`${styles['input-text']} ${styles['js-input']} ${messageIsEmpty ? styles[''] : styles['not-empty']}`} type='text' name='message' required onChange={(e: any) => (e.target.value ? setMessageIsEmpty(false) : setMessageIsEmpty(true))} />
						<label className={styles.label} htmlFor='message'>
							Message
						</label>
					</div>
					<div className={`${styles['form-field']} ${styles.col} ${styles['x-100']} ${styles['align-center']}`}>
						<input className={styles['submit-btn']} type='submit' value='Submit' onClick={(e: any) => sendEmail(e)} />
					</div>
					{transition((style, item) =>
						item ? (
							<div className={styles.copiedcontainer}>
								<animated.div style={style} className={styles.messagebubble}>
									WOW SUCCESS<br /><br /> I will answer your inquery ASAP :)
								</animated.div>
							</div>
						) : null
					)}
				</form>
			</div>
			<div className={styles.icons}>
				<a href='mailto:jonathan@elmgren.dev'>
					<Image src={email} alt='EMAIL' />
				</a>
				<a href='https://github.com/jonathanelmgren'>
					<Image src={github} alt='GITHUB' />
				</a>
			</div>
		</>
	)
}

export default Contact
