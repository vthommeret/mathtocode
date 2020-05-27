import Head from 'next/head'

export default function Home() {
  return (
    <div className="container min-h-screen m-auto flex flex-col justify-center items-center bg-gray-300">
      <Head>
        <title>Math to Code</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="font-semibold text-center">Math to Code</h1>
    </div>
  )
}
