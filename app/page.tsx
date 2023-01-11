import { Section } from '../components/_common/_section/Section';
import { Header } from '../components/_header/Header';
import { Work } from '../components/_work/Work';
import { About } from '../components/_about/About';
import { WhatIDo } from '../components/_whatido/WhatIDo';
import { Paths } from '../lib/consts/paths'

export default function Home() {
  return (
    <main>
      <Section anchor={Paths.header}>
        <Header />
      </Section>
      <Section anchor={Paths.whatido}>
        <WhatIDo />
      </Section>
      <Section anchor={Paths.work}>
        <Work />
      </Section>
      <Section anchor={Paths.work}>
        <About />
      </Section>
    </main>
  )
}
