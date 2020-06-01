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

const runPython = (code, args, imports) => {
  let ks = []
  let vs = []
  let casts = []

  Object.entries(args).forEach(([k, v]) => {
    ks.push(k)
    vs.push(v)
    casts.push(`${k} = ` + (Array.isArray(v) ? `np.array(${k})` : k))
  })

  const paramsStr = ks.join(', ')
  const pyArgs = vs.map(arg => Sk.ffi.remapToPy(arg))
  const importsStr = Object.entries(imports).map(([alias, module]) => `import ${module} as ${alias}`).join('\n')
  const castsStr = casts.join('; ')

  const fn = `${importsStr}
def run(${paramsStr}):
  ${castsStr}
  return ${code}`

  return Sk.misceval.asyncToPromise(() => {
    return Sk.importMainWithBody('<stdin>', false, fn, true)
  })
    .then(mod => {
      const method = mod.tp$getattr(Sk.ffi.remapToPy('run'))
      const out = Sk.misceval.apply(method, undefined, undefined, undefined, pyArgs)
      return [out, Sk.ffi.remapToJs(out)]
    })
}

export { initPython, runPython }
