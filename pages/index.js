import Image from 'next/image'
import { Inter } from 'next/font/google'
import Map from '@/components/Map'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className='w-screen h-screen bg-fuchsia-500'>
      <Map position={[51.505, -0.09]} zoom={5} />
    </div>
  )
}
