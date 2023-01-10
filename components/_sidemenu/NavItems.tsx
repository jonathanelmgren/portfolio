import React from 'react'
import type { Paths } from '../../lib/consts/paths'

export interface NavItem {
    href: Paths,
    text: string
}

interface Props {
    close?: () => void
}

const links: NavItem[] = [
    { href: '#home', text: 'Home' },
    { href: '#whatido', text: 'What I do' },
    { href: '#case', text: 'Case' },
    { href: '#about', text: 'About' },
    { href: '#contact', text: 'Contact' },
]

export const NavItems = ({ close }: Props) => {
    return (
        <div className='h-full relative flex flex-col gap-14 ml-12 mt-12'>
            {links.map(l =>
                <a className='text-white text-2xl' key={l.href} href={l.href} onClick={() => close && close()}>{l.text}</a>
            )}
        </div>
    )
}
