import Head from 'next/head'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main>
      <Head>
        <title>MiData | Landing Page</title>
      </Head>
      <Navbar />
    </main>
  )
}
