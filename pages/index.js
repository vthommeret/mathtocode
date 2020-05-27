import { useState } from 'react'

import { InlineMath, BlockMath } from 'react-katex'
import TextareaAutosize from 'react-textarea-autosize'

import Head from 'next/head'
import testCode from '../components/code'

const EQUAL = 'equal'
const NOT_EQUAL = 'not_equal'

export default function Home() {
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)

  const assertions = [
    [EQUAL, 2, 4],
    [EQUAL, 3, 6],
    [EQUAL, 15, 30],
    [NOT_EQUAL, 10, 15],
    [EQUAL, 25, 5],
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
        <div className="mb-12 p-4 bg-white text-black rounded">
          <BlockMath math="\sqrt{x}" />
        </div>

        <div className="font-mono text-center">
          <TextareaAutosize value={answer} placeholder="Enter code..." onChange={e => setAnswer(e.target.value)} onKeyPress={keyPress} spellCheck={false} autoFocus className="bg-transparent placeholder-gray-700 text-center outline-none resize-none" />

          {result === null ? null : (
            <p className="mt-12 text-yellow-300">{result}</p>
          )}
        </div>
        <button onClick={submitAnswer} className="mt-12 px-2 py-1 bg-green-300 text-black font-medium rounded">Submit answer</button>
      </div>
    </>
  )
}
