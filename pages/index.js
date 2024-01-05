import Map from '@/components/Map'
import { UserContextProvider } from '@/context/userContext'

export default function Home() {
  return (
    <UserContextProvider>
      <div className='w-screen h-screen bg-fuchsia-500'>
        <Map position={[51.505, -0.09]} zoom={5} />
      </div>
    </UserContextProvider>
  )
}
