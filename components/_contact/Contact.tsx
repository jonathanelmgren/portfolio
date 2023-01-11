import React from 'react'
import { Links } from '../_common/_links/Links'

export const Contact = () => {
    return (
        <div className='max-w-2xl w-full'>
            <form>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="floating_first_name" id="floating_first_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                        <label htmlFor="floating_first_name" className="peer-focus:font-medium absolute text-sm text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-primary appearance-none focus:outline-none focus:ring-0 peer" placeholder=" " required />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-primary duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                </div>
                <div>
                    <label htmlFor="floating_message" className="block py-2.5 px-0 w-full text-sm text-primary">Message</label>
                    <textarea className='border-0 bg-transparent border-b-2 border-primary resize-none w-full focus:h-52 h-6 transition-[height] overflow-hidden p-2 focus:border-2 focus:outline-none' name="floating_message" id="floating_message" placeholder="" />
                </div>
                <button type="submit" className="text-white bg-primary hover:bg-primaryDark focus:outline-none focus:ring-blue-300 font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center ml-auto block mt-5">Submit</button>
            </form>
            <div className='mt-6 max-h-7'>
                <Links center />
            </div>
        </div>
    )
}
