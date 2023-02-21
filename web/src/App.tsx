import './styles/global.css'
import './lib/dayjs'
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import { AuthenticationLogin } from './components/AuthenticationLogin'

export function App() {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl p-6 flex flex-col gap-16'>
        
        <AuthenticationLogin/>
        {/* <Header/>
        <SummaryTable/> */}

      </div>
    </div>
  )
}
