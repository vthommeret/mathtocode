import { useState } from 'react'

import Head from 'next/head'
import testCode from '../components/code'

export default function Home() {
  const [answer, setAnswer] = useState('2+5')
  const [result, setResult] = useState(null)

  const testAndDisplayCode = () => {
    testCode(answer)
      .then(res => {
        setResult(res)
      })
      .catch(msg => {
        setResult('Unable to test code: ' + msg)
      })
  }

  const submitAnswer = e => {
    e.preventDefault()
    testAndDisplayCode()
  }

  const keyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      testAndDisplayCode()
    }
  }

  return (
    <>
      <Head>
        <title>Math to Code</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container min-h-screen m-auto flex flex-col justify-center items-center bg-black text-white font-sans">
        <div className="font-mono text-center">
          <textarea className="h-6 bg-transparent text-center outline-none resize-none" value={answer} onChange={e => setAnswer(e.target.value)} onKeyPress={keyPress} />
          {result === null ? null : (
            <p className="mt-12 text-yellow-300">{result}</p>
          )}
        </div>
        <button onClick={submitAnswer} className="mt-12 px-2 py-1 bg-green-300 text-black font-medium rounded">Submit answer</button>
      </div>
    </>
  )
}
