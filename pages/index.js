import { useState, useRef } from 'react'

import { InlineMath, BlockMath } from 'react-katex'
import TextareaAutosize from 'react-textarea-autosize'

import Head from 'next/head'
import testCode, { preloadWorker } from '../components/code'

const EQUAL = 'equal'
const NOT_EQUAL = 'not_equal'

const questions = [
  {
    math: '\\sqrt{x}',
    params: ['x'],
    solution: 'Math.sqrt(x)',
    assertions: [
      {type: EQUAL, args: 25, expected: 5},
    ],
  },
  {
    math: '|x|',
    params: ['x'],
    solution: 'Math.abs(x)',
    assertions: [
      {type: EQUAL, args: -5, expected: 5},
    ],
  },
  {
    math: '2x',
    params: ['x'],
    solution: '2*x',
    assertions: [
      {type: EQUAL, args: 5, expected: 10},
    ],
  },
  {
    math: 'x^y',
    params: ['x', 'y'],
    solution: 'Math.pow(x,y)',
    assertions: [
      {type: EQUAL, args: [5, 2], expected: 25},
    ],
  },
]

const Home = ({ isMacLike }) => {
  const [questionIdx, setQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState({})

  const answerTextarea = useRef()

  const testAndDisplayCode = () => {
    setAnswers({
      ...answers,
      [questionIdx]: {
        ...answers[questionIdx],
        loading: true,
      }
    })
    
    testCode(answers[questionIdx].code, questions[questionIdx])
      .then(res => {
        setAnswers({
          ...answers,
          [questionIdx]: {
            ...answers[questionIdx],
            result: res ? 'Correct' : 'Incorrect answer',
            success: res,
            loading: false,
          }
        })
        if (res) {
          answerTextarea.current.blur()
        }
      })
      .catch(msg => {
        setAnswers({
          ...answers,
          [questionIdx]: {
            ...answers[questionIdx],
            result: msg,
            success: false,
            loading: false,
          }
        })
      })
  }

  const updateQuestion = (e, increment) => {
    e.preventDefault()
    if (questionIdx != (increment ? questions.length - 1 : 0)) {
      setQuestionIdx(questionIdx + (increment ? 1 : -1))
      answerTextarea.current.focus()
    }
  }

  const submitAnswer = e => {
    e.preventDefault()
    testAndDisplayCode()
  }

  const updateAnswer = e => {
    setAnswers({
      ...answers,
      [questionIdx]: {code: e.target.value}
    })
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
          <h2 className="mb-8 md:mb-10 text-2xl font-medium flex justify-between items-center">
            <span>Math</span>
            <span className="text-lg">{questionIdx + 1} <span className="text-gray-500">/ {questions.length}</span></span>
          </h2>
          <div className="mb-8 md:mb-10 text-lg">
            <InlineMath math={questions[questionIdx].math} />
          </div>
        </div>

        <div className="px-8 py-10 md:px-12 md:py-16 bg-black text-white md:flex-1">
          <h2 className="mb-8 md:mb-10 text-2xl font-medium flex justify-between items-center">
            <span>Code</span>
            {answers.hasOwnProperty(questionIdx) && answers[questionIdx].success ? <span className="text-lg"><span className="text-green-300">✓</span> Success</span> : null}
          </h2>
          <TextareaAutosize value={answers.hasOwnProperty(questionIdx) ? answers[questionIdx].code : ''} placeholder="Enter code..." onChange={updateAnswer} onKeyPress={keyPress} ref={answerTextarea} spellCheck={false} autoFocus disabled={answers.hasOwnProperty(questionIdx) && answers[questionIdx].loading} className="mb-8 md:mb-10 bg-transparent placeholder-gray-700 outline-none resize-none font-mono disabled:opacity-50" />
          {answers.hasOwnProperty(questionIdx) && answers[questionIdx].success ? null : (
            <div>
              <button onClick={submitAnswer} className="px-2 py-1 bg-green-300 text-black font-medium rounded disabled:opacity-50" disabled={!answers.hasOwnProperty(questionIdx) || (answers[questionIdx].code === '') || answers[questionIdx].loading}>{answers.hasOwnProperty(questionIdx) && answers[questionIdx].loading ? 'Loading…' : 'Submit answer'}</button>
              <span className="ml-2 text-sm text-gray-700">{isMacLike ? '⌘-enter' : 'ctrl-enter'}</span>
            </div>
          )}
          {answers.hasOwnProperty(questionIdx) && answers[questionIdx].success || !answers.hasOwnProperty(questionIdx) || !answers[questionIdx].hasOwnProperty('result') || answers[questionIdx].result === 'True' ? (
            null
          ) : (
            <p className="mt-8 md:mt-10 text-white font-mono text-yellow-200">{answers[questionIdx].result}</p>
          )}
        </div>
      </div>
      <div className={'px-8 py-10 md:px-12 md:py-16 text-center flex ' + (questionIdx > 0 ? 'justify-between' : 'justify-end')}>
        {questionIdx > 0 ? (
          <button onClick={e => updateQuestion(e, false)} className="py-2 text-black text-lg font-medium">&larr; Back </button>
        ) : null}
        {answers.hasOwnProperty(questionIdx) && answers[questionIdx].success && questionIdx < questions.length - 1 ? (
          <button onClick={e => updateQuestion(e, true)} className="px-3 py-2 bg-green-300 text-black text-lg font-semibold rounded shadow-md">Next question &rarr;</button>
        ) : null}
      </div>
    </>
  )
}

export const getServerSideProps = async ctx => {
  const ua = process.browser ? navigator.userAgent : ctx.req.headers['user-agent']
  return { props: {
    isMacLike: /(Mac|iPhone|iPod|iPad)/i.test(ua)
  }}
}

export default Home
