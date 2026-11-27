---
comments: true
difficulty: Medium
tags:
  - Math
  - Geometry
  - Rejection Sampling
  - Randomized
---

# 478. Generate Random Point in a Circle

**[View Problem on LeetCode](https://leetcode.com/problems/generate-random-point-in-a-circle/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0478` (`478`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Geometry`, `Rejection Sampling`, `Randomized` |
| **Solution Language** | Java |

---

## Problem Description

Given the radius and the position of the center of a circle, implement the function `randPoint` which generates a uniform random point inside the circle.

Implement the `Solution` class:

	- `Solution(double radius, double x_center, double y_center)` initializes the object with the radius of the circle `radius` and the position of the center `(x_center, y_center)`.

	- `randPoint()` returns a random point inside the circle. A point on the circumference of the circle is considered to be in the circle. The answer is returned as an array `[x, y]`.

---

## Examples

### Example 1

```
Input
["Solution", "randPoint", "randPoint", "randPoint"]
[[1.0, 0.0, 0.0], [], [], []]
Output
[null, [-0.02493, -0.38077], [0.82314, 0.38945], [0.36572, 0.17248]]

Explanation
Solution solution = new Solution(1.0, 0.0, 0.0);
solution.randPoint(); // return [-0.02493, -0.38077]
solution.randPoint(); // return [0.82314, 0.38945]
solution.randPoint(); // return [0.36572, 0.17248]
```

 

**

---

## Constraints

**

	- `0 < radius <= 10^8`

	- `-10^7 <= x_center, y_center <= 10^7`

	- At most `3 * 10^4` calls will be made to `randPoint`.

---

## Problem Understanding

- Given a circle centered at `(x_center, y_center)` with `radius`, implement `randPoint()` to return a uniformly random point inside (or on the boundary of) the circle.

---

## Approach

### Optimized Approach (Inverse-Transform Polar Coordinate Sampling)
1. Sample a uniform angle $a \in [0, 2\pi)$ via `2 * Math.PI * Math.random()`.
2. Because area scales quadratically with radius ($A(r) \propto r^2$), sampling radius linearly would cluster points near the center. Apply the inverse CDF transform $d = r \cdot \sqrt{U}$ where $U \sim \text{Uniform}(0, 1)$.
3. Convert polar `(d, a)` to Cartesian coordinates shifted by `(cx, cy)`: `(cx + d * cos(a), cy + d * sin(a))`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ deterministic per `randPoint()` call.
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [478generate-random-point-in-a-circle.java](./478generate-random-point-in-a-circle.java) |

---

## Key Learnings

- Taking the square root of a uniform random variable ($\sqrt{U}$) corrects for the Jacobian $r\,dr\,d\theta$ of polar coordinates, guaranteeing exact area-uniform sampling in $O(1)$ without rejection.
