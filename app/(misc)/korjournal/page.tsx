import '../../globals.css'
import { JournalForm } from './Form'

const Page = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-5xl mb-16'>Journal</h1>
      <JournalForm />
    </div>
  )
}

export default Page