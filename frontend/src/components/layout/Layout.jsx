import React from 'react'
import Head from 'next/head'

import Container from './Container.jsx'
import Header from '../header/Header.js'
import Footer from '../footer/Footer.jsx'

const Layout = ({ title, children }) => {
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Most bookkeeping software is accurate, but hard to use. We make the opposite trade-off, and hope you don’t get audited."
        />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </Container>
  )
}

export default Layout
