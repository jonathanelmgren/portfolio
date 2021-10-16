import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import Navigation from '../components/navigation/navigation'
import Header from '../components/sections/header/header'
import Portfolio from '../components/sections/portfolio/portfolio'
import Section from '../components/misc/section/section'
import About from '../components/sections/about/about'
import Contact from '../components/sections/contact/contact'
import Whatido from '../components/sections/whatido/whatido'

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>Jonathan Elmgren</title>
				<meta name='description' content='Jonathan Elmgrens portfolio' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Navigation />
			<div className={styles.container}>
				<Section title='' classname={styles.header} id="header">
					<Header />
				</Section>
				<Section title='What i do' classname={styles.whatido} id="whatido">
					<Whatido />
				</Section>
				<Section title='My work' classname={styles.portfolio} id="portfolio">
					<Portfolio />
				</Section>
				<Section title='about me' classname={styles.about} id="about">
					<About />
				</Section>
				<Section title='contact' classname={styles.contact} id="contact">
					<Contact />
				</Section>
			</div>
		</>
	)
}

export default Home
