import React from 'react'

export interface NavItem {
    href: string,
    text: string
}

interface Props {
    links: NavItem[],
    close?: () => void
}

export const NavItems = ({links, close}: Props) => {
    return (
        <div className='h-full relative flex flex-col gap-14 ml-12 mt-12'>
            {links.map(l =>
                <a className='text-white text-2xl' key={l.href} href={l.href} onClick={() => close && close()}>{l.text}</a>
            )}
        </div>
    )
}
