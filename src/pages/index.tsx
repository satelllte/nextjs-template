import type { NextPage } from 'next'
import Head from 'next/head'
import { Button } from '@/components/atoms/Button'
import { Disclosure } from '@/components/molecules/Disclosure'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Sandbox (Next.js)</title>
        <meta name='description' content='Sandbox (Next.js)' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div>
				<h1>
					Home Page
				</h1>
				<main>
					<Button>Button</Button>
					<Disclosure name='My Disclosure'>
						Disclosure content
					</Disclosure>
				</main>
			</div>
    </>
  )
}

export default HomePage
