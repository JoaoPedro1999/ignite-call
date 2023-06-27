import React from 'react'
import { Roboto } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import Head from 'next/head'

import { globalStyles } from '../styles/global'

import type { AppProps } from 'next/app'

const roboto = Roboto({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-roboto',
})

globalStyles()

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Ignite Call</title>
      </Head>
      <main className={`${roboto.className}`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}
