---
comments: true
difficulty: Medium
tags:
  - Array
  - Greedy
  - Heap (Priority Queue)
---

# 1792. Maximum Average Pass Ratio

**[View Problem on LeetCode](https://leetcode.com/problems/maximum-average-pass-ratio/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1792` (`1792`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Greedy`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

A school has several classes taking a final exam, described by a 2D array `classes` where `classes[i] = [pass_i, total_i]` indicates that `pass_i` out of `total_i` students in class `i` will currently pass.

You also have `extraStudents` brilliant students who are **guaranteed to pass** the exam in whichever class they join. Adding one extra student to class `[p, t]` updates its pass ratio from `p / t` to `(p + 1) / (t + 1)`.

Assign all `extraStudents` students across the classes to **maximize** the **average pass ratio** across all `classes.length` classes, and return that maximum average (answers within `10^-5` are accepted).

---

## Examples

### Example 1

```text
Input: classes = [[1,2],[3,5],[2,2]], extraStudents = 2
Output: 0.78333
Explanation: You can assign the two extra students to the first class. The average pass ratio will be equal to (3/4 + 3/5 + 2/2) / 3 = 0.78333.
```

### Example 2

```text
Input: classes = [[2,4],[3,9],[4,5],[2,10]], extraStudents = 4
Output: 0.53485
```

---

## Constraints

- `1 <= classes.length <= 10^5`

- `classes[i].length == 2`

- `1 <= pass_i <= total_i <= 10^5`

- `1 <= extraStudents <= 10^5`

---

## Problem Understanding

- **Fixed Denominator in Average:** Because the number of classes `n = classes.length` is constant, maximizing `(1 / n) * sum(pass_i / total_i)` is equivalent to maximizing the sum of individual class pass ratios.
- **Marginal Gain & Diminishing Returns:** Adding one student to `[p, t]` increases its pass ratio by:
  `delta(p, t) = (p + 1) / (t + 1) - p / t = (t - p) / (t * (t + 1))`.
  Notice that as we add students (`p -> p + 1`, `t -> t + 1`), the numerator `t - p` stays constant while the denominator `t(t + 1)` strictly grows! Because marginal gains are **strictly decreasing** (concave), choosing the highest marginal gain one student at a time via a Greedy algorithm is globally optimal.
- **Common Pitfall:** Picking the class with the *lowest current pass ratio* is WRONG! For example, `[1, 2]` (`0.50 -> 0.667`, gain `+0.167`) gains much more from one extra student than `[50, 100]` (`0.50 -> 0.505`, gain `+0.005`).

---

## Approach

### Brute Force Approach

Scanning all `n` classes linearly for each of the `extraStudents` (`k`) assignments to find the largest marginal gain takes `O(k * n)` time. With `n, k <= 10^5`, `10^{10}` operations will result in Time Limit Exceeded.

### Optimized Approach

Use a Max-Heap (`PriorityQueue<double[]>`) ordered by the marginal pass-ratio gain `(p + 1) / (t + 1) - p / t`. Repeatedly pop the top class, add one passing student (`p + 1, t + 1`), and push it back `extraStudents` times, then compute the final mean pass ratio.

### Step-by-Step Thinking Process

1. Define a `PriorityQueue<double[]>` whose custom comparator computes `x = (a[0] + 1) / (a[1] + 1) - a[0] / a[1]` and `y = (b[0] + 1) / (b[1] + 1) - b[0] / b[1]`, returning `Double.compare(y, x)` so the largest gain sits at the root.
2. Insert all initial `[pass_i, total_i]` pairs as `double[]` into `pq`.
3. Loop `extraStudents` times: poll the highest-gain class `e`, increment both `e[0]` and `e[1]` by `1`, and offer the updated pair back into `pq`.
4. Drain `pq`, summing `e[0] / e[1]` into `ans`, and divide `ans` by `classes.length`.

### Algorithm / Intuition

Each extra student is an identical unit resource, and each class exhibits diminishing marginal returns as students are added (`(t - p) / (t(t + 1))` shrinks as `t` increases). By maintaining all classes in a max-heap `pq` keyed by their next single-student improvement `(a[0] + 1) / (a[1] + 1) - a[0] / a[1]`, we find and update the best class for each brilliant student in `O(log n)` time instead of `O(n)`.

---

## Dry Run

Using **Example 1**: `classes = [[1, 2], [3, 5], [2, 2]]`, `extraStudents = 2`

1. **Initial Heap Gains:**
   - `[1, 2]`: `2/3 - 1/2 = 0.16667`
   - `[3, 5]`: `4/6 - 3/5 = 0.06667`
   - `[2, 2]`: `3/3 - 2/2 = 0.00000`
2. **Extra Student 1:**
   - Poll `[1, 2]` (max gain `0.16667`), push `[2, 3]` (new gain `3/4 - 2/3 = 0.08333`).
3. **Extra Student 2:**
   - Poll `[2, 3]` (gain `0.08333` > `0.06667`), push `[3, 4]` (new gain `4/5 - 3/4 = 0.05000`).
4. **Final Sum & Average:**
   - Ratios in `pq`: `3/4 = 0.75`, `3/5 = 0.60`, `2/2 = 1.00`.
   - `ans / 3 = (0.75 + 0.60 + 1.00) / 3 = 2.35 / 3 ≈ 0.78333`.

---

## Complexity Analysis

- **Time Complexity:** `O((n + k) log n)` — Where `n = classes.length` and `k = extraStudents`. Building/populating the heap takes `O(n log n)`, assigning `k` students takes `O(k log n)`, and summing the `n` final elements takes `O(n log n)`.
- **Space Complexity:** `O(n)` — The priority queue stores `n` `double[2]` arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1792maximum-average-pass-ratio.java](./1792maximum-average-pass-ratio.java) |

---

## Key Learnings

- Greedy resource allocation with a max-heap is provably optimal whenever each bucket's marginal gain is strictly concave (diminishing returns).
- Always rank heap elements by **marginal improvement** (`f(x + 1) - f(x)`), not by raw current value (`f(x)`).
