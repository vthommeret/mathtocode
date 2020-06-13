---
params: [m]
solution: np.sqrt((m ** 2).sum())
tests:
  - [ [50] ]
  - [ [10, 20, 30] ]
  - [ [[1, 2, 3], [4, 5, 6], [7, 8, 9]] ]
---

Good job! Now let's implement something known as the Frobenius norm:

math`\| m \|_F = \left( \sum_{i,j=1}^n {m_{ij}}^2 \right)^{1/2}`

**Hint:** You can implement this a number of ways, using operators (`**`), functions (`np.sqrt`), and methods (`.sum`).
