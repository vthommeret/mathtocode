import { useState } from 'react'

import Head from 'next/head'
import testCode from '../components/code'

const EQUAL = 'equal'
const NOT_EQUAL = 'not_equal'

export default function Home() {
  const [answer, setAnswer] = useState('x+5')
  const [result, setResult] = useState(null)

  const assertions = [
    [EQUAL, 2, 4],
    [EQUAL, 3, 6],
    [EQUAL, 15, 30],
    [NOT_EQUAL, 10, 15],
    [EQUAL, 10, 15],
  ]

  const testAndDisplayCode = () => {
    testCode(answer, assertions)
      .then(res => {
        setResult(res ? 'True' : 'False')
      })
      .catch(msg => {
        setResult(msg)
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
