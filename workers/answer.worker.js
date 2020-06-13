import { initPython, runPython } from '../lib/python'

const flatNpArray = npArray => {
  return npArray.buffer.map(x => x.v)
}

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
          let correct = true
          if (answerType === 'numpy.ndarray') {
            const solution = flatNpArray(res)
            const answer = flatNpArray(jsAnswer[i])
            correct = solution.reduce((a, x, j) => a + (x === answer[j] ? 1 : 0), 0)
          } else {
            correct = (res === jsAnswer[i])
          }
          if (!correct) {
            success = false
            return
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
