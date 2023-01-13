import type { Paths } from '../../../lib/consts/paths'

interface Props {
  children: React.ReactNode
  anchor: Paths
  title?: string
}


export const Section = ({ title, children, anchor }: Props) => {

  return (
    <div id={anchor.replace('#', '')} className='min-h-screen text-justify flex gap-6 flex-col items-center justify-center mx-[5%] md:mx-[10%]'>
      {title && <h3 className='clamp-text text-primary opacity-10 leading-[0.8] -z-10 max-w-7xl mt-4'>{title}</h3>}
      <div className='w-full my-auto pb-12'>
        {children}
      </div>
    </div>
  )
}
