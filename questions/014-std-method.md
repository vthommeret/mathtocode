---
params: [m]
solution: np.sqrt((m ** 2).sum())
tests:
  - [ [50] ]
  - [ [10, 20, 30] ]
  - [ [[1, 2, 3], [4, 5, 6], [7, 8, 9]] ]
---

Great job! You may also see standard deviation represented with a lower-case sigma:

math`\sigma_{x}`

In addition to implementing standard deviation from scratch, you can also use Numpy's built-in standard deviation method: `x.std()`.
