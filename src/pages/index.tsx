import type { NextPage } from 'next'
import Head from 'next/head'
import { Home } from '@/components/pages/Home'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sandbox (Next.js)</title>
        <meta name='description' content='Sandbox (Next.js)' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Home/>
    </>
  )
}

export default HomePage
