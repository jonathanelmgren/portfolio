'use client'
import React, { useEffect, useRef, useState } from 'react'

const tools = ['React.js', 'Next.js 12', 'Next.js 13', 'Node.js', 'Express.js', 'MongoDB', 'SQL', 'PHP/Symfony', 'WordPress', 'PIM', 'Pimcore', 'WooCommerce', 'Sass', 'Redux', 'Styled components', 'Material UI', 'Tailwind CSS', 'Passport']

const adjectives = ['amazing', 'staggering', 'astonishing', 'flabbergasting', 'dazzling', 'surprising', 'wonderful', 'unbelievable', 'prodigius', 'stunning', 'fascinating', 'marvelous', 'incredible']

export const WhatIDo = () => {
    const [adjective, setAdjective] = useState(adjectives[0])
    const [mobileTools, setMobileTools] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)


    const spanWidth = ref.current ? ref.current.offsetWidth : 156
    useEffect(() => {
        setTimeout(() => {
            const activeSpan = adjectives.findIndex(a => adjective === a)
            if (adjectives.length - 1 > activeSpan) {
                setAdjective(adjectives[activeSpan + 1])
            } else {
                setAdjective(adjectives[0])
            }
        }, 2000)
    })

    return (
        <div className='mx-auto overflow-hidden lg:overflow-visible flex flex-col-reverse md:flex-row h-fit justify-center bg-white shadow-lg lg:p-6 max-w-6xl relative'>
            <div className='md:mr-12 lg:p-0 px-6 pt-6 pb-14'>
                <h4 className='mt-0 relative text-primary my-4 text-left text-2xl md:text-2xl lg:text-3xl'>I make&nbsp;
                    <span className='inline-block'>
                        {adjectives.map((a, i) => {
                            const index = adjectives.findIndex(ad => ad === adjective)
                            return (
                                <span ref={(adjectives[index + 1] || adjectives[0]) === a ? ref : null} key={i} className={`adjective absolute text-primaryDark${adjective === a ? ' active' : ''}${(adjectives[index - 1] || adjectives[adjectives.length - 1]) === a ? ' reset' : ''}`}>{a}</span>
                            )
                        })}
                        <span style={{ transition: 'margin 1s', marginLeft: `${spanWidth}px` }}>
                        &nbsp;applications
                        </span>
                    </span>
                </h4>
                <p className='my-4'>Developing applications the way you want it.</p>
                <p className='my-4'>With experience in both front- &#38; backend development I am more than happy to help you create your dream application. Whether it is a static or a dynamic webapp. </p>
                <p className='my-4'>I will most likely develop your application in React, maybe even with a framework like Next.js. If you also need a backend I can asure you nothing will go wrong with Node combined with Express and MongoDB (MERN FTW).</p>
                <p className='mb-4 mt-12'>Is the above text just gibberish for you? Don&#39;t panic - I make applications using some of the most used programming languages in the market which makes your application high-end and top modern.</p>
            </div>
            <div onClick={() => setMobileTools(!mobileTools)} className={`transition-all shadow-lg duration-300 bg-primary text-white lg:-m-8 p-2 w-full text-sm font-thin absolute lg:p-6 lg:static bottom-0 overflow-hidden ${!mobileTools ? 'translate-y-[83%]' : 'translate-y-0'} lg:translate-y-0`}>
                <h6 className={`text-center text-lg mb-4 uppercase ${!mobileTools ? 'after:content-["_↑"]' : 'after:content-["↓"]'} after:ml-2 lg:after:hidden`}>Tools I&rsquo;ve worked with</h6>
                <div>
                    <ul className='pl-6 list-disc columns-2'>
                        {tools.map(t => <li key={t}>{t}</li>)}
                    </ul>
                    <span className='block mt-4 text-right'>
                        and many more...
                    </span>
                </div>
            </div>
        </div >
    )
}
