import {type Metadata} from 'next';
import {Montserrat} from 'next/font/google';
import clsx from 'clsx';
import './style.css';

// eslint-disable-next-line new-cap
const font = Montserrat({subsets: ['latin']});

const title = 'Next.js Template';
const description = 'Next.js Template crafted by @satelllte.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    siteName: title,
  },
  twitter: {
    title,
    description,
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          font.className,
          'bg-gray-200 text-stone-950 selection:bg-blue-500 selection:text-white',
        )}
      >
        <div className='mx-auto max-w-screen-2xl bg-stone-50'>{children}</div>
      </body>
    </html>
  );
}
