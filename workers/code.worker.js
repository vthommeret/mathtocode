import * as tf from '@tensorflow/tfjs'

var EQUAL = 'equal'
var NOT_EQUAL = 'not_equal'

onmessage = function(e) {
  var code = e.data[0];
  var assertions = e.data[1];
  var res = testCode(code, assertions[4]);
  postMessage(res)
}

function testCode(code, assertion) {
  var assert = assertion[0]
  var x = assertion[1]
  var expected = assertion[2]

  // Add 'return' to single-line code
  var codeLn = code.match(/[^\r\n]+/g).length === 1 ? `return ${code}` : code;

  // Create executable function
  var codeFn = `(function (x) { ${codeLn}; })(x)`

  var res = eval(codeFn)

  switch (assert) {
    case EQUAL:
      return expected === res
    case NOT_EQUAL:
      return expected !== res
  }

  return null
}
