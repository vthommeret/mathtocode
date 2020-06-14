import { useState, useEffect, useRef } from 'react'

import { InlineMath, BlockMath } from 'react-katex'
import TextareaAutosize from 'react-textarea-autosize'

import Head from 'next/head'
import checkAnswer, { preloadWorker } from '../lib/answer'

import confetti from 'canvas-confetti'

const Home = ({ questions }) => {
  const [questionIdx, setQuestionIdx] = useState(0)
  const [answers, setAnswers] = useState({})

  const answerTextarea = useRef()

  // Submit answer on enter
  useEffect(() => {
    const eventName = 'keydown'
    const listener = e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
          e.preventDefault()
          updateQuestion(e, false)
      } else if (e.key === 'Enter') {
          e.preventDefault()
          if (answers.hasOwnProperty(questionIdx) && answers[questionIdx].success) {
            updateQuestion(e, true)
          } else {
            testAndDisplayAnswer()
          }
      }
    }
    window.addEventListener(eventName, listener)
    return () => {
      window.removeEventListener(eventName, listener)
    }
  })

  const testAndDisplayAnswer = () => {
    if (!answers.hasOwnProperty(questionIdx) || answers[questionIdx].code === '') {
      return
    }

    setAnswers({
      ...answers,
      [questionIdx]: {
        ...answers[questionIdx],
        loading: true,
      }
    })
    
    checkAnswer(answers[questionIdx].code, questions[questionIdx])
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
          const opts = {disableForReducedMotion: true}
          if (window.matchMedia('screen and (min-width: 640px)').matches) {
            opts.spread = 100
          }
          confetti(opts)
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
      const newQuestionIdx = questionIdx + (increment ? 1 : -1)
      setQuestionIdx(newQuestionIdx)
    }
  }

  const submitAnswer = e => {
    e.preventDefault()
    testAndDisplayAnswer()
  }

  const updateAnswer = e => {
    setAnswers({
      ...answers,
      [questionIdx]: {code: e.target.value}
    })
  }

  preloadWorker()

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

      <div className="container-shadow md:max-w-screen-lg md:mt-10 md:flex md:mx-auto">
        <div className="px-8 py-10 md:px-12 md:py-16 bg-white md:w-1/2">
          <div className="markdown mb-8 md:mb-10 text-lg" dangerouslySetInnerHTML={{ __html: questions[questionIdx].html }} />
          <p className="text-2xl font-medium">
            <span className="text-lg">{questionIdx + 1} <span className="text-gray-500">/ {questions.length}</span></span>
          </p>
        </div>

        <div className="px-8 py-10 md:px-12 md:py-16 bg-black text-white md:flex-1">
          <TextareaAutosize value={answers.hasOwnProperty(questionIdx) ? answers[questionIdx].code : ''} placeholder="Enter code..." onChange={updateAnswer} ref={answerTextarea} spellCheck={false} autoCapitalize='none' disabled={answers.hasOwnProperty(questionIdx) && answers[questionIdx].loading} className="w-full mb-8 md:mb-10 bg-transparent placeholder-gray-700 outline-none resize-none font-mono disabled:opacity-50" />
          {answers.hasOwnProperty(questionIdx) && answers[questionIdx].success ? null : (
            <div>
              <button onClick={submitAnswer} className="px-2 py-1 bg-green-300 text-black font-medium rounded disabled:opacity-50" disabled={!answers.hasOwnProperty(questionIdx) || (answers[questionIdx].code === '') || answers[questionIdx].loading}>{answers.hasOwnProperty(questionIdx) && answers[questionIdx].loading ? 'Loading…' : 'Submit answer'}</button>
              <span className="ml-2 text-sm text-gray-700 hidden md:inline">enter</span>
            </div>
          )}
          {answers.hasOwnProperty(questionIdx) && answers[questionIdx].success || !answers.hasOwnProperty(questionIdx) || !answers[questionIdx].hasOwnProperty('result') || answers[questionIdx].result === 'True' ? (
            null
          ) : (
            <p className="mt-8 md:mt-10 text-white font-mono text-yellow-200">{answers[questionIdx].result}</p>
          )}

          {answers.hasOwnProperty(questionIdx) && answers[questionIdx].success ? (
            <p className="text-2xl font-medium leading-none">
              <span className="text-lg"><span className="text-green-300">✓</span> Success</span>
            </p>
          ) : null}

        </div>
      </div>
      <div className={'px-8 pt-10 md:px-12 md:max-w-screen-lg md:mx-auto'}>
        <div className={'text-center flex ' + (questionIdx > 0 ? 'justify-between' : 'justify-end')}>
          {questionIdx > 0 ? (
            <div className={'mb-8'}>
              <button onClick={e => updateQuestion(e, false)} className="-mx-3 px-3 py-2 text-black text-lg font-medium rounded subtle">&larr; Back </button>
              <span className="ml-5 text-sm text-gray-700 hidden md:inline">⌘-del</span>
            </div>
          ) : null}
          {answers.hasOwnProperty(questionIdx) && answers[questionIdx].success && questionIdx < questions.length - 1 ? (
            <div className={'mb-8'}>
              <span className="mr-2 text-sm text-gray-700 hidden md:inline">enter</span>
              <button onClick={e => updateQuestion(e, true)} className="px-3 py-2 bg-green-300 text-black text-lg font-semibold rounded shadow-md">Next question &rarr;</button>
            </div>
          ) : null}
        </div>
        <div className={'pb-10 text-xs leading-relaxed'}>
          <p>Open source at <a href="https://github.com/vthommeret/mathtocode" target="_blank">github.com/vthommeret/mathtocode</a></p>
          <p>Built by <a href="https://thommeret.com" target="_blank">Vernon Thommeret</a></p>
          <p>Discuss on <a href="https://news.ycombinator.com/item?id=23513438" target="_blank">Hacker News</a></p>
        </div>
      </div>
    </>
  )
}

import path from 'path'
import fs from 'fs'

import matter from 'gray-matter'
import remark from 'remark'
import remarkHtml from 'remark-html'
import katex from 'katex'

export const getStaticProps = async () => {
  const mathRe = /\bmath`([^`]+)`/g

  const dir = path.join(process.cwd(), 'questions')
  const docs = fs.readdirSync(dir).sort()

  const questions = docs.map(doc => {
    const filename = path.join(dir, doc)
    const content = fs.readFileSync(filename, 'utf8')
    const { data, content: markdown } = matter(content)
    const markdownMath = markdown.replace(mathRe, (_, math) => {
      return katex.renderToString(math)
    })
    const html = remark().use(remarkHtml).processSync(markdownMath).toString()
    return {doc, params: data.params, solution: data.solution, tests: data.tests, html}
  })

  return {
    props: { questions }
  }
}

export default Home
