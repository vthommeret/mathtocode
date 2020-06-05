import 'skulpt/dist/skulpt.min'
import 'skulpt/dist/skulpt-stdlib'

const initPython = () => {
  const externalLibs = {
    './numpy/__init__.js': '/js/skulpt-numpy.js'
  };

  const builtinRead = file => {
    if (externalLibs[file] !== undefined) {
      return Sk.misceval.promiseToSuspension(
        fetch(externalLibs[file]).then(res => {
          return res.text()
        })
      )
    }

    if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[file] === undefined) {
      throw `File not found: ${file}`
    }
    return Sk.builtinFiles.files[file];
  }

  Sk.configure({
    read: builtinRead,
    output: console.log,
    __future__: Sk.python3,
  })
}

const runPython = (code, params, tests, imports) => {
  const test = tests[0]
  const casts = params.map((param, i) => `${param} = ` + (Array.isArray(test[i]) ? `np.array(test[${i}])` : `test[${i}]`))

  const pyArgs = Sk.ffi.remapToPy(tests)
  const importsStr = Object.entries(imports).map(([alias, module]) => `import ${module} as ${alias}`).join('\n')
  const castsStr = casts.join('; ')

  const fn = `${importsStr}
def run(tests):
  res = []
  for test in tests:
    ${castsStr}
    res.append(${code})
  return res`

  return Sk.misceval.asyncToPromise(() => {
    return Sk.importMainWithBody('<stdin>', false, fn, true)
  })
    .then(mod => {
      const method = mod.tp$getattr(Sk.ffi.remapToPy('run'))
      const out = Sk.misceval.call(method, undefined, undefined, undefined, pyArgs)
      return [out, Sk.ffi.remapToJs(out)]
    })
}

export { initPython, runPython }
