import { initPython, runPython } from '../lib/python'

(() => {
  const imports = {np: 'numpy'}

  initPython()

  onmessage = e => {
    const answer = e.data[0];
    const params = e.data[1];
    const tests = e.data[2];
    const solution = e.data[3];

    checkAnswer(answer, solution, params, tests)
      .then(res => {
        postMessage({success: res})
      })
      .catch(err => {
        console.log(err)
        postMessage({error: err.toString()})
      })
  }

  const checkAnswer = (answer, solution, params, tests) => {
    return runPython(answer, params, tests, imports)
      .then(([pyAnswer, jsAnswer]) => {
        return runPython(solution, params, tests, imports)
          .then(([pySolution, jsSolution]) => {
            if (jsSolution.length !== jsAnswer.length) {
              throw "Solution result length don't match answer results"
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

            return success
          })

      })
  }

})()
