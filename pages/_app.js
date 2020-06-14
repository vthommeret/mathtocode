import '../css/tailwind.css'
import 'katex/dist/katex.min.css'
import * as Sentry from '@sentry/browser'

Sentry.init({
  dsn: 'https://df18af2580d8443d92e6304a17cdbe0c@o407305.ingest.sentry.io/5276059'
})

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default MyApp
