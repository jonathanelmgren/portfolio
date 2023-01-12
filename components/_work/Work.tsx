import Image, { StaticImageData } from 'next/image'
import expand from './expand.svg'

import toolflex from '../../public/case/toolflex.webp'
import Link from 'next/link'

type Work = {
  title: string,
  description: string,
  image: StaticImageData,
  tags: string[],
  live?: string
}

const work: Work[] = [
  {
    title: 'C Land',
    description: 'C Land was built in Next.js with headless WordPress for a extremely fast site but still keeping the simplicity of WordPress for content management.',
    image: toolflex,
    tags: ['Headless', 'Next.js', 'WordPress'],
    live: 'https://cland.se/'
  },
  {
    title: 'Taiga',
    description: 'Taiga is an e-commerce built with the PIM system Pimcore which is based on PHP/Symfony. In this project I worked with outsourced labor from the Czech Republic and Russia.',
    image: toolflex,
    tags: ['PIM', 'E-com', 'PHP/Symfony'],
  },
  {
    title: 'BuddyCompany',
    description: 'BuddyCompany is a service company for giggers where they offer everything from technical support to home cleaning and crafts. I had this project solo and the system is built in the MERN stack. The server is built scalable and integrates with other parts I built at BuddyCompany',
    image: toolflex,
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
  },
  {
    title: 'Odinn',
    description: 'Odinn is an ongoing project in Next.js 13, it is a CRM system for a cleaning and moving company where cases come in all the time. The idea of the system is to easily follow and manage a case from incoming to sales with integration with Billogram (invoicing system) for simple invoicing directly from the CRM.',
    image: toolflex,
    tags: ['Next.js', 'MongoDB'],
  },
  {
    title: 'TechBuddy',
    description: 'In BuddyCompanys route scheduler, I built a route booking system where full-time employees could be assigned cases and added to a schedule with integration to, among other things, the Distance Matrix API on Google Console for automatic calculation of time it takes between customers.',
    image: toolflex,
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
  },
  {
    title: 'Toolflex',
    description: 'Custom made e-commerce solution with WooCommerce and WordPress. Toolflex is a project I worked on in a team at an agency in Ulricehamn. Special solutions with multi-language and a completely customized theme based on the customers needs.',
    image: toolflex,
    tags: ['WordPress', 'WooCommerce'],
  },
  {
    title: 'Gäsene Mejeri',
    description: 'Custom made e-commerce solution with WooCommerce and WordPress. Toolflex is a project I worked on in a team at an agency in Ulricehamn. Special solutions with multi-language and a completely customized theme based on the customer’s needs.',
    image: toolflex,
    tags: ['PIM', 'Pimcore', 'E-com'],
  }
]

export const Work = () => {

  return (
    <div className='flex flex-wrap gap-20 w-full max-w-7xl sm:justify-center my-24'>
      {work.map((w) => <WorkCard key={w.title} work={w} />)}
    </div>
  )
}

const WorkCard = ({ work }: { work: Work }) => {

  return (
    <div className='grid gap-2 sm:gap-6 grid-cols-1 sm:grid-cols-[12rem_20rem] items-center max-w-lg'>
      <Image className='grayscale sm:justify-self-end hover:grayscale-0 duration-300 hover:scale-110 transition-all shrink-0 w-full max-w-[12rem] md:max-w-[18rem] aspect-square rounded-full overflow-hidden' src={work.image} alt={work.title} />
      <div className='md:my-4 self-start ml-2 sm:ml-0'>
        <div className='flex flex-wrap gap-2 mb-1'>
          {work.tags.map((t, i) => <span className='bg-primaryLight text-primaryDark text-xs font-medium px-2.5 py-0.5' key={i}>{t}</span>)}
        </div>
        <h6 className={`mt-2 text-xl md:text-4xl text-primaryDark${work.live ? ' cursor-pointer' : ''}`}>
          {work.live
            ?
            <Link target={'_blank'} className='flex gap-1 items-start' href={work.live}>
              {work.title}
              <Image src={expand} className='inline-block' alt={`open in new tab icon`} width={'12'} height={'12'} />
            </Link>
            :
            work.title
          }
        </h6>
        <p className='text-sm'>
          {work.description}
        </p>
      </div>
    </div>
  )
}