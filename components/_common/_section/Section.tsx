import React from 'react'

export const Section = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='min-h-screen flex justify-center mx-[10%]'>
        {children}
    </div>
  )
}
