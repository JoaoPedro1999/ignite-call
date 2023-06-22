import React from 'react'
import { Roboto } from 'next/font/google'
import { globalStyles } from '../styles/global'
import type { AppProps } from 'next/app'
import Head from 'next/head'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-roboto',
})

globalStyles()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Ignite Call</title>
      </Head>
      <main className={`${roboto.className}`}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
