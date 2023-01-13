export const Paths = {
    header: '#home',
    contact: '#contact',
    work: '#work',
    about: '#about',
    whatido: '#whatido'
} as const

export type Paths = (typeof Paths)[keyof typeof Paths]