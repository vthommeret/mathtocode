---
params: [x]
solution: x ** (.5)
tests:
  - [25]
  - [16]
  - [5]
---

Earlier you implemented the square root function using `np.sqrt(x)`. Sometimes you'll see square root expressed as an exponent:

math`x^{1/2}`

This is because multiplying this value by itself results in the original value:

math`x^{1/2} \cdot x^{1/2} = x`

Try implementing square root using the power operator you just learned.

**Hint:** Since `**` has higher precedence than `/`, if you use a fraction you need to group it using parentheses: `1/2`.
