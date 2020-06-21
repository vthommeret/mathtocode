import Head from 'next/head'

import '../css/tailwind.css'
import 'katex/dist/katex.min.css'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://df18af2580d8443d92e6304a17cdbe0c@o407305.ingest.sentry.io/5276059'
})

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Math to Code</title>

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=ASk39Zkf31" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png?v=ASk39Zkf31" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png?v=ASk39Zkf31" />
        <link rel="manifest" href="/site.webmanifest?v=ASk39Zkf31" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg?v=ASk39Zkf31" color="#000000" />
        <link rel="shortcut icon" href="/favicon.ico?v=ASk39Zkf31" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />

        <meta property="og:title" content="Math to Code" />
        <meta property="og:description" content="Math to Code is an interactive Python tutorial to teach engineers how to read and implement math using the NumPy library." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://mathtocode.com/images/mathtocode.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="Vernon Thommeret" />
        <meta property="twitter:title" content="Math to Code" />
        <meta property="twitter:description" content="Math to Code is an interactive Python tutorial to teach engineers how to read and implement math using the NumPy library." />
        <meta property="twitter:image" content="https://mathtocode.com/images/mathtocode.png" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-169337965-1"></script>
        <script dangerouslySetInnerHTML={
          { __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", 'UA-169337965-1');
          `}
        } />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
