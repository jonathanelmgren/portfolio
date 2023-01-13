'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import me from '../../public/me-min.webp'

const oneliners = ['!false (its funny cuz its true)', '[“hip”,”hip”] (hip hip array!)', 'I love pressing the F5 key. It’s refreshing.', 'If you listen to a UNIX shell, can you hear the C?', 'Wasn’t hard to crack Forrest Gump’s password. 1forrest1.', 'Why was the developer bankrupt? He’d used all his cache.', 'An SEO expert walked into a bar, pub, inn, tavern, hostelry, public house.', 'Why do Java developers often wear glasses? They can’t C#.', 'A friend is in a band called 1023Mb. They haven’t had a gig yet.']

export const About = () => {
    const [count, setCount] = useState(0)

    const play = () => {
        let audio = new Audio('https://www.oxfordlearnersdictionaries.com/media/english/us_pron_ogg/p/pro/progr/programmer__us_1.ogg')
        audio.play()
    }

    const nextJoke = () => {
        if (count < oneliners.length - 1) {
            setCount(count + 1)
        } else {
            setCount(0)
        }
    }

    return (
        <div className='flex flex-col lg:flex-row items-center max-w-6xl mx-auto'>
            <Image className='shrink-0 aspect-square rounded-full w-72 -mb-20 lg:mb-0 lg:-mr-12 z-10' src={me} alt='a picture of jonathan elmgren' />
            <div className='bg-white p-6 shadow-lg pt-24 lg:pt-6 lg:pl-16'>
                <h3 className='mt-0 relative text-primary my-4 text-left text-2xl md:text-2xl lg:text-3xl'>
                    {oneliners[count]}
                    <span onClick={() => nextJoke()} className='text-5xl ml-3 cursor-pointer'>
                        &#10226;
                    </span>
                </h3>
                <p>I am a developer with both frontend and backend experience. I am self taught and have a big passion for coding. My coding experience started in my early teenage years when I downloaded Visual Basic.NET and started my .NET journey. After watching youtube tutorials on how to build a calculator I stumbled across webdevelopment courses. This was in 2013 and I have been hooked since but it was not until 2018 I actually found my self confident and brave enough to start my company and apply for projects.</p>
                <p>I am a 28 year old dude that loves pizza and dad jokes a little too much for my wifes liking. We live in a house in literally nowhere with our cat Baltazar. I work solely remote</p>
                <div className='mt-8 ml-auto flex flex-col sm:flex-row gap-4 max-w-lg'>
                    <div className='whitespace-nowrap'>
                        <h4 className={'text-primary text-xl'}>Pro &#8226; gram &#8226; mer</h4>
                        <div className='flex items-center gap-3'>
                            <span>/ˈprəʊɡræmər/<span className='text-sm font-bold italic'> NOUN</span></span>
                            <span className='cursor-pointer' onClick={() => play()}>
                                <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24'>
                                    <path fill='#009bdf' fillRule='evenodd' d='M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z' id='speaker' />
                                </svg>
                            </span>
                        </div>
                    </div>
                    <ol className={'list-decimal ml-8'}>
                        <li>an organism that converts caffeine into code</li>
                        <li>someone who solves the problem that you didn&#39;t know you had in a way you don&#39;t understand</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}
