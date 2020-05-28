import { useState } from 'react'

import { InlineMath, BlockMath } from 'react-katex'
import TextareaAutosize from 'react-textarea-autosize'

import Head from 'next/head'
import testCode, { preloadWorker } from '../components/code'

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

  const isMacLike = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

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
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      testAndDisplayCode()
    }
  }

  preloadWorker()

  return (
    <>
      <Head>
        <title>Math to Code</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-32x32.png" />
      </Head>

      <div className="container-shadow md:flex">
        <div className="px-8 py-10 md:px-12 md:py-16 bg-white md:w-2/5">
          <h2 className="mb-8 md:mb-10 text-2xl font-medium">Math</h2>
          <div className="text-lg">
            <InlineMath math="\sqrt{x}" />
          </div>
        </div>

        <div className="px-8 py-10 md:px-12 md:py-16 bg-black text-white md:flex-1">
          <h2 className="mb-8 md:mb-10 text-2xl font-medium">Code</h2>
          <TextareaAutosize value={answer} placeholder="Enter code..." onChange={e => setAnswer(e.target.value)} onKeyPress={keyPress} spellCheck={false} autoFocus className="mb-8 md:mb-10 bg-transparent placeholder-gray-700 outline-none resize-none font-mono" />
          <div>
            <button onClick={submitAnswer} className="px-2 py-1 bg-green-300 text-black font-medium rounded">Submit answer</button>
            <span className="ml-2 text-sm text-green-300">{isMacLike ? '⌘-enter' : 'ctrl-enter'}</span>
          </div>
          {result === null ? null : (
            <p className="mt-8 md:mt-10 text-yellow-300 font-mono">{result}</p>
          )}
        </div>
      </div>
    </>
  )
}
