import styles from '../../../styles/Home.module.scss'
import { useState } from 'react'

const About = () => {
	const [count, setCount] = useState<number>(0)
	const oneliners = ['!false (its funny cuz its true)', '[“hip”,”hip”] (hip hip array!)', 'I love pressing the F5 key. It’s refreshing.', 'If you listen to a UNIX shell, can you hear the C?', 'Wasn’t hard to crack Forrest Gump’s password. 1forrest1.', 'Why was the developer bankrupt? He’d used all his cache.', 'An SEO expert walked into a bar, pub, inn, tavern, hostelry, public house.', 'Why do Java developers often wear glasses? They can’t C#.', 'A friend is in a band called 1023Mb. They haven’t had a gig yet.']
	const play = () => {
		let audio = new Audio('https://www.oxfordlearnersdictionaries.com/media/english/us_pron_ogg/p/pro/progr/programmer__us_1.ogg')
		audio.play()
	}

	const displayOneLiner = () => {
		return (
			<h3 className={styles.title}>
				{oneliners[count]}
				<span>
					<svg onClick={() => nextJoke()} width='24' height='24' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd'>
						<path d='M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z' />
					</svg>
				</span>
			</h3>
		)
	}

	const nextJoke = () => {
		if (count < oneliners.length - 1) {
			setCount(count + 1)
		} else {
			setCount(0)
		}
	}

	return (
		<>
			<div className={styles.imagecontainer}></div>
			<div className={styles.card}>
				{displayOneLiner()}
				<div className={styles.description}>
					<p>I am a developer with both frontend and backend experience. I am self taught and have a big passion for coding. My coding experience started in my early teenage years when I downloaded Visual Basic.NET and started my .NET journey. After watching youtube tutorials on how to build a calculator I stumbled across webdevelopment courses. This was in 2013 and I have been hooked since. It was not until recent I actually found my self really confident in my coding and confident enough to apply for projects. </p>
					<p>I am a 26 year old dude that loves pizza and dad jokes a little too much for my wifes liking. We live in a house in literally nowhere with our cat Baltazar. I work solely remote</p>
				</div>
				<div className={styles.funpun}>
					<h4 className={styles.title}>Pro &#8226; gram &#8226; mer</h4>
					<div className={styles.misc}>
						<span className={styles.pronounce}>/ˈprəʊɡræmər/</span>
						<span className={styles.pronounce} style={{fontWeight:'bold', marginLeft:'0.4em', fontSize:'0.7rem', fontStyle:'italic'}}>NOUN</span>
						<span className={styles.playbtn} onClick={() => play()}>
							<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24'>
								<path fill='#009bdf' fillRule='evenodd' d='M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z' id='speaker' />
							</svg>
						</span>
					</div>
					<ol className={styles.list}>
						<li>an organism that converts caffeine into code</li>
						<li>someone who solves the problem that you didn&#39;t know you had in a way you don&#39;t understand</li>
					</ol>
				</div>
			</div>
		</>
	)
}

export default About
