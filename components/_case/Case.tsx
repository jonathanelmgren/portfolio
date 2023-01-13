import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

import expand from './expand.svg'

import toolflex from '../../public/case/toolflex.webp'
import charles from '../../public/case/charles.webp'
import backlog from '../../public/case/backlog.webp'
import cland from '../../public/case/cland.webp'
import gasene from '../../public/case/gasene.webp'
import odinn from '../../public/case/odinn.webp'
import route from '../../public/case/route.webp'
import taiga from '../../public/case/taiga.webp'

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
    image: cland,
    tags: ['Headless', 'Next.js', 'WordPress', 'GraphQL'],
    live: 'https://cland.se/'
  },
  {
    title: 'Charles Dickens',
    description: 'Custom made ticket purchase system with WooCommerce that generates a QR-code that is sent with the confirmation mail. The client then has a custom made app to scan these QR-codes via REST to see if it`s paid or not at the entrance',
    image: charles,
    tags: ['WordPress', 'Node.js', 'REST'],
    live: 'https://charlesdickens.nu/'
  },
  {
    title: 'Taiga',
    description: 'A full blown e-commerce with Pimcore as PIM. Very advanced logics with multiple sites and authentication to get specific price logics depending on who you are as a user and what price list you have. Integration to their ERP for a fully automated process',
    image: taiga,
    tags: ['PIM', 'E-com', 'PHP/Symfony'],
    live: 'https://taiga.se/'
  },
  {
    title: 'BuddyCompany',
    description: 'I built a backlog indicator for this service-based company. A service providing a lot of leads to keep track of and this system made it easy for the employees to keep track of what leads are close to their SLA',
    image: backlog,
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js'],
  },
  {
    title: 'Odinn',
    description: 'A CRM built for a outsourcing company that has multple websites that generates leads for cleaning and moving services. Custom made calendar and different view depending on verticals etc.',
    image: odinn,
    tags: ['Next.js', 'MongoDB'],
  },
  {
    title: 'TechBuddy',
    description: 'Another service company that provides tech support. Doing all route planning in an excel sheet can only take you so far, so I made a route booking application where it automatically calculates the driving time between addresses and takes into account how long an assignment takes.',
    image: route,
    tags: ['React.js', 'Node.js', 'Google Cloud Console', 'MongoDB', 'Express.js'],
  },
  {
    title: 'Toolflex',
    description: 'A basic yet complicated e-commerce site built with WooCommerce and a custom made theme and as the react nerd I am I couldnt help myself not to implement some kind of react into this website. In this case it was the Find a retailer-page.',
    image: toolflex,
    tags: ['React.js', 'WordPress', 'WooCommerce'],
    live: 'https://toolflex.com/'
  },
  {
    title: 'Gäsene Mejeri',
    description: 'Completely custom made ecommerce site built with Pimcore and a integration to Klarnas checkout API. Gäsene sells cheese and if you are not sure what cheese you need to buy there is a cheese selector to make the decisions for you :)',
    image: gasene,
    tags: ['PIM', 'Pimcore', 'E-com', 'REST/Klarna'],
    live: 'https://gasenemejeri.se/'
  }
]

export const Case = () => {

  return (
    <div className='md:my-24'>
      <div className='flex flex-wrap mx-auto gap-20 w-full  sm:justify-center '>
        {work.map((w) => <CaseCard key={w.title} work={w} />)}
      </div>
      <h6 className={`text-right mt-2 text-lg md:text-4xl text-primaryDark`}>with more...</h6>
    </div>
  )
}

const CaseCard = ({ work }: { work: Work }) => {

  return (
    <div className='grid gap-2 sm:gap-6 grid-cols-1 sm:grid-cols-[12rem_20rem] items-center'>
      <Image className='object-cover grayscale sm:justify-self-end hover:grayscale-0 duration-300 hover:scale-110 transition-all shrink-0 w-full max-w-[12rem] md:max-w-[18rem] aspect-square rounded-full overflow-hidden' src={work.image} alt={work.title} />
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