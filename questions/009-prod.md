---
params: [m]
solution: m.prod()
tests:
  - [ [50] ]
  - [ [10, 20, 30] ]
  - [ [[1, 2, 3], [4, 5, 6], [7, 8, 9]] ]
---

Another common operation is multiplying each value in a vector or matrix. This looks like this:

math`\prod_{i,j=1}^n {m_{ij}}`

The Π symbol is a capital π symbol, pronounced "pi". Implement this equation similarly using the `prod` function.

**Hint:** Use the same syntax as `sum` but with `prod` instead. You can click "Back" to see your previous answer.
