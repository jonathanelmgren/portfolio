export const Paths = {
    header: '#home',
    contact: '#contact',
    case: '#case',
    about: '#about',
    whatido: '#whatido'
} as const

export type Paths = (typeof Paths)[keyof typeof Paths]