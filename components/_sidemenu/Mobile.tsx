interface Props {
    openMenu: any
    menuState: boolean
}

export const MobileNav = ({ openMenu, menuState }: Props) => {
    return (
        <>
            <div onClick={() => openMenu(!menuState)} onMouseLeave={() => openMenu(!menuState)}>
                <svg id='burgericon' xmlns='http://www.w3.org/2000/svg' width='70' height='60'>
                    <g className='icon'>
                        <rect className='frstbar' x='10' y='12' width='50' height='7' rx='3' ry='3' fill='#fff' />
                        <rect className='scndbar' x='10' y='27' width='50' height='7' rx='3' ry='3' fill='#fff' />
                        <rect className='thrdbar' x='10' y='42' width='50' height='7' rx='3' ry='3' fill='#fff' />
                    </g>
                </svg>
            </div>
            <div>
                <div>
                    LINKS
                    <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fillRule='evenodd' clipRule='evenodd' onClick={() => openMenu(false)}>
                        <path d='M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z' />
                    </svg>
                </div>
            </div>
        </>
    )
}