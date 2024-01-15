import NavBar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavBar />
      <h1>Issue Tracker</h1>
      <Button>Hello</Button>
    </main>
  )
}
