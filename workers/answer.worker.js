import * as tfjs from '@tensorflow/tfjs'

const EQUAL = 'equal'
const NOT_EQUAL = 'not_equal'

onmessage = e => {
  const answer = e.data[0];
  const params = e.data[1];
  const assertions = e.data[2];
  const solution = e.data[3];
  const res = checkAnswer(answer, params, assertions[0], solution);
  postMessage(res)
}

const checkAnswer = (answer, params, assertion, solution) => {
  const {type: assert, args} = assertion

  // Imported TensorFlow isn't available for some reason with out aliasing
  const tf = tfjs;

  // Parameters and arguments
  const paramsStr = params.join(', ')
  const tensors = args.map(arg => { return tf.tensor(arg) })

  // Add 'return' to single-line answer
  answer = answer.match(/[^\r\n]+/g).length === 1 ? `return ${answer}` : answer;

  // Create executable function
  const answerFn = Function.apply(null, [...params, 'tf', answer])

  // Run function
  const res = answerFn.apply(null, [...tensors, tf])

  if (typeof res.dataSync === 'undefined') {
    throw 'Result must be Tensor'
  }

  // Create solution function / expected value
  const solutionFn = Function(`return ${solution}`)()
  const expected = solutionFn.apply(null, tensors)

  // Determine if all elements equal expected value
  const els = res.dataSync().length
  const truths = res.equal(expected).sum().dataSync()[0]

  switch (assert) {
    case EQUAL:
      return els === truths
    case NOT_EQUAL:
      return els !== truths
  }

  return null
}
