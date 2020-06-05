import { initPython, runPython } from '../lib/python'

(() => {
  const imports = {np: 'numpy'}

  initPython()

  onmessage = e => {
    const answer = e.data[0];
    const params = e.data[1];
    const tests = e.data[2];
    const solution = e.data[3];

    runPython(answer, solution, params, tests, imports)
      .then(([pyRes, jsRes]) => {
        const [jsAnswer, jsSolution] = jsRes
        const [pyAnswer, pySolution] = pyRes.v

        if (jsAnswer.length !== jsSolution.length) {
          throw `Answer result length (${jsAnswer.length}) doesn't match solution result length (${jsSolution.length})`
        }

        const answerType = pyAnswer.v[0].tp$name
        const solutionType = pySolution.v[0].tp$name

        if (answerType !== solutionType) {
          throw `Answer type (${answerType}) doesn't match solution type (${solutionType})`
        }

        let success = true

        jsSolution.forEach((res, i) => {
          if (res !== jsAnswer[i]) {
            success = false
          }
        })

        postMessage({success: success})
      })
      .catch(err => {
        console.log(err)
        postMessage({error: err.toString()})
      })
  }

})()
