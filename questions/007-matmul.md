---
params: [a, b]
solution: a.dot(b)
tests:
  - [ [[1, 2, 3], [4, 5, 6]], [[7, 8], [9, 10], [11, 12]] ]
  - [ [14, 12], [[10], [4]] ]
---

In addition to multiplying vectors and matrices by single numbers, you can multiply matrices by other matrices. For example, for two matrices `a` and `b`:

math`a = \begin{bmatrix}1 & 2 & 3 \\
4 & 5 & 6\end{bmatrix}
b = \begin{bmatrix}7 & 10 \\
8 & 11 \\
9 & 12\end{bmatrix}`

You can multiply them together using something called the dot product:

math`a \cdot b`

When you compute the dot product of two matrices, the elements of the rows of the first matrix (a 2x3) matrix are multiplied by the elements of the columns of the second matrix (a 3x2 matrix) to end up with a 2x2 matrix:

math`a = \begin{bmatrix}55 && 64 \\
139 && 154\end{bmatrix}`

Implement the dot product using the `dot` method: `a.dot(b)`.
