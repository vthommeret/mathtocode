---
params: [x]
solution: x.sum() / x.size
tests:
  - [ [50] ]
  - [ [10, 20, 30] ]
  - [ [[1, 2, 3], [4, 5, 6], [7, 8, 9]] ]
---

Great! Now you're ready to implement some basic equations! Let's start with the arithmetic mean:

math`\bar{x} = \displaystyle\frac{1}{n} \times \sum_{i=1}^n {x_{i}}`

This simply means adding every element of a list and dividing the result by the number of elements in math`x`. A bar over a variable (math`\bar{x}`) refers to a type of mean.

**Hint:** You can get the number of elements in an array in NumPy with `x.size`.
