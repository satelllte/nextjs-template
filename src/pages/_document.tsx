import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html>
      <Head>
				{/* eslint-disable-next-line @next/next/google-font-display */}
				<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=block' />
      </Head>
      <body className='bg-black text-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
