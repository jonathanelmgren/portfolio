'use client'
import Lottie from "lottie-react";
import animationData from '../../public/hello.json'
import Tilt from 'react-parallax-tilt'
import { useEffect, useState } from 'react';

const EMAIL = 'jonathan@elmgren.dev'

export const Header = () => {
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        if (clicked) {
            setTimeout(() => {
                setClicked(false)
            }, 1250)
        }
    }, [clicked, setClicked])

    const handleClick = () => {
        navigator.clipboard.writeText(EMAIL);
        setClicked(true)
    }

    return (
        <div className='flex flex-col items-center gap-12 justify-center md:flex-row md:gap-0 mt-20 md:mt-0'>
            <div className='flex flex-col'>
                <h1 className={'font-bold flex-2 text-6xl md:text-7xl text-primary  xl:text-[7rem]'}>
                    Hello
                    <br /> I&apos;m{' '}
                    <span className={'underline'}>
                        Jonathan
                        <br /> Elmgren
                    </span>
                </h1>
                <button onClick={handleClick} className={`hover:text-white hover:bg-primary copied relative mt-20 text-primary text-xl p-5 border-2 border-primary border-spacing-1${clicked ? ' active' : ''}`}>{EMAIL}</button>
            </div>
            <div className='max-w-md md:max-w-2xl'>
                <Tilt trackOnWindow={true} tiltReverse={true} tiltMaxAngleX={25} tiltMaxAngleY={25}>
                    <Lottie animationData={animationData} />
                </Tilt>
            </div>
        </div>
    )
}
