import { initPython, runPython } from '../lib/python'

(() => {
  const imports = {np: 'numpy'}

  initPython()

  onmessage = e => {
    const answer = e.data[0];
    const params = e.data[1];
    const tests = e.data[2];
    const solution = e.data[3];

    const args = {}
    params.forEach((param, i) => args[param] = tests[0][i])

    checkAnswer(answer, solution, args)
      .then(res => {
        postMessage({success: res})
      })
      .catch(err => {
        console.log(err)
        postMessage({error: err.toString()})
      })
  }

  const checkAnswer = (answer, solution, args) => {
    return runPython(answer, args, imports)
      .then(([pyAnswer, jsAnswer]) => {

        return runPython(solution, args, imports)
          .then(([pySolution, jsSolution]) => {

            const answerType = pyAnswer.tp$name
            const solutionType = pySolution.tp$name

            if (answerType !== solutionType) {
              throw `Answer type (${answerType}) doesn't match solution type (${solutionType})` 
            }

            switch (answerType) {
              case 'float': case 'int':
                return jsAnswer === jsSolution
              case 'np.ndarray':
                console.log('numpy', answerType)
                break
            }
          })

      })
  }
})()
