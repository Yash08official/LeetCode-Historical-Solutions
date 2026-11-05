---
comments: true
difficulty: Medium
tags:
  - Array
  - String
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Graph Theory
  - Shortest Path
  - Bellman–Ford Algorithm
  - Floyd–Warshall Algorithm
---

# 399. Evaluate Division

**[View Problem on LeetCode](https://leetcode.com/problems/evaluate-division/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0399` (`399`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `String`, `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Graph Theory`, `Shortest Path`, `Bellman–Ford Algorithm`, `Floyd–Warshall Algorithm` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an array of variable pairs `equations` and a corresponding array of positive floating-point `values`, where `equations[i] = [A_i, B_i]` represents `A_i / B_i = values[i]`. You are also given an array of `queries`, where `queries[j] = [C_j, D_j]` asks for the value of `C_j / D_j`.

Return an array of answers for all queries. If a ratio cannot be determined (either because the two variables have no connecting chain of equations or because a variable never appeared in `equations`), return `-1.0`.

---

## Examples

### Example 1

```text
Input: equations = [["a","b"],["b","c"]], values = [2.0,3.0], queries = [["a","c"],["b","a"],["a","e"],["a","a"],["x","x"]]
Output: [6.00000,0.50000,-1.00000,1.00000,-1.00000]
Explanation:
Given: a / b = 2.0, b / c = 3.0
queries are: a / c = ?, b / a = ?, a / e = ?, a / a = ?, x / x = ?
return: [6.0, 0.5, -1.0, 1.0, -1.0 ]
note: x is undefined => -1.0
```

### Example 2

```text
Input: equations = [["a","b"],["b","c"],["bc","cd"]], values = [1.5,2.5,5.0], queries = [["a","c"],["c","b"],["bc","cd"],["cd","bc"]]
Output: [3.75000,0.40000,5.00000,0.20000]
```

### Example 3

```text
Input: equations = [["a","b"]], values = [0.5], queries = [["a","b"],["b","a"],["a","c"],["x","y"]]
Output: [0.50000,2.00000,-1.00000,-1.00000]
```

---

## Constraints

- `1 <= equations.length <= 20`

- `equations[i].length == 2`

- `1 <= A_i.length, B_i.length <= 5`

- `values.length == equations.length`

- `0.0 < values[i] <= 20.0`

- `1 <= queries.length <= 20`

- `queries[i].length == 2`

- `1 <= C_j.length, D_j.length <= 5`

- `A_i, B_i, C_j, D_j` consist of lower case English letters and digits.

---

## Problem Understanding

Division is transitive and invertible:
- If `a / b = 2.0` and `b / c = 3.0`, then `a / c = (a / b) * (b / c) = 6.0`.
- Conversely, `b / a = 1 / 2.0 = 0.5`.

Key observations:
- Variables belong to connected components of known relative ratios. Any two variables in the **same component** can both be expressed as multiples of their component's root representative `r`: `c = w[c] * r` and `d = w[d] * r`, making `c / d = w[c] / w[d]`!
- **Edge case:** Even `x / x` must evaluate to `-1.0` if `"x"` never appeared in `equations`.

---

## Approach

### Brute Force Approach

Build a weighted directed graph (`A -> B` with weight `v` and `B -> A` with weight `1/v`) and run a separate BFS or DFS from `C_j` to `D_j` for every single query, multiplying edge weights along the path.

If there are `E` equations and `Q` queries, running graph search from scratch per query takes `O(Q * (V + E))` time.

### Optimized Approach

Use a **Weighted Disjoint Set Union (Union-Find)** with path compression, storing parent links in `Map p` and relative weights `w.get(x) = x / p.get(x)` in `Map w`. After uniting all equations, each query `[c, d]` resolves in near-constant amortized time by compressing `c` and `d` to their roots and dividing `w.get(c) / w.get(d)`.

### Step-by-Step Thinking Process

1. Initialize parent map `p` and weight map `w`: for every variable appearing in `equations`, set `p.set(v, v)` and `w.set(v, 1.0)` (since `v / v = 1.0`).
2. Implement `find(x, p, w)` with path compression: if `p.get(x) !== x`, save `origin = p.get(x)`, recursively compress `p.set(x, find(origin, p, w))`, and chain the ratio `w.set(x, w.get(x) * w.get(origin))` so `w.get(x)` now equals `x / root`.
3. For each equation `a / b = values[i]`, find roots `pa = find(a, p, w)` and `pb = find(b, p, w)`. If `pa !== pb`, attach `pa` under `pb` (`p.set(pa, pb)`) and set `w.set(pa, w.get(b) * values[i] / w.get(a))`.
4. For each query `[c, d]`, if `!p.has(c) || !p.has(d)` or `find(c, p, w) !== find(d, p, w)`, record `-1.0`; otherwise record `w.get(c) / w.get(d)`.

### Algorithm / Intuition

Let's verify the exact algebra in the union step `w.set(pa, w.get(b) * values[i] / w.get(a))`:
- Right after `pa = find(a, p, w)` and `pb = find(b, p, w)`, path compression guarantees `a / pa = w.get(a)` (so `a = w.get(a) * pa`) and `b / pb = w.get(b)` (so `b = w.get(b) * pb`).
- We are given `a / b = values[i]`. Substituting `a` and `b` yields `(w.get(a) * pa) / (w.get(b) * pb) = values[i]`.
- Solving for `pa / pb`—which is the exact invariant needed for `w.get(pa)` when `p.set(pa, pb)` makes `pb` the parent of `pa`—gives `pa / pb = w.get(b) * values[i] / w.get(a)`!

Later, when querying `[c, d]` in the same component with root `r`, `find(c)` and `find(d)` ensure `w.get(c) = c / r` and `w.get(d) = d / r`, so `(c / r) / (d / r) = c / d`.

---

## Dry Run

Tracing **Example 1**: `equations = [["a","b"], ["b","c"]]`, `values = [2.0, 3.0]`

1. **Init:** `p = {a:a, b:b, c:c}`, `w = {a:1, b:1, c:1}`
2. **Union `a / b = 2.0`:** `pa = "a"`, `pb = "b"` -> `p[a] = "b"`, `w[a] = 1 * 2.0 / 1 = 2.0`
3. **Union `b / c = 3.0`:** `pa = "b"`, `pb = "c"` -> `p[b] = "c"`, `w[b] = 1 * 3.0 / 1 = 3.0`
4. **Queries:**
   - `["a", "c"]`: `find("a")` compresses `p[a] = "c"` and updates `w[a] = w[a] * w[b] = 2.0 * 3.0 = 6.0`. `find("c") = "c"` (`w[c] = 1.0`). Same root `"c"` -> `w[a] / w[c] = 6.0 / 1.0 = 6.0`.
   - `["b", "a"]`: Both have root `"c"` -> `w[b] / w[a] = 3.0 / 6.0 = 0.5`.
   - `["a", "e"]`: `!p.has("e")` -> `-1.0`.
   - `["a", "a"]`: Same root `"c"` -> `w[a] / w[a] = 6.0 / 6.0 = 1.0`.
   - `["x", "x"]`: `!p.has("x")` -> `-1.0`.

Returns `[6.0, 0.5, -1.0, 1.0, -1.0]`.

---

## Complexity Analysis

- **Time Complexity:** `O((E + Q) * alpha(V))` where `E` is `equations.length`, `Q` is `queries.length`, `V <= 2E` is the number of distinct variables, and `alpha` is the inverse Ackermann function (practically `O(1)`).
- **Space Complexity:** `O(V)` — Maps `p` and `w` store one entry per distinct variable in `equations` (excluding the output array `ans` of size `Q`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [399evaluate-division.js](./399evaluate-division.js) |

---

## Key Learnings

- Weighted Union-Find generalizes standard connectivity DSU whenever edges carry invertible group operations (like multiplicative ratios or additive potentials/XORs).
- Saving `let origin = p.get(x)` *before* the recursive `find` call is critical during path compression so `w[x]` multiplies against `origin`'s newly compressed weight to the root.
- Always check `!p.has(c) || !p.has(d)` before checking `c === d`, because undefined self-ratios like `x / x` must return `-1.0`.
