import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Math to Code</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container min-h-screen m-auto flex flex-col justify-center items-center bg-black text-white font-sans">
        <div class="font-mono m-16">
          <p className="text-center text-lg outline-none" contentEditable>Math to Code</p>
        </div>
        <button class="px-2 py-1 bg-green-300 text-black font-medium rounded">Submit answer</button>
      </div>
    </>
  )
}
