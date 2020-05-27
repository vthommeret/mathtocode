import skulpt from 'skulpt'

var EQUAL = 'equal'
var NOT_EQUAL = 'not_equal'

skulpt.externalLibraries = {
  numpy: {
    path: '/scripts/numpy/__init__.js',
    dependencies: ['/scripts/numpy/random/__init__.js'],
  }
}

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

  const prog = `def run(x):
  return ${code}`

  skulpt.misceval.asyncToPromise(() => {
    return skulpt.importMainWithBody('<stdin>', false, prog)
  })
    .then(mod => {
      const method = mod.tp$getattr('run')
      const res = skulpt.misceval.callsim(method, x).v
      console.log('worker res', res)
			switch (assert) {
				case EQUAL:
					return expected === res
				case NOT_EQUAL:
					return expected !== res
			}
    })
    .catch(err => {
      console.log('parse error', err)
    })

  return null
}
