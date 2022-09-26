import type { NextPage } from 'next'
import Head from 'next/head'
import { Home } from '@/components/pages'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Masontry Grid Demo</title>
        <meta name='description' content='Masontry Grid Demo' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Home/>
    </>
  )
}

export default HomePage
