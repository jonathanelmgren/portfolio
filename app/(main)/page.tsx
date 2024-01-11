import { About } from '../../components/_about/About';
import { Case } from '../../components/_case/Case';
import { Section } from '../../components/_common/_section/Section';
import { Contact } from '../../components/_contact/Contact';
import { Header } from '../../components/_header/Header';
import { WhatIDo } from '../../components/_whatido/WhatIDo';
import { Paths } from '../../lib/consts/paths';

export default function Home() {
  return (
    <main>
      <Section anchor={Paths.header}>
        <Header />
      </Section>
      <Section title={'What I do'} anchor={Paths.whatido}>
        <WhatIDo />
      </Section>
      <Section title={'Case'} anchor={Paths.work}>
        <Case />
      </Section>
      <Section title={'About me'} anchor={Paths.about}>
        <About />
      </Section>
      <Section title={'Contact'} anchor={Paths.contact}>
        <Contact />
      </Section>
    </main>
  )
}
