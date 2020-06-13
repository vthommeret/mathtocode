---
params: [x]
solution: (1 / x.size) * x.sum()
tests:
  - [ [50] ]
  - [ [10, 20, 30] ]
  - [ [[1, 2, 3], [4, 5, 6], [7, 8, 9]] ]
---

Great! Now you're ready to implement some basic equations! Let's start with the arithmetic mean:

math`\bar{x} = \frac{1}{n} \times \sum_{i,j=1}^n {x_{ij}}`

This simply means adding every element of a list and dividing the result by the number of elements in `x`. A bar over a variable refers to a type of mean.

Hint: You can get the number of elements in an array in Numpy with `x.size`.
