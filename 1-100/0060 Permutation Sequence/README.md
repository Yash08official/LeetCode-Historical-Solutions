---
comments: true
difficulty: Hard
tags:
  - Math
  - Recursion
---

# 60. Permutation Sequence

**[View Problem on LeetCode](https://leetcode.com/problems/permutation-sequence/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0060` (`60`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Math`, `Recursion` |
| **Solution Language** | Java |

---

## Problem Description

The set `[1, 2, 3, ..., n]` has `n!` unique permutations. When all `n!` permutations are listed in ascending lexicographical (dictionary) order and 1-indexed from `1` to `n!`, return the **`k`-th permutation sequence** as a string.

---

## Examples

### Example 1

```text
Input: n = 3, k = 3
Output: "213"
```

### Example 2

```text
Input: n = 4, k = 9
Output: "2314"
```

### Example 3

```text
Input: n = 3, k = 1
Output: "123"
```

---

## Constraints

- `1 <= n <= 9`

- `1 <= k <= n!`

---

## Problem Understanding

- **Block Size Symmetry:** Among all `n!` sorted permutations of `n` distinct digits, the first `(n - 1)!` start with the smallest digit `1`, the next `(n - 1)!` start with `2`, and in general each available leading digit heads an equal contiguous block of `(n - 1)!` permutations.
- **1-Indexed `k` Boundary:** Care is needed when `k` is an exact multiple of `fact = (n - 1)!`: for example, if `fact = 2` and `k = 2`, we are still at the *end* of the **first** block (`k <= fact`), whereas `k = 3` (`k > fact`) crosses into the **second** block.
- **Shrinking Subproblem:** Once the first digit is fixed and marked used, finding the `k'`-th permutation among the remaining `n - 1` unused digits follows the exact same rule with block size `(n - 2)!`.

---

## Approach

### Brute Force Approach

Generating the first `k` permutations one-by-one in lexicographical order via DFS backtracking (or calling `nextPermutation` `k - 1` times) takes `O(n * k)` time, which degrades to `O(n * n!)` (`~3.26 * 10^6` operations for `n = 9, k = 9!`). While barely passable for `n = 9`, we can skip entire factorial blocks arithmetically without enumerating intermediate permutations.

### Optimized Approach

Construct the answer **digit-by-digit using factorial block skipping (Cantor expansion)**: at slot `i` (`0 <= i < n`), compute `fact = (n - 1 - i)!`, scan unused digits `1..n` in ascending order subtracting `fact` from `k` while `k > fact`, and pick the first unused digit where `k <= fact`.

### Step-by-Step Thinking Process

1. Track which digits in `1..n` have already been placed using `boolean[] vis = new boolean[n + 1]`.
2. For each position `i` from `0` to `n - 1`, there are `n - 1 - i` positions remaining to the right, so any choice for position `i` spans `fact = (n - 1 - i)!` permutations.
3. Compute `fact` directly via a small loop `for (int j = 1; j < n - i; ++j) fact *= j`.
4. Iterate candidate digit `j` from `1` to `n`. Skip `j` if `vis[j]` is already `true`.
5. For an unused digit `j`: if `k > fact`, the target permutation lies past `j`'s entire block, so decrement `k -= fact` and keep scanning; otherwise (`k <= fact`), `j` is the exact digit for position `i`—append `j` to `ans`, set `vis[j] = true`, and `break` to position `i + 1`.

### Algorithm / Intuition

In `getPermutation(int n, int k)`:
- `StringBuilder ans` accumulates the `n` chosen digits, and `vis` (`boolean[n + 1]`) tracks used digits `1..n`.
- At step `i`, `fact` holds `(n - 1 - i)!` (note that at the final step `i = n - 1`, the inner factorial loop `j < 1` does not run and `fact = 1`, which equals `0!`).
- Scanning `j = 1..n` over unvisited digits subtracts `fact` from `k` for each skipped block (`if (k > fact) k -= fact;`). Using strict `>` cleanly handles 1-indexed `k` without converting `k` to `0`-indexed `k - 1`: `k` in `[1, fact]` selects the 1st available digit, `k` in `[fact + 1, 2 * fact]` gets reduced into `[1, fact]` and selects the 2nd available digit, and so on.

---

## Dry Run

**Input:** `n = 3`, `k = 3` (`vis = [F, F, F, F]`, `ans = ""`)

1. **Position `i = 0`:**
   - Remaining slots = `2`, so `fact = 2! = 2`.
   - `j = 1` (`!vis[1]`): `k = 3 > 2` -> skip block of `'1'`s, `k` becomes `3 - 2 = 1`.
   - `j = 2` (`!vis[2]`): `k = 1 <= 2` -> **select `2`!** `ans = "2"`, `vis[2] = true`, `break`.
2. **Position `i = 1`:**
   - Remaining slots = `1`, so `fact = 1! = 1`.
   - `j = 1` (`!vis[1]`): `k = 1 <= 1` -> **select `1`!** `ans = "21"`, `vis[1] = true`, `break`.
3. **Position `i = 2`:**
   - Remaining slots = `0`, so `fact = 0! = 1`.
   - `j = 1`: `vis[1]` is `true` -> skip.
   - `j = 2`: `vis[2]` is `true` -> skip.
   - `j = 3` (`!vis[3]`): `k = 1 <= 1` -> **select `3`!** `ans = "213"`, `vis[3] = true`, `break`.

**Output:** `"213"`

---

## Complexity Analysis

- **Time Complexity:** `O(n^2)` — The outer loop runs `n` times, and inside each iteration both the factorial calculation and the `1..n` candidate scan take `O(n)` operations (trivial for `n <= 9`).
- **Space Complexity:** `O(n)` — Uses `boolean[] vis` of length `n + 1` and `StringBuilder ans` of capacity `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [60permutation-sequence.java](./60permutation-sequence.java) |

---

## Key Learnings

- Lexicographical k-th element problems (permutations, subsets, palindromes, trees) can be solved in polynomial time by counting subtree/block sizes and jumping over blocks where `k > blockSize`.
- Testing strict `k > fact` and subtracting `k -= fact` lets you keep `k` 1-indexed throughout without off-by-one modulo bugs.
- For `n <= 9`, `n^2 <= 81` operations is virtually instantaneous—even simpler and less error-prone than maintaining a dynamic `ArrayList` with `.remove(idx)`.
