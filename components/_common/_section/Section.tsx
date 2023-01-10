import type { Paths } from '../../../lib/consts/paths'

interface Props {
  children: React.ReactNode
  anchor: Paths
}


export const Section = ({ children, anchor }: Props) => {
  return (
    <div id={anchor} className='min-h-screen flex items-center justify-center mx-[5%] md:mx-[10%]'>
      {children}
    </div>
  )
}
