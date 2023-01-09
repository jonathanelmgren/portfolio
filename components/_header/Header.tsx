'use client'
import Lottie from "lottie-react";
import animationData from '../../public/hello.json'
import Tilt from 'react-parallax-tilt'

export const Header = () => {
    const opts = {
        animationData,
    }
    return (
        <div className='flex flex-col items-center gap-12 justify-center md:flex-row md:gap-0 mt-20 md:mt-0'>
            <h1 className={'font-bold flex-2 text-6xl md:text-7xl text-primary  xl:text-[7rem]'}>
                Hello
                <br /> I&apos;m{' '}
                <span className={'underline'}>
                    Jonathan
                    <br /> Elmgren
                </span>
            </h1>
            <div className='max-w-md md:max-w-2xl'>
                <Tilt trackOnWindow={true} tiltReverse={true} tiltMaxAngleX={25} tiltMaxAngleY={25}>
                    <Lottie animationData={animationData} />
                </Tilt>
            </div>
        </div>
    )
}
