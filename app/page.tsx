import { Section } from '../components/_common/_section/Section';
import { Header } from '../components/_header/Header';
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
    </main>
  )
}
