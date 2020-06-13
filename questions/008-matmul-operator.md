---
params: [a, b]
solution: a @ b
tests:
  - [ [[1, 2, 3], [4, 5, 6]], [[7, 8], [9, 10], [11, 12]] ]
  - [ [[10], [4]], [14, 12] ]
---

In addition to the `dot` method, starting in Python 3.5 you can also use the `@` operator to do matrtix multiplication:

math`a \cdot b`

Implement this operation again with `a @ b`.
