interface Props {
    openMenu: React.Dispatch<React.SetStateAction<boolean>>
    menuState: boolean
    axis: Axis
    curve: string
    links: string[]
}

type Axis = {
    x: number,
    y: number
}

let timer = new Date().getTime()

const calcTime = (date: Date) => date.getTime() - timer

export const DesktopNav = ({ links, openMenu, menuState, axis, curve }: Props) => {

    return (
        <div className={`fixed left-16 z-50 -translate-x-full bg-primary menu-transition h-full w-80${menuState ? ' left-0 translate-x-0' : ''}`} onMouseLeave={() => openMenu(false)}>
            <div className='absolute right-5 w-5 h-5 -mt-3 z-10' style={{ transform: `translate(${axis.x}px,${axis.y}px)` }}>
                <div className='w-full h-1 bg-white absolute'></div>
                <div className='w-full h-1 bg-white absolute top-1/2 -translate-y-1/2'></div>
                <div className='w-full h-1 bg-white absolute bottom-0'></div>
            </div>
            <div className='w-full h-full relative flex flex-col'>
                {links.map(l =>
                    <a className='mx-8 text-white text-sm' key={l} href='#header' onClick={() => openMenu(false)}>Hello</a>
                )}
            </div>
            {!menuState &&
                <svg version='1.1' className='absolute -z-1 right-16 translate-x-full h-full top-0 text-primary' style={{ width: `${axis.x + 60}` }} xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
                    <path onMouseEnter={() => openMenu(!menuState)} className='h-full fill-current' d={curve} />
                </svg>
            }
        </div>
    )
}