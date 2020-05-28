import * as tfjs from '@tensorflow/tfjs'

var EQUAL = 'equal'
var NOT_EQUAL = 'not_equal'

onmessage = function(e) {
  var code = e.data[0];
  var params = e.data[1];
  var assertions = e.data[2];
  var res = testCode(code, params, assertions[0]);
  postMessage(res)
}

function testCode(code, params, assertion) {
  const [assert, args, expected] = assertion

  // Parameters and arguments
  var paramsStr = params.join(', ')
  var argsStr = Array.isArray(args) ? args.join(', ') : args

  // Add 'return' to single-line code
  var codeLn = code.match(/[^\r\n]+/g).length === 1 ? `return ${code}` : code;

  // Imported TensorFlow isn't available for some reason with out aliasing
  var tf = tfjs;

  // Create executable function
  var codeFn = `(function (${paramsStr}, tf) { ${codeLn}; })(${argsStr}, tf)`

  var res = eval(codeFn)

  switch (assert) {
    case EQUAL:
      return expected === res
    case NOT_EQUAL:
      return expected !== res
  }

  return null
}
